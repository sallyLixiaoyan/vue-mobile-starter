---
name: explore
description: 当需要探索代码库、查找现有实现时使用，帮助理解项目结构和可复用资源
---

# 探索代码库

当开始复杂任务前，先探索代码库，查找可复用的实现。

## 适用场景

- 开始新功能开发前
- 重构代码前需要了解现有结构
- 修复复杂 Bug 需要定位问题
- 寻找类似的实现作为参考

## 探索流程

### 1. 确定搜索目标

- 明确要查找什么（函数、组件、类型、配置）
- 列出可能的关键词

### 2. 搜索策略

| 目标 | 工具 | 示例 |
|------|------|------|
| 查找文件 | `glob` | `src/components/**/*.vue` |
| 搜索代码 | `grep` | 搜索函数名、关键词 |
| 阅读文件 | `read` | 阅读关键文件理解实现 |

### 3. 重点查找

**优先查找：**
- `src/utils/` - 工具函数（日期格式化、验证等）
- `src/components/` - 可复用组件
- `src/composables/` - 组合式函数
- `src/api/` - API 接口定义
- `src/types/` - 类型定义

### 4. 记录发现

记录可复用的资源：
```markdown
## 可复用资源
- `src/utils/formatDate.ts` - 日期格式化
- `src/components/UserCard.vue` - 用户卡片组件
- `src/stores/authStore.ts` - 认证状态
- `src/api/userApi.ts` - 用户相关 API
```

## 探索技巧

### 查找组件
```bash
glob: src/components/**/*.vue
grep: "UserCard"
```

### 查找函数
```bash
grep: "function formatDate"
grep: "export function"
```

### 查找类型
```bash
grep: "interface User"
grep: "type ApiResponse"
```

### 查找 API
```bash
glob: src/api/*.ts
grep: "getUserList"
```

## 注意事项

- 不要假设不存在，先搜索确认
- 找到类似实现后参考其模式
- 记录发现，避免重复搜索
- 探索完成后汇报发现