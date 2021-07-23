<template>
  <div class="text-section">
    <div class="button-group">      
      <el-button 
        type="primary"   
        @click="toggleInputBox">
      Import</el-button>
      <el-button 
        type="primary"      
        @click="editText">
      Edit</el-button> 
      <el-button
        type="primary"   
        @click="clearReadingZone">
      Clear</el-button>
      <el-button
        type="primary"     
        @click="addAll"> 
      Add All</el-button>
    </div>
    <div class="text-display">
      <p v-for="(item1, index1) in textArr" :key="index1">
        <span v-for="(item2, index2) in item1" :key="index2"
        @click="clickSearch(item2)"
        @dblclick="addToWordCollection(item2)">{{item2 + ' '}}</span>
      </p>    
    </div>

    <!-- 点击 Import 按钮时弹出内容输入对话框 -->
    <el-dialog title="内容输入" v-model="inputDialogVisible">
      <el-input
        type="textarea"
        :rows="6"   
        v-model="newAdd">
      </el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="inputDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmInput">确 定</el-button>
      </div>
    </el-dialog>
    
    <!-- 点击 Clear 按钮时弹出确认对话框 -->
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
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useStore} from 'vuex';
const store = useStore();
const readingText = computed(() => store.state.readingText).value
const wordCollection = computed(() => store.state.wordCollection).value
console.log(readingText)
  let inputDialogVisible = ref(false)
  let clearDialogVisible = ref(false)
  let textStr = ref('') //要展示在阅读区的文本
  const newAdd = ref('') //用户每次输入的文本
  const confirm = ref(false)   //控制确认框显示隐藏
  let timer: null | any = null
  const textArr = computed (() => {
    const tempArr = []
      textStr.value = textStr.value.trim() + "\n" //文本末尾加一个换行, 同时包含一段和多段的情况   
      const reg = /.+\n/g
      let match      
      while(match = reg.exec(textStr.value)){        
        tempArr.push(match[0].split(' '))        
      }    
      return tempArr 
  })
  // watch:{
  //   textStr(){     
  //     this.$store.commit('changeReadingText', this.textStr)
  //   }   
  // },
  //初始化时从 vuex 获取文本
  const init = () => { 
      textStr.value = readingText
    }
  onMounted (() => init())
  //按钮区域(四个)
  //控制内容输入对话框
  const toggleInputBox = () =>　{
    inputDialogVisible.value = !inputDialogVisible.value  
  }
  const confirmInput = () => {  // 对话内确认按钮      
    textStr.value += newAdd.value
    newAdd.value = ''
    inputDialogVisible.value = false
  }
  //编辑文本内容 (方便存储和导出)
  const editText = () => {
    // 有点难搞
  }
  //全部加入单词集
  const addAll = () => {
    // this.$store.commit('addWord', this.textArr)
  }
  //清空阅读区
  const clearReadingZone = () => {
    clearDialogVisible.value = true
  }
  const confirmClear = () => {  //对话内确认按钮
    textStr.value = ''
    clearDialogVisible.value = false    
  }
  
  //text-display 页面鼠标单双击操作
  // 单击查词    
  const clickSearch = (word: string) => {
    console.log(word)   
    clearTimeout(timer)
    timer = window.setTimeout(()=>{           
      // $store.commit('addSearchHistory', word) 
    }, 200)
  }
  //将单词加入当前单词集
  const addToWordCollection = (word: string) =>{
    clearTimeout(timer)
    //匹配字母和 ' , 去掉可能的标点符号、空格     
    const reg = /[a-zA-Z']+/     
    word = reg.exec(word)![0]
    if(wordCollection.value.includes(word)) return '该单词已经添加过'
    // $store.commit('addWord', word)
    // $message.show(`成功添加 ${word} 至单词集`)      
  }
  

</script>

<style lang="less" scoped>
.text-section{
  height: 100%;
  .text-display{
    margin-top: 20px;
    height: calc(100% - 60px);
    padding: 10px;
    // border: 2px solid rgb(64, 128, 128);
    // border-right: none;
    background-color: hsla(0, 0%, 100%, .5)   ;
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
  
</style>