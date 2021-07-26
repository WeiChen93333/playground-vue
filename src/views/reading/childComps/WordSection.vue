<template>
  <div class="word-section">
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
      
      <el-input size="large" type="text" class="text" @keyup.enter="inputSearch"
        v-model="inputWord">
      </el-input>
      <div class="serach-icon" @click="inputSearch">
        <i class="el-icon-search"></i> 
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
import { ref, computed, onMounted, reactive, markRaw, watch,  getCurrentInstance } from 'vue'
import { useStore} from 'vuex'
const store = useStore()
const { proxy } = getCurrentInstance()

const wordCollection = computed(() => store.state.wordCollection).value 


const searchBoxVisible = ref(false)
const infoData = ref({})  //查到的单词释义/例句
const currentWord = computed(() => {
  if (searchHistory.length - 1 >= 0) {
    return searchHistory[searchHistory.length - 1]
  }
})

    //初始化时从 vuex 获取当前单词
const init = () => { 
  if(currentWord.value) searchThroughDict(currentWord.value) 
}
onMounted (() => init())
//切换释义/例句模式
const mode = ref('meaning') 
const switchMode = (modeValue: string) => {
  mode.value = modeValue 
  if(currentWord.value) searchThroughDict(currentWord.value)   
}

//发送单词搜索事件
const searchHistory: string[] = []
const inputWord = ref('contest')
const inputSearch = () => {
  if (inputWord.value) {
    addSearchHistory(inputWord.value)
  }
}
//改变查词跳转历史
const addSearchHistory = (inputWord: string) => {
  //匹配字母和 ' , 去掉可能的标点符号、空格     
  const reg = /[a-zA-Z']+/     
  inputWord = reg.exec(inputWord)![0].toLowerCase()   
  //判断是否连续查询同一个单词 
  if(searchHistory[searchHistory.length - 1] !== inputWord) {
    searchHistory.push(inputWord)
  }
  console.log(searchHistory)
}

const queryInfo = {
  pageNum: 1,
  pageSize: 5,
  word: ''
}
// 在词典中查询单词
const searchThroughDict = () => { // word 参数仅记忆卡片发送的查词事件携带
  console.log('search')
  if(mode.value === 'meaning'){
    const params: { word: string } = { word: '' }
    params.word = inputWord     
    const {data: meaningData} = proxy.$http.get('/dict/words', { params })        
    infoData.value = markRaw(meaningData)
  }else if(mode.value === 'sentence'){      
    queryInfo.word = inputWord
    const {data: sentenceData} = proxy.$http.get('/dict/sentences', {
      params: queryInfo
    })      
    infoData.value = markRaw(sentenceData)
  } 
}
watch (searchHistory, searchThroughDict)

</script>
<style lang="less" scoped>
.word-section{
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
    ::v-deep .el-input__inner{
      border-color: transparent;
      border-right: none;
      border-bottom: 1px solid #409EFF;
      border-radius: 0
    }
    .serach-icon{
      flex: 0 0 54px;
      text-align: center ;      
      line-height: 40px;
      font-size: 20px;
      color: #FFF;
      background-color: #409EFF;
      cursor: pointer;
    }
  } 
  
  .info-display{
    height: calc(100% - 100px);
    padding-left: 10px;
    padding-right: 5px;
    background-color: rgb(252, 252, 254) ;
    background-color: #DCDFE6 ;
  }
  
}
  
    
</style>