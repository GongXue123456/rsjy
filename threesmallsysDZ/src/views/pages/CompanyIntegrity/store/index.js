// initial state
const state = {
    gradePage: {
      pager_offset: '0',
      company_name: '',
      integrity_lvl_new:'0',
      filing_state:"3",
      companytype_code:'',
      companytag_code:'',
       search_time_bigen:'',
       search_time_end:'',
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
      state.gradePage.pager_offset = newValue.pager_offset
      state.gradePage.company_name = newValue.company_name
      state.gradePage.integrity_lvl_new= newValue.integrity_lvl_new
      state.gradePage.filing_state= newValue.filing_state
      state.gradePage.companytype_code= newValue.companytype_code
      state.gradePage.companytag_code= newValue.companytag_code
      state.gradePage.search_time_bigen= newValue.search_time_bigen
      state.gradePage.search_time_end= newValue.search_time_end
    }
  }
  
  export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  }
  