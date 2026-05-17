import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { UserInfo } from '@/types/global'

/**
 * 认证状态管理
 */
export const useAuthStore = defineStore(
  'auth',
  () => {
    // 状态
    const token = ref<string | null>(null)
    const user = ref<UserInfo | null>(null)

    // 计算属性
    const isLoggedIn = computed(() => !!token.value)

    // Actions
    const setToken = (newToken: string) => {
      token.value = newToken
    }

    const setUser = (newUser: UserInfo) => {
      user.value = newUser
    }

    const login = (loginToken: string, loginUser: UserInfo) => {
      setToken(loginToken)
      setUser(loginUser)
    }

    const logout = () => {
      token.value = null
      user.value = null
    }

    const updateUser = (updates: Partial<UserInfo>) => {
      if (user.value) {
        user.value = { ...user.value, ...updates }
      }
    }

    return {
      // 状态
      token,
      user,
      isLoggedIn,
      // Actions
      setToken,
      setUser,
      login,
      logout,
      updateUser,
    }
  },
  {
    persist: true,
  }
)