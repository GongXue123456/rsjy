<template>
  <div class="confirm-order mb50">
    <van-nav-bar class="bgcfff" title="填写订单" left-arrow @click-left="$router.push('/pages/cart')" />
    <div class="confirm-order-content p15 bgcfff">
      <van-cell class="title f12 p15 c91" :title="'现在下单， 预计'+chooseData+ '送达'" />
      <van-cell class="pl0 pr0 pt15 pb15 general_color choose-type" >
        <template slot="title">
          <van-tag v-for="(item,index) in types" :key="index"
            type="danger"
            class="mr5 p0"
            :class="{'general_color general_border':index==active}"
            @click="checkType(index)"
          >{{item}}</van-tag>
        </template>
        <div @click="showPopup" v-if="!chooseData&&active==1">选择送达时间<span class="iconfont icon-arrowright f14"></span></div>
         <div @click="showPopup" v-if="chooseData&&active==1">{{chooseData}}<span class="iconfont icon-arrowright f14"></span></div>
          <div @click="showPopup" v-if="!chooseData&&active==0">选择自提时间<span class="iconfont icon-arrowright f14"></span></div>
         <div @click="showPopup" v-if="chooseData&&active==0">{{chooseData}}<span class="iconfont icon-arrowright f14"></span></div>
      </van-cell>
      <van-cell  v-if="address.length==undefined&&active==1" class="choose-address p0 pt5" :title="address.oa_linkman+' '+address.oa_telphone" :label="address.oa_province+address.oa_city+address.oa_area+address.oa_town+address.oa_vill+address.oa_address" value="常用地址" is-link @click="toAddress()"/>
        <van-cell v-else-if="address.length==0&&active==1" class="general_color p0 pt5" title="请填写配送地址" is-link @click="toAddress()"/>
       <van-cell  v-if="selfaddress.length==undefined&&active==0" class="choose-address p0 pt5" :title="selfaddress.oa_linkman+' '+selfaddress.oa_telphone" :label="selfaddress.oa_province+selfaddress.oa_city+selfaddress.oa_area+selfaddress.oa_town+selfaddress.oa_vill+selfaddress.oa_address" is-link @click="toAddress()"/>
       <van-cell v-else-if="selfaddress.length==0&&active==0" class="general_color p0 pt5" title="请选择自提仓库" is-link @click="toAddress()"/>
    </div>
       <!-- <van-cell value="模拟订单" class="p15  general_color choose-type1" @click="payorder()"></van-cell> -->
    <!-- <div class="mt10 p15 bgcfff">
         <van-cell class="f14 p0 c91" title="支付方式" />
      <van-cell value="模拟订单" class="p0 pt15 general_color choose-type1">
        <template slot="title">
          <van-tag v-for="(item,index) in types1" :key="index"
            type="danger"
            class="mr5 p0"
            :class="{'general_color general_border':index==active1}"
            @click="checkType1(index)"
          >{{item}}</van-tag>
        </template>
      </van-cell>
    </div> -->
    <div class="mt10 p15 bgcfff">
         <van-cell class="f14 p0 c91" title="订单信息" />
         <List v-if="productSpecsList" mold="confirmorder" mold1="confirmorder1" :items="productSpecsList" :totalprice="total_price" ref="getInput"></List>

    </div>
    <van-submit-bar v-if="loading===false"
  :price="total_price*100"
  label="预估付款价格 "
  button-text="提交订单"
  @submit="onSubmit"
/>
<van-submit-bar v-else class="loading"
  :price="total_price*100"
  label="预估付款价格 "
  button-text="提交中..."
/>
<van-popup v-model="show"  position="bottom"  >
  <van-datetime-picker v-model="currentDate"  :min-hour="7" type="datetime" :min-date="minDate"  @cancel="cancel()" @confirm="confirmData" :formatter="formatter"/>
</van-popup>
  </div>
</template>
<script>
import {getOrderEnter,getOrderSave,getCartQuery,getwxPay} from '../api/index'
import {formatDate } from '../until/data'
import {local} from '@/until/data';
import { mapState, mapMutations, mapActions } from "vuex";
import List from '../components/common/myorder/list';
import wx from 'weixin-js-sdk'
export default {
  name: "confirm-order",
  components:{List},
  data() {
    return {
      active: 1,
       active1: 0,
      total_price:0,
      discount_price:0,
      types: ["自提", "送货上门"],
      types1: ["在线支付", "货到付款"],
      data1:'',
      productSpecsList:'',
      show:false,
      minHour:7,
      currentTime:7,
      maxHour: 20,
      minDate: new Date(),
      // maxDate: new Date(2019, 10, 1),
      currentDate: new Date(),
      chooseData:'',
      user:local.get('userinfo'),
      type1:2,
      type2:1,
      loading:false,
      wxJsApiParam:{}
     
    };
  },
   computed: {
    ...mapState({
      address: state => state.address.address,
      selfaddress:state=>state.address.selfaddress
    })
  },
    mounted: function () {
      
      if(this.$route.query.id==1){
        this.active=0
      }else{
         this.active= 1
      }
    },
 created() {
  //  　let url = window.location.href;
  //  　if(!url.match(/\?/)) {
  //     　location.replace(window.location.href.split('#')[0] + '?' + window.location.hash);
  //    }
   this.getData();
  this.getNowFormatDate()
   if (!this.user) {
         this.$router.push({
          name: "LoginView"
        });
     }
    
  
  },
  methods: {
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      } else if (type === 'month') {
        return `${value}月`
      }else if (type === 'day') {
        return `${value}日`
      }else if (type === 'hour') {
        return `${value}时`
      }else if (type === 'minute') {
        return `${value}分`
      }
      return value;
    },
     getData() {
      let data=JSON.parse(localStorage.getItem("orderlist"));
           getOrderEnter(data).then(response=>{
               if (response.code == 200) {
                 this.productSpecsList=response.data;
                 var total=0;
                  this.productSpecsList.orderDetailList.forEach(item => {
                   this.total_price += item.od_total_price
                 });
                 if(this.$route.query.id!='a'){
                     this.productSpecsList.customerAndAddressesList.forEach(element => {
                   if(element.oa_often==1){
                        this.$store.dispatch('address/setAddress',element);
                   }
                 });
                 }
                
                 localStorage.setItem("selfaddress",JSON.stringify(this.productSpecsList.selfMentionAndAddressesList[0]));
               }
            })
    },
    getNowFormatDate() {
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
   if(this.currentDate.getHours()>=0&&this.currentDate.getHours()<1){
    var strDate = date.getDate();
   }else{
     var strDate = date.getDate()+1;
   }
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  //  if(this.active==1){
  //       this.minDate=new Date(date.getFullYear(),date.getMonth(),strDate,7);
  //    }else{
  //       this.minDate=new Date()
  //    }
   this.minDate=new Date()
  //  if(this.currentDate.getHours()>=0&&this.currentDate.getHours()<1){
  //    if(this.active==1){
  //       this.minDate=new Date(date.getFullYear(),date.getMonth(),strDate,7);
  //    }else{
  //       this.minDate=new Date()
  //    }
  //  }else{
  //     if(this.active==1){
  //       this.minDate=new Date(date.getFullYear(),date.getMonth(),strDate,7);
  //    }else{
  //       this.minDate=new Date()
  //    }
        
  //  }
     this.chooseData=formatDate(this.minDate, 'yyyy-MM-dd hh:mm')
},
    /**
     * 选择送货方式
     */
    checkType(index) {
      this.active = index;
      this.type1=index+1;
      this.getNowFormatDate()
    },
     checkType1(index) {
      this.active1 = index;
       this.type2=index+1;
    },
     showPopup() {
      this.show = true;
    },
    confirmData(value){
      this.chooseData= formatDate(value, 'yyyy-MM-dd hh:mm');
       this.show = false;
    },
    cancel(){
       this.show = false;
    },
    onSubmit() {
     
      if(this.active==0){
        if(this.selfaddress.length==0){
           this.$toast("请选择地址");
        return false;
        }
      }else{
         if(this.address.length==0){
        this.$toast("请选择地址");
        return false;
      }
      }
       this.loading=true
         var data={
        order:[{o_obtain_way:this.type1,t_id:this.selfaddress.t_id,o_customer_id:this.user.c_id,o_total_price:this.total_price,o_discount_price:this.discount_price,o_actual_price:this.total_price,o_pay_way:this.active1,o_send_time:this.chooseData,o_estimate_time:this.chooseData}],
        orderaddress:[{oa_province:this.address.oa_province,oa_city:this.address.oa_city,oa_area:this.address.oa_area,oa_town:this.address.oa_town,oa_vill:this.address.oa_vill,oa_address:this.address.oa_address,oa_linkman:this.address.oa_linkman,oa_telphone:this.address.oa_telphone}],
        orderDetailList:this.productSpecsList.orderDetailList,
        o_user_help_code:this.user.o_user_help_code
      }
       getOrderSave(data).then(response=>{
               if (response.code == 210) {
                  local.set("pay_serial", response.data);
                   this.$router.push({
                       name: "PayMent",
                    });
          //          let data1 = {
          //            openid:local.get("openid"),
          //            o_id:'',
          //           //  c_id:this.user.c_id,
          //            pay_serial:response.data
          //       };
          //         getwxPay(data1).then(response1=>{
          //       if (response1.code == 200) {
          //          console.log(response1)
          //           wx.config({
          //            debug: true, 
          //            appId: response1.data.appid, 
          //            timestamp: response1.data.timeStamp, 
          //            nonceStr: response1.data.nonce_str, 
          //            signature: response1.data.signature, 
          //            jsApiList: ['chooseWXPay'] 
          //           });
                     
          //            wx.ready(function(){ 
          //              wx.chooseWXPay({
          //               timestamp: response1.data.timeStamp, 
          //               nonceStr:response1.data.nonce_str, 
          //               package:'prepay_id='+response1.data.prepay_id, 
          //               signType: 'MD5', 
          //               paySign: response1.data.paySign, 
          //               success: function (res) {
          //                alert('支付成功')
          //               },
          //               cancel: function (res) {
          //                alert('已取消支付');
          //               },
          //               fail: function (res) {
          //                 console.log(res)
          //                alert('购买失败，请重新创建订单')
          //               }
          //              });
          //          });
          //          wx.error(function (result) {
          //   alert(result.errMsg); 
          // });
          //       }
          //     })
                    let data1 = {
                     c_id:this.user.c_id
                };
              getCartQuery(data1).then(response=>{
                if (response.code == 200) {
                  var data=response.data;
                  this.$store.dispatch('cart/addGoods',data)
                }
              })

               }else{
                  this.loading=false
               }
            })
    },
    payorder(){
       if(this.active==0){
        if(this.selfaddress.length==0){
           this.$toast("请选择地址");
        return false;
        }
      }else{
         if(this.address.length==0){
        this.$toast("请选择地址");
        return false;
      }
      }
       var data={
        order:[{o_obtain_way:this.active,o_customer_id:this.user.c_id,o_total_price:this.total_price,o_discount_price:this.discount_price,o_actual_price:this.total_price,o_pay_way:this.active1,o_send_time:this.chooseData,o_estimate_time:this.chooseData,o_cancle_state:2}],
        orderaddress:[{oa_province:this.address.oa_province,oa_city:this.address.oa_city,oa_area:this.address.oa_area,oa_town:this.address.oa_town,oa_vill:this.address.oa_vill,oa_address:this.address.oa_address,oa_linkman:this.address.oa_linkman,oa_telphone:this.address.oa_telphone}],
        orderDetailList:this.productSpecsList.orderDetailList,
        desc:this.$refs.getInput.notedata
      }
       getOrderSave(data).then(response=>{
               if (response.code == 210) {
                  this.$toast("订单提交成功");
                   let data1 = {
                     c_id:this.user.c_id,
                };
              getCartQuery(data1).then(response=>{
                if (response.code == 200) {
                  var data=response.data;
                  this.$store.dispatch('cart/addGoods',data)
                   this.$router.push({path: '/myorder', query:{id: ''}});
                }
              })

               }else{
                  this.loading=false
               }
            })
  },
   toAddress(){
        local.set('backto','')
       this.$router.push({
        name: "AddressListView",
         query: {
         id:this.active
      }
      });

    },

    

  },
  
};
</script>

<style lang="scss" scoped>
.confirm-order {
  .van-nav-bar {
    .van-nav-bar__title {
      color: #282828;
      font-weight: Bold;
      font-size: 18px;
    }
    .van-icon {
      color: #282828;
    }
  }
  .confirm-order-content{margin-top: 60px;}
  .van-cell.title {
    background-color: rgba(119, 165, 177, 0.1);
    color: #638b93;
    padding: 7px;
    line-height: 1;
  }
  .van-cell.choose-type,.van-cell.choose-type1 {
    line-height: 35px;
    .van-tag {
      font-size: 15px;
      width: 90px;
      height: 35px;
      background-color: transparent !important;
      color: #919191;
      border: 1px solid #919191;
      text-align: center;
      line-height: 35px;
      border-radius: 17px;
    }
    .van-cell__left-icon,
    .van-cell__right-icon {
      line-height: 35px;
    }
    .van-cell__value,
    .van-cell__right-icon {
      display: contents;
      color: #45B7FF;
    }
  }
  .van-cell.choose-type1 .van-cell__value{color: #919191;font-size: 12px;}
  .van-cell.choose-address{
      .van-cell__title{font-size: 17px;}
      .van-cell__label{font-size: 14px;}
     .van-cell__value{position: absolute;
    left: 170px;
    background-color: #41C491;
    font-size: 12px;
    padding: 0px 5px;
    color: #fff;
    border-radius: 2px;}
  }
.van-submit-bar{bottom: 0px !important;}
  .van-submit-bar__text{text-align: left;padding-left: 15px;
  .van-submit-bar__price{padding-left: 10px;color: #45B7FF}}
 /deep/ .van-picker__cancel,/deep/ .van-picker__confirm{color: #45B7FF}
 /deep/ .van-overlay {
  top:0px;
}
.loading .van-button--danger{
      background-color: #bbb;
    border: 0.05rem solid #bbb;
}
}
</style>

