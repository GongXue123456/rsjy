<template>
  <div class="my-order">
   
    <div class="my-order-nav w">
       <van-nav-bar class="pr" title="店铺详情" left-arrow @click-left="$router.back()" />
    </div>
    <div class="pt50">
         
       <div>
         <div  class="bgcfff mt10 borr10 list" >
            <div class="company-list p10">
              <img v-if="c_logo_url!='null'" :src="c_logo_url">
              <img v-else src="../assets/images/company.png">
              <div class="ml10 f17 clearfix">{{c_name}}</div>
            </div>
        </div>
        <div v-if="companyList.length">
            <van-list id="sport" v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
              <Like v-if="companyList" :items="companyList"></Like>
            </van-list>
        </div>
        <div v-else-if="!companyList.length&&finished==true">
        <div class="tc pt150 pb100">
          <div class="wrap_cart">
         <img src="../assets/images/changgou_null.png">
        </div>
          <p v-if="cate_index==0" class="text_empty f14 pb10 c9D">暂无商品</p>
        </div>
      </div>
       
      </div>
         

 
          
    </div>

  </div>
</template>
<script>
import { getHomeRecommend } from "../api/index";
import {local,pushHistory} from '@/until/data'
import Like from "../components/common/Like";
export default {
  name: "my-order",
  components: { Like },
  data() {
    return {
        c_id:'',
        c_name:'',
        c_logo_url:'',
      companyList:[],
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
     this.c_id=this.$route.query.id;
     this.c_name=this.$route.query.name;
     this.c_logo_url=this.$route.query.url;
  this.onLoad()
},
  methods: {
    getData() {
      let data = {
        pager_offset:this.pageNumber,
        c_id:this.c_id
      };
      getHomeRecommend(data).then(response => {
        if (response.code == 200) {
            console.log(response)
            this.companyList = this.companyList.concat(response.data);
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
    // initialization(){
    //         this.companyList = [];
    //         this.pageNumber = 0;
    //         this.loading = true;
    //         this.finished = false;
    //         if(this.loading){
    //             this.onLoad();
    //         }
    //     },
    // getMsgFormSon(data){
    //     this.initialization()
    //  }
  }
};
</script>

<style lang="scss" scoped>
.my-order {
  .my-order-nav{position: fixed;left: 0px;top: 0px;z-index: 100;background-color: #f5f5f5}
  .list{margin: 8px;}
  .company-list{
    img{width: 50px;height: 50px;border-radius: 50%;}
  }
  /deep/ .van-nav-bar {
    background-color: #f5f5f5;z-index: 100 !important;
    .van-nav-bar__title {color: #282828;font-weight: Bold;font-size: 18px;}
    .van-icon {color: #282828;}
  }

}
</style>

