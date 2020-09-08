<template>
  <el-container class="patroladd">
     
    <el-header class="box add bb">
        <h5 class="mb10"><span class="lines"></span>新增模板分类</h5>
        <div>
             <el-button  class=""  size="small" type="primary" @click="submitForm('formInline')">提交</el-button>
            <el-button  class="back_btn" size="small" plain @click="$router.back()">返回</el-button></div>
    </el-header>
    <el-main class="pt0">
    <el-form :inline="true"  status-icon ref="formInline"  :model="formInline"  class="demo-ruleForm">
      <el-row class="box mt20  f14">
         <el-col :span="24" class="patroladd-title bgcfbe tl mb20 pl15">监管分类</el-col>
        <el-col :span="22" class="tl mb20" :offset="1">
           <el-button v-for="(v,k) in list_btn1" :key="k" :class="activeClass1 ==k?'active':''" class=""  size="small" @click="IsActive1(k,v.companytype_code)">{{v.companytype_name}}</el-button>  
         </el-col>
     </el-row>
        <el-row class="box mt20  f14">
         <el-col :span="24" class="patroladd-title bgcfbe tl mb20 pl15">主体类型</el-col>
        <el-col :span="22" class="tl mb20" :offset="1">
           <el-button v-for="(v,k) in list_btn" :key="k" :class="activeClass ==k?'active':''" class=""  size="small" @click="IsActive(k,v.companytag_code)">{{v.companytag_name}}</el-button>  
         </el-col>
     </el-row>
     <el-row class="box mt20  f14">
         <el-col :span="24" class="patroladd-title bgcfbe tl mb20 pl15">模板信息</el-col>
          <el-col :span="9" class="tl" :offset="1">
        <el-form-item  class="rules w" label-width="34%" label="模板名称："  size="small"  prop="page_config_name" :rules="[{required: true,message: '请输入模板名称', trigger: 'blur' }]">
           <el-input  style="width:100%" placeholder="请输入模板名称" v-model="formInline.page_config_name" class="input-with-select">
            </el-input>
        </el-form-item>
        </el-col>
         <el-col :span="9" class="mr10">
            <el-form-item size="small" label-width="34%" label="模板类型：" prop="page_module" :rules="[{required: true,message: '请选择模板类型', trigger: 'blur' }]">
              <el-select v-model="formInline.page_module" clearable placeholder="请选择模板类型" @change="change(formInline.page_module)">
                <el-option
                  v-for="item in statusOptions"
                  :key="item.value" :label="item.label" :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
     </el-row>
     <el-row class="box mt20  f14">
         <el-col :span="24" class="patroladd-title bgcfbe tl mb20 pl15">页面属性信息</el-col>
          <el-checkbox-group v-model="checkboxGroup1" @change="handleCheckedChange(checkboxGroup1)">
          <el-col v-for="(item,index) in list1" :key="index" :span="22" class="tl" :offset="1">
            <el-col :span="10" class="mr10">
           <el-checkbox  class="ml10 mb20"  :label="item.attr_en" :value="item.attr_en" :key="item.attr_en" border size="medium">{{item.attr_ch}}</el-checkbox>
            </el-col>
            <el-col  :span="10" class="mr10" :offset="1" >
             <el-form-item size="small">
         <el-input placeholder="请输入属性值（0到1之间的一位小数，包括0和1）" @change="aaa(item.attr_en,item.attr_val)"  clearable v-model="item.attr_val" class="input-with-select">
            </el-input>
            </el-form-item>
        </el-col>
        </el-col>

        </el-checkbox-group>
     </el-row>
     </el-form>
     </el-main>
  </el-container>
</template>
<script>
import axios from '../../../util/api'
import { local,objKeySort } from '../../../util/util'
let aa;
export default {
  data () {
    return {
      menu_list:'',
      activeClass:0,
      activeClass1:0,
      list_btn1:'',
       list_btn:'',
       checked1: true,
        checked2: false,
        checkboxGroup1: [],
        checkboxGroup2:[],
        list:[],
          statusOptions: [
        { label: "诚信等级", value: "1" },
        { label: "信息公示", value: "2" },
        { label: "自查自纠", value: "3" }
      ],
        formInline:{
            companytag_code:'',
            companytype_code:'',
            page_config_name:'',
            page_config_content:[],
            page_config_code:'',
            page_module:'',
        },
        page:{
            page_config_code:''
        },
        list1:[]
    }
  },
     created () {
           this.page.page_config_code=this.$route.query.id;
      this.user = local.get('user');
      
        // this.init1()
        if(this.page.page_config_code){
this.getdate()
        }else{
           this.init(this.page)
            this.init1()
        }
     
  },
  methods: {
  
     init (paramas) {
       
        axios.get('/api/pageAttr/list', {pager_offset:'0',pager_openset:'100',page_module:this.formInline.page_module,state:'1'}).then((v) => {
          this.list1=v.page_attr_list;
            if(this.page.page_config_code){
              this.checkboxGroup1=[]
               this.list1.forEach(item=>{
               aa.forEach(element => { this.checkboxGroup1=this.checkboxGroup1.concat(element.attr_en)
               if(item.attr_en==element.attr_en){
                  item.attr_val=element.attr_val
               }
        });
          this.checkboxGroup1= [...new Set(this.checkboxGroup1)];
         })
            }
      }) 
    },
    getdate(){
      var that=this;
              this.formInline.page_config_code=this.$route.query.id;
             axios.get('/api/pageConfig/single', {page_config_code:this.page.page_config_code}).then((v) => {
               this.formInline.page_module=String(v.page_config.page_module)
             this.init(this.page)
         this.formInline.companytype_code=v.page_config.companytype_code;
         this.formInline.companytag_code=v.page_config.companytag_code;
          this.formInline.page_config_name=v.page_config.page_config_name
          aa=JSON.parse(v.page_config.page_config_content)
            this.formInline.page_config_content=this.formInline.page_config_content.concat(aa)
   this.formInline.page_config_content= [...new Set(this.formInline.page_config_content)];
          axios.get('/api/companytype/all','').then((v) => {
          this.list_btn1=v; 
          this.list_btn1.forEach((item,index)=>{
          if(item.companytype_code==this.formInline.companytype_code){
            this.activeClass1=index
          }
           })
         
         axios.get('/api/companytag/all',{companytype_code:this.formInline.companytype_code}).then((v) => {
          this.list_btn=v;
            this.list_btn.forEach((item,index)=>{
          if(item.companytag_code==this.formInline.companytag_code){
            this.activeClass=index
          }
        })
         }) 
          })
      })
    },
    init1(){
       axios.get('/api/companytype/all','').then((v) => {
          this.list_btn1=v;
          this.formInline.companytype_code=this.list_btn1[0].companytype_code
        this.init2(this.formInline.companytype_code);
       
      })
    },
    init2(paramas){
        axios.get('/api/companytag/all',{companytype_code:paramas}).then((v) => {
          this.list_btn=v;
            if(this.page.page_config_code){
            // this.getdate()
          }else{
           this.formInline.companytag_code=this.list_btn[0].companytag_code
          }
         
      })
    },
    aaa(index,val){
       const regex = /^(0(\.\d{1})?|1(\.0{1})?)$/;
        if(!regex.test(val)) {
             this.$message.error('只能输入0到1之间的一位小数（包括0和1）');
        }
         this.formInline.page_config_content.forEach(item=>{
           if(item.attr_en==index){
             item.attr_val=val
           }
         })
    },
    change(val){
          this.formInline.page_module=val;
           this.init(this.page)
    },
     IsActive1(k,val) {
        this.activeClass1 = k;
        this.formInline.companytype_code=val;
        this.init2(val);
      },
     IsActive(k,val) {
        this.activeClass = k;
        this.formInline.companytag_code=val;
      },
    handleCheckedChange(val){
      val= [...new Set(val)];
        this.list=[];
        this.checkboxGroup2=[];
         this.formInline.page_config_content=[];
      this.list=this.list.concat(this.checkboxGroup2).concat(val)
       this.list= [...new Set(this.list)];
         this.list1.forEach(item1=>{
             this.list.forEach(item2=>{
           if(item1.attr_en==item2){
              this.formInline.page_config_content.push(objKeySort({
             attr_en:item1.attr_en,
               attr_ch:item1.attr_ch,
               attr_val:item1.attr_val
          }))
           }
         
             })
      })
      this.formInline.page_config_content= [...new Set(this.formInline.page_config_content)];
      
    },
     submitForm(formInline){
          let paramas=this.formInline
          let paramas1={
            companytag_code:paramas.companytag_code,
            companytype_code:paramas.companytype_code,
            page_config_name:paramas.page_config_name,
            page_config_code:paramas.page_config_code,
          }
         this.$refs[formInline].validate((valid) => {
        if (valid) {
          let aaaa=0;
           if(paramas.page_module==1){
             paramas.page_config_content.forEach((item,index)=>{
            if(item.attr_val==''){
              this.$message.error('所选属性必须有属性值');
              aaaa=1;
              return false;
            }else{
              const regex = /^(0(\.\d{1})?|1(\.0{1})?)$/;
                if(!regex.test(item.attr_val)) {
             this.$message.error('只能输入0到1之间的一位小数（包括0和1）');
              aaaa=1;
              return false;
        }
            }
          })
          }else{
            paramas.page_config_content.forEach((item,index)=>{
              const regex = /^(0(\.\d{1})?|1(\.0{1})?)$/;
              if(item.attr_val){
                if(!regex.test(item.attr_val)) {
             this.$message.error('只能输入0到1之间的一位小数（包括0和1）');
              aaaa=1;
              return false;
                }
              }
                
          })
          }
          if(aaaa==0){
            axios.get("/api/pageConfig/exist", paramas1).then(v => { 
                   if(this.page.page_config_code){
                   axios.put('/api/pageConfig/update', paramas).then((v) => {
      this.$router.back()
      })
              }else{
                axios.post('/api/pageConfig/save', paramas).then((v) => {
      this.$router.back()
      })
              }              
                 });
          }   
        }
         })
      },
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
  .patroladd-title1{height: 34px;line-height: 34px;}
.el-checkbox{    display: flex;
    justify-content: left;
    align-items: center;}

}

</style>
