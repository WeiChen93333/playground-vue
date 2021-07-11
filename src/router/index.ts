import {createRouter, createWebHashHistory} from "vue-router"
const path = '/workbench'
const routes = [
  {
    path:'/',
    redirect: '/playground-vue'
  },
  {
    path: '/playground-vue',
    name: 'playground-vue',
    component: () => import(`@/components/Layout.vue`),
    redirect: '/playground-vue/workbench',
    children: [
      {
        path: '/playground-vue/workbench',
        name: 'workbench',
        meta: { title: '工作台' },
        component: () => import(`@/views/workbench/index.vue`)
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  document.title = `学习园地 - ${to.meta.title}`;
  next()
});

export default router;