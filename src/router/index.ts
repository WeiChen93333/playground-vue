import {createRouter, createWebHashHistory, RouteRecordRaw} from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  // {
  //   path: '/',
  //   name: 'base',
  //   redirect: '/playground-vue',
  //   component: () => import(`@/views/layout/index.vue`),
  // },
  {
    path: '/',
    name: 'playground-vue',
    component: () => import(`@/views/layout/index.vue`),
    redirect: '/playground-vue/workbench',
    children: [
      {
        path: '/playground-vue/workbench',
        name: 'workbench',
        meta: { title: '工作台' },
        component: () => import(`@/views/workbench/index.vue`)
      },
      // {
      //   path: '/playground-vue/surfing',
      //   name: 'surfing',
      //   meta: { title: '网上冲浪' },
      //   component: () => import(`@/views/surfing/index.vue`)
      // }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'base',
    // redirect: '/playground-vue',
    component: () => import(`@/views/layout/index.vue`),
    // 刷新浏览器时 from.path 为 /, to.path 为当前路径; 
    // 若为动态添加的路由,刷新后不存在则进入此路由, 此时存下 beforeUrl, 待路由添加后跳转
    beforeEnter: (to) => {
      console.log(to.path)
      sessionStorage.setItem('beforeUrl', to.path)
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  console.log(to)
  document.title = `学习园地 - ${to.meta.title}`
  next()
})

export default router;