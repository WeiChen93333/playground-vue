import axios from "axios"
import {
    ElMessageBox
} from 'element-plus'

axios.defaults.baseURL = "http://localhost:3366"
axios.defaults.withCredentials = true

//post请求头
axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded;charset=UTF-8"
//设置超时
axios.defaults.timeout = 10000

axios.interceptors.request.use(
  config => {
    //为请求头对象, 添加 token 验证的 Authorization 字段  
    config.headers['Authorization'] = window.sessionStorage.getItem('token')
    //*发起登录请求的时候还没有token, window.sessionStorage.getItem('token')为"null"  
    return config
  },
  error => {
    return Promise.reject(error)
  }
);

axios.interceptors.response.use(
  response => {
    if (response.status == 200) {
        return Promise.resolve(response)
    } else {
        return Promise.reject(response)
    }
  },
  error => {
    // ElMessageBox(JSON.stringify(error), '请求异常', {
    //     confirmButtonText: '确定',
    //     callback: action => {}
    // })
  }
)

// function request(method, path, payload){
//   if(method == 'GET'){
//     return axios.get(path, payload)
//   }
//   if(method == 'POST'){
//     return axios.post(path, JSON.stringify(payload))
//   }
//   // if(method == 'PUT'){ 
//   //   return axios.put('/test', JSON.stringify({'name': 'chen'}))
//   // }
// }

export default axios