import instance from "../until/axios"
import { join } from "path";
import Vue from 'vue';
import { Toast } from 'vant';

Vue.use(Toast);

//请求自己写的json数据
export function getHomeSwiper() {
  return new Promise((resolve,reject)=>{
      instance({
          url:"/web/navigation/roll",
          method:'get'
      }).then(response=>{
          resolve(response.data)
      }).catch(err=>{
          reject(err)
      })
  })
}
export function getHomeHot() {
  return new Promise((resolve,reject)=>{
      instance({
          url:"/web/productspec/hot",
          method:'get'
      }).then(response=>{
          resolve(response.data)
      }).catch(err=>{
          reject(err)
      })
  })
}
// brand/large 非常大牌
export function getHomeLarge() {
  return new Promise((resolve,reject)=>{
      instance({
          url:"/web/brand/large",
          method:'get'
      }).then(response=>{
          resolve(response.data)
      }).catch(err=>{
          reject(err)
      })
  })
}
//热门店铺
export function getHotCompany(data) {
    return new Promise((resolve,reject)=>{
        instance({
            url:"/web/company/search?pager_offset="+data.pager_offset,
            method:'get'
        }).then(response=>{
            resolve(response.data)
        }).catch(err=>{
            reject(err)
        })
    })
  }
//猜你喜欢
export function getHomeExpect(data) {
  return new Promise((resolve,reject)=>{
      instance({
          url:"/web/productspec/expect?c_id="+data.c_id+"&pager_offset="+data.pager_offset,
          method:'get',
      }).then(response=>{
          resolve(response.data)
      }).catch(err=>{
          reject(err)
      })
  })
}
//推荐商品
export function getHomeRecommend(data) {
  return new Promise((resolve,reject)=>{
      instance({
          url:"/web/productspec/recommend?pager_offset="+data.pager_offset+"&c_id="+data.c_id,
          method:'get',
      }).then(response=>{
          resolve(response.data)
      }).catch(err=>{
          reject(err)
      })
  })
}
//分类
export function getCategoryAll() {
  return new Promise((resolve,reject)=>{
      instance({
          url:"/web/category/all",
          method:'get',
      }).then(response=>{
          resolve(response.data)
      }).catch(err=>{
          reject(err)
      })
  })
}
//分类二级
export function getCategorySecond(data) {
  return new Promise((resolve,reject)=>{
      instance({
          url:"/web/category/second?c_id="+data.c_id,
          method:'get',
      }).then(response=>{
          resolve(response.data)
      }).catch(err=>{
          reject(err)
      })
  })
}
export function getCategorySearch(data) {
    return new Promise((resolve,reject)=>{
        instance({
            url:"/web/category/search?c_id="+data.c_id+"&p_id="+data.p_id+"&sort="+data.sort+"&price="+data.price+"&sell="+data.sell+"&pager_offset="+data.pager_offset+"&ak_id="+data.ak_id+"&av_id="+data.av_id,
            method:'get',
        }).then(response=>{
            resolve(response.data)
        }).catch(err=>{
            reject(err)
        })
    })
  }
  //商品详情
  export function getDetail(data) {
    return new Promise((resolve,reject)=>{
        instance({
            url:"/web/productspec/detail?p_id="+data.p_id+"&c_id="+data.c_id,
            method:'get',
        }).then(response=>{
            resolve(response.data)
        }).catch(err=>{
            reject(err)
        })
    })
  }
  //商品详情添加收藏
  export function getCollectPsAdd(data) {
    return new Promise((resolve,reject)=>{
        instance({
            url:"/api/collect/ps/add",
            method:'POST',
            data:data
        }).then(response=>{
            resolve(response.data)
        }).catch(err=>{
            reject(err)
        })
    })
  }
  //商品详情取消收藏
  export function getCollectPsDelete(data) {
    return new Promise((resolve,reject)=>{
        instance({
            url:"/api/collect/ps/delete",
            method:'DELETE',
            data:data
        }).then(response=>{
            resolve(response.data)
        }).catch(err=>{
            reject(err)
        })
    })
  }
  //加入购物车
  export function getCartAdd(data) {
    return new Promise((resolve,reject)=>{
        // instance.post('/api/cart/add',{"List":[9,5],"c_id":1}).then(res => {
        //     console.log(res)
        // })
        instance({
            url:"/api/cart/add",
            method:"post",
            data:data
        }).then(response=>{
            resolve(response.data)
        }).catch(err=>{
            reject(err)
        })
    })
  }
  //购物车列表
  export function getCartQuery(data) {
    return new Promise((resolve,reject)=>{
        instance({
            url:"/api/cart/query?c_id="+data.c_id,
            method:"GET",
        }).then(response=>{
            resolve(response.data)
        }).catch(err=>{
            reject(err)
        })
    })
  }
  //修改购物车商品数量
  export function getCartSet(data) {
    return new Promise((resolve,reject)=>{
        instance({
            url:"/api/cart/set",
            method:"POST",
            data:data
        }).then(response=>{
            resolve(response.data)
        }).catch(err=>{
            reject(err)
        })
    })
  }
  //购物车删除
  export function getCartDelete(data) {
    return new Promise((resolve,reject)=>{
        instance({
            url:"/api/cart/delete",
            method:"DELETE",
            data:data
        }).then(response=>{
            resolve(response.data)
        }).catch(err=>{
            reject(err)
        })
    })
  }
  //我的订单
  export function getOrderList(data) {
    return new Promise((resolve,reject)=>{
        instance({
            url:"/api/order/list?o_customer_id="+data.o_customer_id+"&pager_offset="+data.pager_offset+"&o_pay_state="+data.o_pay_state,
            method:"GET",
        }).then(response=>{
            resolve(response.data)
        }).catch(err=>{
            reject(err)
        })
    })
  }
  //我的订单确认收货
  export function getOrderReceipt(data) {
    return new Promise((resolve,reject)=>{
        instance({
            url:"/api/order/receipt",
            method:"POST",
            data:data
        }).then(response=>{
            resolve(response.data)
        }).catch(err=>{
            reject(err)
        })
    })
  }
  //订单详情
  export function getOrderDetail(data) {
    return new Promise((resolve,reject)=>{
        instance({
            url:"/api/order/detail?o_id="+data.o_id,
            method:"GET"
        }).then(response=>{
            resolve(response.data)
        }).catch(err=>{
            reject(err)
        })
    })
  }
  //确认订单
  export function getOrderEnter(data) {
    return new Promise((resolve,reject)=>{
        instance({
            url:"/api/order/enter",
            method:"POST",
            data:data
        }).then(response=>{
            resolve(response.data)
        }).catch(err=>{
            reject(err)
        })
    })
  }
  
  //订单结算
  export function getOrderSave(data) {
    return new Promise((resolve,reject)=>{
        instance({
            url:"/api/order/save",
            method:"POST",
            data:data
        }).then(response=>{
            resolve(response.data)
        }).catch(err=>{
            reject(err)
            Toast("网络错误,请检查网络是否正确")
        })
    })
  }
  //订单支付
  export function getwxPay(data) {
    return new Promise((resolve,reject)=>{
        instance({
            url:"/web/wxpay/pay",
            method:"POST",
            data:data
        }).then(response=>{
            resolve(response.data)
        }).catch(err=>{
            reject(err)
            Toast("网络错误,请检查网络是否正确")
        })
    })
  }
  //订单支付成功后更改状态
  export function getwxPaySuccess(data) {
    return new Promise((resolve,reject)=>{
        instance({
            url:"/web/wxpay/success",
            method:"PUT",
            data:data
        }).then(response=>{
            resolve(response.data)
        }).catch(err=>{
            reject(err)
            Toast("网络错误,请检查网络是否正确")
        })
    })
  }
  //地址列表
  export function getCustomerAddress(data) {
    return new Promise((resolve,reject)=>{
        instance({
            url:"/api/customer/address?c_id="+data.c_id,
            method:"GET",
        }).then(response=>{
            resolve(response.data)
        }).catch(err=>{
            reject(err)
        })
    })
  }
//常购清单
export function getProductspecOften(data) {
    return new Promise((resolve,reject)=>{
        instance({
            url:"/api/collect/often?c_id="+data.c_id+"&o_customer_id="+data.o_customer_id+"&pager_offset="+data.pager_offset+"&ps_main_title="+data.ps_main_title,
            method:"GET",
        }).then(response=>{
            resolve(response.data)
        }).catch(err=>{
            reject(err)
        })
    })
  }
  //常购清单类目
export function getCategoryOften(data) {
    return new Promise((resolve,reject)=>{
        instance({
            url:"/web/category/often?c_id="+data.c_id,
            method:"GET",
        }).then(response=>{
            resolve(response.data)
        }).catch(err=>{
            reject(err)
        })
    })
  }
  //收藏菜品类目
  export function getCategoryCollect(data) {
    return new Promise((resolve,reject)=>{
        instance({
            url:"/web/category/collect?c_id="+data.c_id,
            method:"GET",
        }).then(response=>{
            resolve(response.data)
        }).catch(err=>{
            reject(err)
        })
    })
  }
  //收藏菜品
  export function getSearchCollectPs(data) {
    return new Promise((resolve,reject)=>{
        instance({
            url:"/web/search/collect/ps?c_id="+data.c_id+"&category_id="+data.category_id+"&pager_offset="+data.pager_offset+"&ps_main_title="+data.ps_main_title,
            method:"GET",
        }).then(response=>{
            resolve(response.data)
        }).catch(err=>{
            reject(err)
        })
    })
  }
  //收藏菜谱
  export function getSearchCollectCombo(data) {
    return new Promise((resolve,reject)=>{
        instance({
            url:"/web/search/collect/combo?c_id="+data.c_id+"&ps_main_title="+data.ps_main_title+"&pager_offset="+data.pager_offset+"&bill_id="+data.bill_id,
            method:"GET",
        }).then(response=>{
            resolve(response.data)
        }).catch(err=>{
            reject(err)
        })
    })
  }
    //获得菜单
    export function getBillall(data) {
      return new Promise((resolve,reject)=>{
          instance({
              url:"/web/bill/all",
              method:"GET"
          }).then(response=>{
              resolve(response.data)
          }).catch(err=>{
              reject(err)
          })
      })
    }

      //获得全部的菜属性
      export function getBillallAttr(data) {
        return new Promise((resolve,reject)=>{
            instance({
                url:"/web/attrValue/all",
                method:"GET",
                params: data
            }).then(response=>{
                resolve(response.data)
            }).catch(err=>{
                reject(err)
            })
        })
      }

      //获得全部的菜得SPU/web/combo/listByBill
      export function getlistByBill(data) {
        return new Promise((resolve,reject)=>{
            instance({
                url:"/web/search/bill",
                method:"GET",
                params: data
            }).then(response=>{
                resolve(response.data)
            }).catch(err=>{
                reject(err)
            })
        })
      }
      //获得全部的菜得SKU
      export function getlistByBillSKU(data) {
        return new Promise((resolve,reject)=>{
            instance({
                url:"/web/combo/withSpecList",
                method:"GET",
                params: data
            }).then(response=>{
                resolve(response.data)
            }).catch(err=>{
                reject(err)
            })
        })
      }

        //加入购物车
    export function getCartAddweb(data) {
      return new Promise((resolve,reject)=>{
          instance({
              url:"/api/cart/add",
              method:"post",
              data:data
          }).then(response=>{
              resolve(response.data)
          }).catch(err=>{
              reject(err)
          })
      })
    }

    //获得菜品详情
    export function getDishesDetail(data) {
      return new Promise((resolve,reject)=>{
          instance({
              url:"/web/combo/singleWithCollect",
              method:"GET",
              params: data
          }).then(response=>{
              resolve(response.data)
          }).catch(err=>{
              reject(err)
          })
      })
    }
    // 收藏/api/collect/collect
    export function oncollect(data) {
      return new Promise((resolve,reject)=>{
          instance({
              url:"api/collect/add",
              method:"post",
              data:data
          }).then(response=>{
              resolve(response.data)
          }).catch(err=>{
              reject(err)
          })
      })
    }
    // 取消收藏
    // export function cancelCollect(data) {
    //   return new Promise((resolve,reject)=>{
    //       instance({
    //           url:"/api/collect/delete",
    //           method:"get",
    //           data:data
    //       }).then(response=>{
    //           resolve(response.data)
    //       }).catch(err=>{
    //           reject(err)
    //       })
    //   })
    // }
     // 菜品取消收藏
    // export function cancelCollectPsDelete(data) {
    //     return new Promise((resolve,reject)=>{
    //         instance({
    //             url:"/api/collect/ps/delete",
    //             method:"DELETE",
    //             data:data
    //         }).then(response=>{
    //             resolve(response.data)
    //         }).catch(err=>{
    //             reject(err)
    //         })
    //     })
    //   }
//菜谱取消收藏
export function cancelCollectDelete(data) {
    return new Promise((resolve,reject)=>{
        instance({
            url:"/api/collect/delete",
            method:"DELETE",
            data:data
        }).then(response=>{
            resolve(response.data)
        }).catch(err=>{
            reject(err)
        })
    })
  }
    // 登陆
    export function login(data) {
      return new Promise((resolve,reject)=>{
          instance({
              url:"/web/login/login",
              method:"post",
              data:data
          }).then(response=>{
              resolve(response.data)
          }).catch(err=>{
              reject(err)
              Toast("网络错误,请检查网络是否正确")
          })
      })
    }
//短信登录
export function loginGenerateMessCode(data) {
    return new Promise((resolve,reject)=>{
        instance({
            url:"/web/login/generateMessCode",
            method:"post",
            data:data
        }).then(response=>{
            resolve(response.data)
        }).catch(err=>{
            reject(err)
            Toast("网络错误,请检查网络是否正确")
        })
    })
  }
  //代登录
  export function searchCustomer(data) {
    return new Promise((resolve,reject)=>{
        instance({
            url:"/web/search/customer?c_loginname="+data.c_loginname,
            method:"get"
        }).then(response=>{
            resolve(response.data)
        }).catch(err=>{
            reject(err)
            Toast("网络错误,请检查网络是否正确")
        })
    })
  }
  export function helpLogin(data) {
    return new Promise((resolve,reject)=>{
        instance({
            url:"/web/login/help/login",
            method:"post",
            data:data
        }).then(response=>{
            resolve(response.data)
        }).catch(err=>{
            reject(err)
            Toast("网络错误,请检查网络是否正确")
        })
    })
  }
  //注销登录
  export function loginOut(data) {
    return new Promise((resolve,reject)=>{
        instance({
            url:"/web/login/loginOut",
            method:"post",
            data:data
        }).then(response=>{
            resolve(response.data)
        }).catch(err=>{
            reject(err)
            Toast("网络错误,请检查网络是否正确")
        })
    })
  }
  //获取OPENIDhttps://open.weixin.qq.com/connect/oauth2/authorize?appid=wx64f2dbdf80eca2c0&redirect_uri=' + encodeURIComponent(data.local) + '&response_type=code&scope=snsapi_base&state=123#wechat_redirect
  export function getOpenId(data) {
    return new Promise((resolve,reject)=>{
        instance({
            url:'/web/wxlogin/login',
            method:"get"
        }).then(response=>{
            resolve(response.data)
        }).catch(err=>{
            reject(err)
            Toast("网络错误,请检查网络是否正确")
        })
    })
  }
    // 搜索
    export function serProductspec(data) {
      return new Promise((resolve,reject)=>{
          instance({
              url:"/web/search/productspec",
              method:"GET",
              params: data
          }).then(response=>{
              resolve(response.data)
          }).catch(err=>{
              reject(err)
          })
      })
    }
    //搜索历史
    export function serhistory(data) {
        return new Promise((resolve,reject)=>{
            instance({
                url:"/web/search/history",
                method:"GET",
                params: data
            }).then(response=>{
                resolve(response.data)
            }).catch(err=>{
                reject(err)
            })
        })
      }
//推荐菜谱
// export function getComboList(data) {
//     return new Promise((resolve,reject)=>{
//         instance({
//             url:"/web/combo/list?pager_offset="+data.pager_offset,
//             method:"GET"
//         }).then(response=>{
//             resolve(response.data)
//         }).catch(err=>{
//             reject(err)
//         })
//     })
//   }
//推荐菜品
// export function getComboPsList(data) {
//     return new Promise((resolve,reject)=>{
//         instance({
//             url:"/web/combo/ps/list?pager_offset="+data.pager_offset,
//             method:"GET"
//         }).then(response=>{
//             resolve(response.data)
//         }).catch(err=>{
//             reject(err)
//         })
//     })
//   }
//编辑地址获取地址信息
export function getAddressAddress(data) {
    return new Promise((resolve,reject)=>{
        instance({
            url:"/api/address/address?ca_id="+data.ca_id+"&c_id="+data.c_id,
            method:"GET"
        }).then(response=>{
            resolve(response.data)
        }).catch(err=>{
            reject(err)
        })
    })
  }
//更新地址
export function getAddresseditAddress(data) {
    return new Promise((resolve,reject)=>{
        instance({
            url:"/api/address/editAddress",
            method:"POST",
            data:data
        }).then(response=>{
            resolve(response.data)
        }).catch(err=>{
            reject(err)
        })
    })
  }
//新增地址api/address/save
export function getAddressSave(data) {
    return new Promise((resolve,reject)=>{
        instance({
            url:"/api/address/save",
            method:"POST",
            data:data
        }).then(response=>{
            resolve(response.data)
        }).catch(err=>{
            reject(err)
        })
    })
  }
  //获取地址五级地址
export function getFiveAddress() {
    return new Promise((resolve,reject)=>{
        instance({
            url:"/api/region/findList",
            method:"GET"
        }).then(response=>{
            resolve(response.data)
        }).catch(err=>{
            reject(err)
        })
    })
  }
  //删除收货地址
  export function getAddressDelete(data) {
    return new Promise((resolve,reject)=>{
        instance({
            url:"/api/address/delete",
            method:"Delete",
            data:data
        }).then(response=>{
            resolve(response.data)
        }).catch(err=>{
            reject(err)
        })
    })
  }