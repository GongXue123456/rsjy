<template>
  <div>
    <Nav  title="更改"/>
    <p>经营信息</p>
        <van-field v-if="form.companytag_code==='1001574645421581111111101'" readonly clickable label="生产形式" type="textarea" rows="1" autosize v-model="options1_1[1]" placeholder="请选择生产形式" :rules="[{ required: true, message: '请选择生产形式' }]" input-align="right" right-icon="arrow" @click="showCheckbox(3)" />
          <van-field v-if="form.companytag_code==='1001574645421581111111102'||form.companytag_code==='1001574645421581111111104'" readonly clickable label="主营项目" type="textarea" rows="1"  :rules="[{ required: true, message: '请选择主营项目' }]" autosize v-model="options1_1[1]" placeholder="请选择主营项目" input-align="right" right-icon="arrow" @click="showCheckbox(3)"/>
          <van-field v-if="form.companytag_code==='1001574645421581111111101'" readonly clickable label="生产类别" type="textarea" rows="1" autosize v-model="options2_1[1]" placeholder="请选择生产类别" :rules="[{ required: true, message: '请选择生产类别' }]" input-align="right" right-icon="arrow" @click="showCheckbox(4)"/>
          <van-field v-if="form.companytag_code==='1001574645421581111111102'||form.companytag_code==='1001574645421581111111104'" readonly clickable label="兼营项目" type="textarea" rows="1" autosize :rules="[{ required: true, message: '请选择兼营项目' }]" v-model="options2_1[1]" placeholder="请选择兼营项目" input-align="right" right-icon="arrow" @click="showCheckbox(4)"/>
          <van-field v-if="form.companytag_code==='1001574645421581111111105'||form.companytag_code==='1001574645421581111111103'" readonly clickable label="经营范围" type="textarea" rows="1" autosize :rules="[{ required: true, message: '请选择经营范围' }]" v-model="options1_1[1]" placeholder="请选择经营范围" input-align="right" right-icon="arrow" @click="showCheckbox(3)"/>
       <checkboxModel v-if="show6Model" @closeTip="show1(6)"  @closeTip1='show2(6,arguments)' :val='1' :content='options1' :checked="options1_1[1]?options1_1[1]:''"/>
       <checkboxModel v-if="show7Model" @closeTip="show1(7)"  @closeTip1='show2(7,arguments)'  :val='1' :content='options2' :checked="options2_1[1]?options2_1[1]:''"/>
        <van-row>
          <van-col  span="21"><van-button   block type="primary" @click="submit" class="submit"> 提交 </van-button></van-col>
        </van-row>
  </div>
</template>
<script>
import Nav from "../../components/Nav";
import checkboxModel from "../../components/checkboxModel";
import { aaa } from '../../utils/index';
import axios from "../../axios/index.js";
import { local } from '../../utils/index'

export default {
  components:{
    Nav,
    checkboxModel
  },
  data(){
    return{
      options1_1:'',
      options1:[],
      options2_1:'',
      options2:[],
      show7Model: false,
      show6Model: false,
      user_code:'',
      form:{
        companytag_code:'',
        company_code:'',
      }
    }
  },
  created(){
     this.form.companytag_code=this.$route.query.companytag_code
     this.form.company_code=this.$route.query.company_code
     this.user_code=local.get('user').user_code
     this.init();
     this.getDate()
  },
  methods:{
     showCheckbox(val){
    if(val==3){this.show6Model=!this.show6Model}else if(val==4){this.show7Model=!this.show7Model}
    },
    submit(){
      axios.post('app/company/update',this.form).then(()=>{
         this.$router.back()
      })
    },
     show1(val){
  if(val==6){this.show6Model=false;}else if(val==7){this.show7Model=false;}  
    },
     getDate(){
      if(this.form.company_code){
        axios.get('app/company/drafts', {company_code:this.form.company_code}).then(v => {
        this.form=v.data;
         this.form.companyEmployList=v.data.companyEmployReturnList;
        this.form.accessoryList=v.data.accessoryReturnList;
             if(this.form.companytag_code==='1001574645421581111111101'){
              this.options1_1=['',v.data.produce_form]
            this.options2_1=['',v.data.producetype_codes]
           }else if(this.form.companytag_code==='1001574645421581111111102'||this.form.companytag_code==='1001574645421581111111104'){ 
             this.options1_1=['',v.data.main_subject]
            this.options2_1=['',v.data.sub_subject]
            }else if(this.form.companytag_code==='1001574645421581111111105'||this.form.companytag_code==='1001574645421581111111103'){
              this.options1_1=['',v.data.business_range]
            }
      })
      }
    },
     init() {
      axios.get('app/dictionary/list', {companytag_code:this.form.companytag_code}).then(v => {
           if(this.form.companytag_code==='1001574645421581111111101'){
              this.options1=v.data.经营信息.生产形式;
              this.options2=v.data.经营信息.生产类别;
           }else if(this.form.companytag_code==='1001574645421581111111102'||this.form.companytag_code==='1001574645421581111111104'){ 
             this.options1=v.data.经营信息.主营项目;
            this.options2=v.data.经营信息.兼营项目;}
            else if(this.form.companytag_code==='1001574645421581111111105'||this.form.companytag_code==='1001574645421581111111103'){
              this.options1=v.data.经营信息.经营范围;
            }
      })
    },
    show2(index,val){
       if (val[1].substr(0,1)==','){val[1]=val[1].substr(1);}
     if(index==6){
         this.options1_1=val;
         if(this.form.companytag_code==='1001574645421581111111101'){
             this.form.produce_form_list=aaa(val[1].indexOf(",") != -1?val[1].split(','):val[1].split(' '))
           }else if(this.form.companytag_code==='1001574645421581111111102'||this.form.companytag_code==='1001574645421581111111104'){ 
              this.form.main_subject_list=aaa(val[1].indexOf(",") != -1?val[1].split(','):val[1].split(' '))
           }else if(this.form.companytag_code==='1001574645421581111111105'||this.form.companytag_code==='1001574645421581111111103'){
             this.form.business_range_list=aaa(val[1].indexOf(",") != -1?val[1].split(','):val[1].split(' '))
          }
       }else if(index==7){
         this.options2_1=val;
         if(this.form.companytag_code==='1001574645421581111111101'){
             this.form.producetype_codes_list=aaa(val[1].indexOf(",") != -1?val[1].split(','):val[1].split(' '))
           }else if(this.form.companytag_code==='1001574645421581111111102'||this.form.companytag_code==='1001574645421581111111104'){ 
             this.form.sub_subject_list=aaa(val[1].indexOf(",") != -1?val[1].split(','):val[1].split(' '))
           }
       }
       
    },
  }
}
</script>
<style scoped lang="less">
p{
  margin-top: 65px;
  font-size: 16px;
  margin-left: 15px;
  color:#999999;
}
.van-cell{
  width: 90% !important;
  margin-left: 15px;
  margin-top: 10px !important;
  border-radius: 8px;
}
.submit{
  margin-left: 15px;
  margin-top: 10px;
  padding-left: 10px;
  font-size: 18px;
}
.van-button--block{
  width:103% !important;
}
/deep/ .van-field {
  .van-field__label{width: 3.5rem;}
  .van-field__value{
    textarea{overflow: hidden;}
  }
  border-radius: 8px;
}
</style>