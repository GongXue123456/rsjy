import Vue from 'vue'
import Vuex from 'vuex'
import patrol from './modules/patrol'
import ledger from './modules/ledger'
import record from './modules/record'
Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    patrol,
    ledger,
    record
  },
  strict: debug
})