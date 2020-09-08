<template>
  <div class="monitor">
    <el-container style="height: 100vh; border: 1px solid #eee;background-color:#FFFFFF">
       <el-header>
           <div class="box add tc">
        <h5 class="disib">现场</h5>
        <div class="disib fr"><el-button  class="back_btn" size="small" @click="$router.back()">返回</el-button></div>
       </div>
          </el-header>
        <el-main class="">
       <el-row  :gutter="20">
  <el-col :span="14" class="mb10 bgc000">
       <video-player class="vjs-custom-skin" 
                        :options="playerOptions" 
                        @ready="playerReadied">
          </video-player>
     </el-col>
  <el-col :span="10" class="mb10">
         <el-row class="box  f14 c666">
         <el-col :span="24" class="recorddetail-title bgcfbe tl mb10 pl15">主体信息</el-col>
         <el-col :span="13" class="tl mb10" :offset="1">
          主体名称：<span class="c333">{{list.p_shopname}}</span>
        </el-col>
        <el-col :span="9" class="tl mb10" :offset="1">
          主体类型：<span class="c333">{{list.p_type}}</span>
        </el-col>
        <el-col :span="24" class="tl mb10" :offset="1">
          经营地址：<span class="c333">{{list.p_actualaddress}}</span>
        </el-col>
     </el-row>
     <el-row class="box  f14 c666">
         <el-col :span="24" class="recorddetail-title bgcfbe tl mb5 pl15">传感器信息</el-col>
        <el-table
        class="f13 w"
    :data="tableData"
   >
    <el-table-column
     prop="p_type"
      label="类型">
    </el-table-column>
    <el-table-column
      prop="p_value"
      label="当前值">
    </el-table-column>
    <el-table-column
      prop="p_value1"
      label="当前状态">
    </el-table-column>
    <el-table-column
      prop="p_value2"
      label="参考值">
    </el-table-column>
   
  </el-table>
     </el-row>
  </el-col>
</el-row>

        </el-main>
    </el-container>
  </div>
</template>

<script>
import aa from '../../../../static/data.json'
import { videoPlayer } from 'vue-video-player'
import 'video.js/dist/video-js.css'
  import videojs from 'video.js'
  window.videojs = videojs
  require('videojs-contrib-hls/dist/videojs-contrib-hls.js')
export default {
  name: "admin",
 components: {
    videoPlayer
  },
   data () {
    return {
         playerOptions: {
           playbackRates: [0.7, 1.0, 1.5, 2.0],
        preload: 'auto', 
        language: 'zh-CN',
        aspectRatio: '16:9',
          sources: [{
            withCredentials: false,
            type: "application/x-mpegURL",
            src:aa.home.list[this.$route.query.id].vedio
          }],
          controlBar: {
            timeDivider: false,
            durationDisplay: false
          },
          flash: { hls: { withCredentials: false }},
          html5: { hls: { withCredentials: false }},
        },
        tableData:aa.home.list1[this.$route.query.id].lista,
        list:aa.home.list[this.$route.query.id]
    }
  },
   created () {
        this.id=this.$route.query.id;
     this.tableData= aa.home.list1[this.$route.query.id].lista;
     this.list=aa.home.list[this.$route.query.id]
  },
  methods:{
      playerReadied(player) {
        var hls = player.tech({ IWillNotUseThisInPlugins: true }).hls
        player.tech_.hls.xhr.beforeRequest = function(options) {
          return options
        }
      }
  }
};
</script>
<style lang="scss" scoped>
.monitor{
  a{color:unset;}
  .el-header{border-bottom: 1px solid #eee;line-height: 60px;text-align: right;
  /* .add{
    display: flex;
    justify-content: space-between;
    align-items: center;
  } */
  .back_btn{background:rgba(247,248,249,1);border:1px solid rgba(217,222,225,1);}}
  .recorddetail-title{height: 30px;line-height: 30px;border-left: 2px solid #788287}
  /deep/ .el-table{
     th,td{padding: 5px 0px;border-bottom: none} 
     th{color: #333}
  }
}
/deep/ .video-js{
   .vjs-tech{object-fit: fill;}
   .vjs-big-play-button {
    line-height: 2em;
    height: 2em;
    width: 2em !important;
    top: 40%;
    left: 45%;
    border:none;
    border-radius: 50%;}
} 
</style>
