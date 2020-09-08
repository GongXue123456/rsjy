
  // initial state
const state = {
    billBookPage: {
      pager_offset:'0',
       pager_openset:'10',
       sterilize_time:'',
       purchase_time:'',
       info_time:'',
       use_time:'',
       report_time:'',
       storage_in_time:'',
       storage_out_time:'',
       sale_time:'',
       handle_time:'',
       company_name:'',
       company_code:'',
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
      state.billBookPage.pager_offset = newValue.pager_offset
      state.billBookPage.pager_openset = newValue.pager_openset
      state.billBookPage.company_code= newValue.company_code
      state.billBookPage.company_name= newValue.company_name
      state.billBookPage.sterilize_time= newValue.sterilize_time==null?'':newValue.sterilize_time
      state.billBookPage.purchase_time= newValue.purchase_time==null?'':newValue.purchase_time
      state.billBookPage.info_time= newValue.info_time==null?'':newValue.info_time
      state.billBookPage.use_time= newValue.use_time==null?'':newValue.use_time
      state.billBookPage.report_time= newValue.report_time==null?'':newValue.report_time
      state.billBookPage.storage_in_time= newValue.storage_in_time==null?'':newValue.storage_in_time
      state.billBookPage.storage_out_time= newValue.storage_out_time==null?'':newValue.storage_out_time
      state.billBookPage.sale_time= newValue.sale_time==null?'':newValue.sale_time
      state.billBookPage.handle_time= newValue.handle_time==null?'':newValue.handle_time
   
    },
  }
  
  export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  }
  