<template>
  <div class="order-detail">
    <div class="oeder-detail-nav">
       <van-nav-bar class="transparent" title="订单详情" left-arrow @click-left="$router.back()" />
       <div class="nav-text cfff tc pt50">
           <p  class="name  mt20" v-if="orderList.o_send_state!=3">待收货</p>
           <p  class="name  mt20" v-else-if="orderList.o_send_state==3">已收货</p>
           <p class="f14 desc mt10" v-if="orderList.o_pay_state!=1">包裹正全速到达目的地,请记得付款</p>
           <p class="f14 desc mt10" v-else-if="orderList.o_pay_state==1">包裹正全速到达目的地，请记得收货</p>
       </div>
    </div>
    <div>
         <van-cell class="cell f13 p15" v-if="orderList.o_obtain_way==1"  :title="'自提订单'+orderList.o_serial" :value="orderList.o_down_time" />
        <van-cell class="cell f13 p15" v-else-if="orderList.o_obtain_way==2"  :title="'送货上门订单'+orderList.o_serial" :value="orderList.o_down_time" />
         <van-panel v-if="orderList.o_obtain_way==1&&orderList" class="c28 address"  :title="user.c_name" :status="'请在'+orderList.o_send_time+' 23:59前到达指定地点提货'">
           <div class="c28 f14 p15 pt0">{{orderList.takeAndAddress.oa_address }}&nbsp;&nbsp;{{orderList.takeAndAddress.t_name}}</div>
        </van-panel>
         <van-panel v-else-if="orderList.o_obtain_way==2&&orderList"  class="c28 address" :title="orderList.order_address.oa_linkman" :status="'预计 '+orderList.o_send_time +' 前送达'">
           <div class="c28 f14 p15 pt0">{{orderList.order_address.oa_province }}&nbsp;&nbsp;{{orderList.order_address.oa_city}}&nbsp;&nbsp;{{orderList.order_address.oa_area}}&nbsp;&nbsp;{{orderList.order_address.oa_town}}&nbsp;&nbsp;{{orderList.order_address.oa_vill}}&nbsp;&nbsp;{{orderList.order_address.oa_address}}</div>
        </van-panel>
    </div>
    <div class="mt10 p15 bgcfff">
         <van-cell class="f14 p0 c91" title="订单信息" />
         <List mold="confirmorder" mold1="orderdetail" v-if="orderList"  :items="orderList"></List>
    </div>
    <!-- <a href="'http://cry.rsjykj.com.cn/cry/receive/searchByODId?od_id='+2080">12323</a> -->
    <!-- <div >1231313</div> -->
    <!-- <van-cell class="f12 mt10  " title="溯源信息" is-link @click.stop="go_orderdetail(orderList.o_id)"/> -->
  </div>
</template>
<script>
import {getOrderDetail} from  '../../api/index'
import List from '../../components/common/myorder/list'
import {local} from '../../until/data'
export default {
  name:'order-detail',
  components:{List},
  data(){
    return{
      o_id:'',
      orderList:'',
      user:local.get('userinfo')
    }
  },
    mounted: function () {
      this.o_id=this.$route.query.id;
         this.getData();
    },
    methods:{
      getData() {
      var _this = this;
      let data = {
        o_id:this.o_id
      };
      getOrderDetail(data).then(response => {
        if (response.code == 200) {
        _this.orderList=response.data
        } else {
          this.$toast({
            message: response.msg,
            duration: 5000
          });
        }
      });
    },
   
    }
}
</script>

<style lang="scss" scoped>
.oeder-detail{margin-bottom: 60px}
.oeder-detail-nav {
  min-height: 160px;
  /* background: url("../../assets/images/my_bg.png") no-repeat 0px 0px; */
   background: url("../../assets/images/jingdong-bg.png") no-repeat 0px 0px;
  background-size: cover;
   .van-nav-bar {
    .van-nav-bar__title {color: #fff;font-weight: Bold;font-size: 18px;}
    .van-icon {color: #fff;}
  }
  .nav-text{.name{font-size: 21px;}.desc{color: rgba(255, 255, 255, 0.6)}}
}
.van-cell.cell{color:rgba(144,144,144,0.8);
.van-cell__value{display: contents}}
.address .van-cell{font-size: 13px;
    .van-cell__value{display: contents;color: #282828}
} .van-cell__title{font-size: 17px;}

</style>

