<template>
  <div class="user-page">
    <div class="user-page__header">
      <van-image
        round
        width="80"
        height="80"
        :src="userInfo?.avatar || 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg'"
      />
      <h2 class="user-page__name">{{ userInfo?.name || '用户' }}</h2>
    </div>

    <van-cell-group title="个人信息" inset>
      <van-cell title="手机号" :value="userInfo?.phone || '未设置'" />
      <van-cell title="邮箱" :value="userInfo?.email || '未设置'" />
    </van-cell-group>

    <van-cell-group title="设置" inset>
      <van-cell title="退出登录" is-link @click="handleLogout" />
    </van-cell-group>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { showDialog } from 'vant'
import { useAuthStore } from '@/stores/authStore'

const router = useRouter()
const authStore = useAuthStore()

const userInfo = computed(() => authStore.user)

const handleLogout = () => {
  showDialog({
    title: '提示',
    message: '确定要退出登录吗？',
  })
    .then(() => {
      authStore.logout()
      router.replace('/login')
    })
    .catch(() => {
      // 取消退出
    })
}
</script>

<style lang="scss" scoped>
.user-page {
  padding: $spacing-md;

  &__header {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: $spacing-lg;
    background: $bg-color-light;
    border-radius: $radius-lg;
    margin-bottom: $spacing-md;
  }

  &__name {
    margin-top: $spacing-md;
    font-size: $font-size-lg;
    font-weight: $font-weight-bold;
    color: $text-color;
  }
}
</style>