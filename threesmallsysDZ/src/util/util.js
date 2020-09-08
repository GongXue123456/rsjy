// 分页
export const onpage = (current) => {
    let pageroffset = 0
    let pageropenset = 10
    pageroffset = (current - 1) * pageropenset
    return pageroffset
  }
  
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
  
  // 临时存贮
  export const session = {
    get: (value) => {
      let v = sessionStorage.getItem(value)
      return v ? JSON.parse(v) : null
    },
    set: (key, value) => {
      sessionStorage.setItem(key, JSON.stringify(value))
    },
    clear: () => {
      sessionStorage.clear()
    },
    del: (key) => {
      sessionStorage.removeItem(key)
    }
  }
  
  export const objKeySort = (obj) => {
    var newkey = Object.keys(obj).sort();
    var newObj = {};
    for (var i = 0; i < newkey.length; i++) {
    newObj[newkey[i]] = obj[newkey[i]];
    
    }
    return newObj;
  }
  // export const remove=(val){
   
  // }

  Array.prototype.remove = function(val) {
    var index = this.indexOf(val);
    if (index > -1) {
      this.splice(index, 1);
    }
  };