<template>
  <div id="context-menu-wrapper"
    @contextmenu.prevent="showContextMenu"
    @click="ContextMenuVisible = false"
    @mouseup="handleMouseup">
    <slot></slot>
    <ul id="context-menu" v-show="ContextMenuVisible" v-getposition="mousePosition">
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
  let mousePosition = {}
   
  // computed: {
  //   ...mapState(['wordCollection'])
  // },
  // directives:{
  //   getposition: {
  //     componentUpdated(el, binding){
  //       el.style.left = binding.value.x + 'px'     
  //       el.style.top = binding.value.y + 'px'          
  //     }
  //   }
  // },
 
  const showContextMenu = (event) =>{     
    mousePosition = {x: event.clientX, y: event.clientY} 
    ContextMenuVisible.value = true
  }, 
  //回退与清空查词历史
  // reduceSearchHistory(){
  //   this.$store.commit('reduceSearchHistory')
  // },
  // clearSearchHistory(){
  //   this.$store.commit('clearSearchHistory')
  // },

  //选中文本内容
  // let selectedText = ''
  const handleMouseup = () => {
    // selectedText = window.getSelection().toString()     
  }
  // meaningSearch(){
  //   if(!this.selectedText) return
  //   if(/\s/.test(this.selectedText)) return this.$message.show('请选择单词')
  //   this.$bus.$emit('meaningSearch', this.selectedText) 
  // },
  // sentenceSearch(){
  //   if(!this.selectedText) return
  //   if(/\s/.test(this.selectedText)) return this.$message.show('请选择单词')
  //   this.$bus.$emit('sentenceSearch', this.selectedText) 
  // },
  // addToWordCollection(){
  //   if(!this.selectedText) return
  //   if(/\s/.test(this.selectedText)) return this.$message.show('请选择单词')
  //   if(this.wordCollection.includes(this.selectedText)) return this.$message.show('该单词已经添加过')
  //   this.$store.commit('addWord', this.selectedText)
  //   this.$message.show(`成功添加 ${this.selectedText} 至单词集`)   
  // },
  // async addToSentenceCollection(){
  //   if(!this.selectedText) return  
  //   const userId = window.sessionStorage.getItem('userId')     
  //   const { data } = await this.$http('GET', '/userInfo', {params: {userId: userId}})
  //   if(data.sentences.includes(this.selectedText)) return this.$message.show('该句子已经添加过')
  //   // const reg = /[a-zA-z'\s]+\./g
  //   // let sentenceMatch = reg.exec(this.selectedText)      
  //   // while(sentenceMatch){
  //   //   data.sentences.push(sentenceMatch[0]) 
  //   //   sentenceMatch = reg.exec(this.selectedText)       
  //   // }           
  //   data.sentences.push(this.selectedText)
  //   console.log(data.sentences)
  //   this.$http('POST', `/userInfo/update/${userId}`, {revisedSentenceCollection: data.sentences})       
  // }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
#context-menu-wrapper
  #context-menu 
    padding 2px 0
    color black
    font-size 14px
    background-color white      
    border 1px solid lightgray
    position fixed
    z-index 1000
    li      
      height 24px   
      padding 5px 20px 
      user-select none
      &:hover 
        background-color lightgray
</style>