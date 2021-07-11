<template>
  <el-container>
    <el-aside width="251px">
      <el-menu default-active="1-4-1" unique-opened :collapse="isCollapse"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-submenu index="1">
          <template #title>
            <i class="el-icon-location"></i>
            <span>导航一</span>
          </template>
          <el-submenu index="1-4">
            <template #title>选项4</template>
            <el-menu-item index="1-4-1">选项1</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="2">
          <i class="el-icon-menu"></i>
          <template #title>导航二</template>
        </el-menu-item>
        <el-menu-item index="3" disabled>
          <i class="el-icon-document"></i>
          <template #title>导航三</template>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-setting"></i>
          <template #title>导航四</template>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>Header</el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import router from '@/router'
import menuList from './menuList'
import { ref, defineComponent } from 'vue'
export default defineComponent({
  setup() {
    
    const isCollapse = ref(false);
    return {
      isCollapse
    };
  },
  created () {
    this.generateRoutes()
  },
  methods: {
    generateRoutes () {
      const routeList : any[] = []
      menuList.forEach(menu => {
        // 不展示子菜单则为可点击菜单, 才加入路由列表
        if (!menu.showChildren) {
          const path = menu.parent_url ? `/${menu.parent_url}/${menu.res_url}` : `/${menu.res_url}`
          const route = {
            path,
            name: menu.res_url,
            component: () => import(`@/views${path}`)
          }
          routeList.push(route)
        }
      })
      console.log(routeList)
      console.log(router)
      router.addRoute('playground-vue', {
        path: '/playground-vue/surfing',
        name: 'surfing',
        meta: { title: '工作台' },
        component: () => import(`@/views/surfing/index.vue`)
      })
    }
  }
});
</script>

<style lang="less" scoped>
.el-container{
  height: 100%;
  .el-aside{
    background-color: rgb(84, 92, 100);
  }
  .el-header{
    display: flex;
    align-items: center;
    padding: 0 16px;
    background: #fff;
    box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
  }
  .el-main{

  }
}
</style>
