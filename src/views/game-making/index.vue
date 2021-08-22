<template>
  <div class="game-making">
    <ul class="game-list">
      <li class="game" v-for="game in gameList">
        <el-button size="medium" type="primary"
          :plain="!game.current"
          @click="changeGameTab(game)"
          >{{ game.name }}</el-button>
        <template class="right-arrow" v-if="game.current">
          <span>=</span>
          <i class="el-icon-d-arrow-right"></i>
        </template>
      </li>
    </ul>
    <div class="game-tab">
      <keep-alive>
        <component :is="currentGameTab"></component>
      </keep-alive>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, shallowRef, markRaw} from "vue"
  interface dataProps{

  }
  import Poker from './poker/index.vue'
  import Snake from './snake/index.vue'
  type gameObj = object & {
    id: string,
    name: string,
    current: boolean,
    component: any
  }
  const gameList: gameObj[] = reactive(
    [
      { 
        id: '1',
        name: '斗地主',
        current: true,
        component: markRaw(Poker)
      },
      { 
        id: '2',
        name: '贪吃蛇',
        current: false,
        component: markRaw(Snake)
      }
    ]
  )
  let currentGameTab = shallowRef(markRaw(Poker))
  const changeGameTab = (gameObj: gameObj)=> {
    gameList.forEach(game => {
      if (game === gameObj) {
        game.current = true
      } else{
        game.current = false
      }
    })
    currentGameTab.value = markRaw(gameObj.component)
  }
</script>

<style lang="less" scoped>
.game-making{
  display: flex;
  .game-list{
    flex: 0 0 120px;
    .game{
      margin-bottom: 16px;
      display: flex;
      align-items: center;
      span{
        padding-left: 10px;
        color:#66b1ff;
      }
      .el-icon-d-arrow-right{
        padding-right: 10px;
        color:#66b1ff;
        font-size: 18px;
      }
    }
  }
  .game-tab{
    flex: 1
  }
}
</style>
