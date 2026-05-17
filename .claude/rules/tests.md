# Tests 模块上下文

本目录存放所有测试文件，测试文件放在目标文件同级目录。

## 技术栈

- 测试框架: Vitest（与 Vite 共享配置）
- 组件测试: @vue/test-utils
- 断言: vitest 内置
- 环境: jsdom

## 目录结构

测试文件放在目标文件同级的 `__tests__/` 目录：

```
src/
├── utils/
│   ├── formatDate.ts
│   └── __tests__/
│       └── formatDate.test.ts
├── stores/
│   ├── authStore.ts
│   └── __tests__/
│       └── authStore.test.ts
├── components/
│   ├── UserCard.vue
│   └── __tests__/
│       └── UserCard.test.ts
└── api/
    ├── userApi.ts
    └── __tests__/
        └── userApi.test.ts
```

## 命名规范

- 测试文件: `目标名.test.ts`
- 目录名: `__tests__`

## 规则

- 测试描述用中文或英文均可，同一个 describe 块内保持一致
- Mock 外部依赖（API），不 mock 内部实现
- 每个 test case 只测一个行为
- 组件测试优先验证渲染结果，避免验证内部状态

## 参考

编写测试时参考 Skills `create-test` 的流程和模板。