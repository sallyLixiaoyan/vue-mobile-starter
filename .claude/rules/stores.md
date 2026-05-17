# Stores 模块上下文

本目录存放全局状态（Pinia stores），按业务域拆分。

## 什么放 store，什么不放

| 状态类型 | 放哪里 |
|---------|-------|
| 登录信息、token | `authStore` |
| 全局 UI 状态（主题、侧边栏） | `uiStore` |
| 当前用户权限 | `authStore` 或 `permissionStore` |
| 组件内部状态 | `ref` / `reactive`（不放 store） |
| 服务端数据缓存 | composable 内的 state（不放 store） |

## 目录结构

```
src/stores/
├── index.ts           # 统一导出
├── authStore.ts       # 认证状态（token、用户信息）
└── uiStore.ts         # UI 状态（主题、侧边栏）
```

## 规则

- 一个文件一个 store，按业务域命名（`xxxStore.ts`）
- 使用 `defineStore` + TypeScript 类型
- 需要持久化的状态使用 `pinia-plugin-persistedstate`
- 不要在 store 里直接调用 API，异步操作在 composable 里做完再写入 store

## 常见模式

```typescript
// src/stores/authStore.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'

interface UserInfo {
  id: string
  name: string
  avatar?: string
}

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(null)
  const user = ref<UserInfo | null>(null)

  const setToken = (t: string) => {
    token.value = t
  }

  const logout = () => {
    token.value = null
    user.value = null
  }

  return { token, user, setToken, logout }
})
```

## 在组件中使用

```vue
<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()

// 直接访问状态
const token = authStore.token

// 调用 action
authStore.logout()
</script>
```