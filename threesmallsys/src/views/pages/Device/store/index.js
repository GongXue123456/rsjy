// initial state
const state = {
  camPage: {
    pager_offset: "0",
    pager_openset: "10",
    device_name: "",
    device_state: "",
    company_name: ""
  }
};

// getters
const getters = {
  camPage: state => state.camPage
};

// actions
const actions = {
  setCamPage({ commit }, page) {
    commit("SET_CAM_PAGE", page);
  }
};

// mutations
const mutations = {
  SET_CAM_PAGE(state, page) {
    state.camPage = page;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
