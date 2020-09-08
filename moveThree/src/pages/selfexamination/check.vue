<template>
  <div>
    <Nav title='新增自查自纠' />
    <div class="bg">
      <div class='bg_code'>
        <span class="green">{{today}}</span>
      </div>
    </div>

    <div class="standard">
      <div class="standard_hd">
        <div class="box"  v-for="(one, key1) in data" :key="key1">
          <patrolcheck @updatefile="two.url = $event"  v-on:input="two.describe = $event" v-bind:title.sync="two.attr_val" :name="two.attr_ch" v-for="(two, key2) in one.page_config_content_new" :key="key2 + 'key2'"></patrolcheck>
        <!-- :isShow="isShow" -->
        </div>
      </div>
      <div>
        <cube-button v-if="data.length>0" :primary="true" @click="submit">提交自查记录</cube-button>
      </div>

    </div>
  </div>
</template>
<script>
import patrolcheck from '../../components/patrolcheck'
import Nav from '../../components/Nav'
import moment from 'moment'
import axios from '../../axios'
export default {
  components: {
    patrolcheck,
    Nav
  },
  data() {
    return {
      today: '',
      data: [],
       params: {
        company_code:'',
        user_province:''
      },
      // isShow: false
    }
  },
  created() {
    this.params.company_code=this.$route.query.id
    console.log(this.params.company_code)
    this.params.user_province=this.$route.query.province
    
    this.today = moment().format("YYYY-MM-DD")
    this.init()
  },
  methods: {
    init() {
      axios.get("/app/checkSelf/findByPageConfig",this.params).then(v => {
        console.log(v.data)
        let data = v.data.pageConfig
        data.map(ele => {
          if(ele.page_region_content){
            ele.page_config_content_new = JSON.parse(ele.page_region_content)
            ele.page_config_content_new.map(item => item.attr_val = '合格')
            return ele
          }
        })
        this.data = data
        console.log(this.data)
      })
    },
    submit() {
      let checkself_content = []
      let params = {}
      this.data.forEach(v => {
        let element = {
          page_config_content_new: v.page_config_content_new,
          page_config_name: v.page_config_name

        }
        checkself_content.push(element)
      })
      params.checkself_content = JSON.stringify(checkself_content)
      console.log(params)
      axios.post('/app/checkSelf/save',params).then(() => {
        this.$router.go(-1)
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
.bg
  margin-top 54px
  height: 130px
  padding: 30px 15px 0 15px
  background url('../../assets/img/selfcheck.png')
  background-size 100%
  background-repeat no-repeat
  .bg_code
    font-size 20px
    text-align right 
    span.green
      color #1DB667
      margin-right 10px
  .name
    padding-bottom 12px
    font-size 18px
    color #FFF
  .addr
    padding-bottom 20px
    font-size 14px
    color #A6A6A6
  .now_addr
    height 30px
    line-height 30px
    color #AEA389
    font-size 14px
    padding-left 10px
    background rgba(229,204,145,0.1)
    position relative
    .refurbish
      position: absolute;
      right: 10px;
      top: 2px;
      img
        width : 15px;
.standard
  padding 0 15px 0
  margin -40px 0 10px 0
  .standard_hd,.standard_md,.standard_bd
    margin-bottom 10px
  .checkPhone
    padding 10px 0 0 15px
  .standard_hd
    .selectFourbox
      background : #fff
      padding: 0 20px 20px
      border-bottom 1px solid #E0E0E0
      h4
        font-size: 17px
        padding: 20px 0
  .cube-btn
    font-size 18px
</style>
