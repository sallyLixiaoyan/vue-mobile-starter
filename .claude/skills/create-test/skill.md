---
name: create-test
description: Use when writing unit tests for components, composables, api, or utility functions
---

# 编写测试

## Overview
为代码编写单元测试，使用 vitest 和 @vue/test-utils，确保代码质量和可维护性。

## When to Use
- 完成新功能开发后需要编写测试
- 为现有代码补充测试覆盖
- 修复 bug 后需要添加回归测试
- 重构代码前需要确保测试覆盖

## Implementation Steps

1. 先读取 `.claude/rules/tests.md` 了解测试规范
2. 先读取目标文件的源码，理解其功能和边界
3. 在目标文件同级目录创建 `__tests__/` 目录
4. 创建 `{{目标名}}.test.ts` 测试文件
5. 使用 vitest + @vue/test-utils
6. 覆盖正常流程和边界情况
7. Mock 外部依赖（API 调用），不 mock 内部实现

## 测试目录结构

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

## 工具函数测试模板

```typescript
// src/utils/__tests__/formatDate.test.ts
import { describe, it, expect } from 'vitest'
import { formatDate } from '../formatDate'

describe('formatDate', () => {
  it('formats date correctly', () => {
    expect(formatDate('2024-01-01')).toBe('2024年1月1日')
  })

  it('handles invalid input', () => {
    expect(formatDate('')).toBe('')
  })
})
```

## Store 测试模板

```typescript
// src/stores/__tests__/authStore.test.ts
import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useAuthStore } from '../authStore'

describe('authStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('has initial state', () => {
    const store = useAuthStore()
    expect(store.token).toBeNull()
    expect(store.isLoggedIn).toBe(false)
  })

  it('login correctly', () => {
    const store = useAuthStore()
    store.login('test-token', { id: '1', name: 'Test' })
    expect(store.token).toBe('test-token')
    expect(store.isLoggedIn).toBe(true)
  })
})
```

## 组件测试模板

```typescript
// src/components/__tests__/UserCard.test.ts
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UserCard from '../UserCard.vue'

describe('UserCard', () => {
  it('renders user name', () => {
    const wrapper = mount(UserCard, {
      props: {
        user: { id: '1', name: 'Test User' }
      }
    })
    expect(wrapper.text()).toContain('Test User')
  })
})
```

## Core Principles
- 测试行为而不是实现细节
- Mock 外部依赖，不 mock 内部实现
- 每个测试用例只验证一个行为

## Common Mistakes
- ❌ 测试实现细节而不是行为
- ❌ Mock 内部实现导致测试脆弱
- ❌ 一个测试用例验证多个行为
- ❌ 没有覆盖边界情况和错误场景