const state = {
  text: ''
}
const mutations = {
  setText (state, payload) {
    state.text = payload
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