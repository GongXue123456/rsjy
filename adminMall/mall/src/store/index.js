
import Vue from 'vue'
import Vuex from 'vuex'
import shop from '../views/pages/shop/store'
import combo from '../views/pages/combo/store'
import category from '../views/pages/category/store'
Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'
export default new Vuex.Store({
  modules: {
    shop,
    combo,
    category
  },
  strict: debug
})
