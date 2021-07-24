<template>
  <div id="word-section">
    <div class="button-group">           
      <el-button 
        type="primary"
        @click="switchMode('meaning')"
        :class="{active: mode=='meaning'}">
      Meaning</el-button>
      <el-button 
        type="primary"
        @click="switchMode('sentence')"
        :class="{active: mode=='sentence'}">
      Sentence</el-button>     
    </div>
    <div class="search-box">
      <el-input type="textarea" class="text" @keyup.enter="inputSearch(inputWord)"
        v-model="inputWord">
      </el-input>
      <div class="serach-icon">
          <!-- <i class="el-icon-search" @click="inputSearch(inputWord)"></i>  -->
          
          <el-button 
            type="primary"
            @click="inputSearch(inputWord)">
            搜索</el-button>
      </div>
    </div>
    <div class="info-display">
      
      <!-- <component 
        :is="currentComponent" 
        :infoData="infoData"
        :currentWord="currentWord"></component>       -->
    </div>      
  </div>  
</template>

<script setup lang="ts">
// import WordInfoDisplay from '@/views/components/WordInfoDisplay'
// import SentenceDisplay from '@/views/components/SentenceDisplay'
import { ref, computed, onMounted, reactive, markRaw } from 'vue'
import { useStore} from 'vuex'
const store = useStore()

const wordCollection = computed(() => store.state.wordCollection).value
const searchHistory = computed(() => store.state.searchHistory).value
 

const mode = ref('meaning') 
const searchBoxVisible = ref(false)
const infoData = ref({})  //查到的单词释义/例句
const currentWord = computed(() => {
  if (searchHistory.length - 1 >= 0) {
    return searchHistory[searchHistory.length - 1]
  }
})
  // watch: {
  //   searchHistory(){      
  //     searchThroughDict(this)
  //   }
  // },
    //初始化时从 vuex 获取当前单词
const init = () => { 
  if(currentWord.value) searchThroughDict(currentWord.value) 
}
onMounted (() => init())
//切换释义/例句模式
const switchMode = (mode: string) => {
  mode.value = mode    
  if(currentWord.value) searchThroughDict(currentWord.value)   
}
// 在词典中查询单词
const searchThroughDict = async (word) => { // word 参数仅记忆卡片发送的查词事件携带
  // if(mode.value == 'meaning'){
  //   const params = {}
  //   params.word = word ? word.toLowerCase() : currentWord       
  //   const {data: meaningData} = await $http('GET', '/dict/words', { params })        
  //   infoData.value = markRaw(meaningData)
  // }else if(mode == 'sentence'){      
  //   queryInfo.word = currentWord
  //   const {data: sentenceData} = await $http('GET', '/dict/sentences', {
  //     params: queryInfo
  //   })      
  //   infoData.value = markRaw(sentenceData)
  // } 
}
//发送单词搜索事件
const inputWord = ref('')
const inputSearch = (inputWord: string) => {
  if(inputWord){
    store.commit('addSearchHistory', inputWord)
    inputWord.value = ''
  }
}  
  

</script>
<style lang="less" scoped>
#word-section{
  position: relative;
  height: 100%;
  .button-group{
    text-align: right;
    .el-button.active{
      background-color: #001c1c ;
    }       
  }   
  .search-box{
    margin-top: 20px;
    display: flex;
    .serach-icon{
      flex: 0 0 auto;
      text-align: right;
      line-height: 54px;
      // display: flex;
      // align-items: center;
      // justify-content: center;
      
        font-size: 20px;
        color: rgb(64, 128, 128);
    
    }
  } 
  
  .info-display{
    margin-top: 20px;
    height: calc(100% - 60px);
    padding-left: 10px;
    padding-right: 5px;
    border: 2px solid rgb(64, 128, 128) ;
    background-color: rgb(252, 252, 254) ;
  }
  
}
  
    
</style>