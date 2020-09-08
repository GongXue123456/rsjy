<template>
  <div class="detail">
    <Nav title='案件中心' />
    <div class="top">
      <h1>
        {{ data.casecenter_title }}
      </h1>
      <section>
        {{data.casecenter_content}}
      </section>
      <div class="info">
        <h2>
          案件进度
        </h2>
        <div class="info_concrete">
          <div class="info_item active">
            <span class="icon"></span>
            {{data.user_name_main}} <i v-for="(item, key) in user_code_secondary" :key="key+'i'">{{item.user_name}} </i> 待处理
          </div>
          <div class="info_item">
            <span class="icon"></span>
            <span>{{data.user_name_audit}}</span> 审批通过 {{data.casecenter_audit_time}}
          </div>
          <div class="info_item">
            <span class="icon"></span>
            <span>{{data.user_name_add}}</span> 新增案件 {{data.add_time}}
          </div>
        </div>
      </div>

      <div class="assistant">
          <a v-for="(item, key) in user_code_secondary" :key="key" class="assistant_item" :href="'tel:' + item.user_loginname">
           <span>
             协同办案人
           </span>
           <span>
             {{item.user_name}}
           </span>
          </a>
      </div>
    </div>

    <div class="down">
      <div class="down_input">
        <h3>
          处理结果
        </h3>
        
        <cube-textarea v-model="casecenter_result" 
        placeholder="输入处理结果" :maxlength="tmaxlength"></cube-textarea>
      </div>
      <div class="down_input">
        <h3>
          上传照片
        </h3>
        <div class="down_input_img">
          <cube-upload
            action="app/file/upload"
            :simultaneous-uploads="1"
              @file-success = "fileSuccess"
              @files-added = "filesAdded"
              @file-removed= "fileRemoved"
              @file-error = "fileError" />
        </div>
      </div>
      <div class="btn">
        <cube-button class="onSure" :primary="true" @click="save">立即提交</cube-button>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from '../../components/Nav'
import axios from '../../axios'
// eslint-disable-next-line no-unused-vars
import Vue from 'vue'
export default {
  components: {
    Nav
  },
  data() {
    return {
      casecenter_code: '',
      casecenter_result: '',
      data: {},
      flieValue: [],
      user_code_main: {},
      user_code_secondary: [],
      user_code_audit: {},
      tmaxlength: 1000
    }
  },
  created() {
    this.casecenter_code = this.$route.query.casecenter_code
    this.init(this.casecenter_code)
  },
  methods: {
    init(casecenter_code) {
      let mythis = this;
      axios.get('/app/caseCenter/single', {casecenter_code}).then(v => {
        mythis.data = v.data.caseCenter
        if (v.data.user_code_main) mythis.user_code_main = v.data.user_code_main
        if (v.data.user_code_secondary) mythis.user_code_secondary = v.data.user_code_secondary
        if (v.data.user_code_audit) mythis.user_code_audit = v.data.user_code_audit
      })
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
    save() {
      let params = {
        casecenter_code: this.casecenter_code,
        casecenter_result: this.casecenter_result,
        result_state: 2,
        images: this.flieValue.join(',')
      }
      let mythis = this
      axios.put('/app/caseCenter/update', params).then(v => {
        if(v.code === 200){
          mythis.$router.push({
            path: 'casecenter',
            query: {
              casecenter_audit_state: 2,
              result_state: 2
            }
          })
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.detail
  .top
    padding 70px 10px 10px 10px
    background #fff
    margin-bottom 20px
    h1
      color $h1-6
      font-size 18px
      font-weight bold
      padding-bottom 10px
    section
      color $detail-section
      font-size 16px
      padding 10px 0
      line-height 24px
      margin-bottom 10px
    .info
      background #f7f7fa url('assets/img/3.png') 8px 10px no-repeat
      background-size 27px
      border-radius 5px
      margin-bottom 20px
      h2
        color #a9b3b7
        font-size 18px
        padding 16px 41px
      .info_concrete
        font-size 14px
        color #a0a6ab
        position relative
        padding: 0px 10px 10px 0px;
        &::before
            content ''
            width 1px
            height 76%
            background #a0a6ab
            position: absolute
            left: 23px
            top: 10px
        .info_item
          position relative
          .icon{
            background url('assets/img/2.png')   no-repeat
            background-size 18px
            position absolute
            left 15px
            top 5px;
            width 20px
            height 20px
          }
          line-height 30px
          padding-left 47px
          span
            color #507abb
          i
            font-style normal
        .active
          .icon 
            color $btn-primary-bgc
            background url('assets/img/1.png')  no-repeat
            background-size 18px
          &::before
            content unset
    .assistant
      .assistant_item
        background #f7f7fa url('assets/img/4.png')  no-repeat
        background-position right 15px bottom 11px
        font-size 16px
        display flex
        justify-content space-between
        padding 15px 45px 15px 15px
        border-radius 4px
        background-size 23px
        margin-bottom 10px
  .down
    .down_input
      background #fff
      margin-bottom 20px
      padding-bottom: 10px;
      h3
        font-size 16px
        padding 15px 10px
      .down_input_img
        padding 0 10px
      .cube-textarea-wrapper
        margin 10px
</style>