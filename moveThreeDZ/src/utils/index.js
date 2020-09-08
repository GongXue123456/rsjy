import request from "@/utils/requestForm";
// 存贮
export const local = {
  get: (value) => {
    let v = localStorage.getItem(value)
    return v ? JSON.parse(v) : null
  },
  set: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value))
  },
  clear: () => {
    localStorage.clear()
  },
  del: (key) => {
    localStorage.removeItem(key)
  }
}
//随机生成code
export const systeamCode = {
  get: function(code_prefix) {
    let prefix = code_prefix
    let timestamp = (new Date()).valueOf()
    prefix += timestamp
    let len = this.subtr(19, prefix.length)
    return prefix + this.RndNum(len) + this.RndNum(6)
  },
  subtr: (arg1, arg2) => {
    let r1, r2, m, n
    try {
      r1 = arg1.toString().split(".")[1].length
    } catch(error) {
      r1 = 0
    }
    try {
      r2 = arg2.toString().split(".")[1].length
    } catch (error) {
      r2 = 0
    }
    m = Math.pow(10, Math.max(r1, r2))
    n = (r1 >= r2) ? r1 : r2
    return ((arg1 * m - arg2 * m) / m).toFixed(n)
  },
  RndNum: (n) => {
    let rnd = ""
    for (var i = 0; i < n; i++) {
      rnd += Math.floor(Math.random() * 10)
    }
    return rnd
  }
}
export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  let o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds()
  };
  for (let k in o) {
      if (new RegExp(`(${k})`).test(fmt)) {
          let str = o[k] + ''
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
      }
  }
  return fmt
}
function padLeftZero(str) {
  return ('00' + str).substr(str.length)
}



export function uploadImg(data) {
  return request({
    url: "/app/file/upload",
    method: "post",
    data,
    showLoading: false
  });
}
export function aaa(arr){
  for(var i = 0;i<arr.length;i++){
    if(arr[i]==''||arr[i]==null||typeof(arr[i])==undefined){
        arr.splice(i,1);
        i=i-1;
    }
}
return arr
}

export function dataURLtoFile(dataurl, filename) { // 将base64转换为file文件
  const arr = dataurl.split(',')
  const mime = arr[0].match(/:(.*?);/)[1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], filename, { type: mime })
}
// Array.prototype.remove = function(arr) {
//   for(var i = 0;i<arr.length;i++){
//     if(arr[i]==''||arr[i]==null||typeof(arr[i])==undefined){
//         arr.splice(i,1);
//         i=i-1;
//     }
// }
// };

