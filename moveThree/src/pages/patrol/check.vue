<template>
  <div>
    <Nav title='工单巡查' />
    <div class="bg">
      <div class='bg_code'>
        <span class="green">{{patrol_type[data.patrol_type]}}</span>
        <i>{{data.work_order}}</i>
      </div>
      <div class="name">
        <p class="p1">{{data.company_name}}</p><p class="p2">{{companytag_name}}</p>
      </div>
      <div class="addr">
        {{location.location}}
      </div>
      <div class="now_addr" @click="onalter = true">
        <p style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;padding-right:20px;">当前位置：{{location.location}}</p>
        <div class="refurbish">
          <img src="../../assets/img/refurbish.png" alt="" srcset="">
        </div>
      </div>
    </div>

    <div class="standard">
      <div class="standard_hd">
        <!-- <patrolcheck :key="key" v-for="(item, key) in patrol_config2" v-bind:title.sync="item.key" :name="item.val" /> -->
        
        <patrolcheck  v-for="(item, key) in patrol_config2" :key="key" @updatefile="item.url = $event"  v-on:input="item.describe = $event" v-bind:title.sync="item.key" :name="item.val" ></patrolcheck>
        <div :key="'patrol_config4-'+key" class="selectFourbox" v-for="(item, key) in patrol_config4">
          <h4>
            {{item.val}}
          </h4>
          <cube-select
            :title="item.val"
            v-model="item.key"
            :options="item.val1">
          </cube-select>
        </div>

      </div>

      <div class="standard_md">
        <cube-form :model="model">
           <cube-form-group>
             <cube-form-item :field="fields[0]"></cube-form-item>
             <cube-form-item v-show="flag" :field="fields[1]"></cube-form-item>
             <cube-form-item v-show="flag" :field="fields[2]">
               <cube-checker
                v-model="checkerValue"
                :options="options" @input="punish" :max="99" />
             </cube-form-item>
             <cube-form-item :field="fields[3]"></cube-form-item>
           </cube-form-group>
        </cube-form>
      </div>
      <div>
      
      <div class="standard_bd">
        <cube-form :model="model">
           <div class="checkPhone">巡查照片</div>
           <cube-form-group>
             <cube-form-item :field="fields[4]"></cube-form-item>
           </cube-form-group>
        </cube-form>
      </div>


      <div class="standard_bd">
        <cube-form :model="model">
           <cube-form-group>
             <cube-form-item :field="fields[5]"></cube-form-item>
             <cube-form-item v-show="model.isFlag" :field="fields[6]"></cube-form-item>
           </cube-form-group>
        </cube-form>
      </div>


        <cube-button :primary="true" @click="submit">提交巡查记录</cube-button>
      </div>

    </div>

    <div class="patrolmap" v-show="onalter">
      <div class="patrolmap_iframe">
        <patrolMap v-bind:location.sync="mapLocation" />
      </div>
      <cube-button class="onSure" @click="goBack" :primary="true">确定选择</cube-button>
    </div>
  </div>
</template>
<script>
import patrolcheck from '../../components/patrolcheck'
import patrolMap from '../../components/patrolMap'
import Nav from '../../components/Nav'
import axios from '../../axios/index.js'
//import moment from 'moment'
// import {URL} from '../../config'
// import { mapState } from 'vuex'
export default {
  components: {
    patrolcheck,
    patrolMap,
    Nav
  },
  data() {
    return {
      data: {},
      patrol_type: ['', '普通巡查', '双随机抽查', '工单派发','日常巡查'],
      patrol_config2: [],
      patrol_config4: [],
      checkerValue: [],
      options: [],
      companytag_name:'',
      model: {
        patrol_state: 2,
        patrol_result: '合格',
        dispose_name: '',
        dispose_code: '',
        punish_name: '',
        punish_code: '',
        note: '',
        patrol_time: '',
        patrol_imgs: '',
        isblacklist: 1,
        isFlag: false,
        isblacklist_remark: ''
      },
      imgUrl: [],
      flag: false,
      fields: [
        {
          type: 'select',
          modelKey: 'patrol_result',
          label: '巡查结果',
          props: {
            options: ['合格', '不合格']
          },
          events: {
            change: (v) => {
              this.selectResult(v)
            }
          }
        },
        {
          type: 'select',
          label: '处理方式',
          modelKey: 'dispose_code',
          props: {
            options: []
          },
          events: {
            change: (val, index, text) => {
              this.dispose(text)
            }
          }
        },
        {
          label: '处罚方式'
        },
        {
          type: 'textarea',
          modelKey: 'note',
          props: {
            placeholder: '备注'
          }
        },
        {
          type: 'upload',
          modelKey: 'uploadValue',
          messages: {
            uploaded: '上传失败'
          },
          props: {
            action: 'app/file/upload'
          },
          events: {
            'file-success': (val) => {
              let url = val.response.data.visit_url
              this.imgUrl.push(url.substring(url.indexOf('resources')))
              this.model.patrol_imgs = this.imgUrl.join(',')
            },
            'file-removed': (val) => {
              let url = val.response.data.visit_url
              let index = this.imgUrl.indexOf(url.substring(url.indexOf('resources')))
              this.imgUrl.splice(index, 1)
              this.model.patrol_imgs = this.imgUrl.join(',')
            }
          }
        },
        {
          type: 'checkbox',
          modelKey: 'isFlag',
          label: '加入黑名单',
          props: {
            option: {
              label: ''
            }
          },
          events: {
            input: (v) => {
              window.console.log(v)
              if (v) {
                this.model.isblacklist = 2
              } else {
                this.model.isblacklist = 1
                this.model.isblacklist_remark = ''
              }
            }
          }
        },
        {
          type: 'textarea',
          modelKey: 'isblacklist_remark',
          props: {
            placeholder: '加入黑名单的原因'
          }
        }
      ],
      mapLocation: {},
      location: {
        location: '',
        longitude: '',
        latitude: '',
      },
      onalter: false
    }
  },
  computed: {
    // ...mapState({
    //   poiaddress: state => state.patrol.location.poiaddress,
    //   poiname: state => state.patrol.location.poiname,
    // }),
  },
  created() {
    this.getWxConfig()
    this.model.patrol_code = this.$route.query.patrol_code
    this.init(this.model.patrol_code)
  },
  methods: {
    getWxConfig() {
      let requesturl = location.href.split('#')[0]
      let self = this
      axios.get('app/wx/wx_config', {requesturl}).then(v => {
        window.wx.config({
          debug: false,
          appId: v.data.appid,
          timestamp: v.data.timestamp,
          nonceStr: v.data.nonceStr,
          signature: v.data.signature,
          jsApiList: ["previewImage", "getLocation","openLocation"]
        });
        window.wx.ready(function(){
          window.wx.getLocation({
              type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
              success: function (res) {
                self.location.latitude = res.latitude
                self.location.longitude = res.longitude
                let geocoder = new window.qq.maps.Geocoder({
                  complete: (result) => {
                    self.location.location = result.detail.address;
                  }
                })
                let latLng = new window.qq.maps.LatLng(res.latitude, res.longitude);
                geocoder.getAddress(latLng)
              },
              fail: function(){
                this.$createToast({
                  type: 'warn',
                  time: 1000,
                  txt: '无法为获取当前位置，请手动输入'
                }).show()
              }
          });
        })
        // window.wx.error(function(){
        //   this.$createToast({
        //     type: 'warn',
        //     time: 1000,
        //     txt: '无法为获取当前位置，请手动输入'
        //   }).show()
        // })
      })
    },
    init(patrol_code) {
      let params = {
        patrol_code: patrol_code
      }
      axios.get('app/patrol/detail', params).then(v => {
        this.data = v.data
        this.model.isFlag = v.data.isblacklist === 2 ? true : false
        this.model.isblacklist = v.data.isblacklist
        this.model.isblacklist_remark = v.data.isblacklist_remark ? v.data.isblacklist_remark: ''
        if(v.data.companytag_code=='1001574645421581111111101'){this.companytag_name='四川省小作坊备案证'}
       else if(v.data.companytag_code=='1001574645421581111111102'){this.companytag_name='四川省小经营店备案证（流通）'}
       else if(v.data.companytag_code=='1001574645421581111111103'){this.companytag_name='食品经营许可证（餐饮）'}
       else if(v.data.companytag_code=='1001574645421581111111104'){this.companytag_name='四川省小经营店备案证（餐饮）'}
       else{this.companytag_name='食品经营许可证（流通）'}
       this.findPc(v.data.companytag_code);
      })
      axios.get('app/patrol/dispose', params).then(v => {
        v.data.forEach(element => {
          this.fields[1].props.options.push({
            value: element.dispose_code,
            text: element.dispose_name
          })
        })
      })
      axios.get('app/patrol/punish', params).then(v => {
        v.data.forEach(element => {
          this.options.push({
            value: element.punish_code,
            text: element.punish_name
          })
        })
      })
    },
    findPc(companytag_code){
      axios.get('app/patrolConfig/single',{companytag_code: companytag_code}).then(v => {
        if (v.data.config_content) {
          let arr = JSON.parse(v.data.config_content)
          arr.forEach(element => {
              element.key = element.val1[0]
            if (element.val1.length === 2) {
              this.patrol_config2.push(element)
            } else {
              this.patrol_config4.push(element)
            }
          })
        }
      })
    },
    selectResult(v) {
      if (v === '合格') {
        this.flag = false
        this.model.dispose_name = ''
        this.model.dispose_code = ''
        this.model.punish_name = []
        this.model.punish_code = []
        this.checkerValue = []
      } else {
        this.flag = true
      }
    },
    dispose(text) {
      this.model.dispose_name = text
    },
    punish(val) {
      this.model.punish_code = val.join(',')
      this.model.punish_name = this.pubishText(val).join(',')
    },
    pubishText(arr) {
      let aText = []
      this.options.forEach(value => {
        arr.forEach(result => {
          if (value.value === result) {
            aText.push(value.text)
          }
        })
      })
      return aText
    },
    merge(arr) {
      let obj = {}
      arr.map(v => {
        let key = v.name
        obj[key] = v.key
      })
      return obj
    },
    submit() {
      if (!this.location.location){
          this.$createToast({
            type: 'warn',
            time: 1000,
            txt: '请输入目前位置'
          }).show()
          return
      }
      if(this.model.isblacklist === 2 && !this.model.isblacklist_remark){
        this.$createToast({
            type: 'warn',
            time: 1000,
            txt: '请输入加入黑名单的原因'
          }).show()
          return
      }

      if(this.model.patrol_result === '不合格' && !this.model.punish_code){
        this.$createToast({
            type: 'warn',
            time: 1000,
            txt: '请选择处罚方式'
          }).show()
          return
      }
  //  let checkself_content = []
  //  let params = {}
      let params = Object.assign({},  this.model, this.location)
      // params.patrol_time = moment().format('YYYY-MM-DD HH:mm:ss')
      params.patrol_user_code = this.data.patrol_user_code
      params.patrol_user_name = this.data.patrol_user_name
      params.company_code = this.data.company_code
       params.patrol_code = this.$route.query.patrol_code
      // params.model =JSON.stringify(this.model)
      // params.location =JSON.stringify(this.location)
      //  window.console.log(this.patrol_config2)
       params.config_content=JSON.stringify([...this.patrol_config2,...this.patrol_config4])
       window.console.log(params)
      axios.post('/app/patrol/update', params).then((v) => {
        if (v.data.patrol_result === '不合格') {
          let params = {
            mess_event: 3,
            company_code: v.data.company_code,
            other_code: v.data.patrol_code
          }
          axios.post(URL, params)
        }
        this.$router.go(-1)
      })



   
      
      // let params = {}
      // this.data.forEach(v => {
      //   let element = {
      //     page_config_content_new: v.page_config_content_new,
      //     page_config_name: v.page_config_name

      //   }
      //   checkself_content.push(element)
      // })
      // params.checkself_content = JSON.stringify(checkself_content)
      // axios.post('/app/checkSelf/save', params).then(() => {
      //   this.$router.go(-1)
      // })
   
    },
    goBack() {
      this.onalter = false
      this.location.location = this.mapLocation.poiaddress
      this.location.longitude = this.mapLocation.latlng.lng
      this.location.latitude = this.mapLocation.latlng.lat
    }
  }
}
</script>
<style lang="stylus" scoped>
.bg
  margin-top 54px
  height: 210px
  padding: 30px 15px 0 15px
  background url('../../assets/img/portal.png')
  background-size 100%
  .bg_code
    font-size: 14px
    padding-bottom: 15px
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
    .refurbish
      position: absolute;
      right: 10px;
      top: 2px;
      img
        width : 15px;
.standard
  padding 0 15px 0
  margin -50px 0 10px 0
  .standard_hd,.standard_md,.standard_bd
    margin-bottom 10px
  .checkPhone
    padding 10px 0 0 15px
  .standard_hd
    .selectFourbox
      background : #fff
      padding: 0 10px 10px
      border-bottom 1px solid #E0E0E0
      h4
        font-size: 17px
        padding: 20px 0
.patrolmap
  position absolute
  top 0
  bottom 0
  width 100%
  background rgba(0,0,0,.3)
  z-index 999
  .patrolmap_iframe
    position absolute
    top 0
    bottom 50px
    width 100%
  .onSure
    position absolute
    bottom 0
    left 0
</style>
