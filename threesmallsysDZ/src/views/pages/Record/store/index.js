// initial state
const state = {
    recordPage: {
      pager_offset: "0",
      company_name: '',
      state: '1',
      isblacklist:'1',
      filing_state:"3",
      companytype_code:"1001574645421581000000001",
      business_form:'',
      companytag_code:'',
      business_state:'',
       department_code:'',
      search_time_bigen:'',
      search_time_end:'',
      filing_state_time:'',
      business_type:'',
      province:'',
      city:'',
      area:'',
      town:'',
      vill:''
    },
    recordPage1: {
      pager_offset: "0",
      company_name: '',
      state: '1',
      isblacklist:'1',
      filing_state:"3",
      companytype_code:"1001574645421581000000002",
      business_form:'',
      companytag_code:'',
      business_state:'',
       department_code:'',
      search_time_bigen:'',
      search_time_end:'',
      filing_state_time:'',
      business_type:'',
      province:'',
      city:'',
      area:'',
      town:'',
      vill:''
    },
    recordPage2: {
      pager_offset: "0",
      company_name: '',
      state: '1',
      isblacklist:'1',
      filing_state:"3",
      companytype_code:"1001574645421581000000003",
      business_form:'',
      companytag_code:'',
      business_state:'',
      department_code:'',
      search_time_bigen:'',
      search_time_end:'',
      filing_state_time:'',
      business_type:'',
      province:'',
      city:'',
      area:'',
      town:'',
      vill:''
    },
    recordPage3: {
      pager_offset: "0",
      company_name: '',
      e_state: '1',
      c_state:'1'
    },
    activeName:'3'
  }
  
  // getters
  const getters = {}
  
  // actions
  const actions = {
    setNewPage ({ commit }, newValue) {
      commit('setNewPage', newValue)
    },
    setNewPage1 ({ commit }, newValue) {
      commit('setNewPage1', newValue)
    },
    setNewPage2 ({ commit }, newValue) {
      commit('setNewPage2', newValue)
    },
    setNewPage3 ({ commit }, newValue) {
      commit('setNewPage3', newValue)
    }
  }
  
  // mutations
  const mutations = {
    setNewPage (state, newValue) {
      state.recordPage.pager_offset = newValue.pager_offset
      state.recordPage.company_name = newValue.company_name
      state.recordPage.state= newValue.state
      state.recordPage.isblacklist= newValue.isblacklist
      state.recordPage.filing_state= newValue.filing_state
      state.recordPage.companytype_code= newValue.companytype_code
      state.recordPage.business_form= newValue.business_form
      state.recordPage.companytag_code= newValue.companytag_code
      state.recordPage.business_state= newValue.business_state
      state.recordPage.department_code= newValue.department_code
      state.recordPage.search_time_bigen= newValue.search_time_bigen==null?'':newValue.search_time_bigen
      state.recordPage.search_time_end= newValue.search_time_end==null?'':newValue.search_time_end
      state.recordPage.filing_state_time= newValue.filing_state_time
      state.recordPage.business_type= newValue.business_type
      state.recordPage.province= newValue.province
      state.recordPage.city= newValue.city
      state.recordPage.area= newValue.area
      state.recordPage.town= newValue.town
      state.recordPage.vill= newValue.vill
   
    },
    setNewPage1 (state, newValue) {
      state.recordPage1.pager_offset = newValue.pager_offset
      state.recordPage1.company_name = newValue.company_name
      state.recordPage1.state= newValue.state
      state.recordPage1.isblacklist= newValue.isblacklist
      state.recordPage1.filing_state= newValue.filing_state
      state.recordPage1.companytype_code= newValue.companytype_code
      state.recordPage1.business_form= newValue.business_form
      state.recordPage1.companytag_code= newValue.companytag_code
      state.recordPage1.business_state= newValue.business_state
      state.recordPage1.department_code= newValue.department_code
      state.recordPage1.search_time_bigen= newValue.search_time_bigen==null?'':newValue.search_time_bigen
      state.recordPage1.search_time_end= newValue.search_time_end==null?'':newValue.search_time_end
      state.recordPage1.filing_state_time= newValue.filing_state_time
      state.recordPage1.business_type= newValue.business_type
      state.recordPage1.province= newValue.province
      state.recordPage1.city= newValue.city
      state.recordPage1.area= newValue.area
      state.recordPage1.town= newValue.town
      state.recordPage1.vill= newValue.vill
    },
    setNewPage2 (state, newValue) {
      state.recordPage2.pager_offset = newValue.pager_offset
      state.recordPage2.company_name = newValue.company_name
      state.recordPage2.state= newValue.state
      state.recordPage2.isblacklist= newValue.isblacklist
      state.recordPage2.filing_state= newValue.filing_state
      state.recordPage2.companytype_code= newValue.companytype_code
      state.recordPage2.business_form= newValue.business_form
      state.recordPage2.companytag_code= newValue.companytag_code
      state.recordPage2.business_state= newValue.business_state
      state.recordPage2.department_code= newValue.department_code
      state.recordPage2.search_time_bigen= newValue.search_time_bigen==null?'':newValue.search_time_bigen
      state.recordPage2.search_time_end= newValue.search_time_end==null?'':newValue.search_time_end
      state.recordPage2.filing_state_time= newValue.filing_state_time
      state.recordPage2.business_type= newValue.business_type
      state.recordPage2.province= newValue.province
      state.recordPage2.city= newValue.city
      state.recordPage2.area= newValue.area
      state.recordPage2.town= newValue.town
      state.recordPage2.vill= newValue.vill
    },
    setNewPage3 (state, newValue) {
      state.recordPage3.pager_offset = newValue.pager_offset
      state.recordPage3.company_name = newValue.company_name
      state.recordPage3.e_state= newValue.e_state
      state.recordPage3.c_state= newValue.c_state
    }
  }
  
  export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  }
  