<template>
  <div class="index">
    <Nav v-if="!onalter" title='餐厨垃圾列表' />
    <div v-else class="head" >
      <div class="left " @click="back"><img src="../../assets/img/back.png">返回</div>
      <div class="center">
          <p>餐厨垃圾详情</p>
      </div>
      <div class="right"></div>
    </div>
      <div class="scroll-list-wrap">
        <cube-scroll
          ref="scroll"
          :data="items"
          :options="options"
          @pulling-up="onPullingUp">
            <div class="box" v-for="(item, key) in items" :key="key" @click="getDetail(item)">
              <div class="box_hd">
                  <img v-if="item.dictionary_module=='餐厨垃圾'" :src="url" />
                  <img v-else-if="item.dictionary_module=='废弃油脂'" :src="url1" />
                  <img v-else-if="item.dictionary_module=='食品废料'" :src="url2" />
              </div>
              <div class="box_bd">
                 <div class="boxinfo">
                <span class="module">{{item.dictionary_module}}</span>
                <span class="count">{{item.cclj_count}}kg</span>
              </div>
              <div class="time">
                {{item.cclj_time}}
              </div>
              </div>
              
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
    <!-- <div class="btn">
      <cube-button @click="add" :primary="true">新增一条餐厨垃圾</cube-button>
    </div> -->
  <div class="footer p15 bgcfff w"> 
        <van-row  gutter="20">
          <van-col span="24"><van-button  block type="primary" native-type="submit" @click="Add"> 新增一条餐厨垃圾 </van-button></van-col>
        </van-row>
       </div>
    <div class="shade" v-show="onalter">
      <cell title="类型" :content="detail.dictionary_module"></cell>
      <cell title="处理量" :content="detail.cclj_count"></cell>
      <cell title="处理人" :content="detail.cclj_handler"></cell>
      <cell title="处理时间" :content="detail.cclj_time"></cell>
      <showimgs title="餐厨垃圾照片" :items="detail.accessory_list" />
      <!-- <div class="back">
        <cube-button :outline="true" @click="back" style="background: #1db65e;border: none;color: #fff;">返回</cube-button>
      </div> -->
    </div>

  </div>
</template>

<script>
import axios from '../../axios'
import cell from '../../components/cell'
import showimgs from '../../components/showImgs'
import Nav from '../../components/Nav'
export default {
  components: {
    cell,
    showimgs,Nav,
  },
  data () {
    return {
        url:require('../../assets/img/canchulaji.png'),
        url1:require('../../assets/img/feiqiyouzhi.png'),
        url2:require('../../assets/img/shipinfeiliao.png'),
      params: {
        pager_offset: 0,
        pager_openset: 10
      },
      onalter: false,
      detail: {},
      items: [],
      pullDownRefresh: false,
      pullDownRefreshThreshold: 60,
      pullDownRefreshStop: 40,
      pullDownRefreshTxt: 'Refresh success',
      pullUpLoad: true,
      pullUpLoadThreshold: 0,
      pullUpLoadMoreTxt: '加载...',
      pullUpLoadNoMoreTxt: '暂无数据',
      customPullDown: true
    }
  },
  created() {
    this.init(this.params)
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
  methods: {
    init(params) {
      axios.get('/app/companyCCLJ/findByList_app', params).then(v => {
        if (v.data.pager_list.length === 0) {
          this.$refs.scroll.forceUpdate()
          this.pullUpLoad = false
          return 
        }
        this.items = this.items.concat(v.data.pager_list)
      })
    },
    onPullingUp() {
      this.params.pager_offset += 10
      this.init(this.params)
    },
    getDetail(item) {
      this.onalter = true
      this.detail.dictionary_module = item.dictionary_module
      this.detail.cclj_count = item.cclj_count + '(kg)'
      this.detail.cclj_handler = item.cclj_handler
      this.detail.cclj_time = item.cclj_time
      let arr = []
      item.accessory_list.forEach(val => {
        arr.push(val.url)
      })
      this.detail.accessory_list = arr
    },
    Add(){
      this.$router.push({
        path: '/kitchenWasteRefuseCreate'
      })
    },
    back () {
      this.onalter = false
      this.detail = {}
    }
  }
}
</script>
<style lang="stylus" scoped>
.cube-btn-outline::after
  border none 
.index
  .head
    width 100%
    position fixed
    top 0px
    left 0px
    z-index 999
    display flex
    justify-content space-between
    align-items center
    background-color #35495e
    color #fff
    font-size 17px
    height 54px
    line-height 54px
    .right
      width 50px
      height 50px
    .left
      height 50px
      line-height 50px
      font-size 15px
      .iconfont
        font-size 18px 
    img 
      width 20px
      padding 0px 0px 0px 10px 
      vertical-align sub 
  .scroll-list-wrap
    position absolute
    width 100%
    top 54px
    bottom 60px
    .box
      background #fff
      border-bottom 1px solid #eee
      padding 10px
      display flex
      position relative
      font-size 16px
      &::after
        content " "
        display inline-block
        height 6px
        width 6px
        border-width 2px 2px 0 0
        border-color #c8c8cd
        border-style solid
        -webkit-transform matrix(.71,.71,-.71,.71,0,0)
        transform matrix(.71,.71,-.71,.71,0,0)
        position absolute
        top 30px
        margin-top 0
        right 12px
      .box_hd
        margin-right: 10px
        width: 60px
        height: 60px
        line-height: 60px
        text-align: center
        img
         width 60px
         height 60px
      .box_bd
        flex 1
        min-width 0
      .boxinfo
        font-size 18px
        margin-top 10px
        .module
          padding-right 10px
      .time
        padding-top 10px
        color #cfcfcf
        font-size 14px
  .btn
    position fixed
    bottom 0
    left 0
    width 100%
  .shade
    position absolute
    top 54px
    width 100%
    bottom 0
    background #fff
    z-index 99
    .back
      padding 20px
</style>
<style scoped lang="less">
.footer{
  position: fixed;bottom: 0px;left: 0px;z-index: 99;background: #f5f5f5 !important;
  span{
    font-size: 18px;
  }
  }
</style>