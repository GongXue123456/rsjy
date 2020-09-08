// initial state
const state = {
  casesPage: {
      pager_offset: '0',
      pager_openset:'10',
      casecenter_title:'',
      casecenter_audit_state:'',
      result_state:'',
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
      state.casesPage.pager_offset= newValue.pager_offset
      state.casesPage.casecenter_title= newValue.casecenter_title
      state.casesPage.casecenter_audit_state= newValue.casecenter_audit_state
      state.casesPage.result_state= newValue.result_state
      state.casesPage.add_time= newValue.add_time
      state.casesPage.end_time= newValue.end_time
    }
  }
  
  export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  }
  