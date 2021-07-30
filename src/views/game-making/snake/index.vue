<template>
<!-- https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes -->
  <div class="snake">
    <canvas id="canvas" ref="canvas" width="800" height="800"></canvas>
    <el-dialog
      title="提示"
      v-model="dialogVisible"
      width="30%">
      <span>是否要再来一局？</span>
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
import { ref, reactive, toRefs, onMounted } from 'vue'
const canvas = ref('canvas')
onMounted (() => {
  paint()
})
const paint = () => {
  const canvasValue = canvas.value
  const ctx = canvasValue.getContext('2d')
  // 小方格的构造函数
  class Rect {
    x: number
    y: number
    width: number
    height: number
    color: string
    constructor (x: number, y: number, width: number, height: number, color: string) {
      this.x = x
      this.y = y
      this.width = width
      this.height = height
      this.color = color
    }
    drawRect () {
      ctx.fillStyle = this.color
      ctx.fillRect(this.x, this.y, this.width, this.height)
      ctx.strokeRect(this.x, this.y, this.width, this.height)
    }
  }
  type snake = object & {
    x: number
    y: number
    width: number
    height: number
    color: string
    direction: number
    [propName: string]: any
  }
  enum direction {
    up = 37,
    right,
    down,
    left
  }
  class Snake {
    width: number
    height: number
    head: snake
    body: snake[] = []
    bodyLength: number
    snakeDirection: number
    moveX: number = 0 // 左右移动的格子数，左未负，右为正（400毫秒一次一个身位）
    moveY: number = 0 // 上下移动的格子数，上未负，下为正
    // direction: direction.right
    constructor (width: number = 20, height: number = 20) {
      this.width = width
      this.height = height
    }
    drawSnake (snakeDirection: number, bodyLength: number) {
      this.snakeDirection = snakeDirection
      this.bodyLength = bodyLength
      // 绘制蛇头
      this.head = new Rect(canvasValue.width / 2 + this.moveX * this.width, canvasValue.height / 2 + this.moveY * this.height, this.width, this.height, 'red')
      this.head.drawRect()
      // 绘制蛇身
      this.body = []
      if (snakeDirection === direction.left) {
        let x = this.head.x + this.width
        let y = this.head.y
        for (let i = 0; i < this.bodyLength; i++) {
          const rect = new Rect(x, y, this.width, this.height, 'yellow')
          this.body.push(rect)
          x += this.width
        }
      } else if (snakeDirection === direction.right) {
        let x = this.head.x - this.width
        let y = this.head.y
        for (let i = 0; i < this.bodyLength; i++) {
          const rect = new Rect(x, y, this.width, this.height, 'yellow')
          this.body.push(rect)
          x -= this.width
        }
      }
      for (let i = 0; i < this.body.length; i++) {
        this.body[i].drawRect()
      }
    }
    moveSnake () {
      clearPaint()
      if (this.snakeDirection === direction.left) {
        this.moveX --
      } else if (this.snakeDirection === direction.right) {
        this.moveX ++
      } else if (this.snakeDirection === direction.up) {
        this.moveY --
      } else if (this.snakeDirection === direction.down) {
        this.moveY ++
      }
      this.drawSnake(this.snakeDirection, this.bodyLength)
      // 判断蛇头是否碰壁或碰蛇身
      const hitX = this.head.x === 0 || this.head.x === canvasValue.width - this.width
      const hitY = this.head.y === 0 || this.head.y === canvasValue.height - this.height
      const hitSelf = this.body.find(item => { this.head.x === item.x && this.head.y === item.y })
      if (hitX || hitY || hitSelf) {
        clearInterval(moveTimer)
        dialogVisible.value = true
      }
    }
  }
  type foodType = object & {
    
  }
  class Food {
    x: number
    y: number
    width: number
    height: number
    times: number
    color: string
    constructor (times: number) {
      this.width = snake.width * times
      this.height = snake.height * times
      this.color = times === 1 ? 'blue' : 'green'
      const xParts = canvasValue.width / this.width
      const yParts = canvasValue.height / this.width
      // 判断食物坐标是否和蛇重合
      let isInSnake = true
      while (isInSnake) {
        const x = this.width * Math.floor(Math.random() * xParts)
        const y = this.height * Math.floor(Math.random() * yParts)
        if ((x === snake.head.x && y === snake.head.y) || snake.body.find(item => x === item.x && y === item.y)) {
          continue
        } else {
          isInSnake = false
          this.x = x
          this.y = y
        }
      }
    }
    drawFood () {
      ctx.fillStyle = this.color
      ctx.fillRect(this.x, this.y, this.width, this.height)
      ctx.strokeRect(this.x, this.y, this.width, this.height, 'blue')
      // 监听用户键盘事件
      // 方向互斥，如果当前方向和目标方向都在同一个数组中，那么忽略操作
      const exclusionOne = [ direction.left, direction.right ]
      const exclusionTwo = [ direction.up, direction.down ]
      document.onkeydown = function (e) {
        e = e || window.event
        // 左37  上38  右39  下40
        if (
          (exclusionOne.find(item => item === e.keyCode) && exclusionOne.find(item => item === snake.direction)) ||
          (exclusionTwo.find(item => item === e.keyCode) && exclusionTwo.find(item => item === snake.direction))
        ) {
          return
        } else {
          clearPaint()
          paint()
        }
      }
    }
  }
  const clearPaint = () => {
    ctx.clearRect(0, 0, canvasValue.width, canvasValue.height)
  }
  const snake = new Snake()
  snake.drawSnake(direction.right, 3)
  const food = new Food(1)
  food.drawFood()
  const moveTimer = setInterval(() => { snake.moveSnake() }, 400)
}

const dialogVisible = ref(false)
const replayCancel = () => {
  dialogVisible.value = false
}
const replayConfirm = () => {
  dialogVisible.value = false
  paint()
}

</script>

<style lang="less" scoped>
.snake{
  #canvas {
    border: 1px solid black; 
  }
}
</style>
