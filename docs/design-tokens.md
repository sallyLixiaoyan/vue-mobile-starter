# 设计 Token

Figma 设计变量与 Sass 变量的映射关系。开发时**禁止写死像素值或颜色值**，统一使用以下变量。

## 颜色

| Figma 变量 | Sass 变量 | 值 | 用途 |
|-----------|-----------|----|----|
| `color/primary` | `$primary` | `#07c160` | 主题色（按钮、链接） |
| `color/primary-dark` | `$primary-dark` | `#06ad56` | 主题色深色（hover/active） |
| `color/bg` | `$bg-color` | `#f7f8fa` | 页面背景色 |
| `color/bg-white` | `$bg-white` | `#ffffff` | 卡片背景色 |
| `color/text` | `$text-color` | `#323233` | 主文本色 |
| `color/text-secondary` | `$text-secondary` | `#969799` | 次要文本色 |
| `color/text-placeholder` | `$text-placeholder` | `#c8c9cc` | 占位文本色 |
| `color/border` | `$border-color` | `#ebedf0` | 边框色 |
| `color/success` | `$success-color` | `#07c160` | 成功状态 |
| `color/warning` | `$warning-color` | `#ff976a` | 警告状态 |
| `color/danger` | `$danger-color` | `#ee0a24` | 错误/危险状态 |
| `color/info` | `$info-color` | `#1989fa` | 信息状态 |

## 间距

| Figma 变量 | Sass 变量 | 值 | 用途 |
|-----------|-----------|----|----|
| `spacing/xxs` | `$spacing-xxs` | `4px` | 极小间距 |
| `spacing/xs` | `$spacing-xs` | `8px` | 小间距 |
| `spacing/sm` | `$spacing-sm` | `12px` | 中小间距 |
| `spacing/md` | `$spacing-md` | `16px` | 标准间距 |
| `spacing/lg` | `$spacing-lg` | `24px` | 大间距 |
| `spacing/xl` | `$spacing-xl` | `32px` | 超大间距 |

## 字体

| Figma 变量 | Sass 变量 | 值 | 用途 |
|-----------|-----------|----|----|
| `font/size-xxs` | `$font-size-xxs` | `10px` | 极小文字 |
| `font/size-xs` | `$font-size-xs` | `12px` | 辅助说明文字 |
| `font/size-sm` | `$font-size-sm` | `13px` | 次要标题 |
| `font/size-base` | `$font-size-base` | `14px` | 正文默认 |
| `font/size-md` | `$font-size-md` | `16px` | 标题/重点 |
| `font/size-lg` | `$font-size-lg` | `18px` | 大标题 |
| `font/size-xl` | `$font-size-xl` | `22px` | 超大标题 |
| `font/weight-normal` | `$font-weight-normal` | `400` | 常规 |
| `font/weight-medium` | `$font-weight-medium` | `500` | 中等加粗 |
| `font/weight-bold` | `$font-weight-bold` | `600` | 加粗 |

## 圆角

| Figma 变量 | Sass 变量 | 值 | 用途 |
|-----------|-----------|----|----|
| `radius/sm` | `$radius-sm` | `4px` | 小圆角（标签） |
| `radius/md` | `$radius-md` | `8px` | 标准圆角（卡片） |
| `radius/lg` | `$radius-lg` | `12px` | 大圆角（弹窗） |
| `radius/full` | `$radius-full` | `50%` | 圆形（头像） |

## 阴影

| Figma 变量 | Sass 变量 | 值 | 用途 |
|-----------|-----------|----|----|
| `shadow/sm` | `$shadow-sm` | `0 2px 4px rgba(0,0,0,0.05)` | 小阴影（列表项） |
| `shadow/md` | `$shadow-md` | `0 4px 8px rgba(0,0,0,0.1)` | 中阴影（卡片） |
| `shadow/lg` | `$shadow-lg` | `0 8px 16px rgba(0,0,0,0.15)` | 大阴影（弹窗） |

## 层级

| Figma 变量 | Sass 变量 | 值 | 用途 |
|-----------|-----------|----|----|
| `z/base` | `$z-base` | `1` | 基础层 |
| `z/dropdown` | `$z-dropdown` | `10` | 下拉菜单 |
| `z/sticky` | `$z-sticky` | `100` | 吸顶元素 |
| `z/modal` | `$z-modal` | `1000` | 弹窗/遮罩 |
| `z/popover` | `$z-popover` | `2000` | 气泡提示 |
| `z/toast` | `$z-toast` | `3000` | Toast 提示 |
