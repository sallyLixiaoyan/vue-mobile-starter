import type { Router } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

/**
 * 设置路由守卫
 * @param router 路由实例
 */
export function setupRouterGuards(router: Router) {
  // 前置守卫
  router.beforeEach((to, _from, next) => {
    // 设置页面标题
    const title = to.meta.title as string
    if (title) {
      document.title = title
    }

    // 需要登录验证的页面
    const authStore = useAuthStore()
    const requiresAuth = to.meta.requiresAuth

    if (requiresAuth && !authStore.token) {
      // 未登录，跳转到登录页
      next({
        name: 'Login',
        query: { redirect: to.fullPath },
      })
      return
    }

    // 已登录状态，禁止访问登录页
    if (to.name === 'Login' && authStore.token) {
      next({ name: 'Home' })
      return
    }

    next()
  })

  // 后置守卫
  router.afterEach(() => {
    // 可以在这里添加页面访问统计等逻辑
  })

  // 错误处理
  router.onError((error) => {
    console.error('路由错误:', error)
  })
}