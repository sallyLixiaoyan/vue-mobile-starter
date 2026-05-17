<template>
  <div class="auth-layout">
    <div class="auth-layout__container">
      <div class="auth-layout__header">
        <h1 class="auth-layout__title">{{ title }}</h1>
        <p class="auth-layout__subtitle">{{ subtitle }}</p>
      </div>
      <div class="auth-layout__content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const title = ref('Vue Mobile Starter')
const subtitle = ref('欢迎使用移动端脚手架')
</script>

<style lang="scss" scoped>
.auth-layout {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, $primary 0%, $primary-light 100%);
  padding: $spacing-lg;

  &__container {
    width: 100%;
    max-width: 400px;
    background: $bg-color-light;
    border-radius: $radius-lg;
    box-shadow: $shadow-lg;
    overflow: hidden;
  }

  &__header {
    padding: $spacing-xl $spacing-lg $spacing-lg;
    text-align: center;
    background: $bg-color-light;
  }

  &__title {
    font-size: $font-size-xl;
    font-weight: $font-weight-bold;
    color: $text-color;
    margin-bottom: $spacing-xs;
  }

  &__subtitle {
    font-size: $font-size-sm;
    color: $text-color-light;
  }

  &__content {
    padding: 0 $spacing-lg $spacing-lg;
  }
}
</style>