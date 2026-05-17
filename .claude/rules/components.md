# Components 模块上下文

本目录存放通用业务组件，每个组件一个文件夹。

## 目录结构

```
src/components/
├── UserCard/
│   ├── index.vue              # 组件实现
│   ├── types.ts               # Props 和内部类型（可选）
│   └── useUserCard.ts         # 组件专属 composable（可选）
├── OrderCard/
│   └── index.vue
└── index.ts                   # 统一导出（可选）
```

## 组件结构

一个组件文件夹内可包含：
- `index.vue` — 组件入口（必须）
- `types.ts` — Props 和内部类型定义（可选）
- `use组件名.ts` — 组件专属 composable（可选）

## 命名规范

- 文件名: PascalCase（如 `UserCard.vue`）
- Props 接口: `组件名Props`
- 组件专属 composable: `use组件名.ts`

## 规则

- 必须用 Vant 组件作为基础，不要从零写 UI
- Props 必须使用 `withDefaults` + TypeScript 类型
- 组件只负责渲染，业务逻辑抽到 composable
- 数据请求走 `api/` 层，不在组件内直接调用 API
- 样式使用 `<style lang="scss" scoped>`

## 参考

创建新组件时参考 Skills `create-component` 的流程和模板。