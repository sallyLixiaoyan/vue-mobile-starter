---
name: git-release
description: 当需要发布新版本时使用，执行 Git 版本发布流程
---

# Git 版本发布流程

当需要发布新版本时，按以下流程执行：

## 前置条件

- 当前在 `staging` 分支
- `staging` 已通过测试和验收
- 确认版本号（语义化版本：`major.minor.patch`）

## 发布步骤

### 1. 拉取 release 分支

```bash
git checkout staging
git pull origin staging
git checkout -b release/x.y.z
```

### 2. 版本更新

- 更新 `package.json` 中的 `version` 字段
- 更新 `CHANGELOG.md`（如有）
- 提交版本更新：

```bash
git add package.json
git commit -m "chore: bump version to x.y.z"
```

### 3. 部署到 UAT 环境

- 将 `release/x.y.z` 部署到 UAT 环境
- 等待验收通过

### 4. 生产发布

```bash
# 合并到 release 分支（从 staging）
git checkout release/x.y.z
git merge staging --no-ff

# 部署到生产环境
# （由 CI/CD 或运维执行）

# 打 tag
git tag -a v x.y.z -m "Release v x.y.z"
git push origin v x.y.z

# 归档到 master
git checkout master
git merge release/x.y.z --no-ff
git push origin master

# 同步回 develop
git checkout develop
git merge release/x.y.z --no-ff
git push origin develop

# 清理 release 分支（可选）
git branch -d release/x.y.z
git push origin --delete release/x.y.z
```

## Hotfix 流程

紧急修复时：

```bash
# 1. 从 master 拉出 hotfix
git checkout master
git checkout -b hotfix/xxx

# 2. 修复并提交
git commit -m "fix: 紧急修复 xxx"

# 3. 发布
git checkout release/x.y.z  # 或当前 release 分支
git merge hotfix/xxx --no-ff

# 4. 同步回 develop
git checkout develop
git merge hotfix/xxx --no-ff

# 5. 清理
git branch -d hotfix/xxx
```

## 注意事项

- 生产发布只认 `release/*` 分支
- 禁止从 `develop` / `testing` 直接发布生产
- 每次发布必须打 tag 并归档到 `master`
- Hotfix 修复后必须同步回 `develop`，避免分支漂移
