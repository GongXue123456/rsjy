
<template>
  <div id="goodInfo">
    <NavBar type="detail"></NavBar>
    <div class=" goods_describe" v-if="goods_describe">
      <swiper class="goods-swipe" :items="deatil_images"></swiper>
      <van-row class="p15 bgcfff">
        <van-col span="24">
          <div class="goods_title c28 f18">{{goodsinfo.ps_main_title}}</div>
          <div class="goods_sub_title c28 f18">{{goodsinfo.ps_desc}}</div>
        </van-col>
        <van-col span="18" class="pt15">
          <div class="price f12">
            ￥
            <span class="new_price general_color f20">{{goodsinfo.ps_price_sell | numFilter}}/{{goodsinfo.ps_unit}}</span>
          </div>
        </van-col>
        <van-col span="6" class="pt5">
          <div class="goods-share tr">
             <img width="30px" @click="collect(0)" v-if="isCollect==0" src="../assets/images/uncollection.png" alt="">
             <img width="30px" @click="collect(1)" v-if="isCollect==1" src="../assets/images/collection.png" alt="">
          </div>
        </van-col>
        <div class="cb"></div>
        <!-- <van-col span="20" class="pt15 coupon_massage">
          <span class="general_color f14 mr10">满120减10</span>
          <span class="general_color f14 mr10">满120减10</span>
        </van-col>
        <van-col span="4" class="pt15 f15 c91">
          <div class="tr" @click.stop="go_coupon()">
            领券
            <span class="iconfont icon-arrowright"></span>
          </div>
        </van-col> -->
      </van-row>
      <van-row class="p15 bgcfff mt10 f15">
        <van-col span="4">
          <div class="tl c91">选择</div>
        </van-col>
        <van-col span="16">
          <div class="c28 coupon" @click.stop="go_sku">{{initialSkuname.s1}}&nbsp;&nbsp;{{initialSkuname.s2}}&nbsp;&nbsp;{{initialSkuname.s3}}</div>
        </van-col>
        <van-col span="4">
          <div class="tr" @click.stop="go_sku">
            <span class="iconfont icon-arrowright"></span>
          </div>
        </van-col>
        <div class="cb"></div>
        <!-- <van-col span="4" class="pt15">
          <div class="tl c91">运费</div>
        </van-col>
        <van-col span="20" class="pt15">
          <div class="c28 coupon">满400元免运费，不足400元运费10元</div>
        </van-col> -->
      </van-row>
    </div>
    <!--宝贝评价-->
    <div class="goods_describe bgcfff mt10">
        <div>
        <h2 class="f15 tl c91">推荐菜谱</h2>
        <Recommend  mold="aaa" :items="shoplist"></Recommend>
      </div>
       <div >
        <h2 class="f15 tl c91">推荐菜品</h2>
        <Recommend  mold="bbb" :items="shoplist1"></Recommend>
      </div>
    </div>
    <!--宝贝详情-->
    <div class="goods_detail">
       <p class="tc p15 genge f15">————&nbsp;&nbsp;<span class="c91">图文详情</span>&nbsp;&nbsp;————</p>
       <p class="tc f15 c91 mb15">图片仅供参考</p>
      <div   v-for="(item,index) in deatil_images" :key="index">
        <img  :src="item.img_ori" alt="" width="100%">
      </div>
    </div>

    <!--弹出层-->
    <van-popup v-model="dailog"  position="bottom" :overlay="true">
      <Coupon @closeTalion="dailog = false"></Coupon>
    </van-popup>
    <van-sku 
      v-model="showSku"
      :sku="goods_describe1"
      :goods="goods_describe2"
      :goods-id="goods_describe3"
      :initial-sku="initialSku"
      :disable-stepper-input='false'
      :quota='99'
      :reset-stepper-on-hide="resetStepperOnHide"
      :reset-selected-sku-on-hide="resetSelectedSkuOnHide"
      :close-on-click-overlay="closeOnClickOverlay"
      :custom-sku-validator="customSkuValidator"
      :hide-quota-text="true"
      :hide-stock = "hidestock"
      
      @sku-selected="skuSelected"
    >
      <template slot="sku-header"  slot-scope="props">
        <div class="van-sku-header van-hairline--bottom">
          <div class="van-sku-header__img-wrap">
              <img :src="JSON.parse(goodsinfo.ps_detail_img).rotary_img[0].img_thumb">
          </div>
           <div class="van-sku-header__goods-info">
    <div class="van-sku__goods-name van-ellipsis">{{goodsinfo.ps_main_title}}</div>
     <div class="van-sku__goods-price">
      <span class="van-sku__price-symbol">￥</span><span class="van-sku__price-num">{{ props.price }}/{{goodsinfo.ps_unit}}</span>
    </div>
    <i class="van-icon van-icon-close van-sku__close-icon" @click="showSku = false"></i>
  </div>
  </div>
  </template>  
  <template slot="sku-stepper">
    <div class="van-sku-stepper-stock">
      <div class="van-sku-stepper-container">
        <div class="van-sku__stepper-title">购买数量：</div>
        <div class="van-stepper van-sku__stepper">
          <button class="van-stepper__minus " v-bind:class="{'van-stepper__minus--disabled':  selectednum <= '1'}" @click="changeNumber({type:-1})"></button>
          <input type="number"  v-model="selectednum" class="van-stepper__input" v-on:input="changeNumber({type:0})"  />
          <button class="van-stepper__plus"  @click="changeNumber({type:1})"></button>
          </div>
          </div>
          <div class="van-sku__stock">剩余999999件</div></div>
  </template>
      <template slot="sku-actions" >
   <div class="van-sku-actions general_bgc" >
     <button class="van-button van-button--warning van-button--large van-button--square general_bgc border-no cfff" @click="onAddCartClicked">
       <span class="van-button__text">加入购物车</span>
       </button>
      </div>
  </template>
    </van-sku>
    <van-goods-action class="general_bgc w">
      <van-goods-action-button class="general_bgc cfff border-no" @click="showSku = true">加入购物车</van-goods-action-button>
    </van-goods-action>
  </div>
</template>

<script>
import { getDetail,getCartAdd,getCartQuery,getCollectPsAdd,getCollectPsDelete } from '../api/index'
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import skuData from "../../static/data/data";
import { ImagePreview } from "vant";
import NavBar from "../components/common/NavBar";
import {Swiper, Coupon,Recommend} from '../components/common/detail/index'
import {local} from '@/until/data';
import uncollection from '../assets/images/uncollection.png'
import collection from '../assets/images/collection.png'
export default {
  name: "goodsInfo",
  components: { Swiper, NavBar,Coupon,Recommend },
  inject:['reload'],
  data() {
    return {
      active: 0,
      show: false,
       dailog: false,
      showSku: false,
       uncollection: uncollection,
      goods_describe:'',
      goods_describe1: {},
      goods_describe2: {},
      goods_describe3:'',
      goodsinfo:'',
      hidestock: false,
      selectednum:'1',
      initialSku: {
        s1: '4',
        s2: '237',
        s3:'266',
        selectedNum: 0
      },
      initialSkuname:{
        s1: '',
        s2: '',
        s3:''
      },
      p_id:'',
      isCollect:'',
      images:[],
      deatil_images:[],
      shoplist: [],
      shoplist1: [],
      closeOnClickOverlay: true,
      customSkuValidator: () => "请选择商品规格",
      resetStepperOnHide: false, //隐藏时重置选择的商品数量
      resetSelectedSkuOnHide: false, //隐藏时重置已选择的 sku
      pid:'',
      psid:'',
       user:local.get('userinfo'),
       tocart:true
    };
  },

filters: {
  numFilter (value) {
    let realVal = parseFloat(value).toFixed(2)
    return realVal
  }
},
  mounted: function () {
      this.p_id=this.$route.query.id;
         this.getData1();
    },
    created(){
      if (!this.user) {
         this.$router.push({
          name: "LoginView"
        });
     }
    },
  methods: {
    /**
     * 初始化SKU
     */
    getData1() {
      var _this = this;
      let data = {
        p_id:this.p_id,
        c_id:this.user.c_id
      };
      getDetail(data).then(response => {
        if (response.code == 200) {
         let total = 0
         this.images=response.data.img_ori;
         if(response.data.p_detail_img!=''){
          this.deatil_images=JSON.parse(response.data.p_detail_img)
          
         }
         this.goods_describe=response.data
         this.goods_describe1=response.data.sku;
          this.goods_describe1.list.map(v =>(v.stock_num = Number(v.stock_num)))
          this.goods_describe1.list.forEach(v => {
            total += v.stock_num
             if(Number(v.id)==this.$route.query.psid){
              this.initialSku.s1=v.s1;
               this.initialSku.s2=v.s2;
                this.initialSku.s3=v.s3;
              this.goods_describe1.tree.forEach((s,index) => { 
             if(s.k_s=='s1'){
               s.v.forEach(ss=>{
                 if(ss.id==v.s1){
                   this.initialSkuname.s1=ss.name;
                 }
               })
             }
              if(s.k_s=='s2'){
               s.v.forEach(ss=>{
                 if(ss.id==v.s2){
                   this.initialSkuname.s2=ss.name;
                 }
               })
             }
              if(s.k_s=='s3'){
               s.v.forEach(ss=>{
                 if(ss.id==v.s3){
                   this.initialSkuname.s3=ss.name;
                 }
               })
             }
          })
           }
          })
           
          this.goods_describe1.stock_num = total
          this.goods_describe2=response.data.sku.goods_info;
          this.goods_describe3=response.data.sku.goods_id;
           this.shoplist=response.data.recommendCombo;
             this.shoplist1=response.data.recommendPs;
          this.goods_describe.productSpecList.forEach(element => {
             if(element.ps_id==this.$route.query.psid){
               this.isCollect=element.is_collect;
               this.pid=element.p_id;
               this.psid=element.ps_id;
               this.goodsinfo=element;
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
   changeNumber(id){
      if (id.type == 1) {
        this.selectednum++
        
      } else if (id.type == -1) {
            this.selectednum--;
            if(this.selectednum<=0){
               this.selectednum=1;
              this.$toast("商品数量不能为0");
            }
      }else{
             if(this.goodsinfo.ps_unit=='克'||this.goodsinfo.ps_unit=='千克'||this.goodsinfo.ps_unit=='斤'||this.goodsinfo.ps_unit=='公斤'||this.goodsinfo.ps_unit=='两'){
                  this.selectednum=this.selectednum;  
        }else{
            // this.selectednum=Math.ceil(this.selectednum);
             this.selectednum=this.selectednum.replace(/[^\.\d]/g,'');
         this.selectednum=this.selectednum.replace('.','');
        //  this.selectednum=this.selectednum.replace('0','');
        } 
      }
      if(this.selectednum>=999){
          this.selectednum=999;
           this.$toast("限购最大量999");
        }
   },
    /**
     * 添加到购物车
     */
    onAddCartClicked() {
          let ids = [];
          ids.push(this.goodsinfo.ps_id);
          if(!this.tocart){
             this.$toast("请选择商品规格");
             return false
          }
        //   if(this.goodsinfo.ps_unit=='克'||this.goodsinfo.ps_unit=='千克'||this.goodsinfo.ps_unit=='斤'||this.goodsinfo.ps_unit=='公斤'||this.goodsinfo.ps_unit=='两'){
        //            var selectedNum=data.selectedNum;  
        // }else{
        //     var selectedNum=Math.ceil(data.selectedNum);
        // }
          if(ids.length>0){
             let params = {"list":ids,"c_id":this.user.c_id,"count":this.selectednum};
      getCartAdd(params).then(response => {
        if (response.code == 210) {
          this.showSku=false;
            this.$toast("已经添加到购物车");
            let data1 = {
                     c_id:this.user.c_id,
                };
          getCartQuery(data1).then(response=>{
             if (response.code == 200) {
               var data=response.data;
               this.$store.dispatch('cart/addGoods',data)
             }
          })
        } else {
          this.$toast({
            message: response.msg,
            duration: 5000
          });
        }
       });
          }else{
              this.$toast("无法购买，请重新选择");
          }

    },
    /**
     * 切换规格
     */
    skuSelected( skuValue, selectedSku, selectedSkuComb ){
      if(skuValue.skuValue.skuKeyStr=="s1"){
          this.initialSkuname.s1=skuValue.skuValue.name;
      }else if(skuValue.skuValue.skuKeyStr=="s2"){
          this.initialSkuname.s2=skuValue.skuValue.name;
      }else if(skuValue.skuValue.skuKeyStr=="s3"){
          this.initialSkuname.s3=skuValue.skuValue.name;
      }
       this.goods_describe.productSpecList.forEach(element1 => {
        if(!skuValue.selectedSkuComb){
         this.tocart=false
        }else{
            this.tocart=true
if(element1.ps_id==skuValue.selectedSkuComb.id){
               this.goodsinfo=element1;
             }
        }
             
           });
    },
    /**
     * 收藏
     */
    collect(type){
      if(type==1){
        this.isCollect=0
        var data={
          c_id:this.user.c_id,
          p_id:this.pid,
          ps_id:this.psid
        }
        getCollectPsDelete(data).then(response=>{
             if (response.code == 200) {
               this.$toast("取消收藏成功")
             }
          })
      }else{
         this.isCollect=1;
          var data={
          c_id:this.user.c_id,
           p_id:this.pid,
          ps_id:this.psid
        }
        getCollectPsAdd(data).then(response=>{
             if (response.code == 210) {
               this.$toast("收藏成功")
             }
          })
      }

    },
    go_sku() {
      this.showSku = true;
      this.dailog = false;
    },
    go_coupon() {
      this.showSku = false;
      this.dailog = true;
    },
     fatherMethod() {
       this.reload()
      }
  }
};
</script>

<style scoped lang="scss">
#goodInfo {
  padding-bottom: 60px;
}
#goodInfo .goods-swipe img {
  width: 100%;
  display: block;
  height: 350px;
}
#goodInfo .goods_describe .price {
  /* color: #d52e3b; */
}
#goodInfo .goods_describe .price .new_price {
  font-size: 20px;
}
#goodInfo .goods_describe .price .sell {
  font-size: 12px;
  padding: 0 2px;
  background-color: #fdebe5;
}
#goodInfo .goods_describe .goods_title {
  font-weight: bold;
  line-height: 21px;
}
#goodInfo .goods_describe .goods_sub_title {
  font-size:14px;
font-weight:500;
color:rgba(144,144,144,1);
    margin-top: 6px;
    line-height: 20px;
}
#goodInfo .goods_describe .coupon_massage span {
  background-color: rgba(213, 46, 59, 0.1);
  padding: 6px 8px;
  border-radius: 2px;
}

#goodInfo .goods_describe .address .icon_coupon {
  position: absolute;
  top: 10px;
  right: 10px;
}
#goodInfo .goods_describe .coupon {
  text-align: left;
}

#top_radius {
  height: 15px;
  width: 12px;
  position: absolute;
  background-color: white;
  border-radius: 50%;
  right: 0;
  top: 0;
  transform: translate(50%, -50%);
  z-index: 99;
}
#bottom_radius {
  height: 15px;
  width: 12px;
  position: absolute;
  background-color: white;
  border-radius: 50%;
  right: 0;
  bottom: 0;
  transform: translate(50%, 50%);
  z-index: 99;
}
.genge{color: rgba($color: #000000, $alpha: 0.12)}


/deep/ .van-sku-actions .van-button--danger{
display: none;

}
/deep/ .van-popup--bottom{
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
}
/deep/ .van-overlay {
  top:0px;
}
/deep/ .van-sku-container{
  .van-sku-row__title{font-size: 15px;}
  .van-sku__goods-name{font-size: 17px;font-weight:bold;}
  .van-sku-body{min-height: 250px;}
  .van-sku-row__item{height: initial;padding: 10px 14px;line-height: 1;}
  .van-sku__goods-price{color: #45B7FF}
  .van-stepper__input{color: #323232}
   .van-sku-messages{padding-bottom: 0px}
   .van-sku-row__item{ background: #EEEEEE;color:#282828; border-color: #EEEEEE;font-size: 14px}
   .van-sku-row__item--active {
    background: #fff;
    border-color: #45B7FF;
    color:#45B7FF;
}
[class*=van-hairline]::after{border:none;}
.van-sku-header__img-wrap img{border-radius: 8px;}
.van-sku-actions .van-button {
    background: #45B7FF;
    border-color: #45B7FF;
}
.van-sku-row__item--disabled {
    color: #c8c9cc;
    background: #f2f3f5;
    border-color: #ebedf0;
}
.van-sku-header__goods-info {
    padding: 1.5rem 3rem 1.5rem 0.5rem;
}
.van-button--default{border:none}
.van-sku-header__img-wrap{
      margin-top: 1rem;
}
.van-sku-stepper-stock{    padding: 0.6rem 0 1.5rem 0;}
}
</style>
