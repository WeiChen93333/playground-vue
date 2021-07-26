import { createStore } from 'vuex'

// 创建一个新的 store 实例
const store = createStore({
  state: window.localStorage.getItem('state') ? JSON.parse(window.localStorage.getItem('state')!): {    
    readingText: `You are Absolutely Unique

    You do not have to pretend in order to seem more like someone else. You do not have to lie to hide the parts of you that are not like what you see in anyone else. You were meant to be different.
    `, //阅读文本
    wordCollection: [], //单词集
    searchHistory: [], //查词跳转历史
  },
  mutations: {
    //改变单词集
    addWord(state, payload){      
      function process(param){
        if(typeof param == 'string'){
          const reg = /[a-zA-Z']+/     
          if(reg.exec(param)){
            param = reg.exec(param)[0]
            if(!state.wordCollection.includes(param)) state.wordCollection.push(param)  
          }
          return        
        }
        for(let item of param){
          process(item)         
        }
      }     
      process(payload)      
      window.localStorage.setItem('wordCollection', JSON.stringify(state.wordCollection))
    },
    removeSelectedWord(state, payload){
      state.wordCollection = payload
      window.localStorage.setItem('wordCollection', JSON.stringify(state.wordCollection))
    },
    removeMasteredWord(state, payload){
      state.wordCollection.splice(payload, 1)      
      window.localStorage.setItem('wordCollection', JSON.stringify(state.wordCollection))
    },

    //改变阅读文本
    changeReadingText(state, payload){
      state.readingText = payload
    },
    reduceSearchHistory(state){
      state.searchHistory.pop(state.searchHistory.length - 1)
    },
    clearSearchHistory(state){
      state.searchHistory = []
    }
  },
})

export default store