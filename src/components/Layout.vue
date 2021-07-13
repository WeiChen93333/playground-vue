<template>
  <el-container>
    <el-aside width="251px">
      <el-menu :default-active="activeMenuItem" router unique-opened :collapse="isCollapse"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        @select="selectMenuItem">
        <template v-for="(menu, index) in menuList">
          <el-submenu v-if="menu.showChildren">
            <template #title>
              <i :class="menu.res_icon"></i>
              <span>{{ menu.res_title }}</span>
            </template>
            <el-menu-item :index="menu.res_url" v-for="submenu in menu.children">{{ submenu.res_title }}</el-menu-item>
          </el-submenu>
          <el-menu-item :index="menu.res_url" v-else>
            <i :class="menu.res_icon"></i>
            <template #title>{{ menu.res_title }}</template>
          </el-menu-item>
        </template>
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

<script setup lang="ts">
import router from '@/router'
import menuList from './menuList'
import { ref, onMounted } from 'vue'
  const isCollapse = ref(false)
  onMounted(() => generateRoutes())
  const generateRoutes = () => {
    const routeList : any[] = []
    menuList.forEach(menu => {
      // 不展示子菜单则为可点击菜单, 才加入路由列表
      if (!menu.showChildren) {
        const path = menu.parent_url ? `/${menu.parent_url}/${menu.res_url}` : `/${menu.res_url}`
        const route = {
          path,
          name: menu.res_url,
          component: () => import(`@/views${path}.vue`)
        }
        routeList.push(route)
      }
    })
    // console.log('routerset')
    // router.addRoute('playground-vue', {
    //   path: '/playground-vue/surfing',
    //   name: 'surfing',
    //   meta: { title: '网上冲浪' },
    //   component: () => import(`@/views/surfing/index.vue`)
    // })
    // console.log(this.$router)
  }
  let activeMenuItem: string = 'workbench'
  const selectMenuItem = (index: string) => {
    activeMenuItem = index
    
  }
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
