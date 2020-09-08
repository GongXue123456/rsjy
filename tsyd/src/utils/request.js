import axios from 'axios'
import { Toast } from 'vant'
import store from '@/store'
// import { getToken } from '@/utils/auth'

// create an axios instance
let BASE_URL = ""
if(process.env.NODE_ENV=="production"){
  BASE_URL = `http://${location.host}/`
}else{
  BASE_URL = process.env.VUE_APP_BASE_API
}
const service = axios.create({
  baseURL: BASE_URL, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 500000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    // if (store.getters.token) {
    //   config.headers['X-Token'] = getToken()
    // }
    return config
  },
  error => {
    // do something with request error
    console.log(error, 'err') // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 200) {
      return Promise.reject(new Error(res.msg || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Toast.fail({
      message: error.msg,
      duration: 1.5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
