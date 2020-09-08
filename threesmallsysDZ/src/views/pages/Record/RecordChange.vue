<template>
  <el-container class="patroldetail container">
    <el-header class="box add bb">
        <h5 class="mb10"><span class="lines"></span>备案变更</h5>
        <div><el-button  class="back_btn" size="small" plain @click="$router.back()">返回</el-button></div>
    </el-header>
    <el-main class="p15 pt0">
    <div class="box mt20 mb20 f16">
        <div class="tl c333" >{{list.company_name}}</div>
     </div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane v-if="id==1" label="变更操作" name="first">
        <el-form :inline="true" status-icon ref="formInline"  :model="formInline"  class="demo-ruleForm">
       <el-row class="box mt20  f14">
         <el-col :span="24" class="patroldetail-title bgcfbe tl mb20 pl15">经营信息</el-col>
         <el-col :span="22" :offset="1" class="tl">
         <el-form-item  class="w" label-width="14%" v-if="list.companytag_code=='1001574645421581111111102'||list.companytag_code=='1001574645421581111111104'"  label="主营项目：" size="small" prop="main_subject_list" :rules="[{required: true,message: '请选择主营项目', trigger: 'blur' }]">
          <el-checkbox-group v-model="formInline.main_subject_list" >
           <el-checkbox-button class="mr10" v-for="options in options8" :label="options.dictionary_field" :key="options.dictionary_field">{{options.dictionary_field}}</el-checkbox-button>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item class="w" label-width="14%" v-if="list.companytag_code=='1001574645421581111111101'"  label="生产形式：" size="small" prop="produce_form_list" :rules="[{required: true,message: '请选择生产形式', trigger: 'blur' }]">
          <el-checkbox-group v-model="formInline.produce_form_list">
           <el-checkbox-button class="mr10" v-for="options in options81" :label="options.dictionary_field" :key="options.dictionary_field">{{options.dictionary_field}}</el-checkbox-button>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item class="w" label-width="14%"  v-if="list.companytag_code=='1001574645421581111111103'||list.companytag_code=='1001574645421581111111105'"  label="经营范围：" size="small" prop="business_range_list" :rules="[{required: true,message: '请选择经营范围', trigger: 'blur' }]">
          <el-checkbox-group v-model="formInline.business_range_list" >
           <el-checkbox-button class="mr10" v-for="options in options811" :label="options.dictionary_field" :key="options.dictionary_field">{{options.dictionary_field}}</el-checkbox-button>
          </el-checkbox-group>
        </el-form-item>
        </el-col>
         <el-col :span="22" :offset="1" class="tl">
         <el-form-item  class="w" label-width="14%" v-if="list.companytag_code=='1001574645421581111111102'||list.companytag_code=='1001574645421581111111104'"  label="兼营项目：" size="small">
          <el-checkbox-group v-model="formInline.sub_subject_list">
            <el-checkbox-button class="mr10" v-for="options in options9" :label="options.dictionary_field" :key="options.dictionary_field">{{options.dictionary_field}}</el-checkbox-button>
          </el-checkbox-group>
        </el-form-item>
         <el-form-item  class="w" label-width="14%" v-if="list.companytag_code=='1001574645421581111111101'"   label="生产类别：" size="small" prop="producetype_codes_list" :rules="[{required: true,message: '请选择生产类别', trigger: 'blur' }]">
          <el-checkbox-group v-model="formInline.producetype_codes_list">
            <el-checkbox-button class="mr10" v-for="options in options91" :label="options.dictionary_field" :key="options.dictionary_field">{{options.dictionary_field}}</el-checkbox-button>
          </el-checkbox-group>
        </el-form-item>
        </el-col>
        
     </el-row>
      <el-row class="box mt20  f14 c666">
         <el-col :span="22" class="patroldetail-title bgcfbe tl mb20 pl15">经营信息(变更前)</el-col>
        <el-col v-if="list.companytag_code=='1001574645421581111111102'||list.companytag_code=='1001574645421581111111104'" :span="22" class="tl mb20" :offset="1">
          <span class="left">主营项目：</span><span class="c333">{{list.main_subject}}</span>
        </el-col>
         <el-col v-if="list.companytag_code=='1001574645421581111111102'||list.companytag_code=='1001574645421581111111104'" :span="22" class="tl mb20" :offset="1">
          <span class="left">兼营项目：</span><span class="c333">{{list.sub_subject}}</span>
        </el-col>
         <el-col v-if="list.companytag_code=='1001574645421581111111101'" :span="22" class="tl mb20" :offset="1">
          <span class="left">生产形式：</span><span class="c333">{{list.produce_form}}</span>
        </el-col>
         <el-col v-if="list.companytag_code=='1001574645421581111111101'" :span="22" class="tl mb20" :offset="1">
          <span class="left">生产类别：</span><span class="c333">{{list.producetype_codes}}</span>
        </el-col>
         <el-col v-if="list.companytag_code=='1001574645421581111111103'||list.companytag_code=='1001574645421581111111105'" :span="22" class="tl mb20" :offset="1">
          <span class="left">经营范围：</span><span class="c333">{{list.business_range}}</span>
        </el-col>
     </el-row>
        <div class="box add">
        <div>
          <el-button  v-if="menu_btns!=null&&menu_btns.indexOf('5-1-4')!== -1" class="" size="small" type="primary" @click="submitForm('formInline')">提交变更</el-button>
        </div>
    </div>
     </el-form> 
    </el-tab-pane>
    <el-tab-pane v-if="id==2" label="变更操作" name="first">
       
    </el-tab-pane>
   <el-tab-pane label="基本信息" name="second">
        <el-row class="box mt20 f14">
           <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">主体类型：</span><span  class="c333">{{companytag_name}}</span>
        </el-col>
         <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">主体业态：</span><span class="c333">{{list.business_form}}</span>
        </el-col>
      </el-row>
        <el-row class="box mt20  f14 c666">
         <el-col :span="24" class="patroldetail-title bgcfbe tl mb20 pl15">基础信息</el-col>
         <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">企业名称：</span><span class="c333">{{list.company_name}}</span>
        </el-col>
         <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">经营者姓名：</span><span class="c333">{{list.operator}}</span>
        </el-col>
        <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">手机号：</span><span class="c333">{{list.mobilephone}}</span>
        </el-col>
        <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">身份证号：</span><span class="c333">{{list.idcard}}</span>
        </el-col>
        <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">备案时间：</span><span class="c333">{{list.add_time}}</span>
        </el-col>
     </el-row>
     <el-row class="box mt20  f14 c666">
         <el-col :span="24" class="patroldetail-title bgcfbe tl mb20 pl15">经营信息</el-col>
        
        <el-col  v-if="list.companytag_code=='1001574645421581111111103'||list.companytag_code=='1001574645421581111111105'" :span="9" class="tl mb20" :offset="1">
          <span class="left">社会信用代码：</span><span class="c333">{{list.credit_code}}</span>
        </el-col>
         <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">经营场所：</span><span class="c333">{{list.places}}</span>
        </el-col>
         <el-col v-if="list.companytag_code=='1001574645421581111111103'||list.companytag_code=='1001574645421581111111105'" :span="9" class="tl mb20" :offset="1">
          <span class="left">食品经营许可证号：</span><span class="c333">{{list.record_code}}</span>
        </el-col>
         <el-col v-else :span="9" class="tl mb20" :offset="1">
          <span class="left">备案证号：</span><span class="c333">{{list.record_code}}</span>
        </el-col>
         <el-col v-if="list.companytag_code=='1001574645421581111111103'||list.companytag_code=='1001574645421581111111105'" :span="22" class="tl mb20" :offset="1">
          <span class="left">经营范围：</span><span class="c333">{{list.business_range}}</span>
        </el-col>
          <el-col v-if="list.companytag_code=='1001574645421581111111101'" :span="24" class="tl mb20" :offset="1">
          <span class="left">生产形式：</span><span class="c333">{{list.produce_form}}</span>
        </el-col>
         <el-col v-if="list.companytag_code=='1001574645421581111111101'" :span="24" class="tl mb20" :offset="1">
          <span class="left">生产类别：</span><span class="c333">{{list.producetype_codes}}</span>
        </el-col>
         <el-col v-if="list.companytag_code=='1001574645421581111111104'||list.companytag_code=='1001574645421581111111102'" :span="22" class="tl mb20" :offset="1">
          <span class="left">主营项目：</span><span class="c333">{{list.main_subject}}</span>
        </el-col>
        <el-col v-if="list.companytag_code=='1001574645421581111111104'||list.companytag_code=='1001574645421581111111102'" :span="22" class="tl mb20" :offset="1">
          <span class="left">兼营项目：</span><span class="c333">{{list.sub_subject}}</span>
        </el-col>
         <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">发证日期：</span><span class="c333">{{list.issue_time}}</span>
        </el-col>
          <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">有效期至：</span><span class="c333">{{list.unuseful_time}}</span>
        </el-col>
         <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">经营场所面积：</span><span class="c333">{{list.place_area}}</span>（㎡）
        </el-col>
          <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">从业人数：</span><span class="c333">{{list.employ_num}}</span>
        </el-col>
     </el-row>
       <el-row class="box mt20  f14 c666">
         <el-col :span="24" class="patroldetail-title bgcfbe tl mb20 pl15">人员信息</el-col>
         <div class="box list">
      <el-table :data="list.companyEmployReturnList" style="width: 100%" class="no-header">
        <el-table-column label="姓名" prop="employ_name" ></el-table-column>
        <el-table-column label="健康证明">
           <template slot-scope="scope">
             <el-image :src="user.qyurl+scope.row.employ_health_url" fit="fill"  :preview-src-list="[user.qyurl+scope.row.employ_health_url]"  style="width: 40px;height: 40px"></el-image>
           <!-- <el-image :src="scope.row.employ_health_url" fit="fill" style="width: 40px;height: 40px"></el-image> -->
             </template>
        </el-table-column>
        <el-table-column label="健康证有效期" prop="user_health_datedue"></el-table-column>
      </el-table>
    </div> 
     </el-row>
     <el-row class="box mt20  f14 c666">
         <el-col :span="24" class="patroldetail-title bgcfbe tl mb20 pl15">责任落实</el-col>
         <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">市场监管局：</span><span class="c333">{{list.department_name}}</span>
        </el-col>
        <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">所属村：</span><span class="c333">{{list.region_name}}</span>
        </el-col>
        <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">监管人员：</span><span class="c333">{{list.user_name_manage}}</span>
        </el-col>
        <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">联系方式：</span><span class="c333">{{list.user_code_manage_moblephone}}</span>
        </el-col>
         <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">网格信息员：</span><span class="c333">{{list.user_name_info}}</span>
        </el-col>
        <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">联系方式：</span><span class="c333">{{list.user_code_info_moblephone}}</span>
        </el-col>
     </el-row>
      <el-row class="box mt20  f14">
      <el-col :span="24" class="patroldetail-title bgcfbe tl mb20 pl15">附件上传</el-col>
      <el-col :span="24" class="tl">
         <div class="block fl" v-for="(fit,index) in list.accessoryReturnList" :key="index">
      <el-image  v-if="fit.url"
      :src="user.qyurl+fit.url"
      :preview-src-list="[user.qyurl+fit.url]"
      :fit="fit.name"></el-image>
       <el-image v-else
      :src="require('../../../assets/image/moren.png')"
      ></el-image>
      <p class="demonstration tc p15">{{ fit.name }}</p>
  </div>
      </el-col>
     </el-row>
    </el-tab-pane>
    
  </el-tabs>
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
      id:'',
      activeName: 'first',
       list: [],
       companytag_name:'',
        formInline: {
          company_code:'',
           main_subject_list:[],
           sub_subject_list:[],
           produce_form_list:[],
           business_range_list:[],
           producetype_codes_list:[]
      },
      options8:'',
      options81:'',
      options811:'',
      options9:'',
      options91:'',
      user:'',
    }
  },
   created () {
       this.user = local.get('user');
     this.page.company_code=this.$route.query.id;
     this.formInline.company_code=this.$route.query.id;
     this.id=this.$route.query.id1;
     this.init(this.page)
   
  },
  methods: {
       init (params) {
      axios.get('/api/company/detail', params).then((v) => {
       this.list=v
       if(v.companytag_code=='1001574645421581111111101'){this.companytag_name='四川省小作坊备案证'}
       else if(v.companytag_code=='1001574645421581111111102'){this.companytag_name='四川省小经营店备案证（流通）'}
       else if(v.companytag_code=='1001574645421581111111103'){this.companytag_name='食品经营许可证（餐饮）'}
       else if(v.companytag_code=='1001574645421581111111104'){this.companytag_name='四川省小经营店备案证（餐饮）'}
       else{this.companytag_name='食品经营许可证（流通）'}
        axios.get('/api/dictionary/search', {companytag_code:v.companytag_code}).then((v) => {
      this.options8=v.经营信息.主营项目;
      this.options9=v.经营信息.兼营项目;
      this.options81=v.经营信息.生产形式;
      this.options91=v.经营信息.生产类别;
      this.options811=v.经营信息.经营范围

      }).catch(() => {})
      }).catch(() => {})
      
    },
     handleClick() {},
      submitForm(formInline){
         let paramas=this.formInline
         this.$refs[formInline].validate((valid) => {
        if (valid) {
          this.$confirm('确定变更?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(() => {
            axios.post('/api/company/change', paramas).then((v) => {
           this.$router.back()
      }).catch(() => {})
        }).catch(() => {});
       
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
