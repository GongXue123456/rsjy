<template>
   <div class="like">
     
     <van-row>
                        <van-col span="12" v-for="(item,index) in items" :key="index">
                            <div class="sport_img" @click.stop="go_detail(item.p_id,item.ps_id)">
                                <div class="img_wrap bgcfff">
                                    <img :src="item.img_thumb" alt="">
                                    <div class="sport_text p10">
                                       <p class="f15 c28">{{item.ps_main_title}}</p>
                                     <div class=" c91 f12 pt10">
                                        市场参考价：<span class="new_price general_color">{{item.ps_price_sell.toFixed(2)}}/{{item.ps_unit}}</span>
                                       </div></div>
                                </div>
                            </div>
                        </van-col>
                    </van-row>
   </div>
</template>
<script>
export default {
  name:'like',
  data(){
      return{ }
  },
   props: {
    items: {
      type: Array,
      required: true
    }
  },
  created(){
  
  },
   methods:{
     getData() {
      var _this = this;
      let data = {
        c_id: this.user.c_id,
        pager_offset: this.pageNumber
      };
      getHomeExpect(data).then(response => {
        if (response.code == 200) {
          if(response.data){
             this.expectList = this.expectList.concat(response.data);
               this.loading = false;
             if (response.data.length <10) {
                   this.finished = true;
               }
                 this.pageNumber= this.pageNumber+10
          }
        } else {
          this.$toast({
            message: response.msg,
            duration: 5000
          });
        }
      });

    },
     go_detail(id,psid) {
      let choose_goods = {};
      this.$router.push({
        name: "DetailView",
        query: {
          id: id,
          psid:psid
        }
      });
    },
   }
}
</script>

<style lang="scss" scoped>
 #sport .sport_img{padding: 8px}
 #sport .img_wrap{border-radius: 8px}
    #sport .sport_img img{width:100%;border-radius: 8px;height: 171.5px;}
    #sport .sport_img .new_price{font-size: 16px;font-weight: bolder;}
</style>

