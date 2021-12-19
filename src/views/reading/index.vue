<template>
  <div class="reading">
    <el-row :gutter="20">
      <el-col :span="14">
        <!-- 选择打开外部链接模式或文本输入模式 -->
        <div class="source-select" v-if="!contentSource">
          <div class="from-links mb16">
            <el-card class="box-card">
              <template #header>
                <div class="card-header">
                  <span class="title">链接模式</span>
                </div>
              </template>
              <el-input v-model="filterText" placeholder="Filter keyword" />
              <el-tree
                ref="linkTree"
                class="filter-tree"
                :data="treeData"
                :props="defaultProps"
                default-expand-all
                :filter-node-method="filterNode"
                @node-click="handleNodeClick"
              />
            </el-card>
          </div>
          <div class="from-input">
            <el-card class="box-card">
              <template #header>
                <div class="card-header">
                  <span class="title">文本模式</span>
                  <el-button type="text" class="button" @click="addText">新建</el-button>
                </div>
              </template>
              <el-table :data="textList" border style="width: 100%">
                <el-table-column prop="title" label="文本片段名称" width="180" />
                <el-table-column prop="date" label="上次阅读时间" width="180" />
                <el-table-column prop="operation" label="操作">
                  <template v-slot="props">
                    <div class="button-container">
                      <el-button type="text" class="button" @click="viewText(props.row)">查看</el-button>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </el-card>
            <el-dialog title="创建文本片段" width="60%" v-model="addTextDialogVisible">
              <el-input type="textarea"
                :rows="6"
                v-model="newAddText">
              </el-input>
              <template #footer>
                <span class="dialog-footer">
                  <el-button @click="addTextDialogVisible = false">取 消</el-button>
                  <el-button type="primary" @click="confirmInput">确 定</el-button>
                </span>
              </template>
            </el-dialog>
          </div>
        </div>
        <div class="button-container mb16" v-else>
          <el-button type="primary" plain @click="contentSource = ''">返回</el-button>
        </div>
        
      </el-col>
      <el-col :span="10">
        <div class="toggle-box mb16">
          <el-tag :type="val.isShow ? undefined : 'info'"
            class="mr8 pointer"
            v-for="(val, key) in tags" :key="key"
            @click="val.isShow = !val.isShow"
          >{{ val.name}}</el-tag>
        </div>
        <div class="attach-section h100">
          <WordInfo v-if="tags.wordInfo.isShow"/>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
// import WordInfoDisplay from '@/views/components/WordInfoDisplay'
// import SentenceDisplay from '@/views/components/SentenceDisplay'
import axios from '@/axios/index'
import WordInfo from './components/WordInfo.vue'

import { ref, computed, onMounted, reactive } from 'vue'
import { useStore} from 'vuex'
import { useRouter } from 'vue-router'
const store = useStore()
const router = useRouter()
const wordCollection = computed(() => store.state.wordCollection).value
import useTree from './hooks/useTree.js'
// const currentWord = computed(() => {
//   if (searchHistory.length - 1 >= 0) {
//     return searchHistory[searchHistory.length - 1]
//   }
// })


const {
  contentSource,
  filterText,
  linkTree, treeData, defaultProps,
  filterNode, handleNodeClick,
  iframeSrc
} = useTree()

let textList = ref([])
const getTextList = () => {
  axios.post('/playground-vue/readingMaterial/list')
    .then((res) => {
      textList.value = res.data
    })
}
onMounted (() => {
  getTextList()
})
const addTextDialogVisible = ref(false)
const newAddText = ref('') //用户每次输入的文本

const addText = () => {
  addTextDialogVisible.value = true
}
const confirmInput = () => { // 新增确认按钮
  // textStr.value += newAddText.value
  // newAddText.value = ''
  // store.commit('modules/reading/setText', textStr.value)
  const postObj = {
    type: 'text',
    title: '文本片段一',
    content: newAddText.value,
    url: 'N'
  }
  axios.post('/playground-vue/readingMaterial/create', postObj)
  addTextDialogVisible.value = false
}
const viewText = (row) => {
  console.log(row)
  // router.push({
  //   path: 'reading/content-detail',
  //   query: {
  //     type: 'text',
  //     id: '123456'
  //   }
  // })
}

const tags = reactive({
  wordInfo: {
    name: '单词查询',
    isShow: true,
  },
  relatedNotes: {
    name: '关联笔记',
    isShow: true,
  }
})
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

</script>
<style lang="less" scoped>
.reading{
  height: 100%;
  .sub-header{
    height: 60px;
    background-color: lightgray;
  }
  .el-row{
    height: 100%;
    padding-bottom: 40px;
  }
  .source-select{
    .title{
      font-weight: bold;
    }
  }
  // .toggle-box{

  // }
  .attach-section{
    display: flex;
    flex-direction: column;
    > div{
      flex: 1;
    }
  }
}
</style>
