<template>
  <Teleport to="body">
    <transition name="modal-fade">
      <div v-if="showLoginModal" class="fixed inset-0 z-[200] flex items-center justify-center p-lg" @click.self="closeLogin">
        <!-- 遮罩 -->
        <div class="absolute inset-0 bg-liyou-deep-indigo/40 backdrop-blur-sm"></div>

        <!-- 弹窗 -->
        <div class="glass-card relative z-10 w-full max-w-sm p-2xl">
          <!-- 关闭按钮 -->
          <button class="absolute top-4 right-4 btn-ghost p-xs text-liyou-text-muted hover:text-liyou-pink text-lg" @click="closeLogin">✕</button>

          <h3 class="text-heading-lg text-liyou-text-primary font-heading text-center mb-xl">
            {{ isRegister ? '注册' : '登录' }}
          </h3>

          <!-- 表单 -->
          <form @submit.prevent="handleSubmit" class="space-y-lg">
            <div>
              <label class="text-body-sm text-liyou-text-secondary block mb-sm">用户名</label>
              <input v-model="formUser" type="text" class="input-field" placeholder="输入用户名" required minlength="2" maxlength="12" />
            </div>
            <div>
              <label class="text-body-sm text-liyou-text-secondary block mb-sm">密码</label>
              <input v-model="formPass" type="password" class="input-field" placeholder="输入密码" required minlength="4" />
            </div>
            <p v-if="error" class="text-body-sm text-liyou-error text-center">{{ error }}</p>
            <button type="submit" class="btn-primary w-full">
              {{ isRegister ? '注册' : '登录' }}
            </button>
          </form>

          <p class="text-center text-body-sm text-liyou-text-muted mt-lg">
            {{ isRegister ? '已有账号？' : '没有账号？' }}
            <button class="btn-ghost text-liyou-pink" @click="isRegister = !isRegister; error = ''">
              {{ isRegister ? '去登录' : '去注册' }}
            </button>
          </p>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useAuth } from '../composables/useAuth'

const authStore = useAuth()
const { showLoginModal } = storeToRefs(authStore)
const { login, register, closeLogin } = authStore

const isRegister = ref(false)
const formUser = ref('')
const formPass = ref('')
const error = ref('')

async function handleSubmit() {
  error.value = ''
  if (isRegister.value) {
    const ok = await register(formUser.value, formPass.value)
    if (!ok) { error.value = '用户名已存在'; return }
    closeLogin()
  } else {
    const ok = await login(formUser.value, formPass.value)
    if (!ok) { error.value = '用户名或密码错误'; return }
    closeLogin()
  }
  formUser.value = ''
  formPass.value = ''
}
</script>

<style scoped>
.input-field {
  width: 100%;
  padding: 10px 16px;
  border: 1px solid rgba(196, 181, 212, 0.3);
  border-radius: 10px;
  background: var(--liyou-moon-white);
  color: var(--liyou-text-primary);
  font-size: 0.9375rem;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
  box-sizing: border-box;
}
.input-field:focus {
  border-color: var(--liyou-pink);
  box-shadow: 0 0 0 3px rgba(232, 160, 180, 0.15);
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.25s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style>
