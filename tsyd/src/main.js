import Vue from 'vue'
import 'lib-flexible'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import Vant from 'vant';
import globalVue from '@/global';
import FastClick from 'fastclick'
// import 'utils/permission'
import SvgIcon from 'components/SvgIcon'
import '@/icons' // icon
import '@/style/common.scss'
import 'vant/lib/index.css';
import { Lazyload } from 'vant'
import defaultSettings from '@/settings'
import wechat from "@/common/wechat/index";
import 'utils/touch'

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */
// import { mockXHR } from '../mock'

// if (process.env.NODE_ENV === 'production') {
//   mockXHR()
// }

FastClick.attach(document.body)

Vue.use(Vant);
Vue.use(wechat);
Vue.use(Lazyload)

Vue.component('svg-icon', SvgIcon)

if (process.env.NODE_ENV === 'development' && defaultSettings.vconsole) {
  const VConsole = require('vconsole')
  // eslint-disable-next-line
  const my_console = new VConsole()
}

Vue.config.productionTip = false
Vue.prototype.global = globalVue

Date.prototype.format = function(fmt) { 
  var o = { 
     "M+" : this.getMonth()+1,                 //月份 
     "d+" : this.getDate(),                    //日 
     "h+" : this.getHours(),                   //小时 
     "m+" : this.getMinutes(),                 //分 
     "s+" : this.getSeconds(),                 //秒 
     "q+" : Math.floor((this.getMonth()+3)/3), //季度 
     "S"  : this.getMilliseconds()             //毫秒 
 }; 
 if(/(y+)/.test(fmt)) {
         fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
 }
  for(var k in o) {
     if(new RegExp("("+ k +")").test(fmt)){
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
      }
  }
 return fmt; 
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
