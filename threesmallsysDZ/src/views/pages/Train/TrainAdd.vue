<template>
  <el-container class="patroladd">
     
    <el-header class="box add bb">
        <h5 class="mb10" v-if="!formInline.train_code"><span class="lines"></span>新增培训</h5>
        <h5 class="mb10" v-if="formInline.train_code"><span class="lines"></span>编辑培训</h5>
        <div>
             <el-button  class=""  size="small" type="primary" @click="submitForm('formInline')">提交</el-button>
            <el-button  class="back_btn" size="small" plain @click="$router.back()">返回</el-button></div>
    </el-header>
    <el-main class="pt0">
    <el-form :inline="true"  status-icon ref="formInline"  :model="formInline"  class="demo-ruleForm">
     <el-row class="box mt20  f14">
         <el-col :span="24" class="patroladd-title bgcfbe tl mb20 pl15">培训信息</el-col>
        
        <el-col :span="9" class="tl" :offset="1">
        <el-form-item class="w" label-width="34%" label="培训标题：" size="small"  prop="train_title" :rules="[{required: true,message: '请输入培训标题', trigger: 'blur' },{ pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+$/, message: '不允许输入空格等特殊符号' }]">
           <el-input placeholder="培训标题" v-model="formInline.train_title" clearable class="input-with-select">
            </el-input>
        </el-form-item>
        </el-col>
        
         <el-col :span="22" class="tl" :offset="1">
            <el-row class="box   f14">
          <el-form-item class="w" label-width="14%" label="培训区域：" size="small" >
           <el-col :span="4" class="tl">
             <el-select v-if="user.province"  disabled  v-model="user.province"></el-select>
          <el-select v-else v-model="formInline.train_province" placeholder="请选择省级" clearable @change="change(1,formInline.train_province)">
             <el-option v-for="group in options" :key="group.region_code" :label="group.region_name" :value="group.region_code"> </el-option>
          </el-select>
             </el-col>
          <el-col :span="4" class="tl ml10" >
             <el-select v-if="user.city"  disabled  v-model="user.city"></el-select>
          <el-select v-else v-model="formInline.train_city" placeholder="请选择市级" clearable @change="change(2,formInline.train_city)">
             <el-option v-for="group in options1" :key="group.region_code" :label="group.region_name" :value="group.region_code"> </el-option>
          </el-select>
             </el-col>
            <el-col :span="4" class="tl ml10"  >
               <el-select v-if="user.area"  disabled  v-model="user.area"></el-select>
          <el-select v-else v-model="formInline.train_area" placeholder="请选择区县" clearable @change="change(3,formInline.train_area)">
             <el-option v-for="group in options2" :key="group.region_code" :label="group.region_name" :value="group.region_code"> </el-option>
          </el-select>
             </el-col>  
             <el-col :span="4" class="tl ml10"  >
                   <el-select v-if="user.town"  disabled  v-model="user.town"></el-select>
          <el-select v-else v-model="formInline.train_town" placeholder="请选择乡镇" clearable @change="change(4,formInline.train_town)">
             <el-option v-for="group in options3" :key="group.region_code" :label="group.region_name" :value="group.region_code"> </el-option>
          </el-select>
             </el-col> 
             <el-col :span="4" class="tl ml10"  >
                   <el-select v-if="user.vill"  disabled  v-model="user.vill"></el-select>
          <el-select v-else v-model="formInline.train_vill" placeholder="请选择社区" clearable @change="change(5,formInline.train_vill)">
             <el-option v-for="group in options4" :key="group.region_code" :label="group.region_name" :value="group.region_code"> </el-option>
          </el-select>
             </el-col> 
        </el-form-item>
            </el-row>
        </el-col>
         <el-col :span="9"  class="tl" :offset="1">
          <el-form-item label="请选择年度：" class="w" label-width="34%" size="small" prop="train_year" :rules="[{required: true,message: '请选择年度', trigger: 'blur' }]">
           <el-date-picker v-model="formInline.train_year" :picker-options="pickerOptionsStart" type="year" clearable placeholder="请选择年度" value-format="yyyy" style="width: 100%;" @change="change(6,formInline.train_year)"> </el-date-picker>
        </el-form-item>
        </el-col>
         <el-col :span="9" class="tl" :offset="1">
          <el-form-item  label="请选择季度：" class="w" label-width="34%" size="small" prop="train_quarter" :rules="[{required: true,message: '请选择季度', trigger: ['blur','change'] }]">
          <el-select v-model="formInline.train_quarter" placeholder="请选择季度" @change="change(7,formInline.train_quarter)">
             <el-option v-for="group in options5" :key="group.title" :label="group.title" :value="group.title"> </el-option>
          </el-select>
        </el-form-item>
        </el-col>
     </el-row>
     </el-form>
     </el-main>
  </el-container>
</template>
<script>
import axios from '../../../util/api'
import { local } from '../../../util/util'
export default {
  data () {
    return {
      company_name:'',
        formInline: {
          train_code:'',
         train_title:'',
        train_city:'',
        train_area:'',
         train_province:'',
         train_town:'',
         train_vill:'',
         train_year:'',
          train_quarter:''
      },
      region_high_code:'',
        options:'',
      options1:'',
      options2:'',
      options3:'',
       options4:'',
      options5: [{title: '第一季度',name: '1'}, {title: '第二季度',name: '2'},{title: '第三季度',name: '3'},{title: '第四季度',name: '4'}],
        user:'',
        tableData:'',
         pickerOptionsStart: {
        disabledDate: time => {
            return time.getTime() < Date.now(); 
        }
      },
    }
  },
     created () {
      this.user = local.get('user');
       this.formInline.train_code=this.$route.query.id;
     this.init()
  },
  methods: {
     init (params) {
       if(this.formInline.train_code){
          axios.get('/api/train/single',{train_code:this.formInline.train_code}).then((v) => {
       this.formInline=v.train
           if(v.province!=null){this.formInline.train_province=v.train.province;}
      if(v.train.city!=null){this.formInline.train_city=v.train.city;}
      if(v.train.area!=null){this.formInline.train_area=v.train.area;}
      if(v.train.town!=null){this.formInline.train_town=v.train.town;}
      if(v.train.vill!=null){this.formInline.train_vill=v.train.vill;}
      this.getProvince();
      })
       }else{
           if(this.user.province!=null){this.formInline.train_province=this.user.province;}
      if(this.user.city!=null){this.formInline.train_city=this.user.city;}
      if(this.user.area!=null){this.formInline.train_area=this.user.area;}
      if(this.user.town!=null){this.formInline.train_town=this.user.town;}
      if(this.user.vill!=null){this.formInline.train_vill=this.user.vill;}

      this.getProvince();
       }
     
      
    },
     change(index,val){
       if(index==1){
            this.getProvince(val,'2')
        this.options.forEach(item=>{
         if(item.region_code==val){this.formInline.train_province=item.region_name;}
        })
         this.formInline.train_city='';
         this.formInline.train_area='';
          this.formInline.train_town='';
           this.formInline.train_vill=''
       }
        if(index==2){
       this.getProvince(val,'3')
        this.options1.forEach(item=>{
         if(item.region_code==val){this.formInline.train_city=item.region_name;}
        })
         this.formInline.train_area='';
          this.formInline.train_town='';
           this.formInline.train_vill=''
        }
       if(index==3){
       this.getProvince(val,'4')
        this.options2.forEach(item=>{
         if(item.region_code==val){this.formInline.train_area=item.region_name;}
        })
          this.formInline.train_town='';
           this.formInline.train_vill=''
       }
         if(index==4){
          this.getProvince(val,'5')
        this.options3.forEach(item=>{
         if(item.region_code==val){this.formInline.train_town=item.region_name;}
        })
           this.formInline.train_vill=''
        }
         if(index==5){
            this.options4.forEach(item=>{
         if(item.region_code==val){this.formInline.train_vill=item.region_name;}
        })
        }
        if(index==7){
         this.options5.forEach(item=>{
            if(item.title==val){this.formInline.train_quarter=item.title;}
         })
        }
     },
     submitForm(formInline){
          let paramas=this.formInline
         this.$refs[formInline].validate((valid) => {
        if (valid) {
           if(this.formInline.train_code){
axios.put('/api/train/update', paramas).then((v) => {
      this.$router.back()
      })
           }else{
axios.post('/api/train/save', paramas).then((v) => {
      this.$router.back()
      })
           }
            
        }
         })
      },
       getProvince(val,index){
        axios.get('/api/region/list',{region_high_code:val,region_type:index}).then((v) => {
          if(index=='2'){this.options1=v;
          let city=this.formInline.train_city
          if(city){
             this.options1.forEach(item=>{
               if(item.region_name==city){
                  this.getProvince(item.region_code,'3')
               }
             })
           }}
          else if(index=='3'){
            this.options2=v;
            let area=this.formInline.train_area
          if(area){
             this.options2.forEach(item=>{
               if(item.region_name==area){
                  this.getProvince(item.region_code,'4')
               }
             })
           }
          }
          else if(index=='4'){this.options3=v;
          let town=this.formInline.train_town
          if(town){
             this.options3.forEach(item=>{
               if(item.region_name==town){
                  this.getProvince(item.region_code,'5')
               }
             })
           }}
          else if(index=='5'){this.options4=v;}
          else{this.options=v
            let province=this.formInline.train_province
           if(province){
             this.options.forEach(item=>{
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
  /* .el-form-item--small .el-form-item__content{width: 80%} */

}

</style>
