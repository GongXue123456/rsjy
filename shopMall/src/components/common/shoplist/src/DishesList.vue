<template>
     <div class="list bgcfff">
      <div class="lists" v-for="(item, index) in items" :key="index">
        <van-row>
            <van-col span="24">
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
            <van-tag plain class="fr tc f20 p0" @click.stop="cancelColect(item.ps_id)" :data-id="item.ps_id">
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
import { getCartAdd,getCartQuery,getCollectPsDelete } from '../../../../api/index'
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import simple from '../../../common/IntroduceMenu/SimpleIntroduce'
import {local} from '@/until/data';
export default {
  name:'list',
  data(){
      return{
          shoucang: false,
          user:local.get('userinfo')
      }
  },
  components:{simple},
 props: {
    items: {
      type: Array,
      required: true
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
    cancelColect(id){
         let data = {
          c_id: this.user.c_id,
          ps_id: id
         }
      getCollectPsDelete(data).then(response => {
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
