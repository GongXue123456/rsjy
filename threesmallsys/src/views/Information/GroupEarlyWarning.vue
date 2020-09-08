<template>
  <div class="body">
    <div class="title" ref="Top"><img class="mr10" src="../../assets/image/dashujulogo.png">小作坊数智云平台 <a  class="right_btn f13 cfff disib"
              :href="qyurl+'JKYJLogin/login?user_loginname='+user_loginname+'&user_loginpass='+user_loginpass+'&returnurl=todayData/findByList'" 
            ><p class="f13 disib ml10">{{dateTime}}</p><p class="f20 disib ml20 mr20">{{dateTime1}}</p><p class="disib">三小预警中心</p>
            </a></div>
    <div class="box" ref="Box">
      <el-row class="el-row1" :gutter="20">
       <el-col :span="7">
         <div class="grid-content bg-purple1 fl " >
          <div class="left-top ml10" ref="leftTop" >
            <div class=" title1 mt10 tl f16">今日报备<span class="pt10 fr f30">{{pcount}}<span class="pt10 tr f13">条</span></span></div>
            <div class="a clear w f14" ref="leftTop1">
              <div class="aa">举办人</div>
              <div class="aa" style="width:50%">地点</div>
              <div class="aa">审核状态</div>
              <div class="w" style="height:200px;overflow-y:scroll;">
                <ul class="item " >
               <li  :key="index"  v-for="(item, index) in todatNoPass" class="aa_li f47">
                <div class="fl p5">{{item.user_name_conduct}}</div>
                <div class="fl p5" style="width:50%">{{item.address_conduct}}</div>
                <div class="fl p5" >无效</div>
               </li>
              </ul>
              </div>
              <div class="scroll_bg" ref="scrollBg1" id="box" style="height:300px;">
                 
                 <vue-seamless-scroll :data="tableData" :class-option="optionSetting" class="seamless-warp">
          <ul class="item">
            <li v-for="(item, index) in tableData" :key="index" class="aa_li">
                <div class="fl p5">{{item.user_name_conduct}}</div>
                <div class="fl p5" style="width:50%">{{item.address_conduct}}</div>
               <div class="fl p5" v-if="item.report_state==1">待审核</div>
               <div class="fl p5" v-else-if="item.report_state>=3">审核通过</div>
            </li>
          </ul>
          </vue-seamless-scroll>
              </div>
            </div>
          </div>
          <div class="left-top ml10" ref="leftBottom" style="height:520px">
             <div class="title1 mt10 tl f16">鹰眼<span class="pt10 fr f30">{{devicecount}}<span class="pt10 tr f13">台</span></span></div>
            <div id="main1" class="mt10 f13 w" ref="main1" style="height:465px;overflow-y:scroll;overflow-x:hidden;">
              <el-row class="devicelist" :gutter="20">
               <el-col v-for="(item,index) in deviceList" :key="index" :span="12" class="pt10 pb10"  >
                 <img @click="show_device(item.device_number,item.device_code)" style="width:50px" src="../../assets/image/carmen.svg">
                 <p :class="item.device_out_state=='异常'?'active':'cfff'">{{item.device_name}}</p>
               </el-col>
              </el-row>
                
            </div>
          </div>
        </div>
       </el-col>
       <el-col :span="10">
         <div class="grid-content bg-purple2 fl" ref="Purple2">
          <div class="center-top pr ml10" ref="centerTop" style="height:420px">
            <el-row :gutter="20" class="f13">
               <div class="pt20 tl f16">今日办宴{{data3}}场</div>
              <el-col :span="24">
                <div class="grid-content2" ref="gridContent2">
                   <div ref="map" class="fl " id="map" style="width:100%;height:420px" ></div>
                </div>
              </el-col>
              
            </el-row>
          </div>
          <div class="center-bottom" ref="centerBottom">
            <div class=" clear w f14 mt40">
              <div class="aa1">举办者</div>
              <div class="aa1" style="width:40%">地点</div>
              <div class="aa1">检查人</div>
              <div class="aa1">检查状态</div>
               <div class="seamless-warp w" style="height:200px;overflow-y:scroll;">
                   <ul class="item">
            <li v-for="(item, index) in tableData1" :key="index" class="aa1_li error f47">
               <div class="fl ">{{item.user_name_conduct}}</div>
          <div class="fl " style="width:40%">{{item.address_conduct}}</div>
           <div class="fl">{{item.user_name_check}}</div>
           <div class="fl " v-if="item.report_state==5">不合格</div>
            </li>
          </ul>
                 </div>
              <div class="scroll_bg w" id="box"  style="height:400px;">
                
                 <vue-seamless-scroll :data="tableData11" :class-option="optionSetting" class="seamless-warp">
          <ul class="item">
            <li v-for="(item, index) in tableData11" :key="index" class="aa1_li">
               <div class="fl ">{{item.user_name_conduct}}</div>
          <div class="fl " style="width:40%">{{item.address_conduct}}</div>
           <div class="fl">{{item.user_name_check}}</div>
           <div class="fl general_color" v-if="item.report_state==3">待检查</div>
           <div class="fl f47" v-else-if="item.report_state==4">已检查</div>
            </li>
          </ul>
      </vue-seamless-scroll>
              </div>
            </div>
          </div>
        </div>
       </el-col>
       <el-col :span="7">
         <div class="grid-content bg-purple1 fl" ref="Purple3">
          <div class="right-top mb10" ref="rightTop" style="height:220px">
            <div class="pt20 pl10 tl f16 mb30">乡厨证件</div>
           <div class="pr "> <el-progress class="tl ml20 mt30 " :stroke-width="15" color="#F47448" :percentage="percentage4" :format="format"></el-progress><span @click="show_user(1)" class="pa f14">{{data4}}人</span></div>
              <div class="pr"> <el-progress class="tl ml20 mt30 " :stroke-width="15" color="#F47448" :percentage="percentage5" :format="format1"></el-progress><span @click="show_user(2)" class="pa f14">{{data5}}人</span></div>
               <div class="pr"> <el-progress class="tl ml20 mt30 " :stroke-width="15" color="#F47448" :percentage="percentage6" :format="format2"></el-progress><span @click="show_user(3)" class="pa f14">{{data6}}人</span></div>
          </div>
          <div class="right-top"  ref="rightBottom" style="height:820px">
            <div class="pt10 pl10 mb10 tl f16">培训</div>
             <div class="a w f14 tc" ref="rightCenter1">
              <div  class="fl aa cfff mb5">乡厨姓名</div>
              <div  class="fl aa cfff mb5" style="width:50%">区域</div>
              <div  class="fl aa cfff mb5">培训状态</div>
              <div class="seamless-warp w" style="height:200px;overflow-y:scroll;">
               <ul class="item">
                <li v-for="(item, index) in tableData4" :key="index" class="aa1_li error f47">
                  <div class="fl p5" >{{item.user_name_chef}}</div>
                  <div class="fl p5" style="width:50%">{{item.address_conduct}}</div>
                  <div class="fl p5" >不合格</div>
                </li>
               </ul>
                 </div>
              <div class="scroll_bg w" ref="scrollBg" id="box1">
                 <vue-seamless-scroll :data="tableData3" :class-option="optionSetting" class="seamless-warp">
          <ul class="item">
            <li v-for="(item, index) in tableData3" :key="index" class="w aa_li">
                <div class="fl p5" >{{item.user_name_chef}}</div>
                   <div class="fl p5" style="width:50%">{{item.address_conduct}}</div>
                    <div class="fl p5" v-if="item.hg_state==1">合格</div>
                    <div class="fl p5 error" v-else>不合格</div>
                   
            </li>
          </ul>
      </vue-seamless-scroll>
              </div>
            </div>
          </div>
        </div>
       </el-col>
    </el-row>

    </div>
    <el-drawer
  withHeader="false"
  :visible.sync="drawer"
  :show-close='false'
  direction="ltr"
  >
   <el-row :gutter="20" class="w ml0 mr0 drawer_height">
  <el-col :span="6">乡厨姓名</el-col>
  <el-col :span="11">区域</el-col>
  <el-col :span="7" v-if="companyPage.serachState==1">缺少证件</el-col>
  <el-col :span="7" v-else-if="companyPage.serachState==2">即将过期</el-col>
  <el-col :span="7" v-else-if="companyPage.serachState==3">过期时间</el-col>
</el-row>
  <ul class="infinite-list" v-infinite-scroll="load"  style="overflow:auto;" :style="{height:fullHeight + 'px'}">
    <li v-for="(item,index) in companyData" :key="index" style="cursor:pointer" class="infinite-list-item" @click="getDetail(item.company_area_code)">
      <el-row :gutter="20" class="w">
  <el-col :span="6"><div class="f14 p0">{{item.user_name}}</div></el-col>
  <el-col :span="11"><div class="f14 p0">{{item.user_address_show!=null?item.user_address_show:'--'}}</div></el-col>
  <el-col :span="7"  v-if="companyPage.serachState==1"><div class="f14 p0 disib" v-if="isStringNull(item.user_registcard_logo)">登记卡</div><div class="f14 p0 disib" v-if="isStringNull(item.user_health_logo)">健康证</div><div class="f14 p0 disib" v-if="isStringNull(item.user_idcard_logo_front)">身份证附件正面</div><div class="f14 p0 disib" v-if="isStringNull(item.user_idcard_logo_back)">身份证附件背面</div><div class="f14 p0 disib" v-if="isStringNull(item.user_train_logo)">培训合格证</div></el-col>
  <el-col :span="7"  v-else-if="companyPage.serachState==2"><div class="f14 p0">{{item.url_willout_day}}天后</div></el-col>
  <el-col :span="7"  v-else-if="companyPage.serachState==3"><div class="f14 p0">{{item.user_health_datedue}} ({{item.url_out_day}}) 天</div></el-col>
</el-row>
    </li>
  </ul>
</el-drawer>
<el-drawer withHeader="false" :visible.sync="drawerRight" :show-close='false'
  direction="rtl">
   <el-row :gutter="20" class="w ml0 p10 mr0 drawer_height">
  <el-col :span="12">设备类型：{{devicelog.user_type}}</el-col>
  <el-col :span="12">办宴地点：{{devicelog.address_conduct}}</el-col>
  <el-col :span="12">乡厨：{{devicelog.address_conduct}}</el-col>
  <el-col :span="12">联系电话：{{devicelog.address_conduct}}</el-col>
  <el-col :span="24" class="p0 mb20 bgc000">
       <video-player class="vjs-custom-skin" 
                        :options="playerOptions" 
                        @ready="playerReadied">
          </video-player>
     </el-col>
  <el-col :span="6" class="flex"><div  id="progress1"  style="width:100px;height:100px"> </div></el-col>
  <el-col :span="6" class="flex"><div class="" id="progress2"  style="width:100px;height:100px"> </div></el-col>
  <el-col :span="6" class="flex"><div class="" id="progress3"  style="width:100px;height:100px"> </div></el-col>
  <el-col :span="6" class="flex"><div  id="progress4" class="ml20" style="width:100px;height:100px"> </div></el-col>
  <el-col :span="6" class="flex"><div id="progress5" class="mr20" style="width:100px;height:100px"> </div></el-col>
  <el-col :span="6" class="flex"><div class="" id="progress6"  style="width:100px;height:100px"> </div></el-col>
  <el-col :span="6" class="flex"><div class="" id="progress7"  style="width:100px;height:100px"> </div></el-col>
  <el-col :span="6" class="flex"><div class="" id="progress8"  style="width:100px;height:100px"> </div></el-col>
</el-row>
  
</el-drawer>
  </div>
</template>

<script>
import { local } from "../../util/util";
var echarts = require('echarts/lib/echarts');
require('echarts/lib/chart/line');
require('echarts/lib/chart/pie');
require('echarts/lib/chart/radar');
require('echarts/lib/chart/bar');
require('echarts/lib/component/tooltip');
require('echarts/lib/component/legend');
require('echarts/lib/component/title');
import axios from "../../util/api";
import axiosa from 'axios'
import optionsmap from "./js/map"; 
import 'echarts/map/js/province/sichuan.js'; 
// import china from 'echarts/map/json/china.json'
import { videoPlayer } from 'vue-video-player'
import 'video.js/dist/video-js.css'
  import videojs from 'video.js'
  window.videojs = videojs
  require('videojs-contrib-hls/dist/videojs-contrib-hls.js')
import Vue from "vue";
var chinaId = 100000;
var chinaName = "china";
var chinaJson = null;
let options,option3,progress1,progress2,progress3,progress4,progress5,progress6,progress7,progress8,endPercent;
var mapStack = [];
var parentId = null;
var parentName = null;
var parentId1 = null;
var parentName1 = null;
var cityId;
var cityId1;
var mapJson1;
var s = 0;
var sss = true;
var myChart = null;
let dmtData=[]

import vueSeamlessScroll from 'vue-seamless-scroll'
export default {
  name: 'DutyInfo',
  components: {vueSeamlessScroll,videoPlayer},
  data() {
    return {
       animate: false,
       animate1: false,
        activeClass:0,
      pcount:'',
      devicecount:'',
      devicelog:'',
      tableData:[],
      todatNoPass:[],
      tableData1:[],
      tableData11:[],
      tableData2:[],
       tableData3:[],
       tableData4:[],
       deviceList:[],
      page: {
        pager_offset: "0",
        pager_openset:'100'
      },
       companyPage: {
         pager_offset: "0",
        pager_openset: "20",
        serachState:'1',
      },
      page1:{pager_offset:'0',pager_openset:'100',address_conduct:''},
      activeIndex: 0,
      activeIndex1: 0,
      fullHeight:document.documentElement.clientHeight-50,
      drawer: false,
      drawerRight:false,
      firstPlayFlag: true,
      data1:'',
      data2:'',
      data3:'',
      data4:'',
      data5:'',
      data6:'',
      timer2:'',
      timer1:'',
      list1:[],
      list2:[],
      companyData:[],
      percentage1:0,
      percentage2:0,
      percentage3:0,
      percentage4:0,
      percentage5:0,
      percentage6:0,
      user_loginname: "",
      user_loginpass: "",
      qyurl:'',
      list_btn:[{title: '合格',val:'1'},{title: '不合格',val:'2'}],
      progressWidth:'',
      dateTime:'',
       dateTime1:'',
        title:'',
        user:'',
        user_code:'',
         playerOptions: {
           playbackRates: [0.7, 1.0, 1.5, 2.0],
        preload: 'auto', 
        language: 'zh-CN',
        aspectRatio: '16:9',
          sources: [{
            withCredentials: false,
            type: "application/x-mpegURL",
            src:''
          }],
          controlBar: {
            timeDivider: false,
            durationDisplay: false
          },
          flash: { hls: { withCredentials: false }},
          html5: { hls: { withCredentials: false }},
        },
    };
  },
  mounted() {
    this.$nextTick(function() {
      this.drawPie();
    });
    //   this.timer = setInterval(() => {
    // this.getNowTime()
    // }, 1000)

  },
   beforeDestroy() {
    // if (this.timer) {
    //   clearInterval(this.timer); 
    // }
  },
   computed: {
    optionSetting () {
      return {
        step:1, // 数值越大速度滚动越快
        hoverStop: true, // 是否开启鼠标悬停stop
        direction: 1, // 0向下 1向上 2向左 3向右
        openWatch: true, // 开启数据实时监控刷新dom
        singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        waitTime: 500 // 单步运动停止的时间(默认值1000ms)
      }
    }
  },
  created() {
    this.user_code=this.$route.query.user_code;
    this.getToken()
  },
  methods: {
    getNowTime() {
	       var now = new Date();
	       var year = now.getFullYear(); 
	       var month = now.getMonth(); 
         var date = now.getDate();
           var hh =now.getHours() < 10? "0" + now.getHours(): now.getHours();
      var mm =now.getMinutes() < 10? "0" + now.getMinutes(): now.getMinutes();
      var ss =now.getSeconds() < 10? "0" + now.getSeconds():now.getSeconds();
       var hour =' '+hh+':'+mm+':'+ss; 
	       month = month + 1;
	       month = month.toString().padStart(2, "0");
	       date = date.toString().padStart(2, "0");
         this.dateTime=`${year}-${month}-${date}`
          this.dateTime1=`${hh}:${mm}:${ss}`
      },
       format(percentage) {  return  '证件不齐'; },
       format1(percentage) {  return  '健康证即将过期'; },
       format2(percentage) {  return  '健康证过期'; },
     IsActive(k,val) {
        this.activeClass = k;
        this.page1.patrol_result=val
        this.init1(this.page1)
      },
      getToken(){
         axiosa.get("/api/token?user_code="+this.user_code).then(v => {
          local.set('token', v.data.data.token)
          this.user_loginname = v.data.data.user_loginname;
          this.user_loginpass = v.data.data.user_loginpass;
          this.qyurl=v.data.data.qyurl;
          let token = local.get('token')
          if (token) {
            this.init(this.page);
            this.init1(this.page1)
          } 
         
      });
      },
    init(params) {

     axios.get('/api/todayData/todatUsr', {hg_state:'1'}).then((v) => {
         this.data4=v.todayData.missCardChefCount;
         this.percentage4=parseInt(v.todayData.missCardChefCount/v.todayData.allChefCount*100);
         this.data5=v.todayData.datewilloutchefcount;
         this.percentage5=parseInt(v.todayData.datewilloutchefcount/v.todayData.datechefcount*100);
          this.data6=v.todayData.dateoutchefcount;
         this.percentage6=parseInt(v.todayData.dateoutchefcount/v.todayData.datechefcount*100);
         })
         axios.get('/api/todayData/todatBanquet', {pager_openset:'10',address_conduct:''}).then((v) => {this.data3=v.todayData.todaybanquetcount;})
      axios.get('/api/todayData/todatReport', '').then((v) => {
        this.tableData=v.todayData.pager_list;
        this.pcount=v.todayData.addReportCount;  
      })
       axios.get('/api/todayData/todatNoPassReport', '').then((v) => {
        this.todatNoPass=v.todayData.pager_list;
      })
       axios.get('/api/todayData/device/list', '').then((v) => {
        this.devicecount=v.todayData.devicecount;
        this.deviceList=v.todayData.pager_list;
      })
       axios.get('/api/todayData/todatOutUsr', {pager_openset:'100',}).then((v) => {
        this.tableData4=v.todayData.pager_list
      })
       axios.get('/api/todayData/todatUsr', {pager_openset:'100',}).then((v) => {
        this.tableData3=v.todayData.pager_list
      })
       axios.get('/api/company/search', params).then((v) => {
         var companytype_name,filing_name;
        v.companyList.forEach((item,index)=>{
           if(item.companytype_code=='1001574645421581000000001'){companytype_name='食品加工'}else if(item.companytype_code=='1001574645421581000000002'){companytype_name='食品流通'}else if(item.companytype_code=='1001574645421581000000003'){companytype_name='食品餐饮'}
            if(item.filing_state=='1'){filing_name='待审核'}else if(item.filing_state=='3'){filing_name='已归档'}else if(item.filing_state=='4'){filing_name='已驳回'}
          dmtData.push({company_name:item.company_name,operator:item.operator,mobilephone:item.mobilephone,companytype_name:companytype_name,filing_name:filing_name,value:[item.longitude,item.latitude,item.filing_state]});
        })
         optionsmap.bb.series[0].data= dmtData
           var myCharts=echarts.init(this.$refs.map);
        myCharts.setOption(optionsmap.bb, true);
      })
      
    },
     initCompany(params) {
      axios.get("/api/todayData/user/list", params).then(response => {
        this.companyData =this.companyData.concat(response.user.userlist);
      });
    },
    isStringNull(str){
	    if(!str||str==null||str==''){
	    	return true;
    	}
      	return false;
    },
    show_user(val){
      this.drawer=true;
      this.companyData=[]
      this.companyPage.pager_offset='0';
      this.companyPage.serachState=String(val);
       this.initCompany(this.companyPage);
    },
    show_device(val,val1){
     this.drawerRight=true;
     axios.get('/api/todayData/devicelog',{device_number:val}).then((v) => {
       this.devicelog=v.deviceLog
        progress1.series[0].data[0].value=v.deviceLog.temp
        if(v.deviceLog.temp>0){progress1.color[0]='#F47448'}
         var charts4 = echarts.init(document.getElementById("progress1"));
          charts4.setOption(progress1);
           progress2.series[0].data[0].value=v.deviceLog.hum
           if(v.deviceLog.hum>0){progress2.color[0]='#F47448'}
         var charts5 = echarts.init(document.getElementById("progress2"));
          charts5.setOption(progress2);
          progress3.series[0].data[0].value=v.deviceLog.mq2
           if(v.deviceLog.mq2>0){progress3.color[0]='#F47448'}
          var charts6 = echarts.init(document.getElementById("progress3"));
         charts6.setOption(progress3);
         progress4.series[0].data[0].value=v.deviceLog.mq4
         if(v.deviceLog.mq4>0){progress4.color[0]='#F47448'}
         var charts7 = echarts.init(document.getElementById("progress4"));
         charts7.setOption(progress4);
         progress5.series[0].data[0].value=v.deviceLog.mq9
         if(v.deviceLog.mq9>0){progress5.color[0]='#F47448'}
         var charts8 = echarts.init(document.getElementById("progress5"));
        charts8.setOption(progress5);
         progress6.series[0].data[0].value=v.deviceLog.ph
         if(v.deviceLog.ph>0){progress6.color[0]='#F47448'}
         var charts9 = echarts.init(document.getElementById("progress6"));
         charts9.setOption(progress6);
         progress7.series[0].data[0].value=v.deviceLog.mq5
         if(v.deviceLog.mq5>0){progress7.color[0]='#F47448'}
         var charts10 = echarts.init(document.getElementById("progress7"));
         charts10.setOption(progress7);
         progress8.series[0].data[0].value=v.deviceLog.tds
        if(v.deviceLog.tds>0){progress8.color[0]='#F47448'}
        var charts11 = echarts.init(document.getElementById("progress8"));
         charts11.setOption(progress8);
        })
        axios.get('/api/todayData/palyVideo',{device_code:val1}).then((v) => {
           this.playerOptions.sources[0].src=v.device.play_video_url
        })
    },
     playerReadied(player) {
        var hls = player.tech({ IWillNotUseThisInPlugins: true }).hls
        player.tech_.hls.xhr.beforeRequest = function(options) {
          return options
        }
      },
     load () {
       this.companyPage.pager_offset=String(parseInt(this.companyPage.pager_offset)+20);
       this.initCompany(this.companyPage);
    },
    init1(params){
           axios.get('/api/todayData/outCheck/list', params).then((v) => {this.tableData1=v.todayData.pager_list;})
           axios.get('/api/todayData/todatBanquet', params).then((v) => {this.tableData11=v.todayData.pager_list;})
    },
    aaa(val){
     axios.get('/api/bigData/food/source/detail', {foodsource_code:val}).then((v) => {
       this.list2=v.food_source_deital_list
      })
    },
    drawPie() {
        progress1 ={
         color:['#fff','#125D47'],
		      series: [
		        {type:'pie',radius: ['70%', '83%'],avoidLabelOverlap: false, hoverAnimation: false,labelLine: {normal: {show: false} },
		            data:[{value:20,name:'温度',selected:false,label: {normal: {show: true,position: 'center',fontSize: 13,formatter:'{b}\n{c}',}},},{value:100, label:{ normal:{show:false,}}},]
		        }
		     ]
        };
        progress2 ={
         color:['#fff','#125D47'],
		     series: [
		        {type:'pie',radius:['70%', '83%'],avoidLabelOverlap: false, hoverAnimation: false,labelLine: {normal: {show: false} },
		            data:[{value:20,name:'湿度',selected:false,label: {normal: {show: true,position: 'center',fontSize: 13,formatter:'{b}\n{c}',}},},{value:100, label:{ normal:{show:false,}}},]
		        }
		     ]
        };
        progress3 ={
         color:['#fff','#125D47'],
		     series: [
		        {type:'pie',radius:['70%', '83%'],avoidLabelOverlap: false, hoverAnimation: false,labelLine: {normal: {show: false} },
		            data:[{value:20,name:'烟雾',selected:false,label: {normal: {show: true,position: 'center',fontSize: 13,formatter:'{b}\n{c}',}},},{value:100, label:{ normal:{show:false,}}},]
		        }
		      ]
        };
        progress4 ={
         color:['#fff','#125D47'],
		     series: [
		        {type:'pie',radius:['70%', '83%'],avoidLabelOverlap: false, hoverAnimation: false,labelLine: {normal: {show: false} },
		            data:[{value:20,name:'甲烷',selected:false,label: {normal: {show: true,position: 'center',fontSize: 13,formatter:'{b}\n{c}',}},},{value:100, label:{ normal:{show:false,}}},]
		        }
		      ]
        };
        progress5 ={
         color:['#fff','#125D47'],
		     series: [
		        {type:'pie',radius:['70%', '83%'],avoidLabelOverlap: false, hoverAnimation: false,labelLine: {normal: {show: false} },
		            data:[{value:20,name:'CO',selected:false,label: {normal: {show: true,position: 'center',fontSize: 13,formatter:'{b}\n{c}',}},},{value:100, label:{ normal:{show:false,}}},]
		        }
		     ]
        };
        progress6 ={
         color:['#fff','#125D47'],
		      series: [
		        {type:'pie',radius:['70%', '83%'],avoidLabelOverlap: false, hoverAnimation: false,labelLine: {normal: {show: false} },
		            data:[{value:20,name:'PH',selected:false,label: {normal: {show: true,position: 'center',fontSize: 13,formatter:'{b}\n{c}',}},},{value:100, label:{ normal:{show:false,}}},]
		        }
		      ]
        };
        progress7 ={
         color:['#fff','#125D47'],
		      series: [
		        {type:'pie',radius:['70%', '83%'],avoidLabelOverlap: false, hoverAnimation: false,labelLine: {normal: {show: false} },
		            data:[{value:20,name:'液化气',selected:false,label: {normal: {show: true,position: 'center',fontSize: 13,formatter:'{b}\n{c}',}},},{value:100, label:{ normal:{show:false,}}},]
		        }
		      ]
         };
        progress8 ={
         color:['#fff','#125D47'],
	  	    series: [
		        {type:'pie',radius:['70%', '83%'],avoidLabelOverlap: false, hoverAnimation: false,labelLine: {normal: {show: false} },
		            data:[{value:20,name:'水质TDS',selected:false,label: {normal: {show: true,position: 'center',fontSize: 13,formatter:'{b}\n{c}',}},},{value:100, label:{ normal:{show:false,}}},]
		        }
		     ]
        };
    }
  }
};


</script>



<style scoped lang="scss">
.body {
  background-image: url("../../assets/image/dashuju.png");
  width: 100%;
  height: 100%;
  /* position: fixed; */
  z-index: -10;
  overflow: hidden;
  background-repeat: no-repeat;
  background-position: 0px 0px;
  background-size: 100% 100%;
}
.el-tooltip__popper {
  max-width: 60px;
}
 .active {
       background: #2EC68A;
    border-color: #2EC68A;
    color: #FFFFFF;
  }
  .el-button--mini{border-radius: 20px;}
.right_btn{position: absolute; right: 20px; top: 20px;}
.title {
  width: 100%;
  height: 12vh;
  text-align: left;
  padding: 10px 20px 10px 20px;
  color: #fff;
  font-size: 23px;
  background-size: 100% 100%;
  display: table;
  img{width:3rem;vertical-align: middle;}
  span{background:rgba(255,255,255,0.3); border-radius:24px;color: #34ECB5;padding: 6px 10px;vertical-align: middle;}
}
.title2{top: 20px;left:30px;}
.left-top,.right-center{
    .title1{
          display: flex;
    justify-content: space-between;
    align-items: center;
    }
  }
  .devicelist .active{
    color: rgb(244, 116, 72);
  }
.box {
  color: #34ECB5;
  .grid-content1 {
    padding: 10px;
    height: 60px;
    line-height: 1.2;
    span {
      font-family: PingFang SC;
      font-weight: bold;
    }
  }
}
.el-row {
  &:last-child {
    margin-bottom: 0;
  }
}
.grid-content {
  width: 100%;
  height: 100%;
  border-radius: 4px;
  min-height: 36px;
 
}
.el-row1{ background:rgba(8,4,4,0.2);}
.scroll_bg {
  width: 100%;
  margin: auto;
  overflow: hidden;
  position: relative;
  color: #fff;
  li{display: flex;
  }
  li:nth-child(2n){
   background:#092931;
  }
  li:nth-child(2n+1){
   background:#123f3c;
  }
}
.a {
  margin: auto;
}
.aa {
  width: 25%;
  float: left;
  padding-bottom: 5px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #fff;
}
.aa1 {
  width: 20%;
  float: left;
  padding-bottom: 5px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #fff;
}
li div {
  padding: 12px 5px;
  font-size: 12px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.aa_li div {
  width: 25%;
}
.aa1_li div {
  width: 20%;
}
.aa1_li.error{
      background-color: rgba(244,116,72,0.2) !important;
    /* border-bottom: 1px solid rgb(244,116,72); */
}
.flex{  display: flex;  justify-content: center;}
.right-top{
  span{right: 15px;top: 0px;}
  /deep/ .el-progress{
 .el-progress-bar{width:55%;padding-right: 0; margin-right: 0;}
  .el-progress__text{font-size: 14px !important;color: #fff;}
  }
 
}
.grid-content1 {
 /deep/ .el-progress__text{display: none;}
}

/deep/ .el-progress-bar__outer{background-color: #125D47;    border-radius: 0px;}
/deep/ .el-progress-bar__inner{ border-radius: 0px;}

  .scroll-content {
    position: relative;
    transition: top 0.5s;
  }
  .scroll-content p {
    line-height: 30px;
    text-align: center;
  }
 /deep/ .el-dialog {background:#0D2B48;width:65%;color:#fff;height: 400px;
   .el-dialog__header{text-align: left;font-size: 14px;.el-dialog__title{color: #34ECB5;}}
   .el-dialog__body{padding-top: 0px;}
 }
   /deep/ .el-drawer{width:40% !important;background-color: #0D2B48;
   .el-drawer__header{display: none;}
   li div {
  padding:0;
}
   .drawer_height{
     height: 50px;
     color:#7dbcfc;
     line-height: 50px;
   }
   .infinite-list .infinite-list-item {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    background: #091F2F;
    margin: 10px;
    color: #7dbcfc;
}
.infinite-list::-webkit-scrollbar{
  width:5px;
  height:5px;
  /**/
}
.infinite-list::-webkit-scrollbar-track{
  background: #0D2B48;
  border-radius:2px;
}
.infinite-list::-webkit-scrollbar-thumb{
  background: #7dbcfc;
  border-radius:10px;
}
.infinite-list::-webkit-scrollbar-thumb:hover{
  background: #0D2B48;
}
.infinite-list::-webkit-scrollbar-corner{
  background: #179a16;
}}
 /deep/ .el-collapse{border:none;position: relative;padding-left:20px;height: 300px;overflow-y:scroll;
  .el-collapse-item__header{background:#091F2F;border-bottom:none;
  .flex{display: flex;align-items: center};
  .el-col-9{line-height: 1.5};
}
.el-collapse-item__arrow{color:#fff;}
.el-collapse-item__wrap{background:#0D2B48;border-bottom:none}
.el-collapse-item__content{padding-bottom: 0px;
.el-table{margin-bottom: 0px !important;background-color:#0D2B48 !important;tr,th,td{background-color:#0D2B48 !important;border-bottom:none}}
.el-table::before{height: 0;}
} 
}
.tap{
  width: 8px;
    height: 8px;
    font-family: 'ecoico';
    speak: none;
    font-style: normal;
    font-weight: normal;
    font-variant: normal;
    text-transform: none;
    font-size: 1.4em;
    line-height: 40px;
    -webkit-font-smoothing: antialiased;
    position: absolute;
    color: #fff;
    background: #0B2931;
    border-radius: 50%;
    box-shadow: 0 0 0 1px #34ECB5;
    text-align: center;
   
    margin: 0 0 0 -9px;
}
 .tap1{
     left: -5px;
    top: 20px;
}
 .tap2{
        left: 15px;
    bottom: -20px;
}
 .asa {
    content: '';
    position: absolute;
    top: 20px;
     left: 0px;
    width: 1px;
    background: #34ECB5;
    /* left: 20px; */
    height: 100%;
    margin-left: -10px;
}

/deep/ .v-modal{opacity: 0.75;}
  @media screen and (min-width: 1401px) {
 .right-top { span{right: 35px;font-size: 15px}} 
 /deep/ .el-progress{
    margin-bottom: 20px;
     .el-progress__text{font-size: 15px !important;margin-left: 30px;}
  }

}
div::-webkit-scrollbar{
  width:2px;
  height:2px;
  /**/
}
div::-webkit-scrollbar-track{
  background: #0D2B48;
  border-radius:2px;
}
div::-webkit-scrollbar-thumb{
  background: #7dbcfc;
  border-radius:2px;
}
div::-webkit-scrollbar-thumb:hover{
  background: #0D2B48;
}
div::-webkit-scrollbar-corner{
  background: #179a16;
}
/deep/ .video-js {
  .vjs-tech {
    object-fit: fill;
      background-color: #616372;
  }
  .vjs-big-play-button {
    line-height: 2em;
    height: 2em;
    width: 2em !important;
    top: 40%;
    left: 45%;
    border: none;
    border-radius: 50%;
  }
}
</style>
