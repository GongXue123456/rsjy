<template>
  <el-container class="camadd">
    <el-header class="box add bb">
      <h5 class="mb10">
        <span class="lines"></span>新增摄像头
      </h5>
      <div>
        <el-button class size="small" type="primary" @click="handleSave()">提交</el-button>
        <el-button class="back_btn" size="small" plain @click="$router.back()">返回</el-button>
      </div>
    </el-header>
    <el-main class="pt0">
      <el-form
        ref="addForm"
        :label-position="labelPosition"
        label-width="120px"
        :model="form"
        class="form-container"
      >
        <el-form-item label="设备类型：" prop="device_type" :rules="[{required: true,message: '请输入设备类型', trigger: 'blur' },{ pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+$/, message: '不允许输入空格等特殊符号' }]">
          <el-select
            v-model="form.device_type"
            @change="handleTypeChange"
            placeholder="请先选择类型"
            size="small"
          >
            <el-option
              v-for="item in typeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设备名称：" prop="device_name" :rules="[{required: true,message: '请输入设备名称', trigger: 'blur' },{ pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+$/, message: '不允许输入空格等特殊符号' }]">
          <el-input
            v-model="form.device_name"
            size="small"
            :placeholder="form.device_type==1?'请填入areaName':''"
            :disabled="!form.device_type"
          ></el-input>
        </el-form-item>
        <el-form-item label="设备编号：" prop="device_number" :rules="[{required: true,message: '请输入设备编号', trigger: 'blur' },{ pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+$/, message: '不允许输入空格等特殊符号' }]">
          <el-input
            v-model="form.device_number"
            size="small"
            :placeholder="form.device_type==1?'请填入areaId':''"
            :disabled="!form.device_type"
          ></el-input>
        </el-form-item>
        <el-form-item label="设备序列号：" v-if="form.device_type==1" prop="device_serial" :rules="[{required: true,message: '请输入设备序列号', trigger: 'blur' },{ pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+$/, message: '不允许输入空格等特殊符号' }]">
          <el-input
            v-model="form.device_serial"
            size="small"
            placeholder="请填入equipmentId"
            :disabled="!form.device_type"
          ></el-input>
        </el-form-item>
        <el-form-item label="阿里云小作坊ID：" v-if="form.device_type==1" prop="device_id" :rules="[{required: true,message: '请输入阿里云小作坊ID', trigger: 'blur' },{ pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+$/, message: '不允许输入空格等特殊符号' }]">
          <el-input
            v-model="form.device_id"
            size="small"
            placeholder="请填入siteId"
            :disabled="!form.device_type"
          ></el-input>
        </el-form-item>
        <el-form-item label="播放地址：" v-if="form.device_type==2" prop="play_video_url" :rules="[{required: true,message: '请输入播放地址', trigger: 'blur' }]">
          <el-input v-model="form.play_video_url" size="small" :disabled="!form.device_type"></el-input>
        </el-form-item>
        <el-form-item label="设备描述：" prop="device_desc" :rules="[{required: true,message: '请输入设备描述', trigger: 'blur' },{ pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+$/, message: '不允许输入空格等特殊符号' }]">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            v-model="form.device_desc"
            size="small"
            :disabled="!form.device_type"
          ></el-input>
        </el-form-item>
        <el-form-item label="绑定小作坊：" prop="company_name" :rules="[{required: true,message: '请绑定小作坊', trigger: ['blur','change']}]">
          <el-input v-model="form.company_name" size="small" disabled>
            <el-button slot="append" icon="el-icon-search" @click="handleChooseCompany(1)">请选择小作坊</el-button>
          </el-input>
        </el-form-item>
        <el-form-item label="绑定区域：" prop="company_area_name" :rules="[{required: true,message: '请绑定区域', trigger: ['blur','change']}]">
          <el-input v-model="form.company_area_name" size="small" disabled>
            <el-button slot="append" icon="el-icon-search" @click="handleChooseCompany(2)">请选择小作坊区域</el-button>
          </el-input>
        </el-form-item>
      </el-form>

      <el-dialog :title="type==1?'小作坊列表':'小作坊区域列表'" :visible.sync="dialogTableVisible" @close="onClose">
        <el-row class="box search mt20" :gutter="10">
          <el-form v-if="type==1" :inline="true" :model="companyPage" class="demo-form-inline">
            <el-col :span="6">
              <el-form-item size="small">
                <el-input placeholder="小作坊名称、经营者" v-model="companyPage.company_name" clearable @clear="onSearch" class="input-with-select" ></el-input>
              </el-form-item>
            </el-col>
            <el-col  :span="6">
              <el-form-item size="small">
                <el-select v-model="companyPage.companytype_code" clearable placeholder="请选择食品监管分类" @change="handleCompanyTypeChange" >
                  <el-option v-for="(item,index) in companyTypeOptions" :key="index" :label="item.companytype_name" :value="item.companytype_code"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col  :span="6">
              <el-form-item size="small">
                <el-select v-model="companyPage.companytag_code" clearable placeholder="请选择主体类型" @change="onSearch(companyPage.companytag_code)">
                  <el-option v-for="(item,index) in companyTagOptions" :key="index" :label="item.companytag_name" :value="item.companytag_code" ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="2" class="tl">
              <el-form-item size="small">
                <el-button type="primary"  @click="onSearch" class="general_bgc general_border cfff" >查询</el-button>
              </el-form-item>
            </el-col>
          </el-form>
          <el-form v-else-if="type==2" :inline="true" :model="areaPage" class="demo-form-inline">
            <!-- <el-col :span="4">
              <el-form-item size="small">
                <el-input placeholder="小作坊名称" v-model="areaPage.company_name" clearable @clear="onSearch" class="input-with-select" ></el-input>
              </el-form-item>
            </el-col> -->
            <el-col v-if="type==2" :span="6">
              <el-form-item size="small">
                <el-input  placeholder="小作坊区域名称" v-model="areaPage.company_area_name" clearable @clear="onSearch" class="input-with-select" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2" class="tl">
              <el-form-item size="small">
                <el-button type="primary"  @click="onSearch" class="general_bgc general_border cfff" >查询</el-button>
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
          <el-table-column  property="company_name" label="小作坊名称" align="center" min-width="150px"></el-table-column>
           
          <el-table-column v-if="type==1"  label="食品监管分类" align="center">
            <template slot-scope="scope">{{scope.row.companytype_name}}</template>
          </el-table-column>
          <el-table-column v-if="type==1"  label="小作坊主体类型" align="center">
            <template slot-scope="scope">{{scope.row.companytag_name}}</template>
          </el-table-column>
          <el-table-column v-if="type==1"  label="地址" align="center" min-width="150" :show-overflow-tooltip="true">
            <template slot-scope="scope">{{scope.row.company_address}}</template>
          </el-table-column>
          <el-table-column v-else-if="type==2"  property="company_area_name" label="小作坊区域名称" align="center" min-width="150px"></el-table-column>
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
      type:"",
      form: {
        device_type: "",
        device_id: "",
        company_code: "",
        company_name: "",
        device_name: "",
        company_area_name:'',
        company_area_code:'',
        device_number: "",
        device_serial: "",
        play_video_url: "",
        device_desc: ""
      },
      companyPage: {
        pager_offset: "0",
        pager_openset: "10",
        company_name: "",
        companytype_code: "",
        companytag_code: "",
        filing_state:'3',
        state:'1',
        province: "",
        city: "",
        area: "",
        town: "",
        vill: ""
      },
      areaPage:{
        pager_offset:'0',
        pager_openset: "10",
        company_area_name: "",
        company_code:"",
        state:"1"
      },
      typeOptions: [
        {
          value: 1,
          label: "视频+抓拍"
        },
        {
          value: 2,
          label: "视频"
        }
      ],
      dialogTableVisible: false,
      companyData: [],
      companyTypeOptions: [],
      companyTagOptions: [],
      selected: "",
      companyDataTotal: null,
      companyListLoading: false
    };
  },
  filters: {},
  mounted() {},
  methods: {
    resetForm() {
      this.form = {
        device_type: "",
        device_id: "",
        company_code: "",
        company_name: "",
        company_area_name:'',
        company_area_code:'',
        device_name: "",
        device_number: "",
        device_serial: "",
        play_video_url: "",
        device_desc: ""
      };
    },
    handleTypeChange() {
      this.form.play_video_url = "";
      this.form.device_id = "";
      this.form.device_serial = "";
    },
    handleChooseCompany(val) {
      this.type=val
      if(val==1){
       this.initCompany(this.companyPage);
      }else{
        if(this.form.company_name==''){
          this.$notify.error({
                title: '请选择小作坊',
                message: '',
                duration: 2000
              })
              return false
        }else{
          this.companyArea(this.areaPage);
        }
         
      }
      this.dialogTableVisible = true;
      this.fetchCompanyType();
    },
    initCompany(params) {
      this.companyListLoading = true;
      axios.get("/api/device/company/list", params).then(response => {
        this.companyData = response.company_list;
        this.companyDataTotal = response.pager_count;
        this.companyListLoading = false;
      });
    },
    companyArea(params){
      this.companyListLoading = true;
      axios.get("/api/companyArea/list", params).then(response => {
        this.companyData = response.company_area_list;
        this.companyDataTotal = response.pager_count;
        this.companyListLoading = false;
      });
    },
    fetchCompanyType() {
      axios.get("/api/companytype/all").then(response => {
        this.companyTypeOptions = response;
      });
    },
    fetchCompanyTag(params) {
      axios.get("/api/companytag/all", params).then(response => {
        this.companyTagOptions = response;
      });
    },
    handleCompanyTypeChange(val) {
      this.companyPage.companytag_code = "";
      this.fetchCompanyTag({ companytype_code: val });
        this.initCompany(this.companyPage);
    },
    handleCurrentChange(val) {
      this.selected='';
      if(this.type==1){
          this.companyPage.pager_offset =(val - 1) * this.companyPage.pager_openset + "";
       this.initCompany(this.companyPage);
      }else{
          this.areaPage.pager_offset =(val - 1) * this.areaPage.pager_openset + "";
         this.companyArea(this.areaPage);
      }
    },
    handleSizeChange(val) {
      if(this.type==1){
        this.companyPage.pager_openset = val + "";
       this.initCompany(this.companyPage);
      }else{
        this.areaPage.pager_openset = val + "";
         this.companyArea(this.areaPage);
      }
    },
    onSearch() {
       if(this.type==1){
           this.companyPage.pager_offset = "0";
       this.initCompany(this.companyPage);
      }else{
          this.areaPage.pager_offset = "0";
         this.companyArea(this.areaPage);
      }
    },
    restCompanyPage() {
      this.companyPage = {
        pager_offset: "0",
        pager_openset: "10",
        company_name: "",
        companytype_code: "",
        companytag_code: "",
        filing_state:'3',
        state:'1',
        province: "",
        city: "",
        area: "",
        town: "",
        vill: ""
      };
    },
    onClear() {
      this.restCompanyPage();
      this.initCompany(this.companyPage);
    },
    onClose() {
      this.$refs["addForm"].validateField("company_name");
      this.selected='';
      this.type=''
    },
    handleConfirm() {
      let item = this.companyData[this.selected];
      if(this.type==1){
        if(item==undefined){
          this.$notify.error({
                title: '请选择小作坊',
                message: '',
                duration: 2000
              })
              return false
      }
        this.form.company_code = item.company_code;
      this.form.company_name = item.company_name;
      this.areaPage.company_code = item.company_code;
      this.areaPage.company_name = item.company_name;
       this.companyPage.company_name = item.company_name;
        this.form.company_area_name ='';
      this.form.company_area_code ='';
      }else if(this.type==2){
        if(item==undefined){
          this.$notify.error({
                title: '请选择小作坊区域',
                message: '',
                duration: 2000
              })
              return false
      }
          this.form.company_area_name = item.company_area_name;
      this.form.company_area_code = item.company_area_code;
      }
      
      this.dialogTableVisible = false;
    },
    handleSave() {
      this.$refs["addForm"].validate(valid => {
        if (valid) {
          axios.post("/api/device/save", this.form).then(response => {
            this.$router.back();
            // this.resetForm();
          });
        } else {
          return false;
        }
      });
    }
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
  /* .el-form-item--small .el-form-item__content{width: 80%} */
}
</style>
