```TextView.vue
<template>
  <div class="text-container h100">
    <div class="button-container mb16">
      <el-button type="primary"
        @click="inputDialogVisible = true">
        导入</el-button>
      <el-button type="primary"
        @click="clearDialogVisible = true">
        清空</el-button>
      <el-button type="primary"
        @click="save">
        保存</el-button>
    </div>
    <ContextMenu>
      <div class="text-display">
        <p v-for="(item1, index1) in textArr" :key="index1">
          <span v-for="(item2, index2) in item1" :key="index2"
            @click="clickSearch(item2)"
            @dblclick="addToWordCollection(item2)">{{item2 + ' '}}</span>
        </p>
      </div>
    </ContextMenu>
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
</template>

<script setup lang="ts">
import axios from '@/axios/index'
import ContextMenu from '@/components/ContextMenu.vue'

import { ref, computed, onMounted, reactive, watch, defineProps } from 'vue'
import { useStore} from 'vuex'
const store = useStore()
const wordCollection = computed(() => store.state.wordCollection).value

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})
const init = () => {
  // const readingText = store.state['modules/reading'].text
  // textStr.value = readingText
  textStr.value = props.data.content
}
onMounted (() => init())

//控制导入弹出框
const inputDialogVisible = ref(false)
//清空阅读区
const clearDialogVisible = ref(false)
const confirmClear = () => { //对话内确认按钮
  textStr.value = ''
  clearDialogVisible.value = false
}
const textStr = ref('') //全部文本
const textArr = computed (() => { // 文本生成数组用于展示
  const tempArr = []
  textStr.value = textStr.value.trim() + "\n" //文本末尾加一个换行, 同时包含一段和多段的情况
  const reg = /.+\n/g
  let match
  while(match = reg.exec(textStr.value)){
    tempArr.push(match[0].split(' '))
  }
  return tempArr
})

const save = () => {
  const postObj = {
    type: 'text',
    id: '123456',
    title: '文本片段一',
    content: textStr.value,
    url: 'N'
  }
  axios.post('/playground-vue/reading/create', postObj)

}

</script>
<style lang="less" scoped>
.text-container{
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
</style>
