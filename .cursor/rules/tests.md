# 测试模块上下文

本目录存放所有测试文件。

## 技术栈

- 测试框架: Vitest（与 Vite 共享配置）
- 组件测试: @vue/test-utils
- 断言: vitest 内置
- 环境: jsdom

## 文件命名

- `*.test.ts` — 工具函数、composables、API 的测试
- `*.test.ts` — Vue 组件的测试

## 测试规范

### 组件测试

```typescript
import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import UserCard from '@/components/user/UserCard.vue'

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

### 工具函数测试

```typescript
import { describe, it, expect } from 'vitest'
import { formatDate } from '@/utils/formatDate'

describe('formatDate', () => {
  it('formats date correctly', () => {
    expect(formatDate('2024-01-01')).toBe('2024年1月1日')
  })
})
```

## 规则

- 测试描述用中文或英文均可，同一个 describe 块内保持一致
- mock 外部依赖（API），不 mock 内部实现
- 每个 test case 只测一个行为
- 组件测试优先验证渲染结果，避免验证内部状态