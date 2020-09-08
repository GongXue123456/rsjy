<template>
  <div class="hot-list aaa mt50">
    <div class="bgcfff list borr10" v-for="(item,index) in hotList" :key="index">
      <div class="pr list-img" @click="$router.push('/detail?id='+item.p_id+'&psid='+item.ps_id)">
        <img class="w h borr10" :src="item.img_thumb" />
        <span class="pa top ">TOP.{{index+1}}</span>
      </div>
      <div class="c28 one_line">{{item.ps_main_title}}</div>
      <div>
        <span class="general_color f12">
          ￥
          <span class="f15">{{item.ps_price_sell.toFixed(2)}}</span>
        </span>/{{item.ps_unit}}
      </div>
    </div>
  </div>
</template>
<script>
import { getHomeHot } from "../../../../api/index";
export default {
  name: "hot-list",
  data() {
    return {
      hotList: []
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      getHomeHot().then(response => {
        if (response.code == 200) {
          this.hotList = response.data;
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
.aaa {
  overflow: hidden;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-user-select: none;
  user-select: none;
  box-sizing: content-box;
  padding-bottom: 0.75rem;
  position: absolute;
  width: 17.2rem;
  .list {
    position: relative;
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    box-sizing: border-box;
    min-width: 0;
    color: #7d7e80;
    font-size: 14px;
    cursor: pointer;
    -webkit-box-flex: 0;
    -webkit-flex: 0 0 25%;
    flex: 0 0 25%;
    margin-left: 10px;
    .list-img {
      width: 87px;
      height: 100px;
    }
    img {
      padding: 0.25rem;
    }
    .top {
      bottom:5px;
      left: 5px;
      font-size: 15px;
      color: #fff;
      padding: 3px 8px;
      border-radius: 0px 10px 0px 10px;
        background: -webkit-gradient(linear, 0% 25%, 75% 100%, from(#15A4FF), to(#20CAE3));
    }
  }
}
</style>

