<template>
   <el-container class="recordadd ">
       <el-header class="box add bb">
        <h5 class="mb10"><span class="lines"></span>新增备案/食品生产</h5>
        <div>
          <el-button v-if="menu_btns!=null&&menu_btns.indexOf('5-1-5')!== -1" class="" size="small" type="primary" @click="submitForm('formInline')">提交归档</el-button>
          <el-button  class="back_btn"  size="small" plain @click="$router.back()">返回</el-button>
        </div>
      </el-header>
       <el-main class="p15 pt0">
       <el-form :inline="true"  status-icon ref="formInline"  :model="formInline"  class="demo-ruleForm">
    
     
      <el-row class="box mt20 f14">
        <!-- <div class="tl" >今日已提交三小备案数：16</el-row> -->
         <el-col :span="22" class="tl" :offset="1">
          <el-form-item class="w" label-width="14%" label="主体类型：" >
              <el-button v-for="(v,k) in list_btn" :key="k" :class="activeClass ==k?'active':''" class=""  size="small" @click="IsActive(k,v.val)">{{v.title}}</el-button>  
          </el-form-item>
         </el-col>
         <el-col :span="9" class="tl" :offset="1">
        <el-form-item class="w" label-width="34%" label="主体业态：" size="small" prop="business_form" :rules="[{required: true,message: '请选择主体业态',trigger: ['blur','change'], }]">
          <el-select   v-model="formInline.business_form"  placeholder="请选择主体业态"  clearable @change="change(3,formInline.business_form)">
            <el-option  v-for="item in options1" :key="item.dictionary_field" :label="item.dictionary_field" :value="item.dictionary_field" ></el-option>
          </el-select>
        </el-form-item>
        </el-col>
      </el-row>
         
       <el-row class="box mt20  f14">
         <el-col :span="24" class="recordadd-title bgcfbe tl mb20 pl15">基础信息</el-col>
   
        <el-col :span="9" class="tl" :offset="1">
        <el-form-item   class="w" label-width="34%" label="企业名称：" size="small" prop="company_name" :rules="[{required: true,message: '请输入企业名称', trigger: 'blur' },{ pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+$/, message: '不允许输入空格等特殊符号' }]">
         <el-input placeholder="请输入企业名称" maxlength="30" clearable autocomplete="off"  v-model="formInline.company_name" class="input-with-select">
            </el-input>
        </el-form-item>
        </el-col>
        <el-col :span="9" class="tl" :offset="1">
        <el-form-item class="w" label-width="34%" label="经营者姓名：" size="small"  prop="operator" :rules="[{required: true,message: '请输入经营者姓名', trigger: 'blur' },{ pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+$/, message: '不允许输入空格等特殊符号' }]">
         <el-input placeholder="请输入经营者姓名" maxlength="10" clearable v-model="formInline.operator" class="input-with-select">
            </el-input>
        </el-form-item>
        </el-col>
         <el-col :span="9" class="tl" :offset="1">
         <el-form-item class="w" label-width="34%" label="手机号：" size="small"  prop="mobilephone" :rules="[{required: true,message: '请输入手机号',trigger: 'blur'},{pattern: /^1[3|4|5|7|8|9][0-9]\d{8}$/,message: '手机号格式不对',trigger: 'blur'}]">
          <el-input placeholder="请输入11位手机号码" clearable v-model="formInline.mobilephone" class="input-with-select">
            </el-input>
        </el-form-item>
        </el-col>
         <el-col :span="9" class="tl" :offset="1">
         <el-form-item class="w" label-width="34%" label="身份证号：" size="small" prop="idcard" :rules="[{required: true, message: '请输入身份证号', trigger: 'blur' },{ min: 15, max: 18, message: '请如实填写15或者18位号码，以供核对', trigger: 'blur' },{ pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,message: '请输入正确的身份证号码',trigger: 'blur'}]">
          <el-input placeholder="请输入18位身份证号码" clearable v-model="formInline.idcard" class="input-with-select">
            </el-input>
        </el-form-item>
        </el-col>
        <el-col :span="9" class="tl" :offset="1">
         <el-form-item  class="w" label-width="34%" label="备案时间：" size="small">
          <el-date-picker type="datetime" clearable placeholder="选择日期" disabled :picker-options='pickerOptionsEnd' v-model="formInline.record_time"   format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" @change="logTimeChange"></el-date-picker>
        </el-form-item>
        </el-col>
     </el-row>
      <el-row class="box mt20  f14">
         <el-col :span="24" class="recordadd-title bgcfbe tl mb20 pl15">经营信息</el-col>
         <el-col  :span="9" class="tl" :offset="1">
           <el-form-item class="w" label-width="34%" label="备案证号：" size="small"  prop="record_code" :rules="[{required: true, message: '请输入备案证号', trigger: 'blur' }]">
           <el-input placeholder="备案证号"  clearable v-model="formInline.record_code" class="input-with-select">
            </el-input>
          </el-form-item>
        </el-col>
         <el-col :span="9" class="tl" :offset="1">
         <el-form-item  class="w" label-width="34%" label="发证日期：" size="small">
          <el-date-picker type="date" clearable placeholder="选择发证日期" :picker-options='pickerOptionsEnd' v-model="formInline.issue_time"   format="yyyy-MM-dd" value-format="yyyy-MM-dd" @change="logTimeChange"></el-date-picker>
        </el-form-item>
        </el-col>
         <el-col :span="9" class="tl" :offset="1">
         <el-form-item  class="w" label-width="34%" label="有效期至：" size="small" prop="unuseful_time" :rules="[{required: true, message: '请选择时间', trigger: 'change'}]">
          <el-date-picker type="date" clearable placeholder="选择有效期至"  v-model="formInline.unuseful_time"   format="yyyy-MM-dd" value-format="yyyy-MM-dd" :picker-options="pickerOptions" @change="logTimeChange"></el-date-picker>
        </el-form-item>
        </el-col>
        <el-col :span="22" class="tl" :offset="1">
            <el-row class="box   f14">
          <el-form-item  label="经营场所："  class="w" label-width="14%" size="small" prop="vill" :rules="[{required: true,message: '请选择经营地址', trigger: ['blur','change']}]">
          <el-col :span="4" class="tl">
          <el-select v-model="formInline.province" clearable placeholder="请选择省级" @change="change(4,formInline.province)">
             <el-option v-for="group in options_province" :key="group.region_code" :label="group.region_name" :value="group.region_code"> </el-option>
          </el-select>
             </el-col>
          <el-col :span="4" class="tl ml10" >
          <el-select v-model="formInline.city" clearable placeholder="请选择市级" @change="change(5,formInline.city)">
             <el-option v-for="group in options_city" :key="group.region_code" :label="group.region_name" :value="group.region_code"> </el-option>
          </el-select>
             </el-col>
            <el-col :span="4" class="tl ml10"  >
          <el-select v-model="formInline.area" clearable placeholder="请选择区县" @change="change(6,formInline.area)">
             <el-option v-for="group in options_area" :key="group.region_code" :label="group.region_name" :value="group.region_code"> </el-option>
          </el-select>
             </el-col>  
             <el-col :span="4" class="tl ml10"  >
          <el-select v-model="formInline.town" clearable placeholder="请选择乡镇" @change="change(7,formInline.town)">
             <el-option v-for="group in options_town" :key="group.region_code" :label="group.region_name" :value="group.region_code"> </el-option>
          </el-select>
             </el-col> 
              <el-col :span="4" class="tl ml10"  >
          <el-select v-model="formInline.vill" clearable placeholder="请选择社区" @change="change(8,formInline.vill)"  @remove-tag="change(8,tag)">
             <el-option v-for="group in options_vill" :key="group.region_code" :label="group.region_name" :value="group.region_code"> </el-option>
          </el-select>
             </el-col>        
        </el-form-item>
            </el-row>
        </el-col>
        <el-col :span="9" class="tl" :offset="1">
        <el-form-item  label="详细地址：" class="w" label-width="34%" size="small" >
           <el-input placeholder="如道路、门牌号、小区、楼栋号、单元室等" v-model="formInline.address" class="input-with-select">
            </el-input>
        </el-form-item>
        </el-col>
         <el-col :span="22" :offset="1" class="tl">
        <el-form-item class="w " label-width="14%"   label="生产形式：" size="small" prop="produce_form_list" :rules="[{required: true,message: '请选择生产形式', trigger: 'blur' }]">
          <el-checkbox-group v-model="formInline.produce_form_list" >
           <el-checkbox-button class="mr10" v-for="options in options81" :label="options.dictionary_field" :key="options.dictionary_field">{{options.dictionary_field}}</el-checkbox-button>
          </el-checkbox-group>
        </el-form-item>
        </el-col>
         <el-col :span="22" :offset="1" class="tl">
         <el-form-item class="w" label-width="14%"  label="生产类别：" size="small" prop="producetype_codes_list" :rules="[{required: true,message: '请选择生产类别', trigger: 'blur' }]">
          <el-checkbox-group v-model="formInline.producetype_codes_list" >
            <el-checkbox-button class="mr10" v-for="options in options91" :label="options.dictionary_field" :key="options.dictionary_field">{{options.dictionary_field}}</el-checkbox-button>
          </el-checkbox-group>
        </el-form-item>
        </el-col>
        
         <el-col :span="9" class="tl" :offset="1">
         <el-form-item class="w" label-width="34%" label="营业面积：" size="small" prop="place_area" :rules="[{required: true,message: '请输入经营场所面积', trigger: 'blur'},{ pattern: /^(^[1-9](\d+)?(\.\d{1,2})?$)|(^0\.0[1-9]{1}$)|(^0\.[1-9]{1}\d{0,1}$)/, message: '只允许输入大于0的数' }]">
          <el-input style="width:100px" placeholder="例：20"  min="1" clearable v-model="formInline.place_area" class="input-with-select mr10">
            </el-input>平方米（㎡）
        </el-form-item>
        </el-col>
        <el-col :span="9" class="tl" :offset="1">
         <el-form-item class="w" label-width="34%" label="从业人数：" size="small" prop="employ_num" :rules="[{required: true,message: '请输入从业人数', trigger: 'blur' },{ pattern: /^(^[1-9]{1}\d{0,6}$)*$/, message: '只允许输入最小为1的整数' }]">
          <el-input placeholder="例：20" v-model="formInline.employ_num" clearable class="input-with-select">
            </el-input>
        </el-form-item>
        </el-col>
     </el-row>
      <el-row class="box mt20  f14 people-message">
         <el-col :span="24" class="recordadd-title bgcfbe tl mb20 pl15">人员信息</el-col>
       <div class="box list">
      <el-form ref="form" :model="form" >
       <el-table  ref="table" :data="form.List" class="w" empty-text='暂无数据'>
          <el-table-column label="姓名">
           <template slot-scope="scope">
            <el-form-item size="small" :prop="'List.' + scope.$index + '.name'" :rules="[{required: true, message: '请输入姓名', trigger: 'blur' },{ pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+$/, message: '不允许输入空格等特殊符号' }]">
              <el-input placeholder="请输入姓名" clearable  v-model="scope.row.name"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
         <el-table-column label="健康证明">
          <el-upload class="health_url"
                ref="upload"
                multiple
                fit="fill" style="width: 70px;height: 40px"
                action="/api/file/upload"
                 :limit="1"
                  list-type="picture-card"
                :before-upload="beforeAvatarUpload"
                accept="image/png,image/jpg,image/jpeg"
                :on-success="handlepoll11"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove11"
                :class="{disabled:uploadDisabled11}"
                >
    <el-button size="small" type="primary">点击上传</el-button>
</el-upload>
        </el-table-column>
        
         <el-table-column label="健康证有效期">
          <template slot-scope="scope">
            <el-form-item   size="small" :prop="'List.' + scope.$index + '.time'" :rules="[{required: true, message: '选择有效期', trigger: 'blur' }]">
          <el-date-picker type="date" clearable placeholder="选择有效期至" v-model="scope.row.time"   format="yyyy-MM-dd" value-format="yyyy-MM-dd" :picker-options="pickerOptions"></el-date-picker>
        </el-form-item>
          </template>
        </el-table-column>
        <el-table-column  label="操作" >
          <template slot-scope="">
             <el-button  class="" size="small" type="primary" @click="savepeople">保存</el-button>
          <el-button  class="back_btn"  size="small" plain @click="cancle">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
      <el-table :data="formInline.companyEmployList" style="width: 100%" class="no-header">
        <el-table-column  prop="employ_name" ></el-table-column>
        <el-table-column >
             <template slot-scope="scope">
           <el-image :src="user.qyurl+scope.row.employ_health_url" fit="fill" :preview-src-list="[user.qyurl+scope.row.employ_health_url]" style="width: 40px;height: 40px"></el-image>
             </template>
        </el-table-column>
        <el-table-column prop="user_health_datedue" ></el-table-column>
        
        <el-table-column fixed="right">
          <template slot-scope="scope">
           <el-button  class="back_btn"  size="small" plain  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
         </template>
        </el-table-column>
      </el-table>

    </div> 
     </el-row>
      <el-row class="box mt20  f14">
         <el-col :span="24" class="recordadd-title bgcfbe tl mb20 pl15">责任落实</el-col>
       
        <el-col :span="9" class="tl" :offset="1">
        <el-form-item class="w" label-width="34%" label="市场监管局：" size="small" prop="department_code" :rules="[{required: true,message: '请选择市场监管局',trigger: 'blur'}]">
          <el-select v-model="formInline.department_code" filterable placeholder="请选择市场监管局" @change="change1(formInline.department_code)">
            <el-option  v-for="item in options4" :key="item.department_code" :label="item.department_name" :value="item.department_code" ></el-option>
          </el-select>
        </el-form-item>
        </el-col>
        <el-col :span="9" class="tl" :offset="1">
         <el-form-item class="w" label-width="34%" label="所属村：" size="small" prop="region_name" :rules="[{required: true,message: '请选择所属村',trigger: 'blur'}]">
          <el-select v-model="formInline.region_name" filterable placeholder="请选择所属村" @change="change2">
            <el-option  v-for="item in options5" :key="item.region_name" :label="item.region_name" :value="item.region_name" ></el-option>
          </el-select>
        </el-form-item>
        </el-col>
         <el-col :span="9" class="tl" :offset="1">
           <!-- :rules="[{required: true,message: '请选择监管人员', trigger: ['blur','change'],}]" -->
         <el-form-item class="w" label-width="34%" label="监管人员：" size="small" prop="user_code_manage_list" >
            <el-select v-model="formInline.user_code_manage_list" filterable multiple :multiple-limit='10' placeholder="请选择监管人员" @change="change(10,formInline.user_code_manage_list)">
            <el-option  v-for="item in options6" :key="item.user_code" :label="item.user_name" :value="item.user_code" ></el-option>
          </el-select>
        </el-form-item>
        </el-col>
         <el-col :span="9" class="tl" :offset="1">
           <!-- :rules="[{required: true,message: '请选择网格信息员', trigger: ['blur','change'], }]" -->
         <el-form-item class="w" label-width="34%" label="网格信息员：" size="small" prop="user_code_info_list" >
            <el-select v-model="formInline.user_code_info_list"  filterable multiple :multiple-limit='10' placeholder="请选择网格信息员" @change="change(11,formInline.user_code_info_list)">
            <el-option  v-for="item in options7" :key="item.user_code" :label="item.user_name" :value="item.user_code" ></el-option>
          </el-select>
        </el-form-item>
        </el-col>
    
     </el-row>
      
     <el-row class="box mt20  f14">
      <el-col :span="24" class="recordadd-title bgcfbe tl mb20 pl15">附件上传</el-col>
      <el-col :span="24" class="tl">
  <div class="recordadd-upload">
              <el-upload 
                ref="upload"
                multiple
                type="file"
                action="/api/file/upload"
                list-type="picture-card"
                :before-upload="beforeAvatarUpload"
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
              <div class="tc p15" >营业执照</div>
              </div>
        <div class="recordadd-upload">
         <el-upload 
                ref="upload"
                multiple
                action="/api/file/upload"
                list-type="picture-card"
                :before-upload="beforeAvatarUpload"
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

<div class="tc p15" >备案证</div>
        </div>
       <div class="recordadd-upload">
         <el-upload 
                ref="upload"
                multiple
                action="/api/file/upload"
                list-type="picture-card"
                :before-upload="beforeAvatarUpload"
                accept="image/png,image/jpg,image/jpeg"
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
<div class="tc p15">经营者身份证</div>
        </div>
      </el-col>
     </el-row>
     
     </el-form> 
</el-main>
   </el-container>
</template>
<script>
import axios from '../../../../util/api'
import Globle from '@/components/Globle'
import { local,objKeySort } from '../../../../util/util'
let defaultDate;
export default {
  data () {
    return {
      menu_btns:Globle.menu_btns,
      uploadDisabled:false,
      uploadDisabled1:false,
      uploadDisabled2:false,
      uploadDisabled11: false,
      activeClass:0,
      list_btn:[{title: '四川省小作坊备案证',val:'1001574645421581111111101'}],
      formInline: {
        company_code:'',
        companytype_code:'1001574645421581000000001',
        companytag_code:'1001574645421581111111101',
        company_name: '',
        credit_code:'',
        record_time:this.getNowTime(),
        useful_life:'三年',
        operator:'',
        mobilephone:'',
        idcard:'',
        business_form:'',
        employ_num:'1',
        main_subject_list:[],
        sub_subject_list:[],
        subjectdetail_codes_list:[],
        produce_form_list:[],
        producetype_codes_list:[],
        place_area:'1',
        department_code:'',
        region_name:"",
        region_code:'',
        places_list:[],
        user_code_manage_list:[],
        user_code_info_list:[],
        filing_state:'3',
        user_code_info_moblephone_list:[],
        user_code_manage_moblephone_list:[],
         accessoryList:[{name:'营业执照',url:''},{name:'备案证',url:''},{name:'经营者身份证',url:''}],
          companyEmployList:[],
          unuseful_time:'',
          user_code:'',
          record_code:'',
          issue_time:'',
          business_range:'',
          province:'',
         city:'',
         area:'',
         vill:'',
         town:'',
         address:'',
      },
      options1: '',
      options4:"",
      options5:"",
      options6:"",
      options7:"",
      options81:'',
      options91:'',
      options_province:'',
      options_city:'',
      options_area:'',
      options_town:'',
      options_vill:'',
      user:'',
     form: {List: [{name: '',healthimg:'',time:''}]},
       dialogImageUrl: '',
        dialogVisible: false,
       uploadFile:[],
        pickerOptionsEnd: {
        disabledDate: time => {
          return time.getTime() > Date.now()
        }
      },
       pickerOptions: {
         disabledDate(time) {
            return time.getTime() < Date.now();
          },
        }  
    }
  },
   created () {
      this.user = local.get('user');
     this.formInline.user_code=local.get('usercode');
    this.init()
    this.init1()
    
  },
  methods: {
    init () {
      axios.get('/api/company/department/list', {state:'1',pager_openset:'500'}).then((v) => {this.options4=v.department_list }).catch(() => {})
       if(this.user.province!=''&&this.user.province!=null){this.formInline.province=this.user.province;}
      if(this.user.city!=''&&this.user.city!=null){this.formInline.city=this.user.city;}
      if(this.user.area!=''&&this.user.area!=null){this.formInline.area=this.user.area;}
      if(this.user.town!=''&&this.user.town!=null){this.formInline.town=this.user.town;}
      if(this.user.vill!=''&&this.user.vill!=null){this.formInline.vill=this.user.vill;}
      this.getProvince();
    },
    init1(){
      axios.get('/api/dictionary/search', {companytag_code:this.formInline.companytag_code}).then((v) => {
      this.options1=v.主体业态.食品经营许可
      this.options81=v.经营信息.生产形式;
      this.options91=v.经营信息.生产类别;

      }).catch(() => {})
    },
    change1(item){
        axios.get('/api/departmentRegion/list', {department_code:item,param_type:'2',pager_openset:'100'}).then((v) => {
       this.options5=v.department_region_list
      }).catch(() => {})
       axios.get('/api/departmentUser/list', {department_code:item,state:'1',pager_openset:'100'}).then((v) => {
       this.options6=v.department_user_list;
      }).catch(() => {})
       this.formInline.region_name='';
      this.formInline.department_code=item;
    },
    change2(val){
 
       var obj = {}
      obj = this.options5.find(function(item){
        return item.region_name === val
      })
      this.formInline.user_code_manage_list=[];
      this.formInline.user_code_info_list=[];
      this.formInline.region_code=obj.region_code;
        this.formInline.region_name=val;
       
       axios.get('/api/infoRegion/region/user', {region_code:obj.region_code,state:'1',pager_openset:'100'}).then((v) => {
       this.options7=v.info_region_list
      }).catch(() => {})
    },
    change(index,val){
if(index==3){this.formInline.business_form=val;}
if(index==4){
        this.getProvince(val,'2')
        this.options_province.forEach(item=>{
         if(item.region_code==val){this.formInline.province=item.region_name;}
        })
         this.formInline.city='';
         this.formInline.area='';
          this.formInline.town='';
           this.formInline.vill=''
      }
      if(index==5){
        this.getProvince(val,'3')
        this.options_city.forEach(item=>{
         if(item.region_code==val){this.formInline.city=item.region_name;}
        })
         this.formInline.area='';
          this.formInline.town='';
           this.formInline.vill=''
      }
      if(index==6){
        this.getProvince(val,'4')
        this.options_area.forEach(item=>{
         if(item.region_code==val){this.formInline.area=item.region_name;}
        })
          this.formInline.town='';
           this.formInline.vill=''
      }
      if(index==7){
        this.getProvince(val,'5')
        this.options_town.forEach(item=>{
         if(item.region_code==val){this.formInline.town=item.region_name;}
        })
           this.formInline.vill=''
      }
      if(index==8){
        this.options_vill.forEach(item=>{
         if(item.region_code==val){this.formInline.vill=item.region_name;}
        })
      }
if(index==9){this.formInline.places_list=val;}
if(index==10){this.formInline.user_code_manage_list=val; }
if(index==11){this.formInline.user_code_info_list=val;}
    },
    logTimeChange(val){},
    cancle(){ this.form.List=[{name: '',healthimg:'',time:''}]},
     savepeople(form){
       this.$refs.form.validate(variable => {
         if (variable) {
           if(this.form.List[0].healthimg==''){
            this.$notify.error({
                title: '请上传证件照片',
                message: '',
                duration: 2000
              })
              return false
           }else{
             this.formInline.companyEmployList.push(objKeySort({
             employ_health_url:this.form.List[0].healthimg.substring(this.form.List[0].healthimg.indexOf("resources")),
             employ_name:this.form.List[0].name,
             user_health_datedue:this.form.List[0].time,}
           ));
           this.form.List=[{name: '',healthimg:'',time:''}]
           this.handleRemove11()
           this.$refs.upload.clearFiles();
           }
          }else{return}
        })
       },
         handleDelete(index){ //删除行数
        this.$confirm('确定删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(() => {
           this.formInline.companyEmployList.splice(index, 1)
        }).catch(() => {        
        });
           
        },
      beforeAvatarUpload(file) {
        const isLt20M = file.size / 1024 / 1024 < 20;

        if (!isLt20M) {
          this.$message.error('上传头像图片大小不能超过 20MB!');
        }
        return isLt20M;
      },
      handleRemove(file, fileList) {
          this.uploadDisabled = false;
           this.$set(this.formInline.accessoryList, 0,{name:'营业执照',url:''});
      },
      handleRemove1(file, fileList) {
          this.uploadDisabled1 = false;
           this.$set(this.formInline.accessoryList, 1,{name:'备案证',url:''});
      },
      handleRemove11(file, fileList) {
        let tmpname=this.form.List[0].name
        let tmptime=this.form.List[0].time
        this.form.List=[{name: tmpname,healthimg:'',time:tmptime}]
        //this.form.List[0].healthimg=''
        this.uploadDisabled11 = false;
      },
       handleRemove2(file, fileList) {
          this.uploadDisabled2 = false;
           this.$set(this.formInline.accessoryList, 2,{name:'经营者身份证',url:''});
      },
      handlepoll11 (response, file, fileList) {
         this.uploadDisabled11 = true;
          this.form.List[0].healthimg=response.data.visit_url.substring(response.data.visit_url.indexOf("resources"))
    },
      handlepoll (response, file, fileList) {
         this.uploadDisabled = true;
         this.$set(this.formInline.accessoryList, 0,{name:'营业执照',url:response.data.visit_url.substring(response.data.visit_url.indexOf("resources"))});
    },
     handlepoll1 (response, file, fileList) {
         this.uploadDisabled1 = true;
           this.$set(this.formInline.accessoryList, 1,{name:'备案证',url:response.data.visit_url.substring(response.data.visit_url.indexOf("resources"))});
      
    },
    handlepoll2 (response, file, fileList) {
         this.uploadDisabled2 = true;
         this.$set(this.formInline.accessoryList, 2,{name:'经营者身份证',url:response.data.visit_url.substring(response.data.visit_url.indexOf("resources"))});
        
    },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
        IsActive(k,val) {
        this.activeClass = k;
        this.formInline.companytag_code=val;
         this.init1()
      },
      submitForm(formInline){
         let paramas=this.formInline
         this.$refs[formInline].validate((valid) => {
        if (valid) {
         if(paramas.accessoryList[2].url==''){
            this.$notify.error({
                title: '请上传身份证件照片',
                message: '',
                duration: 4500
              })
              return false
           }
         axios.post('/api/company/save', paramas).then((v) => {
           this.$router.back()
      }).catch(() => {})
        }
         })
      
      },
       getNowTime() {
	       var now = new Date();
	       var year = now.getFullYear(); 
	       var month = now.getMonth(); 
         var date = now.getDate();
           var hh =now.getHours() < 10? "0" + now.getHours(): now.getHours();
      var mm =now.getMinutes() < 10? "0" + now.getMinutes(): now.getMinutes();
      var ss =now.getSeconds() < 10? "0" + now.getSeconds():now.getSeconds();
       var hour =' '+hh+':'+mm+':'+ss; 
	       month = month + 1;
	       month = month.toString().padStart(2, "0");
	       date = date.toString().padStart(2, "0");
	       defaultDate = `${year}-${month}-${date}${hour}`;
         return defaultDate;
	       this.$set(this.info, "stockDate", defaultDate);
      },
      getProvince(val,index){
        axios.get('/api/region/list',{region_high_code:val,region_type:index}).then((v) => {
          if(index=='2'){this.options_city=v;
          let city=this.formInline.city
          if(city){
             this.options_city.forEach(item=>{
               if(item.region_name==city){
                  this.getProvince(item.region_code,'3')
               }
             })
           }}
          else if(index=='3'){
            this.options_area=v;
            let area=this.formInline.area
          if(area){
             this.options_area.forEach(item=>{
               if(item.region_name==area){
                  this.getProvince(item.region_code,'4')
               }
             })
           }
          }
          else if(index=='4'){this.options_town=v;
          let town=this.formInline.town
          if(town){
             this.options_town.forEach(item=>{
               if(item.region_name==town){
                  this.getProvince(item.region_code,'5')
               }
             })
           }}
          else if(index=='5'){this.options_vill=v;}
          else{this.options_province=v
            let province=this.formInline.province
           if(province){
             this.options_province.forEach(item=>{
               if(item.region_name==province){
                  this.getProvince(item.region_code,'2')
               }
             })
           }
          }
       
      }).catch(() => {})
      }
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
     /deep/ .el-table.no-header .el-table__header{display: none}
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
/deep/ .el-table{
.el-table__body,.el-table__header{width: 100% !important;}
} 


.el-checkbox-button{margin-bottom: 10px}
}

</style>