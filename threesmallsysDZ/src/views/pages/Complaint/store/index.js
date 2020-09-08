// initial state
const state = {
  complaintPage: {
      pager_offset: '0',
      pager_openset:'10',
      company_name:'',
     complaintreport_state:'',
     add_time:'',
     end_time:''
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
      state.complaintPage.pager_offset= newValue.pager_offset
      state.complaintPage.company_name= newValue.company_name
      state.complaintPage.complaintreport_state= newValue.complaintreport_state
      state.complaintPage.add_time= newValue.add_time
      state.complaintPage.end_time= newValue.end_time
    }
  }
  
  export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  }
  