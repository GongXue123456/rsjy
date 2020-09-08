<template>
  <div class="home-view has-header">
    <HeadSearch type="home"></HeadSearch>
    <swiper class="home-swiper pt10"></swiper>
    <div class="mt20">
      <div class="product-status">
        <van-cell class="transparent cfff mt20 tr p0 pr10" title  value="" />
        <HotList></HotList>
      </div>
    </div>
    <!-- <div>
      <h2 class="f18 tl">非常大牌</h2>
      <LargeList></LargeList>
    </div> -->
    <div>
      <h2 class="f18 tl">热门店铺</h2>
      <HotCompany></HotCompany>
    </div>
    <div>
      <h2 class="f18 tl">新品推荐</h2>
      <NewList></NewList>
    </div>
    <div class="mb50">
      <h2 class="f18 tl">猜你喜欢</h2>
      <List mold="home"></List>
    </div>
    <div class="order " @click="orderMeun">
      <img src="../assets/images/menuorder.png">
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import HeadSearch from "../components/common/HeadSearch";
import List from "../components/common/List";
import { Swiper, HotList, LargeList,NewList,HotCompany } from "../components/common/home/index";
export default {
  name: "home-view",
  components: {
    HeadSearch,
    Swiper,
    List,
    HotList,
    LargeList,
    NewList,
    HotCompany
  },
  data() {
    return {};
  },
  created() {},
  methods: {
    orderMeun() {
         this.$router.push({
        path: '/ordermenu'
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.home-view {
  .search {
    width: 100%;
    position: fixed;
    top: 0px;
    left: 0px;
    background: url(../assets/images/jingdong-bg.png) no-repeat 0px 0px !important;
    background-size: cover !important;
    z-index: 100;
  }
  background: url(../assets/images/jingdong-bg.png) no-repeat 0px 0px;
  background-size: cover;
  width: 100%;
  z-index: 99;
  height: 140px;
  .home-swiper {
    width: 344px;
    height: 166px;
    margin: auto;
    margin-top: 50px;
    cursor: pointer;
  }
}
.sub-nav {
  margin: 0 1.8rem;
  padding-top: 0.2rem;
}
.product-status {
  overflow: hidden;
  background: url(../assets/images/remai.png) no-repeat 0px 0px;
  background-size: cover;
  width: 344px;
  height: 218px;
  margin: auto;
  border-radius: 10px;
  .van-cell__title {
    font-size: 30px;
    font-weight: 600;
    text-align: left;
  }
  .van-cell__value,
  .van-cell__right-icon {
    color: #fff;
    text-align: right !important;
  }
}
.order {
  position: fixed;
  right:0px;
  bottom: 60px;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
}
</style>
