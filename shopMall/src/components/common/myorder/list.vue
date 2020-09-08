<template>
  <div v-if="mold === 'myorder'" class="list" @click.stop="go_orderdetail(items.o_id)">
    <div class="shop-list mt10 pb10 border-b">
      <div>
        <img
          v-for="(image, index) in items.productSpecsList.slice(0,4)"
          :key="index"
          class="mr10"
          :src="image.img_thumb"
        />
      </div>
      <div class="f12 c91">
        共{{items.productSpecsList.length}}种
        <span class="iconfont icon-arrowright f13"></span>
      </div>
    </div>
    <div class="c28 f13 tr lh200 pt10">
      <p>
        合计:
        <span class="general_color">￥{{items.o_total_price?items.o_total_price.toFixed(2):0.00}}</span>
      </p>
      <van-cell value class="p0 pt15 general_color choose-type1">
        <template slot="title">
          <!-- <van-tag v-if="items.o_pay_state==1" class="general_color general_border">付款</van-tag> -->
          <van-tag
            v-if="items.o_send_state!=3"
            class="general_color general_border"
            v-bind:class="{on:items.o_id==guigeSpan}"
            @click.stop="receipt(items.o_id)"
          >确认收货</van-tag>
          <!-- <van-tag v-if="items.o_pay_state==2&&items.o_send_state!=3" class="general_color general_border">确认收货</van-tag> -->
          <!-- <van-tag v-if="items1==1" class="general_color general_border">取消订单</van-tag> -->
          <van-tag type="danger" @click.stop="addCar(items.productSpecsList)">再次购买</van-tag>
        </template>
      </van-cell>
    </div>
  </div>
   <div v-else-if="mold === 'confirmorder'" class="list">
    <div v-if="mold1 === 'orderdetail'" class="shop-list mt10 pb10 border-b" @click.stop="$router.push('/orderlist?id='+items.o_id)">
      <div>
        <img
          v-for="(image, index) in items.productSpecsList.slice(0,4)"
          :key="index"
          class="mr10"
          :src="image.img_thumb"
        />
      </div>
      <div class="f12 c91">
        共{{items.productSpecsList.length}}种
        <span class="iconfont icon-arrowright f13"></span>
      </div>
    </div>
    <div v-else-if="mold1 === 'confirmorder1'" class="shop-list mt10 pb10 border-b" @click.stop="$router.push('/orderlist?id=0')">
      <div>
        <img
          v-for="(image, index) in items.productSpecsList.slice(0,4)"
          :key="index"
          class="mr10"
          :src="image.img_thumb"
        />
      </div>
      <div class="f12 c91">
        共{{items.productSpecsList.length}}种
        <span class="iconfont icon-arrowright f13"></span>
      </div>
    </div>
    <div class="c28 f13 tr lh200 pt10">
      <p v-if="mold1 === 'confirmorder1'">
        预估商品总价：
        <span class="general_color">￥{{totalprice.toFixed(2)}}</span>
      </p>
      <p v-if="mold1 === 'orderdetail'">
        预估商品总价：
        <span class="general_color">￥{{items.o_total_price.toFixed(2)}}</span>
      </p>
      <!-- <p>
        运费：
        <span class="general_color">￥0.00</span>
      </p>
      <p>
        服务费：
        <span class="general_color">￥0.00</span>
      </p> -->
    </div>
    <!-- <div v-if="mold1 === 'orderdetail'&&items.orderDetailList[0].od_desc!=null" class="w service p15 f14 mt10">备注信息：{{items.orderDetailList[0].od_desc}}</div> -->
    <!-- <textarea v-else-if="mold1 === 'confirmorder1'" class="w service p15 f14 mt10" placeholder="服务备注" v-model="notedata" ref="notedata"></textarea> -->
  </div>
</template>
<script>
import { getCartAdd, getCartQuery, getOrderReceipt } from "../../../api/index";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import { local } from "@/until/data";
export default {
  name: "list",
  data() {
    return {
      notedata: "",
      receipt1: true,
      guigeSpan: "-1",
        user:local.get('userinfo')
    };
  },
  props: {
    mold: {
      type: String,
      default: "thumbnail"
    },
    mold1: {
      type: String
    },
    items: {
      type: Object,
      required: true
    },
    totalprice: {
      type: Number
    }
  },
  created(){
     if (!this.user) {
         this.$router.push({
          name: "LoginView"
        });
     }
     if(this.items.orderDetailList!=null){
this.notedata = this.items.orderDetailList[0].od_desc
     }
   
  },
  methods: {
     See (e) {
        window.location.href = e
      },
    go_orderdetail(id) {
      this.$router.push({
        name: "OrderDetailView",
        query: {
          id: id
        }
      });
    },
    sendMsg() {
      this.$emit("func", this.msg);
    },
    addCar(item) {
      var ids = [];
      item.forEach(element => {
        ids.push(element.ps_id);
      });
       let data = { list: ids, c_id: this.user.c_id };
        getCartAdd(data).then(response => {
          if (response.code == 210) {
            this.$toast("已经添加到购物车");
            let data1 = {
              c_id:this.user.c_id
            };
            getCartQuery(data1).then(response => {
              if (response.code == 200) {
                var data = response.data;
                this.$store.dispatch("cart/addGoods", data);
              }
            });
          } else {
            this.$toast({
              message: response.msg,
              duration: 5000
            });
          }
        });
    },
    receipt(id) {
      let data1 = {
        o_id: id
      };
      getOrderReceipt(data1).then(response => {
        if (response.code == 213) {
          this.$emit("func", id);
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.on {
  display: none;
}
.shop-list {
  display: flex;
  align-items: center;
  justify-content: space-between;
  img {
    width: 50px;
    height: 50px;
  }
}
.van-cell.choose-type,
.van-cell.choose-type1 {
  line-height: 30px;
  .van-tag {
    font-size: 13px;
    width: 80px;
    height: 30px;
    background-color: transparent !important;
    color: #919191;
    border: 1px solid #919191;
    text-align: center;
    line-height: 25px;
    border-radius: 17px;
  }
  /deep/ .van-cell__value,
  .van-cell__right-icon {
    display: contents;
    color: #45B7FF;
  }
}
.service {
  background-color: #f5f5f5;
  color: #a6a6a6;
}
</style>

