// initial state
const state = {
  punishPage: {
    pager_offset: "0",
    pager_openset: "10",
    punish_name: "",
    state: ""
  }
};

// getters
const getters = {
  punishPage: state => state.punishPage
};

// actions
const actions = {
  setDisposePage({ commit }, page) {
    commit("SET_PUNISH_PAGE", page);
  }
};

// mutations
const mutations = {
  SET_PUNISH_PAGE(state, page) {
    state.punishPage = page;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
