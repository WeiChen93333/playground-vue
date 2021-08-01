<template>
<!-- https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes -->
  <div class="snake">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>贪吃蛇</span>
          <el-button type="text" class="button" @click="exitGame">结束游戏</el-button>
        </div>
      </template>
      <div class="canvas-container">
        <div class="left"></div>
        <canvas id="canvas" ref="canvas" width="760" height="760"></canvas>
        <div class="right">得分：{{ score }}</div>
        <el-button type="primary" plain class="button"
          v-if="!isStart"
          @click="startGame">开始游戏</el-button>
      </div>
    </el-card>    
    <el-dialog
      title="提示"
      v-model="dialogVisible"
      width="30%">
      <div>共吃到
        <span style="color: blue"> {{ score }} </span>
        个食物，是否要再来一局？
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="replayCancel">否</el-button>
          <el-button type="primary" @click="replayConfirm">是</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Snake from './snake'
import Food from './food'

const canvas = ref('canvas')
const dialogVisible = ref(false)
const replayCancel = () => {
  dialogVisible.value = false
  exitGame()
}
const replayConfirm = () => {
  dialogVisible.value = false
  startGame()
  score.value = 0
}

const isStart = ref(false)
let moveTimer: null | number = null
let snake: snake = {}
const score = ref(0)
const startGame = () => {
  isStart.value = true
  const canvasEle = canvas.value
  snake = new Snake(canvasEle)
  snake.drawSnake()
  const food = new Food(canvasEle, snake, 1)
  food.drawFood(snake)
  moveTimer = setInterval(() => {
    const moveSuccess = snake.moveOneStep(food)
    if (!moveSuccess) {
      clearInterval(moveTimer)
      dialogVisible.value = true
    }
    const isEatFood = snake.checkEatFood(food)
    if (isEatFood) {
      score.value ++
    }
  }, 200)

  // 监听用户键盘事件
  // 方向互斥，如果当前方向和目标方向都在同一个数组中，那么忽略操作
  const exclusionOne = [ 'left', 'right' ]
  const exclusionTwo = [ 'up', 'down' ]
  document.onkeydown = function (e) {
    e = e || window.event
    const newDirection = e.key.toLowerCase().replace('arrow', '')
    if (
      (exclusionOne.find(item => item === newDirection) && exclusionOne.find(item => item === snake.direction)) ||
      (exclusionTwo.find(item => item === newDirection) && exclusionTwo.find(item => item === snake.direction))
    ) {
      return
    } else {
      snake.changeDirection(newDirection)
    }
  }
}
const exitGame = () => {
  snake.clearPaint()
  clearInterval(moveTimer)
  isStart.value = false
  score.value = 0
}
</script>

<style lang="less" scoped>
.snake{
  .card-header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    .button {
      padding: 0;
      min-height: auto;
    }
  }
  .canvas-container{
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    #canvas {
      border: 1px solid yellowgreen; 
    }
    .left{
      width: 20px
    }
    .right{
      width: 100px;
      text-align: center;
      color: blue;
      font-weight: bold;
      user-select: none;
    }
    .el-button{
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
      width: 98px;
      height: 40px;
    }
  }
}
</style>
