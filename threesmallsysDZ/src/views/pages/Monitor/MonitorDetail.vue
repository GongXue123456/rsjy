<template>
  <el-container
    class="monitor"
    style="height: 100vh; border: 1px solid #eee;background-color:#FFFFFF"
  >
    <el-header class="box add tc bb">
      <h5 class="disib">现场</h5>
      <div class="disib fr">
        <el-button class="back_btn" size="small" @click="$router.back()">返回</el-button>
      </div>
    </el-header>
    <el-main class="pt10">
      <el-row :gutter="20">
        <el-col :span="14" class="mb10">
           <div class="video-card">
          <div class="flex">
              <h5 class="tl cfff pt10 disib pb10">{{liveCams.device_name}}<span class="ml10 f13">({{liveCams.company_area_name}})</span></h5>
              <el-button type="primary" v-if="liveCams.device_type==1" size="small" @click="handleCapture(liveCams)">
                抓拍
                <i class="el-icon-camera el-icon--right"></i>
              </el-button>
              <el-button
                type="warning"
                size="small"
                @click="toRegulatoryRecord(liveCams.device_code)"
              >监管记录</el-button>
              <!-- <span class="fr cfff f13 cp" @click="$router.push({path: 'monitor/detail?id=0'})">
              查看详情
              <i class="fb el-icon-arrow-right"></i>
              </span>-->
            </div>
          <video-player v-if="liveCams.playerOptions!=''" class="vjs-custom-skin" :options="liveCams.playerOptions" @ready="playerReadied"></video-player>
           </div>
        </el-col>
        <el-col :span="10" class="mb10">
          <el-row class="box f13 c666">
            <el-col :span="24" class="recorddetail-title bgcfbe f14 tl mb10 pl15">基础信息</el-col>
            <el-col :span="13" class="tl mb10" :offset="1">
              企业名称：
              <span class="c333">{{list.company_name}}</span>
            </el-col>
            <el-col :span="9" class="tl mb10" :offset="1">
              企业区域名称：
              <span class="c333">{{list.company_area_name}}</span>
            </el-col>
            <el-col :span="24" class="tl mb10" :offset="1">
              传感器名称：
              <span class="c333">{{list.sensor_name}}</span>
            </el-col>
          </el-row>
           <el-col :span="24" class="recorddetail-title bgcfbe f14 tl mb5 pl15">传感器信息</el-col>
          <el-row class="f13 c666 mt5">
           <el-col :span="5">监测名</el-col>
           <el-col :span="5">监测值</el-col>
           <el-col :span="5">预警范围</el-col>
           <el-col :span="5">采集范围</el-col>
           <el-col :span="5">报警状态</el-col>
          </el-row>
          <el-row class="f13 c666 mt5">
            <el-col :span="5">温度</el-col>
           <el-col :span="5">{{sensor_log.temp}}℃</el-col>
           <el-col :span="5">{{sensor_log.temp_system_range}}</el-col>
           <el-col :span="5">{{sensor_log.temp_monitor_range}}</el-col>
           <el-col :span="5" ><span v-if="sensor_log.temp_state==1">正常</span><span v-if="sensor_log.temp_state==2">报警</span></el-col>
          </el-row>
          <el-row class="f13 c666 mt5">
            <el-col :span="5">烟雾</el-col>
           <el-col :span="5">{{sensor_log.mq2_monitor_range}}</el-col>
           <el-col :span="5">{{sensor_log.mq2_system_range}}</el-col>
           <el-col :span="5">{{sensor_log.mq2_monitor_range}}</el-col>
           <el-col :span="5" ><span v-if="sensor_log.mq2_state==1">正常</span><span v-if="sensor_log.mq2_state==2">报警</span></el-col>
          </el-row>
          <el-row class="f13 c666 mt5">
            <el-col :span="5">甲烷</el-col>
           <el-col :span="5">{{sensor_log.mq4_monitor_range}}</el-col>
           <el-col :span="5">{{sensor_log.mq4_system_range}}</el-col>
           <el-col :span="5">{{sensor_log.mq4_monitor_range}}</el-col>
           <el-col :span="5" ><span v-if="sensor_log.mq4_state==1">正常</span><span v-if="sensor_log.mq4_state==2">报警</span></el-col>
          </el-row>
          <el-row class="f13 c666 mt5">
            <el-col :span="5">液化气</el-col>
           <el-col :span="5">{{sensor_log.mq5_monitor_range}}</el-col>
           <el-col :span="5">{{sensor_log.mq5_system_range}}</el-col>
           <el-col :span="5">{{sensor_log.mq5_monitor_range}}</el-col>
           <el-col :span="5" ><span v-if="sensor_log.mq5_state==1">正常</span><span v-if="sensor_log.mq5_state==2">报警</span></el-col>
          </el-row>
          <el-row class="f13 c666 mt5">
            <el-col :span="5">一氧化碳</el-col>
           <el-col :span="5">{{sensor_log.mq9_monitor_range}}</el-col>
           <el-col :span="5">{{sensor_log.mq9_system_range}}</el-col>
           <el-col :span="5">{{sensor_log.mq9_monitor_range}}</el-col>
           <el-col :span="5" ><span v-if="sensor_log.mq9_state==1">正常</span><span v-if="sensor_log.mq9_state==2">报警</span></el-col>
          </el-row>
          <el-row class="f13 c666 mt5">
            <el-col :span="5">水质</el-col>
           <el-col :span="5">{{sensor_log.tds}}</el-col>
           <el-col :span="5">{{sensor_log.tds_system_range}}</el-col>
           <el-col :span="5">{{sensor_log.tds_monitor_range}}</el-col>
           <el-col :span="5" ><span v-if="sensor_log.tds_state==1">正常</span><span v-if="sensor_log.tds_state==2">报警</span></el-col>
          </el-row>
          <el-row class="f13 c666 mt5">
            <el-col :span="5">酸碱度</el-col>
           <el-col :span="5">{{sensor_log.ph}}</el-col>
           <el-col :span="5">{{sensor_log.ph_system_range}}</el-col>
           <el-col :span="5">{{sensor_log.ph_monitor_range}}</el-col>
           <el-col :span="5" ><span v-if="sensor_log.ph_state==1">正常</span><span v-if="sensor_log.ph_state==2">报警</span></el-col>
          </el-row>
          <el-row class="f13 c666 mt5">
            <el-col :span="5">湿度</el-col>
           <el-col :span="5">{{sensor_log.humidity}}</el-col>
           <el-col :span="5">{{sensor_log.humidity_system_range}}</el-col>
           <el-col :span="5">{{sensor_log.humidity_monitor_range}}</el-col>
           <el-col :span="5" ><span v-if="sensor_log.humidity_state==1">正常</span><span v-if="sensor_log.humidity_state==2">报警</span></el-col>
          </el-row>
          
        </el-col>
      </el-row>
      <el-dialog title="抓拍" :visible.sync="captureDialogVisible">
        <div v-if="captureForm.imgs_url.length>0">
          <img :src="captureForm.imgs_url[0]" />
        </div>
        <el-form class="mt15" :model="captureForm" label-width="100px">
          <el-form-item size="small" label="评定类型">
            <el-select v-model="captureForm.advice_type" placeholder="请选择">
              <el-option
                v-for="(item,index) in typeOptions"
                :key="index"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item size="small" label="评定等级">
            <el-select v-model="captureForm.advice_rate" placeholder="请选择">
              <el-option
                v-for="(item,index) in rateOptions"
                :key="index"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item size="small" label="补充意见">
            <el-input type="textarea" v-model="captureForm.advice_remark" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="onCancel">取 消</el-button>
          <el-button type="primary" @click="onConfirm">确 定</el-button>
        </div>
      </el-dialog>
    </el-main>
  </el-container>
</template>

<script>
import aa from "../../../../static/data.json";
import { videoPlayer } from "vue-video-player";
import "video.js/dist/video-js.css";
import axios from "../../../util/api";
import videojs from "video.js";
window.videojs = videojs;
require("videojs-contrib-hls/dist/videojs-contrib-hls.js");
export default {
  name: "MonitorDetail",
  components: {
    videoPlayer
  },
  data() {
    return {
      id:'',
      companyCode:'',
      captureDialogVisible: false,
      liveCams:{
         device_code:'',
              device_name:'',
              device_number: '',
              company_area_name:'',
              company_area_code:'',
              playerOptions:''
      },
      captureForm: {
        company_code: "",
        device_code: "",
        type:"2",
        imgs_url: [],
        advice_rate: "",
        advice_type: "",
        advice_remark: ""
      },
      typeOptions: [
        { label: "资证不齐", value: "1" },
        { label: "现场卫生不规范", value: "2" },
        { label: "人员卫生不规范", value: "3" },
        { label: "追溯记录不符合要求", value: "4" },
        { label: "无违规", value: "5" }
      ],
      rateOptions: [
      { label: "优秀", value: "4" },
        { label: "良好", value: "3" },
        { label: "一般", value: "2" },
        { label: "差", value: "1" }
      ],
      list: '',
      sensor_log:''
    };
  },
  created() {
    this.id = this.$route.query.id;
    this.init()
  },
  methods: {
    init(){
          axios
        .get("/api/device/area", { company_area_code: this.id })
        .then(response => {
          let res = response.device;
          // let liveCams = {};
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
       axios.get('/api/sensor/area',{company_area_code:this.id}).then((v) => {
         if(JSON.stringify(v)!='{}'){
           this.list=v.sensor;
          this.sensor_log=v.sensor.sensor_log;
          this.companyCode=v.sensor.company_code 
         }
          
          })
    },
    playerReadied(player) {
      var hls = player.tech({ IWillNotUseThisInPlugins: true }).hls;
      player.tech_.hls.xhr.beforeRequest = function(options) {
        return options;
      };
    },
     handleCapture(row) {
      this.captureForm.imgs_url = [];
      this.captureForm.device_code = row.device_code;
      this.captureForm.company_code =  this.companyCode;
      axios
        .get("/api/company/ali/video/capture", {
          device_number: row.device_number
        })
        .then(response => {
          this.captureForm.imgs_url.push(response.pic_url);
          this.captureDialogVisible = true;
        });
    },
    toRegulatoryRecord(deviceCode) {
      this.$router.push({
        name: "RegulatoryRecord",
        query: {
          id: this.companyCode,
          deviceCode
        }
      });
    },
     onConfirm() {
      axios
        .post("/api/company/advice/save", this.captureForm)
        .then(response => {
          this.captureDialogVisible = false;
          this.captureForm = {
            company_code: "",
            device_code: "",
            imgs_url: [],
            advice_rate: "",
            advice_type: "",
            advice_remark: ""
          };
        });
    },
    onCancel() {
      this.captureDialogVisible = false;
      this.captureForm = {
        company_code: "",
        device_code: "",
        type:"2",
        imgs_url: [],
        advice_rate: "",
        advice_type: "",
        advice_remark: ""
      };
    },
  }
};
</script>
<style lang="scss" scoped>
.monitor {
  a {
    color: unset;
  }
  .el-header {
    border-bottom: 1px solid #eee;
    line-height: 60px;
    text-align: center;
    .back_btn {
      background: rgba(247, 248, 249, 1);
      border: 1px solid rgba(217, 222, 225, 1);
    }
  }
  .recorddetail-title {
    height: 30px;
    line-height: 30px;
    border-left: 2px solid #788287;
  }
    .video-card {
    padding-left: 5px;
    padding-right: 5px;
    background-color: #616372;
  }
  .flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
   /deep/ .el-form-item__content {
    width: 60%;
  }
  .el-col-5{width:20%}
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
