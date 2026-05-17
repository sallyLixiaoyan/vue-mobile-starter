# Composables 模块上下文

本目录存放全局自定义组合式函数。

## VueUse 优先原则（推荐）

编写任何自定义 Composable 之前，**建议先检索 VueUse 文档**确认无现有实现：

| 场景 | 推荐 VueUse |
|------|------------|
| 异步请求 | `useFetch` / `useAxios` |
| 本地存储 | `useStorage` / `useLocalStorage` |
| 组件挂载/卸载 | `onMounted` / `onUnmounted` |
| DOM 事件 | `useEventListener` |
| 窗口尺寸 | `useWindowSize` |
| 响应式状态 | `ref` / `reactive` / `computed` |

## 规则

- 文件名和函数名都以 `use` 开头，camelCase
- 一个文件一个 composable，文件名和函数名一致（如 `useAuth.ts` → `export function useAuth()`）
- 组件专属的 composable 放在组件文件夹内，不放这里
- 这里只放被多个组件复用的 composable

## 常见模式

### 数据请求 Composable

```typescript
// useUserList.ts
import { ref, onMounted } from 'vue'
import { getUserList } from '@/api/user'

export function useUserList() {
  const users = ref<User[]>([])
  const loading = ref(false)
  const error = ref<Error | null>(null)

  onMounted(async () => {
    loading.value = true
    try {
      users.value = await getUserList()
    } catch (e) {
      error.value = e as Error
    } finally {
      loading.value = false
    }
  })

  return { users, loading, error }
}
```

### 操作类 Composable

```typescript
// useUserAction.ts
import { ref } from 'vue'
import { createUser } from '@/api/user'

export function useCreateUser() {
  const loading = ref(false)

  const create = async (user: User) => {
    loading.value = true
    try {
      return await createUser(user)
    } finally {
      loading.value = false
    }
  }

  return { create, loading }
}
```

## 规则

- 返回值用对象而非数组（除非只有 2 个值）
- loading/error 状态要暴露出去
- 副作用清理要完整（使用 `onUnmounted` 清理定时器等）