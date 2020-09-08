<template>
  <div class="my-order">
   
    <div class="my-order-nav w">
        <Nav title="溯源管理" />
        <div class="record  w">
      <search @myvalue="ser" :name.sync="params.company_name" type="home" />
    </div>
    </div>
    <div class="pt100 bgcfff">
       <div v-if="items.length">
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad"  >
               <div class="reviewed pr m15 p15 pt15 bgf5" v-for="(item,index) in items" :key="index" @click="$router.push('/foodSourceTree?id='+item.company_code+'&time='+item.food_source_time_last)">
          <h3 class="c000 f16 fb">{{item.company_name}}</h3>
          <div class="address  f15 mt15 view-text">{{item.province+item.city+item.area+item.town+item.vill}}
           </div>
           <span class="pa iconfont iconxiangyou"></span>
           <div class="address  f15 mt15 view-text"><span class="fl general_color">溯源次数：{{item.food_source_count}}</span><span class="fr">{{item.food_source_time_last}}</span></div>
          <div v-if="item.business_form" class="mechanism f14 mt10 disib" :class="item.companytype_code==='1001574645421581000000001'?'cnormal1 bgcnormal1':(item.companytype_code==='1001574645421581000000002'?'cnormal2 bgcnormal2':'cnormal3 bgcnormal3')">{{item.business_form}}</div>
        </div>
      
             </van-list>
          </div>
            <empty v-else-if="!items.length&&finished==true" title="暂无溯源信息" />
        
          
    </div>

  </div>
</template>
<script>
import Nav from "../../../components/Nav";
import search from "../../../components/search";
import axios from "../../../axios/index.js";
import empty from "../../../components/empty";
export default {
  name: "my-order",
  components: {Nav,search,empty},
  data() {
    return {
      items:[],
       params: {
        filing_state: "3",
        pager_offset: 0,
        pager_openset: 10,
        company_name: "",
        query_param:'food_source_countbig'
      },
      loading: false,
      finished: false,
    };
  },
  created(){

  },

mounted(){
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
       axios.get("app/company/search", this.params).then(v => {
        if (v.code == 200) {
            this.items = this.items.concat(v.data.companyList);
            this.loading = false;
              if (v.data.companyList.length < 10) {
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
.my-order {
  .my-order-nav{position: fixed;left: 0px;top: 0px;z-index: 100;
  .record{padding-top: 54px;
   img {
    width: 25px;
    height: 25px;
    position: absolute;
    top: 69px;
    left: 20px;
    z-index: 100;
  }}}
  /deep/ .van-tabs{
  .van-tabs__nav{.van-tab{font-size: 16px;}.van-tabs__line{display: none;}.van-tab--active{color: #e8864c;font-size: 20px;}}
  } 
  /deep/ .van-tabs__wrap--scrollable .van-tab{flex-basis: 20% !important; }
  /deep/ .van-cell__value,.van-cell__right-icon { display: contents;color: #D52E3B}
  .reviewed {
    border-radius:5px;
    .address {
      color: #A6A6A6;
      width: 95%;
    }
    .mechanism {
      padding:8px 10px;
    }
    span {
      color: #A6A6A6;
      top: 45px;
      right: 10px;
    }
  }
}
</style>