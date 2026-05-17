# Vue Mobile Starter

Vue 3 移动端项目脚手架，用于快速创建移动端项目。

## 脚手架开发

### 本地开发

```bash
# 安装依赖
pnpm install

# 启动模板项目开发
pnpm dev

# 类型检查
pnpm typecheck

# 运行测试
pnpm test
```

### 测试创建命令

```bash
node ./create/index.js
```

## 发布到 Git

```bash
# 初始化 Git
git init
git add .
git commit -m "feat: 初始化脚手架"

# 推送到远程仓库
git remote add origin git@github.com:sallyLixiaoyan/vue-mobile-starter.git
git push -u origin master
```

## 团队成员创建新项目

### 前置要求

- Node.js 18.0.0 或更高版本
- pnpm（用于安装项目依赖）

### 创建步骤

#### 方式一：npx（推荐）

```bash
# 在任意目录运行
npx github:sallyLixiaoyan/vue-mobile-starter create-vue-mobile my-project
```

#### 方式二：全局安装后使用

```bash
# 全局安装脚手架（只需一次）
npm install -g git@github.com:sallyLixiaoyan/vue-mobile-starter.git

# 之后在任意目录创建新项目
create-vue-mobile my-project
create-vue-mobile another-project
```

#### 方式三：克隆后直接运行

```bash
git clone git@github.com:sallyLixiaoyan/vue-mobile-starter.git
cd vue-mobile-starter
node ./create/index.js
```

### 交互式问答

运行命令后，按提示输入：

1. **项目名称**（必填）- kebab-case 格式，如 `my-project`
2. **项目标题** - 如 `我的项目`
3. **项目描述** - 可选
4. **AI 编码工具**（多选）- 用上下箭头切换，空格选择，回车确认
   - Claude Code (.claude)
   - Cursor (.cursorrules)

### 创建完成后

```bash
# 进入项目
cd my-project

# 安装依赖
pnpm install

# 启动开发
pnpm dev

# 访问 http://localhost:3000
```

> **说明**：脚手架可用 npm/npx 安装，但创建的新项目使用 pnpm 作为包管理器。

### 发布到 npm（可选）

```bash
# 发布脚手架到 npm
npm publish

# 团队成员全局安装
npm install -g vue-mobile-starter

# 创建新项目
create-vue-mobile my-project
```

## 脚手架结构

```
vue-mobile-starter/
├── create/              # 项目生成脚本
│   ├── index.js         # 主流程
│   └── prompts.js       # 交互式问答
├── src/                 # 模板项目源码
│   ├── api/             # API 请求层
│   ├── components/      # 公共组件
│   ├── composables/     # 组合式函数
│   ├── layouts/         # 布局组件
│   ├── pages/           # 页面组件
│   ├── router/          # 路由配置
│   ├── stores/          # Pinia 状态
│   ├── styles/          # 全局样式 + Design Tokens
│   ├── types/           # 类型定义
│   └── utils/           # 工具函数
├── docs/                # 项目文档
├── .claude/             # Claude Code 配置
│   ├── rules/           # 模块规范
│   ├── skills/          # 实施流程 + 代码模板
│   └── commands/        # 用户命令
├── .cursor/             # Cursor 配置
│   └ rules/             # 模块规范
├── CLAUDE.md            # Claude Code 项目说明
├── .cursorrules         # Cursor 项目说明
└── package.json         # 脚手架配置
```

## 添加新的 Skill

在 `.claude/skills/` 目录创建 `skill-name.md` 或 `skill-name/skill.md`：

```markdown
---
name: skill-name
description: 使用场景描述
---

# Skill 标题

## When to Use
- 场景 1
- 场景 2

## Implementation Steps
1. 步骤 1
2. 步骤 2

## 代码模板（可选）
...
```

## 添加新的 Command

在 `.claude/commands/` 目录创建 `command-name.md`：

```markdown
---
name: command-name
description: 命令描述
---

# Command 标题

执行步骤...

## 代码模板
...
```

## 添加新的 Rule

在 `.claude/rules/` 目录创建 `module-name.md`：

```markdown
# 模块上下文

## 目录结构
...

## 命名规范
...

## 规则
...
```

## 模板项目配置

### 技术栈

- Vue 3.4+ / Vite 5+ / TypeScript 5+
- Vant 4（自动导入）
- Pinia + Vue Router 4
- Sass + PostCSS px-to-viewport
- Vitest

### 关键配置文件

| 文件 | 作用 |
|------|------|
| `vite.config.ts` | Vite 配置 + 组件自动导入 |
| `postcss.config.js` | px-to-viewport 移动端适配 |
| `src/styles/variables.scss` | Design Tokens |

## 更新模板

修改 `src/` 目录下的模板代码后，团队成员创建新项目时会自动使用最新模板。

## 注意事项

- 新项目不包含 README.md（让团队自己编写）
- AI 配置文件（`.claude`、`.cursorrules`）会根据用户选择保留或删除
- 创建新项目时会自动初始化 Git
- 脚手架本身可用 npm/npx 安装