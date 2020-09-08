<template>
  <div>
    <Nav title='工单列表' />
    <div  class="search">
      <search @myvalue="ser" :name.sync="params.company_name" type="home" />
    </div>
    <cube-tab-bar
      v-model="selectedLabelSlots"
      show-slider
      @click="clickHandler"
      >
      <cube-tab v-for="(item, index) in tabs"  :label="item.label" :key="index" :value="item.value" >
      </cube-tab>
    </cube-tab-bar>
    <div class="scroll-list-wrap">
      <cube-scroll
        ref="scroll"
        :data="items"
        :options="options"
        @pulling-up="onPullingUp">
          <patrol @onClick="go" v-for="(item, key) in items" :key="key" :data="item" >
            <img v-if="item.patrol_state=='2'&&item.patrol_result=='合格'" class="state" src='../../assets/img/qualified_pic.png'>
            <img v-if="item.patrol_state=='2'&&item.patrol_result=='不合格'" class="state" src='../../assets/img/disqualification_pic.png'>
            <span class="gis">
              <cube-button v-if="item.patrol_state=='1'" :inline="true" v-on:click.stop="gotogis(item)">开启GIS轨迹</cube-button>
               <cube-button v-else-if="item.patrol_state=='2'" :inline="true" v-on:click.stop="gotogis(item)">查看GIS轨迹</cube-button>
            </span>
          </patrol>
          <!-- <div  class="none">
            暂无数据
          </div> -->
           <empty v-show="flag" title='暂无工单信息'/>
      </cube-scroll>
    </div>
    <!-- <cube-button @click="$router.push({
      path: 'patrolcreate'
    })"  class="onSure" :primary="true">新增工单</cube-button> -->
  </div>
</template>
<script>
import axios from '../../axios/index.js'
import search from '../../components/search'
import patrol from '../../components/patrol'
import Nav from '../../components/Nav'
import empty from '../../components/empty'
export default {
  components: {
    search,
    patrol,
    Nav,
    empty
  },
  data () {
    return {
      selectedLabelSlots: '1',
      tabs: [{
        label: '待巡查',
        value: '1'
      }, {
        label: '已巡查',
        value: '2'
      }],
      items: [],
      params: {
        pager_offset: 0,
        pager_openset: 10,
        company_name: '',
        patrol_state: '1'
      },
      pullUpLoad: true,
      pullUpLoadThreshold: 0,
      pullUpLoadMoreTxt: '',
      pullUpLoadNoMoreTxt: '暂无数据',
      flag: false
    }
  },
  computed: {
    options() {
      return {
        pullUpLoad: this.pullUpLoadObj,
        scrollbar: true
      }
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
  created () {
    this.getList(this.params)
  },
  methods: {
    getList(params) {
      axios.get('app/patrol/list', params).then(v => {
        if (v.data.pager_list.length === 0) {
          this.$refs.scroll.forceUpdate()
          this.pullUpLoad = false
          if (this.items.length === 0) {
            this.flag = true
          }
        }
        this.items = this.items.concat(v.data.pager_list)
      })
    },
    ser(value) {
      this.pullUpLoad = true
      this.$refs.scroll.refresh()
      this.items = []
      this.flag = false
      this.params.pager_offset = 0
      this.params.company_name = value;
      this.getList(this.params)
    },
    onPullingUp() {
      this.params.pager_offset += 10
      this.getList(this.params)
    },
    clickHandler (params) {
      this.pullUpLoad = true
      this.$refs.scroll.refresh()
      this.items = []
      this.flag = false
      this.params.pager_offset = 0
      this.params.patrol_state = params
      this.getList(this.params)
    },
    go(item) {
      console.log(item)
      if (item.patrol_state === 1) {
        this.$router.push({
          path: '/patrolCheck',
          query: {
            patrol_code: item.patrol_code
          }
        })
      } else {
        this.$router.push({
          path: '/patrolDetail',
          query: {
            patrol_code: item.patrol_code
          }
        })
      }
    },
    gotogis(item) {
      this.$router.push({
        path: 'patrolonway',
        query: {
          patrol_code: item.patrol_code,
          active:item.patrol_state
        }
      })
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
.search
  padding-top 54px
.cube-tab
  font-size 16px
  
.cube-tab-bar
  height 37px
  background #fff
  .cube-tab_active
    color #1DB667
  .cube-tab-bar-slider
    display none
.scroll-list-wrap
  position absolute
  width 100%
  top 154px
  bottom 0px
  .before-trigger
     font-size 0.5rem
  .state
     width 60px
     height 60px
     position absolute
     right 37px
     top 10px
  .gis
    position absolute
    right 37px
    bottom 10px
  .none
    text-align center
    margin-top 20px
    font-size 18px
    color #a5a5a5
.onSure
  position fixed
  bottom 0
  left 0
</style>
