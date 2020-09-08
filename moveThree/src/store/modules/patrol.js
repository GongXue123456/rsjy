const state = {
  location: {},
  company: {}
}

const mutations = {
	location (state, newVal) {
		state.location = newVal
  },
  getCompany (state, newVal) {
    state.company = newVal
  }
}

const actions = {
	location ({ commit }, newVal) {
		commit('location', newVal)
  },
  getCompany ({ commit }, newVal) {
    commit('getCompany', newVal)
  }
}

export default {
    namespaced: true,
		state,
		mutations,
		actions
}