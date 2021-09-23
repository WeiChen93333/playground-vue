<template>
  <div class="context-menu-wrapper h100"
    @contextmenu.prevent="showContextMenu"
    @click="ContextMenuVisible = false"
    @mouseup="handleMouseup">
    <slot></slot>
    <ul class="context-menu" v-show="ContextMenuVisible" v-getposition="mousePosition">
      <li>返回</li>
      <!-- <li @click.stop="reduceSearchHistory">返回</li> -->
      <li v-for="(item, index) in menu" :key="index" @click="item.handler">{{item.content}}</li>        
    </ul>   
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  const ContextMenuVisible = ref(false)
  const menu = [
    // {
    //   content: '清空查词历史',    
    //   handler: clearSearchHistory  
    // },
    // {
    //   content: '查询释义',    
    //   handler: meaningSearch   
    // },
    // {
    //   content: '查询例句',
    //   handler: sentenceSearch   
    // },
    // {
    //   content: '添加到单词集',
    //   handler: addToWordCollection  
    // },
    // {
    //   content: '添加到句集',
    //   handler: addToSentenceCollection   
    // }
  ]
  const mousePosition = ref({})
   
  // computed: {
  //   ...mapState(['wordCollection'])
  // },
 
  const showContextMenu = (event) =>{
    mousePosition.value = { x: event.clientX, y: event.clientY } 
    ContextMenuVisible.value = true
  }

  //选中文本内容
  // let selectedText = ''
  const handleMouseup = () => {
    // selectedText = window.getSelection().toString()     
  }
  
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