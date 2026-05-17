---
name: create-component
description: Use when creating new Vue components in src/components/ directory
---

# 创建组件

## Overview
创建符合项目规范的 Vue 业务组件，遵循组件-composable-api 分层架构。

## When to Use
- 需要创建新的业务组件
- 需要封装可复用的 UI 模块
- 需要实现特定的页面功能模块

## Implementation Steps

1. 先读取 `.claude/rules/components.md` 了解组件规范
2. 先确定组件名（PascalCase，如 UserCard）
3. 检查 Vant 4 是否已有类似组件，避免重复造轮子
4. 在 `src/components/{{组件名}}/` 创建文件夹
5. 创建 `index.vue` 作为组件入口
6. Props 使用 `withDefaults` + TypeScript 类型
7. 样式使用 `<style lang="scss" scoped>`
8. 复杂逻辑抽到 `use{{组件名}}.ts` composable

## 组件模板

```vue
<template>
  <div class="{{组件名}}">
    <!-- 使用 Vant 组件 -->
  </div>
</template>

<script setup lang="ts">
interface {{组件名}}Props {
  // Props 定义
}

const props = withDefaults(defineProps<{{组件名}}Props>(), {
  // 默认值
})

const emit = defineEmits<{
  // Events 定义
}>()
</script>

<style lang="scss" scoped>
.{{组件名}} {
  // 使用 design tokens，禁止硬编码
}
</style>
```

## Core Principles
- 组件只负责渲染，业务逻辑抽到 composable
- 数据请求走 `api/` 层
- 使用 Vant 组件库，避免重复造轮子

## Common Mistakes
- ❌ 在组件内直接调用 API
- ❌ 在组件内写复杂的业务逻辑
- ❌ 不使用 Vant 组件，从零实现 UI
- ❌ Props 类型定义不清晰（缺少必填/可选标记）
- ❌ 组件文件夹命名不符合 PascalCase