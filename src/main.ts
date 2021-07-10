import { createApp } from 'vue'
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import '@/assets/style/index.less'
import App from './App.vue'

createApp(App).use(ElementPlus).mount('#app')
