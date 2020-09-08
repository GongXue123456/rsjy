<template>
  <el-container class="patroladd">
     
    <el-header class="box add bb">
        <h5 v-if="id1==2" class="mb10"><span class="lines"></span>添加帮厨</h5>
         <h5 v-else class="mb10"><span class="lines"></span>编辑帮厨</h5>
        <div>
             <el-button  class=""  size="small" type="primary" @click="submitForm('formInline1')">提交</el-button>
            <el-button  class="back_btn" size="small" plain @click="$router.back()">返回</el-button></div>
    </el-header>
    <el-main>
    <el-form :inline="true"  status-icon ref="formInline1"  :model="formInline1"  class="demo-ruleForm">
     <el-row class="box mt20  f14">
         <el-col :span="24" class="patroladd-title bgcfbe tl mb20 pl15">基础信息</el-col>
        <el-col :span="22" class="tl" :offset="1">
        <el-form-item  label="姓名：" size="small" class="w" label-width="14%"  prop="user_name_subchef" :rules="[{required: true,message: '请输入姓名', trigger: 'blur' },{ pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+$/, message: '不允许输入空格等特殊符号' },{ maxlength: 50, message: '最多输入50个字符' }]">
           <el-input placeholder="姓名" maxlength='30' clearable v-model="formInline1.user_name_subchef" class="input-with-select">
            </el-input>
        </el-form-item>
        </el-col>
         <el-col :span="22" class="tl" :offset="1">
        <el-form-item  label="身份证号：" size="small" class="w" label-width="14%" prop="user_idcard_subchef"  :rules="[{required: true, message: '请输入身份证号', trigger: 'blur' },{ min: 15, max: 18, message: '请如实填写15或者18位号码，以供核对', trigger: 'blur' },{ pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,message: '请输入正确的身份证号码',trigger: 'blur'}]">
           <el-input placeholder="身份证号" clearable v-model="formInline1.user_idcard_subchef" class="input-with-select">
            </el-input>
        </el-form-item>
        </el-col>
       
     </el-row>
      <el-row class="box mt20  f14">
      <el-col :span="24" class="patroladd-title bgcfbe tl mb20 pl15">附件上传</el-col>
      <el-col :span="24" class="tl">
  <div class="patroladd-upload">
              <el-upload 
                ref="upload"
                 multiple
                action="/api/file/upload"
                 accept="image/png,image/jpg,image/jpeg"
                :file-list="fileList"  
                list-type="picture-card"
                :on-success="handlepoll"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :class="{disabled:uploadDisabled}"
                >
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
              <div class="tc p15">健康证</div>
              </div>
       
      </el-col>
     </el-row>
    
        </el-form>
        </el-main>
  </el-container>
</template>
<script>
let obj;
import Vue from 'vue'
import axios from '../../../../util/api'
import { local,objKeySort,remove } from '../../../../util/util'
export default {
  data () {
    return {
          aaa:'111111',
         uploadDisabled:false,
        formInline1: {
         user_name_subchef:'',
         user_health_logo_subchef:'',
         user_idcard_subchef:'',
          user_code_mainchef:'',
      },
      user:'',
      id1:'',
       dialogImageUrl: '',
        dialogVisible: false,
        fileList:[],
    }
  },
     created () {
         this.user = local.get('user');
         this.formInline1.user_code_subchef=this.$route.query.id;
         this.id1=this.$route.query.active;
     this.init()

  },
  methods: {
      init (params) {
       if(this.id1==1){
           axios.get('/api/mainSubChef/single', {user_code_subchef:this.formInline1.user_code_subchef}).then((v) => {
       this.formInline1.user_name_subchef=v.user_name_subchef;
       this.formInline1.user_idcard_subchef=v.user_idcard_subchef;
       this.formInline1.user_code_mainchef=v.user_code_mainchef;
       this.formInline1.user_health_logo_subchef=v.user_health_logo_subchef;
       if(v.user_health_logo_subchef!=''){this.fileList=[{url:this.user.qyurl+v.user_health_logo_subchef}];this.uploadDisabled=true}
     })
 
       }

    },
       handleRemove(file, fileList) {
          this.uploadDisabled = false;
          this.formInline1.user_health_logo_subchef=''
      },
      handlepoll (response, file, fileList) {
         this.uploadDisabled = true;
         this.formInline1.user_health_logo_subchef=response.data.visit_url.substring(response.data.visit_url.indexOf("resources"))
         
    },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
     submitForm(formInline1){
       let tid1=this.id1;       
          let paramas=this.formInline1;
         this.$refs[formInline1].validate((valid) => {
        if (valid) {
          if(this.id1==1){              
            axios.put('/api/mainSubChef/update', paramas).then((v) => {
              this.$router.back()
            })
          }else{
            axios.post('/api/mainSubChef/save', paramas).then((v) => {
              this.$router.back()
            })
          }
          
        }
         })
      },
  }
}
</script>
<style lang="scss" scoped>
.patroladd{
  overflow-x: hidden;
  .add{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .el-image{width: 160px; height: 160px;margin-right: 10px}
  .back_btn{background:rgba(247,248,249,1);border:1px solid rgba(217,222,225,1);}
  .patroladd-title{height: 34px;line-height: 34px;border-left: 2px solid #788287}
 /deep/ .el-input-group__append .el-button--primary .el-icon-search{color: #fff}
 /deep/ .el-checkbox-button__inner{    border-left: 1px solid #DCDFE6;
    border-radius: 4px !important;}
    .el-checkbox-group{display: contents}
    .el-checkbox-button{margin-bottom: 10px}
   /deep/ .no-header .has-gutter{display: none}
  .people-message .el-form-item { margin-bottom: 0px;}
  .patroladd-upload{width: 160px;height: 160px;float: left;margin-right: 10px;
    .disabled{height: 100%;}
   /deep/ .el-upload{width: 160px;height: 160px;line-height: 160px;}
    /deep/ .el-upload-list--picture-card .el-upload-list__item{width: 160px;height: 160px;}
   }
   /deep/ .disabled .el-upload--picture-card {
    display: none !important;
}
}
</style>
<style lang="scss">
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
input[type="number"]{
  -moz-appearance: textfield;
}
</style>
