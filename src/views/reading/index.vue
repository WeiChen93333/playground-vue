<template> 
  <div class="reading">
    <el-row :gutter="20">
      <el-col :span="12">
        <div class="text-section">
          <div class="button-group">
            <el-button type="primary"
              @click="inputDialogVisible = true">
              导入</el-button>
            <el-button type="primary"
              @click="clearDialogVisible = true">
              清空</el-button>
          </div>
          <div class="text-display">
            <p v-for="(item1, index1) in textArr" :key="index1">
              <span v-for="(item2, index2) in item1" :key="index2"
              @click="clickSearch(item2)"
              @dblclick="addToWordCollection(item2)">{{item2 + ' '}}</span>
            </p>
          </div>

          <!-- 导入对话框 -->
          <el-dialog title="内容输入" v-model="inputDialogVisible">
            <el-input type="textarea"
              :rows="6"
              v-model="newAdd">
            </el-input>
            <div slot="footer" class="dialog-footer">
              <el-button @click="inputDialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="confirmInput">确 定</el-button>
            </div>
          </el-dialog>
          
          <!-- 清除确认对话框 -->
          <el-dialog
            title="删除内容"
            v-model="clearDialogVisible"
            width="30%">
            <span>Are you sure you want to clear reading area?</span>
            <span slot="footer" class="dialog-footer">
              <el-button @click="clearDialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="confirmClear">确 定</el-button>
            </span>
          </el-dialog>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="word-section">
          <div class="switch-box">
            <div class="switch">
              <div class="mode" :class="{active: mode=='meaning'}"
                @click="switchMode('meaning')">释义</div>
              <div class="mode" :class="{active: mode=='sentence'}"
                @click="switchMode('sentence')">例句</div>
            </div>
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
            <div v-if="mode === 'meaning'">测试一</div>
            <div v-else>测试二</div>
            <!-- <component 
              :is="currentComponent" 
              :infoData="infoData"
              :currentWord="currentWord"></component>       -->
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
// import WordInfoDisplay from '@/views/components/WordInfoDisplay'
// import SentenceDisplay from '@/views/components/SentenceDisplay'

import { ref, computed, onMounted, reactive, markRaw, watch,  getCurrentInstance } from 'vue'
import { useStore} from 'vuex'
const store = useStore()
const wordCollection = computed(() => store.state.wordCollection).value
// const currentWord = computed(() => {
//   if (searchHistory.length - 1 >= 0) {
//     return searchHistory[searchHistory.length - 1]
//   }
// })

//初始化时从 vuex 获取阅读文本，获取当前单词（如有，并查询）
const init = () => {
  const readingText = computed(() => store.state.readingText).value
  textStr.value = readingText
  //初始化时从 vuex 获取当前单词
  // if (currentWord.value) {
  //   searchThroughDict(currentWord.value)  
  // }
}
onMounted (() => init())
//按钮区域
//导入
const inputDialogVisible = ref(false)
const textStr = ref('') //全部文本
const newAdd = ref('') //用户每次输入的文本
const confirmInput = () => { // 对话内确认按钮
  textStr.value += newAdd.value
  newAdd.value = ''
  inputDialogVisible.value = false
}
const textArr = computed (() => { // 更与文本生成数组用于展示
  const tempArr = []
  textStr.value = textStr.value.trim() + "\n" //文本末尾加一个换行, 同时包含一段和多段的情况
  const reg = /.+\n/g
  let match
  while(match = reg.exec(textStr.value)){
    tempArr.push(match[0].split(' '))
  }
  return tempArr
})
//清空阅读区
const clearDialogVisible = ref(false)
const confirmClear = () => { //对话内确认按钮
  textStr.value = ''
  clearDialogVisible.value = false
}

//text-display 页面鼠标单双击操作
// 查词历史
const searchHistory = reactive([])
const addSearchHistory = (word: string) => {
  //匹配字母和 ' , 去掉可能的标点符号、空格
  const reg = /[a-zA-Z']+/
  word = reg.exec(word)![0].toLowerCase()
  //判断是否连续查询同一个单词 
  if(searchHistory[searchHistory.length - 1] !== word) {
    searchHistory.push(word)
  }
}
const queryInfo = {
  pageNum: 1,
  pageSize: 5,
  word: ''
}
// 在词典中查询单词
const searchThroughDict = () => {
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
// 单击查词
let timer: null | any = null
const clickSearch = (word: string) => {
  clearTimeout(timer)
  timer = window.setTimeout(()=>{
    addSearchHistory(word)
  }, 200)
}
console.log(searchHistory.value)

//将单词加入当前单词集
// const addToWordCollection = (word: string) =>{
//   clearTimeout(timer)
//   //匹配字母和 ' , 去掉可能的标点符号、空格     
//   const reg = /[a-zA-Z']+/     
//   word = reg.exec(word)![0]
//   if(wordCollection.value.includes(word)) return '该单词已经添加过'
//   // $store.commit('addWord', word)
//   // $message.show(`成功添加 ${word} 至单词集`)
// }

// 查词展示区
const { proxy } = getCurrentInstance()

const searchBoxVisible = ref(false)
const infoData = ref({}) //查到的单词释义/例句

//切换释义/例句模式
const mode = ref('meaning') 
const switchMode = (modeValue: string) => {
  mode.value = modeValue
  if (currentWord.value) {
    searchThroughDict(currentWord.value)
  }
}

//输入查词
const inputWord = ref('contest')
const inputSearch = () => {
  if (inputWord.value) {
    addSearchHistory(inputWord.value)
  }
}
</script>
<style lang="less" scoped>
.reading{
  height: 100%;
  .el-row{
    height: 100%;
    padding-bottom: 40px;
  }
  .text-section{
    height: 100%;
    .text-display{
      border: 2px solid rgb(64, 128, 128) ;
      margin-top: 20px;
      height: calc(100% - 60px);
      padding: 10px;
      background-color: #fff;
      overflow-y: auto;
      p{
        margin-bottom: 10px;
        line-height: 22px;
        text-align: justify;
        span{
          cursor: pointer;
        }
      }
    }
  }
  .word-section{
    height: 100%;
    .switch-box{
      display: flex;
      justify-content: flex-end;
      .switch{
        display: flex;
        width: 100px;
        border-radius: 20px;
        padding: 5px;
        cursor: pointer;
        background-color: lightgray;
        color: #666;
        .mode{
          width: 50px;
          text-align: center;
          height: 24px;
          line-height: 24px;
          border-radius: 20px;
          &.active{
            background-color: #409EFF;
            color: #fff;
          }
        }
      }
    }
    .search-box{
      margin-top: 20px;
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
      background-color: rgb(252, 252, 254) ;
      background-color: #DCDFE6 ;
    }
  }
}
</style>
