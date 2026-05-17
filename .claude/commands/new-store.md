---
name: new-store
description: 创建新的 Pinia Store
---

# 创建 Store

根据以下步骤创建新的 Pinia Store：

1. 确定业务域名称（如 user、cart、order）
2. 在 `src/stores/` 创建 `xxxStore.ts`
3. 使用 Composition API 风格定义 store
4. 需要持久化时添加 `persist: true`
5. 在 `src/stores/index.ts` 导出

## Store 模板

```typescript
// src/stores/xxxStore.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useXxxStore = defineStore('xxx', () => {
  // state
  const data = ref<XxxType | null>(null)
  
  // computed
  const hasData = computed(() => !!data.value)
  
  // actions
  const setData = (value: XxxType) => {
    data.value = value
  }
  
  const clear = () => {
    data.value = null
  }
  
  return { data, hasData, setData, clear }
}, {
  persist: true // 可选，需要持久化时启用
})
```

## 规则

- 一个文件一个 store，按业务域命名（`xxxStore.ts`）
- 使用 Composition API 风格（`defineStore('xxx', () => { ... })`)
- 禁止在 store 里直接调用 API，异步操作在 composable 里完成后再写入 store
- 组件内部状态用 `ref`/`reactive`，不放 store

## 使用示例

```vue
<script setup lang="ts">
import { useXxxStore } from '@/stores/xxxStore'

const xxxStore = useXxxStore()

// 访问状态
const data = xxxStore.data

// 调用 action
xxxStore.setData(newValue)
</script>
```