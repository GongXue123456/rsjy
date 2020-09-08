import axios from 'axios'
import { Notification, Loading } from 'element-ui'
import { local } from './util'
import router from '../router'
import Vue from 'vue'
import md5 from 'js-md5';

const instance = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API,
  baseURL: "",
  timeout: 25000
})

// function getToken () {
//   let token = local.get('token')
//   if (token) {
//     return token
//   } else {
//     local.clear()
//     window.location.href = '#/login'
//   }
// }

const errorHandler = err => {
  Notification.error({
    title: '请求错误',
    message: err,
    duration: 2000
  })
}
const successHandler = err => {
  Notification.success({
    title: '请求成功',
    message: err,
    duration: 1000
  })
}


function objKeySort(obj) {
var newkey = Object.keys(obj).sort();
var newObj = {};
for (var i = 0; i < newkey.length; i++) {
newObj[newkey[i]] = obj[newkey[i]];

}
return newObj;

}

 

export const ImgUrl = ''

export default {
  get: (url, data = '') => {
    return new Promise((resolve, reject) => {
      // let token = getToken()
      let app_key='5815e8a8-5bcd-d0b7-f61a-b4b331335276'
      // let loadingInstance = Loading.service()
      let time = new Date().getTime();
      if(data==''){
      //  data;
       data={app_secret:"35faaf6a63d93cea7246e6854fceb2b2"}
       Vue.delete(data,'sign');
        var _sign=md5(JSON.stringify(objKeySort(data))).toUpperCase();
        data.sign=_sign;
        Vue.delete(data,'app_secret');

      }else{
        var aa=data;
        aa.app_secret = "35faaf6a63d93cea7246e6854fceb2b2";
        Vue.delete(aa,'sign');
        var _sign=md5(JSON.stringify(objKeySort(aa))).toUpperCase();
        data.sign=_sign;
        Vue.delete(data,'app_secret');
      }
  
      instance.get(url,{params:objKeySort(data), headers: {token: '',app_key:app_key,timestamp:time}}).then((response) => {
        if (response.data.code !== 200) {
          if (response.data.code === 205||response.data.code === 228) {
            errorHandler(response.data.msg)
            Vue.prototype.$nextTick(() => {
              // loadingInstance.close()
            })
            local.clear()
            router.replace({
              path: '/login'
            })
          } else {
            errorHandler(response.data.msg)
            Vue.prototype.$nextTick(() => {
              // loadingInstance.close()
            })
          }
        } else {
          Vue.prototype.$nextTick(() => {
            // loadingInstance.close()
          })
          resolve(response.data.data)
        }
      }).catch(() => {
        Vue.prototype.$nextTick(() => {
          // loadingInstance.close()
        })
        errorHandler('网络出现异常')
      })
    })
  },

  post: (url, data) => {
    return new Promise((resolve, reject) => {
      // let token = getToken()
      let loadingInstance = Loading.service()
      let app_key='5815e8a8-5bcd-d0b7-f61a-b4b331335276'
      let time = new Date().getTime();
      if(data==''){
        data={app_secret:"35faaf6a63d93cea7246e6854fceb2b2"}
        Vue.delete(data,'sign');
         var _sign=md5(JSON.stringify(objKeySort(data))).toUpperCase();
         data.sign=_sign;
         Vue.delete(data,'app_secret');
 
       }else{
         var aa=data;
         aa.app_secret = "35faaf6a63d93cea7246e6854fceb2b2";
         Vue.delete(aa,'sign');
         var _sign=md5(JSON.stringify(objKeySort(aa))).toUpperCase();
         data.sign=_sign;
         Vue.delete(data,'app_secret');
       }
      instance.post(url, objKeySort(data), { headers: {token: '',app_key:app_key,timestamp:time} }).then((response) => {
        if (response.data.code !== 200) {
          if (response.data.code === 205||response.data.code === 228) {
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
          // router.go(-1)
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
      // let token = getToken()
      // let loadingInstance = Loading.service()
      let app_key='5815e8a8-5bcd-d0b7-f61a-b4b331335276'
      let time = new Date().getTime();
      if(data==''){
        // data;
        data={app_secret:"35faaf6a63d93cea7246e6854fceb2b2"}
        Vue.delete(data,'sign');
         var _sign=md5(JSON.stringify(objKeySort(data))).toUpperCase();
         data.sign=_sign;
         Vue.delete(data,'app_secret');
 
       }else{
         var aa=data;
         aa.app_secret = "35faaf6a63d93cea7246e6854fceb2b2";
         Vue.delete(aa,'sign');
         var _sign=md5(JSON.stringify(objKeySort(aa))).toUpperCase();
     
         data.sign=_sign;
         Vue.delete(data,'app_secret');
       }
      instance.put(url,  objKeySort(data), { headers: {token: '',app_key:app_key,timestamp:time} }).then((response) => {
        if (response.data.code !== 200) {
          if (response.data.code === 205||response.data.code === 228) {
            errorHandler(response.data.msg)
            Vue.prototype.$nextTick(() => {
              // loadingInstance.close()
            })
            // local.clear()
            // router.replace({
            //   path: '/login'
            // })
          } else {
            errorHandler(response.data.msg)
            Vue.prototype.$nextTick(() => {
              // loadingInstance.close()
            })
          }
        } else {
          Vue.prototype.$nextTick(() => {
            // loadingInstance.close()
          })
          successHandler(response.data.msg)
          resolve(response.data.data)
          // router.go(-1)
        }
      }).catch(() => {
        Vue.prototype.$nextTick(() => {
          // loadingInstance.close()
        })
        errorHandler('网路出现异常')
      })
    })
  },
  delete: (url, data = '') => {
    return new Promise((resolve, reject) => {
      // let token = getToken()
      let app_key='5815e8a8-5bcd-d0b7-f61a-b4b331335276'
      let loadingInstance = Loading.service()
      let time = new Date().getTime();
      if(data==''){
      //  data;
       data={app_secret:"35faaf6a63d93cea7246e6854fceb2b2"}
       Vue.delete(data,'sign');
        var _sign=md5(JSON.stringify(objKeySort(data))).toUpperCase();
        data.sign=_sign;
        Vue.delete(data,'app_secret');

      }else{
        var aa=data;
        aa.app_secret = "35faaf6a63d93cea7246e6854fceb2b2";
        Vue.delete(aa,'sign');
        var _sign=md5(JSON.stringify(objKeySort(aa))).toUpperCase();
        data.sign=_sign;
        Vue.delete(data,'app_secret');
      }
      instance.delete(url,{params:objKeySort(data), headers: {token: '',app_key:app_key,timestamp:time}}).then((response) => {
        if (response.data.code !== 200) {
          if (response.data.code === 205||response.data.code === 228) {
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
        errorHandler('网络出现异常')
      })
    })
  },

  all: (arr) => {
    return new Promise((resolve, reject) => {
      // let token = getToken()
      let loadingInstance = Loading.service()
      axios.all(arr, { headers: { token: '' } }).then(axios.spread(function (acct, perms) {
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
      // let token = getToken()
      let loadingInstance = Loading.service()
      instance.post(url, data, { headers: { token: '' } }).then((response) => {
        if (response.data.code !== 200) {
          if (response.data.code === 205||response.data.code === 228) {
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
      // let token = getToken()
      let loadingInstance = Loading.service()
      instance.put(url, data, { headers: { token: '' } }).then((response) => {
        if (response.data.code !== '200') {
          if (response.data.code === '205'||response.data.code === '228') {
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
  fileget: (url, data = '') => {
    return new Promise((resolve, reject) => {
      // let token = getToken()
      let app_key='5815e8a8-5bcd-d0b7-f61a-b4b331335276'
      // let loadingInstance = Loading.service()
      let time = new Date().getTime();
      if(data==''){
      //  data;
       data={app_secret:"35faaf6a63d93cea7246e6854fceb2b2"}
       Vue.delete(data,'sign');
        var _sign=md5(JSON.stringify(objKeySort(data))).toUpperCase();
        data.sign=_sign;
        Vue.delete(data,'app_secret');

      }else{
        var aa=data;
        aa.app_secret = "35faaf6a63d93cea7246e6854fceb2b2";
        Vue.delete(aa,'sign');
        var _sign=md5(JSON.stringify(objKeySort(aa))).toUpperCase();
        data.sign=_sign;
        Vue.delete(data,'app_secret');
      }
  
      instance.get(url, {params:objKeySort(data),responseType: 'blob',headers: {token: '',app_key:app_key,timestamp:time}}).then((response) => {
        // 将`blob`对象转化成一个可访问的`url`
        let fileName = decodeURI(response.headers['content-disposition'].split('=')[1]);
        let url = window.URL.createObjectURL(new Blob([response.data]));
        let link = document.createElement('a');
        link.style.display = 'none';
        link.href = url;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

      }).catch(() => {
        Vue.prototype.$nextTick(() => {
          // loadingInstance.close()
        })
        errorHandler('网络出现异常')
      })
    })
  },
}
