<template>
  <div class="detail">
     <Nav title='投诉举报详情' />
    <div class="tips">
      <h2>
        {{data.complaintreport_title}}
      </h2>
      <div class="tips_tag">
        投诉对象: {{data.company_name}}
      </div>
      <div class="tips_content">
        {{data.complaintreport_content}}
      </div>
      <div class="tips_imgs">
        <div v-for="(item, key) in tipImgs" :key="key" class="one">
          <img :src="imageUrl+item" alt="" width="60" height="60">
        </div>
      </div>
      <div class="time">
        {{data.add_time}}
      </div>
    </div>
    <div class="result" v-if="!!data.result_user_name">
      <div class="result_bg">
        <h3>
          处理结果
        </h3>
        <div class="result_content">
          {{data.result_content}}
        </div>
        <div class="result_img">
            <div class="one" v-for="(item, key) in handleImgs" :key="key+'handleImgs'">
              <img :src="imageUrl+item" alt="" width="60" height="60">
            </div>
        </div>
        <div class="time">
          {{data.update_time}}
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import axios from '../../axios'
import Nav from '../../components/Nav'
import {imageUrl} from '../../config/index'
export default {
  components: {
    Nav
  },
  data() {
    return {
      complaintreport_code: '',
      data: {},
      tipImgs: [],
      handleImgs: [],
      imageUrl: imageUrl
    }
  },
  created() {
    this.complaintreport_code = this.$route.query.complaintreport_code
    this.init(this.complaintreport_code)
  },
  methods: {
    init(complaintreport_code) {
      axios.get('/app/complaintReport/single', {complaintreport_code}).then(v => {
        this.data = v.data
        this.tipImgs = v.data.complaintreport_img.split(',')
        this.handleImgs = v.data.result_img.split(',')
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.detail
  .tips
    background #fff
    padding 69px 15px 15px 15px
    
    h2
      color #3d3d3d
      font-size 18px
      font-weight bold
      padding-bottom 15px
    .tips_tag
      font-size 14px
      color #a2abc2
      padding-bottom 15px
      border-bottom 1px solid #eee
    .tips_content
      color #7f888d
      font-size 16px
      padding 10px 0
      line-height 24px
    .tips_imgs
      overflow hidden
      .one
        border 1px solid #eee
        width 60px
        height 60px
        float left
        margin-right 5px
        margin-bottom 5px
        img
          width 60px
          height 60px
          display block
    .time
      color #8d9699
      font-size 14px
      padding 10px 0
  .result
    padding 10px
    .result_bg
      background #fff
      padding 10px
      h3
        color #3d3d3d
        font-size 18px
        font-weight bold
        padding-bottom 15px
      .result_content
        color #7f888d
        font-size 15px
        padding 10px 0
        line-height 24px
      .result_img
        overflow hidden
        .one
          border 1px solid #eee
          width 60px
          height 60px
          float left
          margin-right 5px
          margin-bottom 5px
          img
            width 60px
            height 60px
            display block
      .time
        color #8d9699
        font-size 14px
        padding 10px 0
</style>