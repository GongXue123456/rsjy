<template>
  <div>
      <Nav title='企业列表' />
      <div class="scroll-list-wrap">
        <cube-scroll
          ref="scroll"
          :data="items"
          :options="options"
          @pulling-up="onPullingUp">
          <ul class="onscroll">
            <li v-for="(item, index) in items" :key="index" @click="go(item)">
                <cube-button :light="true">{{item.company_name}}</cube-button>
            </li>
          </ul>
          <div v-show="flag" class="none">
            暂无数据
          </div>
        </cube-scroll>
      </div>
  </div>
</template>

<script>
import axios from '../../axios/index.js'
import Nav from '../../components/Nav'
export default {
  components: {
    Nav
  },
  data () {
    return {
      current: '',
      labels:  [],
      objLabels: [],
      items: [],
      params: {
        pager_offset: 0,
        pager_openset: 20
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
      axios.get('/app/company/search', params).then(v => {
        if (v.data.companyList.length === 0) {
          this.$refs.scroll.forceUpdate()
          this.pullUpLoad = false
          if (this.items.length === 0) {
            this.flag = true
          }
        }
        this.items = this.items.concat(v.data.companyList)
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
      this.$store.dispatch('patrol/getCompany', item)
      this.$router.push({
        path: '/patrolcreate'
      })
    }
  }
}
</script>

<style lang="stylus">
.scroll-list-wrap
  position absolute
  width 100%
  top 54px
  bottom 0
  ul.onscroll
    li
      padding: 5px;
  .none
    text-align center
    margin-top 20px
    font-size 18px
    color #a5a5a5
</style>