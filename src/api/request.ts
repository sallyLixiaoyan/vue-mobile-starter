import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios'
import { logger } from '@/utils/logger'
import { useAuthStore } from '@/stores/authStore'

// 创建 axios 实例
const instance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: Number(import.meta.env.VITE_API_TIMEOUT) || 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore()
    // 添加 token
    if (authStore.token) {
      config.headers.Authorization = `Bearer ${authStore.token}`
    }
    logger.debug('请求发送:', config.url)
    return config
  },
  (error) => {
    logger.error('请求错误:', error)
    return Promise.reject(error)
  }
)

// 响应拦截器
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    logger.debug('响应成功:', response.config.url)
    return response.data
  },
  (error) => {
    const { response } = error

    if (response) {
      const { status, data } = response
      logger.error('响应错误:', status, data)

      // 处理常见错误状态
      switch (status) {
        case 401:
          // 未授权，清除登录状态
          const authStore = useAuthStore()
          authStore.logout()
          window.location.href = '/login'
          break
        case 403:
          // 无权限
          logger.warn('无权限访问')
          break
        case 404:
          logger.warn('资源不存在')
          break
        case 500:
          logger.error('服务器内部错误')
          break
        default:
          logger.error('网络请求失败:', status)
      }
    } else {
      logger.error('网络错误:', error.message)
    }

    return Promise.reject(error)
  }
)

// HTTP 请求方法封装
export const http = {
  get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return instance.get(url, config)
  },

  post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    return instance.post(url, data, config)
  },

  put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    return instance.put(url, data, config)
  },

  delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return instance.delete(url, config)
  },

  patch<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    return instance.patch(url, data, config)
  },
}

export default instance