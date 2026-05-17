---
name: create-api
description: Use when creating new API service modules in src/api/ directory
---

# 创建 API

## Overview
创建符合项目规范的 API 模块，负责封装后端接口调用。

## When to Use
- 需要调用新的后端 API 接口
- 需要封装一组相关的 API 请求
- 需要为新功能模块创建数据层

## Implementation Steps

1. 先读取 `.claude/rules/api.md` 了解 API 规范
2. 先读取 `src/api/request.ts` 了解请求封装
3. 在 `src/types/` 下定义请求和响应的 TypeScript 类型
4. 在 `src/api/` 下创建 `xxxApi.ts`
5. 基于 `http` 对象发请求
6. 函数命名：`get/create/update/delete` + 资源名
7. 在 `src/api/index.ts` 中导出

## 类型定义模板

```typescript
// src/types/{{模块名}}.ts

// 资源类型
export interface {{资源名}} {
  id: string
  name: string
  // ...
}

// 请求参数
export interface Create{{资源名}}Params {
  name: string
  // ...
}

export interface Update{{资源名}}Params {
  id: string
  name?: string
  // ...
}
```

## API 模块模板

```typescript
// src/api/{{模块名}}Api.ts
import { http } from './request'
import type { ApiResponse } from '@/types/global'
import type {
  {{资源名}},
  Create{{资源名}}Params,
  Update{{资源名}}Params,
} from '@/types/{{模块名}}'

/**
 * {{模块名}} API
 */
export const {{模块名}}Api = {
  /**
   * 获取列表
   */
  get{{资源名}}List(): Promise<ApiResponse<{{资源名}}[]>> {
    return http.get<ApiResponse<{{资源名}}[]>>('/{{模块名}}')
  },

  /**
   * 获取详情
   */
  get{{资源名}}ById(id: string): Promise<ApiResponse<{{资源名}}>> {
    return http.get<ApiResponse<{{资源名}}>>(`/{{模块名}}/${id}`)
  },

  /**
   * 创建
   */
  create{{资源名}}(data: Create{{资源名}}Params): Promise<ApiResponse<{{资源名}}>> {
    return http.post<ApiResponse<{{资源名}}>>('/{{模块名}}', data)
  },

  /**
   * 更新
   */
  update{{资源名}}(data: Update{{资源名}}Params): Promise<ApiResponse<{{资源名}}>> {
    return http.put<ApiResponse<{{资源名}}>>(`/{{模块名}}/${data.id}`, data)
  },

  /**
   * 删除
   */
  delete{{资源名}}(id: string): Promise<ApiResponse<void>> {
    return http.delete<ApiResponse<void>>(`/{{模块名}}/${id}`)
  },
}
```

## Core Principles
- API 只负责发送请求，不处理业务逻辑
- 使用 TypeScript 类型明确返回类型
- 错误处理统一在请求拦截器中完成

## Common Mistakes
- ❌ 在 API 中做 try-catch 错误处理
- ❌ 在 API 中转换数据格式
- ❌ 函数命名不清晰（如 `getData` 而不是 `getUserList`）
- ❌ 缺少 TypeScript 类型定义
- ❌ 直接使用 axios 而不是封装的 `http` 对象