<template>
  <el-container class="patroladd">
     
    <el-header class="box add bb">
        <h5 v-if="id1==0" class="mb10"><span class="lines"></span>添加{{formInline1.user_type}}</h5>
         <h5 v-else class="mb10"><span class="lines"></span>编辑{{formInline1.user_type}}</h5>
        <div>
             <el-button  class=""  size="small" type="primary" @click="submitForm('formInline1')">提交</el-button>
            <el-button  class="back_btn" size="small" plain @click="$router.back()">返回</el-button></div>
    </el-header>
    <el-main>
    <el-form :inline="true"  status-icon ref="formInline1"  :model="formInline1"  class="demo-ruleForm">
     <el-row class="box mt20  f14">
         <el-col :span="24" class="patroladd-title bgcfbe tl mb20 pl15">基础信息</el-col>
        <el-col :span="9" class="tl" :offset="1">
        <el-form-item  label="登录账号(手机号)：" class="w" label-width="34%" size="small" prop="user_loginname" :rules="[{required: true,type: 'number',message: '请输入登录账号(手机号)',trigger: 'blur'},{pattern: /^1[3|4|5|7|8|9][0-9]\d{8}$/,message: '手机号格式不对',trigger: 'blur'}]">
            <el-input  type="number" style="position:fixed;bottom:-9999px"></el-input>
           <el-input placeholder="登录账号(手机号)"  type="number" clearable v-model.number="formInline1.user_loginname" class="input-with-select">
            </el-input>
        </el-form-item>
        </el-col>
        <el-col :span="9" class="tl" :offset="1">
        <el-form-item  v-if="id1!=1" label="登录密码：" size="small" clearable class="w" label-width="34%" prop="user_loginpass" :rules="[{required: true,message: '请输入密码', trigger: 'blur' },{ pattern: /^[A-Za-z0-9]+$/, message: '请输入密码,长度4-15位数字或字母组成',trigger: ['blur','change'] },{ min: 4, max: 15, message: '请输入密码,长度4-15位数字或字母组成',trigger: ['blur','change']}]">
           <el-input  type="password" style="position:fixed;bottom:-9999px"></el-input>
           <el-input  placeholder="登录密码" type="password" v-model="formInline1.user_loginpass" class="input-with-select"></el-input>
        </el-form-item>
        <el-form-item v-else label="登录密码：" size="small" clearable class="w" label-width="34%" >
           <el-input  disabled placeholder="登录密码" type="password" v-model="aaa" class="input-with-select"></el-input>
        </el-form-item>
        </el-col>
         <el-col v-if="formInline1.user_type=='乡村酒店'||formInline1.user_type=='农家乐'" :span="9" class="tl" :offset="1">
        <el-form-item  label="企业名称：" size="small" class="w" label-width="34%"  prop="company_name" :rules="[{required: true,message: '请输入企业名称', trigger: 'blur' },{ pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+$/, message: '不允许输入空格等特殊符号' ,trigger: ['blur','change']},{ maxlength: 50, message: '最多输入50个字符',trigger: ['blur','change'] }]">
           <el-input placeholder="企业名称" maxlength='50' clearable v-model="formInline1.company_name" class="input-with-select">
            </el-input>
        </el-form-item>
        </el-col>
        <el-col :span="9" class="tl" :offset="1">
        <el-form-item  label="姓名：" size="small" class="w" label-width="34%"  prop="user_name" :rules="[{required: true,message: '请输入姓名', trigger: 'blur' },{ pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+$/, message: '不允许输入空格等特殊符号' ,trigger: ['blur','change']},{ maxlength: 50, message: '最多输入50个字符',trigger: ['blur','change'] }]">
           <el-input placeholder="姓名" maxlength='50' clearable v-model="formInline1.user_name" class="input-with-select">
            </el-input>
        </el-form-item>
        </el-col>
        <el-col :span="9" class="tl" :offset="1">
        <el-form-item  label="身份证：" size="small" class="w" label-width="34%" prop="user_idcard"  :rules="[{required: true, message: '请输入身份证号', trigger: 'blur' },{ min: 15, max: 18, message: '请如实填写15或者18位号码，以供核对', trigger: 'blur' },{ pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,message: '请输入正确的身份证号码',trigger: 'blur'}]">
           <el-input placeholder="身份证" clearable v-model="formInline1.user_idcard" class="input-with-select">
            </el-input>
        </el-form-item>
        </el-col>
        <el-col :span="9" class="tl" :offset="1">
        <el-form-item  label="性别：" size="small" class="w" label-width="34%"  prop="user_sex" :rules="[{required: true,message: '请输入性别', trigger: 'blur' },{pattern:/^['男'|'女']$/,message: '从男或女中选择输入',trigger: ['blur','change']}]">
           <el-select class="w" clearable v-model="formInline1.user_sex" placeholder="性别">
            <el-option v-for="v in list_btn3" :key="v.title" :label="v.title" :value="v.title"></el-option>
          </el-select>
        </el-form-item>
        </el-col>
        <el-col :span="22" class="tl" :offset="1">
            <el-row class="box   f14">
        <el-form-item  label="所属区域：" class="w" label-width="14%" size="small"  prop="user_province" :rules="[{required: true,message: '请选择所属区域', trigger: ['blur','change']}]">
          <el-col :span="4" class="tl">
               <el-select v-if="user.province"  disabled  v-model="user.province"></el-select>
          <el-select v-else v-model="formInline1.user_province" clearable placeholder="请选择省级" @change="change(1,formInline1.user_province)">
             <el-option v-for="group in options_province" :key="group.region_code" :label="group.region_name" :value="group.region_code"> </el-option>
          </el-select>
             </el-col>
          <el-col :span="4" class="tl ml10" >
             <el-select v-if="user.city"  disabled  v-model="user.city"></el-select>
          <el-select v-else v-model="formInline1.user_city" clearable placeholder="请选择市级" @change="change(2,formInline1.user_city)">
             <el-option v-for="group in options_city" :key="group.region_code" :label="group.region_name" :value="group.region_code"> </el-option>
          </el-select>
             </el-col>
            <el-col :span="4" class="tl ml10"  >
                <el-select v-if="user.area"  disabled  v-model="user.area"></el-select>
          <el-select v-else v-model="formInline1.user_area" clearable placeholder="请选择区县" @change="change(3,formInline1.user_area)">
             <el-option v-for="group in options_area" :key="group.region_code" :label="group.region_name" :value="group.region_code"> </el-option>
          </el-select>
             </el-col>  
             <el-col :span="4" class="tl ml10"  >
                  <el-select v-if="user.town"  disabled  v-model="user.town"></el-select>
          <el-select v-else v-model="formInline1.user_town" clearable placeholder="请选择乡镇" @change="change(4,formInline1.user_town)">
             <el-option v-for="group in options_town" :key="group.region_code" :label="group.region_name" :value="group.region_code"> </el-option>
          </el-select>
             </el-col> 
              <el-col  :span="4" class="tl ml10"  >
                  <el-select v-if="user.vill"  disabled  v-model="user.vill"></el-select>
          <el-select v-else v-model="formInline1.user_vill" clearable placeholder="请选择社区" @change="change(5,formInline1.user_vill)"  @remove-tag="change(8,tag)">
             <el-option v-for="group in options_vill" :key="group.region_code" :label="group.region_name" :value="group.region_code"> </el-option>
          </el-select>
             </el-col>        
        </el-form-item>
            </el-row>
        </el-col>        
       <el-col :span="9" class="tl" :offset="1">
        <el-form-item  label="详细地址：" class="w" label-width="34%" size="small" >
           <el-input placeholder="详细地址" v-model="formInline1.user_address" class="input-with-select">
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
              <div class="tc p15">头像</div>
              </div>
        <div class="patroladd-upload">
         <el-upload 
                ref="upload"
                multiple
                action="/api/file/upload"
                :file-list="fileList1"  
                list-type="picture-card"
                 accept="image/png,image/jpg,image/jpeg"
                :on-success="handlepoll1"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove1"
                :class="{disabled:uploadDisabled1}"
                >
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
<div class="tc p15">身份证正面</div>
 <!-- :file-list="formInline1.user_idcard_logo_front" -->
        </div>
       <div class="patroladd-upload">
         <el-upload 
                ref="upload"
                multiple
                action="/api/file/upload"
                :file-list="fileList2"  
                 accept="image/png,image/jpg,image/jpeg"
                list-type="picture-card"
                :on-success="handlepoll2"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove2"
                :class="{disabled:uploadDisabled2}"
                >
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
<div class="tc p15">身份证背面</div>
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
import md5 from 'js-md5';
import { local,objKeySort,remove } from '../../../../util/util'
export default {
  data () {
    return {
          aaa:'111111',
         uploadDisabled:false,
      uploadDisabled1:false,
      uploadDisabled2:false,
        formInline1: {
         user_loginname:'',
        user_loginpass:'',
        user_name:'',
         user_idcard:'',
         user_sex:'',
          user_province:'',
         user_city:'',
         user_area:'',
         user_vill:'',
         user_town:'',
         user_address:'',
         user_logo_url:'',
         user_idcard_logo_front:'',
         user_idcard_logo_back:'',
         user_type:'',
         user_level:'1',
         user_mobilephone:'',
         company_name:''
      },
      loginpass:'',
      loginname:'',
      user_type:'',
      user:'',
      user_code:'',
      id1:'',
      list_btn3:[{title: '男'},{title: '女'}],
      region_high_code:'',
      options_province:'',
      options_city:'',
      options_area:'',
      options_town:'',
      options_vill:'',
       dialogImageUrl: '',
        dialogVisible: false,
        fileList:[],
      fileList1:[],
      fileList2:[],
       checkAll1: false,
       checkAll2: false,
       checkAll3: false,
       checkAll4: false
    }
  },
     created () {
         this.user = local.get('user');
         this.user_code=this.$route.query.id;
         this.id1=this.$route.query.active;
          this.formInline1.user_type=this.$route.query.name;
     this.init()

  },
  methods: {
      init (params) {
       if(this.id1==1){
           axios.get('/api/user/single', {user_code:this.user_code}).then((v) => {
       this.formInline1=v
       if(v.user_logo_url!=''){this.fileList=[{url:this.user.qyurl+v.user_logo_url}];this.uploadDisabled=true}
       if(v.user_idcard_logo_front!=''){this.fileList1=[{url:this.user.qyurl+v.user_idcard_logo_front}];this.uploadDisabled1=true}
       if(v.user_idcard_logo_back!=''){;this.fileList2=[{url:this.user.qyurl+v.user_idcard_logo_back}];this.uploadDisabled2=true}
       this.formInline1.user_loginname=Number(v.user_loginname)
       this.formInline1.user_mobilephone=Number(v.user_mobilephone)
        if(v.province!=null){this.formInline1.user_province=v.province;this.formInline1.user_level='1'}
      if(v.city!=null){this.formInline1.user_city=v.city;this.formInline1.user_level='2'}
      if(v.area!=null){this.formInline1.user_area=v.area;this.formInline1.user_level='3'}
      if(v.town!=null){this.formInline1.user_town=v.town;this.formInline1.user_level='4'}
      if(v.vill!=null){this.formInline1.user_vill=a.vill;this.formInline1.user_level='5'}
      this.getProvince();
     })
 
       }else{
      if(this.user.province!=''&&this.user.province!=null){this.formInline1.user_province=this.user.province;this.formInline1.user_level='1'}
      if(this.user.city!=''&&this.user.city!=null){this.formInline1.user_city=this.user.city;this.formInline1.user_level='2'}
      if(this.user.area!=''&&this.user.area!=null){this.formInline1.user_area=this.user.area;this.formInline1.user_level='3'}
      if(this.user.town!=''&&this.user.town!=null){this.formInline1.user_town=this.user.town;this.formInline1.user_level='4'}
      if(this.user.vill!=''&&this.user.vill!=null){this.formInline1.user_vill=this.user.vill;this.formInline1.user_level='5'}

      this.getProvince();
       }

    },
    change(index,val){
      if (val == null) val = '';
      if(index==1){
        this.formInline1.user_level='1'
          if(val!=''){this.getProvince(val,'2')}
        this.options_province.forEach(item=>{
         if(item.region_code==val){this.formInline1.user_province=item.region_name;}
        })
        this.formInline1.user_city='';
         this.formInline1.user_area='';
          this.formInline1.user_town='';
           this.formInline1.user_vill='';
           this.options_city=[];
           this.options_area=[];
           this.options_town=[];
           this.options_vill=[]
      }
      if(index==2){
        this.formInline1.user_level='2'
         if(val!=''){this.getProvince(val,'3')}
        this.options_city.forEach(item=>{
         if(item.region_code==val){this.formInline1.user_city=item.region_name;}
        })
        this.formInline1.user_area='';
         this.formInline1.user_town='';
           this.formInline1.user_vill='';
           this.options_area=[];
           this.options_town=[];
           this.options_vill=[]
      }
      if(index==3){
        this.formInline1.user_level='3'
        if(val!=''){ this.getProvince(val,'4')}
        this.options_area.forEach(item=>{
         if(item.region_code==val){this.formInline1.user_area=item.region_name;}
        })
        this.formInline1.user_town='';
         this.formInline1.user_vill='';
           this.options_town=[];
           this.options_vill=[]
      }
      if(index==4){
        this.formInline1.user_level='4'
         if(val!=''){ this.getProvince(val,'5')}
        this.options_town.forEach(item=>{
         if(item.region_code==val){this.formInline1.user_town=item.region_name;}
        })
        this.formInline1.user_vill='';
           this.options_vill=[]
      }
      if(index==5){
        this.formInline1.user_level='5'
        this.options_vill.forEach(item=>{
         if(item.region_code==val){this.formInline1.user_vill=item.region_name;}
        })
      }
     },
       handleRemove(file, fileList) {
          this.uploadDisabled = false;
          this.formInline1.user_logo_url=''
      },
      handleRemove1(file, fileList) {
          this.uploadDisabled1 = false;
          this.formInline1.user_idcard_logo_front=''
      },
       handleRemove2(file, fileList) {
          this.uploadDisabled2 = false;
           this.formInline1.user_idcard_logo_back='';
      },
      handlepoll (response, file, fileList) {
         this.uploadDisabled = true;
         this.formInline1.user_logo_url=response.data.visit_url.substring(response.data.visit_url.indexOf("resources"))
         
    },
     handlepoll1 (response, file, fileList) {
         this.uploadDisabled1 = true;
         this.formInline1.user_idcard_logo_front=response.data.visit_url.substring(response.data.visit_url.indexOf("resources"))
      
    },
    handlepoll2 (response, file, fileList) {
         this.uploadDisabled2 = true;
        this.formInline1.user_idcard_logo_back=response.data.visit_url.substring(response.data.visit_url.indexOf("resources"))
        
    },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
     submitForm(formInline1){    
          if(this.formInline1.user_province !== undefined && this.formInline1.user_province.length > 0){
            this.formInline1.user_level = 1;
          }
          if(this.formInline1.user_city !== undefined && this.formInline1.user_city.length > 0){
            this.formInline1.user_level = 2;
          }
          if(this.formInline1.user_area !== undefined && this.formInline1.user_area.length > 0){
            this.formInline1.user_level = 3;
          }
          if(this.formInline1.user_town !== undefined && this.formInline1.user_town.length > 0){
            this.formInline1.user_level = 4;
          }
          if(this.formInline1.user_vill !== undefined && this.formInline1.user_vill.length > 0){
            this.formInline1.user_level = 5;
          }
          this.formInline1.user_mobilephone=Number(this.formInline1.user_loginname)
          let paramas=this.formInline1;
         this.$refs[formInline1].validate((valid) => {
        if (valid) {
          if(this.id1==1){              
            axios.put('/api/user/qy_update', paramas).then((v) => {
              this.$router.back()
            })
          }else{
            paramas.user_loginpass=md5(paramas.user_loginpass);
            axios.post('/api/user/qy_save', paramas).then((v) => {
              this.$router.back()
            })
          }
          
        }
         })
      }, getProvince(val,index){
        axios.get('/api/region/list',{region_high_code:val,region_type:index}).then((v) => {
          if(index=='2'){this.options_city=v;
          let city=this.formInline1.user_city
          if(city){
             this.options_city.forEach(item=>{
               if(item.region_name==city){
                  this.getProvince(item.region_code,'3')
               }
             })
           }}
          else if(index=='3'){
            this.options_area=v;
            let area=this.formInline1.user_area
          if(area){
             this.options_area.forEach(item=>{
               if(item.region_name==area){
                  this.getProvince(item.region_code,'4')
               }
             })
           }
          }
          else if(index=='4'){this.options_town=v;
          let town=this.formInline1.user_town
          if(town){
             this.options_town.forEach(item=>{
               if(item.region_name==town){
                  this.getProvince(item.region_code,'5')
               }
             })
           }}
          else if(index=='5'){this.options_vill=v;}
          else{this.options_province=v
            let province=this.formInline1.user_province
           if(province){
             this.options_province.forEach(item=>{
               if(item.region_name==province){
                  this.getProvince(item.region_code,'2')
               }
             })
           }
          }
       
      })
      }
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
