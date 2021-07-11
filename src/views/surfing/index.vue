<template>
  <div class="surfing">
    <div class="sites">
      <el-menu default-active="1" class="el-menu-demo" mode="horizontal">
        <el-menu-item index="1">处理中心</el-menu-item>
        <el-submenu index="2">
          <template #title>我的工作台</template>
          <el-menu-item index="2-1">选项1</el-menu-item>
          <el-menu-item index="2-2">选项2</el-menu-item>
          <el-menu-item index="2-3">选项3</el-menu-item>
          <el-submenu index="2-4">
            <template #title>选项4</template>
            <el-menu-item index="2-4-1">选项1</el-menu-item>
            <el-menu-item index="2-4-2">选项2</el-menu-item>
            <el-menu-item index="2-4-3">选项3</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="3" disabled>消息中心</el-menu-item>
        <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
      </el-menu>
    </div>
    <!-- <iframe 
      src="http://120.79.214.0/music/#/music" 
      height="400" 
      width="700" 
      name="music" 
      frameborder="0" 
      scrolling="no" 
      sandbox="allow-same-origin allow-top-navigation allow-forms allow-scripts" 
    ></iframe> -->

  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRefs} from "vue"
 interface dataProps{

 }
export default defineComponent({
  name:"App",
  setup() {
  },
  data () {
    return {

    }
  }
})
</script>

<style lang="less" scoped>
</style>
