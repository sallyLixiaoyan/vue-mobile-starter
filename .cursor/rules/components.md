# Components 模块上下文

本目录存放通用业务组件，每个组件一个文件夹。

## 组件结构

```
ComponentName/
├── index.vue              # 组件实现（或直接用 ComponentName.vue）
├── types.ts               # Props 和内部类型（可选）
└── useComponentName.ts    # 组件专属 composable（可选）
```

## 规则

- 参考 `docs/component-patterns.md` 的组件模板
- Props 接口命名: `组件名Props`
- 必须用 Vant 组件作为基础，不要从零写 UI
- 组件只负责渲染，业务逻辑抽到 composable，数据请求走 `api/`
- Props 必须使用 `withDefaults` + TypeScript 类型

## 常见模式

```vue
<template>
  <div class="user-card">
    <van-image :src="user.avatar" round />
    <div class="user-card__info">
      <span class="user-card__name">{{ user.name }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
interface UserCardProps {
  user: {
    id: string
    name: string
    avatar?: string
  }
  showActions?: boolean
}

const props = withDefaults(defineProps<UserCardProps>(), {
  showActions: false,
})
</script>

<style lang="scss" scoped>
.user-card {
  display: flex;
  padding: $spacing-md;

  &__name {
    font-size: $font-size-base;
    color: $text-color;
  }
}
</style>
```