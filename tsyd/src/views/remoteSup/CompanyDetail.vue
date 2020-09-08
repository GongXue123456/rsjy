<template>
  <div>
    <van-nav-bar
      class="navbar-title"
      :title="camInfo.device_name"
      @click-left="onClickLeft"
      @click-right="toSpot"
      fixed
    >
      <template slot="left">
        <van-icon name="arrow-left" color="#cccccc" />
        <span style="color:#cccccc;">返回</span>
      </template>
      <template slot="right">
        <span style="color:#1AAD19;">现场执法</span>
      </template>
    </van-nav-bar>
    <div class="center">
      <div ref="wrapper" v-show="videoFlag"></div>
      <van-row style="text-align:center">
        <van-col span="5" style="text-align:left">
          <van-button
            style="margin-top:1px;margin-left:1px;"
            plain
            hairline
            type="warning"
            size="small"
          >详情描述</van-button>
        </van-col>
        <van-col
          style="height:30px;line-height:30px;padding:2px 6px;overflow-y:auto"
          span="19"
          @click="showMoreDetail(camInfo.device_desc)"
        >
          <!-- <marquee
            v-if="camInfo.device_desc"
            direction="up"
            height="60"
            scrollamount="2"
          >{{camInfo.device_desc}}</marquee>-->
          <span v-if="camInfo.device_desc" class="van-ellipsis">{{camInfo.device_desc}}</span>
          <span v-else>实时监测</span>
        </van-col>
        <!-- <van-col span="6" style="text-align:right">
          <van-button type="primary" size="small" @click="showPopup">切换直播</van-button>
        </van-col>-->
      </van-row>
      <van-tabs sticky animated swipeable>
        <van-tab title="经营资质" class="tab-box">
          <div style="margin-top:10px;" v-if="companyInfo.certificate_imgs.length>0">
            <van-grid :column-num="2" :gutter="10">
              <van-grid-item v-for="(item,index) in companyInfo.certificate_imgs" :key="index">
                <van-image
                  @click="showPreview(index,companyInfo.certificate_imgs)"
                  :src="global.resourcePath+item.url"
                >
                  <template v-slot:loading>
                    <van-loading type="spinner" size="20" />
                  </template>
                  <!-- <template v-slot:error>加载失败</template> -->
                </van-image>
              </van-grid-item>
            </van-grid>
          </div>
          <div v-else style="text-align:center;margin-top:10px;">暂未上传经营资质</div>
        </van-tab>
        <van-tab title="备案证" class="tab-box">
          <div style="margin-top:10px;" v-if="companyInfo.health_certificate_imgs.length>0">
            <van-grid :column-num="2" :gutter="10">
              <van-grid-item
                v-for="(item,index) in companyInfo.health_certificate_imgs"
                :key="index"
              >
                <van-image
                  @click="showPreview(index,companyInfo.health_certificate_imgs)"
                  :src="global.resourcePath+item.url"
                >
                  <template v-slot:loading>
                    <van-loading type="spinner" size="20" />
                  </template>
                  <!-- <template v-slot:error>加载失败</template> -->
                </van-image>
              </van-grid-item>
            </van-grid>
          </div>
          <div v-else style="text-align:center;margin-top:10px;">暂未上传备案证</div>
        </van-tab>
        <van-tab title="留影回看" class="tab-box" v-if="camInfo.device_type==1">
          <div style="margin-top:10px;">
            <div>
              <div class="review-img-box">
                <div>
                  <van-button type="primary" @click="showTimePopup">请选择回放起始时间</van-button>
                </div>
                <div v-if="imgData.length==0">
                  <img width="100%" :src="swipe1" />
                </div>
                <div v-if="imgData.length>0">
                  <van-swipe
                    ref="swipe"
                    @change="swipeImg"
                    :initial-swipe="1"
                    indicator-color="white"
                  >
                    <van-swipe-item v-for="(image, index) in imgData" :key="index">
                      <img width="100%" :src="image" />
                    </van-swipe-item>
                  </van-swipe>
                </div>
              </div>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
    <van-popup
      v-model="livePicker"
      position="bottom"
      :style="{ height: '220px' }"
      :close-on-click-overlay="false"
    >
      <van-picker
        v-show="!liveLoading"
        show-toolbar
        :columns="liveColumns"
        @cancel="livePicker = false"
        @confirm="onConfirmLive"
      />
      <div v-show="liveLoading" class="live-picker">
        <van-loading size="48px" color="#1989fa" vertical>切换直播源中...</van-loading>
      </div>
    </van-popup>
    <van-popup position="bottom" v-model="popVisible">
      <van-datetime-picker
        v-model="currentDate"
        type="datetime"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="confirmTime"
        @cancel="closeTimePopup"
      />
    </van-popup>
    <van-dialog v-model="showDialog" title="抓拍" show-cancel-button :before-close="beforeClose">
      <van-image v-if="form.imgs_url.length>0" :src="form.imgs_url[0]" width="100%">
        <template v-slot:loading>
          <van-loading type="spinner" size="20" />
        </template>
      </van-image>
      <div style="margin-top:10px;">
        <van-cell-group>
          <van-cell
            title="违规类型"
            :value="form.advice_type | typeFilter"
            is-link
            @click="popupAdviceType"
          />
          <van-cell
            title="监管评级"
            :value="form.advice_rate | rateFilter"
            is-link
            @click="popupAdviceRate"
          />
          <van-field
            v-model="form.advice_remark"
            @blur="inputBlur"
            label="补充意见"
            type="textarea"
            placeholder="请输入"
            autosize
          />
        </van-cell-group>
      </div>
    </van-dialog>
    <van-popup v-model="showAdviceType" position="bottom">
      <van-picker
        show-toolbar
        :columns="adviceTypeColumns"
        @confirm="onConfirmAdviceType"
        @cancel="showAdviceType = false"
      />
    </van-popup>
    <van-popup v-model="showAdviceRate" position="bottom">
      <van-picker
        show-toolbar
        :columns="adviceRateColumns"
        @confirm="onConfirmAdviceRate"
        @cancel="showAdviceRate = false"
      />
    </van-popup>
    <van-image-preview v-model="previewShow" :images="images" :start-position="startIndex"></van-image-preview>
    <div class="bottom">
      <van-row type="flex" justify="space-between">
        <van-col span="12">
          <van-button type="warning" size="large" @click="onCapture()">抓拍</van-button>
        </van-col>
        <van-col span="12">
          <van-button type="primary" size="large" @click="showPopup">切换直播</van-button>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import {
  getDetail,
  getCam,
  getCapture,
  getReviewPics,
  saveAdvice
} from 'api/company'
import ChimeeMobilePlayer from 'chimee-mobile-player'
import 'chimee-mobile-player/lib/chimee-mobile-player.browser.css'

import swipe1 from '@/assets/remoteSup/swipe1.gif'

export default {
  components: {
    // eslint-disable-next-line vue/no-unused-components
    ChimeeMobilePlayer
  },
  data () {
    return {
      showDialog: false,
      videoFlag: true,
      livePicker: false,
      previewShow: false,
      companyInfo: {
        certificate_imgs: [],
        accessory_list: [],
        health_certificate_imgs: []
      },
      camInfo: {},
      form: {
        device_code: '',
        company_code: '',
        imgs_url: [],
        type: 2,
        advice_rate: null,
        advice_type: null,
        advice_remark: ''
      },
      videoPlayer: {},
      isSupported: true,
      adviceTypeColumns: [
        { text: '资证不齐', value: 1 },
        { text: '现场卫生不规范', value: 2 },
        { text: '人员卫生不规范', value: 3 },
        { text: '追溯记录不符合要求', value: 4 },
        { text: '无违规', value: 5 }
      ],
      adviceRateColumns: [
        { text: '差', value: 1 },
        { text: '一般', value: 2 },
        { text: '良好', value: 3 },
        { text: '优秀', value: 4 }
      ],
      showAdviceType: false,
      showAdviceRate: false,
      activeTab: 1,
      liveColumns: [],
      liveList: [],
      cloneliveList: [],
      imgs: [],
      minDate: new Date(2018, 1, 1),
      maxDate: new Date(),
      currentDate: new Date(),
      chosedTime: '',
      imgIndex: 0,
      lastSwipeIndex: 1,
      startIndex: 0,
      popVisible: false,
      previewVisible: false,
      images: [],
      imgData: [],
      previewImages: [],
      gifVisible: true,
      liveLoading: false,
      timer: null,
      swipe1
    }
  },
  computed: {
  },
  filters: {
    typeFilter (type) {
      const typeMap = {
        1: '资证不齐',
        2: '现场卫生不规范',
        3: '人员卫生不规范',
        4: '追溯记录不符合要求',
        5: '无违规'
      }
      return typeMap[type]
    },
    rateFilter (rate) {
      const rateMap = {
        1: '差',
        2: '一般',
        3: '良好',
        4: '优秀'
      }
      return rateMap[rate]
    }
  },
  mounted () {
    this.fetchData(this.$route.params.id)
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    },
    isAndroid () {
      var ua = navigator.userAgent.toLowerCase()
      var android = ua.indexOf('android') !== -1
      return android
    },
    resetForm () {
      this.form = {
        device_code: '',
        company_code: '',
        imgs_url: [],
        type: 2,
        advice_rate: null,
        advice_type: null,
        advice_remark: ''
      }
    },
    fetchData (companyId) {
      let mythis = this
      getDetail({ id: companyId }).then(response => {
        let res = response.data
        mythis.companyInfo = res
        if (res.accessory_list.length > 0) {
          let newList1 = []
          let newList2 = []
          res.accessory_list.forEach(item => {
            if (item.name === '备案证') {
              newList2.push(item)
            } else {
              newList1.push(item)
            }
          })
          mythis.companyInfo.certificate_imgs = newList1
          mythis.companyInfo.health_certificate_imgs = newList2
        }
        this.initCams(this.companyInfo.live_cams)
      })
    },
    onCapture () {
      if (this.camInfo.device_type !== 1) {
        this.$toast.fail('此类型摄像头不支持抓拍')
        return false
      }
      const loadingToast = this.$toast.loading({
        duration: 0,
        forbidClick: true,
        message: '抓拍中'
      })
      getCapture({ device_number: this.camInfo.device_number })
        .then(response => {
          loadingToast.clear()
          this.form.imgs_url = [response.data.pic_url]
          if (this.isAndroid()) {
            this.videoFlag = false
          }
          this.showDialog = true
        })
        .catch(e => {
          loadingToast.clear()
          this.$toast('抓拍失败，请检查网络')
        })
    },
    beforeClose (action, done) {
      if (this.isAndroid()) {
        this.videoFlag = true
      }
      if (action === 'confirm') {
        this.form.device_code = this.camInfo.device_code
        this.form.company_code = this.$route.params.id
        saveAdvice(this.form)
          .then(response => {
            this.$toast.success('提交成功')
            done()
            this.resetForm()
          })
          .catch(e => {
            this.$toast.fail('提交失败')
            done(false)
          })
      } else {
        this.resetForm()
        done()
      }
    },
    inputBlur () {
      window.scrollTo(0, 0)
    },
    popupAdviceType () {
      this.showAdviceType = true
    },
    onConfirmAdviceType (item, index) {
      this.form.advice_type = item.value
      this.showAdviceType = false
    },
    popupAdviceRate () {
      this.showAdviceRate = true
    },
    onConfirmAdviceRate (item, index) {
      this.form.advice_rate = item.value
      this.showAdviceRate = false
    },
    // submitAdvice() {

    // },
    showPopup () {
      this.livePicker = true
    },
    showPreview (index, imgs) {
      this.images = imgs.map(item => this.global.resourcePath + item.url)
      this.startIndex = index
      this.previewShow = true
    },
    handlePreview (img) {
      this.images = [img]
      this.startIndex = 0
      this.previewShow = true
    },
    onConfirmLive (value) {
      let index = value.index
      this.camInfo.device_code = this.liveList[index].device_code
      this.camInfo.device_type = this.liveList[index].device_type
      this.camInfo.device_name = this.liveList[index].device_name
      this.camInfo.device_number = this.liveList[index].device_number
      this.camInfo.device_id = this.liveList[index].device_id
      this.camInfo.device_serial = this.liveList[index].device_serial
      this.camInfo.device_desc = this.liveList[index].device_desc
      if (this.camInfo.device_type === 2) {
        this.videoPlayer.src = this.liveList[index].play_video_url
        this.livePicker = false
      } else {
        this.liveLoading = true
        // eslint-disable-next-line camelcase
        const { device_id, device_name, device_number } = this.camInfo
        getCam({ device_id, device_name, device_number })
          .then(response => {
            let res = response.data
            // let status = response.code == 200 ? 1 : 0;
            // if (!status) {
            //   this.$notify({
            //     type: "warning",
            //     message: "获取直播源失败，请稍后后再试"
            //   });
            // }
            this.videoPlayer.src = res.play_video_url
            this.imgData = []
            this.liveLoading = false
            this.livePicker = false
          })
          .catch(e => {
            this.liveLoading = false
            this.livePicker = false
            this.$notify({
              type: 'warning',
              message: '获取直播源失败，请稍后再试'
            })
          })
      }
    },
    showMoreDetail (text) {
      if (text.length > 12) {
        this.$dialog.alert({
          message: text
        })
      }
    },
    onError (player) {},
    toSpot1 () {
      this.$router.push({
        path: '/spot',
        query: {
          id: this.camInfo.schoolId
        }
      })
    },
    initCams (cams) {
      this.videoPlayer = new ChimeeMobilePlayer({
        wrapper: this.$refs.wrapper, // video dom容器
        src: '',
        isLive: true,
        autoplay: true,
        controls: false,
        box: 'native',
        playsInline: true,
        preload: 'auto',
        x5VideoPlayerFullscreen: false,
        x5VideoOrientation: 'landscape|portrait',
        x5VideoPlayerType: '',
        xWebkitAirplay: true,
        muted: true,
        disableUA: [
          'Mozilla/5.0 (Linux; Android 4.4.2; HM NOTE 1TD Build/KOT49H; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/62.0.3202.97 Mobile Safari/537.36'
        ]
      })
      this.liveList = cams
      this.cloneliveList = JSON.parse(JSON.stringify(this.liveList))
      this.liveList.forEach((item, index) => {
        this.liveColumns.push({
          text: item.device_name,
          id: item.device_code,
          index
        })
      })
      this.camInfo.device_code = this.liveList[0].device_code
      this.camInfo.device_type = this.liveList[0].device_type
      this.camInfo.device_name = this.liveList[0].device_name
      this.camInfo.device_number = this.liveList[0].device_number
      this.camInfo.device_id = this.liveList[0].device_id
      this.camInfo.device_serial = this.liveList[0].device_serial
      this.camInfo.device_desc = this.liveList[0].device_desc
      if (this.camInfo.device_type === 2) {
        this.videoPlayer.src = this.liveList[0].play_video_url
      } else {
        const toast = this.$toast.loading({
          duration: 0,
          message: '获取直播源中',
          forbidClick: true
        })
        // eslint-disable-next-line camelcase
        const { device_id, device_name, device_number } = this.camInfo
        getCam({ device_id, device_name, device_number })
          .then(response => {
            let res = response.data
            // let status = response.code == 200 ? 1 : 0;
            // if (!status) {
            //   this.$notify({
            //     type: "warning",
            //     message: "获取直播源失败，请稍后后再试"
            //   });
            // }
            this.videoPlayer.src = res.play_video_url
            toast.clear()
          })
          .catch(e => {
            toast.clear()
            this.$notify({
              type: 'warning',
              message: '获取直播源失败，请稍后后再试'
            })
          })
      }
    },
    showTimePopup () {
      this.popVisible = true
    },
    closeTimePopup () {
      this.popVisible = false
    },
    confirmTime (time) {
      this.chosedTime = time.format('yyyy-MM-dd hh:mm')
      this.getPics()
      this.popVisible = false
    },
    swipeImg (index) {
      if (this.lastSwipeIndex === 2 && index === 0) {
        this.imgIndex = this.imgIndex + 1
      } else if (this.lastSwipeIndex === 0 && index === 2) {
        this.imgIndex = this.imgIndex - 1
      } else if (index > this.lastSwipeIndex) {
        this.imgIndex = this.imgIndex + 1
      } else if (index < this.lastSwipeIndex) {
        this.imgIndex = this.imgIndex - 1
      }
      const toast = this.$toast.loading({
        duration: 0,
        forbidClick: true,
        message: '获取中...'
      })
      getReviewPics({
        device_id: this.camInfo.device_id,
        device_serial: this.camInfo.device_serial,
        time: this.chosedTime,
        img_index: this.imgIndex,
        first_post: ''
      })
        .then(response => {
          toast.clear()
          let res = response.data.pic_urls
          if (this.lastSwipeIndex === 2 && index === 0) {
            this.$set(this.imgData, 1, res[0])
          } else if (this.lastSwipeIndex === 0 && index === 2) {
            this.$set(this.imgData, 1, res[0])
          } else if (this.lastSwipeIndex === 0 && index === 1) {
            this.$set(this.imgData, 2, res[0])
          } else if (this.lastSwipeIndex === 1 && index === 2) {
            this.$set(this.imgData, 0, res[0])
          } else if (this.lastSwipeIndex === 2 && index === 1) {
            this.$set(this.imgData, 0, res[0])
          } else if (this.lastSwipeIndex === 1 && index === 0) {
            this.$set(this.imgData, 2, res[0])
          }
          this.lastSwipeIndex = index
        })
        .catch(e => {
          toast.clear()
          this.$notify({
            type: 'warning',
            message: '获取留影回看图片失败，请稍后后再试'
          })
        })
    },
    toSpot () {
      this.$router.push({
        path: '/spot',
        query: {
          id: this.$route.params.id
        }
      })
    },
    getPics () {
      const toast = this.$toast.loading({
        duration: 0,
        forbidClick: true,
        message: '获取中...'
      })
      getReviewPics({
        device_id: this.camInfo.device_id,
        device_serial: this.camInfo.device_serial,
        time: this.chosedTime,
        img_index: '1',
        first_post: '1'
      })
        .then(response => {
          toast.clear()
          this.imgData = response.data.pic_urls
        })
        .catch(e => {
          toast.clear()
          this.$notify({
            type: 'warning',
            message: '获取留影回看图片失败，请稍后后再试'
          })
        })
    }
  },
  beforeDestroy () {
    this.videoPlayer.destroy()
  }
}
</script>
<style>
.center {
  height: 100%;
  padding-bottom: 50px;
  padding-top: 46px;
  box-sizing: border-box;
}

.tab-box {
  padding-bottom: 46px;
  box-sizing: border-box;
}

.review-img-box {
  text-align: center;
}

.bottom {
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
  /* display: flex;
  justify-content: center;
  align-items: center; */
}
.live-picker {
  display: flex;
  height: 180px;
  justify-content: center;
  align-items: center;
  color: #1989fa;
}
.van-cell__title {
  text-align: left !important;
}
</style>
