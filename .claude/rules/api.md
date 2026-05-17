# API 模块上下文

本目录存放 API 请求层代码，按业务模块拆分。

## 基础设施

- `request.ts` — 统一请求封装（axios），提供 `http.get/post/put/delete` 方法
- 所有 API 文件基于 `request.ts` 发请求
- 请求/响应类型定义在 `src/types/` 下

## 目录结构

```
src/api/
├── request.ts       # 统一请求封装
├── userApi.ts       # 用户 API
├── orderApi.ts      # 订单 API
└── index.ts         # 统一导出
```

## 命名规范

- 文件名: `xxxApi.ts`（camelCase + Api 后缀）
- 函数名: `动词 + 资源名`，如 `getUsers`, `createOrder`, `deleteComment`

## 规则

- 不要在 API 里做 try-catch，错误处理统一在请求拦截器
- 不要在 API 里做数据转换，保持透传
- 每个函数都要有明确的返回类型
- 使用封装的 `http` 对象，不要直接用 axios

## 参考

创建新 API 时参考 Skills `create-api` 的流程和模板。