<template>
  <div class="create">
    <Nav title='新增餐厨垃圾' />
    <div class="header">
      基础信息
    </div>
    <cube-form :model="model" @validate="validateHandler" :submitAlwaysValidate="true" @submit="save">
      <cube-form-group>
        <cube-form-item :field="fields[0]"></cube-form-item>
        <cube-form-item :field="fields[1]">
          <div class="cclj_count">
            <cube-input v-model="model.cclj_count" placeholder="必填" ></cube-input>
            <span class="units">kg</span>
          </div>
        </cube-form-item>
        <cube-form-item :field="fields[2]"></cube-form-item>
        <cube-form-item :field="fields[3]">
          <cube-button  :light="true" @click="showDatePicker">{{model.cclj_time || '请选择'}}</cube-button>
        </cube-form-item>
      </cube-form-group>

      <div class="header">
        餐厨垃圾处理拍照
      </div>
      <div class="photo">
        <cube-upload
          action="app/file/upload"
          :simultaneous-uploads="1"
          @file-success = "fileSuccess"
          @files-added = "filesAdded"
          @file-removed= "fileRemoved"
          @file-error = "fileError"
          />
      </div>
      <!-- <div class="btn">
        <cube-button class="onSure" :primary="true" type="submit">立即提交</cube-button>
      </div> -->
       <div class="footer p15 bgcfff w"> 
        <van-row  gutter="20">
          <van-col span="24"><van-button  block type="primary" native-type="submit"> 立即提交 </van-button></van-col>
        </van-row>
       </div>
      </cube-form>
  </div>
</template>

<script>
import Nav from '../../components/Nav'
import axios from '../../axios'
import moment from 'moment'
export default {
  components: {
    Nav
  },
  data() {
    return {
      model: {
        dictionary_code: '',
        cclj_count: '',
        cclj_handler: '',
        cclj_time: '',
        dictionary_module: '',
        images: ''
      },
      fields: [
        {
          type: 'select',
          modelKey: 'dictionary_code',
          label: '类型',
          props: {
            placeholder: '请选择餐厨垃圾类型',
            options: []
          },
          rules: {
            required: true
          },
          events: {
            change: (val, index ,text) => {
              this.model.dictionary_module = text
            }
          }
        },
        {
          modelKey: 'cclj_count',
          label: '处理量',
          rules: {
            required: true,
            type: 'number',
            pattern: /^[0-9\u4e00-\u9fa5]+$/
          }
        },
        {
          type: 'input',
          modelKey: 'cclj_handler',
          props: {
            placeholder: '选填'
          },
          label: '处理人'
        },
        {
          modelKey: 'cclj_time',
          label: '处理时间',
          rules: {
            required: true
          }
        },
      ],
      flieValue: []
    }
  },
  created() {
    this.init()
  },
  methods: {
    init () {
      let arr = []
      axios.get("/app/dictionary/search", {dictionary_group: '餐厨垃圾'}).then(v => {
        console.log(v)
        v.data.dictionary.forEach(element => {
          arr.push({
            value: element.dictionary_code,
            text: element.dictionary_module,
          })
        })
        this.fields[0].props.options = arr
      })
    },
    validateHandler(result) {
      this.validity = result.validity
      this.valid = result.valid
      window.console.log('validity', result)
    },
    showDatePicker() {
      this.$createDatePicker({
        title: '请选择时间',
        min: new Date(2008, 7, 8, 8, 0, 0),
        max: new Date(),
        format: {
          year: 'YY年',
          month: 'MM月',
          date: 'DD日',
          hour: 'HH时',
          minute: 'mm分',
          second: 'ss秒'
        },
        value: new Date(),
        columnCount: 6,
        onSelect: this.selectHandle
      }).show()
    },
    selectHandle(date) {
      this.model.cclj_time = moment(date).format("YYYY-MM-DD HH:mm:ss")
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
    save () {
      console.log(123)
      this.model.images = this.flieValue.join(",")
      axios.post("/app/companyCCLJ/save", this.model).then(() => {
        // this.$router.go(-1)
        console.log(456)
      })
    }
  }
}
</script>

<style lang="stylus">
.create
  .header
    background #f2f2f2
    color #939393
    font-size 14px
    padding 20px
  .cclj_count
    position relative
    .units
      font-size 16px
      position absolute
      top 7px
      right 0
  .photo
    padding 10px
    background #fff
    .cube-upload-btn-def
      background-color #f5f5f5
  .btn
    position fixed
    width 100%
    padding 20px
    box-sizing border-box
    bottom 0
  .cube-btn-light
    background-color #fff
    box-shadow none
  .footer
    position: fixed;bottom: 0px;left: 0px;z-index: 99;background: #f5f5f5 !important;
  span
    font-size: 18px;

</style>