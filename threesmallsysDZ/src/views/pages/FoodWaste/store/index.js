// initial state
const state = {
  foodWastePage: {
      pager_offset: "0",
      companytag_code:'',
      department_code:'',
      company_name: '',
      examine:'',
      add_time:'',
      end_time:'',
      filing_state:'3'
    },
  }
  
  // getters
  const getters = {}
  
  // actions
  const actions = {
    setNewPage ({ commit }, newValue) {
      commit('setNewPage', newValue)
    },

  }
  
  // mutations
  const mutations = {
    setNewPage (state, newValue) {
      state.foodWastePage.pager_offset = newValue.pager_offset
      state.foodWastePage.companytag_code = newValue.companytag_code
      state.foodWastePage.department_code= newValue.department_code
      state.foodWastePage.company_name= newValue.company_name
      state.foodWastePage.examine= newValue.examine
      state.foodWastePage.add_time= newValue.add_time
      state.foodWastePage.end_time= newValue.end_time
      state.foodWastePage.filing_state= newValue.filing_state
    },
  }
  
  export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  }
  