<template>
  <div class="shop-list">
    <div class="w shop-list-nav pb15">
      <!-- <HeadSearch type="shoplist" @myvalue="getMyValue"></HeadSearch> -->
      <van-tabs
        :line-width="70"
        swipeable
        title-active-color="#45B7FF"
        :sticky="true"
        @click="onClick"
        v-model="cate_index"
      >
        <van-tab v-for="(item,index) in title" :title="item.name" :key="index">
          <!-- <div v-if="item.name == '常购清单'">
            <van-tabs
              type="card"
              class="sec_tabs mt15 van-tabs2"
              swipeable
              title-active-color="#D52E3B"
              :sticky="true"
              :ellipsis="false"
            >
              <van-tab class="sec_tab c28 bgcfff">
                <div class="tab-title" slot="title" @click="toggleCate()">全部</div>
              </van-tab> 
              <van-tab class="sec_tab c28 bgcfff" v-for="(item1,index1) in nav" :key="index1">
                <div
                  class="tab-title"
                  slot="title"
                  @click="toggleCate(item1)"
                  :data-id="item1.c_id"
                >{{item1.c_name}}</div>
              </van-tab>
            </van-tabs>
          </div>
          <div v-if="item.name == '收藏菜品'">
            <van-tabs
              type="card"
              class="sec_tabs mt15 van-tabs2"
              swipeable
              title-active-color="#D52E3B"
              :sticky="true"
              :ellipsis="false"
            >
             <van-tab class="sec_tab c28 bgcfff">
                <div class="tab-title" slot="title" @click="toggleCate()">全部</div>
              </van-tab> 
              <van-tab class="sec_tab c28 bgcfff" v-for="(item1,index1) in nav1" :key="index1">
                <div
                  class="tab-title"
                  slot="title"
                  @click="toggleCate(item1)"
                  :data-id="item1.c_id"
                >{{item1.c_name}}</div>
              </van-tab>
            </van-tabs>
          </div> -->
          <div v-if="item.name == '收藏菜谱'">
            <van-tabs
              type="card"
              class="sec_tabs mt15 van-tabs2"
              swipeable
              title-active-color="#45B7FF"
              :sticky="true"
              :ellipsis="false"
            >
              <van-tab class="sec_tab c28 bgcfff">
                <div class="tab-title" slot="title" @click="toggleCate()">全部</div>
              </van-tab>
              <van-tab class="sec_tab c28 bgcfff" v-for="(item1,index1) in nav2" :key="index1">
                <div
                  class="tab-title"
                  slot="title"
                  @click="toggleCate(item1)"
                  :data-id="item1.c_id"
                >{{item1.c_name}}</div>
              </van-tab>
            </van-tabs>
          </div>
        </van-tab>
      </van-tabs>
    </div>
    <div v-if="goodList.length" >
      <ul class="goods-list" :style="'height:'+orderHight+'px;padding-top:'+height+'px;margin-bottom:'+height1+'px'">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <List v-if="cate_index==0" :items="goodList" v-on:allcheck="allcheck"></List>
          <DishesList v-if="cate_index==1" :items="goodList" @cancelcolect="cancelcolect"></DishesList>
          <ComboList v-if="cate_index==2" :items="goodList" @cancelcolect="cancelcolect"></ComboList>
        </van-list>
      </ul>
      <!-- -->
       <van-submit-bar v-if="cate_index==0" button-text="加入购物车" @submit="onSubmit">
      <van-checkbox class="f15" @click="allselect" v-model="ischecked" checked-color="#45B7FF">全选</van-checkbox>
    </van-submit-bar>
    </div>
     <div v-else-if="!goodList.length&&finished==true">
        <div class="tc pt150 pb100">
          <div class="wrap_cart">
         <img src="../assets/images/changgou_null.png">
        </div>
          <p v-if="cate_index==0" class="text_empty f14 pb10 c9D">暂无常购清单</p>
           <p v-if="cate_index==1" class="text_empty f14 pb10 c9D">暂无收藏菜品</p>
            <p v-if="cate_index==2" class="text_empty f14 pb10 c9D">暂无收藏菜谱</p>
        </div>
      </div>
   
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import {
  getCategoryAll,
  getProductspecOften,
  getCartAdd,
  getCartQuery,
  getSearchCollectPs,
  getCategoryCollect,
  getSearchCollectCombo,
  getCategoryOften
} from "../api/index";
import HeadSearch from "../components/common/HeadSearch";
import {
  List,
  DishesList,
  ComboList
} from "../components/common/shoplist/index";
import { local } from "@/until/data";
export default {
  name: "shop-list",
  props: ["type"],
  components: { List, HeadSearch, DishesList, ComboList },
  data() {
    return {
      checked: false,
      nav: [],
      nav1: [],
      nav2: [
        { c_id: 7, c_name: "热菜" },
        { c_id: 8, c_name: "凉菜" },
        { c_id: 9, c_name: "小吃" }
      ],
      title: [{ name: "常购清单" }, { name: "收藏菜品" }, { name: "收藏菜谱" }],
      goodList: [],
      loading: false,
      finished: false,
      isLoading: false,
      cate_index: local.get('cate_index'), // 当前分类项下标
      filter_index: 0, // 当前条件筛选项下标
      list: [],
      ischecked: false,
      c_id: "",
      pageNumber: 0,
      ps_main_title: "",
      category_id: "",
      user: local.get("userinfo"),
       orderHight:'',
       height:'',
       height1:''
    };
  },
  created() {
    if (!this.user) {
      this.$router.push({
        name: "LoginView"
      });
    }  
  },
   mounted: function () {
       this.orderHight=document.documentElement.clientHeight || document.body.clientHeight;
       this.onLoad()
    },
  methods: {
    allcheck: function (val) {
        this.ischecked = val
      },
    getMyValue(data){
       this.ps_main_title = data
     this.goodList = [];
      this.loading = false;
      this.finished = false;
      this.pageNumber = 0;
      if (this.cate_index == 0) {
        this.getImgList();
      } else if (this.cate_index == 1) {
        this.getDishesList();
      } else if (this.cate_index == 2) {
        this.getComboList();
      }
    },
    getData() {
      var data = { c_id: this.user.c_id };
      getCategoryOften(data).then(response => {
        if (response.code == 200) {
          this.nav = response.data;
        } else {
          this.$toast({
            message: response.msg,
            duration: 5000
          });
        }
      });
      getCategoryCollect(data).then(response => {
        if (response.code == 200) {
          this.nav1 = response.data;
        } else {
          this.$toast({
            message: response.msg,
            duration: 5000
          });
        }
      });
    },
    getImgList() {
      var data = {
        c_id: this.c_id,
        o_customer_id: this.user.c_id,
        ps_main_title: this.ps_main_title,
        pager_offset: this.pageNumber
      };
      getProductspecOften(data).then(response => {
        this.goodList = this.goodList.concat(response.data);
        this.loading = false;
        if (response.data.length < 10) {
          this.finished = true;
        }
        this.pageNumber = this.pageNumber + 10;
      });
    },
    getDishesList() {
      var data = {
        c_id: this.user.c_id,
        category_id: this.c_id,
        ps_main_title: this.ps_main_title,
        pager_offset: this.pageNumber
      };

      getSearchCollectPs(data).then(response => {
        this.goodList = this.goodList.concat(response.data);
        this.loading = false;
        if (response.data.length < 10) {
          this.finished = true;
        }
        this.pageNumber = this.pageNumber + 10;
      });
    },
    cancelcolect() {
      this.goodList = [];
      this.loading = false;
      this.finished = false;
      this.pageNumber = 0;
      if (this.cate_index == 1) {
        this.getDishesList();
      } else if (this.cate_index == 2) {
        this.getComboList();
      }
    },
    getComboList() {
      var data = {
        c_id: this.user.c_id,
        bill_id: this.c_id,
        ps_main_title: this.ps_main_title,
        pager_offset: this.pageNumber
      };
      getSearchCollectCombo(data).then(response => {
        this.goodList = this.goodList.concat(response.data);
        this.loading = false;
        if (response.data.length < 10) {
          this.finished = true;
        }
        this.pageNumber = this.pageNumber + 10;
      });
    },
    onClick(name, title) {
      this.goodList = [];
      this.c_id = "";
      this.pageNumber = 0;
      this.loading = false;
      this.finished = false;
      if (title == "常购清单") {
        this.cate_index = 0;
          local.set('cate_index',this.cate_index)
        this.getImgList();
         this.height= 60; 
          this.height1=100; 
      } else if (title == "收藏菜品") {
        this.cate_index = 1;
        local.set('cate_index',this.cate_index)
         this.height= 60; 
          this.height1=100; 
        this.getDishesList();
      } else {
        this.cate_index = 2;
        local.set('cate_index',this.cate_index)
           this.height= 110; 
           this.height1=50; 
        this.getComboList();

      }
    },
    allselect() {
      //全选
      this.ischecked = !this.ischecked;
      this.ischecked
        ? this.goodList.forEach(item => {
            item.ischcked = true;
          })
        : this.goodList.forEach(item => {
            item.ischcked = false;
          });
    },
    onLoad() {
      setTimeout(() => {
       if (this.cate_index == 0) {
          this.height= 60; 
          this.height1=100; 
        this.getImgList();
      } else if (this.cate_index == 1) {
         this.height= 60; 
          this.height1=100; 
        this.getDishesList();
      } else {
          this.height= 110; 
           this.height1=50; 
        this.getComboList();
      }
      }, 500);
    },
    toggleCate: function(item1) {
      this.goodList = [];
      this.loading = false;
      this.finished = false;
      this.pageNumber = 0;
      if (item1 == undefined) {
        this.c_id = "";
      } else {
        this.c_id = item1.c_id;
      }
      if (this.cate_index == 0) {
        this.getImgList();
         this.height= 60; 
      this.height1=100
      } else if (this.cate_index == 1) {
        this.getDishesList();
         this.height= 60; 
      this.height1=100
      } else {
        this.getComboList();
         this.height= 110; 
      this.height1=50
      }
    },

    onSubmit: function() {
      var ids = [];
      this.goodList.forEach(item => {
        if (item.ischcked == true) {
          ids.push(item.ps_id);
          // localStorage.setItem("orderlist",JSON.stringify(data1));
          // this.$router.push({
          //   name: "ConfirmOrderView",
          // });
        }
      });

      if (ids.length === 0) {
        this.$toast("您还没有选择宝贝哦");
        return false;
      }
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
<style lang="scss">
.shop-list-nav {
  position: fixed;
  left: 0px;
  top: 0px;
  background-color: #f5f5f5;
  z-index: 100;
}
.van-grid {
  position: fixed;
  z-index: 101;
}
.van-overlay {
  z-index: 100 !important;
  top: 57px;
}
.selectBox {
  height: 50px;
  line-height: 55px;
  text-align: center;
  font-size: 16px;
}
.van-image {
  width: 64px;
  height: 64px;
}
.nav_po {
  font-size: 12px;
  text-align: center;
}
.banner_img {
  padding: 5px;
  img {
    border-radius: 5px;
  }
}
.nav_po .nav_title {
  margin: 0px;
  color: grey;
  font-size: 12px;
}
.nav_bar {
  padding-top: 15px;
}
.nowDay-sell {
  line-height: 95px;
  height: 65px;
  text-align: center;
  font-weight: bolder;
  font-size: 12px;
}
.van-tabs__nav {
  background-color: transparent;
  .van-tab {
    color: #282828;
  }
  .van-tabs__line {
    background-color: #45B7FF;
  }
}
.van-tabs2 {
  .van-tabs__wrap {
    height: inherit;
    .van-tabs__nav--card {
      background-color: #f5f5f5;
      box-sizing: border-box;
      height: inherit;
      border: none;
      border-radius: 0px;

      .van-tab {
        padding: 8px 13px;
        background-color: #fff !important;
         border: 1px solid #fff !important;
        color: #282828 !important;
        line-height: 1;
        border-right: none;
        margin-right: 10px;
        border-radius: 4px;
      }
      .van-tab--active {
        color: #45B7FF !important;
        border: 1px solid #45B7FF !important;
      }
    }
  }
}

.goods-list {
  padding-top: 8px;
  overflow-y: scroll;
}
.van-card {
  background-color: #fff;
}
.van-submit-bar {
  bottom: 50px;
  .van-submit-bar__bar {
    justify-content: space-between;
    .van-checkbox {
      padding-left: 15px;
    }
  }
}
.empty_cart {
  font-size: 55px;
  color: #ececec;
}
.wrap_cart {
  display: inline-block;
  padding: 15px;
  border-radius: 50%;
}
.buy_text {
  color: #b5b4b4;
}
.shop-list {
  .van-search__content {
    background-color: #fff;
  }
  .wrap_cart img{width: 125px}
.go_index{display: inline-block;padding: 10px 20px;border-radius:4px;}
}
</style>
