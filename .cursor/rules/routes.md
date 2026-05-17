# Routes 模块上下文

本目录存放路由配置和路由守卫，是页面和布局的"装配层"。

## 目录结构

```
src/router/
├── index.ts           # 路由表（createRouter）
└── guards.ts          # 路由守卫（鉴权）
```

## 路由表结构

使用 vue-router v4 的 `createRouter`，按布局分组：

```typescript
// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'Home', component: () => import('@/pages/home/Index.vue') },
      { path: 'user', name: 'User', component: () => import('@/pages/user/Index.vue') },
    ],
  },
  {
    path: '/login',
    component: () => import('@/layouts/AuthLayout.vue'),
    children: [
      { path: '', name: 'Login', component: () => import('@/pages/login/Index.vue') },
    ],
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
```

## 路由守卫

```typescript
// src/router/guards.ts
import type { Router } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

export function setupRouterGuards(router: Router) {
  router.beforeEach((to, from, next) => {
    const authStore = useAuthStore()
    if (!authStore.token && to.path !== '/login') {
      next('/login')
    } else {
      next()
    }
  })
}
```

## 规则

- 路由表只在 `index.ts` 里定义
- 鉴权逻辑统一在 `guards.ts` 处理，页面组件不做登录态判断
- 路由路径用小写 kebab-case（如 `/user-management`）
- 新增页面时，同时在路由表里注册
- 使用懒加载 `() => import('@/pages/xxx/Index.vue')`