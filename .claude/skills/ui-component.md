---
name: ui-component
description: 当开发新的 UI 组件时使用，遵循组件开发流程
---

# UI 组件开发流程

当开发新的 UI 组件时，按以下流程执行：

## 1. 确认组件类型

- **基础组件**: 可复用的通用组件（如自定义按钮、卡片）
- **业务组件**: 特定业务场景的组件（如订单卡片、用户头像组）

## 2. 检查是否已有现成方案

- 检查 Vant 4 是否已有类似组件
- 检查项目 `src/components/` 是否已有可复用组件
- **不要重复造轮子**

## 3. 定义 Props 类型

```typescript
interface Props {
  title: string
  type?: 'primary' | 'default'
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'default',
  disabled: false,
})
```

**原则**:
- 所有 Props 必须有 TypeScript 类型
- 可选 Props 用 `?` 标记并提供 `withDefaults` 默认值
- 禁止 `any` 类型

## 4. 实现模板结构

```vue
<template>
  <div class="custom-card">
    <slot name="header">
      <h3 class="custom-card__title">{{ title }}</h3>
    </slot>
    <div class="custom-card__body">
      <slot />
    </div>
    <div class="custom-card__footer">
      <slot name="footer" />
    </div>
  </div>
</template>
```

**原则**:
- 提供 slot 插槽增强灵活性
- 使用 BEM 命名规范（`block__element--modifier`）
- 复杂逻辑提取为组合式函数

## 5. 实现业务逻辑

```typescript
const emit = defineEmits<{
  click: [event: MouseEvent]
  delete: [id: string]
}>()

const handleClick = (e: MouseEvent) => {
  emit('click', e)
}
```

## 6. 实现样式

```scss
<style lang="scss" scoped>
.custom-card {
  padding: $spacing-md;
  background: $bg-color;
  border-radius: $radius-md;

  &__title {
    font-size: $font-size-lg;
    color: $text-color;
  }

  &__body {
    margin-top: $spacing-sm;
  }
}
</style>
```

**原则**:
- 使用 `docs/design-tokens.md` 中的变量
- 覆盖 Vant 组件样式使用 `:deep()`
- px 单位由 PostCSS 自动转 vw

## 7. 编写测试

```typescript
import { mount } from '@vue/test-utils'
import CustomCard from './CustomCard.vue'

describe('CustomCard', () => {
  it('renders title', () => {
    const wrapper = mount(CustomCard, {
      props: { title: 'Test' }
    })
    expect(wrapper.text()).toContain('Test')
  })
})
```

## 8. 导出

如果是公共组件，在 `src/components/index.ts` 中统一导出。
