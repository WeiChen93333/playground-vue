import Painting from './painting'
export default class Food extends Painting {
  x: number = 0
  y: number = 0
  width: number
  height: number
  times: number = 1
  color: string
  constructor (canvasEle, snake, times: number) {
    super(canvasEle)
    this.width = snake.width * times
    this.height = snake.height * times
    this.color = times === 1 ? 'blue' : 'green'
  }
  drawFood (snake) { // 初始化和蛇吃到后绘制食物
    // 生成坐标
    const xParts = this.canvasWidth / this.width
    const yParts = this.canvasHeight / this.height
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
    // 绘制
    this.drawRect({ x: this.x, y: this.y, width: this.width, height: this.height, color: this.color })
  }
  reappearFood () { // 蛇改变后因为clearPaint 而需要重现食物
    this.drawRect({ x: this.x, y: this.y, width: this.width, height: this.height, color: this.color })
  }
}