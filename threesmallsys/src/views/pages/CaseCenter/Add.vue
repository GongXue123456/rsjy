<template>
   <el-container class="patroladd">
    <el-header class="box add bb">
        <h5 class="mb10"  v-if="formInline.casecenter_code"><span class="lines"></span>编辑案件</h5>
        <h5 class="mb10"  v-else><span class="lines"></span>新增案件</h5>
        <div>
             <el-button  class=""  size="small" type="primary" @click="submitForm('formInline')">提交</el-button>
            <el-button  class="back_btn" size="small" plain @click="$router.back()">返回</el-button></div>
    </el-header>
    <el-main class="p15 pt0">
       <!-- <div class="box mt20 mb20 f16">
        <div class="tl c333" >案件编号：{{formInline.casecenter_code}}</div>
     </div> -->
     <el-form :inline="true"  status-icon ref="formInline"  :model="formInline"  class="demo-ruleForm">
     <el-row class="box mt20  f14">
         <el-col :span="24" class="patroladd-title bgcfbe tl mb20 pl15">案件信息</el-col>
         
         
         <div >
            <el-col :span="9" :offset="1" class="tl">
        <el-form-item  label="案件标题：" class="w" label-width="34%" size="small" prop="casecenter_title" :rules="[{required: true,message: '请输入案件标题', trigger: 'blur' },{ pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+$/, message: '不允许输入空格等特殊符号' }]">
           <el-input placeholder="案件标题" v-model="formInline.casecenter_title" class="input-with-select">
            </el-input>
        </el-form-item>
        </el-col>
         <el-col :span="22" :offset="1" class="tl">
        <el-form-item  label="案件内容：" class="w" label-width="14%" size="small" prop="casecenter_content" :rules="[{required: true,message: '请输入案件内容', trigger: 'blur' },{ pattern: /^[A-Za-z0-9\u4e00-\u9fa5\?？:：；‘’“”'',./，。、《》【】{}<>|、]+$/, message: '不允许输入空格等特殊符号' }]">
           <el-input type="textarea" :rows="5" placeholder="案件内容" v-model="formInline.casecenter_content" class="input-with-select">
            </el-input>
        </el-form-item>
        </el-col>
        <el-col :span="9" class="tl" :offset="1">
         <el-form-item class="w" label-width="34%" label="市场监管局：" size="small" prop="department_code_main" :rules="[{required: true,message: '请选择市场监管局', trigger: ['blur','change']}]">
           <el-select v-model="formInline.department_code_main" clearable placeholder="请选择市场监管局" @change="change(1,formInline.department_code_main)">
              <el-option  v-for="item in options4" :key="item.department_code" :label="item.department_name" :value="item.department_code" ></el-option>
          </el-select>
        </el-form-item>
        </el-col>
          <el-col :span="22" :offset="1" class="tl">
        <el-form-item  class="w" label="主要办案人：" label-width="14%" size="small">
          <template>
         <el-radio-group v-model="radio" >
           <el-radio  v-for="(item,index) in options6" :key="index" @change='checkUserMain(item.user_code,item.user_name)' :label="item.user_code">{{item.user_name}}</el-radio>
         </el-radio-group>
        </template>
        </el-form-item>
        </el-col>
        <el-col :span="9" class="tl" :offset="1">
         <el-form-item class="w" label-width="34%" label="市场监管局：" size="small" prop="department_code_secondary" :rules="[{required: true,message: '请选择市场监管局', trigger: ['blur','change']}]">
           <el-select v-model="formInline.department_code_secondary" clearable placeholder="请选择市场监管局" @change="change(2,formInline.department_code_secondary)">
              <el-option  v-for="item in options4" :key="item.department_code" :label="item.department_name" :value="item.department_code" ></el-option>
          </el-select>
        </el-form-item>
        </el-col>
          <el-col :span="22" :offset="1" class="tl">
        <el-form-item  class="w" label="协同办案人：" label-width="14%" size="small" >
        <template>
         <el-checkbox-group v-model="checkList" @change="checkUsersecondary" :max=10>
     <!-- @change='checkUsersecondary(item.user_code,item.user_name)' -->
           <el-checkbox  v-for="(item,index) in options7" :key="index" :label="item.user_code">{{item.user_name}}</el-checkbox>
         </el-checkbox-group>
        </template>
        </el-form-item>
        </el-col>
        </div>
     </el-row>
     </el-form>
    </el-main>
  </el-container>
</template>
<script>
import Vue from 'vue'
import axios from '../../../util/api'
import { local,objKeySort,remove } from '../../../util/util'
  export default {
    data() {
      return {
        user:'',
        options4:'',
        options6:[],
         options7:[],
         radio: '',
         checkList:[],
         user_codes_secondary:[],
         user_names_secondary:[],
         formInline: {
           casecenter_code:'',
          casecenter_title:'',
            casecenter_content:"",
            user_code_main:'',
            user_name_main:'',
            user_codes_secondary:'',
            user_names_secondary:'',
            department_code_main:'', 
            department_name_main:'',
            department_code_secondary:'',
            department_name_secondary:'',
      },
      page:{department_code:''},
      page1:{department_code:''}
      };
    },
      created () {
        this.user=local.get('user');
          this.active= this.$route.query.active;
        this.formInline.casecenter_code= this.$route.query.id;
      this.init()
      if(this.formInline.casecenter_code){ this.init1()}
  },
    methods: {
      init(){
        axios.get('/api/department/list', {state:'1',pager_openset:'100'}).then((v) => {this.options4=v.department_list })
      },
      init1(){
        axios.get('/api/caseCenter/single',{casecenter_code:this.formInline.casecenter_code}).then((v) => {
      this.formInline.casecenter_title=v.caseCenter.casecenter_title;
      this.formInline.casecenter_content=v.caseCenter.casecenter_content;
      this.formInline.user_code_main=v.caseCenter.user_code_main;
      this.formInline.user_name_main=v.caseCenter.user_name_main;
      this.formInline.department_code_main=v.caseCenter.department_code_main;
       this.formInline.department_code_secondary=v.caseCenter.department_code_secondary;
       this.formInline.user_codes_secondary=v.caseCenter.user_codes_secondary;
       this.formInline.user_names_secondary=v.caseCenter.user_names_secondary;
      this.radio=v.caseCenter.user_code_main;
      this.checkList=v.caseCenter.user_code_secondary_list;
        this.getoptions6()
        this.getoptions7()
      })
    },
    getoptions6(){
        axios.get('/api/departmentUser/deptUserAll', {department_code:this.formInline.department_code_main,state:'1',pager_openset:'100'}).then((v) => {this.options6=v.departmentUser_list;})
    },
      getdate1(){
         axios.get('/api/companytype/all','').then((v) => {
          this.list1=v; 
         this.getCompanytag()   
          })
      },
      getoptions7(){
axios.get('/api/departmentUser/deptUserAll', {department_code:this.formInline.department_code_secondary,state:'1',pager_openset:'100'}).then((v) => {this.options7=v.departmentUser_list;})
      },
      change(index,val){
        if(val!=''){
           if(index==1){
              this.formInline.department_code_main=val;
              this.options4.forEach(item=>{
          if(item.department_code==val){
            this.formInline.department_name_main=item.department_name
          }
        })
           this.getoptions6()
        }
        if(index==2){
           this.formInline.department_code_secondary=val;
           this.options4.forEach(item=>{
          if(item.department_code==val){
            this.formInline.department_name_secondary=item.department_name
          }
        })
            this.getoptions7()
        }
        }else{
             if(index==1){
          this.formInline.department_code_main='';
           this.formInline.department_name_main=''
           this.options6=[];
           this.formInline.user_code_main=''
           this.formInline.user_name_main=''
        }
        if(index==2){
          this.formInline.department_code_secondary='';
           this.formInline.department_name_secondary=''
           this.options7=[];
           this.formInline.user_codes_secondary=''
           this.formInline.user_names_secondary=''
        }
        }
       
        
      },
      checkUserMain(val,val1){
        this.formInline.user_code_main=val;
         this.formInline.user_name_main=val1;
      },
       checkUsersecondary(val) {
         this.user_codes_secondary=[];
         this.user_names_secondary=[];
          this.user_codes_secondary=val;
          this.options7.forEach(item=>{
            val.forEach(item1=>{
               if(item.user_code==item1){
                this.user_names_secondary.push(item.user_name)
            }
            })
            
          })
           this.formInline.user_codes_secondary=this.user_codes_secondary.join(',');
           this.formInline.user_names_secondary=this.user_names_secondary.join(',');
          
      },
          submitForm(formInline){
         let paramas=this.formInline
         this.$refs[formInline].validate((valid) => {
        if (valid) {
          if(this.formInline.user_code_main==''){
              this.$notify.error({
                title: '请选择主要办案人',
                message: '',
                duration: 2000
              })
      }else if(this.formInline.user_codes_secondary==''){
              this.$notify.error({
                title: '请选择协同办案人',
                message: '',
                duration: 2000
              })
      }else{
          if(this.formInline.casecenter_code){ 
            axios.put('/api/caseCenter/update', paramas).then((v) => {
             this.$router.back()
      })
          }else{
             axios.post('/api/caseCenter/save', paramas).then((v) => {
             this.$router.back()
      })
          }
      }
        
        }
         })
      
      },
    }
  };
</script>
<style lang="scss" scoped>
.patroladd{
  overflow-x: hidden;
  .add{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .back_btn{background:rgba(247,248,249,1);border:1px solid rgba(217,222,225,1);}
  .patroladd-title{height: 34px;line-height: 34px;border-left: 2px solid #788287}
   /deep/ .el-checkbox-button__inner{    border-left: 1px solid #DCDFE6;
    border-radius: 4px !important;}
    .el-radio{line-height: 2;}
    .el-checkbox-button{margin-bottom: 10px}
      .active {
       background: #2EC68A;
    border-color: #2EC68A;
    color: #FFFFFF;
  }
}

</style>