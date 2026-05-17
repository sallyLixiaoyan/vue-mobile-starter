import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import { router } from './router'
import { setupRouterGuards } from './router/guards'

// 样式
import 'vant/lib/index.css'
import '@/styles/index.scss'

const app = createApp(App)

// Pinia 状态管理
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)

// 路由
app.use(router)

// 路由守卫
setupRouterGuards(router)

app.mount('#app')