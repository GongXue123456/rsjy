// initial state
const state = {
    sourcePage: {
      pager_offset: '0',
      company_name: '',
      state: '',
      filing_state:'',
      companytype_code:'',
      companytag_code:'',
      business_state:'',
       department_code:'',
       search_time_bigen:'',
       search_time_end:'',
       food_source_time_last:'',
      business_type:''
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
      state.sourcePage.pager_offset = newValue.pager_offset
      state.sourcePage.company_name = newValue.company_name
      state.sourcePage.state= newValue.state
      state.sourcePage.filing_state= newValue.filing_state
      state.sourcePage.companytype_code= newValue.companytype_code
      state.sourcePage.companytag_code= newValue.companytag_code
      state.sourcePage.business_state= newValue.business_state
      state.sourcePage.department_code= newValue.department_code
      state.sourcePage.search_time_bigen= newValue.search_time_bigen==null?'':newValue.search_time_bigen
      state.sourcePage.search_time_end= newValue.search_time_end==null?'':newValue.search_time_end
      state.sourcePage.food_source_time_last= newValue.food_source_time_last
      state.sourcePage.business_type= newValue.business_type
    }
  }
  
  export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  }
  