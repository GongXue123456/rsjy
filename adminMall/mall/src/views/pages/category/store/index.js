// initial state
const state = {
  categoryPage: {
    pager_offset: 0,
    pager_openset: 10,
    c_name: '',
    c_level: ''
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
    state.categoryPage.pager_offset = newValue.pager_offset
    state.categoryPage.c_level = newValue.c_level
    state.categoryPage.c_name = newValue.c_name
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
