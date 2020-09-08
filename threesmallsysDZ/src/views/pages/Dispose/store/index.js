// initial state
const state = {
  disposePage: {
    pager_offset: "0",
    pager_openset: "10",
    dispose_name: "",
    state: ""
  }
};

// getters
const getters = {
  disposePage: state => state.disposePage
};

// actions
const actions = {
  setDisposePage({ commit }, page) {
    commit("SET_DISPOSE_PAGE", page);
  }
};

// mutations
const mutations = {
  SET_DISPOSE_PAGE(state, page) {
    state.disposePage = page;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
