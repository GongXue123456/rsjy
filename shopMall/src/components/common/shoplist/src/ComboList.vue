<template>
     <div class="list bgcfff">
      <div class="lists" v-for="(item, index) in items" :key="index">
        <van-row>
            <van-col span="24">
             <van-card
          class="tl p0"
          :title="item.co_name"
         :thumb="item.co_logo"
          @click.stop="intoDetail(item.co_id)"
        :data-id="item.co_id"
        >
       
          <div slot="tags" class="c91">
               {{item.co_desc}}
            <!-- 市场参考价&nbsp;&nbsp;
            <span class="f16 general_color">¥&nbsp;{{item.ps_price_sell}}</span> -->
            <van-tag plain class="fr tc f20 p0" @click.stop="cancelColect1(item.co_id)" :data-id="item.co_id">
               <img src="../../../../assets/images/collection.png">
            </van-tag>
          </div>
        </van-card>
            </van-col>
          </van-row>
        
      </div>
    </div>
</template>
<script>
import { getCartAdd,getCartQuery,cancelCollectDelete } from '../../../../api/index'
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
    return{ user:local.get('userinfo')}
  },
  created(){
     if (!this.user) {
         this.$router.push({
          name: "LoginView"
        });
     }
  },
  methods:{
    /**
       * 进入详情页
       */
      intoDetail (detail) {
        let co_id = JSON.stringify(detail)
        this.$router.push({
          path: '/introducemenu',
          query: { co_id }
        })
      },
   cancelColect1(id){
         let data = {
           co_id:id,
        c_id: this.user.c_id
         }
      cancelCollectDelete(data).then(response => {
        if (response.code == 200) {
          this.$toast("取消收藏成功");
            this.$emit('cancelcolect');
        } else {
          this.$toast({
            message: response.msg,
            duration: 5000
          });
        }
      });
    }
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
     img{width: 25px;}
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
