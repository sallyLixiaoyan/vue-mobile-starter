# API 模块上下文

本目录存放 API 请求层代码，按业务模块拆分。

## 基础设施

- `request.ts` — 统一请求封装（axios），提供 `http.get/post/put/delete` 方法
- 所有 API 文件基于 `request.ts` 发请求
- 请求/响应类型定义在 `src/types/` 下

## 命名规范

- 文件名: `xxxApi.ts`（camelCase + Api 后缀）
- 函数名: `动词 + 资源名`，如 `getUsers`, `createOrder`, `deleteComment`

## 规则

- 不要在 API 里做 try-catch，错误处理统一在请求拦截器
- 不要在 API 里做数据转换，保持透传
- 每个函数都要有明确的返回类型

## 常见模式

```typescript
// src/api/userApi.ts
import { http } from './request'
import type { User, UserListResponse } from '@/types/user'

export function getUserList(): Promise<UserListResponse> {
  return http.get<UserListResponse>('/users')
}

export function getUserById(id: string): Promise<User> {
  return http.get<User>(`/users/${id}`)
}

export function createUser(data: CreateUserParams): Promise<User> {
  return http.post<User>('/users', data)
}
```