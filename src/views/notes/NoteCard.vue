<template>
  <div class="note-card mb16">
    <div class="article-list">
      <el-card class="box-card">
        <template #header>
          <div class="card-header" @click="toggleContentDisplay">
            <span>子元素 flex:1 时，父元素宽度被子元素撑开</span>
            <el-button class="button" type="text" @click.stop="edit">编辑</el-button>
          </div>
        </template>
        <CollapseTransition>
          <div class="card-content" v-show="contenVisible">
            解决方式：给子元素加上 width: 0
          </div>
        </CollapseTransition>
      </el-card>
    </div>
    <EditDrawer ref="editDrawer"></EditDrawer>
  </div>
</template>

<script setup lang="ts">
import CollapseTransition from '@/components/collapse-transition.js'
import EditDrawer from './EditDrawer.vue'
import { ref, reactive, toRefs, onMounted } from 'vue'
import axios from '@/axios/index'
const contenVisible = ref(false)
const toggleContentDisplay = () => {
  contenVisible.value = !contenVisible.value
}
const editDrawer = ref(null)
const edit = () => {
  editDrawer.value.showDrawer()
}
</script>

<style lang="less" scoped>
.note-card{
  .card-header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    .button {
      padding: 0;
      min-height: auto;
    }
  }
  :deep .el-card__body{
    padding: 0;
  }
  .card-content{
    padding: 20px;
  }  
}
</style>