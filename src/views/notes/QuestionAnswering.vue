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
      title="我是标题"
      v-model="drawerVisible"
      :direction="right"
      destroy-on-close
      size="80%">
      <div class="drawer-content">
        <div class="content-edit">
          <MarkdownEditor></MarkdownEditor>
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
const markdownText = ref('测试')
const toggleContentDisplay = () => {
  contenVisible.value = !contenVisible.value
}
const edit = () => {
  drawerVisible.value = true
}
const drawerVisible = ref(false)
const handleClose = (done) => {
  
}
// 将图片上传到服务器，返回地址替换到md中
const imgAdd = (pos, $file) => {
  // var formdata = new FormData();
  // formdata.append('file', $file);
  // // 这里没有服务器供大家尝试，可将下面上传接口替换为你自己的服务器接口
  // this.$axios({
  //     url: '/common/upload',
  //     method: 'post',
  //     data: formdata,
  //     headers: { 'Content-Type': 'multipart/form-data' },
  // }).then((url) => {
  //     this.$refs.md.$img2Url(pos, url);
  // })
}
const change = (value, render) => {
    // render 为 markdown 解析后的结果
    // this.html = render;
}
const confirmEdit = () => {
  console.log(markdownText.value)
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