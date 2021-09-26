<template>
  <div class="word-info mb16">
    <div class="search-box">
      <el-input size="large" placeholder="请输入"
        v-model="inputWord"
        @keyup.enter="inputSearch">
        <template #prepend>
          <el-select v-model="searchMode" placeholder="Select">
            <el-option label="释义" value="meaning"></el-option>
            <el-option label="例句" value="sentence"></el-option>
          </el-select>
        </template>
      </el-input>
      <div class="serach-icon" @click="inputSearch">
        <i class="el-icon-search"></i>
      </div>
    </div>
    <div class="info-display">
      <div v-if="searchMode === 'meaning'">测试一</div>
      <div v-else>测试二</div>
      <!-- <component
        :is="currentComponent"
        :infoData="infoData"
        :currentWord="currentWord"></component>       -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, reactive, markRaw, watch,  getCurrentInstance } from 'vue'
import { useStore} from 'vuex'
const store = useStore()
// 查询模式
const searchMode = ref('meaning')
// 输入查询
const inputWord = ref('')
const inputSearch = () => {
  if (inputWord.value) {
    addSearchHistory(inputWord.value)
  }
}
// 单击查询
let timer: null | any = null
const clickSearch = (word: string) => {
  clearTimeout(timer)
  timer = window.setTimeout(()=>{
    addSearchHistory(word)
  }, 200)
}

// 查词历史
const searchHistory = computed(() => store.state['modules/reading'].searchHistory).value
const addSearchHistory = (word: string) => {
  store.commit('modules/reading/setSearchHistory', {
    operation: 'ADD',
    info: {
      word: word,
      searchMode: searchMode.value,
      contentId: 'randomtest222'
    }
  })
}

// 查词展示区
const { proxy } = getCurrentInstance()
const queryInfo = {
  pageNum: 1,
  pageSize: 5,
  word: ''
}
// 在词典中查询单词
const searchThroughDict = () => {
  return console.log(searchHistory)
  if (!searchHistory.length) return
  const currentWord = searchHistory[searchHistory.length - 1]
  if(mode.value === 'meaning'){
    const params: { word: string } = { word: '' }
    params.word = currentWord
    const {data: meaningData} = proxy.$http.get('/dict/words', { params })
    infoData.value = markRaw(meaningData)
  }else if(mode.value === 'sentence'){
    queryInfo.word = currentWord
    const {data: sentenceData} = proxy.$http.get('/dict/sentences', {
      params: queryInfo
    })
    infoData.value = markRaw(sentenceData)
  }
}
watch (searchHistory, searchThroughDict, { deep: true})

const searchBoxVisible = ref(false)
const infoData = ref({}) //查到的单词释义/例句

//切换释义/例句模式
// const mode = ref('meaning') 
// const switchMode = (modeValue: string) => {
//   mode.value = modeValue
//   if (currentWord.value) {
//     searchThroughDict(currentWord.value)
//   }
// }
</script>
<style lang="less" scoped>
.word-info{
  .search-box{
    display: flex;
    :deep .el-input__inner{
      border-color: transparent;
      border-right: none;
      border-bottom: 1px solid #409EFF;
      border-radius: 0
    }
    .serach-icon{
      flex: 0 0 54px;
      text-align: center;
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
    background-color: rgb(252, 252, 254);
  }
}
</style>
