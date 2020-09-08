const state = {
      item_label:'123'
}
const getters={
     userInfo:function(state){
      return state.item_label
     }
}
export default{
  namespaced:true,
  state,
  getters
}