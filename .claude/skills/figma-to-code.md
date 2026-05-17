---
name: figma-to-code
description: 当用户提供 Figma 设计稿链接并要求转代码时使用
---

# Figma 设计稿转代码

当用户提供 Figma 设计稿链接并要求转代码时，按以下流程执行：

## 1. 读取设计稿

通过 Figma MCP 读取设计稿的组件结构、布局信息和设计变量。

## 2. 分析页面结构

确定页面层级：
```
Layout（布局容器）
  └── 模块 A
      ├── 组件 1
      └── 组件 2
  └── 模块 B
      └── 组件 3
```

## 3. 提取设计 Token

对照 `docs/design-tokens.md` 提取：
- 颜色变量 → Sass 变量（如 `$primary`、`$bg-color`）
- 间距变量 → Sass 变量（如 `$spacing-md`）
- 字体变量 → Sass 变量（如 `$font-size-base`）

**禁止写死颜色值或像素值。**

## 4. 确定组件策略

| 设计稿元素 | 处理方式 |
|-----------|---------|
| Vant 已有（按钮、列表、弹窗等） | 直接使用 Vant 组件 |
| Vant 类似但样式不同 | 使用 Vant 组件 + `:deep()` 覆盖样式 |
| Vant 没有（自定义卡片、特殊布局） | 完全自定义 Sass |

## 5. 生成代码

创建 Vue SFC 文件，包含：

```vue
<template>
  <!-- 使用 Vant 组件 + 自定义结构 -->
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
// 类型定义
interface PageData {
  // ...
}

// 数据
const data = ref<PageData | null>(null)

// 逻辑
onMounted(async () => {
  // 加载数据
})
</script>

<style lang="scss" scoped>
// 使用 design tokens，不写死值
</style>
```

## 6. 创建数据层（如需要）

- 在 `src/stores/` 创建 Pinia store
- 在 `src/api/` 创建接口定义

## 7. 注册路由（如需要）

如果是页面级别组件，在路由配置中注册。
