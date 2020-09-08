// initial state
const state = {
  shopPage: {
    pager_offset: 0,
    pager_openset: 10,
    p_name: '',
    c_id: ''
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
    state.shopPage.pager_offset = newValue.pager_offset
    state.shopPage.p_name = newValue.p_name
    state.shopPage.c_id = newValue.c_id
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
