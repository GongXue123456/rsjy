<template>
  <el-container class="cam">
    <el-header class="box add bb">
      <h5 class="mb10">
        <span class="lines"></span>摄像头管理
      </h5>
      <div>
        <el-button
          icon="el-icon-plus"
          size="small"
          type="primary"
          @click="$router.push({path: 'cam/add'})"
        >添加</el-button>
      </div>
    </el-header>
    <el-main class="pt0">
      <el-row class="box search mt20" :gutter="10">
        <el-form :inline="true" ref="addForm"  :model="page" class="demo-form-inline">
          <el-col :span="4">
            <el-form-item size="small">
              <el-input clearable
                placeholder="设备名称"
                @clear="onSubmit()"
                v-model="page.device_name"
                class="input-with-select"
              ></el-input>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="4">
            <el-form-item size="small">
               <el-select v-model="page.company_name" clearable placeholder="请选择所属企业" @change="change1(page.company_name,page.company_code)">
                <el-option
                  v-for="(item,index) in company"
                  :key="index"
                  :label="item.company_name"
                  :value="item.company_name"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
           <el-col :span="4">
            <el-form-item size="small">
               <el-select v-model="page.company_area_name" clearable placeholder="请选择所属企业区域" @change="onSearch(page.company_area_name)">
                <el-option
                  v-for="(item,index) in companyData"
                  :key="index"
                  :label="item.company_area_name"
                  :value="item.company_area_name"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col> -->
           <el-col :span="5" class="mr10">
          <el-form-item prop="company_name" size="small">
          <el-input v-model="page.company_name" size="small" disabled clearable @clear="change(1,page.company_name,page.company_code)">
            <el-button slot="append" @click="handleChooseCompany(1)">请选择企业</el-button>
          </el-input>
        </el-form-item>
        </el-col>
        <el-col :span="5" class="mr10">
          <el-form-item prop="company_area_name" size="small">
          <el-input v-model="page.company_area_name" size="small" disabled  clearable @clear="change(2,page.company_area_name,page.company_area_code)">
            <el-button slot="append" @click="handleChooseCompany(2)">请选择企业区域</el-button>
          </el-input>
        </el-form-item>
        </el-col>
          <el-col :span="4">
            <el-form-item size="small">
              <el-select v-model="page.device_state" clearable placeholder="请选择" @change="onSubmit(page.device_state)">
                <el-option
                  v-for="(item,index) in statusOptions"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="2" class="tl">
            <el-form-item size="small">
              <el-button type="primary" @click="onSubmit" class="general_bgc general_border cfff">查询</el-button>
            </el-form-item>
          </el-col>
           <el-col :span="2" class="tl mr10">
            <el-form-item size="small">
              <el-button @click="onClear">清空条件</el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <div class="box list">
        <el-table :data="tableData" style="width: 100%" border fit>
          <el-table-column align="center" width="60" type="index" label="序号"></el-table-column>
          <el-table-column
            align="center"
            min-width="150"
            :show-overflow-tooltip="true"
            label="设备名称"
          >
            <template slot-scope="scope">{{scope.row.device_name}}</template>
          </el-table-column>
          <el-table-column
            align="center"
            min-width="150"
            :show-overflow-tooltip="true"
            label="设备编号"
          >
            <template slot-scope="scope">{{scope.row.device_number}}</template>
          </el-table-column>
          <el-table-column
            align="center"
            min-width="150"
            :show-overflow-tooltip="true"
            label="所属企业"
          >
            <template slot-scope="scope">{{scope.row.company_name}}</template>
          </el-table-column>
           <el-table-column prop="company_area_name" min-width="150" :show-overflow-tooltip="true"  label="所属企业区域" align='center'></el-table-column>
          <el-table-column align="center" label="状态">
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.device_state | tagFilter"
              >{{scope.row.device_state | statusFilter}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column align="center" label="类型">
            <template slot-scope="scope">{{scope.row.device_type | typeFilter}}</template>
          </el-table-column>
          <el-table-column label="操作" min-width="80" align="center" fixed="right">
            <template slot-scope="scope">
              <!-- <el-button
                type="text"
                class="general_color"
                size="small"
                @click="toPlay(scope.row)"
              >播放</el-button>-->
              <el-button
                type="text"
                class="orange disib"
                size="mini"
                @click="toEdit(scope.row.device_code)"
              >编辑</el-button>
              <el-button
                type="text"
                class="disib"
                :class="{'red':scope.row.device_state==1}"
                size="mini"
                @click="changeState(scope.row)"
              >{{scope.row.device_state | antiStateFilter}}</el-button>
            </template>
          </el-table-column>
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
      </div>
       <el-dialog :title="type==1?'企业列表':'企业区域列表'" :visible.sync="dialogTableVisible" @close="onClose">
        <el-row class="box search mt20" :gutter="10">
          <el-form v-if="type==1" :inline="true" :model="companyPage" class="demo-form-inline">
            <el-col :span="6">
              <el-form-item size="small">
                <el-input placeholder="企业名称、经营者" v-model="companyPage.company_name" clearable @clear="onSearch" class="input-with-select" ></el-input>
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
                <el-input placeholder="企业名称" v-model="areaPage.company_name" clearable @clear="onSearch" class="input-with-select" ></el-input>
              </el-form-item>
            </el-col> -->
            <el-col v-if="type==2" :span="6">
              <el-form-item size="small">
                <el-input  placeholder="企业区域名称" v-model="areaPage.company_area_name" clearable @clear="onSearch" class="input-with-select" ></el-input>
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
          <el-table-column  property="company_name" label="企业名称" align="center" min-width="120" :show-overflow-tooltip="true"></el-table-column>
           
          <el-table-column v-if="type==1"  label="食品监管分类" align="center" min-width="120" :show-overflow-tooltip="true">
            <template slot-scope="scope">{{scope.row.companytype_name}}</template>
          </el-table-column>
          <el-table-column v-if="type==1"  label="企业主体类型" align="center" min-width="120" :show-overflow-tooltip="true">
            <template slot-scope="scope">{{scope.row.companytag_name}}</template>
          </el-table-column>
           <el-table-column v-if="type==1"  label="地址" align="center" min-width="150" :show-overflow-tooltip="true">
            <template slot-scope="scope">{{scope.row.company_address}}</template>
          </el-table-column>
          <!-- <el-table-column v-if="type==1"  label="地址" align="center" min-width="150" :show-overflow-tooltip="true">
            <template slot-scope="scope">{{scope.row.province}}{{scope.row.city}}{{scope.row.area}}{{scope.row.vill}}{{scope.row.town}}</template>
          </el-table-column> -->
          <el-table-column v-else-if="type==2"  property="company_area_name" label="企业区域名称" align="center" min-width="150" :show-overflow-tooltip="true"></el-table-column>
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
import { local } from "../../../util/util";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      page: {
        pager_offset: "0",
        pager_openset: "10",
        device_name: "",
        device_state: "",
        company_name: "",
        company_code:'',
        company_area_name:""
      },
       companyPage: {
        pager_offset: "0",
        pager_openset: "10",
        company_name: "",
        companytype_code: "",
        companytag_code: "",
        filing_state:'3',
        state:'1',
      },
      areaPage:{
        pager_offset:'0',
        pager_openset: "10",
        company_area_name: "",
        company_code:"",
        state:"1"
      },
      type:'',
      statusOptions: [
        { label: "全部", value: "" },
        { label: "已启用", value: "1" },
        { label: "已禁用", value: "2" },
        
      ],
      currentPage: 1,
      total: 0,
      tableData: [],
      user: "",
      dialogTableVisible: false,
        companyListLoading: false,
         companyTypeOptions: [],
      companyTagOptions: [],
      companyData: [],
      selected: "",
      companyDataTotal: null,
    };
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        1: "已启用",
        2: "已禁用"
      };
      return statusMap[status];
    },
    tagFilter(status) {
      const statusMap = {
        1: "success",
        2: "warning"
      };
      return statusMap[status];
    },
    typeFilter(type) {
      const typeMap = {
        1: "视频+抓拍",
        2: "视频"
      };
      return typeMap[type];
    },
    antiStateFilter(state) {
      const stateMap = {
        1: "禁用",
        2: "启用"
      };
      return stateMap[state];
    }
  },
  computed: {
    ...mapGetters({ camPage: "device/camPage" })
  },
  mounted() {
    this.user = local.get("user");
    this.page = Object.assign({}, this.camPage);
    this.currentPage =
      parseInt(this.page.pager_offset) / parseInt(this.page.pager_openset) + 1;
    this.init(this.page);
  },
  methods: {
    init(params) {
      axios.get("/api/device/list", params).then(v => {
        this.tableData = v.device_list;
        this.total = v.pager_count;
      });
    },
      change(index,val,val1){
if(index==1){this.page.company_name=val;this.page.company_code=val;  this.page.company_area_name='';
  this.page.company_area_code='';if(val==''||val==null){
  this.areaPage.company_code = '';
       this.areaPage.company_name = '';
}}
if(index==2){this.page.company_area_name=val;this.page.company_area_code=val;}
this.onSubmit()
    },
     onClear() {
      this.resetPage();
      this.init(this.page);
        this.companyPage.company_name = '';
    },
    resetPage() {
      this.page = {
        pager_offset: "0",
        pager_openset: "10",
        device_name: "",
        device_state: "",
        company_name: "",
        company_area_name:''
      };
    },
    // 搜索
    onSubmit() {
      this.page.pager_offset = "0";
      // this.$store.dispatch('patrol/setNewPage', this.page)
      this.init(this.page);
    },
     currentChange(page){
      this.currentPage = page;
      this.page.pager_offset = String((page - 1) * 10)
      this.init(this.page)
    },
    // handleSizeChange(val) {
    //   this.page.pager_openset = val + "";
    //   this.init(this.page);
    // },
    toEdit(id) {
      this.$router.push({
        name: "CamEdit",
        query: {
          id
        }
      });
    },
    changeState(row) {
      let { device_code, device_state } = row;
      device_state = device_state == 1 ? 2 : 1;
      axios
        .put("/api/device/state/update", { device_code, device_state })
        .then(response => {
          this.init(this.page);
        });
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
   onSearch() {
       if(this.type==1){
           this.companyPage.pager_offset = "0";
       this.initCompany(this.companyPage);
      }else{
          this.areaPage.pager_offset = "0";
         this.companyArea(this.areaPage);
      }
    },
   handleChooseCompany(val) {
      this.type=val
    
      if(val==1){
      
       this.initCompany(this.companyPage);
      }else{
         if (this.page.company_name == '') {
          this.$notify.error({
            title: '请选择企业',
            message: '',
            duration: 2000
          })
          return false
        } else {
         this.companyArea(this.areaPage);
        }
        
      }
        this.dialogTableVisible = true;
      this.fetchCompanyType();
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
                title: '请选择企业',
                message: '',
                duration: 2000
              })
              return false
      }
        this.page.company_code = item.company_code;
      this.page.company_name = item.company_name;
       this.areaPage.company_code = item.company_code;
       this.areaPage.company_name = item.company_name;
       this.companyPage.company_name = item.company_name;
        this.page.company_area_name ='';
      this.page.company_area_code ='';
      }else if(this.type==2){
        if(item==undefined){
          this.$notify.error({
                title: '请选择企业区域',
                message: '',
                duration: 2000
              })
              return false
      }
          this.page.company_area_name = item.company_area_name;
      this.page.company_area_code = item.company_area_code;
      }
      
      this.dialogTableVisible = false;
      this.onSubmit()
    },
  },
  beforeRouteLeave(to, from, next) {
    if (to.name == "CamAdd" || to.name == "CamEdit") {
      this.$store.dispatch("device/setCamPage", this.page);
      next();
    } else {
      this.resetPage();
      this.$store.dispatch("device/setCamPage", this.page);
      next();
    }
  },
};
</script>
<style lang="scss" scoped>
.cam {
  overflow-x: hidden;
  .add {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  /deep/ .el-input-group__append .el-button--primary .el-icon-search {
    color: #fff;
  }
    /deep/ .el-input.is-disabled .el-input__inner {
    background-color: #ffffff;
    border-color: #e4e7ed;
    color: #606266;
    cursor: not-allowed;
  }
    /deep/ .el-radio__label {
    display: none !important;
  }
}
</style>
