import axios from 'axios'
import {notification, message} from 'antd'
import { local } from '../util/utils'

const instance = axios.create({
  baseURL: '/',
  timeout: 8000
})

const errorHandler = err => {
  notification.error({
    message: '错误',
    description:err,
  })
}

const successHandler = suc => {
  message.success(suc);
}

function getToken () {
  let token = local.get('token')
  if (token) {
    return token
  } else {
    local.clear()
    window.location.href="#/login"
  }
}

export default {
  get: (url, data = '') => {
    return new Promise((resolve, reject) => {
      let token = getToken()
      instance.get(url, {params: data, headers: {token: token}}).then((response) => {
        if (response.data.code === '200' || response.data.code === '488') {
          resolve(response.data.data)
        } else {
          if (response.data.code === '205') {
            local.clear()
            window.location.href="#/login"
            return
          }
          errorHandler(response.data.msg)
          reject(response.data.msg)
        }
      }).catch(() => {
        errorHandler('网路出现异常')
      })
    })
  },

  post: (url, data) => {
    return new Promise((resolve, reject) => {
      let token = getToken()
      instance.post(url, data, {headers: {token: token}}).then((response) => {
        if (response.data.code === '200' || response.data.code === '488') {
          resolve(response.data.data)
          successHandler(response.data.msg)
          window.history.go(-1)
        } else {
          if (response.data.code === '205' || response.data.code === '499') {
            local.clear()
            window.location.href="#/login"
            return
          }
          errorHandler(response.data.msg)
          reject(response.data.msg)
        }
      }).catch(() => {
        errorHandler('网路出现异常')
      })
    })
  },

  delete: (url, data = '') => {
    return new Promise((resolve, reject) => {
      let token = getToken()
      instance.delete(url, {params: data, headers: {token: token}}).then((response) => {
        if (response.data.code === '200') {
          resolve(response.data.data)
          successHandler(response.data.msg)
        } else {
          if (response.data.code === '205' || response.data.code === '488') {
            local.clear()
            window.location.href="#/login"
            return
          }
          errorHandler(response.data.msg)
          reject(response.data.msg)
        }
      }).catch(() => {
        errorHandler('网路出现异常')
      })
    })
  },

  put: (url, data) => {
    return new Promise((resolve, reject) => {
      let token = getToken()
      instance.put(url, data, {headers: {token: token}}).then((response) => {
        if (response.data.code === '200' || response.data.code === '488') {
          resolve(response.data.data)
          successHandler(response.data.msg)
          window.history.go(-1)
        } else {
          if (response.data.code === '205') {
            local.clear()
            window.location.href="#/login"
            return
          }
          errorHandler(response.data.msg)
          reject(response.data.msg)
        }
      }).catch(() => {
        errorHandler('网路出现异常')
      })
    })
  },
  all: (arr) => {
    return new Promise((resolve, reject) => {
      let token = getToken()
      axios.all(arr, {headers: {token: token}}).then(axios.spread(function (acct, perms) {
        let o = {acct, perms}
        resolve(o)
      }))
    })
  },

  filtersPost: (url, data) => {
    return new Promise((resolve, reject) => {
      instance.post(url, data).then((response) => {
        if (response.data.code === '200' || response.data.code === '488') {
          resolve(response.data.data)
          successHandler(response.data.msg)
        } else {
          if (response.data.code === '205') {
            local.clear()
            window.location.href="#/login"
            return
          }
          errorHandler(response.data.msg)
          reject(response.data.msg)
        }
      }).catch(() => {
        errorHandler('网路出现异常')
      })
    })
  }
}