<template>
  <div class="main-layout">
    <van-nav-bar
      :title="pageTitle"
      :left-arrow="showBack"
      fixed
      placeholder
      @click-left="handleBack"
    />
    <div class="main-layout__content">
      <router-view v-slot="{ Component, route }">
        <keep-alive :include="cachedPages">
          <component :is="Component" :key="route.fullPath" />
        </keep-alive>
      </router-view>
    </div>
    <van-tabbar v-model="active" route fixed>
      <van-tabbar-item to="/" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/user" icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

// 当前激活的标签
const active = ref(0)

// 页面标题
const pageTitle = computed(() => {
  const title = route.meta.title as string
  return title || 'Vue Mobile Starter'
})

// 是否显示返回按钮
const showBack = computed(() => {
  return route.meta.showBack as boolean
})

// 缓存的页面
const cachedPages = computed(() => {
  const cacheList: string[] = []
  if (route.meta.keepAlive) {
    cacheList.push(route.name as string)
  }
  return cacheList
})

// 监听路由变化更新 tabbar
watch(
  () => route.path,
  (path) => {
    if (path === '/') {
      active.value = 0
    } else if (path === '/user') {
      active.value = 1
    }
  },
  { immediate: true }
)

// 返回上一页
const handleBack = () => {
  router.back()
}
</script>

<style lang="scss" scoped>
.main-layout {
  min-height: 100vh;
  background-color: $bg-color;

  &__content {
    padding-bottom: 50px; // tabbar 高度
  }
}
</style>