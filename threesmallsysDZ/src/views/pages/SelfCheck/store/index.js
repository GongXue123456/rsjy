// initial state
const state = {
  checkSelfPage: {
      pager_offset: '0',
      pager_openset:'10',
      company_name:'',
      ischeckself:'1',
    },
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
      state.checkSelfPage.pager_offset= newValue.pager_offset
      state.checkSelfPage.company_name= newValue.company_name
      state.checkSelfPage.ischeckself= newValue.ischeckself
    }
  }
  
  export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  }
  