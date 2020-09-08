<template>
  <el-container class="patroladd">
    <el-header class="box add bb">
        <h5 class="mb10"><span class="lines"></span>新增主体类型</h5>
        <div>
             <el-button  class=""  size="small" type="primary" @click="submitForm('formInline')">提交</el-button>
            <el-button  class="back_btn" size="small" plain @click="$router.back()">返回</el-button></div>
    </el-header>
    <el-main class="p15 pt0">
     <el-form :inline="true"  status-icon ref="formInline"  :model="formInline"  class="demo-ruleForm">
     <el-row class="box mt20  f14">
         <el-col :span="24" class="patroladd-title bgcfbe tl mb20 pl15">主体类型信息</el-col>
        <el-col :span="9" class="tl" :offset="1">
        <el-form-item  class="rules w" label-width="34%" label="主体类型名称："  size="small"  prop="companytag_name" :rules="[{required: true,message: '请输入主体类型名称', trigger: 'blur' }]">
           <el-input  style="width:100%" placeholder="请输入主体类型名称" v-model="formInline.companytag_name" class="input-with-select">
            </el-input>
        </el-form-item>
        </el-col>
     </el-row>
     </el-form>
    </el-main>
  </el-container>
</template>
<script>
import Vue from 'vue'
import axios from '../../../util/api'
export default {
  name:'patroladd',
  data () {
    return {
        formInline: {
            companytag_name:"",
            companytype_code:'',
            companytag_code:''
      },
    }
    
  },
     created () {
        this.formInline.companytype_code=this.$route.query.id;
        this.formInline.companytag_code=this.$route.query.id1;
        if(this.formInline.companytag_code){ this.init()}
       
  },
  methods: {
    init(){
        axios.get('/api/companytag/single',{companytag_code:this.formInline.companytag_code}).then((v) => {
      this.formInline.companytag_name=v.company_tag.companytag_name
  
      })
    },
     submitForm(formInline){
          let paramas=this.formInline
         this.$refs[formInline].validate((valid) => {
        if (valid) {
            axios.get("/api/companytag/exist", paramas).then(v => {
              if(this.formInline.companytag_code){
 axios.put('/api/companytag/update', paramas).then((v) => {
           this.$router.back()
          }) 
              }else{
                 axios.post('/api/companytag/save', paramas).then((v) => {
           this.$router.back()
          }) 
              }
               
                 });

           
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
  .back_btn{background:rgba(247,248,249,1);border:1px solid rgba(217,222,225,1);}
  .patroladd-title{height: 34px;line-height: 34px;border-left: 2px solid #788287}
}

</style>
