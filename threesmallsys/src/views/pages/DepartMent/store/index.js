// initial state
const state = {
  departmentPage: {
    pager_offset: "0",
    pager_openset: "10",
    department_name: "",
    province: "",
    city: "",
    area: "",
    town: "",
    vill: ""
  },
  supervisorPage: {
    pager_offset: "0",
    pager_openset: "10",
    department_code: "",
    state: "",
    user_name: ""
  },
  gridOperatorPage: {
    pager_offset: "0",
    pager_openset: "10",
    state: "",
    user_name: ""
  }
};

// getters
const getters = {
  departmentPage: state => state.departmentPage,
  supervisorPage: state => state.supervisorPage,
  gridOperatorPage: state => state.gridOperatorPage
};

// actions
const actions = {
  setDepartmentPage({ commit }, page) {
    commit("SET_DEPARTMENT_PAGE", page);
  },
  setSupervisorPage({ commit }, page) {
    commit("SET_SUPERVISOR_PAGE", page);
  },
  setGridOperatorPage({ commit }, page) {
    commit("SET_GRID_OPERATOR_PAGE", page);
  }
};

// mutations
const mutations = {
  SET_DEPARTMENT_PAGE(state, page) {
    state.departmentPage = page;
  },
  SET_SUPERVISOR_PAGE(state, page) {
    state.supervisorPage = page;
  },
  SET_GRID_OPERATOR_PAGE(state, page) {
    state.gridOperatorPage = page;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
