<template>
  <div class="my-order">
   
    <div class="my-order-nav w">
       <van-nav-bar class="pr" title="店铺列表" left-arrow @click-left="$router.back()" />
    </div>
    <div class="pt50">
         
       <div v-if="orderList.length">
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad"  >
            <div  class="bgcfff m15 mt10 borr10" v-for="(item1,index) in orderList" :key="index">
                <div class="company-list p10" >
                  <img v-if="item1.c_logo_url" :src="item1.c_logo_url" @click="$router.push('/companyDetail?id='+item1.c_id+'&url='+item1.c_logo_url+'&name='+item1.c_name)">
                  <img v-else src="../assets/images/company.png" @click="$router.push('/companyDetail?id='+item1.c_id+'&url='+item1.c_logo_url+'&name='+item1.c_name)">
                  <div class="ml10 f17">
                      <div class="" @click="$router.push('/companyDetail?id='+item1.c_id+'&url='+item1.c_logo_url+'&name='+item1.c_name)">{{item1.c_name}}</div>
                       <div v-if="item1.productspeclist.length>0" class="shop-list pr mt15 pb10 border-b">
                          <img  v-for="(image, index) in item1.productspeclist.slice(0,4)" :key="index" class="mr10" :src="JSON.parse(image.ps_detail_img).rotary_img[0].img_ori"
                            @click.stop="go_detail(image.p_id,image.ps_id)"/>
                         <div class="f12 c91 more" @click="$router.push('/companyDetail?id='+item1.c_id+'&url='+item1.c_logo_url+'&name='+item1.c_name)"> 查看<br/>更多 </div>
    </div>
                  </div>
                  
                </div>  
            </div>
             </van-list>
          </div>
          <div v-else-if="!orderList.length&&finished==true">
        <div class="tc pt150 pb100">
          <div class="wrap_cart">
         <img src="../assets/images/changgou_null.png">
        </div>
          <p v-if="cate_index==0" class="text_empty f14 pb10 c9D">暂无店铺</p>
        </div>
      </div>
          
    </div>

  </div>
</template>
<script>
import { getHotCompany } from "../api/index";
import List from "../components/common/myorder/list";
import {local,pushHistory} from '@/until/data'
export default {
  name: "my-order",
  components: { List },
  data() {
    return {
      orderList:[],
       pageNumber: 0,
      loading: false,
      finished: false,
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
  this.onLoad()
},
  methods: {
    getData() {
      let data = {
        pager_offset: this.pageNumber,
      };
      getHotCompany(data).then(response => {
        if (response.code == 200) {
            this.orderList = this.orderList.concat(response.data.pager_list);
            this.loading = false;
              if (response.data.pager_list.length < 10) {
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
};
</script>

<style lang="scss" scoped>
.my-order {
  .my-order-nav{position: fixed;left: 0px;top: 0px;z-index: 100;background-color: #f5f5f5}
  .company-list{
    display: flex;
    img{width: 50px;height: 50px;border-radius: 50%;}
  }
  .shop-list {
  /* display: flex;
  align-items: center;
  justify-content: space-between; */
  img {
    width: 18%;
    height: 50px;
    border-radius: 8px;
  }
  .more{
    position: absolute;
    right: 5px;
    top: 5px;
  }
}
  /deep/ .van-nav-bar {
    background-color: #f5f5f5;z-index: 100 !important;
    .van-nav-bar__title {color: #282828;font-weight: Bold;font-size: 18px;}
    .van-icon {color: #282828;}
  }

}
</style>

