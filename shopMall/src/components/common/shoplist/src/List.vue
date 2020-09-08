<template>
     <div class="list bgcfff">
      <div class="lists" v-for="(item, index) in items" :key="index">
        <van-row>
            <van-col span="2">
              <div class="cart_choose">
                <van-checkbox
                  v-model="item.ischcked"
                  :data-id="item.ps_id"
                  checked-color="#45B7FF"
                   @click="ischeck(item,items)"
                ></van-checkbox>
              </div>
            </van-col>
            <van-col span="22">
             <van-card
          class="tl p0"
          :title="item.ps_main_title"
         :thumb="item.img_thumb"
          @click.stop="go_detail(item.p_id,item.ps_id)"
        :data-id="item.p_id"
        :data-num="item.ps_id"
        >
          <div slot="tags" class="mb5">
           {{item.ps_attr}}
            <!-- <van-tag plain type="danger" class="general_border general_color">找相似</van-tag> -->
          </div>
          <div slot="tags" class="c91">
            市场参考价&nbsp;&nbsp;
            <span class="f16 general_color">¥&nbsp;{{item.ps_price_sell.toFixed(2)}}/{{item.ps_unit}}</span>
            <van-tag plain class="fr addCar general_bgc tc iconfont f20 icon-gouwuche cfff" @click.stop="addCar(item.ps_id)" :data-id="item.ps_id"></van-tag>
          </div>
        </van-card>
            </van-col>
          </van-row>
        
      </div>
    </div>
</template>
<script>
import { getCartAdd,getCartQuery } from '../../../../api/index'
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import {local} from '@/until/data';
export default {
  name:'list',
 props: {
    items: {
      type: Array,
      required: true
    }
  },
  data(){
    return{
         user:local.get('userinfo')
    }
  },
  created(){
     if (!this.user) {
         this.$router.push({
          name: "LoginView"
        });
     }
  },
  methods:{
    go_detail(id,psid) {
      this.$router.push({
        name: "DetailView",
         query: {   
         id:id,
          psid:psid
      } 
      });
    },
    addCar(id){
        let ids = [];
          ids.push(id);
      let data = {"list":ids,"c_id":this.user.c_id};
       getCartAdd(data).then(response => {
        if (response.code == 210) {
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
    },
    ischeck(item,items) {
      // console.log(item)
      item.ischcked=!item.ischcked
        // console.log(items.length)
        var a=0;
         items.forEach(item1 => {
          //  console.log(item1.ischcked)
          if (item1.ischcked == true) {
            //  console.log(item1)
               a++;
          }
          if(a==items.length){
           this.$emit('allcheck', true)
          }else{
            this.$emit('allcheck', false)
          }
//  console.log(a)
        
        });
      // !pro.ischcked ? this._checkTrue(item, pro) : this._checkFalse(item, pro);
    },
  }
}
</script>
<style lang="scss" scoped>
.lists{padding: 5px 15px}
 .cart_choose {text-align: center;margin-top: 32px;}
.van-card {
  margin-top: 0px;
  .van-card__title {
        max-height: 40px;
    font-size: 17px;
     margin-bottom: 5px;
        padding-top: 5px;
  }
  .van-tag {
    padding: 3px 8px;
    border-radius: 9px;
  }
  .addCar {
    width: 26px;
    height: 26px;
    line-height: 26px;
    border-radius: 50%;
    padding: 0px;
    color: #fff !important;
  }
}
</style>
