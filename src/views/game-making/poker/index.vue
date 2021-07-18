<template>
  <div class="poker">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>斗地主进行中......</span>
          <el-button type="text" class="button">结束游戏</el-button>
        </div>
      </template>
      <div class="card-desktop">
        <div class="top">
          <div class="user">user-1</div>
          <Cards :pile="pileOne"></Cards>
        </div>
        <div class="center">
          <div class="user-box left">
            <Cards :pile="pileTwo"></Cards>
            <div class="user">user-2</div>                     
          </div>
          <div class="user-box right">
            <Cards :pile="pileThree"></Cards>
            <div class="user">user-3</div> 
          </div>
        </div>
        <div class="bottom">
          <div class="operation">
            <el-button size="small" type="primary">不出</el-button>
            <el-button size="small" type="primary">提示</el-button>
            <el-button size="small" type="primary">确定</el-button>
          </div>
          <Cards :pile="pileFour"></Cards>
          <div class="user">user-4</div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, ref, reactive, toRefs} from "vue"
import CardsConstruct from './cards'
import Cards from './Cards.vue'

const cards = new CardsConstruct()
const { piles } = cards
const pileOne = reactive(piles[0])
const pileTwo = reactive(piles[1])
const pileThree = reactive(piles[2])
const pileFour = reactive(piles[3])
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
  .card-desktop{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-width: 900px;
    height: 660px;
    .top, .bottom{
      width: 540px;
      margin: 0 auto;
      text-align: center;    
    }
    .center{
      text-align: center;  
      .user-box.left{
        float: left;
        .user{
          text-align: left;
        }
      }
      .user-box.right{
        float: right;
        .user{
          text-align: right;
        }
      }
    }
   
    .user{
      height: 40px;
      line-height: 40px;
    }
    .operation{
      margin-bottom: 16px;
      .el-button{
        margin-right: 4px;
      }
    }
  }
}
</style>
