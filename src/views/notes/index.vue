<template>
  <div class="notes h100 flex-ver">
    <div class="notes-header mb16">
      <el-row class="row-bg">
        <el-col :span="12">
          <el-button type="primary" @click="newNote">新建笔记</el-button>
        </el-col>
        <el-col :span="12">
          <div class="search">
            <el-input
              placeholder="请输入内容"
              v-model="queryList.searchContent"
              class="input-with-select">
              <template #append>
                <el-button icon="el-icon-search"
                  @click="search"></el-button>
              </template>
            </el-input>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="notes-content">
      <div class="notes-cards">
        <NoteCard></NoteCard>
      </div>
      <div class="notes-tags"></div>
    </div>
    <div class="notes-footer flex-justify-end">
      <div class="triangle-start"></div>
      <el-pagination class="bg-white"
        background
        layout="prev, pager, next, jumper"
        :page-count="22"
        :current-page="queryList.currentPage"
        @current-change="handleCurrentChange">
      </el-pagination>
      <div class="triangle-end"></div>
    </div>
    <EditDrawer ref="editDrawer" mode="create"></EditDrawer>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import NoteCard from './NoteCard.vue'
import EditDrawer from './EditDrawer.vue'
const editDrawer = ref(null)
const newNote = () => {
  editDrawer.value.showDrawer()
}
const search = () => {

}
const queryList = reactive({
  currentPage: 1,
  pageSize: 10,
  searchContent: ''
})
const handleCurrentChange = (currentPage) => {
  queryList.currentPage = currentPage
  console.log(currentPage)
}

// setTimeout(() => {
//   queryList.currentPage = 6
// }, 2000)
// https://www.cnblogs.com/chengxs/p/11406278.html(画三角形)
</script>

<style lang="less" scoped>
.notes{
  .notes-content{
    flex: 1;
    .notes-cards{
      overflow: auto;
    }
  }
  .notes-footer{
    height: 36px;
    display: flex;
    align-items: center;
    .triangle-start{
      border-top: 36px solid white;
      border-left: 36px solid transparent;
      // border-top: 36px solid red;
      // border-bottom: 36px solid yellow;
      // border-left: 36px solid green;
      // border-right: 36px solid black;
    }
    .triangle-end{
      border-bottom: 36px solid white;
      border-right: 36px solid transparent;
    }
  }
}

</style>