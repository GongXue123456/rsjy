<template>
   <el-container class="patroladd">
    <el-header class="box add bb">
        <h5 class="mb10"><span class="lines"></span>新增应急通告</h5>
        <div>
             <el-button  class=""  size="small" type="primary" @click="submitForm('formInline')">提交</el-button>
            <el-button  class="back_btn" size="small" plain @click="$router.back()">返回</el-button></div>
    </el-header>
    <el-main class="p15 pt0">
     <el-form :inline="true"  status-icon ref="formInline"  :model="formInline"  class="demo-ruleForm">
     <el-row class="box mt20  f14">
         <el-col :span="24" class="patroladd-title bgcfbe tl mb20 pl15">平台提醒信息设置</el-col>
          <el-col :span="22" class="tl" :offset="1">
          <el-form-item class="w" label-width="14%" label="提醒方式：" >
              <el-button v-for="(v,k) in list_btn" :key="k" :class="activeClass ==k?'active':''" class=""  size="small" @click="IsActive(k,v.id)">{{v.name}}</el-button>  
          </el-form-item>
         </el-col>
          <el-col :span="22" :offset="1" class="tl">
        <el-form-item class="w " label-width="14%"   label="接收人：" size="small" >
          <el-checkbox-group v-model="mess_receive_person" @change="aa(mess_receive_person)">
           <el-checkbox-button class="mr10" v-for="options in options" :label="options.id" :key="options.id">{{options.title}}</el-checkbox-button>
          </el-checkbox-group>
        </el-form-item>
        </el-col>
          <el-col :span="22" :offset="1" class="tl">
        <el-form-item class="w " label-width="14%"   label="食品监管分类：" size="small" >
           <el-checkbox-button class="mr10" v-for="(item,index) in list1"  :key="index" :checked="item.checked" v-model="item.checked" @change="handleCheckAllChange(item.checked,item.companytype_code,item.companytype_name)">{{item.companytype_name}}</el-checkbox-button>
        </el-form-item>
        </el-col>
          <el-col :span="22" :offset="1" class="tl">
        <el-form-item class="w " label-width="14%"   label="主体类型：" size="small" >
           <div v-for="(item1,index) in list2"  :key="'info2-'+index" class="disib">
          <el-checkbox-group  v-model="item1.checkedCities" @change="handleCheckedCitiesChange(item1.checkedCities,item1.id)">
          <el-checkbox-button class="mr10"  v-for="city in item1.aaa" :value="city.companytag_code" :label="city.companytag_code" :key="city.companytag_code">{{city.companytag_name}}</el-checkbox-button>
        </el-checkbox-group>
        </div>
        </el-form-item>
        </el-col>
         <div v-if="activeClass==0||activeClass==1">
            <el-col :span="9" :offset="1" class="tl">
        <el-form-item  label="短信模板id：" class="w" label-width="34%" size="small" prop="mess_sms_code" :rules="[{required: true,message: '请输入短信模板id', trigger: 'blur' }]">
           <el-input placeholder="短信模板id" v-model="formInline.mess_sms_code" class="input-with-select">
            </el-input>
        </el-form-item>
        </el-col>
         <el-col :span="22" :offset="1" class="tl">
        <el-form-item  label="短信模板内容：" class="w" label-width="14%" size="small" prop="mess_sms_content" :rules="[{required: true,message: '请输入短信模板内容', trigger: 'blur' }]">
           <el-input type="textarea" :rows="5" placeholder="短信模板内容" v-model="formInline.mess_sms_content" class="input-with-select">
            </el-input>
        </el-form-item>
        </el-col>
        </div>
         <div v-if="activeClass==0||activeClass==2">
            <el-col :span="9" :offset="1" class="tl">
        <el-form-item  label="微信模板id：" class="w" label-width="34%" size="small" prop="mess_wx_code" :rules="[{required: true,message: '请输入微信模板内容', trigger: 'blur' }]">
           <el-input placeholder="微信模板id" v-model="formInline.mess_wx_code" class="input-with-select">
            </el-input>
        </el-form-item>
        </el-col>
         <el-col :span="22" :offset="1" class="tl">
        <el-form-item  label="微信模板内容：" class="w" label-width="14%" size="small" prop="mess_wx_content" :rules="[{required: true,message: '请输入微信模板内容', trigger: 'blur' }]">
           <el-input type="textarea" :rows="5" placeholder="微信模板内容" v-model="formInline.mess_wx_content" class="input-with-select">
            </el-input>
        </el-form-item>
        </el-col>
        </div>
         <el-col :span="22" class="tl" :offset="1">
          <el-form-item class="w" label-width="14%" label="是否自动提醒：" >
              <el-button v-for="(v,k) in list_btn1" :key="k" :class="activeClass1 ==k?'active':''" class=""  size="small" @click="IsActive1(k,v.id)">{{v.name}}</el-button>  
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
import { local,objKeySort,remove } from '../../../util/util'
  export default {
    data() {
      return {
        id:'',
        list1:[],
        list2:[],
        list3:[],
        checkedCities: [],
        cities: [],
         activeClass:0,
         activeClass1:0,
         list_btn1:[{name:'是',id:'1'},{name:'否',id:'2'}],
        list_btn:[{name:'全部',id:'1'},{name:'短信',id:'2'},{name:'微信',id:'3'}],
       options:[{title: '省级',id:'1'},{title: '市级',id:'2'},{title: '区/县级',id:'3'},{title: '乡/镇级',id:'4'},{title: '村级',id:'5'}],
       mess_receive_person:[],
       companytype_codes:[],
       companytag_codes:[],
         formInline: {
          mess_code:'',
            mess_event:"8",
            mess_type:'1',
            mess_receive_person:'',
            mess_receive_person_name:'',
            companytype_codes:'',
             companytype_names:'',
            companytag_names:'',
            companytag_codes:'',
            mess_sms_code:'',
            mess_sms_content:'',
            mess_wx_code:'',
            mess_wx_content:'',
            mess_warn_state:'1'
      },
      };
    },
      created() {
         this.formInline.mess_code=this.$route.query.id;
    this.getdate1() 
        },
    methods: {
      getdate1(){
         axios.get('/api/companytype/all','').then((v) => {
          this.list1=v; 
         this.getCompanytag()   
          })
      },
      getCompanytag(){
        this.list2=[]
        let t = 0;
        this.list1.forEach(item=>{
            axios.get('/api/companytag/all',{companytype_code:item.companytype_code}).then((res) => {
          let aa={id:item.companytype_code,aaa:res,checkedCities:[]} 
            this.list2.push(aa)
         }) 
         t=t+1;
        })
         if(this.formInline.mess_code){
           if(t>=3){this.getdate2()} 
         }
        // 
    },
    getdate2(){
      axios.get('/api/mess/notice/single',{mess_code:this.formInline.mess_code}).then((v) => {
          this.formInline=v.notice;
          this.activeClass=this.formInline.mess_type-1;
          this.mess_receive_person=v.notice.mess_receive_person.indexOf(",") != -1?v.notice.mess_receive_person.split(','):v.notice.mess_receive_person.split(' ')
           this.cities=v.notice.companytype_codes.indexOf(",") != -1?v.notice.companytype_codes.split(','):v.notice.companytype_codes.split(' ')
            this.checkedCities=v.notice.companytag_codes.indexOf(",") != -1?v.notice.companytag_codes.split(','):v.notice.companytag_codes.split(' ')
           this.cities.forEach(item=>{
             this.list1.forEach(item1=>{
               if(item==item1.companytype_code){  item1.checked=!item1.checked }
             })
           })  
               this.list2.forEach(item4=>{
                 item4.aaa.forEach(val=>{
                   this.checkedCities.forEach(item3=>{
                   if(val.companytag_code==item3){
                     item4.checkedCities.push(item3)
                   }
                 })
               })
             })
      });
    },
    IsActive(k,val) {
        this.activeClass = k;
        this.formInline.mess_type=val;
      },
      IsActive1(k,val) {
        this.activeClass1 = k;
        this.formInline.mess_warn_state=val;
      },
      aa(val){
        var mess_receive_person_name=[];
        this.formInline.mess_receive_person=val.join(',');
        val.forEach(item=>{
            if(item==1){mess_receive_person_name.push('省级')}else if(item==2){mess_receive_person_name.push('市级')}else if(item==3){mess_receive_person_name.push('区/县级')}else if(item==4){mess_receive_person_name.push('乡/镇级')}else if(item==5){mess_receive_person_name.push('村级')}
        })
        
          this.formInline.mess_receive_person_name=mess_receive_person_name.join(',');
      },
      handleCheckAllChange(val,val1) {
        this.list2.forEach(item=>{
         if(val){
          item.aaa.forEach(item1=>{
           if(item.id==val1){
            item.checkedCities.push(item1.companytag_code)
            this.cities.push(item.id)
            this.checkedCities.push(item1.companytag_code)
           }
          })
         }else{
          item.aaa.forEach(item1=>{
            if(item.id==val1){
              item.checkedCities=[]
               this.cities.remove(item.id)
                this.checkedCities.remove(item1.companytag_code)
            }
          })
         }
        })
          this.cities= [...new Set(this.cities)];
          this.checkedCities= [...new Set(this.checkedCities)];
      },
      handleCheckedCitiesChange(value,val2) {
        this.checkedCities=[]
         let checkedCount = value.length;
        this.list2.forEach(item=>{
          item.aaa.forEach(item1=>{
            if(item1.companytype_code==val2){
              item.checkedCities=value
              }
            
          })
            this.checkedCities=this.checkedCities.concat(item.checkedCities)
        }) 
        this.list1.forEach(item2=>{
          if(item2.companytype_code==val2){
            if(checkedCount==0){
             item2.checked=!item2.checked
              this.cities.remove(item2.companytype_code)
            }else{
             item2.checked=true
              this.cities.push(item2.companytype_code)
            }
              }
        })
       this.cities= [...new Set(this.cities)];
          this.checkedCities= [...new Set(this.checkedCities)];
      },
          submitForm(formInline){
            var companytype_code_name=[];
            var companytag_code_name=[];
            this.cities.forEach(item=>{
              this.list1.forEach(item1=>{
               if(item==item1.companytype_code){
                 companytype_code_name.push(item1.companytype_name)
               }
             })
            })
            this.checkedCities.forEach(item=>{
              this.list2.forEach(item1=>{
                 item1.aaa.forEach(item2=>{
               if(item==item2.companytag_code){
                 companytag_code_name.push(item2.companytag_name)
               }
                 })
             })
            })
             this.formInline.companytype_names=companytype_code_name.join(',');
              this.formInline.companytag_names=companytag_code_name.join(',');
            this.formInline.companytype_codes=this.cities.join(',');
            this.formInline.companytag_codes=this.checkedCities.join(',');
         let paramas=this.formInline
         this.$refs[formInline].validate((valid) => {
        if (valid) {
          if(this.formInline.mess_code){
             axios.put('/api/mess/notice/update', paramas).then((v) => {
            this.$router.back()
      })
          }else{
             axios.post('/api/mess/notice/save', paramas).then((v) => {
            this.$router.back()
      })
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
    .el-checkbox-button{margin-bottom: 10px}
      .active {
       background: #2EC68A;
    border-color: #2EC68A;
    color: #FFFFFF;
  }
}

</style>