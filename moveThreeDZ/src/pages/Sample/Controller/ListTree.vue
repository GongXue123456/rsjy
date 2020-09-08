<template>
  <div class="list">
   
    <div class="list-nav w">
        <Nav title="菜品留样" />
        <div class="record  w">
      <search @myvalue="ser" :name.sync="params.company_name" type="home" />
    </div>
    </div>
    <div class="pt100 bgcfff">
       <div v-if="items.length">
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad"  >
            <div class="reviewed pr m15 p15 pt15 bgf5" v-for="(item,index) in items" :key="index" @click="$router.push('/sampleList/detail?id='+item.sample_code)">
             <div class="lists">
                 <div class="sampleimg"><img class="" :src="imageUrl+item.sample_img"></div>
                 <div class="p5 ml10">
                     <h3 class="c000 f16 fb">{{item.sample_name}}</h3>
             <div class="address  f15 mt15 view-text">{{item.sample_time}}<span  class="f16 ml10">{{item.sample_person}}</span>
             </div>
                 </div>
             </div>
           <span class="pa iconfont iconxiangyou"></span>
        </div>
      
             </van-list>
          </div>
            <empty v-else-if="!items.length&&finished==true" title="暂无留样信息" />
        
          
    </div>

  </div>
</template>
<script>
import Nav from "../../../components/Nav";
import search from "../../../components/search";
import axios from "../../../axios/index.js";
import empty from "../../../components/empty";
import {imageUrl} from '../../../config/index'
export default {
  name: "my-order",
  components: {Nav,search,empty},
  data() {
    return {
        imageUrl:imageUrl,
      items:[],
       params: {
        pager_offset: 0,
        pager_openset: 10,
        company_code:'',
        company_name: "",
      },
      loading: false,
      finished: false,
    };
  },
  created(){

  },

mounted(){
     this.params.company_code=this.$route.query.id;
  this.onLoad()
},

  methods: {
       ser(value) {
      this.items = [];
      this.params.pager_offset = 0;
      this.params.company_name = value;
                this.loading = true;
            this.finished = false;
            if(this.loading){
                this.onLoad();
            }
    },
    getData() {
       axios.get("app/foodsample/list", this.params).then(v => {
        if (v.code == 200) {
            this.items = this.items.concat(v.data.pager_list);
            this.loading = false;
              if (v.data.pager_list.length < 10) {
                this.finished = true;
              }
            this.params.pager_offset = this.params.pager_offset + 10;
        } else {
          this.$toast({
            message: v.msg,
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
   
  }
};
</script>
<style lang="less" scoped>
.list{
  .list-nav{position: fixed;left: 0px;top: 0px;z-index: 100;
  .record{padding-top: 54px;
   
   img {
    width: 25px;
    height: 25px;
    position: absolute;
    top: 69px;
    left: 20px;
    z-index: 100;
  }}}
  .reviewed {
    border-radius:5px;
    .lists{display: flex;
   .sampleimg{width: 70px;height: 70px;}}
    .address {
      color: #A6A6A6;
    }
    .mechanism {
      padding:8px 10px;
    }
    span {
      color: #A6A6A6;
      top: 50px;
      right: 10px;
    }
  }
}
</style>