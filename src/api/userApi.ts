import { http } from './request'
import type { ApiResponse, UserInfo } from '@/types/global'

// 登录参数
interface LoginParams {
  phone: string
  password: string
}

// 登录响应
interface LoginResponse {
  token: string
  user: UserInfo
}

/**
 * 用户 API
 */
export const userApi = {
  /**
   * 用户登录
   */
  login(params: LoginParams): Promise<ApiResponse<LoginResponse>> {
    return http.post<ApiResponse<LoginResponse>>('/auth/login', params)
  },

  /**
   * 获取用户信息
   */
  getUserInfo(): Promise<ApiResponse<UserInfo>> {
    return http.get<ApiResponse<UserInfo>>('/user/info')
  },

  /**
   * 更新用户信息
   */
  updateUser(data: Partial<UserInfo>): Promise<ApiResponse<UserInfo>> {
    return http.put<ApiResponse<UserInfo>>('/user/info', data)
  },

  /**
   * 用户退出登录
   */
  logout(): Promise<ApiResponse<void>> {
    return http.post<ApiResponse<void>>('/auth/logout')
  },
}