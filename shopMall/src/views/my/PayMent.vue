<template>
  <div class="account">
  <van-nav-bar class="bgcfff border-b" title="支付" left-arrow @click-left="$router.back()" />
     <div class="my-list mt60  bgcfff">
      <van-cell class="c28  f15  p15 pb0" title="总价" :value="'¥ '+price"/>
      <van-cell class="c28 f15  p15" title="优惠金额" :value="'- ¥ 0.00'" />
      <div  class="aa"></div>
      <van-cell class="c28 f15 van-cell1 p15" title="实际付款" :value="'¥ '+price" />
    </div>
    <van-radio-group class="mt15" v-model="radio">
  <van-cell-group>
    <van-cell  clickable @click="radioCheck">
        <van-radio name="1" class="c28 f15 " >
             <img class="img-icon vm" width="40" :src="activeIcon" />
             微信支付
             <template #right-icon>
              <van-radio name="1" />
             </template>
        </van-radio>
    </van-cell>
    
  </van-cell-group>
</van-radio-group>
<div class="save_btn">
   <van-button class="w" type="danger" size="normal" @click="submit()">确认支付</van-button>
 </div>
  </div>
</template>
<script>
import {getwxPay,getwxPaySuccess} from '../../api/index'
import {local} from '@/until/data';
import wx from 'weixin-js-sdk'
export default {
  name:'account',
  data(){
    return{
      radio:'1',
      price:'',
      user:local.get('userinfo'),
      activeIcon: require('../../assets/images/weixinpay.png'),
      wxJsApiParam:{},
      pay_serial:local.get("pay_serial"),
       openid:local.get("openid"),
      params:'',
    };
  },
     created() {
     　let url = window.location.href;
   　if(!url.match(/\?/)) {
      　location.replace(window.location.href.split('#')[0] + '?' + window.location.hash);
     }
   this.getData();
   if (!this.user) {
         this.$router.push({
          name: "LoginView"
        });
     }
    
  
  },
  methods:{
    getData(){
      let data2={
          openid:this.openid,
          o_id:'',
          pay_serial:this.pay_serial
      }
        getwxPay(data2).then(response=>{
          if (response.code == 200) {
            this.price=response.data.total_fee;
            this.params=response.data;
          }
        })  
    },
    radioCheck(){
      console.log(this.radio)
    },
    toSuccess(){
      var that=this;
      let params1={
         pay_serial:local.get("pay_serial")
      }
        getwxPaySuccess({pay_serial:params1.pay_serial}).then(response=>{
                             if (response.code == 200) {
                                  that.$router.push({path: '/myorder', query:{id: ''}});
                               
                             }
                           })  
    },
    submit(){
      var that=this;
                 let data1 = {
                      appId: that.params.appid,
                      timestamp: that.params.timeStamp, 
                     nonceStr: that.params.nonce_str, 
                     signature:that.params.signature, 
                     package:'prepay_id='+that.params.prepay_id, 
                      paySign:that.params.paySign, 
                      pay_serial:local.get("pay_serial")
                };
                    wx.config({
                     debug: false, 
                     appId:data1.appId, 
                     timestamp: data1.timestamp, 
                     nonceStr: data1.nonceStr, 
                     signature:data1.signature, 
                     jsApiList: ['chooseWXPay'] 
                    }); 
                     wx.ready(function(){ 
                       wx.chooseWXPay({
                        timestamp:data1.timestamp, 
                        nonceStr:data1.nonceStr, 
                        package:data1.package, 
                        signType: 'MD5', 
                        paySign: data1.paySign, 
                        success: function (res) {
                          if(res.errMsg === 'chooseWXPay:ok'){
                            that.toSuccess()
                          }
                        },
                        complate:function(res){
                          if (res.errMsg === 'chooseWXPay:ok'){
                           that.toSuccess()
                          }else if(res.errMsg==='chooseWXPay:cancel'){
                             that.$dialog.alert({message: '已取消支付',}).then(() => {});
                          }
                        },
                        cancel: function () {
                             that.$dialog.alert({message: '已取消支付',}).then(() => {});
                        },
                        fail: function () {
                             that.$dialog.alert({message: '购买失败，请重新创建订单',}).then(() => {});
                        }
                       });
                   });
    }
  }
}
</script>
<style lang="scss" scoped>
.van-cell__value{color: #3C3C3C;}
.aa{border-top:0.05rem solid  rgba(0, 0, 0, 0.1);width: 95%;margin: auto;}
.van-cell1{.van-cell__value{color: #FF731E;font-size: 18px;}}
 .van-nav-bar {
    .van-nav-bar__title {color: #282828;font-weight: Bold;font-size: 18px;}
    .van-icon {color: #282828;}}
  /deep/ .van-radio{
    .van-radio__label{
      margin-left: 0px;
      .img-icon{vertical-align: middle;}
    }
    .van-radio__icon--checked .van-icon{background-color: #45B7FF;
    border-color: #45B7FF;}
    .van-radio__icon{position: absolute;right: 0px;height: 1.25rem;line-height: 1.25rem;.van-icon{width: 25px;height: 25px;}}
  } 
  .save_btn{padding: 30px 15px;.van-button--normal{font-size: 15px;}}
  .van-hairline--top-bottom::after{ border-width:0;}
</style>

