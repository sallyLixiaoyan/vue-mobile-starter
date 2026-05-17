import { defineStore } from 'pinia'
import { ref } from 'vue'

type Theme = 'light' | 'dark'

/**
 * UI 状态管理
 */
export const useUIStore = defineStore(
  'ui',
  () => {
    // 状态
    const theme = ref<Theme>('light')
    const loading = ref(false)
    const sidebarVisible = ref(false)

    // Actions
    const setTheme = (newTheme: Theme) => {
      theme.value = newTheme
      // 可以在这里添加主题切换的副作用，如修改 CSS 变量
      document.documentElement.setAttribute('data-theme', newTheme)
    }

    const toggleTheme = () => {
      setTheme(theme.value === 'light' ? 'dark' : 'light')
    }

    const showLoading = () => {
      loading.value = true
    }

    const hideLoading = () => {
      loading.value = false
    }

    const toggleSidebar = () => {
      sidebarVisible.value = !sidebarVisible.value
    }

    const setSidebarVisible = (visible: boolean) => {
      sidebarVisible.value = visible
    }

    return {
      // 状态
      theme,
      loading,
      sidebarVisible,
      // Actions
      setTheme,
      toggleTheme,
      showLoading,
      hideLoading,
      toggleSidebar,
      setSidebarVisible,
    }
  },
  {
    persist: {
      paths: ['theme'],
    },
  }
)