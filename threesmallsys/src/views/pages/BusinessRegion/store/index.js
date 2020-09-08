// initial state
const state = {
    regionPage: {
      pager_offset: "0",
      company_area_name: '',
      company_name: '',
      state:'',
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
      state.regionPage.pager_offset = newValue.pager_offset
      state.regionPage.company_name = newValue.company_name
      state.regionPage.company_area_name= newValue.company_area_name
      state.regionPage.state= newValue.state
    }
  }
  
  export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  }
  