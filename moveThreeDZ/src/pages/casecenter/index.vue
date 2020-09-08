<template>
  <div class="index">
    <Nav title='案件中心列表' />
    <search class="search" @myvalue="ser" :name.sync="params.casecenter_title" type="home" />
    <!-- <search class="search" @input="onchange" v-model="params.casecenter_title" /> -->
    <ul class="index_ul">
      <li :class="{'active': selectDefault==key}" v-for="(item, key) in tabs" :key="key" @click="choose(item, key)">{{item.label}}</li>
    </ul>
    <div v-if="items.length>0" class="scroll-list-wrap">
      <cube-scroll
        ref="scroll"
        :data="items"
        :options="options"
        @pulling-up="onPullingUp">
            <div class="box" v-for="(item, key) in items" :key="key" @click="go(item,selectDefault)">
              <div class="code">
                {{item.casecenter_code}}
              </div>
              <div class="title">
                {{item.casecenter_title}}
              </div>
              <div class="tag handle" v-if="selectDefault == 0||selectDefault == 2">
                去查看
              </div>
              <div class="tag handle" v-else-if="selectDefault == 1">
                去处理
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
     <empty v-else title='暂无案件信息'/>
  </div>
</template>

<script>
import search from '../../components/search'
import Nav from '../../components/Nav'
import empty from '../../components/empty'
import axios from '../../axios'
import _ from 'lodash'
export default {
  components: {
    search,Nav,empty
  },
  data() {
    return {
      params: {
        pager_offset: 0,
        pager_openset: 10,
        casecenter_title: '',
        casecenter_audit_state: 1,
        result_state: 1
      },
      selectDefault:0,
      tabs: [{label: '待审批', value: 1}, {label: '待处理', value: 2}, {label: '已处理', value: 3}],
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
      beforeUrl:''
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
  beforeRouteEnter (to, from, next) {
            next(vm => {
                vm.beforeUrl = from.query.id
            })
        },
  created() {
    this.$nextTick(() => {
               window.console.log(this.beforeUrl);
              if(this.beforeUrl==0){
                this.selectDefault=0
                this.params.result_state = 1;
                this.params.casecenter_audit_state=1;
              }else if(this.beforeUrl==1){
                this.selectDefault=1
                this.params.result_state = 1;
                this.params.casecenter_audit_state=2;
              }else if(this.beforeUrl==2){
                this.selectDefault=2
                this.params.result_state = 2;
                this.params.casecenter_audit_state=2;
              }
               this.init(this.params)
            })
  },
  methods: {
    init(params) {
      axios.get('/app/caseCenter/list', params).then(v => {
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
      this.flag = false
      this.params.pager_offset = 0
      this.params.casecenter_title = value;
      this.init(this.params)
    },
    onPullingUp() {
      this.params.pager_offset += 10
      this.init(this.params)
    },
    onchange: _.debounce(function () {
      this.params.pager_offset = 0
      this.items = []
      this.init(this.params)
    }, 1500),
    go (item,index) {
      let url = 'casecenter'
      if (item.casecenter_audit_state === 1 && item.result_state === 1) {
        url = 'casecenterwait'
      } else if (item.casecenter_audit_state === 2 && item.result_state === 1) {
        url = 'casecentergoto'
      } else {
        url = 'casecentercomplete'
      }
      this.$router.push({
        path: url,
        query: {
          casecenter_code: item.casecenter_code,
          id:index
        }
      })
    },
    choose(item, key) {
      this.selectDefault = key
      this.params.pager_offset = 0
      this.items = []
      switch(item.label) {
        case '待审批':
          this.params.casecenter_audit_state = 1
          this.params.result_state = 1
          break
        case '待处理':
          this.params.casecenter_audit_state = 2
          this.params.result_state = 1
          break
        case '已处理':
          this.params.casecenter_audit_state = 2
          this.params.result_state = 2
      }
      this.init(this.params)
    }
  }
}
</script>

<style lang="stylus" scoped>
.index
  .search 
    padding-top 64px
  .index_ul
    display flex
    justify-content space-evenly
    background #fff
    color $casecenter
    padding 12px 0 15px 0
    font-size 16px
    .active
      color $btn-primary-active-bdc-pass
  .scroll-list-wrap
    position absolute
    width 100%
    top 154px
    bottom 0
    .before-trigger
      font-size 0.5rem
    .box
      background #fff
      border-bottom 1px solid #eee
      padding 15px
      position relative
      font-size 16px
      .code
        color #cfcfcf
        font-size 14px
      .title
        font-size 17px
        padding-top 10px
        width: 75%;
        white-space:nowrap;
        overflow:hidden;
        text-overflow:ellipsis;
      .tag
        position absolute
        font-size  14px
        right 10px
        top 18px
        padding 8px 12px
        border-radius 4px
      .handle
        color $success-color
        background $success-bgc
</style>