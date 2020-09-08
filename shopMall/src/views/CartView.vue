<template>
  <div id="cart" class="cart">
    <van-nav-bar v-if="id==1"  left-arrow
                 @click-left="$router.back()" title="购物车" class="mb10" >
      <div
        v-if="cartList.length&&cartStatus === 'account'"
        @click="cartStatus = 'edit'"
        slot="right"
      >编辑</div>
      <div
        v-if="cartList.length&&cartStatus === 'edit'"
        @click="cartStatus = 'account'"
        slot="right"
      >完成</div>
    </van-nav-bar>
     <van-nav-bar v-else title="购物车" class="mb10" >
      <div
        v-if="cartList.length&&cartStatus === 'account'"
        @click="cartStatus = 'edit'"
        slot="right"
      >编辑</div>
      <div
        v-if="cartList.length&&cartStatus === 'edit'"
        @click="cartStatus = 'account'"
        slot="right"
      >完成</div>
    </van-nav-bar>
    <div v-if="cartList.length" class="pt50 mt10">
      <van-row class="cart_bg bgcfff p15 mb10" v-for="(item,index) in cartList" :key="index">
        <van-col span="2">
          <van-checkbox v-model="item.chcked" @click="checkShop(item)" checked-color="#45B7FF"></van-checkbox>
        </van-col>
        <van-col span="22" style="margin-top:-3px;">
          <div class="shop_name tl f15 c28 clearfix">{{item.c_name}}<span class="ml5 c999 lh20 pt2">({{item.productSpecsList.length}})</span></div>
          <span class="shop_num mr10 f14" :class="item.check_class == 1/2 ? 'active':''"  @click="changeAllNum({index:index,type:1/2})">- 5</span><span class="shop_num mr10 f14" :class="item.check_class == 5 ? 'active':''" @click="changeAllNum({index:index,type:5})">+ 5</span><span class="shop_num mr10 f14" :class="item.check_class == 10 ? 'active':''" @click="changeAllNum({index:index,type:10})">+ 10</span><span class="shop_num mr10 f14" :class="item.check_class == 20 ? 'active':''" @click="changeAllNum({index:index,type:20})">+ 20</span>
        </van-col>
        <van-col
          v-for="(goods,goodsIndex) in item.productSpecsList"
          :key="goodsIndex"
          span="24"
          class="pt15"
        >
          <van-row>
            <van-col span="2">
              <div class="cart_choose">
                <van-checkbox
                  v-model="goods.ischcked"
                  :data-id="goods.ps_id"
                  checked-color="#45B7FF"
                  @click="ischeck(item,goods)"
                ></van-checkbox>
              </div>
            </van-col>
            <van-col span="6">
              <div class="cart_img"  @click.stop="go_detail(goods.p_id,goods.ps_id)">
                <img alt :src="goods.img_thumb" />
              </div>
            </van-col>
            <van-col span="15" class="pr" offset="1" >
              <p class="cart_title f17" @click.stop="go_detail(goods.p_id,goods.ps_id)">{{goods.ps_main_title}}</p>
              <p class="cart_describe f14 c28" @click.stop="go_detail(goods.p_id,goods.ps_id)">{{goods.ps_attr}}</p>
              <div >
                <p class="cart_price f17 general_color fl" @click.stop="go_detail(goods.p_id,goods.ps_id)">
                  <span class="f12">￥</span>
                  {{goods.ps_price_sell.toFixed(2)}}/{{goods.ps_unit}}
                </p>
                <div class="sum_cont fr">
                  <label
                    class="minute"
                    size="mini"
                    @click.stop="changeNumber({index:index, goodsIndex: goodsIndex,type:-1})"
                  >-</label>
                  <input
                    class="input c28 bgcfff"
                    v-model="goods.cart_count"
                    v-on:blur.stop="changeNumber({index:index, goodsIndex: goodsIndex,type:0})"
                  />
                  <!-- v-on:input="changeNumber({index:index, goodsIndex: goodsIndex,type:0})" -->
                  <label
                    class="add"
                    size="mini"
                    @click.stop="changeNumber({index:index, goodsIndex: goodsIndex,type:1})"
                    :data-id="item.ps_id"
                  >+</label>
                </div>
              </div>
            </van-col>
          </van-row>
        </van-col>
      </van-row>
      <div class="footer_all_pay p15">
        <van-row v-if="cartStatus === 'account'">
          <van-col span="6">
            <div class="foot_finish">
              <van-checkbox class="f15" v-model="isCheckAll" checked-color="#45B7FF" @click="checkAll()">全选<span class="ml5 c999">({{allNum}})</span></van-checkbox>
            </div>
          </van-col>
          <van-col span="10">
            <div class="foot_finish all_price f12 c91">
              预估商品价格：
              <span class="general_color">￥{{allPrice.toFixed(2)}}</span>
            </div>
          </van-col>
          <van-col span="8" class="pl10">
            <div class="foot_finish pay  f15" @click="pay">结算</div>
          </van-col>
        </van-row>
        <van-row v-if="cartStatus === 'edit'">
          <van-col span="6">
            <div class="foot_finish">
              <van-checkbox class="f15" v-model="isCheckAll" checked-color="#45B7FF" @click="checkAll()">全选<span class="ml5 c999">({{allNum}})</span></van-checkbox>
            </div>
          </van-col>
          <van-col span="10"></van-col>
          <van-col span="8" class="pl10">
            <div class="foot_finish pay pay1 general_border general_color f15" @click="clear(cartList)">删除</div>
          </van-col>
        </van-row>
      </div>
    </div>
    <div v-if="!cartList.length">
      <div class="tc pt100 pb100">
        <div class="wrap_cart">
         <img src="../assets/images/cart_null.png">
        </div>
        <p class="text_empty f14 pb10 c9D">购物车空空如也</p>
        <p class="buy_text f14 c9D">赶快去下单购物吧</p>
        <div class="general_bgc f15 cfff go_index mt20" @click.stop="$router.push('/pages/classify')">去逛逛</div>
      </div>
    </div>
    <div>
      <p class="tc genge f15">
        ————&nbsp;&nbsp;
        <span class="c91">猜你喜欢</span>&nbsp;&nbsp;————
      </p>
      <Like></Like>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import {local} from '@/until/data';
import {
  getCartQuery,
  getCartSet,
  getCartDelete
} from "../api/index";
import Like from "../components/common/Cart/like";
export default {
  name: "cart",
  components: { Like },
  data() {
    return {
      cartStatus: "account",
      isCheckAll: false,
      allShops: 0,
      allCount: 0,
      productList1: [],
      cartList:[],
      user:local.get('userinfo'),
      id:this.$route.query.id
    };
  },
  computed: {
    // ...mapState({
    //   cartList: state => state.cart.cartList
    // }),
    ...mapGetters("cart", ["allPrice",'allNum'])
  },
  created() {
     if (!this.user) {
         this.$router.push({
          name: "LoginView"
        });
     }else{
        this.getData()
     }
  },
  methods: {
    ...mapActions("cart", ["delAllGoods"]),
    getData() {
      let data = {
        c_id:this.user.c_id
      };
      getCartQuery(data).then(response => {
        if (response.code == 200) {
          this.cartList=response.data;
            this.$store.dispatch('cart/addGoods',response.data)
        }
      });
    },
    changeNumber(id) {
      let content = this.cartList[id.index].productSpecsList[id.goodsIndex];
      if (id.type == 1) {
        if(content.cart_count>=999){
          content.cart_count=999;
           this.$toast("限购最大量999");
        }
        this.$store.dispatch("cart/addNumber", id);
      } else if (id.type == -1) {
        if (content.cart_count > 1) {
          this.$store.dispatch("cart/delNumber", id);
        } else {
          this.$dialog
            .confirm({
              message: "确认删除此商品吗？"
            })
            .then(() => {
              let data = { list: [content.ps_id], c_id: this.user.c_id };
              this.deletegoods(data);
              this.$store.dispatch("cart/delGoods", id);
            })
            .catch(() => {});
        }
      } else {
        if(content.ps_unit=='克'||content.ps_unit=='千克'||content.ps_unit=='斤'||content.ps_unit=='公斤'||content.ps_unit=='两'){
              //  content.cart_count=content.cart_count.replace(/[^\.\d]/g,'');
            
        }else{
           content.cart_count=content.cart_count.replace(/[^\.\d]/g,'');
          content.cart_count=content.cart_count.replace('.','');
        }
         if(content.cart_count>=999){
          content.cart_count=999;
           this.$toast("限购最大量999");
        }else if(content.cart_count==0){
        content.cart_count=1;
        this.$toast("商品数量不能为0");
        return false
      }
        this.$store.dispatch("cart/changeNumber", id);
      }
      var data = {
        c_id: this.user.c_id,
        list:[{ ps_id: content.ps_id,count: content.cart_count}]
      };
      getCartSet(data).then(response => {
        if (response.code == 200) {
        }
      });
    },
    // changeNum(id){
    //     let content = this.cartList[id.index].productSpecsList[id.goodsIndex];
    //    if (id.type == 0) {
    //       if(content.cart_count==0){
    //     content.cart_count=1;
    //     this.$toast("商品数量不能为0");
    //     return false
    //   }
    //    }
    // },
    changeAllNum(id){
    
      this.cartList[id.index].check_class = id.type;
      let content1 = this.cartList[id.index].productSpecsList;
    
     this.$store.dispatch("cart/changeAllNumber", id);
     var ids = [];
     if(this.allNum==0){
        this.$toast("您还没有选择宝贝哦");
      }else{
          content1.forEach(item1 => {
         ids.push({ps_id:item1.ps_id,count:item1.cart_count});
        });
      }
         var data = {list: ids, c_id: this.user.c_id };
      getCartSet(data).then(response => {
        if (response.code == 200) {
        }
      });
    },
     go_detail(id,psid) {
      this.$router.push({
        name: "DetailView",
        query: {
          id: id,
          psid:psid
        }
      });
    },
    ischeck(item, pro) {
      !pro.ischcked ? this._checkTrue(item, pro) : this._checkFalse(item, pro);
    },
    _checkTrue(item, pro) {
      pro.ischcked = true;
      ++item.pager_count == item.productSpecsList.length
        ? (item.chcked = true)
        : "";
      item.chcked
        ? ++this.allShops === this.cartList.length
          ? (this.isCheckAll = true)
          : (this.isCheckAll = false)
        : "";
    },
    _checkFalse(item, pro) {
      pro.ischcked = false;
      --item.pager_count;
      if (item.chcked) {
        item.chcked = false;
        --this.allShops;
      }
      this.isCheckAll = false;
    },
    checkShop(item) {
      !item.chcked ? this._shopTrue(item) : this._shopFalse(item);
    },
    _shopTrue(item) {
      item.productSpecsList.forEach(pro => {
        pro.ischcked === false ? this._checkTrue(item, pro) : "";
      });
    },
    _shopFalse(item) {
      item.productSpecsList.forEach(pro => {
        pro.ischcked === true ? this._checkFalse(item, pro) : "";
      });
    },
    checkAll() {
      //全选
      this.isCheckAll = !this.isCheckAll;
      this.isCheckAll
        ? this.cartList.forEach(item => {
            this._shopTrue(item);
          })
        : this.cartList.forEach(item => {
            this._shopFalse(item);
          });
    },
    clear() {
       var ids = [];
      this.cartList.forEach(item => {
        item.productSpecsList.forEach(item1 => {
          if (item1.ischcked == true) {
            ids.push(item1.ps_id);
             this.$dialog
              .confirm({
                message: "确认删除吗？"
              })
              .then(() => {
                let data = { list: ids, c_id: this.user.c_id };
                this.deletegoods(data);

              })
              .catch(() => {});
          }
        });
      });

    },
    deletegoods(data) {
      getCartDelete(data).then(response => {
        if (response.code == 200) {
           this.$toast("删除成功");
          this.getData();
            this.isCheckAll = false;
        }
      });
    },
    pay: function() {
       var ids=[];
      if(this.allNum==0){
        this.$toast("您还没有选择宝贝哦");
      }else{
       this.cartList.forEach(item => {
        item.productSpecsList.forEach(item1 => {
          if (item1.ischcked == true) {
            ids.push({ps_id:item1.ps_id,cart_count:item1.cart_count,od_desc:''});
            let data1 = {list: ids, c_id: this.user.c_id };
            localStorage.setItem("orderlist",JSON.stringify(data1));
            this.$router.push({
              name: "ConfirmOrderView",
            });
          }
        });
      });
      }

    }
  }
};
</script>
<style lang="scss" scoped>
#cart {padding-bottom: 120px;
   .van-nav-bar {.van-nav-bar__title {color: #282828;}.van-icon {color: #282828;}}
   .cart_bg {border-radius: 5px;.shop_name{display: inline-flex;} .shop_num{padding:5px 12px;border: 1px solid #E2E2E2;color: #7F7F7F;border-radius: 2px;}.active{background-color:#F5F5F5 }}

   .cart_img img { width: 83px;height: 83px;  border-radius: 11px;}
   .cart_choose {text-align: center;margin-top: 32px;}
   .cart_title {color: #4f4f4f;font-weight: bold;display: inline-block;white-space: nowrap;  width: 100%; overflow: hidden;text-overflow:ellipsis;}
   .cart_describe {background-color: #f5f5f5;padding: 7px 13px;margin: 0px 0px 13px 0px;border-radius: 2px;display: inline-block;}
   .sum_cont {position: absolute;right: 0;bottom: 0px;width: 98px;height: 30px;line-height: 30px;color: #cbcbcb;
   .minute {position: absolute;width: 30px;text-align: center; height: 30px;line-height: 26px;left: 0px;font-size: 18px;border: 1px solid #cbcbcb;}
   .add {width: 30px;border: 1px solid #cbcbcb;height: 30px;line-height: 30px;text-align: center;position: absolute;right: 0px;font-size: 18px;}
   .input {width: 38px;height: 30px;display: inline-block;line-height: 30px;text-align: center; position: absolute;right: 30px;border-top: 1px solid #cbcbcb; border-bottom: 1px solid #cbcbcb;}}
   .foot_finish {height: 35px;line-height: 35px;text-align: center;}
.foot_finish .van-checkbox{height: 35px;line-height: 35px;}
.all_price {text-align: right;}
.pay { border-radius: 30px;color: white;letter-spacing: 2px; background: -webkit-gradient(linear, 0% 25%, 75% 100%, from(#15A4FF), to(#20CAE3));}
.pay1{background:#fff}
.footer_all_pay {position: fixed;bottom: 50px;width: 100%;background-color: white;}
.empty_cart {font-size: 55px;color: #ececec;}
.wrap_cart { display: inline-block;}
.wrap_cart img{width: 125px}
.buy_text {color: #b5b4b4;}
.genge{color: rgba($color: #000000, $alpha: 0.12);padding: 20px 0 15px 0px;}
.go_index{display: inline-block;padding: 10px 20px;border-radius:4px;}
}
/deep/ .van-dialog .van-button--default{
  background-color: #f5f5f5 !important;
}
/* /deep/ .van-checkbox__icon--checked .van-icon{
    background: url(../assets/images/jingdong-bg.png) no-repeat 0px 0px !important;
} */
</style>

