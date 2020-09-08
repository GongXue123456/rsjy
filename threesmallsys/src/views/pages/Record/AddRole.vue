<template>
  <el-container class="patroldetail container">
    <el-header class="box add bb">
        <h5 class="mb10"><span class="lines"></span>设置管理员</h5>
        <div> <el-button class="" size="small" type="primary" @click="submitForm('formInline')">提交</el-button><el-button  class="back_btn" size="small" plain @click="$router.back()">返回</el-button></div>
    </el-header>
    <el-main class="p15 pt0">
    <div class="box mt20 mb20 f16">
        <div class="tl c333" >{{company_name}}</div>
     </div>
        <el-form :inline="true" status-icon ref="formInline"  :model="formInline"  class="demo-ruleForm">
      <el-row class="box mt20  f14">
         <el-col :span="24" class="patroldetail-title bgcfbe tl mb20 pl15">设置管理员</el-col>
         <el-col :span="22" class="tl" :offset="1">
         <el-form-item class="w" label-width="14%" label="监管人员：" size="small" prop="user_code_manage_list" :rules="[{required: true,message: '请选择监管人员', trigger: ['blur','change'],}]">
            <el-select v-model="formInline.user_code_manage_list" multiple placeholder="请选择监管人员" @change="change(10,formInline.user_code_manage_list)">
            <el-option  v-for="item in options6" :key="item.user_code" :label="item.user_name" :value="item.user_code" ></el-option>
          </el-select>
        </el-form-item>
        </el-col>
         <el-col :span="22" class="tl" :offset="1">
         <el-form-item class="w" label-width="14%" label="网格信息员：" size="small" prop="user_code_info_list" :rules="[{required: true,message: '请选择网格信息员', trigger: ['blur','change'], }]">
            <el-select v-model="formInline.user_code_info_list" multiple placeholder="请选择网格信息员" @change="change(11,formInline.user_code_info_list)">
            <el-option  v-for="item in options7" :key="item.user_code" :label="item.user_name" :value="item.user_code" ></el-option>
          </el-select>
        </el-form-item>
        </el-col>
    
     </el-row>
     
        <!-- <div class="box add">
        <div>
          <el-button  v-if="menu_btns!=null&&menu_btns.indexOf('2-1-4')!== -1" class="" size="small" type="primary" @click="submitForm('formInline')">提交变更</el-button>
        </div>
    </div> -->
     </el-form> 
    </el-main>
    <!-- 
      -->
  </el-container>
</template>
<script>
import axios from '../../../util/api'
import Globle from '@/components/Globle'
import { local } from '../../../util/util'
export default {
  data () {
    return {
      page: {
       company_code:''
      },
      menu_btns:Globle.menu_btns,
      department_code:'',
      region_code:'',
      company_name:'',
       list: [],
        formInline: {
          company_code:'',
           user_code_manage_list:[],
        user_code_info_list:[],
      },
      options6:'',
      options7:'',
      user:'',
    }
  },
   created () {
       this.user = local.get('user');
     this.page.company_code=this.$route.query.id;
     this.formInline.company_code=this.$route.query.id;
     this.init(this.page)
   
  },
  methods: {
       init (params) {
      axios.get('/api/company/drafts', params).then((v) => {
       this.formInline.user_code_manage_list=v.user_code_manage_list;
this.formInline.user_code_info_list=v.user_code_info_list;
this.company_name=v.company_name
        axios.get('/api/departmentUser/list', {department_code:v.department_code,state:'1',pager_openset:'100'}).then((v) => {
       this.options6=v.department_user_list;
      }).catch(() => {})
       axios.get('/api/infoRegion/region/user', {region_code:v.region_code,state:'1',pager_openset:'100'}).then((v) => {
       this.options7=v.info_region_list
      }).catch(() => {})
      }).catch(() => {})
      
    },
     change(index,val){
if(index==10){this.formInline.user_code_manage_list=val; }
if(index==11){this.formInline.user_code_info_list=val;}
    },
      submitForm(formInline){
         let paramas=this.formInline
         this.$refs[formInline].validate((valid) => {
        if (valid) {
           axios.post('/api/company/update', paramas).then((v) => {
           this.$router.back()
      }).catch(() => {})
       
        }
         })
      
      },
  }
}
</script>
<style lang="scss" scoped>
.patroldetail{
  overflow-x: hidden;
  .add{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .el-image{width: 160px; height: 160px;margin-right: 10px}
  .back_btn{background:rgba(247,248,249,1);border:1px solid rgba(217,222,225,1);}
  .patroldetail-title{height: 34px;line-height: 34px;border-left: 2px solid #788287}
 /deep/ .el-input-group__append .el-button--primary .el-icon-search{color: #fff}
 /deep/ .el-checkbox-button__inner{    border-left: 1px solid #DCDFE6;
    border-radius: 4px !important;}
   /deep/ .no-header .has-gutter{display: none}
  .people-message .el-form-item { margin-bottom: 0px;}
  .recordadd-upload{width: 160px;height: 160px;float: left;margin-right: 10px;
   /deep/ .el-upload{width: 160px;height: 160px;line-height: 160px;}
  
   }
   /deep/ .disabled .el-upload--picture-card {
    display: none !important;
}
.el-checkbox-button{margin-bottom: 10px}
}

</style>
