// 参考
// https://blog.csdn.net/weixin_43564110/article/details/111566345
import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

const files = import.meta.globEager("./modules/*.js")
const modules: any = {}

for (const key in files) {
  if (Object.prototype.hasOwnProperty.call(files, key)) {
      modules[key.replace(/(\.\/|\.js)/g, '')] = files[key].default
  }
}
// 创建一个新的 store 实例
const store = createStore({
  modules,
  plugins: [
    createPersistedState({
      storage: window.sessionStorage
    })
  ]
})

export default store