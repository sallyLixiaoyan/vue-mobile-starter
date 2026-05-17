---
name: new-composable
description: 创建新的组合式函数
---

# 创建 Composable

根据以下步骤创建新的组合式函数：

1. 确定功能名称（如 useUserList、useScroll）
2. 先检查 VueUse 是否已有类似功能，避免重复
3. 在 `src/composables/` 创建 `useXxx.ts`
4. 返回响应式状态和方法
5. 处理生命周期和清理

## Composable 模板

```typescript
// src/composables/useXxx.ts
import { ref, onMounted, onUnmounted } from 'vue'

export function useXxx() {
  const loading = ref(false)
  const data = ref<XxxType[]>([])
  const error = ref<Error | null>(null)
  
  const fetch = async () => {
    loading.value = true
    error.value = null
    try {
      const result = await xxxApi.getXxxList()
      data.value = result.data
    } catch (e) {
      error.value = e as Error
    } finally {
      loading.value = false
    }
  }
  
  const refresh = () => {
    fetch()
  }
  
  onMounted(() => {
    fetch()
  })
  
  return { loading, data, error, fetch, refresh }
}
```

## 规则

- 文件命名: `useXxx.ts`（camelCase + use 前缀）
- 返回值必须是响应式状态和方法
- 复用逻辑，不复用 UI
- 处理副作用清理（如事件监听器、定时器）

## 常见用途

| Composable | 用途 |
|------------|------|
| `useUserList` | 用户列表数据获取 |
| `useScroll` | 滚动加载、无限滚动 |
| `usePagination` | 分页逻辑 |
| `useForm` | 表单验证 |
| `useAuth` | 认证状态和方法 |

## 使用示例

```vue
<script setup lang="ts">
import { useUserList } from '@/composables/useUserList'

const { loading, data, refresh } = useUserList()
</script>

<template>
  <van-loading v-if="loading" />
  <UserList v-else :users="data" @refresh="refresh" />
</template>
```