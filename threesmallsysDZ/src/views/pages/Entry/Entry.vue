<template>
  <div class="entry">
    <div class="main">
      <el-row>
        <el-col :span="24" class="title mb20">
          <img src="../../../assets/image/menu-title.png" />
        </el-col>
        <!-- <el-col :span="24" class="title1 f18 mt20 mb20">请选择您要进入的系统</el-col> -->
      </el-row>
      <el-row :gutter="30">
        <!-- 112.74.29.254    139.155.11.121:8089 -->
        <el-col v-if="manage_type==1" :span="16" class="pr" :offset="4">
         <el-col :span="24">
             <el-col :span="8"   class="mb10 disib" style="display:none">
            <a  class="a_menu1"
              href="javascript:;"
            @click="redirect1($event,'http://data.rsjykj.com.cn/#/map1')"
            >
              <!--  -->
              <div ref="Purple" class="menu menu1 dashuju-menu mt20 pt15">
                   <p class='imgmenu1'  ref="Purple0"></p>
                <p class="title2">G食安</p>
                <p class="p1 title3">集中供餐监管</p>
              </div>
            </a>
          </el-col>
          <el-col :span="8"  class="mb10 disib"  style="display:none">
            <a  class="a_menu6"
              href="javascript:;"
             @click="redirect1($event,user.qyurl+'JKYJLogin/login?user_loginname='+user_loginname+'&user_loginpass='+user_loginpass+'&returnurl=todayData/findByList')"
            >
              <div ref="Purple5" class="menu menu6  dashuju-menu mt20 ml20 pt15">
                   <p class='imgmenu6'  ref="Purple55"></p>
                <p class="title2 mt5">预警中心</p>
                <p class="p1 title3">大数据评估预警</p>
              </div>
            </a>
          </el-col>
          <el-col :span="8"  class="mb10 disib  "  style="display:none">
            <a  class="a_menu2"
              href="javascript:;"
              @click="redirect1($event,'http://cry.rsjykj.com.cn/cry/login')"
              >
              <!--  -->
              <div ref="Purple1" class="menu menu2  dashuju-menu pt15 ml50">
                   <p class='imgmenu2'  ref="Purple11"></p>
                <p class="title2">G食安监</p>
                <p class="p1 title3">供应链溯源监管</p>
              </div>
            </a>
          </el-col>
          </el-col>
         <el-col :span="24">
           <el-col :span="8"  class="mb10 disib  "  >
            <a  class="a_menu3"
              href="javascript:;"
             @click="redirect1($event,user.qyurl+'JKYJLogin/login?user_loginname='+user_loginname+'&user_loginpass='+user_loginpass+'&returnurl=todayData/findByList')"
            >
              <div ref="Purple2" class="menu menu3  dashuju-menu mt20 ml20 pt15">
                   <p class='imgmenu3'  ref="Purple22"></p>
                <p class="title2 mt5">预警中心</p>
                <p class="p1 title3">大数据评估预警</p>
              </div>
            </a>
          </el-col>
              <el-col :span="8"  class="mb10 disib ">
            <a  class="a_menu4"
              href="javascript:;"
              @click="redirect($event,user.qyurl+'login?user_loginname='+user_loginname+'&user_loginpass='+user_loginpass)"
            >
              <div ref="Purple4" class="menu menu4  qunyan-menu">
                <!-- <img class="img" src='../../../assets/image/qunyan-logo.png' src.hover='../../../assets/image/qunyan-logohover.png' /> -->
                  <p class='imgmenu4'  ref="Purple44"></p>
                <p class="title2">中国群宴智慧平台</p>
                <p class="p1 title3">
                  群宴+农家乐+乡村酒店+配送企业
                </p>
              </div>
            </a>
          </el-col>
           
          <el-col  :span="8" class="mb10 disib ">
            <a class="a_menu5"
              href="javascript:;"
              @click="redirect1($event,user.qyurl+'JKYJLogin/login?user_loginname='+user_loginname+'&user_loginpass='+user_loginpass+'&returnurl=weekDayData/findByList')"
            >
              <div ref="Purple3" class="menu menu5  dashuju-menu">
                <p class='imgmenu5'  ref="Purple33"></p>
                <p class="title2">大数据云</p>
                <p class="p1 title3">大数据统计监控</p>
              </div>
            </a>
          </el-col>
         </el-col>
        </el-col>
        <el-col v-if="manage_type==2" :span="16" class="pr" :offset="4">
         <el-col :span="24">
             <el-col :span="8"   class="mb10 disib" style="display:none">
            <a  class="a_menu1"
              href="javascript:;"
              @click="redirect1($event,'http://data.rsjykj.com.cn/#/map1')"
            >
            <!--  -->
              <div ref="Purple" class="menu menu1 dashuju-menu mt20 pt15">
                   <p class='imgmenu1'  ref="Purple0"></p>
                <p class="title2">G食安</p>
                <p class="p1 title3">集中供餐监管</p>
              </div>
            </a>
          </el-col>
          <el-col :span="8"  class="mb10 disib"  style="display:none">
            <a  class="a_menu6"
              href="javascript:;"
             @click="redirect1($event,user.qyurl+'JKYJLogin/login?user_loginname='+user_loginname+'&user_loginpass='+user_loginpass+'&returnurl=todayData/findByList')"
            >
              <div ref="Purple5" class="menu menu6  dashuju-menu mt20 ml20 pt15">
                   <p class='imgmenu6'  ref="Purple55"></p>
                <p class="title2 mt5">预警中心</p>
                <p class="p1 title3">大数据评估预警</p>
              </div>
            </a>
          </el-col>
          <el-col :span="8"  class="mb10 disib  "  style="display:none">
            <a  class="a_menu2"
              href="javascript:;"
              @click="redirect1($event,'http://cry.rsjykj.com.cn/cry/login')"
             >
              <!--  -->
              <div ref="Purple1" class="menu menu2  dashuju-menu pt15 ml50">
                   <p class='imgmenu2'  ref="Purple11"></p>
                <p class="title2">G食安监</p>
                <p class="p1 title3">供应链溯源监管</p>
              </div>
            </a>
          </el-col>
          </el-col>
         <el-col :span="24">
           <el-col :span="8"  class="mb10 disib  "  >
            <a  class="a_menu3"
              href="javascript:;"
             @click="redirect1($event,user.qyurl+'JKYJLogin/login?user_loginname='+user_loginname+'&user_loginpass='+user_loginpass+'&returnurl=todayData/findByList')"
            >
              <div ref="Purple2" class="menu menu3  dashuju-menu mt20 ml20 pt15">
                   <p class='imgmenu3'  ref="Purple22"></p>
                <p class="title2 mt5">预警中心</p>
                <p class="p1 title3">大数据评估预警</p>
              </div>
            </a>
          </el-col>
            <el-col :span="8"  class="mb10 disib ">
            <router-link class="a_menu4" to="/admin/home" target="_blank">
              <div ref="Purple4" class="menu menu4  sanxiao-mune pt30">
                 <p class='imgmenu4'  ref="Purple44"></p>
                <!-- <img  src="../../../assets/image/sanxiao-logo.png" /> -->
                <p class="title2">食安数智云平台</p>
                <p class="p1 title3">餐饮食品经营者+学校机关食堂+大中型餐饮</p>
              </div>
            </router-link>
          </el-col>
          <el-col  :span="8" class="mb10 disib ">
            <a class="a_menu5"
              href="javascript:;"
              @click="redirect1($event,user.qyurl+'JKYJLogin/login?user_loginname='+user_loginname+'&user_loginpass='+user_loginpass+'&returnurl=weekDayData/findByList')"
            >
              <div ref="Purple3" class="menu menu5  dashuju-menu">
                <p class='imgmenu5'  ref="Purple33"></p>
                <p class="title2">大数据云</p>
                <p class="p1 title3">大数据统计监控</p>
              </div>
            </a>
          </el-col>
         </el-col>
        </el-col>
        <el-col v-if="manage_type==3" :span="16" class="pr" :offset="4">
          <el-col :span="24">
             <el-col :span="8"   class="mb10 disib  ">
            <a  class="a_menu1"
              href="javascript:;"
             @click="redirect1($event,'http://data.rsjykj.com.cn/#/map1')" 
            >
             <!-- -->
              <div ref="Purple" class="menu menu1 dashuju-menu mt20 pt15">
                   <p class='imgmenu1'  ref="Purple0"></p>
                <p class="title2">G食安</p>
                <p class="p1 title3">集中供餐监管</p>
              </div>
            </a>
          </el-col>
          <el-col :span="8"  class="mb10 disib  ">
            <a  class="a_menu2"
              href="javascript:;"
             @click="redirect1($event,'http://cry.rsjykj.com.cn/cry/login')"
            >
             <!--  -->
              <div ref="Purple1" class="menu menu2  dashuju-menu pt15 ml50">
                   <p class='imgmenu2'  ref="Purple11"></p>
                <!-- <img src="../../../assets/image/shianjian-logo.png" /> -->
                <p class="title2">G食安监</p>
                <p class="p1 title3">供应链溯源监管</p>
              </div>
            </a>
          </el-col>
          <el-col :span="8"  class="mb10 disib  ">
            <a  class="a_menu6"
              href="javascript:;"
             @click="redirect1($event,user.qyurl+'JKYJLogin/login?user_loginname='+user_loginname+'&user_loginpass='+user_loginpass+'&returnurl=todayData/findByList')"
            >
              <div ref="Purple5" class="menu menu6  dashuju-menu mt20 ml20 pt15">
                   <p class='imgmenu6'  ref="Purple55"></p>
                <!-- <img src="../../../assets/image/shianjian-logo.png" /> -->
                <p class="title2 mt5">预警中心</p>
                <p class="p1 title3">大数据评估预警</p>
              </div>
            </a>
          </el-col>
          </el-col>
         <el-col :span="24">
              <el-col :span="8"  class="mb10 disib ">
            <a  class="a_menu3"
              href="javascript:;"
              @click="redirect($event,user.qyurl+'login?user_loginname='+user_loginname+'&user_loginpass='+user_loginpass)"
            >
              <div ref="Purple2" class="menu menu3  qunyan-menu">
                <!-- <img class="img" src='../../../assets/image/qunyan-logo.png' src.hover='../../../assets/image/qunyan-logohover.png' /> -->
                  <p class='imgmenu3'  ref="Purple22"></p>
                <p class="title2">中国群宴智慧平台</p>
                <p class="p1 title3">
                  群宴+农家乐+乡村酒店+配送企业
                </p>
              </div>
            </a>
          </el-col>
          <el-col :span="8"  class="mb10 disib ">
            <router-link class="a_menu4" to="/admin/home" target="_blank">
              <div ref="Purple4" class="menu menu4  sanxiao-mune pt30">
                 <p class='imgmenu4'  ref="Purple44"></p>
                <!-- <img  src="../../../assets/image/sanxiao-logo.png" /> -->
                <p class="title2">食安数智云平台</p>
                <p class="p1 title3">餐饮食品经营者+学校机关食堂+大中型餐饮</p>
              </div>
            </router-link>
          </el-col>
          <el-col  :span="8" class="mb10 disib ">
            <a class="a_menu5"
              href="javascript:;"
              @click="redirect1($event,user.qyurl+'JKYJLogin/login?user_loginname='+user_loginname+'&user_loginpass='+user_loginpass+'&returnurl=weekDayData/findByList')"
            >
              <div ref="Purple3" class="menu menu5  dashuju-menu">
                <p class='imgmenu5'  ref="Purple33"></p>
                <p class="title2">大数据云</p>
                <p class="p1 title3">大数据统计监控</p>
              </div>
            </a>
          </el-col>
         </el-col>
          
          
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import { local } from "../../../util/util";
export default {
  name: "entry",
  data() {
    return {
      clientWidth: "",
      manage_type: "",
      user_loginname: "",
      user_loginpass: "",
      user:''
    };
  },
  created() {
    this.manage_type = local.get("manage_type");
    this.user_loginname = local.get("userloginname");
    this.user_loginpass = local.get("userloginpass");
    this.user=local.get("user")
  },
  mounted() {
    this.clientWidth = `${document.documentElement.clientWidth}`;
    this.$refs.Purple.style.width = this.clientWidth * (188 / 1920) + "px";
    this.$refs.Purple.style.height =this.clientWidth * (188 / 1920) + "px";
     this.$refs.Purple0.style.width = this.clientWidth * (188 / 1920)* 0.35 + "px";
    this.$refs.Purple0.style.height =this.clientWidth * (188 / 1920)* 0.35 + "px";
    this.$refs.Purple1.style.width = this.clientWidth * (213 / 1920) + "px";
    this.$refs.Purple1.style.height =this.clientWidth * (213 / 1920) + "px";
     this.$refs.Purple11.style.width = this.clientWidth * (213 / 1920)* 0.35 + "px";
    this.$refs.Purple11.style.height =this.clientWidth * (213 / 1920)* 0.35 + "px";
    this.$refs.Purple2.style.width = this.clientWidth * (259 / 1920) + "px";
    this.$refs.Purple2.style.height =this.clientWidth * (259 / 1920) + "px";
    this.$refs.Purple22.style.width = this.clientWidth * (259 / 1920)* 0.35 + "px";
    this.$refs.Purple22.style.height =this.clientWidth * (259 / 1920)* 0.35 + "px";
    this.$refs.Purple3.style.width = this.clientWidth * (244 / 1920) + "px";
    this.$refs.Purple3.style.height =this.clientWidth * (244 / 1920) + "px";
    this.$refs.Purple33.style.width = this.clientWidth * (244 / 1920)* 0.35 + "px";
    this.$refs.Purple33.style.height =this.clientWidth * (244 / 1920)* 0.35 + "px";
    this.$refs.Purple4.style.width = this.clientWidth * (289 / 1920)+ "px";
    this.$refs.Purple4.style.height =this.clientWidth * (289 / 1920) + "px";
    this.$refs.Purple44.style.width = this.clientWidth * (289 / 1920)* 0.35+ "px";
    this.$refs.Purple44.style.height =this.clientWidth * (289 / 1920)* 0.35 + "px";
     this.$refs.Purple5.style.width = this.clientWidth * (188 / 1920) + "px";
    this.$refs.Purple5.style.height =this.clientWidth * (188 / 1920) + "px";
     this.$refs.Purple55.style.width = this.clientWidth * (188 / 1920)* 0.35 + "px";
    this.$refs.Purple55.style.height =this.clientWidth * (188 / 1920)* 0.35 + "px";
  },
  methods: {
    redirect(e, num) {
      window.open(num, "_blank");
    },
    redirect1(e, num1) {
      window.open(num1, "_blank");
    }
  }
};
</script>
<style lang="scss" scoped>
.entry {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: url("../../../assets/image/logo1.png") no-repeat 0px 0px;
  background-size: cover;
  display: table;
  .main {
    display: table-cell;
    vertical-align: middle;
    text-align: center;
  }
  .title1 {
    color: #83b6ee;
  }
  .title img {
    width: 30%;
  }
  .title3 {
     font-size: 12px;
    margin: 5px 0px 10px 0px;
  }
  .menu {
    border-radius: 6px;
    background: url("../../../assets/image/entry1.png") no-repeat 0px 0px;
    background-size: contain;
    color: #17328B;
    padding-top: 23px;
    img {
      width: 50%;
      padding: 15px 10px 0px 10px;
    }
    .p1 {
      min-height: 40px;
      padding: 0px 20px;
    }
  }
 .menu:hover{ border-radius: 6px;background: url("../../../assets/image/entry11.png") no-repeat 0px 0px; background-size: contain;
    color: #fff;
     }
   .menu1{float:right;}
    .menu3{margin-top: 10px;margin-left: 20px;}
   .menu5{margin-top: 10px;margin-left: 70px;}
    .a_menu1 .imgmenu1{margin: auto;
     background: url("../../../assets/image/shian-logo.png") no-repeat 0px 0px; background-size: contain;}
    .a_menu1:hover .imgmenu1{
     background: url("../../../assets/image/shian-logohover.png") no-repeat 0px 0px; background-size: contain;
    } 
    .a_menu2 .imgmenu2{margin: auto;
     background: url("../../../assets/image/shianjian-logo.png") no-repeat 0px 0px; background-size: contain;}
    .a_menu2:hover .imgmenu2{
     background: url("../../../assets/image/shianjian-logohover.png") no-repeat 0px 0px; background-size: contain;
    }
   .a_menu3 .imgmenu3{margin: auto;
     background: url("../../../assets/image/qunyan-logo.png") no-repeat 0px 0px; background-size: contain;}
   .a_menu3:hover .imgmenu3{
     background: url("../../../assets/image/qunyan-logohover.png") no-repeat 0px 0px; background-size: contain;
   }
   .a_menu4 .imgmenu4{margin: auto;
     background: url("../../../assets/image/sanxiao-logo.png") no-repeat 0px 0px; background-size: contain;}
   .a_menu4:hover .imgmenu4{
     background: url("../../../assets/image/sanxiao-logohover.png") no-repeat 0px 0px; background-size: contain;
   }
   .a_menu5 .imgmenu5{margin: auto;
     background: url("../../../assets/image/shuju-logo.png") no-repeat 0px 0px; background-size: contain;}
   .a_menu5:hover .imgmenu5{
     background: url("../../../assets/image/shuju-logohover.png") no-repeat 0px 0px; background-size: contain;
   }
     .a_menu6 .imgmenu6{margin: auto;
     background: url("../../../assets/image/shuju-logohover.png") no-repeat 0px 0px; background-size: contain;}
   .a_menu6:hover .imgmenu6{
     background: url("../../../assets/image/shuju-logohover.png") no-repeat 0px 0px; background-size: contain;
   }
   .menu4{margin-top: 90px; margin-left: 30px;}
    .title2 {
      margin: 10px 0 0px 0px;
    }
  @media screen and (min-width: 1401px) {
    .title2 {
      font-size: 1.2rem;
      margin: 10px 0 10px 0px;
    }
    .title3 {
      font-size: 1rem;
    }
    .title1 {
      font-size: 1.3rem;
      margin-bottom: 30px;
    }
    .title img {
      width: 30%;
    }
    .menu{padding-top: 30px;}
    .menu img {
      width: 110px;
      height: 110px;
      margin: 40px 0 10px 0px;
    }
  }
}
</style>
