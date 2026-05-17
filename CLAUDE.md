# AI 开发规范

## 项目概况

- Vue 3.4+ / Vite 5+ / TypeScript 5+（严格模式）
- Vant 4 UI 组件库（自动导入）
- Pinia 状态管理 + Vue Router 4
- Sass scoped + PostCSS px-to-viewport 移动端适配

## 目录结构

```
src/
├── api/          # API 请求（axios 封装）
├── components/   # 公共组件
├── composables/  # 组合式函数（useXxx）
├── layouts/      # 布局组件
├── pages/        # 页面组件
├── router/       # 路由配置 + 鉴权守卫
├── stores/       # Pinia 状态
├── styles/       # 全局样式 + Design Tokens
├── types/        # TypeScript 类型
└── utils/        # 工具函数
```

## API 响应格式

所有 API 返回统一格式：

```typescript
interface ApiResponse<T> {
  code: number      // 状态码，0 表示成功
  message: string   // 提示信息
  data: T           // 业务数据
}
```

## AI 辅助功能

### Skills（技能）

位于 `.claude/skills/`，用于复杂任务的完整流程：

| Skill | 用途 |
|-------|------|
| `create-api` | 创建 API 模块 |
| `create-component` | 创建 Vue 组件 |
| `create-test` | 编写单元测试 |
| `code-review` | 代码审查 |
| `explore` | 探索代码库 |
| `figma-to-code` | Figma 设计转代码 |
| `ui-component` | 创建 UI 组件 |

### Commands（命令）

位于 `.claude/commands/`，用于快速执行常见操作：

| Command | 用途 |
|---------|------|
| `git-commit` | 生成规范的提交信息 |
| `new-page` | 创建新页面 |

### Rules（规则）

位于 `.claude/rules/`，定义各模块的规范和约束。

## 编码规范

### 组件

- 必须使用 `<script setup lang="ts">`
- Props 用 `withDefaults` + TypeScript 接口
- 禁止 `any` 类型，必须完整类型定义
- 优先使用 Vant 内置组件

### 样式

- 使用 `<style lang="scss" scoped>`
- 用 Design Tokens（`src/styles/variables.scss`），禁止硬编码颜色/像素
- 覆盖 Vant 用 `:deep()` 选择器
- px 自动转 vw（设计稿 375px），无需手动计算

### 状态管理

- 全局状态用 Pinia，组件内部用 `ref`/`reactive`
- 禁止直接修改 store，必须通过 action
- 需持久化用 `pinia-plugin-persistedstate`

### API

- 统一从 `src/api/` 导出
- 使用共享 axios 封装（`request.ts`）
- 定义请求/响应类型

## 命名规范

| 类型 | 格式 | 示例 |
|------|------|------|
| 组件 | PascalCase | `UserCard.vue` |
| Composable | camelCase + use | `useAuth.ts` |
| 工具函数 | camelCase | `formatDate.ts` |
| Store | camelCase + Store | `authStore.ts` |
| Sass 变量 | kebab-case | `$bg-color` |

## 常用命令

```bash
pnpm dev          # 开发
pnpm build        # 构建
pnpm test         # 测试
pnpm typecheck    # 类型检查
pnpm lint         # ESLint
```
## Git 工作流

```
feature/xxx → develop → testing → staging → release/x.y.z → master
```

## Git 提交规范

```
feat: 新功能
fix: 修复 bug
refactor: 重构
docs: 文档
chore: 构建/工具
```

## 禁止事项

- ❌ `console.log` → 用 `logger`
- ❌ 直接操作 DOM → 用 Vue `ref`
- ❌ 直接修改 store → 用 action
- ❌ 硬编码颜色/像素 → 用 Design Tokens
- ❌ 异步在 `setup()` → 用 `onMounted`
- ❌ 复杂内联事件 → 抽到函数

## 开发环境 Mock 登录

手机号：任意符合格式（如 13800138000）
密码：任意（如 123456）

## 参考文档

- `.claude/rules/` - 各模块详细规则
- `docs/` - 项目文档