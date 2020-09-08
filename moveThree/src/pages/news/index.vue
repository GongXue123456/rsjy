<template>
  <div>
    <Nav title='新闻列表' />
    <div class="navbar">
       <cube-scroll-nav-bar :current="current" :labels="labels" @change="changeHandler"  />
    </div>
   
      <div class="scroll-list-wrap">
        <cube-scroll
          ref="scroll"
          :data="items"
          :options="options"
          @pulling-up="onPullingUp">
          <ul class="onscroll">
            <li v-for="(item, index) in items" :key="index" @click="go(item)">
                <panel :data="item" />
            </li>
          </ul>
           <empty v-show="flag" title='暂无新闻信息'/>
        </cube-scroll>
      </div>
  </div>
</template>
<script>
import axios from '../../axios/index.js'
import panel from '../../components/panel';
import Nav from '../../components/Nav';
import empty from '../../components/empty';
export default {
  components: {
    panel,Nav,empty
  },
  data () {
    return {
      current: '',
      labels:  [],
      objLabels: [],
      items: [],
      params: {
        pager_offset: 0,
        pager_openset: 10,
        news_category_code: ''
      },
      pullUpLoad: true,
      pullUpLoadThreshold: 0,
      pullUpLoadMoreTxt: '加载...',
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
    this.init()
  },
  methods: {
    init() {
      axios.get('/app/newsCategory/all').then((v) => {
        v.data.forEach(element => {
          this.labels.push(element.news_category_name)
          this.current = this.labels[0]
          this.objLabels.push({
            news_category_name: element.news_category_name,
            news_category_code: element.news_category_code
          })
        })
        this.current = this.labels[0]
      })
    },
    getList(params) {
      axios.get('/app/news/list', params).then(v => {
        if (v.data.pager_list.length === 0) {
          this.$refs.scroll.forceUpdate()
          this.pullUpLoad = false
          if (this.items.length === 0) {
            this.flag = true
          }
        }
        let items = v.data.pager_list.map(result => {
          return {
            url: result.news_imgurl,
            title: result.news_title,
            summary: result.news_summary,
            code: result.news_code
          }
        })
        this.items = this.items.concat(items)
      })
    },
    onPullingUp() {
      this.params.pager_offset += 10
      this.getList(this.params)
    },
    changeHandler (params) {
      this.pullUpLoad = true
      this.$refs.scroll.refresh()
      this.items = []
      this.flag = false
      this.params.params = 0
      this.params.news_category_code = this.selectNewsCategoryCode(params)
      this.getList(this.params)
    },
    selectNewsCategoryCode(params) {
      let original = JSON.parse(JSON.stringify(this.objLabels))
      for (var i of original) {
        if (i.news_category_name === params) {
          return i.news_category_code
        }
      }
    },
    go(item) {
      this.$router.push({
        path: '/newsDetail',
        query: {
          code: item.code
        }
      })
    }
  }
}
</script>
<style lang="stylus">
.navbar
  padding-top 54px
.scroll-list-wrap
  position absolute
  width 100%
  top 120px
  bottom 0
  ul.onscroll
    li
      margin-bottom 2px
  .none
    text-align center
    margin-top 20px
    font-size 18px
    color #a5a5a5
</style>
