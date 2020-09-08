// initial state
const state = {
  comboPage: {
    pager_offset: 0,
    pager_openset: 10,
    co_name: ''
  }
}

// getters
const getters = {}

// actions
const actions = {
  setNewPage ({ commit }, newValue) {
    commit('setNewPage', newValue)
  }
}

// mutations
const mutations = {
  setNewPage (state, newValue) {
    state.comboPage.pager_offset = newValue.pager_offset
    state.comboPage.co_name = newValue.co_name
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
