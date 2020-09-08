// initial state
const state = {
    samplePage: {
      pager_offset: "0",
      company_name: '',
      state: '',
      filing_state:"",
      companytype_code:"",
      companytag_code:'',
      business_state:'',
       department_code:'',
      search_time_bigen:'',
      search_time_end:'',
      filing_state_time:''
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
      state.samplePage.pager_offset = newValue.pager_offset
      state.samplePage.company_name = newValue.company_name
      state.samplePage.state= newValue.state
      state.samplePage.filing_state= newValue.filing_state
      state.samplePage.companytype_code= newValue.companytype_code
      state.samplePage.companytag_code= newValue.companytag_code
      state.samplePage.business_state= newValue.business_state
      state.samplePage.department_code= newValue.department_code
      state.samplePage.search_time_bigen= newValue.search_time_bigen==null?'':newValue.search_time_bigen
      state.samplePage.search_time_end= newValue.search_time_end==null?'':newValue.search_time_end
      state.samplePage.filing_state_time= newValue.filing_state_time
   
    }
  }
  
  export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  }
  