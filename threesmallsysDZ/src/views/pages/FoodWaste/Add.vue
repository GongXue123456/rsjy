<template>
   <el-container class="recordadd ">
       <el-header class="box add bb">
        <h5 class="mb10" v-if="formInline.dictionary_code"><span class="lines"></span>编辑类型</h5>
        <h5 class="mb10" v-else><span class="lines"></span>添加类型</h5>
        <div>
          <el-button  size="small" type="primary" @click="submitForm('formInline')">提交</el-button>
          <el-button  class="back_btn"  size="small" plain @click="$router.back()">返回</el-button>
        </div>
      </el-header>
       <el-main class="p15 pt0">
       <el-form :inline="true"  status-icon ref="formInline"  :model="formInline"  class="demo-ruleForm"> 
       <el-row class="box mt20  f14">
         <el-col :span="24" class="recordadd-title bgcfbe tl mb20 pl15">基础信息</el-col>
   
        <el-col :span="9" class="tl" :offset="1">
        <el-form-item   class="w" label-width="34%" label="餐厨垃圾类型名称：" size="small" prop="dictionary_module" :rules="[{required: true,message: '请输入餐厨垃圾类型', trigger: 'blur' },{ pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+$/, message: '不允许输入空格等特殊符号' }]">
         <el-input placeholder="请输入餐厨垃圾类型" maxlength="30" clearable autocomplete="off"  v-model="formInline.dictionary_module" class="input-with-select">
            </el-input>
        </el-form-item>
        </el-col>
         <el-col :span="22" :offset="1" class="tl">
        <el-form-item class="w " label-width="14%"   label="适配企业：" size="small"  >
           <el-checkbox-button class="mr10" v-for="(item,index) in options"  :key="index" :checked="item.checked" v-model="item.checked" @change="handleCheckAllChange(item.checked,item.companytype_code,item.companytype_name)">{{item.companytype_name}}</el-checkbox-button>
        </el-form-item>
        </el-col>
        <el-col :span="22" :offset="1" class="tl" >
         <el-form-item class="w w24" label-width="14%"   label="类型图片：" size="small" prop="dictionary_logo_url" :rules="[{required: true,message: '请添加类型图片',trigger: ['blur','change'] }]">
           <div class="recordadd-upload">
              <el-upload v-if="formInline.dictionary_code"
                ref="upload"
                multiple
                action="/api/file/upload"
                 accept="image/png,image/jpg,image/jpeg"
                list-type="picture-card"
                :file-list="fileList"
                :on-success="handlepoll"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                 :class="{disabled:uploadDisabled}"
                >
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-upload v-else
                ref="upload"
                multiple
                action="/api/file/upload"
                list-type="picture-card"
                 accept="image/png,image/jpg,image/jpeg"
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
              </div>
        </el-form-item>
        </el-col>
     </el-row>
 
     </el-form> 
</el-main>
   </el-container>
</template>
<script>
import axios from '../../../util/api'
import Globle from '@/components/Globle'
import { local,objKeySort,remove } from '../../../util/util'
let defaultDate;
export default {
  data () {
    return {
     uploadDisabled:false,
     fileList: [{name: 'food.jpeg', url: ''}],
      formInline: {
        dictionary_code:'',
        dictionary_module:'',
         companytype_codes:'',
        companytype_names:'',
        dictionary_logo_url: '',
        dictionary_group:'餐厨垃圾',
      },
      options:'',
      companytype_names_list:[],
      companytype_codes_list:[],
      user:'',
       dialogImageUrl: '',
        dialogVisible: false,
        pickerOptionsEnd: {
        disabledDate: time => {
          return time.getTime() > Date.now()
        }
      },
    }
  },
   created () {
      this.user = local.get('user');
      this.formInline.dictionary_code=this.$route.query.id;
    // this.init()
    this.init1()
    
  },
  methods: {
    init(){
             axios.get('/api/dictionary/cclj/single', {dictionary_code:this.formInline.dictionary_code}).then((v) => {
    this.formInline=v.cclj;
    this.companytype_codes_list=v.cclj.companytype_codes.indexOf(",") != -1?v.cclj.companytype_codes.split(','):v.cclj.companytype_codes.split(' ')
            this.companytype_names_list=v.cclj.companytype_names.indexOf(",") != -1?v.cclj.companytype_names.split(','):v.cclj.companytype_names.split(' ')
           this.companytype_codes_list.forEach(item=>{
             this.options.forEach(item1=>{
               if(item==item1.companytype_code){  item1.checked=!item1.checked }
             })
           }) 
            if(v.cclj.dictionary_logo_url!=''&&v.cclj.dictionary_logo_url!=null){
          this.uploadDisabled=true;
 this.fileList[0].url=this.user.qyurl+v.cclj.dictionary_logo_url
        }
      })
    },
    init1(){
      axios.get('/api/companytype/all', '').then((v) => {
      this.options=v;
        if(this.formInline.dictionary_code){
          this.init()
        }
      })
    
    },
          handleCheckAllChange(val,val1,val2) {
              if(val){
                this.companytype_codes_list.push(val1)
                this.companytype_names_list.push(val2)
              }else{
                   this.companytype_codes_list.remove(val1)
                   this.companytype_names_list.remove(val2)
              }
          this.companytype_codes_list= [...new Set(this.companytype_codes_list)];
          this.companytype_names_list= [...new Set(this.companytype_names_list)];
      },
     handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
          handlepoll(response, file, fileList) {
             this.uploadDisabled = true;
             this.formInline.dictionary_logo_url=response.data.visit_url.substring(response.data.visit_url.indexOf("resources"))
    },
       handleRemove(file, fileList) {
         this.uploadDisabled = false;
         this.formInline.dictionary_logo_url=''
      },
      submitForm(formInline){
         this.formInline.companytype_names=this.companytype_names_list.join(',');
              this.formInline.companytype_codes=this.companytype_codes_list.join(',');
         let paramas=this.formInline
         this.$refs[formInline].validate((valid) => {
        if (valid) {
         if(this.formInline.dictionary_code){
           axios.put('/api/dictionary/cclj/update', paramas).then((v) => {
           this.$router.back()
      })
         }else{
           axios.post('/api/dictionary/cclj/save', paramas).then((v) => {
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
.recordadd{
   overflow-x: hidden;
  .add{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .active {
       background: #2EC68A;
    border-color: #2EC68A;
    color: #FFFFFF;
  }
  .back_btn{background:rgba(247,248,249,1);border:1px solid rgba(217,222,225,1);}
  .recordadd-title{height: 34px;line-height: 34px;border-left: 2px solid #788287}
 /deep/ .el-input-group__append .el-button--primary .el-icon-search{color: #fff}
 /deep/ .el-checkbox-button__inner{    border-left: 1px solid #DCDFE6;
    border-radius: 4px !important;}
   /deep/ .no-header .has-gutter{display: none}
  .people-message .el-form-item { margin-bottom: 0px;}
  .recordadd-upload{width: 160px;height: 160px;float: left;margin-right: 10px;
     .disabled{height: 100%;}
   /deep/ .el-upload{width: 160px;height: 160px;line-height: 160px;}
    /deep/ .el-upload-list--picture-card .el-upload-list__item{width: 160px;height: 160px;}
   }
   .health_url{
     /deep/ .el-upload--picture-card{width: 70px;height: 40px;
     background-color: transparent;
    border: none;
     .el-button--small{position: absolute;left: 10px;margin-top: 4px;}}
/deep/ .el-upload-list--picture-card .el-upload-list__item{width: 70px;height: 40px;}
   } 
 table .cell .is-error{padding-bottom: 20px}
 .el-table th.is-leaf, .el-table td{border-bottom: none}
   /deep/ .disabled .el-upload--picture-card {
    display: none !important;
}


.el-checkbox-button{margin-bottom: 10px}
}

</style>