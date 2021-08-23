import axios from "axios"
import {
  ElMessageBox
} from 'element-plus'

// axios.defaults.baseURL = "http://localhost:3366"
axios.defaults.withCredentials = true

axios.defaults.timeout = 60000
axios.defaults.headers = {
  'Content-type': 'application/json;charset=UTF-8'
}
axios.defaults.withCredentials = true

axios.interceptors.request.use(
  config => {
    //为请求头对象, 添加 token 验证的 Authorization 字段  
    config.headers['Authorization'] = window.sessionStorage.getItem('token')
    //*发起登录请求的时候还没有token, window.sessionStorage.getItem('token')为"null"
    // 添加随机数，解决 ie 缓存问题
    if (config.url.includes('?')) {
      config.url = config.url + '&random=' + Math.random()
    } else {
      config.url = config.url + '?random=' + Math.random()
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
);

const whiteList: string[] = [
  // 导出文或下载文件时没有返回数据中没有 code 和 message
]
const autoMessageList: string[] = []
axios.interceptors.response.use(
  response => {
    const url = response.config.url
    let notIntercept = false
    whiteList.forEach(item => {
      if (url.indexOf(item) !== -1) {
        notIntercept = true
      }
    })
    if (notIntercept) return response
    const data = response.data
    if (data.code === 200 || data.code === '200') {
      // 设置自动消息弹出
      const url = response.config.url
      autoMessageList.forEach(item => {
        if (url.indexOf(item) !== -1) {
          console.log(ElMessageBox)
          // ElMessageBox.message({
          //   type: 'success',
          //   message: data.message || '操作成功'
          // })
        }
      })
      return data
    } else {
      // ElMessageBox.message({
      //   type: 'error',
      //   message: data.message || '操作成功'
      // })
      return Promise.reject(data)
    }
  },
  error => {

  }
)

export default axios