const state = {
  text: '',
  searchHistory: []
}
const mutations = {
  setText (state, payload) {
    state.text = payload
  },
  setSearchHistory (state, payload) {
    let { operation, info } = payload
    if (operation === 'ADD') {
      //匹配字母和 ' , 去掉可能的标点符号、空格
      const reg = /[a-zA-Z']+/
      info.word = reg.exec(info.word)[0].toLowerCase()
      //判断是否连续查询同一个单词
      if(state.searchHistory[state.searchHistory.length - 1] !== info.word) {
        state.searchHistory.push(info.word)
      }
    } else if (operation === 'DELETE') {

    } else if (operation === 'CLEAR') {
      state.searchHistory = []
    }
  }
}

const getters = {}

const actions = {}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}