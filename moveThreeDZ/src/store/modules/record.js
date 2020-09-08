const state = {
    recordPage1:{
        company_code:'',
        companytype_code:'1001574645421581000000001',
        companytag_code:'',
        business_form:'',
        record_time: '',
        company_name:'',
        operator:'',
        idcard:'',
        filing_state:'2',
        mobilephone:'',
        record_code:'',
        credit_code:'',
        department_code:'',
        department_name:'',
        region_name:'',
        region_code:'',
        user_code_manage:'',
        user_code_manage_list:[],
        user_name_manage:'',
        user_code_info:'',
        user_name_info:'',
        user_code_info_list:[],
        place_operate:'',
        address:'',
        produce_form_list:[],//生产形式
        producetype_codes_list:[],//生产类别
        main_subject_list:[],//主营项目
        sub_subject_list:[],//兼营项目
        business_range_list:[],//经营范围
        issue_time:'',
        unuseful_time:'',
        place_area:'',
        employ_num:'',
        accessoryList:[{name:'营业执照',url:''},{name:'备案证',url:''},{name:'经营者身份证',url:''}],
        companyEmployList: [],
        province:'',
        city:'',
        area:'',
        vill:'',
        town:'',
    },
    recordPage2:{
      company_code: "",
      companytype_code: "1001574645421581000000002",
      companytag_code: "",
      business_form: "",
      record_time: '',
      company_name: "",
      operator: "",
      idcard: "",
      mobilephone: "",
      record_code: "",
      credit_code: "",
      department_code: "",
      department_name: "",
      region_name: "",
      region_code: "",
      filing_state:'2',
      user_code_manage: "",
      user_code_manage_list: [],
      user_name_manage: "",
      user_code_info: "",
      user_name_info: "",
      user_code_info_list: [],
      place_operate: "",
      address: "",
      produce_form_list: [], //生产形式
      producetype_codes_list: [], //生产类别
      main_subject_list: [], //主营项目
      sub_subject_list: [], //兼营项目
      business_range_list: [], //经营范围
      issue_time: "",
      unuseful_time: "",
      place_area: "",
      employ_num: "",
      accessoryList: [{ name: "营业执照", url: "" },{ name: "备案证", url: "" },{ name: "经营者身份证", url: "" }],
      companyEmployList: [],
      province: "",
      city: "",
      area: "",
      vill: "",
      town: ""
    },
    recordPage3:{
      company_code: "",
        companytype_code: "1001574645421581000000003",
        companytag_code: "",
        business_form: "",
        record_time:'',
        company_name: "",
        operator: "",
        idcard: "",
        mobilephone: "",
        record_code: "",
        credit_code: "",
        department_code: "",
        department_name: "",
        region_name: "",
        region_code: "",
        user_code_manage: "",
        user_code_manage_list: [],
        user_name_manage: "",
        user_code_info: "",
        user_name_info: "",
        user_code_info_list: [],
        place_operate: "",
        address: "",
        produce_form_list: [], //生产形式
        producetype_codes_list: [], //生产类别
        main_subject_list: [], //主营项目
        sub_subject_list: [], //兼营项目
        business_range_list: [], //经营范围
        issue_time: "",
        unuseful_time: "",
        place_area: "",
        employ_num: "",
        accessoryList: [{ name: "营业执照", url: "" },{ name: "食品经营许可证", url: "" },{ name: "法人身份证", url: "" }],
        companyEmployList: [],
        province: "",
        city: "",
        area: "",
        vill: "",
        town: ""
    }
    
  }
  
  const mutations = {
    setNewPage (state, newVal) {
          console.log(newVal)
          state.recordPage1.company_code = newVal.company_code;
          state.recordPage1.company_name = newVal.company_name;
          state.recordPage1.companytype_code = newVal.companytype_code
          state.recordPage1.companytag_code = newVal.companytag_code
          state.recordPage1.business_form = newVal.business_form
          state.recordPage1.record_time = newVal.record_time
          state.recordPage1.operator = newVal.operator
          state.recordPage1.idcard = newVal.idcard
          state.recordPage1.filing_state = newVal.filing_state
          state.recordPage1.mobilephone = newVal.mobilephone
          state.recordPage1.record_code = newVal.record_code
          state.recordPage1.place_operate = newVal.place_operate
          state.recordPage1.address = newVal.address
          state.recordPage1.produce_form_list = newVal.produce_form_list
          state.recordPage1.producetype_codes_list = newVal.producetype_codes_list
          state.recordPage1.issue_time = newVal.issue_time
          state.recordPage1.unuseful_time = newVal.unuseful_time
          state.recordPage1.place_area = newVal.place_area
          state.recordPage1.employ_num = newVal.employ_num
          state.recordPage1.accessoryList = newVal.accessoryList
          state.recordPage1.companyEmployList = newVal.companyEmployList
          state.recordPage1.province = newVal.province
          state.recordPage1.city = newVal.city
          state.recordPage1.area = newVal.area
          state.recordPage1.vill = newVal.vill
          state.recordPage1.town = newVal.town
    },
    setNewPage2 (state, newVal) {
      console.log(newVal)
      state.recordPage2.company_code = newVal.company_code;
      state.recordPage2.company_name = newVal.company_name;
      state.recordPage2.companytype_code = newVal.companytype_code
      state.recordPage2.companytag_code = newVal.companytag_code
      state.recordPage2.business_form = newVal.business_form
      state.recordPage2.record_time = newVal.record_time
      state.recordPage2.operator = newVal.operator
      state.recordPage2.idcard = newVal.idcard
      state.recordPage2.filing_state = newVal.filing_state
      state.recordPage2.mobilephone = newVal.mobilephone 
      state.recordPage2.record_code = newVal.record_code
      state.recordPage2.credit_code = newVal.credit_code
      state.recordPage2.credit_code = newVal.credit_code
      state.recordPage2.place_operate = newVal.place_operate
      state.recordPage2.address = newVal.address
      state.recordPage2.produce_form_list = newVal.produce_form_list
      state.recordPage2.producetype_codes_list = newVal.producetype_codes_list
      state.recordPage2.main_subject_list = newVal.main_subject_list
      state.recordPage2.sub_subject_list = newVal.sub_subject_list
      state.recordPage2.business_range_list = newVal.business_range_list
      state.recordPage2.issue_time = newVal.issue_time
      state.recordPage2.unuseful_time = newVal.unuseful_time
      state.recordPage2.place_area = newVal.place_area
      state.recordPage2.employ_num = newVal.employ_num
      state.recordPage2.accessoryList = newVal.accessoryList
      state.recordPage2.companyEmployList = newVal.companyEmployList
      state.recordPage2.province = newVal.province
      state.recordPage2.city = newVal.city
      state.recordPage2.area = newVal.area
      state.recordPage2.vill = newVal.vill
      state.recordPage2.town = newVal.town
    },
    setNewPage3 (state, newVal) {
      console.log(newVal)
      state.recordPage3.company_code = newVal.company_code;
      state.recordPage3.company_name = newVal.company_name;
      state.recordPage3.companytype_code = newVal.companytype_code
      state.recordPage3.companytag_code = newVal.companytag_code
      state.recordPage3.business_form = newVal.business_form
      state.recordPage3.record_time = newVal.record_time
      state.recordPage3.operator = newVal.operator
      state.recordPage3.idcard = newVal.idcard
      state.recordPage3.filing_state = newVal.filing_state
      state.recordPage3.mobilephone = newVal.mobilephone 
      state.recordPage3.record_code = newVal.record_code
      state.recordPage3.credit_code = newVal.credit_code
      state.recordPage3.credit_code = newVal.credit_code
      state.recordPage3.place_operate = newVal.place_operate
      state.recordPage3.address = newVal.address
      state.recordPage3.produce_form_list = newVal.produce_form_list
      state.recordPage3.producetype_codes_list = newVal.producetype_codes_list
      state.recordPage3.main_subject_list = newVal.main_subject_list
      state.recordPage3.sub_subject_list = newVal.sub_subject_list
      state.recordPage3.business_range_list = newVal.business_range_list
      state.recordPage3.issue_time = newVal.issue_time
      state.recordPage3.unuseful_time = newVal.unuseful_time
      state.recordPage3.place_area = newVal.place_area
      state.recordPage3.employ_num = newVal.employ_num
      state.recordPage3.accessoryList = newVal.accessoryList
      state.recordPage3.companyEmployList = newVal.companyEmployList
      state.recordPage3.province = newVal.province
      state.recordPage3.city = newVal.city
      state.recordPage3.area = newVal.area
      state.recordPage3.vill = newVal.vill
      state.recordPage3.town = newVal.town
    },
  }
  
  const actions = {
    setNewPage ({ commit }, newVal) {
          commit('setNewPage', newVal)
    },
    setNewPage2 ({ commit }, newVal) {
      commit('setNewPage2', newVal)
    },
    setNewPage3 ({ commit }, newVal) {
      commit('setNewPage3', newVal)
    },
  }
  
  export default {
      namespaced: true,
          state,
          mutations,
          actions
  }