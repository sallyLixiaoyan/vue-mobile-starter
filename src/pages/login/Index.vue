<template>
  <div class="login-page">
    <van-form @submit="handleLogin">
      <van-cell-group inset>
        <van-field
          v-model="phone"
          name="phone"
          label="手机号"
          placeholder="请输入手机号"
          :rules="[
            { required: true, message: '请输入手机号' },
            { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确' },
          ]"
        />
        <van-field
          v-model="password"
          type="password"
          name="password"
          label="密码"
          placeholder="请输入密码"
          :rules="[{ required: true, message: '请输入密码' }]"
        />
      </van-cell-group>
      <div class="login-page__submit">
        <van-button round block type="primary" native-type="submit" :loading="loading">
          登录
        </van-button>
      </div>
      <!-- 开发环境测试账号提示 -->
      <div v-if="isDev" class="login-page__test-account">
        <van-cell-group inset title="测试账号（开发环境）">
          <van-cell title="手机号" value="13800138000" />
          <van-cell title="密码" value="123456" />
          <van-cell title="说明" value="任意符合格式的手机号+密码均可登录" />
        </van-cell-group>
      </div>
    </van-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { showToast } from 'vant'
import { userApi } from '@/api'
import { useAuthStore } from '@/stores/authStore'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const phone = ref('')
const password = ref('')
const loading = ref(false)

// 是否为开发环境
const isDev = import.meta.env.DEV

// Mock 登录数据（开发环境使用）
const mockLogin = () => {
  return {
    code: 200,
    message: 'success',
    data: {
      token: 'mock-token-' + Date.now(),
      user: {
        id: '1',
        name: '测试用户',
        avatar: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
        phone: phone.value,
      },
    },
  }
}

const handleLogin = async () => {
  loading.value = true
  try {
    // 开发环境使用 mock 登录
    if (isDev) {
      // 模拟网络延迟
      await new Promise((resolve) => setTimeout(resolve, 500))
      const response = mockLogin()
      authStore.login(response.data.token, response.data.user)
      showToast('登录成功')
      const redirect = route.query.redirect as string || '/'
      router.replace(redirect)
      return
    }

    // 生产环境调用真实 API
    const response = await userApi.login({
      phone: phone.value,
      password: password.value,
    })

    authStore.login(response.data.token, response.data.user)
    showToast('登录成功')

    const redirect = route.query.redirect as string || '/'
    router.replace(redirect)
  } catch (error) {
    showToast('登录失败')
  } finally {
    loading.value = false
  }
}
</script>

<style lang="scss" scoped>
.login-page {
  &__submit {
    margin-top: $spacing-lg;
  }

  &__test-account {
    margin-top: $spacing-lg;
  }
}
</style>