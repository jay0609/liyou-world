import { ref } from 'vue'

// 单例状态 — 模块级变量确保全局仅一份音频实例
const isPlaying = ref(false)
const audio = ref<HTMLAudioElement | null>(null)
const volume = ref(0.35)
let autoPlayRegistered = false

export function useBgm(src = '/bgm/bgm.mp3') {
  function init() {
    if (audio.value) return
    audio.value = new Audio(src)
    audio.value.loop = true
    audio.value.volume = volume.value
  }

  function play() {
    init()
    audio.value?.play().catch(() => {
      // 浏览器自动播放策略阻止，等待用户交互
    })
    isPlaying.value = true
  }

  function pause() {
    audio.value?.pause()
    isPlaying.value = false
  }

  function toggle() {
    if (isPlaying.value) {
      pause()
    } else {
      play()
    }
  }

  function setVolume(v: number) {
    volume.value = Math.max(0, Math.min(1, v))
    if (audio.value) audio.value.volume = volume.value
  }

  /** 首次用户交互后自动尝试播放（仅注册一次全局监听） */
  function registerAutoPlay() {
    if (autoPlayRegistered) return
    autoPlayRegistered = true

    function tryAutoPlay() {
      if (!isPlaying.value) {
        init()
        audio.value?.play().then(() => {
          isPlaying.value = true
        }).catch(() => {})
      }
      document.removeEventListener('click', tryAutoPlay)
      document.removeEventListener('keydown', tryAutoPlay)
    }

    // 使用 { once: true } 自动解绑
    document.addEventListener('click', tryAutoPlay, { once: true })
    document.addEventListener('keydown', tryAutoPlay, { once: true })
  }

  /** 清理资源（页面卸载时调用） */
  function cleanup() {
    pause()
    audio.value = null
    autoPlayRegistered = false
  }

  return {
    isPlaying,
    volume,
    toggle,
    play,
    pause,
    setVolume,
    init,
    registerAutoPlay,
    cleanup,
  }
}
