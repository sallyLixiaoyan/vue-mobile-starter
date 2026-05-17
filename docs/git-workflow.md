# Git 分支与环境流水线

本文档说明项目采用的**分支命名、代码推进顺序**，以及分支与**运行环境（DEV / TEST / GRAY / UAT / PROD）**的对应关系。

---

## 总览：代码推进方向

```text
  feature/xxx ──┐
  feature/yyy ──┼──► develop ──► testing ──► staging ──► release/1.0.0 ──► 生产部署
                │       │            │           │              │              │
              DEV环境  TEST环境    GRAY环境      UAT环境        PROD环境
                │      (测试)      (灰度)        (验收)         (生产)
                │
                └───────────────────────────────────────────────────────────► master（归档）
```

---

## 分支与环境对应表

| 分支 | 环境 | 说明 |
|------|------|------|
| `feature/*` | 本地 | 功能开发分支，完成后合并回 `develop` |
| `develop` | **DEV**（开发） | 主开发线，用于联调与日常验证 |
| `testing` | **TEST**（测试） | 测试环境，供测试用例与缺陷回归 |
| `staging` | **GRAY**（灰度） | 灰度/预发，生产前最后验证 |
| `release/x.y.z` | **UAT**→**PROD** | 版本发布分支，生产部署以此为准 |
| `master` | 归档 | 生产发布后合并归档，保留线上代码历史 |

---

## 各分支职责

### feature/*
- 日常开发在此进行
- 完成后合并回 `develop`（建议经 MR / Code Review）
- 多个 feature 可并行存在

### develop
- 开发环境部署分支
- 集成各 feature 后的主开发线

### testing
- 从 `develop` 合并
- 供测试团队执行用例与缺陷回归

### staging
- 从 `testing` 推进
- 灰度/预发环境

### release/x.y.z
- 从 `staging` 拉出
- 只做缺陷修复与发布相关变更，避免新功能
- 生产部署以该分支代码为准
- 发布后合并入 `master` 并打 tag（如 `v1.0.0`）

### master
- 归档线，保留线上真实代码历史
- 不直接在 master 上开发

---

## Hotfix 流程

1. 从 `master` 或 `release` 拉出 `hotfix/xxx`
2. 修复后合并回 `release` / `master`
3. **同步回 `develop`**（及必要时 `testing` / `staging`），避免分支漂移

---

## 协作要点

- 生产发布只认 `release/*` 与 tag
- 禁止从 `develop` / `testing` 直接发布生产
- 发布后执行 `release` → `master` 归档并打 tag
