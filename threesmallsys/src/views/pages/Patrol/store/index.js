// initial state
const state = {
    patrolPage: {
      pager_offset: '0',
      pager_openset:'10',
        company_code:'',
        patrol_result:'',
        business_form:'',
        patrol_user_name:'',
        department_code:'',
        search_time_bigen:'',
        search_time_end:'',
        patrol_state:'',
        patrol_type:'',
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
      state.patrolPage.pager_offset= newValue.pager_offset
      state.patrolPage.company_code= newValue.company_code
      state.patrolPage.business_form= newValue.business_form
      state.patrolPage.patrol_result= newValue.patrol_result
      state.patrolPage.patrol_user_name= newValue.patrol_user_name
      state.patrolPage.department_code= newValue.department_code
      state.patrolPage.search_time_bigen= newValue.search_time_bigen==null?'':newValue.search_time_bigen
      state.patrolPage.search_time_end= newValue.search_time_end==null?'':newValue.search_time_end
      state.patrolPage.patrol_state= newValue.patrol_state==null?'':newValue.patrol_state
      state.patrolPage.patrol_type= newValue.patrol_type==null?'':newValue.patrol_type
    }
  }
  
  export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  }
  