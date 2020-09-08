<template>
  <el-container class="patroladd">
    <el-header class="box add bb">
        <h5 class="mb10"><span class="lines"></span>新增食品监管分类</h5>
        <div>
             <el-button  class=""  size="small" type="primary" @click="submitForm('formInline')">提交</el-button>
            <el-button  class="back_btn" size="small" plain @click="$router.back()">返回</el-button></div>
    </el-header>
    <el-main class="p15 pt0">
     <el-form :inline="true"  status-icon ref="formInline"  :model="formInline"  class="demo-ruleForm">
     <el-row class="box mt20  f14">
         <el-col :span="24" class="patroladd-title bgcfbe tl mb20 pl15">食品监管分类信息</el-col>
        <el-col :span="9" class="tl" :offset="1">
        <el-form-item  class="rules w" label-width="34%" label="食品监管分类名称："  size="small"  prop="companytype_name" :rules="[{required: true,message: '请输入食品监管分类名称', trigger: 'blur' }]">
           <el-input  style="width:100%" placeholder="请输入食品监管分类名称" v-model="formInline.companytype_name" class="input-with-select">
            </el-input>
        </el-form-item>
        </el-col>
        <el-col :span="9" class="tl" :offset="1">
        <el-form-item  class="rules w" label-width="34%" label="注释："  size="small"  prop="note" :rules="[{required: true,message: '请输入主体类型注释', trigger: 'blur' }]">
           <el-input  style="width:100%" placeholder="请输入主体类型注释" v-model="formInline.note" class="input-with-select">
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
            companytype_name:"",
            note:"",
            companytype_code:''
      },
    }
    
  },
     created () {
        this.formInline.companytype_code=this.$route.query.id;
        if(this.formInline.companytype_code){ this.init()}
       
  },
  methods: {
    init(){
        axios.get('/api/companytype/single',{companytype_code:this.formInline.companytype_code}).then((v) => {
      this.formInline.companytype_name=v.company_type.companytype_name
      this.formInline.note=v.company_type.note
  
      })
    },
     submitForm(formInline){
          let paramas=this.formInline
         this.$refs[formInline].validate((valid) => {
        if (valid) {
            axios.get("/api/companytype/exist", paramas).then(v => {
              if(this.formInline.companytype_code){
 axios.put('/api/companytype/update', paramas).then((v) => {
           this.$router.back()
          }) 
              }else{
                 axios.post('/api/companytype/save', paramas).then((v) => {
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
