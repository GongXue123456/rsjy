const state = {
  cartList:localStorage.getItem('cartList')?JSON.parse(localStorage.getItem('cartList')):[]
}

const getters = { //过滤
  allPrice:(state)=>{
      var total=0;
      state.cartList.forEach(item=>{
        let products = item.productSpecsList
        products.forEach(goods=>{
            if(goods.ischcked){
              total += goods.ps_price_sell*goods.cart_count
            }
        })
    })
      return total
  },
  allNum:(state)=>{
    var totalNum = 0;
    state.cartList.forEach((item)=>{
      item.productSpecsList.forEach(goods=>{
        if(goods.ischcked){
          totalNum += 1
        }
    })
    })
    return totalNum
}

}

const mutations = { //改变state 逻辑
  ADDGOODS:(state,data)=>{
      state.cartList=data;
      localStorage.setItem("cartList",JSON.stringify(state.cartList));
  },
  DELGOODS:(state,id)=>{
    if(state.cartList[id.index].productSpecsList.length==1){
      state.cartList.splice(id.index,1);
    }else{
      state.cartList[id.index].productSpecsList.splice(id.goodsIndex,1);
    }
    localStorage.setItem("cartList",JSON.stringify(state.cartList));
  },
  DELALLGOODS:(state,id)=>{
   
    state.cartList.forEach(item=>{
      let products = item.productSpecsList
     
      products.forEach(goods=>{
          if(goods.ischcked){
            if(products.length==1){
              state.cartList.splice(state.cartList.indexOf(item),1);
            }else{
              products.splice(products.indexOf(goods),1);
            }
          }
      })
  })
    localStorage.setItem("cartList",JSON.stringify(state.cartList));
  },
  ADDNUMBER:(state,id)=>{
    state.cartList[id.index].productSpecsList[id.goodsIndex].cart_count++
      localStorage.setItem("cartList",JSON.stringify(state.cartList));
  },
  DELNUMBER:(state,id)=>{
    state.cartList[id.index].productSpecsList[id.goodsIndex].cart_count--
      localStorage.setItem("cartList",JSON.stringify(state.cartList));
  },
  CHANGENUMBER:(state,id)=>{
    localStorage.setItem("cartList",JSON.stringify(state.cartList));
  },
  CHANGEALLNUMBER:(state,id)=>{
     state.cartList[id.index].productSpecsList.forEach(goods=>{
      
       if(goods.ischcked==true){
        if(id.type!=1/2){
          goods.cart_count=goods.cart_count+id.type>999?999:goods.cart_count+id.type
         }else{
          if(goods.cart_count<=5){
            goods.cart_count=1
          }else{
            goods.cart_count=goods.cart_count-5
              // goods.cart_count=Math.ceil(goods.cart_count-5)
           
            
          }
         }
       }
    
  })
    localStorage.setItem("cartList",JSON.stringify(state.cartList));
  }
}

const actions = {  //异步分发mutations
  addGoods: (context, data) => {
      context.commit('ADDGOODS', data)
  },
  delGoods: (context, id) => {
      context.commit('DELGOODS', id)
  },
  delAllGoods:(context,id)=>{
    context.commit('DELALLGOODS',id)
  },
  addNumber: (context, id) => {
      context.commit('ADDNUMBER',id)
  },
  delNumber: (context, id) => {
      context.commit('DELNUMBER',id)
  },
  changeNumber:(context, id)=>{
    context.commit('CHANGENUMBER',id)
  },
  changeAllNumber:(context, id)=>{
    context.commit('CHANGEALLNUMBER',id)
  },
}
export default {
  namespaced:true,//用于在全局引用此文件里的方法时标识这一个的文件名
  state,
  getters,
  mutations,
  actions
}
