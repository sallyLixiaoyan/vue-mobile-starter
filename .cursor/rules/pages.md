# Pages 模块上下文

本目录存放页面级组件，按功能模块分文件夹。页面组件负责组合业务组件、连接路由和全局状态。

## 目录结构

```
src/pages/
├── home/
│   └── Index.vue          # 首页
├── user/
│   ├── Index.vue          # 用户列表页
│   └── Detail.vue         # 用户详情页
└── login/
│   └── Index.vue          # 登录页
```

## 规则

- 页面组件命名使用 PascalCase（如 `Index.vue`、`Detail.vue`）
- 页面只做组合和数据分发，不写业务逻辑，逻辑抽到 `composables/` 或 `stores/`
- 数据请求通过 composables 封装，不在页面组件内直接调用 API
- 页面组件不做鉴权判断，鉴权统一在路由守卫处理
- 页面间跳转使用 `router.push()`，不使用 `<a>` 标签

## 常见模式

```vue
<template>
  <div class="page">
    <van-nav-bar title="页面标题" fixed placeholder />
    <div class="page-content">
      <!-- 页面内容 -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserList } from '@/composables/useUserList'
import UserCard from '@/components/user/UserCard.vue'

const { users, loading } = useUserList()
</script>

<style lang="scss" scoped>
.page {
  padding-top: 46px; // van-nav-bar 高度

  .page-content {
    padding: $spacing-md;
  }
}
</style>
```