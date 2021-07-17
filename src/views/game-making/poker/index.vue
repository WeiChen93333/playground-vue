<template>
  <div class="poker">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>斗地主进行中......</span>
          <el-button type="text" class="button">结束游戏</el-button>
        </div>
      </template>
      <div v-for="o in 4" :key="o" class="text item">
        {{'列表内容 ' + o }}
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, ref, reactive, toRefs} from "vue"
  interface dataProps{

  }
</script>

<style lang="less" scoped>
.poker{
  .card-header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    .button {
      padding: 0;
      min-height: auto;
    }
  }
}
</style>
