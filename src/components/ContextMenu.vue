<template>
  <div class="context-menu-wrapper h100"
    @contextmenu.prevent="showContextMenu"
    @click="contextMenuVisible = false"
    @mouseup="handleMouseup">
    <slot></slot>
    <ul class="context-menu" v-show="contextMenuVisible" v-getposition="mousePosition">
      <li>后退</li>
      <!-- <li @click.stop="reduceSearchHistory">返回</li> -->
      <li v-for="(item, index) in menu" :key="index" @click="item.handler">{{item.content}}</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits, defineEmit } from 'vue'
import { useStore} from 'vuex'
import {
  ElMessageBox
} from 'element-plus'
const store = useStore()
const emits = defineEmits(['searchInMeaning'])

//选中文本内容
let selectedText = ''
const handleMouseup = () => {
  selectedText = window.getSelection().toString()
}
// 显示右键菜单
const mousePosition = ref({})
const contextMenuVisible = ref(false)
const showContextMenu = (event) =>{
  mousePosition.value = { x: event.clientX, y: event.clientY }
  contextMenuVisible.value = true
}

const menu = [
  {
    content: '清空查词历史',
    handler: () => {
      store.commit('modules/reading/setSearchHistory', {
        operation: 'CLEAR',
        content: null
      })
    }
  },
  {
    content: '查询释义',
    handler: () => {
      console.log(ElMessageBox)
      if(!selectedText) return
      if(/\s/.test(selectedText)) return console.log(ElMessageBox)
      emits('searchInMeaning', selectedText)
    }
  },
  // {
  //   content: '查询例句',
  //   handler: sentenceSearch
  // },
]

</script>
<style lang="less" scoped>
.context-menu-wrapper{
  .context-menu{
    padding: 2px 0;
    color: black;
    font-size: 14px;
    background-color: white;
    border: 1px solid lightgray;
    position: fixed;
    z-index: 1000;
    li{
      height: 24px;
      padding: 5px 20px;
      user-select: none;
      &:hover{
        background-color: lightgray;
      }
    }
  }
}

</style>
