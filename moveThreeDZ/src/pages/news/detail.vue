<template>
  <div>
    <Nav :title='data.news_category_name' />
     <div class="detail">
    
    <h3 style="font-size: 0.46rem;">{{data.news_title}}</h3>
    <p>
      <span>{{data.news_category_name}}</span>
    </p>
    <hr />
    <div class="context" v-html="data.news_content" style="font-size: 0.36rem;">

    </div>
  </div>
  </div>
 
</template>
<script>
import Nav from '../../components/Nav'
import axios from '../../axios/index.js'
export default {
  components: {
    Nav
  },
  data() {
    return {
      code: '',
      data: {}
    }
  },
  created() {
   this.code = this.$route.query.code
   this.init()
  },
  methods: {
    init() {
      let params = {
        news_code: this.code
      }
      axios.get('/app/news/single', params).then(v => {
        this.data = v.data;
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
.detail
  background #fff
  padding 20px
  h3
    color #333
    padding-bottom 20px
    padding-top 45px
    line-height 1.8
    font-size 17px !important
  p
    overflow hidden
    span
      font-size: 14px
      display block
      float left
      background $btn-primary-bgc
      color #FFF
      padding 3px 6px
  .context
   /deep/ img
      width 100% !important 
   /deep/ p
      font-size 14px
      line-height 1.8
   /deep/ h1
      font-size 16px !important
      line-height 1.8
     
</style>
