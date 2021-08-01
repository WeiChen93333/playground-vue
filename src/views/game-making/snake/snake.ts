type snake = object & {
  x: number
  y: number
  width: number
  height: number
  color: string
  direction?: string
  [propName: string]: any
}

import Painting from './painting'
export default class Snake extends Painting {
  width: number
  height: number
  head: snake
  body: snake[] = []
  bodyLength: number = 3
  direction: string = 'right'  
  constructor (canvasEle, width: number = 20, height: number = 20) {
    super(canvasEle)
    this.width = width
    this.height = height
  }
  drawSnake () { // 初次绘制
    // 绘制蛇头
    this.head = { x: this.canvasWidth / 2, y: this.canvasHeight / 2, width: this.width, height: this.height, color: 'red' }
    this.drawRect(this.head)
    // 绘制蛇身(向右)
    this.body = []
    let x = this.head.x - this.width
    let y = this.head.y
    for (let i = 0; i < this.bodyLength; i++) {
      this.body.push({ x, y, width: this.width, height: this.height, color: 'yellow' })
      this.drawRect({ x, y, width: this.width, height: this.height, color: 'yellow' })
      x -= this.width
    }
  }
  moveOneStep (food) {
    // 确定下一步坐标
    let x = 0
    let y = 0
    if (this.direction === 'left') {
      this.head.x -= this.width
      x = this.head.x + this.width
      y = this.head.y
    } else if (this.direction === 'right') {
      this.head.x += this.width
      x = this.head.x - this.width
      y = this.head.y
    } else if (this.direction === 'up') {
      this.head.y -= this.height
      x = this.head.x
      y = this.head.y + this.height
    } else if (this.direction === 'down') {
      this.head.y += this.height
      x = this.head.x
      y = this.head.y - this.height
    }
    // 判断蛇头是否碰壁(贴到是可以的)或碰蛇身, 未碰到才绘制
    const hitX = this.head.x < 0 || this.head.x > this.canvasWidth - this.width
    const hitY = this.head.y < 0 || this.head.y > this.canvasHeight - this.height
    const hitSelf = this.body.find(item => this.head.x === item.x && this.head.y === item.y)
    if (hitX || hitY || hitSelf) {
      return false
    } else {
      this.clearPaint()
      this.drawRect(this.head)
      this.body.pop()
      this.body.unshift({ x, y, width: this.width, height: this.height, color: 'yellow' })
      this.body.forEach(item => this.drawRect(item))
      food.reappearFood()
      return true
    }
  }
  changeDirection (direction: string) {
    this.direction = direction
  }
  checkEatFood (food) {
    // 判断食物坐标是否和蛇重合
    let isInSnake = true
    while (isInSnake) {
      if ((food.x === this.head.x && food.y === this.head.y) || this.body.find(item => food.x === item.x && food.y === item.y)) {
        this.clearPaint()
        this.drawRect(this.head)
        let x = 0
        let y = 0
        if (this.direction === 'left') {
          x = this.head.x + this.width
          y = this.head.y
        } else if (this.direction === 'right') {
          x = this.head.x - this.width
          y = this.head.y
        } else if (this.direction === 'up') {
          x = this.head.x
          y = this.head.y + this.height
        } else if (this.direction === 'down') {
          x = this.head.x
          y = this.head.y - this.height
        }
        this.body.unshift({ x, y, width: this.width, height: this.height, color: 'yellow' })
        this.body.forEach(item => this.drawRect(item))
        food.drawFood(this)
        return true
      } else {
        return false
      }
    }
  }
}