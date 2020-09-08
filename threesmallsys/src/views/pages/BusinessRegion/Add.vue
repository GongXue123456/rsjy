<template>
  <el-container class="camadd">
    <el-header class="box add bb">
      <h5 v-if="form.company_area_code" class="mb10">
        <span  class="lines"></span>编辑小作坊区域
      </h5>
      <h5 v-else class="mb10">
        <span  class="lines"></span>新增小作坊区域
      </h5>
      <div>
        <el-button class size="small" type="primary" @click="handleSave('formInline')">提交</el-button>
        <el-button class="back_btn" size="small" plain @click="$router.back()">返回</el-button>
      </div>
    </el-header>
    <el-main class="pt0">
      <el-form
        ref="formInline"
        :label-position="labelPosition"
        label-width="120px"
        :model="form"
        class="form-container"
      >
        <el-form-item label="小作坊区域名称：" prop="company_area_name"  :rules="[{required: true,message: '请输入小作坊区域名称', trigger: ['blur','change']}]">
          <el-input v-model="form.company_area_name" size="small" placeholder="请填入小作坊名称"></el-input>
        </el-form-item>
        <el-form-item label="绑定小作坊：" prop="company_name" :rules="[{required: true,message: '请绑定小作坊', trigger: ['blur','change']}]">
          <el-input v-model="form.company_name" size="small" disabled>
            <el-button slot="append" v-if="form.company_area_code" disabled icon="el-icon-search" @click="handleChooseCompany">请选择小作坊</el-button>
             <el-button v-else slot="append"   icon="el-icon-search" @click="handleChooseCompany">请选择小作坊</el-button>
          </el-input>
        </el-form-item>
      </el-form>

      <el-dialog title="小作坊列表" :visible.sync="dialogTableVisible" @close="onClose">
        <el-row class="box search mt20" :gutter="10">
          <el-form :inline="true" :model="companyPage" class="demo-form-inline">
            <el-col :span="6">
              <el-form-item size="small">
                <el-input clearable @clear='onSearch'
                  placeholder="小作坊名称、经营者"
                  v-model="companyPage.company_name"
                  class="input-with-select"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item size="small">
                <el-select v-model="companyPage.companytag_code" clearable @change="onSearch(companyPage.companytag_code)" placeholder="请选择主体类型">
                  <el-option
                    v-for="(item,index) in companyTagOptions"
                    :key="index"
                    :label="item.companytag_name"
                    :value="item.companytag_code"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="2" class="tl">
              <el-form-item size="small">
                <el-button
                  type="primary"
                  @click="onSearch"
                  class="general_bgc general_border cfff"
                >查询</el-button>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
        <el-table :data="companyData" border fit v-loading="companyListLoading">
          <el-table-column label="选择" width="60" header-align="center" align="center">
            <template slot-scope="scope">
              <el-radio class="radio" v-model="selected" :label="scope.$index"></el-radio>
            </template>
          </el-table-column>
          <el-table-column align="center" width="60" type="index" label="序号"></el-table-column>
          <el-table-column property="company_name" label="小作坊名称" align="center" min-width="150px"></el-table-column>
          <el-table-column prop="companytag_code"  min-width="150" :show-overflow-tooltip="true"  label="主体类型" align='center' :formatter="userTypeList3" ></el-table-column>
          <el-table-column label="地址" align="center" min-width="150" :show-overflow-tooltip="true">
            <template slot-scope="scope">{{scope.row.province}}{{scope.row.city}}{{scope.row.area}}{{scope.row.vill}}{{scope.row.town}}</template>
          </el-table-column>
        </el-table>
        <div class="i-page mt20">
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes="[10,20,30,50]"
            :page-size="parseInt(companyPage.pager_openset)"
            layout="total, sizes, prev, pager, next"
            :total="companyDataTotal"
          ></el-pagination>
        </div>
        <div slot="footer" class="dialog-footer" style="text-align:center;margin-top:15px">
          <el-button @click="dialogTableVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleConfirm()">确 定</el-button>
        </div>
      </el-dialog>
    </el-main>
  </el-container>
</template>
<script>
import axios from "../../../util/api";
import { tengxuncloud } from "../../../util/tengxun";
export default {
  data() {
    return {
      labelPosition: "right",
      form: {
        company_area_code:'',
        company_code: "",
        company_name: "",
        company_area_name: ""
      },
      companyPage: {
         pager_offset: '0',
        pager_openset:'10',
        company_name:'',
        company_code:'',
       companytype_code:'',
       companytag_code:'',
       filing_state:'3'
      },
      dialogTableVisible: false,
      companyData: [],
      companyTagOptions: [],
      selected: "",
      companyDataTotal: null,
      companyListLoading: false
    };
  },
  created () {
        this.form.company_area_code=this.$route.query.id;
        if(this.form.company_area_code){ this.init()}
       
  },
  methods: {
    init(){
        axios.get('/api/companyArea/single', {company_area_code:this.form.company_area_code}).then((v) => {
          this.form.company_area_code=v.company_area.company_area_code;
          this.form.company_code=v.company_area.company_code;
          this.form.company_name=v.company_area.company_name;
           this.form.company_area_name=v.company_area.company_area_name;
           })
    },
    resetForm() {
      this.form = {
       company_code: "",
        company_name: "",
        company_area_name: ""
      };
    },
     userTypeList3(row){
       if(row.companytag_code=='1001574645421581111111103'){return '食品经营许可（餐饮）';}else if(row.companytag_code=='1001574645421581111111104'){return '四川省小经营店备案证（餐饮）';}else if(row.companytag_code=='1001574645421581111111101'){return '四川省小作坊备案证';}else if(row.companytag_code=='1001574645421581111111102'){return '四川省小经营店备案证（流通）';}else if(row.companytag_code=='1001574645421581111111105'){return '食品经营许可证（流通）';}
    },
    handleChooseCompany() {
      this.dialogTableVisible = true;
      this.initCompany(this.companyPage);
    },
    initCompany(params) {
      this.companyListLoading = true;
       axios.get('/api/companytag/all', '').then((v) => {this.companyTagOptions=v })
      axios.get("/api/company/search", params).then(response => {
        this.companyData = response.companyList;
        this.companyDataTotal = response.pager_count;
        this.companyListLoading = false;
      });
    },
    handleCurrentChange(val) {
      this.companyPage.pager_offset = (val - 1) * this.companyPage.pager_openset + "";
      this.initCompany(this.companyPage);
    },
    handleSizeChange(val) {
      this.companyPage.pager_openset = val + "";
      this.initCompany(this.companyPage);
    },
    onSearch() {
      this.companyPage.pager_offset = "0";
      this.initCompany(this.companyPage);
    },
    onClose() {
      this.$refs["formInline"].validateField("company_name");
    },
    handleConfirm() {
      let item = this.companyData[this.selected];
      this.form.company_code = item.company_code;
      this.form.company_name = item.company_name;
      this.dialogTableVisible = false;
    },
    handleSave(formInline){
          let paramas=this.form;
           let paramas1={
            company_area_code:paramas.company_area_code,
            company_area_name:paramas.company_area_name,
            company_code:paramas.company_code,
          }
         this.$refs[formInline].validate((valid) => {
        if (valid) {
            axios.get("/api/companyArea/exist", paramas1).then(v => {
              if(this.form.company_area_code){
 axios.put('/api/companyArea/update', paramas).then((v) => {
           this.$router.back()
          }) 
              }else{
                axios.post('/api/companyArea/save', paramas).then((v) => { 
              this.$router.back();
            }) 
              }
               
                 });
                  
        }
         })
      },
  }
};
</script>
<style lang="scss" scoped>
.camadd {
  overflow-x: hidden;
  .add {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .el-image {
    width: 160px;
    height: 160px;
    margin-right: 10px;
  }
  .back_btn {
    background: rgba(247, 248, 249, 1);
    border: 1px solid rgba(217, 222, 225, 1);
  }
  .patroladd-title {
    height: 34px;
    line-height: 34px;
    border-left: 2px solid #788287;
  }
  .form-container {
    margin-top: 20px;
    padding-right: 35px;
    /deep/ .el-form-item__content {
      width: 50%;
    }
  }
  /deep/ .el-radio__label {
    display: none !important;
  }
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
  .el-button.is-disabled, .el-button.is-disabled:hover, .el-button.is-disabled:focus{
    border-color: transparent;
    background-color: transparent;
    color: inherit;

  }
  /* .el-form-item--small .el-form-item__content{width: 80%} */
}
</style>
