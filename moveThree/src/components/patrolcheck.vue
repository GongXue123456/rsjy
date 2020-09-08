<template>
  <div class="box">
    <h4>
      {{name}}
    </h4>
     <div v-if="name1=='1'" >
        <div class="standard_select1" v-show="isStats">
          <span :class="flag == true?'success1':'unsuccess1'" >
          {{title}}
      </span>
      <!-- <span :class="[{'unsuccess1':flag == false}]" >
        {{unpass}}
      </span> -->
        </div>
    </div>
    <div v-else>
        <div class="standard_select" v-show="isStats">
      <span :class="['standard_select_fl',{'success':flag == true}]" @click="selectQualifiedToQualified(true)">
        {{pass}}
      </span>
      <span :class="['standard_select_fr',{'unsuccess':flag == false}]"  @click="selectQualifiedToQualified(false)">
        {{unpass}}
      </span>
    </div>
    </div>
    
     
    <div v-show="isStats">
      <!--  -->
      <div class="desc">
        <cube-textarea v-model="value" placeholder="描述" @input="propagation"></cube-textarea>
      </div>
          <cube-upload
          action="app/file/upload"
          :simultaneous-uploads="1"
          @file-success = "fileSuccess"
          @file-error = "fileError"
          @file-removed= "fileRemoved"
          @files-added="filesAdded" />
    </div>
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'patrolcheck',
  props: {
    data: Object,
    name: {
      type: String,
      required: true
    },
    name1: {
      type: String,
    },
    pass: {
      type: String,
      default: '合格'
    },
    title: {
      type: String,
      default: '合格'
    },
    unpass: {
      type: String,
      default: '不合格'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    // isShow: {
    //   type: Boolean,
    //   default: false
    // },
    isStats: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      flag: true,
      isShow:true,
      value: '',
      flieValue: []
    }
  },
  created() {
    this.init()
    console.log(this.isStats)
  },
  methods: {
    init() {
      if (this.title === '合格') {
        this.flag = true
      } else {
        this.flag = false
      }
    },
    selectQualifiedToQualified(flag) {
      if (this.disabled) {
        return
      }
      let bubbling
      if (flag) {
         this.$emit("updatefile", [])
        bubbling = this.pass
        this.flag = true
        this.isShow=true;
        this.value= '';
        this.flieValue=[];
         window.console.log(this.flieValue)
      } else {
        bubbling = this.unpass
        this.flag = false
        this.isShow=true

      }
        
      this.$emit("update:title", bubbling)
    },
    propagation() {
      this.$emit("input", this.value)
    },
    filesAdded() {
      // 文件过滤
    },
    fileSuccess(val) {
      let url = val.response.data.visit_url
      this.flieValue.push(url.substring(url.indexOf('resources')))
      this.$emit("updatefile", this.flieValue.join(','))
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
      this.$emit("updatefile", this.flieValue.join(','))
    }
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
.box
  background : #fff
  padding: 0 10px 10px
  border-bottom 1px solid #E0E0E0
  h4
    font-size: 16px
    padding: 10px 0
    line-height 1.5
  .standard_select
    overflow hidden
    text-align center
    font-size 15px
    span 
      float left
      width 50%
      color #fff
      height 35px
      line-height 35px
    span.standard_select_fl
      background #BFBFC4
      border-radius 20px 0 0 20px
      clip-path polygon(0% 0%, 0% 100%,80% 100%,100% 0%)
    span.standard_select_fr
      background #BFBFC4
      border-radius 0 20px 20px 0
      clip-path polygon(20% 0%, 0% 100%,100% 100%,100% 0%)
    span.success
      background $btn-primary-active-bdc-pass
    span.unsuccess
      background $btn-primary-active-bdc-unpass
    span.success1
      color $btn-primary-active-bdc-pass
    span.unsuccess1
      color $btn-primary-active-bdc-unpass
  .standard_select1
    overflow hidden
    font-size 15px
    span 
      float left
      width 100%
      color #fff
      height 35px
      line-height 35px
    span.success1
      color $btn-primary-active-bdc-pass
    span.unsuccess1
      color $btn-primary-active-bdc-unpass
  .desc
    padding 10px 0
</style>
