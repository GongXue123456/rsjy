// initial state
const state = {
  sensorPage: {
    pager_offset: "0",
    pager_openset: "10",
    sensor_name: "",
    sensor_state: "",
    company_name: ""
  }
};

// getters
const getters = {
  sensorPage: state => state.sensorPage
};

// actions
const actions = {
  setSensorPage({ commit }, page) {
    commit("SET_SENSOR_PAGE", page);
  }
};

// mutations
const mutations = {
  SET_SENSOR_PAGE(state, page) {
    state.sensorPage.pager_offset = page.pager_offset;
    state.sensorPage.pager_openset = page.pager_openset;
    state.sensorPage.sensor_name = page.sensor_name;
    state.sensorPage.sensor_state = page.sensor_state;
    state.sensorPage.company_name = page.company_name;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
