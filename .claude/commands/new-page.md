---
name: new-page
description: 创建新页面，在 src/pages 下生成 Vue 页面组件
---

# 创建新页面

根据以下步骤创建新页面：

1. **确定模块**: 询问用户页面属于哪个业务模块（如 home、user、order）
2. **确定页面名**: 询问用户页面名称（PascalCase，如 Index、Detail）
3. **创建文件**: 在 `src/pages/{{模块}}/` 目录下创建 `{{页面名}}.vue`
4. **路由注册**: 在 `src/router/index.ts` 中添加路由配置
5. **数据层**: 如果页面需要数据，在 `src/stores/` 创建对应的 Pinia store
6. **API 层**: 如果页面需要接口，在 `src/api/` 创建对应的接口定义

## 页面模板

```vue
<template>
  <div class="{{模块}}-page">
    <van-nav-bar title="{{页面标题}}" fixed placeholder />
    <div class="{{模块}}-page__content">
      <!-- 页面内容 -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

// 页面状态
const loading = ref(false)

onMounted(() => {
  // 页面初始化逻辑
})
</script>

<style lang="scss" scoped>
.{{模块}}-page {
  padding-top: 46px; // van-nav-bar 高度

  &__content {
    padding: $spacing-md;
  }
}
</style>
```

## 路由配置模板

```typescript
// 在 src/router/index.ts 中添加
{
  path: '/{{模块}}',
  name: '{{模块名}}',
  component: () => import('@/pages/{{模块}}/{{页面名}}.vue'),
  meta: {
    title: '{{页面标题}}',
    keepAlive: false, // 是否缓存
    requiresAuth: false, // 是否需要登录
  },
},
```

## 注意事项

- 优先使用 Vant 4 内置组件
- 样式使用 `lang="scss"` + scoped
- 参考 `docs/design-tokens.md` 中的设计变量
- 如果用户提供 Figma 链接，调用 figma-to-code skill
- 页面只做组合，业务逻辑抽到 composable 或 store