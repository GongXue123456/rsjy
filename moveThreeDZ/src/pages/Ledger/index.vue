<template>
  <div  class="body">
    <Nav title="台账管理" />
    <van-row class="first">
      <van-col span="24">
         <div class="user-name"><div class="name f18 pl20">{{company_name}}</div></div>
         <div class="jiange  "></div>
      </van-col>
    </van-row>
    <van-row  class="second mt15 bgcfff pb0">
      <van-col  span="8" >
          <div class="" @click="$router.push('/sterilize?id='+company_code)">
            <img src="../../assets/img/xiaodu.png" width="40" />
            <p>场所清洁</p><p class="mt10">消毒记录</p>
          </div>
      </van-col>
      <van-col  span="8" >
          <div class="" @click="$router.push('/purchase?id='+company_code)">
            <img src="../../assets/img/jinhuo.png" width="40" />
            <p>进货记录</p>
          </div>
      </van-col>
      <van-col class=""  span="8" >
          <div class=""  @click="$router.push('/mixtureInfo?id='+company_code)">
             <img src="../../assets/img/touliao.png" width="40" />
              <p>投料记录</p>
          </div>
      </van-col>
      <van-col class=""  span="8" >
          <div class="" @click="$router.push('/additive?id='+company_code)">
            <img src="../../assets/img/tianjiaji.png" width="40" />
            <p>食品添加剂</p><p class="mt10">使用记录</p>
          </div>
      </van-col>
      <van-col class=""  span="8"  >
          <div class="" @click="$router.push('/productCheck?id='+company_code)">
             <img src="../../assets/img/jianyan.png" width="40" />
              <p>产品检验记录</p>
          </div>
      </van-col>
      <van-col class=""  span="8" >
          <div class="" @click="$router.push('/storage?id='+company_code)">
            <img src="../../assets/img/ruku.png" width="40" />
            <p>成品入库记录</p>
          </div>
      </van-col>
      <van-col  span="8" >
          <div class="foodSample" @click="$router.push('/sale?id='+company_code)">
             <img src="../../assets/img/xiaoshou.png" width="40" />
              <p>产品销售记录</p>
          </div>
      </van-col>
      <van-col  span="8" >
          <div class="" @click="$router.push('/unqualified?id='+company_code)">
             <img src="../../assets/img/buhege.png" width="40" />
              <p>不合格产品记录</p>
          </div>
      </van-col>
      
      
      
    </van-row>
  </div>
</template>
<script>
import Nav from "../../components/Nav";
import { local } from '../../utils/index'
// import axios from "../../axios/index.js";

export default {
  components: {
    Nav
  },
  data() {
    return {
      show: false,
      // fullHeight:document.documentElement.clientHeight-145,
      user_type:'',
      company_code:'',
      company_name:'',
      user_code:'',
      user_name:local.get("user").user_name,
    };
  },
  mounted() {
      this.company_name=this.$route.query.name;
       this.company_code=this.$route.query.id;
  },
  methods: {

  }
};
</script>
<style lang="less" scoped>
.body{background-color: #fff !important;
    font-size: 24px;
    height: 100vh;
}
.first{
   padding-top: 54px;
   height: 60px;
   line-height: 60px;
   background-color: #fff;
   .user-name {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #000;
    
  }
}

.second{
  .van-col{
    height: 130px;
    padding-top: 30px;
    text-align: center;
    background-color: #fff;
    display: flex;
    justify-content: center;
    p{
  color: #323232;
  margin-top: 10px;
  font-size: 15px;
}
  }
}
</style>