<template>
  <div class="monitor p15">
    <div class="box add">
        <h5 class="mb10"><span class="lines"></span>鹰眼监控</h5>
         <div><el-button  class="back_btn" size="small" @click="$router.back()">返回</el-button></div>
    </div>
     <el-row  :gutter="20" class="box search mt15">
          <el-col :span="12" class="mb10 mr10 bgc000">
     <div class="flex"  @click="$router.push({path: 'monitor/detail?id=0'})"><h5  class="tl cfff pt10  disib pb10">双流周记水产品经营部</h5><span class=" fr cfff f13">查看详情<i class="fb el-icon-arrow-right"></i></span></div>
      <video-player class="vjs-custom-skin" 
                        :options="playerOptions" 
                        @ready="playerReadied">
          </video-player>
  </el-col>
  <el-col :span="12" class="mb10  bgc000">
      <div class="flex"  @click="$router.push({path: 'monitor/detail?id=1'})"><h5  class="tl cfff pt10  disib pb10">四川吉善缘餐饮管理有限公司</h5><span class=" fr cfff f13">查看详情<i class="fb el-icon-arrow-right"></i></span></div>
      <video-player class="vjs-custom-skin" 
                        :options="playerOptions1" 
                        @ready="playerReadied"
                        >
          </video-player></el-col>
 
</el-row>
<el-row  :gutter="20">
  <el-col :span="12" class="mb10 mr10 bgc000">
      <div class="flex"  @click="$router.push({path: 'monitor/detail?id=2'})"><h5  class="tl cfff pt10  disib pb10">双流国根海参水产经营部</h5><span class=" fr cfff f13">查看详情<i class="fb el-icon-arrow-right"></i></span></div>
      <video-player class="vjs-custom-skin" 
                        :options="playerOptions2" 
                        @ready="playerReadied">
          </video-player></el-col>
  <el-col :span="12" class="mb10 bgc000">
     <div class="flex"  @click="$router.push({path: 'monitor/detail?id=3'})"><h5  class="tl cfff pt10  disib pb10">双流潘氏水产经营部</h5><span class=" fr cfff f13">查看详情<i class="fb el-icon-arrow-right"></i></span></div>
      <video-player class="vjs-custom-skin" 
                        :options="playerOptions3" 
                        @ready="playerReadied">
          </video-player>
  </el-col>
</el-row>

  </div>
</template>
<script>
import { videoPlayer } from 'vue-video-player'
import 'video.js/dist/video-js.css'
export default {
  name: "admin",
 components: {
    videoPlayer
  },
   data () {
    return {
         playerOptions: {
           playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '16:7', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
          // height: '260',
          sources: [{
            withCredentials: false,
            type: "application/x-mpegURL",
            src: "https://paasalihlsgw.lechange.cn:443/LCO/5D084A4PAG26FCF/0/1/20191115144822/dev_20191115144822_c2qa2qd1aqnsphx1.m3u8?proto=https"
          }],
          controlBar: {
            timeDivider: false,
            durationDisplay: false
          },
          flash: { hls: { withCredentials: false }},
          html5: { hls: { withCredentials: false }},
                  notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true  //全屏按钮
        }
        },
        playerOptions1: {
           playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '16:7', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
          // height: '260',
          sources: [{
            withCredentials: false,
            type: "application/x-mpegURL",
            src: "https://szpaasalihlsgw.lechange.cn:443/LCO/5D084A4PAGB1560/0/1/20191115144616/dev_20191115144616_s0th6dinspiknhhf.m3u8?proto=https"
          }],
          controlBar: {
            timeDivider: false,
            durationDisplay: false
          },
          flash: { hls: { withCredentials: false }},
          html5: { hls: { withCredentials: false }},
                  notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true  //全屏按钮
        }
        },
        playerOptions2: {
           playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '16:7', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
          // height: '260',
          sources: [{
            withCredentials: false,
            type: "application/x-mpegURL",
            src: "https://szpaasalihlsgw.lechange.cn:443/LCO/5D084A4PAG51BC7/0/1/20191115144530/dev_20191115144530_6hq0gkf7bqth00xp.m3u8?proto=https"
          }],
          controlBar: {
            timeDivider: false,
            durationDisplay: false
          },
          flash: { hls: { withCredentials: false }},
          html5: { hls: { withCredentials: false }},
                  notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true  //全屏按钮
        }
        },
        playerOptions3: {
           playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '16:7', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
          // height: '260',
          sources: [{
            withCredentials: false,
            type: "application/x-mpegURL",
            src: "https://szpaasalihlsgw.lechange.cn:443/LCO/5D084A4PAG01B09/0/1/20191115144938/dev_20191115144938_r3tsnckia1zt4f14.m3u8?proto=https"
          }],
          controlBar: {
            timeDivider: false,
            durationDisplay: false
          },
          flash: { hls: { withCredentials: false }},
          html5: { hls: { withCredentials: false }},
                  notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true  //全屏按钮
        }
        },
    
    }
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
  height: 100vh;
   .add{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

.el-row{ display: flex; justify-content: space-between;}
  .flex{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
/deep/ .video-js{
   .vjs-tech{    object-fit: fill;}
   .vjs-big-play-button {
    line-height: 2em;
    height: 2em;
    width: 2em !important;
    top: 38%;
    left: 45%;
    border:none;
    border-radius: 50%;}
} 
</style>
