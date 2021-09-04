import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'base',
    component: () => import(`@/views/layout/index.vue`),
    redirect: '/reading',
    children: [
      {
        path: '/reading',
        name: 'reading',
        meta: { title: '工作台' },
        component: () => import(`@/views/reading/index.vue`)
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'all-match',
    component: () => import(`@/views/layout/index.vue`),
    // 刷新浏览器时 from.path 为 /, to.path 为当前路径; 
    // 若为动态添加的路由,刷新后不存在则进入此路由, 此时存下 beforeUrl, 待路由添加后跳转
    beforeEnter: (to) => {
      sessionStorage.setItem('beforeUrl', to.path)
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  document.title = `学习园地 - ${to.meta.title}`
  next()
})

export default router;