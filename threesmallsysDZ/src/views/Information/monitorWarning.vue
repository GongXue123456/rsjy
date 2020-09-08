<template>
  <el-container class="shopList">
    <el-main class="pt0 m10">
      <el-row  class="head">
       <el-col :span="6" class="w left f20 fb tl"><img class="ml20 mr10" src="../../assets/image/sanxiao-logo1.png">食安数智云平台</el-col>
       <el-col :span="12" class="title-m p10">
          <!-- <el-col :span="12" class="title-m-l">群宴</el-col>
          <el-col :span="12" class="title-m-r">三小</el-col> -->
          <el-col :span="24" class="title-m-c">三小</el-col>
       </el-col>
       <el-col :span="6" class="tr pt10 right"><p class="f13 disib tl ml10">{{dateTime}}<br/><img src="../../assets/image/minitor-title-r.png"></p><p class="f30 disib ml10">{{dateTime1}}</p><br/>
         <div class="btn"><a class=" cD6F"
              href="javascript:;"
              @click="redirect1($event,qyurl+'JKYJLogin/login?user_loginname='+user_loginname+'&user_loginpass='+user_loginpass+'&returnurl=weekDayData/findByList')"
            ><i class="iconfont f15 cD6F iconqiehuan mr5"></i>大数据云</a></div>
       </el-col>
      </el-row>
      <el-row :gutter="40" class="main mt10 ml30 f14 mr30">
       <el-col :span="12" class="mb10"><div class="fr col pr"   ref="Purple"><span  @click="godetail1(play_video_name.company_area_code)" class="disib">{{play_video_name.company_area_name}}</span><i v-if="play_video_name!=''" @click="godetail1(play_video_name.company_area_code)" class="ml5 iconfont iconshexiangtou "></i> <el-button @click="handleChooseCompany(1)" type="primary" class="pa" size="mini">添加摄像头</el-button>
           <video-player class="vjs-custom-skin1" 
                        :options="playerOptions" 
                        @ready="playerReadied">
          </video-player>
       </div></el-col>
       <el-col :span="12" class="mb10"><div class="col pr" ref="Purple1"><span @click="godetail1(play_video_name1.company_area_code)">{{play_video_name1.company_area_name}}</span><i @click="godetail1(play_video_name1.company_area_code)" v-if="play_video_name1!=''" class="ml5 iconfont iconshexiangtou "></i> <el-button @click="handleChooseCompany(2)" type="primary" class="pa" size="mini">添加摄像头</el-button>
       <video-player class="vjs-custom-skin vjs-custom-skin1" 
                        :options="playerOptions1" 
                        @ready="playerReadied">
          </video-player></div></el-col>
       <el-col :span="12" class=""><div class="fr col pr" ref="Purple2"><span @click="godetail1(play_video_name2.company_area_code)">{{play_video_name2.company_area_name}}</span><i @click="godetail1(play_video_name2.company_area_code)" v-if="play_video_name2!=''" class="ml5 iconfont iconshexiangtou "></i> <el-button @click="handleChooseCompany(3)" type="primary" class="pa" size="mini">添加摄像头</el-button>
       <video-player class="vjs-custom-skin vjs-custom-skin1" 
                        :options="playerOptions2" 
                        @ready="playerReadied">
          </video-player></div></el-col>
       <el-col :span="12" class=""><div class="col pr" ref="Purple3"><span @click="godetail1(play_video_name3.company_area_code)">{{play_video_name3.company_area_name}}</span><i @click="godetail1(play_video_name3.company_area_code)" v-if="play_video_name3!=''" class="ml5 iconfont iconshexiangtou "></i> <el-button @click="handleChooseCompany(4)" type="primary" class="pa" size="mini">添加摄像头</el-button>
       <video-player class="vjs-custom-skin vjs-custom-skin1" 
                        :options="playerOptions3" 
                        @ready="playerReadied">
          </video-player></div></el-col>
       
     </el-row>
      <el-drawer 
  :visible.sync="drawer"
  direction="ltr"
  :with-header="false"
  :show-close='false'
  >
     <el-form :inline="true" ref="addForm"  :model="companyPage" class="demo-form-inline">
      <el-form-item prop="company_area_name" size="">
          <el-input placeholder="企业区域名称" v-model="companyPage.company_area_name" class="input-with-select"  clearable @clear="onSearch" >
            <el-button slot="append" type="primary" class="cfff" @click="onSearch">查询</el-button>
          </el-input>
        </el-form-item>
    </el-form>
   <ul class="infinite-list" v-infinite-scroll="load"  style="overflow:auto;" :style="{height:fullHeight + 'px'}">
    <li v-for="(item,index) in companyData" :key="index" style="cursor:pointer" class="infinite-list-item" @click="getDetail(item.company_area_code)"><p class="tc" style="width: 100%;overflow: hidden; text-overflow: ellipsis;  white-space:nowrap ; "><i v-if="item.play_video_url!=''&&item.play_video_url!=null&&item.play_video_url.indexOf('http')!== -1"  class="iconfont iconshexiangtou mr10" style="color:#7dbcfc"></i>{{ item.company_name}}({{item.company_area_name}})</p></li>
  </ul>
</el-drawer>
<el-dialog :modal-append-to-body='false'  :visible.sync="dialogTableVisible" >
   <el-main class="pt10">
      <el-row :gutter="20">
        <el-col :span="24" class=" p20">
           <div class="video-card col">
          <div class="flex">
              <h5 class="tl cD6F f18 pt20 disib pb10">{{liveCams.device_name}}<span class="ml10 f16">({{liveCams.company_area_name}})</span></h5>
              
            </div>
          <video-player v-if="liveCams.playerOptions!=''" class="vjs-custom-skin vjs-custom-skin2" :options="liveCams.playerOptions" @ready="playerReadied"></video-player>
           </div>
        </el-col>
        <el-col v-if="list!=''" :span="24" class="mb10">
          <el-row class="box cD6F f13">
            <el-col :span="24" class="recorddetail-title  f14 tl mt10 mb10 pl15">基础信息</el-col>
            <el-col :span="13" class="tl mb10" :offset="1">
              企业名称：
              <span >{{list.company_name}}</span>
            </el-col>
            <el-col :span="9" class="tl mb10" :offset="1">
              企业区域名称：
              <span >{{list.company_area_name}}</span>
            </el-col>
            <el-col :span="22" class="tl mb10" :offset="1">
              传感器名称：
              <span >{{list.sensor_name}}</span>
            </el-col>
          </el-row>
           <el-col :span="24" class="recorddetail-title cD6F f14 tl mt10 mb10 pl15">传感器信息</el-col>
          <el-row class="f13 cD6F mt5">
           <el-col :span="5">监测名</el-col>
           <el-col :span="5">监测值</el-col>
           <el-col :span="5">预警范围</el-col>
           <el-col :span="5">采集范围</el-col>
           <el-col :span="5">报警状态</el-col>
          </el-row>
          <el-row   class="f13 cD6F mt5">
            <el-col :span="5">温度</el-col>
           <el-col :span="5">{{sensor_log.temp}}℃</el-col>
           <el-col :span="5">{{sensor_log.temp_system_range}}</el-col>
           <el-col :span="5">{{sensor_log.temp_monitor_range}}</el-col>
           <el-col :span="5" ><span v-if="sensor_log.temp_state==1">正常</span><span v-if="sensor_log.temp_state==2">报警</span></el-col>
          </el-row>
          <el-row class="f13 cD6F mt5">
            <el-col :span="5">烟雾</el-col>
           <el-col :span="5">{{sensor_log.mq2_monitor_range}}</el-col>
           <el-col :span="5">{{sensor_log.mq2_system_range}}</el-col>
           <el-col :span="5">{{sensor_log.mq2_monitor_range}}</el-col>
           <el-col :span="5" ><span v-if="sensor_log.mq2_state==1">正常</span><span v-if="sensor_log.mq2_state==2">报警</span></el-col>
          </el-row>
          <el-row class="f13 cD6F mt5">
            <el-col :span="5">甲烷</el-col>
           <el-col :span="5">{{sensor_log.mq4_monitor_range}}</el-col>
           <el-col :span="5">{{sensor_log.mq4_system_range}}</el-col>
           <el-col :span="5">{{sensor_log.mq4_monitor_range}}</el-col>
           <el-col :span="5" ><span v-if="sensor_log.mq4_state==1">正常</span><span v-if="sensor_log.mq4_state==2">报警</span></el-col>
          </el-row>
          <el-row class="f13 cD6F mt5">
            <el-col :span="5">液化气</el-col>
           <el-col :span="5">{{sensor_log.mq5_monitor_range}}</el-col>
           <el-col :span="5">{{sensor_log.mq5_system_range}}</el-col>
           <el-col :span="5">{{sensor_log.mq5_monitor_range}}</el-col>
           <el-col :span="5" ><span v-if="sensor_log.mq5_state==1">正常</span><span v-if="sensor_log.mq5_state==2">报警</span></el-col>
          </el-row>
          <el-row class="f13 cD6F mt5">
            <el-col :span="5">一氧化碳</el-col>
           <el-col :span="5">{{sensor_log.mq9_monitor_range}}</el-col>
           <el-col :span="5">{{sensor_log.mq9_system_range}}</el-col>
           <el-col :span="5">{{sensor_log.mq9_monitor_range}}</el-col>
           <el-col :span="5" ><span v-if="sensor_log.mq9_state==1">正常</span><span v-if="sensor_log.mq9_state==2">报警</span></el-col>
          </el-row>
          <el-row class="f13 cD6F mt5">
            <el-col :span="5">水质</el-col>
           <el-col :span="5">{{sensor_log.tds}}</el-col>
           <el-col :span="5">{{sensor_log.tds_system_range}}</el-col>
           <el-col :span="5">{{sensor_log.tds_monitor_range}}</el-col>
           <el-col :span="5" ><span v-if="sensor_log.tds_state==1">正常</span><span v-if="sensor_log.tds_state==2">报警</span></el-col>
          </el-row>
          <el-row class="f13 cD6F mt5">
            <el-col :span="5">酸碱度</el-col>
           <el-col :span="5">{{sensor_log.ph}}</el-col>
           <el-col :span="5">{{sensor_log.ph_system_range}}</el-col>
           <el-col :span="5">{{sensor_log.ph_monitor_range}}</el-col>
           <el-col :span="5" ><span v-if="sensor_log.ph_state==1">正常</span><span v-if="sensor_log.ph_state==2">报警</span></el-col>
          </el-row>
          <el-row class="f13 cD6F mt5">
            <el-col :span="5">湿度</el-col>
           <el-col :span="5">{{sensor_log.humidity}}</el-col>
           <el-col :span="5">{{sensor_log.humidity_system_range}}</el-col>
           <el-col :span="5">{{sensor_log.humidity_monitor_range}}</el-col>
           <el-col :span="5" ><span v-if="sensor_log.humidity_state==1">正常</span><span v-if="sensor_log.humidity_state==2">报警</span></el-col>
          </el-row>
          
        </el-col>
      </el-row>
     
    </el-main>
</el-dialog>
    </el-main>
  </el-container>
</template>
<script>
import 'videojs-contrib-hls';
import { videoPlayer } from 'vue-video-player'
import 'video.js/dist/video-js.css'
import videojs from "video.js";
window.videojs = videojs;
require("videojs-contrib-hls/dist/videojs-contrib-hls.js");
import { local } from "../../util/util";
import axios from '../../util/api'
import axiosa from 'axios'
export default {
   components: {
    videoPlayer
  },
  data () {
    return {
      user:'',
      user_loginname: "",
      user_loginpass: "",
      user_code:'',
      qyurl:'',
      companyPage: {
         pager_offset: "0",
        pager_openset: "20",
        company_area_name:""
      },
      liveCams:{
         device_code:'',
              device_name:'',
              device_number: '',
              company_area_name:'',
              company_area_code:'',
              playerOptions:''
      },
      list: '',
      sensor_log:'',
      fullHeight:document.documentElement.clientHeight - 80,
      formLabelWidth: '80px',
      drawer: false,
      type:'',
      companyData: [],
      dateTime:'',
       dateTime1:'',
        dialogTableVisible: false,
       play_video_name:'',
       play_video_name1:'',
       play_video_name2:'',
       play_video_name3:'',
       playerOptions: {
           playbackRates: [0.7, 1.0, 1.5, 2.0],
        preload: 'auto', 
        language: 'zh-CN',
        aspectRatio: '29:15',
          sources: [{withCredentials: false,type: "application/x-mpegURL",src: ""}],
          controlBar: {timeDivider: false,durationDisplay: false},
          flash: { hls: { withCredentials: false }},
          html5: { hls: { withCredentials: false }},
          notSupportedMessage: '此视频暂无法播放，请稍后再试',
        controlBar: {timeDivider: true,durationDisplay: true,remainingTimeDisplay: false,fullscreenToggle: true }
        },
        playerOptions1: {
           playbackRates: [0.7, 1.0, 1.5, 2.0],
        preload: 'auto', 
        language: 'zh-CN',
        aspectRatio: '29:15',
          sources: [{withCredentials: false,type: "application/x-mpegURL",src: ""}],
          controlBar: {timeDivider: false,durationDisplay: false},
          flash: { hls: { withCredentials: false }},
          html5: { hls: { withCredentials: false }},
          notSupportedMessage: '此视频暂无法播放，请稍后再试',
        controlBar: {timeDivider: true,durationDisplay: true,remainingTimeDisplay: false,fullscreenToggle: true }
        },
        playerOptions2: {
           playbackRates: [0.7, 1.0, 1.5, 2.0],
        preload: 'auto', 
        language: 'zh-CN',
        aspectRatio: '29:15',
          sources: [{withCredentials: false,type: "application/x-mpegURL",src: ""}],
          controlBar: {timeDivider: false,durationDisplay: false},
          flash: { hls: { withCredentials: false }},
          html5: { hls: { withCredentials: false }},
          notSupportedMessage: '此视频暂无法播放，请稍后再试',
        controlBar: {timeDivider: true,durationDisplay: true,remainingTimeDisplay: false,fullscreenToggle: true }
        },
        playerOptions3: {
           playbackRates: [0.7, 1.0, 1.5, 2.0],
        preload: 'auto', 
        language: 'zh-CN',
        aspectRatio: '29:15',
          sources: [{withCredentials: false,type: "application/x-mpegURL",src: ""}],
          controlBar: {timeDivider: false,durationDisplay: false},
          flash: { hls: { withCredentials: false }},
          html5: { hls: { withCredentials: false }},
          notSupportedMessage: '此视频暂无法播放，请稍后再试',
        controlBar: {timeDivider: true,durationDisplay: true,remainingTimeDisplay: false,fullscreenToggle: true }
        },
    }
    
  },
   created () {
     this.user_code=this.$route.query.user_code;
    this.getNowTime()
    this.getToken()
    //  local.set('token',this.$route.query.token)
    // this.user=local.get("user")
    // this.user_loginname = local.get("userloginname");
    // this.user_loginpass = local.get("userloginpass");
  },
  mounted(){
      this.clientWidth = `${document.documentElement.clientWidth}`;
      this.clientHeight = `${document.documentElement.clientHeight}`;
      
      // this.$refs.Purple4.style.height =(this.clientHeight-80)+ "px";
    if(this.clientWidth>1401){
        this.$refs.Purple.style.height =(this.clientHeight-180)/2+ "px";
    this.$refs.Purple.style.width =((this.clientHeight-180)/2)/(870/1622)+ "px";
     this.$refs.Purple1.style.width =((this.clientHeight-180)/2)/(870/1622)+ "px";
    this.$refs.Purple1.style.height =(this.clientHeight-180)/2+ "px";
     this.$refs.Purple2.style.width =((this.clientHeight-180)/2)/(870/1622)+ "px";
    this.$refs.Purple2.style.height =(this.clientHeight-180)/2+ "px";
     this.$refs.Purple3.style.width =((this.clientHeight-180)/2)/(870/1622)+ "px";
    this.$refs.Purple3.style.height =(this.clientHeight-180)/2+ "px";
    }else{
      this.$refs.Purple.style.height =(this.clientHeight-140)/2+ "px";
    this.$refs.Purple.style.width =((this.clientHeight-140)/2)/(870/1622)+ "px";
     this.$refs.Purple1.style.width =((this.clientHeight-140)/2)/(870/1622)+ "px";
    this.$refs.Purple1.style.height =(this.clientHeight-140)/2+ "px";
     this.$refs.Purple2.style.width =((this.clientHeight-140)/2)/(870/1622)+ "px";
    this.$refs.Purple2.style.height =(this.clientHeight-140)/2+ "px";
     this.$refs.Purple3.style.width =((this.clientHeight-140)/2)/(870/1622)+ "px";
    this.$refs.Purple3.style.height =(this.clientHeight-140)/2+ "px";
    }
    
  },
  methods: {
    redirect1(e, num1) {
      window.open(num1, "_blank");
    },
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
      getToken(){
         axiosa.get("/api/token?user_code="+this.user_code).then(v => {
          local.set('token', v.data.data.token)
          this.user_loginname = v.data.data.user_loginname;
          this.user_loginpass = v.data.data.user_loginpass;
          this.qyurl=v.data.data.qyurl;
          let token = local.get('token')
         
      });
      },
     playerReadied(player) {
        var hls = player.tech({ IWillNotUseThisInPlugins: true }).hls
        player.tech_.hls.xhr.beforeRequest = function(options) {
          return options
        }
      },
    initCompany(params) {
      axios.get("/api/device/list", params).then(response => {
        this.companyData =this.companyData.concat(response.device_list);
      });
    },
   onSearch() {
     this.companyData=[]
         this.companyPage.pager_offset = "0";
       this.initCompany(this.companyPage);
    },
   handleChooseCompany(index) {
    //  this.companyData=[]
      this.type=index
      // this.load()
       this.initCompany(this.companyPage);
       this.drawer = true;
    },
    load () {
       this.companyPage.pager_offset=String(parseInt(this.companyPage.pager_offset)+20);
       this.initCompany(this.companyPage);
    },
   getDetail(code){
      axios.get("/api/device/area", {company_area_code:code}).then(response => {
        if(JSON.stringify(response) == "{}"||response.device.play_video_url.indexOf("http") == -1 ){
            this.$notify.error({
                title: '当前企业没有摄像头',
                message: '',
                duration: 4500
              })
              return false
        }
        if(this.type==1){
          this.playerOptions.sources[0].src=response.device.play_video_url;
       this.play_video_name={
         company_area_name:response.device.company_area_name,
         company_area_code:response.device.company_area_code,
       }
        }else if(this.type==2){
          this.playerOptions1.sources[0].src=response.device.play_video_url;
       this.play_video_name1={
         company_area_name:response.device.company_area_name,
         company_area_code:response.device.company_area_code,
       }
        }else if(this.type==3){
          this.playerOptions2.sources[0].src=response.device.play_video_url;
       this.play_video_name2={
         company_area_name:response.device.company_area_name,
         company_area_code:response.device.company_area_code,
       }
        }else if(this.type==4){
          this.playerOptions3.sources[0].src=response.device.play_video_url;
       this.play_video_name3={
         company_area_name:response.device.company_area_name,
         company_area_code:response.device.company_area_code,
       }
        }
          this.drawer = false;
      });
   },
    godetail1(val){
      this.dialogTableVisible=true
      axios.get("/api/device/area", { company_area_code: val }).then(response => {
          let res = response.device;
            this.liveCams = {
              device_code: res.device_code,
              device_name: res.device_name,
              device_number: res.device_number,
              company_area_code:res.company_area_code,
              company_area_name:res.company_area_name,
                device_type:res.device_type,
              playerOptions: {
                playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
                language: "zh-CN",
                aspectRatio: "16:7",
                sources: [
                  {
                    withCredentials: false,
                    type: "application/x-mpegURL",
                    src: res.play_video_url
                  }
                ],
                controlBar: {
                  timeDivider: false,
                  durationDisplay: false
                },
                flash: { hls: { withCredentials: false } },
                html5: { hls: { withCredentials: false } },
                notSupportedMessage: "此视频暂无法播放，请稍后再试",
                controlBar: {
                  timeDivider: true,
                  durationDisplay: true,
                  remainingTimeDisplay: false,
                  fullscreenToggle: true
                }
              }
            };
        }); 
       axios.get('/api/sensor/area',{company_area_code:val}).then((v) => {
         if(JSON.stringify(v)!='{}'){
           this.list=v.sensor;
          this.sensor_log=v.sensor.sensor_log;
         }else{
             this.list='';
          this.sensor_log='';
         }
          
          })
    }
  
    
  }
}
</script>
<style lang="scss" scoped>
.el-header{display: none !important;background-color: #000 !important;}
.shopList{
  overflow-x: hidden;
  background-color: #070B10;
  height: 100vh;
  color: #75D6FF;
  .iconfont{color: #75D6FF;}
  .head{height: 100px;
  .el-col-6.left{ background: url('../../assets/image/minitor-title-l.png') no-repeat 0px 0px;
 background-size:cover;height: 85px;line-height:70px;
 img{width: 45px;vertical-align: middle;}}
 .el-col-6.right{img{width: 80px;}
 .btn{ background: url('../../assets/image/minitor-title-r1.png') no-repeat 0px 0px;
 background-size:cover;height: 40px;line-height:40px;width: 50%;
    text-align: center;
    float: right;}
 }
 .title-m{
    background: url('../../assets/image/minitor-title-m.png') no-repeat 0px 0px;
 background-size:cover;height: 100px;line-height:80px;
  /* .title-m-l{
    padding: 10px 0px 10px 10px;
   background: url('../../assets/image/minitor-l.png') no-repeat 0px 0px;
 background-size:contain;height: 80px;line-height:60px;
 }
 .title-m-r{
   padding: 10px 10px 10px 0px;
   background: url('../../assets/image/minitor-r.png') no-repeat 0px 0px;
 background-size:contain;height:80px;line-height:60px;
 } */
 .title-m-c{
      padding: 10px 10px 10px 0px;
   background: url('../../assets/image/minitor-c.png') no-repeat 0px 0px;
 background-size:contain;height:85px;line-height:60px;
 }
 }

 }
  .add{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  /deep/ .el-radio__label{display: none;}
  /deep/ .el-button--mini{padding: 5px 15px;right: 40px;top:5px;background-color: #75D6FF;}

  .el-main{overflow: hidden;}
  .main{padding-top: 3px;
  .el-col-12{
    .col{
          background: url('../../assets/image/minitor-bg.png') no-repeat 0px 0px;
 background-size:contain;
    }
   
     span{display: inline-block;margin-top: 3px;color: #000;font-weight: bolder;    width: 100px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;}
  }

  }
                /deep/ .video-player{
                margin: 9px 36px 0px 37px;
                .video-js{
   .vjs-tech{    object-fit: fill;    background-color: #678DBF;}
   .vjs-big-play-button {
    line-height: 2em;
    height: 2em;
    width: 2em !important;
    top: 38%;
    left: 45%;
    border:none;
    border-radius: 50%;}
} 
              } 
  @media screen and (min-width: 1401px) {

   .head{height: 145px;font-size:25px;
  .el-col-6.left{ height: 120px;line-height:93px;font-size:25px;
 img{width: 65px;margin-left: 30px;}}
 .el-col-6.right{img{width: 100px;}
 .btn{height: 60px;line-height:60px;width: 50%;}
 }
 .title-m{height: 145px;
  /* .title-m-l{height: 115px;line-height:90px;
 }
 .title-m-r{height:115px;line-height:90px;
 } */

 .title-m-c{
 background-size:contain;height:105px;line-height:80px;
 }
 }

 }
/deep/ .video-player{margin:25px 52px 0px 53px }

}
}
/deep/  .el-form {height: 70px;padding: 10px;.el-form-item{margin: auto;.el-input-group__append{ border: 1px solid #7dbcfc;}.el-input__inner{background-color: #091F2F;color:#7dbcfc;border: 1px solid #7dbcfc;}.el-button{background-color: #7dbcfc;
    border: 1px solid #7dbcfc;}}}
   /deep/ .el-drawer{width: 20% !important;background-color: #0D2B48;
   .el-drawer__header{display: none;}
   .infinite-list .infinite-list-item {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    background: #091F2F;
    margin: 10px;
    color: #7dbcfc;
}}
 /deep/ .el-dialog {background:#0D2B48;width:100%;height:initial;margin:0px auto !important;position: relative;
   .el-dialog__header{text-align: left;font-size: 14px;.el-dialog__title{color: #75D6FF;}}
   .el-dialog__body{padding-top: 0px;}
     .el-col-24{background-color: #091F2F;padding-bottom: 40px;}
       .recorddetail-title {
    height: 30px;
    line-height: 40px;
    border-left: 2px solid #75D6FF;
    background-color: #0D2B48;
  }
  .vjs-custom-skin.vjs-custom-skin2{
     .vjs-big-play-button {
    top: 43%;}
  }
 }
</style>
