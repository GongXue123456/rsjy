<template>
  <div class="my-order">
   
    <div class="my-order-nav w">
       <van-nav-bar class="pr" title="全部订单" left-arrow @click-left="$router.push('/pages/my')" />
       <van-tabs @click="onClick" class="transparent pr" v-model="active">
        <van-tab  v-for="(item,index) in title" :title="item.c_name" :name="item.c_id" :key="index">
          <!-- <span v-if="o_pay_state=1" class="pay_num pa general_bgc cfff f12">12</span> -->
        </van-tab>
      </van-tabs>
    </div>
    <div class="pt100">
         
       <div v-if="orderList.length">
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad"  >
                 <div  class="bgcfff m15 mt10 borr10" v-for="(item1,index) in orderList" :key="index">
                  <van-cell v-if="item1.o_send_state!=3" class="borr10 pb0"  :title="'订单编号 '+item1.o_serial"  value="待收货"/>
              <van-cell v-else-if="item1.o_send_state==3" class="borr10 pb0"  :title="'订单编号 '+item1.o_serial"  value="已收货" />
               <!-- <van-cell v-if="item1.o_send_state!=3&&msgFormSon.receipt1==true" class="borr10 pb0"  :title="'订单编号 '+item1.o_serial"  value="已收货" /> -->
              <!-- <van-cell v-if="orderstate==0&&item1.o_pay_state==1" class="borr10 pb0"  :title="'订单编号 '+item1.o_serial"  value="待付款"/>
              <van-cell v-else-if="orderstate==0&&item1.o_send_state==1" class="borr10 pb0"  :title="'订单编号 '+item1.o_serial"  value="待发货"/>
              <van-cell v-else-if="orderstate==0&&item1.o_send_state==2" class="borr10 pb0"  :title="'订单编号 '+item1.o_serial"  value="配送中"/>
              <van-cell v-else-if="orderstate==0&&item1.o_send_state==3" class="borr10 pb0"  :title="'订单编号 '+item1.o_serial"  value="已完成"/>
              <van-cell v-if="orderstate==3&&item1.o_send_state==1" class="borr10 pb0"  :title="'订单编号 '+item1.o_serial"  value="待发货"/>
              <van-cell v-if="orderstate==3&&item1.o_send_state==2" class="borr10 pb0"  :title="'订单编号 '+item1.o_serial"  value="配送中"/>
              <van-cell v-if="orderstate==3&&item1.o_send_state==3" class="borr10 pb0"  :title="'订单编号 '+item1.o_serial"  value="已完成"/>
              <van-cell v-if="orderstate==1" class="borr10 pb0" :title="'订单编号 '+item1.o_serial" value="待接单" />
              <van-cell v-if="orderstate==2&&item1.o_send_state==1" class="borr10 pb0" :title="'订单编号 '+item1.o_serial" value="待发货" />
              <van-cell v-if="orderstate==2&&item1.o_send_state==2" class="borr10 pb0" :title="'订单编号 '+item1.o_serial" value="配送中" />
              <van-cell v-if="orderstate==2&&item1.o_send_state==3" class="borr10 pb0" :title="'订单编号 '+item1.o_serial" value="已完成" />
              <van-cell v-if="orderstate==4" class="borr10 pb0" :title="'订单编号 '+item1.o_serial" value="已完成" /> -->
               <List mold="myorder" v-if="item1" :items="item1" class="p10 pt0" @func="getMsgFormSon"></List>
            </div>
             </van-list>
          </div>
          <div v-else-if="!orderList.length&&finished==true">
      <div v-if="o_pay_state==2" class="tc pt100 pb100">
        <div class="wrap_cart">
         <img src="../../assets/images/fahuo_null.png">
        </div>
        <p class="text_empty f14 pb10 c9D">暂无已付款订单</p>
        <!-- <div class="general_bgc f15 cfff go_index mt20">去逛逛</div> -->
      </div>
       <div v-else-if="o_pay_state==1" class="tc pt100 pb100">
        <div class="wrap_cart">
         <img src="../../assets/images/pay_null.png">
        </div>
        <p class="text_empty f14 pb10 c9D">暂无待付款订单</p>
        <!-- <div class="general_bgc f15 cfff go_index mt20">去逛逛</div> -->
      </div>
       <div v-else-if="o_pay_state==''" class="tc pt100 pb100">
        <div class="wrap_cart">
         <img src="../../assets/images/all_null.png">
        </div>
        <p class="text_empty f14 pb10 c9D">暂无订单</p>
        <p class="buy_text f14 c9D">赶快去下单购物吧</p>
        <div class="general_bgc f15 cfff go_index mt20"  @click.stop="$router.push('/pages/classify')">去下单</div>
      </div>
    </div>
          
    </div>

  </div>
</template>
<script>
import { getOrderList } from "../../api/index";
import List from "../../components/common/myorder/list";
import {local,pushHistory} from '@/until/data'
export default {
  name: "my-order",
  components: { List },
  data() {
    return {
      orderList:[],
      title: [
        { c_id: 0, c_name: "待付款" },
        { c_id: 1, c_name: "已付款" },
        { c_id: 2, c_name: "全部订单" },
        // { c_id: 3, c_name: "待付款" },
        // { c_id: 4, c_name: "已完成" }
      ],
      active:Number(this.$route.query.id),
       pageNumber: 0,
      loading: false,
      finished: false,
      o_pay_state:Number(this.$route.query.id)>1?"":Number(this.$route.query.id)+1,
      // o_receive_state:'',
      // o_send_state:'',
      show:false,
      msgFormSon:'',
      user:local.get('userinfo')
    };
  },
  created(){
    if (!this.user) {
         this.$router.push({
          name: "LoginView"
        });
     }
  },

mounted(){
  if (window.history && window.history.pushState) {
    history.pushState(null, null, document.URL);
    window.addEventListener('popstate', this.goBack, false);
  }
  this.onLoad()
},
destroyed() {
			window.removeEventListener('popstate', this.goBack, false);
			sessionStorage.setItem('isSign','1')
		},
  methods: {
    goBack() {
      history.pushState(null, null, document.URL);
    },
    getData() {
      let data = {
        o_customer_id:this.user.c_id,
        pager_offset: this.pageNumber,
        o_pay_state: this.o_pay_state,
      };
      getOrderList(data).then(response => {
        if (response.code == 200) {
            this.orderList = this.orderList.concat(response.data);
            this.loading = false;
              if (response.data.length < 10) {
                this.finished = true;
              }
            this.pageNumber = this.pageNumber + 10;
        } else {
          this.$toast({
            message: response.msg,
            duration: 5000
          });
        }
      });
    },
     onLoad(){
             setTimeout(() => {
                   this.getData()
            }, 500);
          },
    getData1(){
       if (this.active == 0) {
         this.o_pay_state=1;
      } else if (this.active == 1) {
          this.o_pay_state=2;
      } else if (this.active == 2) {
         this.o_pay_state='';
      }
    },
    initialization(){
            this.orderList = [];
            this.pageNumber = 0;
            this.loading = true;
            this.finished = false;
            if(this.loading){
                this.onLoad();
            }
        },
    onClick(name, title) {
      this.active = name;
       this.initialization()
     this.getData1()
    //  this.$refs.getSrcList(name); 
     console.log(this.active)
      this.$router.replace({
        path: "/myorder",
        query: { id: this.active }
      });
    },
    getMsgFormSon(data){
        this.initialization()
      this.getData1()
     }
  }
};
</script>

<style lang="scss" scoped>
.my-order {
  .my-order-nav{position: fixed;left: 0px;top: 0px;z-index: 100;background-color: #f5f5f5}
  /deep/ .van-nav-bar {
    background-color: #f5f5f5;z-index: 100 !important;
    .van-nav-bar__title {color: #282828;font-weight: Bold;font-size: 18px;}
    .van-icon {color: #282828;}
  }
  /deep/ .van-tabs__nav{background-color: transparent;.van-tabs__line{background-color: #45B7FF;}.van-tab--active{color: #45B7FF;}}
  /deep/ .van-tabs__wrap--scrollable .van-tab{flex-basis: 20% !important; }
  /deep/ .van-cell__value,.van-cell__right-icon { display: contents;color: #45B7FF}
  .empty_cart {font-size: 55px;color: #ececec;}
.wrap_cart { display: inline-block;padding: 10px;border-radius: 50%;}
.buy_text {color: #b5b4b4;}
.genge{color: rgba($color: #000000, $alpha: 0.12)}
.pay_num{left:20%;top:5px;padding: 3px 10px;border-radius: 10px}
.wrap_cart img{width: 125px}
.go_index{display: inline-block;padding: 10px 20px;border-radius:4px;}
}
</style>

