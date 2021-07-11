// 引入创建函数与根组件
import { createApp } from 'vue'
import App from './App.vue'
// 引入 element
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import '@/assets/style/index.less'
// 引入 router store
import router from './router'
// import store from './store'
const app = createApp(App)
app
  .use(ElementPlus)
  .use(router)
  .mount('#app')
