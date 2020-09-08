const state = {
    location:{
        activeName:'sterilize'
    }
    
  }
  
  const mutations = {
      location (state, newVal) {
          console.log(111)
          console.log(newVal)
          state.location.activeName = newVal
    },
  }
  
  const actions = {
      location ({ commit }, newVal) {
          commit('location', newVal)
    },
  }
  
  export default {
      namespaced: true,
          state,
          mutations,
          actions
  }