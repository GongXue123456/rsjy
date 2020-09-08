<template>
  <div class="confirm-order bgcfff">
    <van-nav-bar class="bgcfff border-b" title="订单列表" left-arrow @click-left="confirmorder" />
    <div class="confirm-order-content pb5 bgcfff">
        <van-card v-for="(item, index) in productSpecsList.productSpecsList" :key="index"  class="tl p10   m10"
  :price="item.ps_price_sell*item.cart_count"
  :desc="'规格：'+item.ps_attr"  
  :title="item.ps_main_title"
  :thumb="item.img_thumb"
>
  <div slot="tags">
   <div class="van-card__desc"> 单价：{{item.ps_price_sell}}</div>
    <div class="van-card__desc">数量：{{item.cart_count}}</div>
  </div>
  <div slot="footer">
    <textarea v-if="id==0" rows="1" class="w service p10 f14" placeholder="备注信息" v-model="item.ps_stock"></textarea>
     <textarea v-else rows="1" class="w service p10 f14" placeholder="备注信息" v-model="item.ps_stock" disabled></textarea>
  </div>
</van-card>
    </div>
  </div>
</template>
<script>
import {getOrderEnter,getOrderDetail} from '../api/index'
import {formatDate } from '../until/data'
import {local} from '@/until/data';
import { mapState, mapMutations, mapActions } from "vuex";
import List from '../components/common/myorder/list'
export default {
  name: "confirm-order",
  components:{List},
  data() {
    return {
        id:this.$route.query.id,
      productSpecsList:'',
      user:local.get('userinfo'),
    };
  },
 created() {
   this.getData();
   if (!this.user) {
         this.$router.push({
          name: "LoginView"
        });
     }
      
  },
    mounted: function () {
      this.id=this.$route.query.id;
         this.getData();
    },
  methods: {
     getData() {
           if(this.id==0){
                  let data=JSON.parse(localStorage.getItem("orderlist"));
           getOrderEnter(data).then(response=>{
               if (response.code == 200) {
                 this.productSpecsList=response.data;
               }
            })
          
        }else{
            let data = {
        o_id:this.id
      };
      getOrderDetail(data).then(response => {
        if (response.code == 200) {
        this.productSpecsList=response.data
        } else {
          this.$toast({
            message: response.msg,
            duration: 5000
          });
        }
      });
        }
    
    },
     confirmorder() {
        if(this.id==2){
             var ids=[];
       console.log(this.productSpecsList)
       this.productSpecsList.productSpecsList.forEach(item => {
            ids.push({ps_id:item.ps_id,cart_count:item.cart_count,od_desc:item.ps_stock});
            let data1 = {list: ids, c_id: this.user.c_id };
            localStorage.setItem("orderlist",JSON.stringify(data1));
            this.$router.push({
              name: "ConfirmOrderView",
            });

      });
           
        }else{
             this.$router.back()
        }
    
    }

  },
  
};
</script>

<style lang="scss" scoped>
html,body{background-color: #fff !important;}
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
  .confirm-order-content{padding-top: 47px;}
/deep/ .van-card {
    border-radius: 6px;
    background-color: #F5F5F5;
    .van-card__thumb{
            width: 83px;
    height:83px;
    }
  .van-card__title {
    font-size: 15px;
        max-height: 40px;
    font-weight:bold;
    margin-bottom:5px;
    color: #3C3C3C;
  }
  .van-card__desc{
      font-size:13px;
      color: #A6A6A6;
  }
  .van-card__price{
      color: #A6A6A6;
  }
  .van-card__bottom{    position: absolute;
    right: 0px;
    top: 3px;
    .van-card__price{font-size: 16px;color: #282828}}
    .service {
  background-color: #fff;
  color: #a6a6a6;
  line-height: 1.6;
  border-radius:4px;
}
  .van-tag {
    padding: 3px 8px;
     color: #A6A6A6 !important;
  }
  .addCar {
    width: 26px;
    height: 26px;
    line-height: 26px;
    border-radius: 50%;
    padding: 0px;
    color: #fff !important;
  }
  .van-image img{
        border-radius: 11px;
  }
}
}
</style>

