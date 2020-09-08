import axios from 'axios'
import { Notification, Loading } from 'element-ui'
import { local } from './util'
import router from '../router'
import Vue from 'vue'

const instance = axios.create({
  baseURL: '/pcsys/',
  timeout: 8000
})

function getToken () {
  let token = local.get('token')
  if (token) {
    return token
  } else {
    local.clear()
    window.location.href = '#/login'
  }
}

const errorHandler = err => {
  Notification.error({
    title: '请求错误',
    message: err,
    duration: 4500
  })
}
const successHandler = err => {
  Notification.success({
    title: '请求成功',
    message: err,
    duration: 4500
  })
}

export const ImgUrl = ''

export default {
  get: (url, data = '') => {
    return new Promise((resolve, reject) => {
      let token = getToken()
      let loadingInstance = Loading.service()
      instance.get(url, { params: data, headers: { token: token } }).then((response) => {
        if (response.data.code !== '200') {
          if (response.data.code === '205') {
            errorHandler(response.data.msg)
            Vue.prototype.$nextTick(() => {
              loadingInstance.close()
            })
            local.clear()
            router.replace({
              path: '/login'
            })
          } else {
            errorHandler(response.data.msg)
            Vue.prototype.$nextTick(() => {
              loadingInstance.close()
            })
          }
        } else {
          Vue.prototype.$nextTick(() => {
            loadingInstance.close()
          })
          resolve(response.data.data)
        }
      }).catch(() => {
        Vue.prototype.$nextTick(() => {
          loadingInstance.close()
        })
        errorHandler('网路出现异常')
      })
    })
  },

  post: (url, data) => {
    return new Promise((resolve, reject) => {
      let token = getToken()
      let loadingInstance = Loading.service()
      instance.post(url, data, { headers: { token: token } }).then((response) => {
        if (response.data.code !== '200') {
          if (response.data.code === '205') {
            errorHandler(response.data.msg)
            Vue.prototype.$nextTick(() => {
              loadingInstance.close()
            })
            local.clear()
            router.replace({
              path: '/login'
            })
          } else {
            errorHandler(response.data.msg)
            Vue.prototype.$nextTick(() => {
              loadingInstance.close()
            })
          }
        } else {
          Vue.prototype.$nextTick(() => {
            loadingInstance.close()
          })
          successHandler(response.data.msg)
          resolve(response.data.data)
          router.go(-1)
        }
      }).catch(() => {
        Vue.prototype.$nextTick(() => {
          loadingInstance.close()
        })
        errorHandler('网路出现异常')
      })
    })
  },

  put: (url, data) => {
    return new Promise((resolve, reject) => {
      let token = getToken()
      let loadingInstance = Loading.service()
      instance.put(url, data, { headers: { token: token } }).then((response) => {
        if (response.data.code !== '200') {
          if (response.data.code === '205') {
            errorHandler(response.data.msg)
            Vue.prototype.$nextTick(() => {
              loadingInstance.close()
            })
            local.clear()
            router.replace({
              path: '/login'
            })
          } else {
            errorHandler(response.data.msg)
            Vue.prototype.$nextTick(() => {
              loadingInstance.close()
            })
          }
        } else {
          Vue.prototype.$nextTick(() => {
            loadingInstance.close()
          })
          resolve(response.data.data)
        }
      }).catch(() => {
        Vue.prototype.$nextTick(() => {
          loadingInstance.close()
        })
        errorHandler('网路出现异常')
      })
    })
  },

  all: (arr) => {
    return new Promise((resolve, reject) => {
      let token = getToken()
      let loadingInstance = Loading.service()
      axios.all(arr, { headers: { token: token } }).then(axios.spread(function (acct, perms) {
        let o = { acct, perms }
        resolve(o)
        Vue.prototype.$nextTick(() => {
          loadingInstance.close()
        })
      })).catch(() => {
        Vue.prototype.$nextTick(() => {
          loadingInstance.close()
        })
        errorHandler('网路出现异常')
      })
    })
  },

  filterPost: (url, data) => {
    return new Promise((resolve, reject) => {
      let token = getToken()
      let loadingInstance = Loading.service()
      instance.post(url, data, { headers: { token: token } }).then((response) => {
        if (response.data.code !== '200') {
          if (response.data.code === '205') {
            errorHandler(response.data.msg)
            Vue.prototype.$nextTick(() => {
              loadingInstance.close()
            })
            local.clear()
            router.replace({
              path: '/login'
            })
          } else {
            errorHandler(response.data.msg)
            Vue.prototype.$nextTick(() => {
              loadingInstance.close()
            })
          }
        } else {
          Vue.prototype.$nextTick(() => {
            loadingInstance.close()
          })
          successHandler(response.data.msg)
          resolve(response.data.data)
        }
      }).catch(() => {
        Vue.prototype.$nextTick(() => {
          loadingInstance.close()
        })
        errorHandler('网路出现异常')
      })
    })
  },

  filterPut: (url, data) => {
    return new Promise((resolve, reject) => {
      let token = getToken()
      let loadingInstance = Loading.service()
      instance.put(url, data, { headers: { token: token } }).then((response) => {
        if (response.data.code !== '200') {
          if (response.data.code === '205') {
            errorHandler(response.data.msg)
            Vue.prototype.$nextTick(() => {
              loadingInstance.close()
            })
            local.clear()
            router.replace({
              path: '/login'
            })
          } else {
            errorHandler(response.data.msg)
            Vue.prototype.$nextTick(() => {
              loadingInstance.close()
            })
          }
        } else {
          Vue.prototype.$nextTick(() => {
            loadingInstance.close()
          })
          successHandler(response.data.msg)
          resolve(response.data.data)
        }
      }).catch(() => {
        Vue.prototype.$nextTick(() => {
          loadingInstance.close()
        })
        errorHandler('网路出现异常')
      })
    })
  }
}
