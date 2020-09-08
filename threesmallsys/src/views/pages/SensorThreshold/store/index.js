// initial state
const state = {
  sensorThresholdPage: {
    pager_offset: "0",
    pager_openset: "10",
    sensor_name: "",
    sensor_enname: ""
  }
};

// getters
const getters = {
  sensorThresholdPage: state => state.sensorThresholdPage
};

// actions
const actions = {
  setSensorThresholdPage({ commit }, page) {
    commit("SET_SENSOR_THRESHOLD_PAGE", page);
  }
};

// mutations
const mutations = {
  SET_SENSOR_THRESHOLD_PAGE(state, page) {
    state.sensorThresholdPage = page;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
