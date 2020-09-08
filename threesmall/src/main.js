import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import ElementUI from 'element-ui'

// import echarts from "echarts";
// Vue.prototype.$echarts = echarts;
import 'element-ui/lib/theme-chalk/index.css'
import '../static/css/base.css'
import '../theme/index.css'
// import BaiduMap from 'vue-baidu-map'

import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
  
Vue.use(VueQuillEditor)
import scroll from 'vue-seamless-scroll'
Vue.use(scroll)
// Vue.use(BaiduMap, {
//   ak: 'oqnvdL14rNlcc5gi520BAbRZlW57T4NI'
// })
Vue.use(ElementUI)


Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
