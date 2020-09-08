<template>
  <div class="search-view bgc-h100">
    <HeadSearch @myvalue="ser" :name.sync="params.ps_main_title" type="bbb"></HeadSearch>
    <div v-if="show"  class="search-histroy p15" style="position: absolute;top: 57px;bottom: 0;width: 100%;">
      <div class="search-histroy-title f16 ">历史搜索</div>
      <div class="search-histroy-content f14" >
        <div class="list" v-for="(item, index) in history_item"  v-bind:class="{'general_bgc cfff':item === params.ps_main_title} " :key="index" @click="choice_histroy(item)">{{item}}</div>
      </div>
  
    </div>
   
    <div v-else-if="!show&&params.ps_main_title!=''" style="position: absolute;top: 57px;bottom: 0;width: 100%;overflow-y: scroll;">
      <div class="lists p15" v-for="(item, index) in items" :key="index">
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
              <div slot="tags" class="mb10">
               {{item.ps_attr}}
                <!-- <van-tag plain type="danger" class="general_border general_color">找相似</van-tag> -->
              </div>
              <div slot="tags" class="c91">
                市场参考价&nbsp;&nbsp;
                <span class="f16 general_color">¥&nbsp;{{item.ps_price_sell.toFixed(2)}}/{{item.ps_unit}}</span>
                <van-tag
                  plain
                  class="fr addCar general_bgc tc iconfont f20 icon-gouwuche cfff"
                  @click.stop="addCar(item.ps_id)"
                  :data-id="item.ps_id"
                ></van-tag>
              </div>
            </van-card>
          </van-col>
        </van-row>
      </div>
      <div class="noprimaryword" v-show="items.length == 0? true: false">未找到搜索关键词</div>
    </div>
  </div>
</template>
<script>
import HeadSearch from "../components/common/HeadSearch";
import { serProductspec, getCartQuery, getCartAdd,serhistory } from "../api";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import { local } from "@/until/data";
export default {
  name: "search-view",
  components: {
    HeadSearch
  },
  data() {
    return {
      params: {
        pager_offset: 0,
        pager_openset: 999,
        ps_main_title: "",
        c_id:local.get('userinfo').c_id
      },
      params1:{
        c_id:local.get('userinfo').c_id
      },
      items: [],
      user: local.get("userinfo"),
      history_item:[],
      show:true
    };
  },
  created() {
    if (!this.user) {
      this.$router.push({
        name: "LoginView"
      });
    }
    if(local.get('searchval')){
     this.show=false
 this.params.ps_main_title = local.get('searchval');
 this.params.c_id=local.get('userinfo').c_id;
 if(this.params.ps_main_title==''){
    this.show=true
    this.$toast("请输入搜索关键字");
 }else{
this.onLoad();
 }
    }else{
      this.gethistory()
    }
   
  },
  methods: {
    choice_histroy(val){
      this.params.ps_main_title = val;
     
    },
    ser(value) {
      this.params.ps_main_title = value;
       if(this.params.ps_main_title==''){
          this.show=true
    this.$toast("请输入搜索关键字");
 }else{
this.onLoad();
 }
    },
    gethistory(){
       let self = this;
      let params1 = this.params1;
       serhistory(params1).then(v => {
      self.history_item=v.data

      });
    },
    onLoad() {
      let self = this;
      let params = this.params;
     
      serProductspec(params).then(v => {
        this.show=false
        self.items = v.data;
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
    addCar(id) {
      let ids = [];
      ids.push(id);
      let data = { list: ids, c_id: this.user.c_id };
      getCartAdd(data).then(response => {
        if (response.code == 210) {
          this.$toast("已经添加到购物车");
          let data1 = {
            c_id: this.user.c_id
          };
          getCartQuery(data1).then(response => {
            if (response.code == 200) {
              var data = response.data;
              this.$store.dispatch("cart/addGoods", data);
            }
          });
        } else {
          this.$toast({
            message: response.msg,
            duration: 5000
          });
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.search-view {
  .van-card {
    margin-top: 0px;
    background: #fff;
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
  .search-histroy{
   
    color: #333333;
    font-family:PingFang SC;
 .search-histroy-title{
    font-weight:bold;
line-height:13px;
  }
  .search-histroy-content .list{
    margin: 15px 10px 0 0;
    border-radius:4px;
   padding: 8px 15px;
   background-color: #F5F5F5;
       display: inline-block;
  }
  }
 
}
</style>

