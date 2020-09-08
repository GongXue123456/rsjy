import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const moduleA = {
  namespaced: true,
  state: {
    count: 1
  },
  mutations: {
    increment (state) {
      console.log(state)
      // 变更状态
      state.count++
    }
  },
  actions: {
    incrementAsync ({ commit }) {
      // console.log(commit)
      commit('increment')
    }
  }
}

export default new Vuex.Store({
  modules: {
    aaa: moduleA
  }
})
