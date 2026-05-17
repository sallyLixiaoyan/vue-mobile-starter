# Layouts 模块上下文

本目录存放页面布局组件，定义页面的整体骨架结构。

## 内置布局

| 布局 | 文件 | 适用场景 |
|------|------|---------|
| MainLayout | `MainLayout.vue` | 登录后的主应用（含导航栏、内容区） |
| AuthLayout | `AuthLayout.vue` | 登录/注册等无需认证的页面 |

## 目录结构

```
src/layouts/
├── MainLayout.vue    # 主布局（van-nav-bar + router-view）
└── AuthLayout.vue    # 认证布局（居中卡片）
```

## 规则

- 布局组件只处理结构和样式，不包含业务逻辑
- 通过 `<router-view />` 渲染子页面
- 布局切换在路由配置中声明
- 导航栏的数据从 store 读取，不通过 props 传递

## 常见模式

```vue
<!-- src/layouts/MainLayout.vue -->
<template>
  <div class="main-layout">
    <van-nav-bar :title="title" fixed placeholder />
    <div class="main-layout__content">
      <router-view />
    </div>
    <van-tabbar v-model="active">
      <van-tabbar-item to="/">首页</van-tabbar-item>
      <van-tabbar-item to="/user">用户</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const active = ref(0)
const title = ref('首页')
</script>

<style lang="scss" scoped>
.main-layout {
  min-height: 100vh;

  &__content {
    padding: $spacing-md;
    padding-bottom: 50px; // tabbar 高度
  }
}
</style>
```