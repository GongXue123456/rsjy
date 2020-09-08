<template>
  <div class="large-list bgcfff lists1 borr10 ">
    <div class="bgcfff list borr10" v-for="(item,index) in companyList" :key="index">
      <div @click="$router.push('/companyDetail?id='+item.c_id+'&url='+item.c_logo_url+'&name='+item.c_name)">
        <div class="pr p10 tc">
          <van-image v-if="item.c_logo_url" :src="item.c_logo_url"/>
           <img class="van-image" v-else src="../../../../assets/images/company.png" >
      </div>
      <div class="tc">{{item.c_name}}</div>
      </div>
    </div>
    
    <i class="mr5 iconfont iconxiangyou"  @click="$router.push('/company')"> </i>
  </div>
</template>
<script>
import { getHotCompany } from "../../../../api/index";
export default {
  name: "large-list",
  data() {
    return {
      companyList: []
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
        let data = {
        pager_offset: 0
      };
      getHotCompany(data).then(response => {
        if (response.code == 200) {
          console.log(response.data.pager_list)
          this.companyList = response.data.pager_list;
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
  -webkit-user-select: none;
  user-select: none;
  box-sizing: content-box;
  padding-bottom: 0.75rem;
  width: 344px;
  margin: auto;
      display: flex;
    align-items: center;
    justify-content: space-between;
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
      border-radius: 4px;
    }
  }
}
</style>
