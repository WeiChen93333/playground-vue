<template> 
  <div class="reading">
    <el-row>
      <el-col :span="12">
        <TextSection/>
      </el-col>        
      <el-col :span="12">
        <WordSection/>
      </el-col>    
    </el-row>      
  </div>
</template>

<script setup lang="ts">

import TextSection from './childComps/TextSection.vue'
import WordSection from './childComps/WordSection.vue'


  // mounted(){
  //   //刷新或关闭页面前保存 store.state 的数据
  //   window.addEventListener('unload', this.saveState)
  // },
  // methods: {
  //   saveState() { // 保存 store.state 的数据
  //     window.localStorage.setItem('state', JSON.stringify(this.$store.state))
  //   }     
  // }

</script>
<style lang="less" scoped>
.reading{
  height: 100%;
  // background-color: #408080;
    
  .el-row{
    // margin: 0 auto;
    // margin-top: 5%;
    // height: 640px;
    height: 100%;
    padding: 20px;
    padding-bottom: 60px;
    // color: green;
    // background-color: #add8e6    ;
  }
   
    .el-col {
      height: 100%;
    }
      

  }
</style>