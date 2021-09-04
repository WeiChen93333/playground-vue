<template>
  <div class="edit-drawer">
    <el-drawer
      :title="mode === 'create' ? '新建文章' : '编辑文章'"
      v-model="drawerVisible"
      direction="rtl"
      destroy-on-close
      size="80%">
      <div class="drawer-content">
        <el-form ref="noteFormRef" :model="noteForm" :rules="rules" label-width="0">
          <div class="title-container mb16 fz16 fwb">
            <div class="title hlh32">标题</div>
            <el-form-item prop="title" label="">
              <el-input type="textarea" placeholder="请输入内容"
                :rows="2"
                v-model="noteForm.title">
              </el-input>
            </el-form-item>
          </div>
          <div class="text-container mb16 fz16 fwb">
            <div class="text hlh32">正文</div>
            <MarkdownEditor ref="mdEditor"></MarkdownEditor>
          </div>
          <div class="link-container mb16 fz16 fwb">
            <div class="hlh32">链接</div>
            <el-table style="width: 100%" empty-text="点击添加按钮添加链接"
              :data="noteForm.links">
              <el-table-column width='100'
                prop="order"
                label="序号">
                <template #default="scope">
                  <el-tag size="medium">{{ scope.row.order }}</el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="url" label="地址">
                <template #default="scope">
                  <el-input type="textarea" placeholder="请输入内容"
                    :rows="2"
                    v-model="scope.row.url">
                  </el-input>
                </template>
              </el-table-column>
              <el-table-column label="操作" width='100'>
                <template #header>
                  <el-button size="mini"
                    type="primary"
                    @click="addLink">添加</el-button>
                </template>
                <template #default="scope">
                  <el-button size="mini"
                    type="danger"
                    @click="deleteLink(scope.$index, scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-form>
      </div>
      <div class="drawer-footer">
        <el-button @click="drawerVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmEdit" >{{ '确 定' }}</el-button>
      </div>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import MarkdownEditor from './MarkdownEditor.vue'
import { ref, reactive, toRefs, toRaw, onMounted, defineExpose, defineProps} from 'vue'
import axios from '@/axios/index'
const props = defineProps({
  mode: String
})
const drawerVisible = ref(false)
const noteFormRef = ref(null)
const noteForm = reactive({
  title: '',
  links: []
})
const rules = {
  title: [
    { required: true, message: '请输入标题', trigger: 'blur' },
    { max: 20, message: '长度不超过20个字符', trigger: 'blur' }
  ]
}

const addLink = () => {
  noteForm.links.forEach((link, index) => {
    link.order = index + 1
  })
  const link = { order: noteForm.links.length + 1, url: ''}
  noteForm.links.push(link)
}
const deleteLink = (index) => {
  noteForm.links.splice(index, 1)
  noteForm.links.forEach((link, index) => {
    link.order = index + 1
  })
}
const mdEditor = ref(null)
const confirmEdit = () => {
  noteFormRef.value.validate()
  .then(() => {
    const mdContent = mdEditor.value.getContent()
    const postObj = Object.assign({}, toRaw(noteForm), { content: mdContent })
    console.log(postObj)
    // axios.post('/playground-vue/notes/create', postObj)
    // axios.post('/playground-vue/notes/list', { type: 'article' })
  }, () => {console.log('fail')})
}
const showDrawer = () => {
  drawerVisible.value = true
}
defineExpose({
  showDrawer
})
</script>
<style lang="less" scoped>
.edit-drawer{
  :deep .el-drawer{
    .el-drawer__header{
      padding: 0 20px;
      border-bottom: 1px solid #e8eaec;
      line-height: 50px;
      margin-bottom: 0;
      span{
        font-size: 15px;
        color: #17233d;
        font-weight: 700;
      }
      .el-drawer__close-btn{
        padding: 0;
      }
    }
    .el-drawer__body{
      display: flex;
      flex-direction: column;
      .drawer-content{
        flex: 1;
        padding: 20px;
      }
      .drawer-footer{
        border-top: 1px solid #e8eaec;
        padding: 10px 20px;
        height: 60px;
        text-align: right;
      }

    }
  }
}
</style>

