---
name: git-commit
description: Git 提交，生成规范的提交信息
---

# Git 提交

根据以下步骤生成规范的提交信息：

1. **检查变更**: 分析 `git diff` 确定变更类型
2. **确定类型**: 根据 Conventional Commits 确定提交类型
3. **生成信息**: 格式为 `type: description`

### 提交类型

| 类型 | 说明 | 示例 |
|------|------|------|
| `feat` | 新功能 | `feat: 添加用户登录页面` |
| `fix` | 修复 bug | `fix: 修复表单验证失败问题` |
| `refactor` | 重构 | `refactor: 重构用户状态管理` |
| `style` | 格式调整 | `style: 修复代码缩进` |
| `docs` | 文档 | `docs: 更新 API 文档` |
| `chore` | 工具链 | `chore: 更新依赖版本` |
| `perf` | 性能 | `perf: 优化列表渲染性能` |
| `test` | 测试 | `test: 添加用户组件单元测试` |

### 分支检查

根据 `docs/git-workflow.md` 检查当前分支是否允许提交：
- `feature/*` 分支：正常提交
- `develop` / `testing` / `staging`：提醒用户不要直接提交，应从 feature 合并
- `master`：提醒用户不要直接提交，应从 release 合并

### 执行提交

```bash
git add .
git commit -m "type: description"
```
