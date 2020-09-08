<template>
  <el-container class="patroladd">
     
    <el-header class="box add bb">
         <h5  class="mb10"><span class="lines"></span>监管打分</h5>
        <div>
             <el-button  class=""  size="small" type="primary" @click="submitForm('formInline')">提交</el-button>
            <el-button  class="back_btn" size="small" plain @click="$router.back()">返回</el-button></div>
    </el-header>
    <el-main>
    <el-form :inline="true"  status-icon ref="formInline"  :model="formInline"  class="demo-ruleForm">
     <el-row class="box mt20  f14">
         <el-col :span="24" class="patroladd-title bgcfbe tl mb20 pl15">基础信息</el-col>
        <el-col :span="12" class="tl" :offset="1">
        <el-form-item label="选择企业：" class="w" label-width="25%" prop="company_name" >
          <el-input v-model="formInline.company_name" size="small" disabled>
            <el-button slot="append" icon="el-icon-search" @click="handleChooseCompany">请选择企业</el-button>
          </el-input>
        </el-form-item>
        </el-col> 
         <el-col :span="22" class="mr10 tl" :offset="1">
           <el-form-item size="small" class="rate" label-width="14%" label="评分：" >
          <el-rate v-model="value"  allow-half show-score text-color="#ff9900" score-template="{value}" @change="change2(value)"></el-rate>
        </el-form-item>
        </el-col>   
        <el-col :span="12" class="mr10 tl" :offset="1">
           <el-form-item size="small" class="rate" label-width="25%" label="备注：" >
      <el-input class="w" type="textarea" :rows="3" placeholder="请输入备注"  v-model="formInline.remark"> </el-input>
    </el-form-item>
        </el-col>
     </el-row>
        </el-form>
        <el-dialog title="企业列表" :visible.sync="dialogTableVisible" @close="onClose">
        <el-row class="box search mt20" :gutter="10">
           <el-form :inline="true" :model="page" class="demo-form-inline">
        <el-col :span="4" class="mr10">
             <el-form-item size="small" >
         <el-input placeholder="企业名称" clearable v-model="page.company_name" class="input-with-select">
            </el-input>
        </el-form-item>
        </el-col>
         <el-col :span="4" class="mr10">
         <el-form-item size="small">
          <el-select v-model="page.companytag_code" clearable placeholder="主体类型" @change="change1(page.companytag_code)">
              <el-option v-for="v in list_btn" :key="v.id" :label="v.title" :value="v.id"></el-option>
          </el-select>
        </el-form-item>
        </el-col>
         <el-col :span="2" class="tl mr10">
           <el-form-item  size="small">
          <el-button  type="primary"  @click="onSubmit" class="general_bgc general_border cfff">查询</el-button>
        </el-form-item>
        </el-col>
       
      </el-form>
        </el-row>
        <el-table border :data="companyData" style="width: 100%">
           <el-table-column label="选择" width="60" header-align="center" align="center">
            <template slot-scope="scope">
              <el-radio class="radio" v-model="selected" :label="scope.$index"></el-radio>
            </template>
          </el-table-column>
        <el-table-column type="index" align='center' width="60"  label="序号"></el-table-column>
         <el-table-column prop="company_name" min-width="120" :show-overflow-tooltip="true"  label="企业名称" align='center'></el-table-column>
         <el-table-column prop="companytag_code"  min-width="150" :show-overflow-tooltip="true"  label="主体类型" align='center' :formatter="userTypeList3" ></el-table-column>

      </el-table>
      <div class="i-page fr disib mt20">
        <el-pagination
          background
          :page-size='10'
          layout="total,prev, pager, next"
          :total="total"
          :current-page="currentPage"
           @current-change = 'currentChange'>
        </el-pagination>
      </div>
        <div slot="footer" class="dialog-footer" style="text-align:center;margin-top:50px">
          <el-button @click="dialogTableVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleConfirm()">确 定</el-button>
        </div>
      </el-dialog>
        </el-main>
  </el-container>
</template>
<script>
let obj;
import Vue from 'vue'
import axios from '../../../util/api'
import md5 from 'js-md5';
import { local,objKeySort,remove } from '../../../util/util'
export default {
  data () {
    return {
      value:0,
        formInline: {
          integrity_lvl:'0',
         company_code:'',
         company_name:'',
         remark:'',
      },
      page: {
        pager_offset: '0',
        pager_openset:'10',
        company_name:'',
        company_code:'',
       companytype_code:'',
       companytag_code:'',
       filing_state:'3'
      },
      user:'',
       dialogTableVisible: false,
       companyData: [],
        currentPage: 1,
      total: 0,
      selected: "",
      options: [{title: '全部',code: '1'}, {title: '自己管理',code: '2'}],
      companyListLoading: false,
      list_btn:[{id:'1001574645421581111111101',title: '四川省小作坊备案证'},{id:'1001574645421581111111102',title: '四川省小经营店备案证（流通）'},{id:'1001574645421581111111103',title: '食品经营许可（餐饮）'},{id:'1001574645421581111111104',title: '四川省小经营店备案证（餐饮）'},{title: '食品经营许可证（流通）',id:'1001574645421581111111105'}],
    }
  },

     created () {
         this.user = local.get('user');
  },
  methods: {
    
     handleChooseCompany() {
      this.dialogTableVisible = true;
      this.initCompany(this.page);
    },
     initCompany(params) {
      this.companyListLoading = true;
      axios.get("/api/company/search", params).then(response => {
        this.companyData = response.companyList;
        this.total = response.pager_count;
        this.companyListLoading = false;
      });
    },
      userTypeList3(row){
       if(row.companytag_code=='1001574645421581111111103'){return '食品经营许可（餐饮）';}else if(row.companytag_code=='1001574645421581111111104'){return '四川省小经营店备案证（餐饮）';}else if(row.companytag_code=='1001574645421581111111101'){return '四川省小作坊备案证';}else if(row.companytag_code=='1001574645421581111111102'){return '四川省小经营店备案证（流通）';}else if(row.companytag_code=='1001574645421581111111105'){return '食品经营许可证（流通）';}
    },
    change1(val){this.page.companytag_code=val;this.onSubmit();},
    change2(val){var aa=String(val);this.formInline.integrity_lvl=aa;},
     // 搜索
     onSubmit () { 
      this.currentPage = 1
      this.page.pager_offset = '0'
      this.initCompany(this.page);
    },
    // 分页
    currentChange(page){
      this.currentPage = page;
      this.page.pager_offset = String((page - 1) * 10)
      this.initCompany(this.page);
    },
        onClose() {
      this.$refs["formInline"].validateField("page_config_name");
    },
    handleConfirm() {
      let item = this.companyData[this.selected];
      this.formInline.company_code = item.company_code;
      this.formInline.company_name = item.company_name;
      this.dialogTableVisible = false;
    },

     submitForm(formInline){
          let paramas=this.formInline;
         this.$refs[formInline].validate((valid) => {
        if (valid) {
           if(this.formInline.company_code==''){
              this.$notify.error({
                title: '请选择企业',
                message: '',
                duration: 2000
              })
      }else if(this.formInline.integrity_lvl==0){
        this.$notify.error({
                title: '请评定分数',
                message: '',
                duration: 2000
              })
 
      }else if(this.formInline.remark==''){
        this.$notify.error({
                title: '请填写备注',
                message: '',
                duration: 2000
              })
      }else{
          axios.post('/api/companyIntegrityLog/save', paramas).then((v) => { 
              this.value=0;
              this.formInline={
          integrity_lvl:'0',
         company_code:'',
         company_name:'',
         remark:'',
      }
            })  
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
  .back_btn{background:rgba(247,248,249,1);border:1px solid rgba(217,222,225,1);}
  .patroladd-title{height: 34px;line-height: 34px;border-left: 2px solid #788287}
  /deep/ .el-form--inline .el-col-12 .el-form-item__content{width: 75%}
  /deep/ .el-radio__label {
    display: none !important;
  }
    /deep/ .rate .el-rate__icon{font-size: 25px;}
  /deep/ .el-dialog__body {
    padding-top: 5px;
    padding-bottom: 10px;
  }
  /deep/ .el-input.is-disabled .el-input__inner {
    background-color: #ffffff;
    border-color: #e4e7ed;
    color: #606266;
    cursor: not-allowed;
  }
  /deep/ .el-dialog {
    width: 60% !important;
  }
}

</style>
