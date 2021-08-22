<template>
  <div class="question-answering">
    <div class="article-list">
      <el-card class="box-card">
        <template #header>
          <div class="card-header" @click="toggleContentDisplay">
            <span>子元素 flex:1 时，父元素宽度被子元素撑开</span>
            <el-button class="button" type="text" @click.stop="edit">编辑</el-button>
          </div>
        </template>
        <!-- <CollapseTransition> -->
          <div class="card-content" v-show="contenVisible">
            解决方式：给子元素加上 width: 0
          </div>
        <!-- </CollapseTransition> -->
      </el-card>
    </div>
    <el-drawer
      title="编辑文章"
      v-model="drawerVisible"
      :direction="right"
      destroy-on-close
      size="80%">
      <div class="drawer-content">
        <div class="content-edit">
          <MarkdownEditor ref="mdEditor"></MarkdownEditor>
        </div>
        <div class="type-select"></div>
      </div>
      <div class="drawer-footer">
        <el-button @click="drawerVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmEdit" >{{ '确 定' }}</el-button>
      </div>
    </el-drawer>            
  </div>
</template>

<script setup lang="ts">
// import CollapseTransition from './collapse-transition.js'
import MarkdownEditor from './MarkdownEditor.vue'
import { ref, reactive, toRefs, onMounted } from 'vue'
const contenVisible = ref(false)
const mdEditor = ref(null)
const toggleContentDisplay = () => {
  contenVisible.value = !contenVisible.value
}
const edit = () => {
  drawerVisible.value = true
}
const drawerVisible = ref(false)
const handleClose = (done) => {
  
}
// onMounted(() => {
//   console.log(mdEditor)
// })
const confirmEdit = () => {
  console.log(mdEditor.value.msg)
  mdEditor.value.getContent()
}


</script>

<style lang="less" scoped>
.question-answering{
  .article-list{
    .card-header{
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      .button {
        padding: 0;
        min-height: auto;
      }
    }
    :deep .el-card__body{
      padding: 0;
    }
    .card-content{
      padding: 20px;
    }
  }
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
        display: flex;
        .content-edit{
          width: 60%;
          border-right: 1px solid #e8eaec;
        }
        .type-select{
          width: 40%
        }
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