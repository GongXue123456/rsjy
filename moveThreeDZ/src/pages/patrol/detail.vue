<template>
  <div>
    <Nav title='工单详情' />
    <div class="bg">
      <div class='bg_code'>
        <span class="green">{{patrol_type[data.patrol_type]}}</span>
        <i>{{data.work_order}}</i>
         <img v-if="data.patrol_result=='合格'" class="state" src='../../assets/img/qualified_pic.png'>
            <img v-if="data.patrol_result=='不合格'" class="state" src='../../assets/img/disqualification_pic.png'>
      </div>
      <div class="name">
        <p class="p1">{{data.company_name}}{{data.isblacklist ==2 ? '(黑名单)' : ''}}</p><p class="p2">{{companytag_name}}</p>
      </div>
      <div class="now_addr">
        <p>当前位置：{{data.location}}</p>
      </div>
     
    </div>

    <div class="standard">
      <div class="standard_hd">
        <!-- <patrolcheck :disabled='true' :key="key" v-for="(item, key) in patrol_config2" v-bind:title.sync="item.key" :name="item.val" name1='1' />
        <div :key="'patrol_config4-'+key" class="selectFourbox" v-for="(item, key) in patrol_config4">
          <h4>
            {{item.val}}
          </h4>
          <p>
            {{item.key}}
          </p>
        </div> -->
        <patrolcheck :disabled='true' v-for="(two, key2) in config_content" :key="key2 + 'key2'" :name="two.val" :isStats="isStats">
              <div :class="two.key=='不合格'?'red':'green'">
                {{two.key}}
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

      <div class="standard_md">
        <cell title='巡查结果' :content="data.patrol_result" />
        <cell title='巡查时间' :content="data.patrol_time" />
        <cell title='处理方式' :content="data.dispose_name || '暂无'" />
        <cell title='处罚方式' :content="data.punish_name || '暂无'" />
        <cell title='备注' :content="data.note" />
      </div>
      <div class="standard_bd">
        <showImages :items='data.patrol_imgs_list' />
      </div>
      <div class="standard_md">

      </div>
    </div>
  </div>
</template>
<script>
import patrolcheck from '../../components/patrolcheck'
import cell from '../../components/cell'
import Nav from '../../components/Nav'
import showImages from '../../components/showImgs'
import axios from '../../axios/index.js'
import {imageUrl} from '../../config/index'
export default {
  components: {
    patrolcheck,
    cell,
    showImages,
    Nav
  },
  data() {
    return {
       isStats: false,
       imageUrl: imageUrl,
      data: {},
      patrol_type: ['', '普通巡查', '双随机抽查', '工单派发'],
      // patrol_config2: [],
      // patrol_config4: [],
      checkerValue: [],
      config_content:[],
      options: [],
      companytag_name:'',
      model: {
        patrol_state: 2,
        patrol_result: '合格',
        dispose_name: '',
        dispose_code: '',
        punish_name: [],
        punish_code: [],
        note: '',
        patrol_time: '',
        patrol_imgs: []
      },
      imgUrl: [],
      flag: false
    }
  },
  computed: {
    computeStyle() {
      let patrol_type = this.data.patrol_type
      if (patrol_type === 1) {
        return 'green'
      } else if (patrol_type === 2) {
        return 'orange'
      } else if (patrol_type === 3) {
        return 'blue'
      }
      return ''
    }
  },
  created() {
    this.model.patrol_code = this.$route.query.patrol_code
    this.init(this.model.patrol_code)
  },
  methods: {
    init(patrol_code) {
      let params = {
        patrol_code: patrol_code
      }
      axios.get('/app/patrol/detail', params).then(v => {
        this.data = v.data
        this.config_content = JSON.parse(v.data.config_content)
        this.config_content.forEach(ele => {
             if(ele.url!=undefined){
         ele.url_new = ele.url? ele.url.split(',') : []
            }
        })
        // this.getPatrolConfig(this.data)
         if(v.data.companytag_code=='1001574645421581111111101'){this.companytag_name='四川省小作坊备案证'}
       else if(v.data.companytag_code=='1001574645421581111111102'){this.companytag_name='四川省小经营店备案证（流通）'}
       else if(v.data.companytag_code=='1001574645421581111111103'){this.companytag_name='食品经营许可证（餐饮）'}
       else if(v.data.companytag_code=='1001574645421581111111104'){this.companytag_name='四川省小经营店备案证（餐饮）'}
       else{this.companytag_name='食品经营许可证（流通）'}
      })
    },
    // getPatrolConfig(data) {
    //   axios.get('app/patrolConfig/single',{companytag_code: data.companytag_code}).then(v => {
    //     if (v.data.config_content) {
    //       let arr = JSON.parse(v.data.config_content)
    //       arr.forEach(element => {
    //         element.key = data[element.name]
    //         if (element.val1.length === 2) {
    //           this.patrol_config2.push(element)
    //         } else {
    //           this.patrol_config4.push(element)
    //         }
    //       })
    //     }
    //     window.console.log(this.patrol_config2)
    //   })
    // },
    merge(arr) {
      let obj = {}
      arr.map(v => {
        let key = v.name
        obj[key] = v.key
      })
      return obj
    }
  }
}
</script>
<style lang="stylus" scoped>
.bg
  margin-top 54px
  height: 200px
  padding: 30px 15px 0 15px
  background url('../../assets/img/portal.png')
  background-size 100%
  .bg_code
    font-size: 14px
    padding-bottom: 15px
    position relative
    .state
       width 60px
       height 60px
       position absolute
       right 17px
       top -20px
    span 
      background rgba(29,182,94,0.1)
      padding 5px 8px
      border-radius 3px
    span.green
      color #1DB667
      margin-right 10px
    i
      color :#A6A6A6
      font-style: initial
  .name
    font-size:18px
    color: #FFF
    display inline-block
    width 100%
    p
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      padding 10px 0px
    .p1
      width 60%
      float left
    .p2
      float right
      width 40%
      text-align center
      font-size 13px
      background rgba(29,182,94,0.1)
      border-radius 3px
  .addr
    padding-bottom: 15px
    font-size: 14px
    color: #A6A6A6
    line-height 1.6
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  .now_addr
    height : 40px
    line-height : 40px
    color: #AEA389
    font-size: 14px
    padding:0 10px
    background:rgba(229,204,145,0.1)
    position: relative
    p
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    .refurbish
      position: absolute;
      right: 10px;
      top: 2px;
      img
        width : 15px;
.standard
  padding 0 15px 0
  margin -70px 0 10px 0
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
      background #fff
      padding 0 10px 10px
      border-bottom 1px solid #E0E0E0
      h4
        font-size 16px
        padding 20px 0
      p
        font-size 15px
        color #999
</style>
