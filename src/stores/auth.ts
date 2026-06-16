import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { STORAGE_KEYS } from '../constants'

interface User {
  username: string
  password: string // 存储的是 SHA-256 哈希值
  avatar: string
}

// ⚠️ 注意：localStorage 不是安全的后端，此密码仅用于前端演示
// 生产环境请将密码验证移至后端，使用 bcrypt/argon2
const SALT = 'liyou-world-salt-2026-v1'

async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(password + SALT)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

function getUsers(): Record<string, User> {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.users) || '{}')
  } catch {
    return {}
  }
}

function saveUsers(u: Record<string, User>) {
  try {
    localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(u))
  } catch {
    // localStorage 不可用，静默失败
  }
}

export const useAuthStore = defineStore('auth', () => {
  const currentUser = ref<User | null>(null)
  const showLoginModal = ref(false)

  // 启动时恢复登录状态
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.currentUser)
    if (saved) currentUser.value = JSON.parse(saved)
  } catch {
    // ignore
  }

  const isLoggedIn = computed(() => !!currentUser.value)
  const username = computed(() => currentUser.value?.username || '')

  async function login(user: string, password: string): Promise<boolean> {
    const users = getUsers()
    const found = users[user]
    if (!found) return false
    const hashedInput = await hashPassword(password)
    if (found.password === hashedInput) {
      currentUser.value = { username: found.username, password: '', avatar: found.avatar }
      try {
        localStorage.setItem(STORAGE_KEYS.currentUser, JSON.stringify(currentUser.value))
      } catch {
        // ignore
      }
      return true
    }
    return false
  }

  async function register(user: string, password: string): Promise<boolean> {
    const users = getUsers()
    if (users[user]) return false
    const avatars = ['🌸', '📖', '✨', '🌟', '💫', '🎀', '🍀', '🌙']
    const hashedPw = await hashPassword(password)
    users[user] = { username: user, password: hashedPw, avatar: avatars[Math.floor(Math.random() * avatars.length)] }
    saveUsers(users)
    currentUser.value = { username: user, password: '', avatar: users[user].avatar }
    try {
      localStorage.setItem(STORAGE_KEYS.currentUser, JSON.stringify(currentUser.value))
    } catch {
      // ignore
    }
    return true
  }

  function logout() {
    currentUser.value = null
    try {
      localStorage.removeItem(STORAGE_KEYS.currentUser)
    } catch {
      // ignore
    }
  }

  function openLogin() {
    showLoginModal.value = true
  }

  function closeLogin() {
    showLoginModal.value = false
  }

  return {
    currentUser,
    showLoginModal,
    isLoggedIn,
    username,
    login,
    register,
    logout,
    openLogin,
    closeLogin,
  }
})
