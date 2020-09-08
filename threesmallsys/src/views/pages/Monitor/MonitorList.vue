<template>
  <el-container class="monitor-list">
    <el-header class="box add bb">
      <h5 class="mb10">
        <span class="lines"></span>鹰眼监控
      </h5>
      <div>
        <el-button class="back_btn" size="small" @click="$router.back()">返回</el-button>
      </div>
    </el-header>
    <el-main class="pt0">
      <el-row v-if="show==false" :gutter="10" class="mt15">
        <el-col :span="24" class="mb10" v-for="(liveCam,index) in liveCams" :key="index">
          <div class="video-card">
            <div class="flex">
              <h5 class="tl cfff pt10 disib pb10" @click="godetail(liveCam.company_area_code)">{{liveCam.device_name}}<span class="ml10 f13">({{liveCam.company_area_name}})</span></h5>
              <el-button type="primary" size="small" @click="godetail(liveCam.company_area_code)">
                监测页面
              </el-button>
              <el-button v-if="liveCam.device_type==1" type="primary" size="small" @click="handleCapture(liveCam)">
                抓拍
                <i class="el-icon-camera el-icon--right"></i>
              </el-button>
              <el-button
                type="warning"
                size="small"
                @click="toRegulatoryRecord(liveCam.device_code)"
              >监管记录</el-button>
              <!-- <span class="fr cfff f13 cp" @click="$router.push({path: 'monitor/detail?id=0'})">
              查看详情
              <i class="fb el-icon-arrow-right"></i>
              </span>-->
            </div>
            <video-player class="vjs-custom-skin" :options="liveCam.options" @ready="playerReadied"></video-player>
         
              <p @click="getVideoPic" style="text-align: center;margin: 10px auto;"> 点击拍照</p>
               <img style="width: 100%;height: auto;" :src="previewImg" alt="">
          </div>
        </el-col>
      </el-row>

      <div v-else-if="show==true" class="tc mt15 fb">
        <el-tag type="warning">暂无绑定摄像头</el-tag>
      </div>

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
import { videoPlayer } from "vue-video-player";
import "video.js/dist/video-js.css";
import 'videojs-contrib-hls';
import axios from "../../../util/api";
import { local } from "../../../util/util";
export default {
  name: "admin",
  components: {
    videoPlayer
  },
  data() {
    return {
      show:'',
      companyCode: "",
      liveCams: [],
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
      captureForm: {
        company_code: "",
        device_code: "",
        type:"2",
        imgs_url: [],
        advice_rate: "",
        advice_type: "",
        advice_remark: ""
      },
      captureDialogVisible: false,
      playerOptions: {
        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        language: "zh-CN",
        aspectRatio: "16:7",
        sources: [
          {
            withCredentials: false,
            type: "application/x-mpegURL",
            src: ""
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
  },
  mounted() {
    this.companyCode = this.$route.query.id;
    this.init(this.companyCode);
  },
  methods: {
    init(params) {
      axios
        .get("/api/company/single", { company_code: params })
        .then(response => {
          let res = response.live_cams;
          let liveCams = [];
          res.forEach(item => {
            let camObj = {
              device_code: item.device_code,
              device_name: item.device_name,
              device_number: item.device_number,
              company_area_code:item.company_area_code,
              company_area_name:item.company_area_name,
               device_type:item.device_type,
              options: {
                playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
                language: "zh-CN",
                aspectRatio: "16:7",
                sources: [
                  {
                    withCredentials: false,
                    type: "application/x-mpegURL",
                    src: item.play_video_url
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
            liveCams.push(camObj);
          });
          this.liveCams = liveCams;
          if(this.liveCams.length>0){this.show=false}else{this.show=true}
        });
    },
    handleCapture(row) {
      this.captureForm.imgs_url = [];
      this.captureForm.device_code = row.device_code;
      this.captureForm.company_code = this.companyCode;
      axios
        .get("/api/company/ali/video/capture", {
          device_number: row.device_number
        })
        .then(response => {
          this.captureForm.imgs_url.push(response.pic_url);
          this.captureDialogVisible = true;
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
    toRegulatoryRecord(deviceCode) {
      this.$router.push({
        name: "RegulatoryRecord",
        query: {
          id: this.companyCode,
          deviceCode
        }
      });
    },
    playerReadied(player) {
      var hls = player.tech({ IWillNotUseThisInPlugins: true }).hls;
      player.tech_.hls.xhr.beforeRequest = function(options) {
        return options;
      };
    },
    godetail(val){
       this.$router.push({
        name: "MonitorDetail",
        query: {
          id: val
        }
      });
    }
    
  }
};
</script>
<style lang="scss" scoped>
.monitor-list {
  height: 100vh;
  overflow-x: hidden;
  .add {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .cp {
    cursor: pointer;
  }
  .aa {
    display: flex;
    justify-content: center;
    align-items: center;
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
  /deep/.el-tag {
    font-size:20px;
  }
  /deep/ .el-form-item__content {
    width: 60%;
  }
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
    top: 38%;
    left: 45%;
    border: none;
    border-radius: 50%;
  }
}
</style>
