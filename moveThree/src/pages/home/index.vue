<template>
  <div>
    <Nav title="首页" val='2'/>
    <van-row class="first">
      <van-col span="24">
         <div class="user-name"><div class="name pl20">您好，{{user_name}}</div><span class="ml20 disib" v-if="user_type=='平台管理员'||user_type=='超级管理人员'||user_type=='协管员'">三小管理员</span><span v-else-if="user_type=='举办者'||user_type=='农家乐'||user_type=='乡厨酒店'||user_type=='食堂'||user_type=='配送企业'||user_type=='食品经营者'">小作坊</span><span v-else-if="user_type=='乡厨'">乡厨</span></div>
         <p>欢迎进入食安数智云平台，请选择您接下来的操作</p>
      </van-col>
    </van-row>
    <van-row v-if="user_type=='平台管理员'||user_type=='超级管理人员'||user_type=='协管员'" class="second p15" >
      <van-col span="12" class="left"  :style="{ width: fullWidth + 'px' }">
          <div class=""  @click="$router.push('/record')" >
            <img src="../../assets/img/dengjibeian.png" width="35" />
            <span >备案管理</span>
          </div>
      </van-col>
      <van-col class="right ml15" span="12" :style="{ width: fullWidth + 'px' }">
         <van-col  span="24">
            <div class="train" @click="$router.push('/patrol')">
              <img src="../../assets/img/patrol supervision.png" width="35" />
            <span>巡查管理</span>
           </div>
         </van-col>
          <van-col  span="24" >
          <div class="userinfo"  @click="$router.push('/ledgerList')">
            <img src="../../assets/img/dengjibeian.png" width="35" />
            <span>台账管理</span>
          </div>
      </van-col>
         <!-- <van-col  span="24">
            <div class="news" @click="$router.push('/news')">
              <img src="../../assets/img/news.png" width="35" />
              <span>新闻宣传</span>
            </div>
         </van-col> -->
      </van-col>
      <!-- <van-col   span="12" :style="{ width: fullWidth + 'px' }">
          <div class=""  @click="$router.push('/foodSource')">
            <img src="../../assets/img/food-origin.png" width="35" />
           <span >溯源管理</span>
          </div>
      </van-col> -->
      <!-- <van-col class="ml15"  span="12" :style="{ width: fullWidth + 'px' }">
          <div class="" @click="$router.push('/sampleListController')">
            <img src="../../assets/img/food.png" width="35" />
           <span >留样管理</span>
          </div>
      </van-col> -->
      <!-- <van-col  span="12" :style="{ width: fullWidth + 'px' }">
        <a href='http://sx.rsjykj.com.cn:9991'>
          <div class="news"   >
            <img src="../../assets/img/remote law enforcement.png" width="35" />
            <span >远程执法</span>
          </div>
        </a>
      </van-col> -->
      <!-- <van-col class="ml15" span="12" :style="{ width: fullWidth + 'px' }">
          <div class="userinfo"  @click="$router.push('/ledgerList')">
            <img src="../../assets/img/dengjibeian.png" width="35" />
            <span>台账管理</span>
          </div>
      </van-col> -->
      <!-- <van-col  span="12" :style="{ width: fullWidth + 'px' }">
          <div class="foodSample"  @click="$router.push('/casecenter')">
             <img src="../../assets/img/case-center.png" width="35" />
              <span>案件中心</span>
          </div>
      </van-col> -->
      <van-col   span="12" :style="{ width: fullWidth + 'px' }">
          <div class="foodSample" @click="toUser">
             <img src="../../assets/img/personal message.png" width="35" />
              <span>个人消息</span>
          </div>
      </van-col>
       <van-col class="ml15" span="12" :style="{ width: fullWidth + 'px' }">
          <div class="userinfo" @click="userCenter">
            <img src="../../assets/img/9.png" width="35"/>
            <span>个人中心</span>
          </div>
      </van-col>
    </van-row>
    <van-row v-if="user_type=='食品经营者'&&company_code" class="second p15" >
      <van-col class="left"  span="12" :style="{ width: fullWidth + 'px' }">
          <div  class=""  @click="$router.push('/UserList')">
            <img src="../../assets/img/dengjibeian.png" width="35" />
            <span >登记备案</span>
          </div>
      </van-col>
      <van-col class="right ml15"  span="12" :style="{ width: fullWidth + 'px' }">
         <van-col  span="24">
            <div class="train"  @click="$router.push('/train')">
              <img src="../../assets/img/training examination.png" width="35" />
            <span>培训考试</span>
           </div>
         </van-col>
          <van-col  span="24">
          <div class="foodSample" @click="$router.push('/company?urlName=announce')">
             <img src="../../assets/img/xinxigongshi.png" width="35" />
              <span>信息公示</span>
          </div>
      </van-col>
         <!-- <van-col  span="24">
            <div class="news" @click="$router.push('/news')">
              <img src="../../assets/img/news.png" width="35" />
              <span>新闻宣传</span>
            </div>
         </van-col> -->
      </van-col>
      <!-- <van-col  span="12" :style="{ width: fullWidth + 'px' }">
          <div class="" @click="$router.push('/company?urlName=foodSourceUser')">
            <img src="../../assets/img/food-origin.png" width="35" />
            <span>食材溯源</span>
          </div>
      </van-col> -->
      <!-- <van-col class="ml15"  span="12" :style="{ width: fullWidth + 'px' }">
          <div class="" @click="$router.push('/company?urlName=sampleList')">
            <img src="../../assets/img/food.png" width="35" />
            <span>食品留样</span>
          </div>
      </van-col> -->
      <!-- <van-col  span="12" :style="{ width: fullWidth + 'px' }">
          <div class="foodSample" @click="$router.push('/kitchenWasteRefuse')">
             <img src="../../assets/img/kitchen waste.png" width="35" />
              <span>餐厨垃圾</span>
          </div>
      </van-col> -->
      <!-- <van-col class="ml15"  span="12"  :style="{ width: fullWidth + 'px' }">
          <div class="foodSample" @click="$router.push('/company?urlName=announce')">
             <img src="../../assets/img/xinxigongshi.png" width="35" />
              <span>信息公示</span>
          </div>
      </van-col> -->
      <van-col  span="12" :style="{ width: fullWidth + 'px' }">
          <div class="foodSample" @click="$router.push('/company?urlName=selfexamination')">
             <img src="../../assets/img/selffind.png" width="35" />
              <span>自查自纠</span>
          </div>
      </van-col>
      <van-col class="ml15"  span="12" :style="{ width: fullWidth + 'px' }">
        <!-- <a  href='http://118.122.73.129:8080/qy/receiveMessLog/viewMessLog'> -->
          <div class="foodSample" @click="toUser">
             <img src="../../assets/img/personal message.png" width="35" />
              <span>个人消息</span>
          </div>
        <!-- </a> -->
      </van-col>
       <van-col  span="24">
          <div class="userinfo"  @click="$router.push('/ledgerList')">
            <img src="../../assets/img/dengjibeian.png" width="35" />
            <span>台账管理</span>
          </div>
      </van-col>
       <van-col  span="24" class="mb0">
        <!-- <a href='http://118.122.73.129:8080/qy/receiveThree/center'> -->
          <div class="userinfo" @click="userCenter">
            <!-- @click="userCenter" -->
            <img src="../../assets/img/9.png" width="35"   />
            <span>个人中心</span>
          </div>
        <!-- </a> -->
      </van-col>
    </van-row>
    <van-row v-if="user_type=='食品经营者'&&(company_code==null||company_code==''||company_code=='undefined')" class="second p15" >
       <van-col  span="24">
          <div class="userinfo"  @click="$router.push('/bodyType')">
            <img src="../../assets/img/dengjibeian.png" width="35" />
            <span>完善备案</span>
          </div>
      </van-col>
       <van-col  span="24" class="mb0">
        <!-- <a href='http://118.122.73.129:8080/qy/receiveThree/center'> -->
          <div class="userinfo" @click="userCenter" >
            <img src="../../assets/img/9.png" width="35" />
            <span>个人中心</span>
          </div>
        <!-- </a> -->
      </van-col>
    </van-row>
     <van-popup v-model="show" :append-to-body="true">
        <img src="../../assets/img/01_03.png" width="35" />
          <div class="toRecord"  @click="$router.push('/bodyType')"></div>
        <div class="icon ">
        <i class="icon  iconfont iconclose"  @click="close"></i>
        </div>
      </van-popup>
  </div>
</template>
<script>
import Nav from "../../components/Nav";
import Vue from "vue";
import { Popup } from "vant";
import { Button } from "vant";
import { Cell } from "vant";
import { local } from '../../utils/index'
import axios from "../../axios/index.js";
Vue.use(Popup);
Vue.use(Cell);
Vue.use(Button);
export default {
  components: {
    Nav
  },
  data() {
    return {
      show: false,
      user_type:'',
      company_code:'',
      user_code:'',
      user_name:'',
      fullWidth:(document.documentElement.clientWidth-50)/2,
    };
  },
  mounted() {
    this.getUserInfo()
   
  },
  methods: {
    showPoup(){
       if(this.user_type=='平台管理员'||this.user_type=='超级管理员'||this.user_type=='协管员'){
        this.show=false
      }else{
        console.log(this.company_code)
        if(this.company_code===''||this.company_code===null||this.company_code===undefined){
           this.show=true
        }else{
           this.show=false
        }      
      }
    },
    close() {
      this.show = false;
    },
    getUserInfo(){
      axios.get('app/user/single',).then( res => {
        console.log(res)
        this.user_code=res.data.user_code
        if(res.code===200){
           this.company_code=res.data.company_code;
           this.user_type=res.data.user_type;
           this.user_name=res.data.user_name;
           local.set("user", res.data)
          
          this.showPoup()
        }
      })
    },
    toUser(){
      this.$router.push({
        path:'/PersonalInformation',
        query:{
          user_code:this.user_code
        }
      })
    },
    userCenter(){
      this.$router.push({
        path:'/userCenter'
      })
    }
  }
};
</script>
<style lang="less" scoped>
.first{
   margin-top: 54px;
   height: 190px;
   background-color: #00d080 !important;
   background: url("../../assets/img/logo.png") no-repeat 15px 20px;
   background-size: 50px;
   .user-name {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #ffffff;
    padding-top: 70px;
    .name{
      margin-top: 5px;
      font-size: 18px;
      width: 60%;
      overflow: hidden;
      text-overflow: ellipsis;
      -ms-text-overflow: ellipsis;
      display: box;
      display: -webkit-box;
      line-clamp: 1;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }
    span{
      margin-right: 20px;
      font-size: 14px;
      padding: 8px 10px;
    border: 1px solid #ffffff;
    color: #ffffff;
    border-radius: 5px;
    }
  }
   p {
    font-size: 14px;
    color: #ffffff;
    padding-top: 15px;
    padding-left: 20px;
  }
}
span{
  color: #323232;
  font-size: 16px;
}
.second{
  margin-top: -50px;
  .van-col{
    height: 80px;
    line-height: 80px;
    margin-bottom: 15px;
    text-align: center;
    background-color: #fff;
    img{vertical-align:middle;}
  }
  .left{
     height: 175px;
     line-height: 175px;
  }
  .right{background-color: transparent; height: 175px;}
}
.van-popup {
  width:70%;
  background: transparent;
  img {
    width: 100%;
  }
  .toRecord {
    width:100%;
    height: 46px;
    position: absolute;
    bottom: 64px;
    left: 0px;
    border-radius: 5px;
  }
  .icon{
    height: 50px;
    text-align: center;
    line-height: 50px;
  }
 i {
    display: block;
    font-size: 30px;
  }
}
</style>