<template>
  <div>
    <Nav title='投诉举报' />
    
    <div class="create">
        <cell title="投诉举报对象" @click="showCompany" :flag="true" :content="model.company_name"></cell>
        <div class="hui"></div>
        <cube-input v-model="model.complaintreport_title" placeholder="请输入投诉/举报标题" ></cube-input>
        <div class="hui"></div>
        <cube-textarea v-model="model.complaintreport_content" :maxlength="contentlength" placeholder="请详细说明投诉/举报内容"></cube-textarea>
        <div class="hui"></div>
        <div class="uploadPhone">
          <div class="uploadPhone_title">上传照片</div>
          <cube-upload
          action="app/file/upload"
          :simultaneous-uploads="1"
          @file-success = "fileSuccess"
          @files-added = "filesAdded"
          @file-removed= "fileRemoved"
          @file-error = "fileError"
          :max=5
          />
        
        </div>
        <div class="hui"></div>

        <cube-input v-model="model.complaintreport_telephone" placeholder="联系电话(必填)" ></cube-input>
        <div class="hui"></div>
        <div>
          <cube-button class="onSure" @click="submit" :primary="true">提交</cube-button>
        </div>
    </div>

    
      <div class="shade" v-show="onalter">
         <search class="search" @myvalue="ser" :name.sync="params.company_name" type="home" />
        <div class="scroll-list-wrap">
          <cube-scroll
            ref="scroll"
            :data="items"
            :options="options"
            @pulling-up="onPullingUp">
              <div class="box" v-for="(item, key) in items" :key="key">
                <label>
                  <div class="box_left">
                    <div class="box_name">{{item.company_name}}</div>
                    <div class="box_address">{{item.province}}{{item.city}}{{item.area}}{{item.town}}{{item.vill}}{{item.address}}</div>
                  </div>
                  <div class="box_right">
                      <input @change="selectCompany(item)" type="radio" name="测试">
                  </div>
                </label>
              </div>
                <template v-if="customPullDown" slot="pulldown" slot-scope="props">
                  <div
                      v-if="props.pullDownRefresh"
                      class="cube-pulldown-wrapper"
                      :style="props.pullDownStyle">
                    <div
                        v-show="props.beforePullDown"
                        class="before-trigger"
                        :style="{paddingTop: props.bubbleY + 'px'}">
                      <span :class="{rotate: props.bubbleY > pullDownRefreshThreshold - 40}">↓</span>
                    </div>
                    <div class="after-trigger" v-show="!props.beforePullDown">
                      <div v-show="props.isPullingDown" class="loading">
                        <cube-loading></cube-loading>
                      </div>
                      <div v-show="!props.isPullingDown" class="text"><span class="refresh-text">Refresh success</span></div>
                    </div>
                  </div>
                </template>
          </cube-scroll>
        </div>
        <div class="btn">
          <cube-button @click="onalter = false" :primary="true">确定选择</cube-button>
        </div>
      </div>
  </div>

</template>

<script>
import cell from '../../components/cell'
import search from '../../components/search'
import Nav from '../../components/Nav'
import axios from '../../axios'
import {local} from '../../utils'
// import {URL} from '../../config'
export default {
  components: {
    cell,
    Nav,
    search
  },
  data() {
    return {
      params: {
        pager_offset: 0,
        pager_openset: 20,
        company_name:''
      },
      model: {
        company_code: '',
        company_name: '',
        complaintreport_title: '',
        complaintreport_content: '',
        complaintreport_img: '',
        complaintreport_telephone: '',
        complaintreport_state: 1,
        complaintreport_openid: ''
      },
      onalter: false,
      isFlag: false,
      flieValue: [],
      items: [],
      pullDownRefresh: false,
      pullDownRefreshThreshold: 60,
      pullDownRefreshStop: 40,
      pullDownRefreshTxt: 'Refresh success',
      pullUpLoad: true,
      pullUpLoadThreshold: 0,
      pullUpLoadMoreTxt: '',
      pullUpLoadNoMoreTxt: '暂无数据',
      customPullDown: true,
      contentlength: 200
    }
  },
  computed: {
    options() {
      return {
        pullDownRefresh: this.pullDownRefreshObj,
        pullUpLoad: this.pullUpLoadObj,
        scrollbar: true
      }
    },
    pullDownRefreshObj: function() {
      return this.pullDownRefresh ? {
        threshold: parseInt(this.pullDownRefreshThreshold),
        // Do not need to set stop value, but you can if you want
        // stop: parseInt(this.pullDownRefreshStop),
        txt: this.pullDownRefreshTxt
      } : false
    },
    pullUpLoadObj() {
      return this.pullUpLoad ? {
        threshold: parseInt(this.pullUpLoadThreshold),
        txt: {
          more: this.pullUpLoadMoreTxt,
          noMore: this.pullUpLoadNoMoreTxt
        }
      } : false
    }
  },
  created() {
    
  },
  methods: {
    init(params) {
      axios.get("/app/company/findByList", params).then(v => {
        if (v.data.pager_list.length === 0) {
          this.$refs.scroll.forceUpdate()
          this.pullUpLoad = false
          return 
        }
        this.items = this.items.concat(v.data.pager_list)
      })
    },
     ser(value) {
      this.pullUpLoad = true
      this.$refs.scroll.forceUpdate()
      this.items = []
      // this.flag = false
      this.params.pager_offset = 0
      this.params.company_name = value;
      this.init(this.params)
    },
    onPullingUp() {
      this.params.pager_offset += 20
      this.init(this.params)
    },
    filesAdded() {
    },
    fileSuccess(val) {
      let url = val.response.data.visit_url
      this.flieValue.push(url.substring(url.indexOf('resources')))
    },
    fileError() {
      this.$createToast({
        txt: '图片上传失败',
        type: 'txt'
      }).show()
    },
    fileRemoved(val){
      let url = val.response.data.visit_url
      let index = this.flieValue.indexOf(url.substring(url.indexOf('resources')))
      this.flieValue.splice(index, 1)
    },
    selectCompany(item) {
      this.model.company_name = item.company_name
      this.model.company_code = item.company_code
    },
    showCompany() {
      this.onalter=true
      if (this.isFlag) {
        return
      } else {
        this.isFlag = true
        this.init(this.params)
      }
    },
    submit() {
      this.model.complaintreport_img = this.flieValue.join(',')
      this.model.complaintreport_openid = local.get('wx_openid')
      if (!this.model.complaintreport_openid) {
        this.$createToast({
          time: 1000,
          txt: '用户未授权'
        }).show()
        return
      }
      if(this.model.complaintreport_telephone==undefined||this.model.complaintreport_telephone==""||this.model.complaintreport_telephone.length!=11){
        this.$createToast({
          time: 1000,
          txt: '请输入正确的电话号码'
        }).show()
        return
      }
      // eslint-disable-next-line no-unused-vars
      axios.post("/app/complaintReport/save",this.model).then((v) => {
        // let params = {
        //   mess_event: 6,
        //   company_code: null,
        //   other_code: v.data.other_code
        // }
        //axios.post(URL, params)
        this.$createDialog({
          type: 'alert',
          title: '投诉已受理',
          content: '点击确认返回',
          onConfirm: () => {
            this.$router.go(-1)
          }
        }).show()
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.create
  padding 64px 10px 10px 10px
  .hui
    height 10px
  .uploadPhone
    background #fff
    padding-left 10px
    .uploadPhone_title
      font-size 14px
      padding 10px 0
.shade
  position absolute
  top 0
  width 100%
  bottom 0
  background #fff
  z-index 99
  .search
    padding-top 64px
  .scroll-list-wrap
    position absolute
    width 100%
    top 110px
    bottom 60px
    .before-trigger
      font-size 0.5rem
    .box
      padding 10px
      border-bottom 1px solid #eee
      overflow hidden
      .box_left
        float left
        width 300px
        .box_name
          font-size 16px
          padding-bottom 10px
        .box_address
          font-size 14px
          text-overflow ellipsis
          overflow hidden
          white-space nowrap
      .box_right
        float right
  .btn
    position absolute
    bottom 0
    width 100%
</style>