// 画布构造函数
export default class Canvas {
  canvasEle: { [propName: string]: any }
  canvasContext: { [propName: string]: any }
  canvasWidth: number
  canvasHeight: number
  constructor (canvasEle: { [propName: string]: any }) {
    this.canvasEle = canvasEle
    this.canvasContext = canvasEle.getContext('2d')
    this.canvasWidth = canvasEle.width
    this.canvasHeight = canvasEle.height
  }
  drawRect (params: {x: number, y: number, width: number, height: number, color: string}) {
    this.canvasContext.fillStyle = params.color
    this.canvasContext.fillRect(params.x, params.y, params.width, params.height)
    this.canvasContext.strokeRect(params.x, params.y, params.width, params.height)
  }
  clearPaint () {
    this.canvasContext.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
  }
}