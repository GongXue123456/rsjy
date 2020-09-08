<template>
  <div>
    <Nav title='自查自纠详情' />
    <div class="bg">
      <div class='bg_code'>
        <span class="green">{{today}}</span>
      </div>
    </div>

    <div class="standard">
      <div class="standard_hd">
        <div v-for="(one, key1) in checkself_content" :key="key1">
          <patrolcheck  v-for="(two, key2) in one.page_config_content_new" :key="key2 + 'key2'" :name="two.attr_ch" :isStats="isStats">
              <div :class="two.attr_val=='不合格'?'red':'green'">
                {{two.attr_val}}
              </div>
              <div v-if="two.describe" class="desc">
                  {{two.describe}}
              </div>
              <ul v-if="two.url_new" class="descImg">
                <li v-for="(three, key3) in two.url_new" :key="three">
                  <img  :src="imageUrl+three"  alt="" @click="handleImgsClick(three,key3)">
                </li>
              </ul>
          </patrolcheck>
        </div>

      </div>
      <div>
        <!-- <cube-button :primary="true" @click="$router.go(-1)">返回</cube-button> -->
      </div>

    </div>
  </div>
</template>
<script>
import patrolcheck from '../../components/patrolcheck'
import Nav from '../../components/Nav'
import axios from '../../axios/index.js'
import {imageUrl} from '../../config/index'
// import moment from 'moment'
export default {
  components: {
    patrolcheck,
    Nav
  },
  data() {
    return {
      checkself_code: '',
      isStats: false,
      checkself_content: [],
      today: '',
      initialIndex: 0,
      imageUrl: imageUrl,
      imgs:[]
    }
  },
  created() {
    this.checkself_code = this.$route.query.checkself_code
    this.init(this.checkself_code)
     window.console.log(this.imageUrl)
  },
  methods: {
    init(checkself_code) {
      axios.get("/app/checkSelf/findByCode", {checkself_code}).then(v => {
        this.checkself_content = JSON.parse(v.data.checkself.checkself_content)
       
           this.checkself_content.forEach(ele => {
             window.console.log(ele.page_config_content_new)
             if(ele.page_config_content_new!=undefined){
          ele.page_config_content_new.forEach( item => {
             
            // if(item.url.length==0||item.url==undefined){
            //    item.url_new = []
            // }else{
            //    item.url_new = item.url? item.url.split(',') : []
            // }
            // window.console.log(item.url)
            item.url_new = item.url? item.url.split(',') : []
            window.console.log(item.url)
          })
            }
        })
      
       
        this.today = v.data.checkself.add_time
      })
    },
     handleImgsClick(val,index) {
       
          this.imgs = val? (this.imageUrl+val).split(',') : []
            window.console.log(this.imgs)
      this.initialIndex = index
      
      const params = {
        $props: {
          imgs: this.imgs,
          initialIndex: 'initialIndex', // 响应式数据的key名
          loop: false
        },
        $events: {
          change: (i) => {
            // 必须更新 initialIndex
            this.initialIndex = i
          }
        }
      }
      this.$createImagePreview({ ...params }).show()
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
      position absolute
      right 8px
      top 2px
      img
        width 15px
.standard
  padding 0 15px 0
  position relative
  top -40px
  width 100%
  height: -webkit-fill-available;
  box-sizing border-box
  .green
    color #1db65e
    font-size 14px
  .red
    color #e6a23c
    font-size 14px
  .standard_hd,.standard_md,.standard_bd
    margin-bottom 10px
  .checkPhone
    padding 10px 0 0 15px
  .standard_hd
    .desc
      font-size 14px
    .descImg
      overflow hidden
      li
        float left
        img
          height 60px
          width 60px
          display block
    .selectFourbox
      background : #fff
      padding: 0 20px 20px
      border-bottom 1px solid #E0E0E0
      h4
        font-size: 15px
        padding: 15px 0
        line-height 1.5
</style>
