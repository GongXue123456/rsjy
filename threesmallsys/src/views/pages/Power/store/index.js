// initial state
const state = {
   powerPage: {
      pager_offset: "0",
      user_province: '',
      user_city: '',
      user_area:"",
      user_town:"",
      user_vill:'',
      user_level_eq:'',
      user_name:'',
      user_type:'平台管理员',
      user_state:'',
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
      state.powerPage.pager_offset = newValue.pager_offset
      state.powerPage.user_province = newValue.user_province
      state.powerPage.user_city= newValue.user_city
      state.powerPage.user_area= newValue.user_area
      state.powerPage.user_town= newValue.user_town
      state.powerPage.user_vill= newValue.user_vill
      state.powerPage.user_name= newValue.user_name
      state.powerPage.user_type= newValue.user_type
      state.powerPage.user_state= newValue.user_state
      state.powerPage.search_time_bigen= newValue.search_time_bigen==null?'':newValue.search_time_bigen
      state.powerPage.search_time_end= newValue.search_time_end==null?'':newValue.search_time_end
      state.powerPage.user_level_eq= newValue.user_level_eq
    }
  }
  
  export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  }
  