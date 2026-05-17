# Styles 模块上下文

本项目使用 Sass + PostCSS px-to-viewport 作为样式方案。

## 技术栈

- Sass（scoped）— 组件样式
- PostCSS px-to-viewport — 移动端适配（自动转 vw）
- Vant Design Token — Vant 组件主题变量

## 目录结构

```
src/styles/
├── variables.scss    # Design Tokens（颜色、间距、字体）
├── reset.scss        # CSS Reset
└── index.scss        # 全局样式入口
```

## 设计变量

参考 `src/styles/variables.scss`：

```scss
// 颜色
$primary: #1989fa;
$text-color: #323233;
$bg-color: #f7f8fa;

// 间距
$spacing-xs: 4px;
$spacing-sm: 8px;
$spacing-md: 16px;
$spacing-lg: 24px;

// 字体
$font-size-xs: 12px;
$font-size-sm: 14px;
$font-size-base: 16px;
$font-size-lg: 18px;

// 圆角
$radius-sm: 4px;
$radius-md: 8px;
$radius-lg: 12px;
```

## 命名规范

使用 BEM 命名：

```scss
.component {
  &__element { }
  &--modifier { }
}
```

## 规则

- 所有组件样式必须使用 `<style lang="scss" scoped>`
- 禁止写死像素值，使用 design tokens 或让 PostCSS 自动转换
- 禁止在 Sass 中硬编码颜色值，使用 `variables.scss` 中的变量
- Vant 组件样式通过 `:deep()` 覆盖，不直接修改组件源码
- 禁止使用内联 `style=""`（运行时动态计算值除外）
- 禁止在全局样式文件中写组件样式

## px-to-viewport 自动转换

设计稿宽度默认 375px，所有 px 单位自动转 vw：

```scss
// 写 px，自动转 vw
.box {
  width: 100px;    // → 26.67vw (100/375)
  height: 50px;    // → 13.33vw
}
```

## 覆盖 Vant 组件样式

```scss
:deep(.van-button) {
  border-radius: $radius-md;
}

:deep(.van-nav-bar) {
  background: $primary;
}
```