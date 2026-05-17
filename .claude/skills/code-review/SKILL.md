---
name: code-review
description: Use when reviewing code changes for quality, security, performance, and compliance with project standards
---

# 代码审查

## Overview
系统化审查代码质量，确保符合项目规范、安全标准和性能要求。

## When to Use
- 完成功能开发后，提交代码前
- 审查他人的代码变更
- 重构代码后验证质量
- 发现潜在问题时进行全面检查

## Review Checklist

### 规范合规
- 是否符合 CLAUDE.md 中的编码规范
- TypeScript 类型是否严谨（无 any，无 as 强转）
- 组件 Props 是否合理（必填/可选区分清晰）
- 是否正确使用了 Vant 组件，没有重复造轮子
- 命名是否符合项目约定（PascalCase/camelCase）

### 安全性
- 是否有 XSS 风险（v-html、未转义的用户输入）
- 是否有硬编码的敏感信息

### 性能
- 列表渲染是否有 key
- 是否有不必要的响应式状态
- 是否正确使用 computed 和 watch

### 可维护性
- 函数/变量命名是否清晰表达意图
- 复杂逻辑是否有注释说明 why
- 是否过度抽象

## Output Format
按严重程度分级（error / warning / suggestion），给出文件路径和行号。

## Common Mistakes
- ❌ 只关注代码风格，忽略安全和性能问题
- ❌ 提出模糊的建议，没有具体的修改方案
- ❌ 过度关注细节，忽略整体架构问题
- ❌ 没有区分问题的严重程度