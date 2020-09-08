<template>
   <el-container class="recordadd ">
       <el-header class="box add bb">
        <h5 class="mb10"><span class="lines"></span>编辑备案/类型修改</h5>
        <div>
          <el-button  class="" size="small" type="primary" @click="submitForm('formInline')">提交</el-button>
          <el-button  class="back_btn"  size="small" plain @click="$router.back()">返回</el-button>
        </div>
      </el-header>
       <el-main class="p15 pt0">
       <el-form :inline="true"  status-icon ref="formInline"  :model="formInline"  class="demo-ruleForm">
    
     
      <el-row class="box mt20 f14">
        <!-- <div class="tl" >今日已提交三小备案数：16</el-row> -->
         <el-col :span="22" class="tl" :offset="1">
          <el-form-item class="w" label-width="14%" label="食品监管分类：" >
              <el-button v-for="(v,k) in list_btn1" :key="k" :class="activeClass1 ==k?'active':''" class=""  size="small" @click="IsActive1(k,v.companytype_code)">{{v.companytype_name}}</el-button>  
          </el-form-item>
         </el-col>
         <el-col :span="22" class="tl" :offset="1">
          <el-form-item class="w" label-width="14%" label="主体类型：" >
              <el-button v-for="(v,k) in list_btn" :key="k" :class="activeClass ==k?'active':''" class=""  size="small" @click="IsActive(k,v.companytag_code)">{{v.companytag_name}}</el-button>  
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
import { local,objKeySort } from '../../../util/util'
let defaultDate;
export default {
  data () {
    return {
      activeClass:0,
      activeClass1:0,
      list_btn:'',
      list_btn1:'',
      formInline: {
        company_code:'',
        companytype_code:'',
        companytag_code:'',
       business_form:''
      },
      user:'',
   
    }
  },
   created () {
      this.user = local.get('user');
     this.formInline.company_code=this.$route.query.id;
    this.init()
    this.getdate()
    
  },
  methods: {
      getdate(){
          axios.get('/api/company/drafts', {company_code:this.formInline.company_code}).then((v) => {
       this.formInline.companytype_code=v.companytype_code;
        this.formInline.companytag_code=v.companytag_code;
         this.init1(v.companytype_code)
        if(v.companytype_code=='1001574645421581000000001'){this.activeClass1=0}else if(v.companytype_code=='1001574645421581000000002'){this.activeClass1=1}else if(v.companytype_code=='1001574645421581000000003'){this.activeClass1=2}
      if(v.companytag_code=='1001574645421581111111101'||v.companytag_code=='1001574645421581111111102'||v.companytag_code=='1001574645421581111111103'){this.activeClass=0}else{this.activeClass=1}

      }).catch(() => {})
      },
    init(){
      axios.get('/api/companytype/all', {state:'1'}).then((v) => {
      this.list_btn1=v
      }).catch(() => {})
    },
    init1(params){
      axios.get('/api/companytag/all', {companytype_code:params}).then((v) => {
      this.list_btn=v
      this.formInline.companytag_code=v[0].companytag_code;
      }).catch(() => {})
    },
        IsActive(k,val) {
        this.activeClass = k;
        this.formInline.companytag_code=val;
        //  this.init1()
      },
        IsActive1(k,val) {
        this.activeClass1 = k;
        this.activeClass = 0;
        this.formInline.companytype_code=val;
         this.init1(val)
      },
      submitForm(formInline){
         let paramas=this.formInline
         this.$refs[formInline].validate((valid) => {
        if (valid) {
         if(paramas.companytype_code==''){
            this.$notify.error({
                title: '请选择食品监管分类',
                message: '',
                duration: 4500
              })
              return false
           }else if(paramas.companytag_code==''){
            this.$notify.error({
                title: '请选择主体类型',
                message: '',
                duration: 4500
              })
              return false
           }
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
 




}

</style>