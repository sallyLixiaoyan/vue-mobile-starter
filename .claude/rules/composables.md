# Composables 模块上下文

本目录存放全局自定义组合式函数（useXxx）。

## VueUse 优先原则

编写任何自定义 Composable 之前，**建议先检索 VueUse 文档**确认无现有实现：

| 场景 | 推荐 VueUse |
|------|------------|
| 异步请求 | `useFetch` / `useAxios` |
| 本地存储 | `useStorage` / `useLocalStorage` |
| 组件挂载/卸载 | `onMounted` / `onUnmounted` |
| DOM 事件 | `useEventListener` |
| 窗口尺寸 | `useWindowSize` |
| 响应式状态 | `ref` / `reactive` / `computed` |

## 目录结构

```
src/composables/
├── useAuth.ts       # 认证相关
├── useUserList.ts   # 用户列表数据
├── useUserAction.ts # 用户操作
└── index.ts         # 统一导出（可选）
```

## 命名规范

- 文件名: `useXxx.ts`（camelCase + use 前缀）
- 函数名: 与文件名一致（如 `useAuth.ts` → `export function useAuth()`）
- 一个文件一个 composable

## 规则

- 组件专属的 composable 放在组件文件夹内，不放这里
- 这里只放被多个组件复用的 composable
- 返回值用对象而非数组（除非只有 2 个值）
- loading/error 状态要暴露出去
- 副作用清理要完整（使用 `onUnmounted` 清理定时器等）

## 参考

创建新 composable 时参考 Skills `create-test` 的流程和模板。