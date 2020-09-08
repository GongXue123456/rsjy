<template>
  <div class="index">
     <Nav title='投诉举报列表' />
      <div v-if="items.length>0" class="scroll-list-wrap">
        <cube-scroll
          ref="scroll"
          :data="items"
          :options="options"
          @pulling-up="onPullingUp">
            <div @click="$router.push({
              path: 'tipoffsdetail',
              query: {
                complaintreport_code: item.complaintreport_code
              },
            })" class="index-box" v-for="(item, key) in items" :key="key">
              <div class="time">
                  {{item.add_time}}
              </div>
              <div class="boxinfo">
                {{item.complaintreport_title}}
              </div>
              <div v-if="item.complaintreport_state==2" class="tag handle">
                已处理
              </div>
              <div v-else class="tag waithandle">
                待处理
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
       <empty v-else title='暂无投诉举报信息'/>
    <div class="btn">
      <cube-button @click="$router.push({path: 'tipoffscreate'})" :primary="true">我要投诉/举报</cube-button>
    </div>
  </div>
</template>

<script>
import axios from '../../axios'
import {local} from '../../utils'
import Nav from '../../components/Nav'
import empty from '../../components/empty'
export default {
   components: {
    Nav,
    empty
  },
  data () {
    return {
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
    let openid = this.$route.query.openid
    local.set('wx_openid', openid)
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
      axios.get('/app/complaintReport/list', params).then(v => {
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
      this.detail.cclj_count = item.cclj_count
      this.detail.cclj_handler = item.cclj_handler
      this.detail.cclj_time = item.cclj_time
      let arr = []
      item.accessory_list.forEach(val => {
        arr.push(val.url)
      })
      this.detail.accessory_list = arr
    },
    back () {
      this.onalter = false
      this.detail = {}
    }
  }
}
</script>

<style lang="stylus" scoped>
.index
  .scroll-list-wrap
    position absolute
    width 100%
    top 54px
    bottom 60px
    .index-box
      background #fff
      border-bottom 1px solid #eee
      padding 13px 10px
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
        top 36px
        margin-top 0
        right 12px
      .boxinfo
        font-size 17px
        padding-top 10px
      .time
        color #cfcfcf
        font-size 14px
      .tag
        position absolute
        right 38px
        top 28px
        padding 6px 10px
        border-radius 10px
      .handle
        color $success-color
        background $success-bgc
      .waithandle
        color $wait
        background $wait-bgc
  .btn
    position fixed
    bottom 0
    left 0
    width 100%
  .shade
    position absolute
    top 0
    width 100%
    bottom 0
    background #fff
    z-index 99
    .back
      padding 20px
</style>