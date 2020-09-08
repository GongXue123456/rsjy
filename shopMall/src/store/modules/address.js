const state = {
    address:localStorage.getItem('address')?JSON.parse(localStorage.getItem('address')):[],
    selfaddress:localStorage.getItem('selfaddress')?JSON.parse(localStorage.getItem('selfaddress')):[]
  } 
  const mutations = { //改变state 逻辑
    SET_ADDRESS(state,data){
        state.address = data;
        localStorage.setItem("address",JSON.stringify(data));
    },
    SET_SELFADDRESS(state,data){
      state.selfaddress = data;
      localStorage.setItem("selfaddress",JSON.stringify(data));
  }
  }
  
  const actions = {  //异步分发mutations
    setAddress: (context, data) => {
        context.commit('SET_ADDRESS', data)
    },
    setSelfAddress: (context, data) => {
      context.commit('SET_SELFADDRESS', data)
  }
  }
  export default {
    namespaced:true,//用于在全局引用此文件里的方法时标识这一个的文件名
    state,
    mutations,
    actions
  }
  