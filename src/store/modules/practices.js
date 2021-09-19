const state = {
  heroList: []
}
const mutations = {
  setHeroList (state, payload) {
    state.heroList = payload
    console.log(state.heroList)
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