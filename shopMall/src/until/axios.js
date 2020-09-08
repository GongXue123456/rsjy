import axios from "axios"
import Vue from 'vue'
import router from '../router'
// import { Toast } from 'vant';

// 创建axios实例
let instance = axios.create({
  timeout:10000,
  baseURL:""

})

//添加请求拦截器
instance.interceptors.request.use(
  config=>{
      let token = Vue.cookies.get('token')
    // const token = getCookie('名称');如果有用户登录信息的时候需要引入cookie方法，推荐js-cookie
      config.data = JSON.stringify(config.data);
      config.headers = {
        'Content-Type':'application/json',
        token
      }
    // if(token){
    //   config.params = {'token':token}
    // }
      return config;
    },
  error => {
    return Promise.reject(err);
  }
)

//添加response返回 拦截器
instance.interceptors.response.use(
    response=>{
      if (response.data.code ==205) {
        router.replace({
          path: '/login'
        })
      }

      return response;
    },
    error=>{
      return Promise.reject(error)
    }
)

export default instance
