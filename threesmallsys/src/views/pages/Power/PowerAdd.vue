<template>
  <el-container class="patroladd">
     
    <el-header class="box add bb">
        <h5 v-if="id1==2" class="mb10"><span class="lines"></span>添加管理员</h5>
         <h5 v-else class="mb10"><span class="lines"></span>编辑管理员</h5>
        <div>
             <el-button  class=""  size="small" type="primary" @click="submitForm('formInline1')">提交</el-button>
            <el-button  class="back_btn" size="small" plain @click="$router.back()">返回</el-button></div>
    </el-header>
    <el-main>
    <el-form :inline="true"  status-icon ref="formInline1"  :model="formInline1"  class="demo-ruleForm">
     <el-row class="box mt20  f14">
         <el-col :span="24" class="patroladd-title bgcfbe tl mb20 pl15">基础信息</el-col>
        <el-col :span="9" class="tl" :offset="1">
           <el-form-item label="管理权限：" class="w" label-width="34%" size="small" prop="manage_type" :rules="[{required: true,message: '请选择管理权限', trigger: 'blur' }]">
              <el-select class="w" v-model="formInline1.manage_type" clearable placeholder="管理权限" @change="change(7,formInline1.manage_type)">
            <el-option v-for="v in list_btn" :key="v.id" :label="v.title" :value="v.id"></el-option>
          </el-select>
        </el-form-item>
        </el-col>
         <el-col :span="9" class="tl" :offset="1">
           <el-form-item label="管理员类型：" class="w" label-width="34%" size="small"  prop="user_type" :rules="[{required: true,message: '请选择管理员类型', trigger: 'blur' }]">
              <el-select class="w" v-model="user_type" placeholder="管理员类型" @change="change(6,user_type)">
            <el-option v-for="v in list_btn1" :key="v.title" :label="v.title" :value="v.title"></el-option>
          </el-select>
        </el-form-item>
        </el-col>
         <el-col :span="22" class="tl" :offset="1">
           <el-form-item label="主体类型：" class="w" label-width="14%"  size="small" prop="companytag_codes_list" :rules="[{required: true,message: '请选择主体类型',trigger: ['blur','change']}]">
              <el-checkbox-button class="mr10 mb10"  v-model="checkAll1" @change="handleCheckAllChange1">四川省小作坊备案证</el-checkbox-button>
              <el-checkbox-button class="mr10 mb10"  v-model="checkAll2" @change="handleCheckAllChange2">四川省小经营店备案证（流通）</el-checkbox-button>
              <el-checkbox-button class="mr10 mb10"  v-model="checkAll3" @change="handleCheckAllChange3">食品经营许可证（餐饮）</el-checkbox-button>
              <el-checkbox-button class="mr10 mb10"  v-model="checkAll4" @change="handleCheckAllChange4">四川省小经营店备案证（餐饮）</el-checkbox-button>
              <el-checkbox-button class="mr10 mb10"  v-model="checkAll5" @change="handleCheckAllChange5">食品经营许可证（流通）</el-checkbox-button>
        </el-form-item>
        </el-col>
         <el-col :span="22" class="tl" :offset="1">
           <el-form-item label="主体业态：" class="w" label-width="14%"  size="small" prop="business_forms_list" :rules="[{required: true,message: '请选择主体业态',trigger: ['blur','change'] }]">
            <el-checkbox-group v-model="options1_1"  @change="IsActive1(1,options1_1,options1_2)">
              <el-checkbox-button class="mr10" v-for="options in options1" :label="options.dictionary_field" :value="options.dictionary_field" :key="options.dictionary_field">{{options.dictionary_field}}</el-checkbox-button>
            </el-checkbox-group>
             <el-checkbox-group v-model="options2_1"  @change="IsActive1(2,options2_1,options2_2)">
              <el-checkbox-button class="mr10" v-for="options in options2" :label="options.dictionary_field" :value="options.dictionary_field" :key="options.dictionary_field">{{options.dictionary_field}}</el-checkbox-button>
            </el-checkbox-group>
             <el-checkbox-group v-model="options3_1"  @change="IsActive1(3,options3_1,options3_2)">
              <el-checkbox-button class="mr10" v-for="options in options3" :label="options.dictionary_field" :value="options.dictionary_field" :key="options.dictionary_field">{{options.dictionary_field}}</el-checkbox-button>
            </el-checkbox-group>
            <el-checkbox-group v-model="options4_1"  @change="IsActive1(4,options4_1,options4_2)">
              <el-checkbox-button class="mr10" v-for="options in options4" :label="options.dictionary_field" :value="options.dictionary_field" :key="options.dictionary_field">{{options.dictionary_field}}</el-checkbox-button>
            </el-checkbox-group>
            <el-checkbox-group v-model="options5_1"  @change="IsActive1(5,options5_1,options5_2)">
              <el-checkbox-button class="mr10" v-for="options in options5" :label="options.dictionary_field" :value="options.dictionary_field" :key="options.dictionary_field">{{options.dictionary_field}}</el-checkbox-button>
            </el-checkbox-group>
        </el-form-item>
        </el-col>
        <el-col :span="9" class="tl" :offset="1">
        <el-form-item  label="登录手机号：" class="w" label-width="34%" size="small" prop="user_loginname" :rules="[{required: true,type: 'number',message: '请输入手机号',trigger: 'blur'},{pattern: /^1[3|4|5|7|8|9][0-9]\d{8}$/,message: '手机号格式不对',trigger: 'blur'}]">
            <el-input  type="number" style="position:fixed;bottom:-9999px"></el-input>
           <el-input placeholder="登录手机号"  type="number" clearable v-model.number="formInline1.user_loginname" class="input-with-select">
            </el-input>
        </el-form-item>
        </el-col>
        <el-col :span="9" class="tl" :offset="1">
        <el-form-item  label="登录密码：" size="small" clearable class="w" label-width="34%" prop="user_loginpass" :rules="[{required: true,message: '请输入密码', trigger: 'blur' }]">
           <el-input v-if="id1!=1" type="password" style="position:fixed;bottom:-9999px"></el-input>
           <el-input v-if="id1!=1"  placeholder="登录密码" type="password" v-model="formInline1.user_loginpass" class="input-with-select"></el-input>
           <el-input v-else  disabled placeholder="登录密码" type="password" v-model="aaa" class="input-with-select"></el-input>
        </el-form-item>
        </el-col>
        <el-col :span="9" class="tl" :offset="1">
        <el-form-item  label="姓名：" size="small" class="w" label-width="34%"  prop="user_name" :rules="[{required: true,message: '请输入姓名', trigger: 'blur' },{ pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+$/, message: '不允许输入空格等特殊符号' },{ maxlength: 50, message: '最多输入50个字符' }]">
           <el-input placeholder="姓名" maxlength='30' clearable v-model="formInline1.user_name" class="input-with-select">
            </el-input>
        </el-form-item>
        </el-col>
        <!-- <el-col :span="9" class="tl" :offset="1">
        <el-form-item  label="手机号：" size="small" class="w" label-width="34%"  prop="user_mobilephone" :rules="[{type: 'number',message: '请输入手机号',trigger: 'blur'},{pattern: /^1[3|4|5|7|8|9][0-9]\d{8}$/,message: '手机号格式不对',trigger: 'blur'}]">
           <el-input placeholder="手机号" clearable v-model.number="formInline1.user_mobilephone" class="input-with-select">
            </el-input>
        </el-form-item>
        </el-col> -->
        <el-col :span="9" class="tl" :offset="1">
           <!-- :rules="[{required: true, message: '请输入身份证号', trigger: 'blur' },{ min: 15, max: 18, message: '请如实填写15或者18位号码，以供核对', trigger: 'blur' },{ pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,message: '请输入正确的身份证号码',trigger: 'blur'}]" -->
        <el-form-item  label="身份证：" size="small" class="w" label-width="34%" prop="user_idcard" >
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
       <el-col :span="9" class="tl" :offset="1">
        <el-form-item  label="详细地址：" class="w" label-width="34%" size="small" >
           <el-input placeholder="详细地址" v-model="formInline1.user_address" class="input-with-select">
            </el-input>
        </el-form-item>
        </el-col>

        <el-col :span="22" class="tl" :offset="1">
            <el-row class="box   f14">
          <el-form-item  label="地域：" v-if="user_type=='网格员'" class="w" label-width="14%" size="small" prop="user_vill" :rules="[{required: true,message: '请选择经营地域', trigger: ['blur','change']}]">
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
        <el-form-item  label="地域：" v-else class="w" label-width="14%" size="small"  prop="user_province" :rules="[{required: true,message: '请选择地域', trigger: ['blur','change']}]">
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
         <!-- <el-col :span="9" class="tl" :offset="1">
          <el-form-item class="w" label-width="34%" label="用户类型：" >
               <el-button v-for="(v,k) in list_btns" :key="k" :class="activeClass ==k?'active':''" class=""  size="small" @click="IsActive(k,v.val)">{{v.title}}</el-button>  
          </el-form-item>
         </el-col>
          <el-col :span="9" class="tl" :offset="1">
           <el-form-item label="管理权限：" class="w" label-width="34%" size="small" prop="manage_type" :rules="[{required: true,message: '请选择管理权限', trigger: 'blur' }]">
              <el-select class="w"  filterable v-model="formInline1.manage_type" clearable placeholder="管理权限" @change="change(7,formInline1.manage_type)">
            <el-option v-for="v in tableData" :key="v.id" :label="v.title" :value="v.id"></el-option>
          </el-select>
        </el-form-item>
        </el-col> -->
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
import axios from '../../../util/api'
import md5 from 'js-md5';
import { local,objKeySort,remove } from '../../../util/util'
export default {
  data () {
    return {
          aaa:'111111',
          activeClass:1,
         uploadDisabled:false,
      uploadDisabled1:false,
      uploadDisabled2:false,
        formInline1: {
         user_name:'',
         user_loginname:'',
        user_loginpass:'',
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
         manage_type:'3',
         companytype_codes_list:[],
         companytag_codes_list:[],
         business_forms_list:[],
         dictionary_codes_list:[],
         user_mobilephone:'',
      },
      loginpass:'',
      loginname:'',
      user_type:'',
      user:'',
      user_code:'',
      id1:'',
      options1:'',
      options2:'',
      options3:'',
      options4:'',
      options5:'',
        options1_1:[],
         options2_1:[],
         options3_1:[],
         options4_1:[],
         options5_1:[],
        options1_2:[],
         options2_2:[],
         options3_2:[],
         options4_2:[],
         options5_2:[],
      list_btn1:[{title: '监管员'},{title: '网格员'}],
      list_btn3:[{title: '男'},{title: '女'}],
      list_btn:[{title: '全部(群宴+食品经营者)',id:'3'},{title: '食品经营者',id:'2'}],
      list_btn2:[{title: '四川省小作坊备案证',val:'1001574645421581111111101'},{title: '四川省小经营店备案证（流通）',val:'1001574645421581111111102'},{title: '食品经营许可证（流通）',val:'1001574645421581111111105'},{title: '食品经营许可（餐饮）',val:'1001574645421581111111103'},{title: '四川省小经营店备案证（餐饮）',val:'1001574645421581111111104'}],
      list_btns:[{title: '是',val:'1'},{title: '否',val:'2'}],
      Rules: {
        Name1: [{ required: true, message: '请输入', trigger: 'blur' },],
      },
      region_high_code:'',
      options6:'',
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
       checkAll4: false,
        checkAll5: false
    }
  },
     created () {
         this.user = local.get('user');
         this.user_code=this.$route.query.id;
         this.id1=this.$route.query.id1;
         this.user_type=this.$route.query.id2==1?'监管员':'网格员';
     this.init()

  },
  methods: {
      init (params) {
       if(this.id1==1){
           axios.get('/api/user/single', {user_code:this.user_code}).then((v) => {
       this.formInline1=v
        //  this.user_type=v.user_type;
              this.user_type=v.user_type=='平台管理员'?'监管员':'网格员';
      //  'http://139.155.11.121:8089/qy/'+
       if(v.user_logo_url!=''){this.fileList=[{url:this.user.qyurl+v.user_logo_url}];this.uploadDisabled=true}
       if(v.user_idcard_logo_front!=''){this.fileList1=[{url:this.user.qyurl+v.user_idcard_logo_front}];this.uploadDisabled1=true}
       if(v.user_idcard_logo_back!=''){;this.fileList2=[{url:this.user.qyurl+v.user_idcard_logo_back}];this.uploadDisabled2=true}
       this.formInline1.user_loginname=Number(v.user_loginname)
       this.formInline1.user_mobilephone=Number(v.user_mobilephone)
      if(v.dictionaryList!=null){
        v.dictionaryList.forEach(item=>{
         if(item.companytag_code=='1001574645421581111111101'){
              this.checkAll1=true;
               this.getdata1('1001574645421581111111101')
             this.options1_1=this.options1_1.concat(item.dictionary_field)
             this.options1_2=this.options1_2.concat(item.dictionary_code)
         }else if(item.companytag_code=='1001574645421581111111102'){
               this.checkAll2=true
              this.getdata1('1001574645421581111111102')
                this.options2_1=this.options2_1.concat(item.dictionary_field)
                this.options2_2=this.options2_2.concat(item.dictionary_code)
            }else if(item.companytag_code=='1001574645421581111111103'){
               this.checkAll3=true
               this.getdata1('1001574645421581111111103')
                this.options3_1=this.options3_1.concat(item.dictionary_field)
                this.options3_2=this.options3_2.concat(item.dictionary_code)
            }else if(item.companytag_code=='1001574645421581111111104'){
               this.checkAll4=true
               this.getdata1('1001574645421581111111104')
                this.options4_1=this.options4_1.concat(item.dictionary_field)
                this.options4_2=this.options4_2.concat(item.dictionary_code)
            }else if(item.companytag_code=='1001574645421581111111105'){
               this.checkAll5=true
               this.getdata1('1001574645421581111111105')
                this.options5_1=this.options5_1.concat(item.dictionary_field)
                this.options5_2=this.options5_2.concat(item.dictionary_code)
            }
       })
      }
       
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
      //   axios.get('/api/company/search', {filing_state:'3',state:'1',isblacklist:'1'}).then((v) => {
      //   this.tableData=v.companyList;
      // })
       }

    },
    getdata1(params){
       axios.get('/api/dictionary/search', {companytag_code:params}).then((v) => {
             if(params=='1001574645421581111111101'){
               this.options1=v.主体业态.食品经营许可
             }else if(params=='1001574645421581111111102'){
                this.options2=v.主体业态.食品经营许可
             }else if(params=='1001574645421581111111103'){
                 this.options3=v.主体业态.食品经营许可
             }else if(params=='1001574645421581111111104'){
                this.options4=v.主体业态.食品经营许可
             }else if(params=='1001574645421581111111105'){
                this.options5=v.主体业态.食品经营许可
             }
         })
   
    },
    getdata(params){
       axios.get('/api/dictionary/search', {companytag_code:params}).then((v) => {
             if(params=='1001574645421581111111101'){
               this.options1=v.主体业态.食品经营许可
              this.options1.forEach(item=>{
                 this.options1_1=this.options1_1.concat(item.dictionary_field)
                 this.options1_2=this.options1_2.concat(item.dictionary_code)
                 })
             }else if(params=='1001574645421581111111102'){
                this.options2=v.主体业态.食品经营许可
                this.options2.forEach(item=>{
                 this.options2_1=this.options2_1.concat(item.dictionary_field)
                 this.options2_2=this.options2_2.concat(item.dictionary_code)
               })
             }else if(params=='1001574645421581111111103'){
                 this.options3=v.主体业态.食品经营许可
                this.options3.forEach(item=>{
                 this.options3_1=this.options3_1.concat(item.dictionary_field)
                 this.options3_2=this.options3_2.concat(item.dictionary_code)
               })
             }else if(params=='1001574645421581111111104'){
                this.options4=v.主体业态.食品经营许可
               this.options4.forEach(item=>{
                 this.options4_1=this.options4_1.concat(item.dictionary_field)
                 this.options4_2=this.options4_2.concat(item.dictionary_code)
              })   
             }else if(params=='1001574645421581111111105'){
                this.options5=v.主体业态.食品经营许可
               this.options5.forEach(item=>{
                 this.options5_1=this.options5_1.concat(item.dictionary_field)
                 this.options5_2=this.options5_2.concat(item.dictionary_code)
              })   
             }
              this.formInline1.companytag_codes_list=this.formInline1.companytag_codes_list.concat(params)
              this.getDictionary()
           this.getBusiness()
            this.formInline1.companytag_codes_list= [...new Set(this.formInline1.companytag_codes_list)];
            
             
         })
   
    },
       handleCheckAllChange1(value) {
         if(value==false){this.formInline1.business_forms_list=[];this.formInline1.dictionary_codes_list=[];this.options1_1=[];this.options1_2=[]
         this.formInline1.companytag_codes_list.remove('1001574645421581111111101');
        this.getDictionary()
           this.getBusiness()
       
       }else{this.getdata('1001574645421581111111101')}
      },
       handleCheckAllChange2(value) {
         if(value==false){this.formInline1.business_forms_list=[];this.formInline1.dictionary_codes_list=[];this.options2_1=[];this.options2_2=[]
        this.formInline1.companytag_codes_list.remove('1001574645421581111111102');
         this.getDictionary()
           this.getBusiness()
              }else{this.getdata('1001574645421581111111102')}
       },
        handleCheckAllChange3(value) { if(value==false){this.formInline1.business_forms_list=[];this.formInline1.dictionary_codes_list=[];this.options3_1=[];this.options3_2=[]
        this.formInline1.companytag_codes_list.remove('1001574645421581111111103');
         this.getDictionary()
           this.getBusiness()
             }else{this.getdata('1001574645421581111111103')}},
         handleCheckAllChange4(value) { if(value==false){this.formInline1.business_forms_list=[];this.formInline1.dictionary_codes_list=[];this.options4_1=[];this.options4_2=[]
        this.formInline1.companytag_codes_list.remove('1001574645421581111111104');
         this.getDictionary()
           this.getBusiness()
           }else{this.getdata('1001574645421581111111104')}},
            handleCheckAllChange5(value) { if(value==false){this.formInline1.business_forms_list=[];this.formInline1.dictionary_codes_list=[];this.options5_1=[];this.options5_2=[]
        this.formInline1.companytag_codes_list.remove('1001574645421581111111105');
         this.getDictionary()
           this.getBusiness()
           }else{this.getdata('1001574645421581111111105')}},
            IsActive(k,val) {
        this.activeClass = k;
      },
      IsActive1(index,val,val1){
        this.formInline1.dictionary_codes_list=[]
        this.formInline1.business_forms_list=[];
        if(index=='1'){
          this.options1_2=[];
           this.options1_1=[];
           let checkedCount1 = val.length;
             this.checkAll1=checkedCount1>0&&checkedCount1 <= this.options1.length
            this.options1.forEach(item=>{
              val.forEach(item1=>{
                if(item.dictionary_field==item1){
                   this.options1_1=this.options1_1.concat(item.dictionary_field)
                  this.options1_2=this.options1_2.concat(item.dictionary_code)
                }
              })
            })
          if(this.checkAll1==false){
            this.formInline1.companytag_codes_list.remove('1001574645421581111111101');
          }
       }else if(index=='2'){
          this.options2_2=[];
           this.options2_1=[];
           let checkedCount2 = val.length;
          this.checkAll2=checkedCount2>0&&checkedCount2 <= this.options2.length
          this.options2.forEach(item=>{
              val.forEach(item1=>{
                if(item.dictionary_field==item1){
                   this.options2_1=this.options2_1.concat(item.dictionary_field)
                  this.options2_2=this.options2_2.concat(item.dictionary_code)
                }
              })
            })
           if(this.checkAll2==false){
             this.formInline1.companytag_codes_list.remove('1001574645421581111111102');
          }
       }else if(index=='3'){
          this.options3_2=[];
          this.options3_1=[];
           let checkedCount3 = val.length;
            this.options3.forEach(item=>{
              val.forEach(item1=>{
                if(item.dictionary_field==item1){
                   this.options3_1=this.options3_1.concat(item.dictionary_field)
                  this.options3_2=this.options3_2.concat(item.dictionary_code)
                }
              })
            })
         this.checkAll3=checkedCount3>0&&checkedCount3 <= this.options3.length
           if(this.checkAll3==false){
             this.formInline1.companytag_codes_list.remove('1001574645421581111111103');
          }
      }else if(index=='4'){
         this.options4_2=[];
         this.options4_1=[];
           let checkedCount4 = val.length;
          this.checkAll4=checkedCount4>0&&checkedCount4 <= this.options4.length
          this.options4.forEach(item=>{
              val.forEach(item1=>{
                if(item.dictionary_field==item1){
                   this.options4_1=this.options4_1.concat(item.dictionary_field)
                  this.options4_2=this.options4_2.concat(item.dictionary_code)
                }
              })
            })
            if(this.checkAll4==false){
              this.formInline1.companytag_codes_list.remove('1001574645421581111111104');
          }
        }else if(index=='5'){
         this.options5_2=[];
         this.options5_1=[];
           let checkedCount5 = val.length;
          this.checkAll5=checkedCount5>0&&checkedCount5 <= this.options5.length
          this.options5.forEach(item=>{
              val.forEach(item1=>{
                if(item.dictionary_field==item1){
                   this.options5_1=this.options5_1.concat(item.dictionary_field)
                  this.options5_2=this.options5_2.concat(item.dictionary_code)
                }
              })
            })
            if(this.checkAll5==false){
              this.formInline1.companytag_codes_list.remove('1001574645421581111111105');
          }
        }
         this.getDictionary()
           this.getBusiness()
      },
      getDictionary(){this.formInline1.dictionary_codes_list=this.formInline1.dictionary_codes_list.concat(this.options1_2).concat(this.options2_2).concat(this.options3_2).concat(this.options4_2).concat(this.options5_2);this.formInline1.dictionary_codes_list= [...new Set(this.formInline1.dictionary_codes_list)];},
      getBusiness(){this.formInline1.business_forms_list=this.formInline1.business_forms_list.concat(this.options1_1).concat(this.options2_1).concat(this.options3_1).concat(this.options4_1).concat(this.options5_1);this.formInline1.business_forms_list= [...new Set(this.formInline1.business_forms_list)];},
    change(index,val){
      if(index==1){
        this.formInline1.user_level='1'
        this.getProvince(val,'2')
        this.options_province.forEach(item=>{
         if(item.region_code==val){this.formInline1.user_province=item.region_name;}
        })
        this.formInline1.user_city='';
         this.formInline1.user_area='';
          this.formInline1.user_town='';
           this.formInline1.user_vill=''
      }
      if(index==2){
        this.formInline1.user_level='2'
        this.getProvince(val,'3')
        this.options_city.forEach(item=>{
         if(item.region_code==val){this.formInline1.user_city=item.region_name;}
        })
        this.formInline1.user_area='';
         this.formInline1.user_town='';
           this.formInline1.user_vill=''
      }
      if(index==3){
        this.formInline1.user_level='3'
        this.getProvince(val,'4')
        this.options_area.forEach(item=>{
         if(item.region_code==val){this.formInline1.user_area=item.region_name;}
        })
        this.formInline1.user_town='';
         this.formInline1.user_vill=''
      }
      if(index==4){
        this.formInline1.user_level='4'
        this.getProvince(val,'5')
        this.options_town.forEach(item=>{
         if(item.region_code==val){this.formInline1.user_town=item.region_name;}
        })
        this.formInline1.user_vill=''
      }
      if(index==5){
        this.formInline1.user_level='5'
        this.options_vill.forEach(item=>{
         if(item.region_code==val){this.formInline1.user_vill=item.region_name;}
        })
      }
        if(index==6){
         this.user_type=val
        }if(index==7){
            this.formInline1.manage_type=val
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
       let tid1=this.id1;       
        Vue.delete(this.formInline1,'dictionaryList');
          if(this.formInline1.user_province !== undefined && this.formInline1.user_province != null && this.formInline1.user_province.length > 0){
            this.formInline1.user_level = 1;
          }
          if(this.formInline1.user_city !== undefined && this.formInline1.user_city != null && this.formInline1.user_city.length > 0){
            this.formInline1.user_level = 2;
          }
          if(this.formInline1.user_area !== undefined && this.formInline1.user_area != null && this.formInline1.user_area.length > 0){
            this.formInline1.user_level = 3;
          }
          if(this.formInline1.user_town !== undefined && this.formInline1.user_town != null && this.formInline1.user_town.length > 0){
            this.formInline1.user_level = 4;
          }
          if(this.formInline1.user_vill !== undefined && this.formInline1.user_vill != null && this.formInline1.user_vill.length > 0){
            this.formInline1.user_level = 5;
          }
          this.formInline1.user_mobilephone=Number(this.formInline1.user_loginname)
          let paramas=this.formInline1;
          paramas.user_type=this.user_type=='监管员'?'平台管理员':'协管员';
          paramas.companytype_codes_list=[]
          paramas.companytag_codes_list.forEach(item=>{
            if(item=='1001574645421581111111101'){
               paramas.companytype_codes_list.push('1001574645421581000000001')
            }else if(item=='1001574645421581111111102'||item=='1001574645421581111111105'){
               paramas.companytype_codes_list.push('1001574645421581000000002')
            }else if(item=='1001574645421581111111103'||item=='1001574645421581111111104'){
               paramas.companytype_codes_list.push('1001574645421581000000003')
            }
            paramas.companytype_codes_list= [...new Set(paramas.companytype_codes_list)];
          })
         this.$refs[formInline1].validate((valid) => {
        if (valid) {
          if(this.id1==1){              
            axios.put('/api/user/update', paramas).then((v) => {
              this.$router.back()
            })
          }else{
            paramas.user_loginpass=md5(paramas.user_loginpass);
            axios.post('/api/user/save', paramas).then((v) => {
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
   .active {
       background: #2EC68A;
    border-color: #2EC68A;
    color: #FFFFFF;
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
