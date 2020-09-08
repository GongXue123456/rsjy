// initial state
const state = {
  monitorPage: {
    pager_offset: "0",
    pager_openset: "10",
    company_name: "",
    companytype_code: "",
    companytag_code: "",
    filing_state:'3',
        state:'1'
  },
};

// getters
const getters = {
  monitorPage: state => state.monitorPage
};

// actions
const actions = {
  setMoniorPage({ commit }, page) {
    commit("SET_MONITOR_PAGE", page);
  }
};

// mutations
const mutations = {
  SET_MONITOR_PAGE(state, page) {
    state.monitorPage = page;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
