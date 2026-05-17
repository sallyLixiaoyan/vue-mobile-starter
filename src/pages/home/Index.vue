<template>
  <div class="home-page">
    <van-cell-group title="欢迎使用">
      <van-cell title="Vue 3.4+" value="最新版本" />
      <van-cell title="Vite 5+" value="极速构建" />
      <van-cell title="TypeScript 5+" value="类型安全" />
      <van-cell title="Vant 4" value="UI组件库" />
      <van-cell title="Pinia" value="状态管理" />
    </van-cell-group>

    <div class="home-page__actions">
      <van-button type="primary" block @click="handleNavigate">
        开始体验
      </van-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const handleNavigate = () => {
  router.push('/user')
}
</script>

<style lang="scss" scoped>
.home-page {
  padding: $spacing-md;

  &__actions {
    margin-top: $spacing-lg;
  }
}
</style>