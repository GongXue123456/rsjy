import axios from 'axios'
import Vue from 'vue'
import { Toast } from 'cube-ui'
import { local } from '../utils/index.js'

Vue.use(Toast)
var loading = (text = '加载中') => {
  const loading = Toast.$create({
    time: 0,
    txt: text,
    mask: true
  })
  return loading
}

axios.interceptors.request.use(function (config) {
  return config;
}, function (error) {
  return Promise.reject(error)
})

var errHandle = (text = '网络异常') => {
  const errHandle = Toast.$create({
    time: 2000,
    txt: text,
    mask: true
  })
  return errHandle
}

let init = {
  params: {
    user_code: ''
  },
  getQueryVariable: (variable) => {
    let hash = window.location.hash
    let index = hash.indexOf("?")
    if (index === -1) {
      return false
    }
    let query = hash.substring(index + 1)
    let vars = query.split("&")
    for (var i=0; i<vars.length; i++) {
      let pair = vars[i].split("=");
      if (pair[0] === variable){
        return pair[1]
      }
    }
    return false
  },
  validatorUser: function() {
    let code = this.getQueryVariable("user_code")
    if (code) {
      this.params.user_code = code
      local.set("user_code", code)
    } else {
      // 1011592551993493601117330
      //1011528113120965833870553    1011596441175478651124513
      // let user_code = local.get("user_code")
      let user_code='1010162811235709266031058'
      // let user_code='1011587863672591273713627'
      // let user_code='1011593739827068814359088'
      if (user_code) {
        this.params.user_code = user_code
      } else {
        this.params.user_code = null
      }
    }
  }
}

init.validatorUser()

export default {
  get: (url, data = '') => {
    let result = Object.assign({}, data, init.params)
    return new Promise((resolve) => {
      loading().show()
      axios.get(url, { params: result}).then((response) => {
        if (response.data.code !== 200) {
          loading().hide()
          errHandle(response.data.msg).show()
        } else {
          resolve(response.data)
          loading().hide()
        }
      }).catch((err) => {
        loading().hide()
        errHandle(err).show()
      })
    })
  },
  post: (url, data = '') => {
    let result = Object.assign({}, data, init.params)
    return new Promise((resolve) => {
      loading().show()
      axios.post(url, result).then((response) => {
        if (response.data.code !== 200) {
          loading().hide()
          errHandle(response.data.msg).show()
        } else {
          resolve(response.data)
          loading().hide()
        }
      }).catch((err) => {
        loading().hide()
        errHandle(err).show()
      })
    })
  },
  put: (url, data = '') => {
    let result = Object.assign({}, data, init.params)
    return new Promise((resolve) => {
      loading().show()
      axios.put(url, result).then((response) => {
        if (response.data.code !== 200) {
          loading().hide()
          errHandle(response.data.msg).show()
        } else {
          resolve(response.data)
          loading().hide()
        }
      }).catch((err) => {
        loading().hide()
        errHandle(err).show()
      })
    })
  },
  delete: (url, data = '') => {
    let result = Object.assign({}, data, init.params)
    return new Promise((resolve) => {
      loading().show()
      axios.delete(url, { params: result}).then((response) => {
        if (response.data.code !== 200) {
          loading().hide()
          errHandle(response.data.msg).show()
        } else {
          resolve(response.data)
          loading().hide()
        }
      }).catch((err) => {
        loading().hide()
        errHandle(err).show()
      })
    })
  },
}