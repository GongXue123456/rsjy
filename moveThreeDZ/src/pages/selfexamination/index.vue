<template>
  <div class="index">
     <Nav title='自查自纠列表' />
    <div  v-if="items.length>0" class="scroll-list-wrap">
      <cube-scroll
        ref="scroll"
        :data="items"
        :options="options"
        @pulling-up="onPullingUp">
        <div  v-for="(item,key) in items" :key="key" class="box"  @click="toDetail(item)">
          <div class="box_time">
            {{item.add_time}}
          </div>
          <div class="box_result">
            已自查
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
     <empty v-else title='暂无自查自纠信息'/>
    <div class="btn">
      <cube-button @click="go" :primary="true">新增一条自查记录</cube-button>
    </div>
  </div>
</template>

<script>
import axios from '../../axios'
import Nav from '../../components/Nav'
import empty from '../../components/empty'
export default {
   components: {
    Nav,empty
  },
  data () {
    return {
      params: {
        pager_offset: 0,
        pager_openset: 10,
        company_code:''
      },
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
    this.params.company_code=this.$route.query.id;
    this.init(this.params)
    // window.console.log(window.location.href)
  },
  methods: {
    init (params) {
      axios.get("/app/checkSelf/findByList", params).then(v => {
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
    go () {
      this.$router.push({
        path: 'selfexaminationcheck',
        query:{
          id:this.$route.query.id,
          province:this.$route.query.province
        }
      })
    },
    toDetail (item) {
      this.$router.push({
        path: 'selfexaminationdetail',
        query: {
          checkself_code: item.checkself_code
        }
      })
       
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
  .btn
    position fixed
    bottom 0
    left 0
    width 100%
  .cube-btn
    font-size 18px
  .box
    display flex
    justify-content space-between
    font-size 14px
    height 55px
    background #fff
    line-height 55px
    border-bottom 1px solid #eee
    position relative
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
      top 22px
      margin-top 0
      right 8px
    .box_time
      padding-left 20px
    .box_result
      padding-right 30px
      color #1db65e
</style>