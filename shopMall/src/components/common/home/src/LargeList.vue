<template>
  <div class="large-list bgcfff lists1 borr10">
    <div class="bgcfff list borr10" v-for="(item,index) in largeList" :key="index">
      <div class="pr p10 tc">
        <van-image fit="cover" :src="item.b_logo" />
      </div>
      <div class="tc">{{item.b_name}}</div>
    </div>
  </div>
</template>
<script>
import { getHomeLarge } from "../../../../api/index";
export default {
  name: "large-list",
  data() {
    return {
      largeList: []
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      getHomeLarge().then(response => {
        if (response.code == 200) {
          this.largeList = response.data;
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
.lists1 {
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
  width: 344px;
  margin: auto;
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
    .van-image {
      width: 77px;
      height: 58px;
    }
  }
}
</style>
