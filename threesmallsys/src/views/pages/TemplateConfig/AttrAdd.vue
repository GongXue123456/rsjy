<template>
  <el-container class="patroladd">
    <el-header class="box add bb">
        <h5 class="mb10"><span class="lines"></span>新增模板属性</h5>
        <div>
             <el-button  class=""  size="small" type="primary" @click="submitForm('formInline')">提交</el-button>
            <el-button  class="back_btn" size="small" plain @click="$router.back()">返回</el-button></div>
    </el-header>
    <el-main class="p15 pt0">
     <el-form :inline="true"  status-icon ref="formInline"  :model="formInline"  class="demo-ruleForm">
     <el-row class="box mt20  f14">
         <el-col :span="24" class="patroladd-title bgcfbe tl mb20 pl15">模板属性信息</el-col>
        <el-col :span="9" class="tl" :offset="1">
        <el-form-item  class="rules w" label-width="34%" label="属性中文名："  size="small"  prop="attr_ch" :rules="[{required: true,message: '请输入属性中文名', trigger: 'blur' }]">
           <el-input  style="width:100%" placeholder="请输入属性中文名" v-model="formInline.attr_ch" class="input-with-select">
            </el-input>
        </el-form-item>
        </el-col>
        <el-col :span="9" class="tl" :offset="1">
        <el-form-item  class="rules w" label-width="34%" label="属性英文名："  size="small"  prop="attr_en" :rules="[{required: true,message: '请输入属性英文名', trigger: 'blur' }]">
           <el-input  style="width:100%" placeholder="请输入属性英文名" v-model="formInline.attr_en" class="input-with-select">
            </el-input>
        </el-form-item>
        </el-col>
         <el-col :span="9" :offset="1">
            <el-form-item  class="rules w" size="small" label-width="34%" label="模板类型：" >
              <el-select v-model="formInline.page_module" clearable placeholder="请选择模板类型">
                <el-option
                  v-for="item in statusOptions"
                  :key="item.value" :label="item.label" :value="item.value"
                ></el-option>
              </el-select>
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
          attr_ch:'',
            attr_en:"",
            page_module:'',
            page_attr_code:''
      },
        statusOptions: [
        { label: "诚信等级", value: "1" },
        { label: "信息公示", value: "2" },
        { label: "自查自纠", value: "3" }
      ],
    }
    
  },
     created () {
        this.formInline.page_attr_code=this.$route.query.id;
        if(this.formInline.page_attr_code){ this.init()}
       
  },
  methods: {
    init(){
        axios.get('/api/pageAttr/single',{page_attr_code:this.formInline.page_attr_code}).then((v) => {
      this.formInline=v.page_attr
  this.formInline.page_module=String(v.page_attr.page_module)
      })
    },
     submitForm(formInline){
          let paramas=this.formInline;
          let paramas1={
            page_attr_code:paramas.page_attr_code,
            page_module:paramas.page_module,
            attr_en:paramas.attr_en,
          }
         this.$refs[formInline].validate((valid) => {
        if (valid) {
            axios.get("/api/pageAttr/exist", paramas1).then(v => {
              if(this.formInline.page_attr_code){
 axios.put('/api/pageAttr/update', paramas).then((v) => {
           this.$router.back()
          }) 
              }else{
                 axios.post('/api/pageAttr/save', paramas).then((v) => {
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
