# 组件模式规范

## 何时拆分组件

**应该拆分的信号：**
- 模板超过 100 行
- 一个组件内包含多个独立的业务逻辑
- 同一个 UI 模式在不同页面复用（≥ 2 次）
- Props 超过 5 个（考虑拆分或合并）

**不拆分的场景：**
- 仅结构不同但逻辑完全相同的简单元素
- 只在当前页面使用且不超过 30 行的内容

## Props 设计原则

1. **单向数据流**: Props 只负责接收数据，不在组件内修改
2. **最小接口**: 只暴露必要的 Props，不要 props 透传
3. **类型完整**: 所有 Props 必须有 TypeScript 类型定义
4. **默认值**: 可选 Props 必须提供 `withDefaults`

```typescript
// 好的做法
interface Props {
  user: User
  showAvatar?: boolean
  onClick?: () => void
}

const props = withDefaults(defineProps<Props>(), {
  showAvatar: true,
})

// 差的写法 - 过多 Props 透传
const props = defineProps<any>()  // ❌
```

## 组件通信方式选择

| 场景 | 推荐方式 | 原因 |
|------|---------|------|
| 父子 | props + emit | 最简单直接 |
| 爷孙（2-3 层） | provide / inject | 避免 props 透传 |
| 跨层级 | provide / inject | 减少中间层传递 |
| 跨组件/全局 | Pinia store | 状态共享 |
| 兄弟组件 | 提升到共同父组件 或 store | 避免直接通信 |

## 组合式函数设计模式

```typescript
// 标准模板
import { ref, onMounted, onUnmounted } from 'vue'

export function useXxx(options?: XxxOptions) {
  // 1. 状态
  const loading = ref(false)
  const data = ref<XxxData | null>(null)

  // 2. 副作用
  const cleanup = () => {
    // 清理逻辑
  }

  // 3. 生命周期
  onMounted(() => {
    // 初始化
  })
  onUnmounted(cleanup)

  // 4. 方法
  const fetchData = async () => {
    loading.value = true
    try {
      data.value = await api.getXxx()
    } finally {
      loading.value = false
    }
  }

  // 5. 返回值
  return {
    loading: readonly(loading),
    data: readonly(data),
    fetchData,
  } as const
}
```

**原则**:
- 状态通过 `readonly` 暴露，防止外部直接修改
- 使用 `as const` 确保类型推导
- 副作用必须在 `onUnmounted` 中清理

## 常见组件模板示例

### 列表组件

```vue
<template>
  <van-list
    v-model:loading="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
  >
    <van-cell
      v-for="item in list"
      :key="item.id"
      :title="item.title"
    />
  </van-list>
</template>

<script setup lang="ts">
const list = ref<Item[]>([])
const loading = ref(false)
const finished = ref(false)
const page = ref(1)

const onLoad = async () => {
  const data = await api.getList({ page: page.value })
  list.value.push(...data.items)
  page.value++
  finished.value = data.total <= list.value.length
  loading.value = false
}
</script>
```

### 表单组件

```vue
<template>
  <van-form @submit="onSubmit">
    <van-field
      v-model="form.username"
      label="用户名"
      :rules="[{ required: true, message: '请输入用户名' }]"
    />
    <van-field
      v-model="form.phone"
      label="手机号"
      type="tel"
      :rules="[
        { required: true, message: '请输入手机号' },
        { pattern: /^1\d{10}$/, message: '手机号格式错误' }
      ]"
    />
    <div class="submit-btn">
      <van-button type="primary" native-type="submit" :loading="submitting">
        提交
      </van-button>
    </div>
  </van-form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

interface FormData {
  username: string
  phone: string
}

const form = reactive<FormData>({
  username: '',
  phone: '',
})

const submitting = ref(false)

const onSubmit = async (values: FormData) => {
  submitting.value = true
  try {
    await api.submitForm(values)
  } finally {
    submitting.value = false
  }
}
</script>
```
