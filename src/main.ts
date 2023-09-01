import { createApp } from 'vue'
import App from './App.vue'

// Plugins
import { registerPlugins } from '@/plugins'

// css
import "@/styles/index.scss"


// 创建vue实例
const app = createApp(App)

registerPlugins(app)

// 挂载实例
app.mount('#app');

