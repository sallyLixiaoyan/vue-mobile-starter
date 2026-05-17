# 项目架构说明

## 整体架构

```
┌─────────────────────────────────────────┐
│              View Layer                 │
│    Pages (页面) + Components (组件)      │
├─────────────────────────────────────────┤
│           Composable Layer              │
│    组合式函数 (业务逻辑复用)              │
├─────────────────────────────────────────┤
│          State Layer                    │
│    Pinia Store (状态管理)                │
├─────────────────────────────────────────┤
│           API Layer                     │
│    Axios 封装 + 拦截器 + 错误处理        │
├─────────────────────────────────────────┤
│         Platform Layer                  │
│    Vant 4 UI + Sass + PostCSS           │
└─────────────────────────────────────────┘
```

## 模块划分

### 页面层 (pages/)

按业务域划分，如：
- `home/` — 首页
- `user/` — 用户中心
- `order/` — 订单管理
- `product/` — 商品详情

每个页面目录可包含：
```
user/
├── UserIndex.vue      # 用户主页
├── UserProfile.vue    # 用户资料
└── types.ts           # 页面级类型定义（如复杂）
```

### 组件层 (components/)

- **基础组件**: 可跨业务复用的组件（如 `CustomButton`、`EmptyState`）
- **业务组件**: 特定场景的组件（如 `OrderCard`、`ProductGrid`）

### 组合式函数 (composables/)

封装可复用的业务逻辑，如：
- `useAuth` — 认证逻辑
- `useScroll` — 滚动加载
- `usePagination` — 分页逻辑
- `useForm` — 表单验证

### 状态管理 (stores/)

按模块拆分 Pinia store：
```
stores/
├── user.ts      # 用户信息
├── cart.ts      # 购物车
├── app.ts       # 全局配置（主题、语言）
└── index.ts     # 统一导出
```

### API 层 (api/)

按模块拆分接口：
```
api/
├── user.ts      # 用户相关接口
├── order.ts     # 订单相关接口
├── product.ts   # 商品相关接口
└── request.ts   # axios 封装
```

## 路由策略

- 使用 Vue Router 4 的 `createWebHistory` 模式
- 页面级路由使用动态导入（`import()`）实现懒加载
- 权限路由：通过 `beforeEach` 守卫校验 token 和角色

## 请求封装

- 基于 Axios 封装，统一拦截器处理：
  - 请求头注入 token
  - 响应错误统一提示（Toast）
  - 401 自动跳转登录页

## 环境配置

通过 Vite 的 `import.meta.env` 区分：
- `development` — 开发环境
- `staging` — 预发环境
- `production` — 生产环境
