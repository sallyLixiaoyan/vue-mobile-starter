// 全局类型定义

// 通用响应结构
interface ApiResponse<T = unknown> {
  code: number
  message: string
  data: T
}

// 分页参数
interface PaginationParams {
  page: number
  pageSize: number
}

// 分页响应
interface PaginationResponse<T> {
  list: T[]
  total: number
  page: number
  pageSize: number
}

// 用户信息
interface UserInfo {
  id: string
  name: string
  avatar?: string
  phone?: string
  email?: string
}

export type { ApiResponse, PaginationParams, PaginationResponse, UserInfo }