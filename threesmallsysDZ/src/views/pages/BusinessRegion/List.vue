<template>
  <el-container class="shopList ">
    <el-header class="box add bb">
        <h5 ><span class="lines"></span>企业区域管理</h5>
        <div><el-button  class=""  icon="el-icon-plus" size="small" type="primary" @click="$router.push({path: 'companyArea/add'})">新增企业区域</el-button></div>
    </el-header>
    <el-main class="p15 pt20">

   <el-row class="box search">
       <el-form :inline="true" ref="addForm" :model="page" class="demo-form-inline">
         <el-col :span="5" class="mr10">
          <el-form-item prop="company_name" size="small">
          <el-input v-model="page.company_name" size="small" disabled  @clear="change(1,page.company_name,page.company_code)">
            <el-button slot="append" @click="handleChooseCompany(1)">请选择企业</el-button>
          </el-input>
        </el-form-item>
        </el-col>
        <el-col :span="5" class="mr10">
          <el-form-item prop="company_area_name" size="small">
          <el-input v-model="page.company_area_name" size="small"  disabled @clear="change(2,page.company_area_name,page.company_area_code)">
            <el-button slot="append" @click="handleChooseCompany(2)">请选择企业区域</el-button>
          </el-input>
        </el-form-item>
        </el-col>
        <el-col :span="4" class="mr10">
            <el-form-item size="small">
              <el-select v-model="page.state" placeholder="请选择" @change="onSubmit(page.state)">
                <el-option v-for="(item,index) in statusOptions" :key="index" :label="item.label" :value="item.value" ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        <el-col :span="2" class="tl">
           <el-form-item  size="small">
          <el-button  type="primary"  @click="onSubmit" class="general_bgc general_border cfff">查询</el-button>
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
      <el-table border  :data="tableData"  style="width: 100%">
        <el-table-column type="index" align='center' width="60" label="序号"></el-table-column>
        <el-table-column prop="company_area_name"  min-width="150" :show-overflow-tooltip="true"  label="企业区域名称" align='center' ></el-table-column>
        <el-table-column prop="company_name" min-width="150" :show-overflow-tooltip="true"  label="企业名称" align='center'></el-table-column>
        <el-table-column align="center" label="状态">
            <template slot-scope="scope">
              <el-tag :type="scope.row.state | tagFilter" >{{scope.row.state | statusFilter}}</el-tag>
            </template>
          </el-table-column>
        <el-table-column prop="add_time" min-width="150" :show-overflow-tooltip="true" label="添加时间" align='center'></el-table-column>
        <el-table-column prop="update_time"  min-width="150" :show-overflow-tooltip="true" label="更新时间"  align='center'></el-table-column>
        <el-table-column label="操作" class-name='aa' min-width="100"  fixed="right"  align='center'>
          <template slot-scope="scope">
            <el-button type="text" class="general_color disib"  size="mini"  @click="godetail(scope.row.company_area_code)">编辑</el-button>
             <el-button type="text" class="disib" :class="{'red':scope.row.state==1}" size="mini" @click="changeState(scope.row)" >{{scope.row.state | antiStateFilter}}</el-button>
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
            <template slot-scope="scope">{{scope.row.province}}{{scope.row.city}}{{scope.row.area}}{{scope.row.vill}}{{scope.row.town}}</template>
          </el-table-column>
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
import axios from '../../../util/api'
import { local,aa } from '../../../util/util'
import Globle from '@/components/Globle'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      page: {
        pager_offset: "0",
      company_area_name: '',
      company_name: '',
      state:'',

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
        { label: "已启用", value: "1" },
        { label: "已禁用", value: "2" },
        { label: "全部", value: "" }
      ],
      options4:'',
      options2:'',
      list_btn:[],
       currentPage: 1,
      total: 0,
      count:'',
      tableData:[],
       dialogTableVisible: false,
        companyListLoading: false,
         companyTypeOptions: [],
      companyTagOptions: [],
      companyData: [],
      selected: "",
      companyDataTotal: null,
    }
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
    antiStateFilter(state) {
      const stateMap = {
        1: "禁用",
        2: "启用"
      };
      return stateMap[state];
    }
  },
    computed: {
    ...mapState({
      regionPage: (state) => state.region.regionPage
    })
    
  },
   created () {
     var that=this;
      that.page = Object.assign({}, that.regionPage);
          that.currentPage = that.page.pager_offset / 10 + 1;
    that.init(that.page)
  },
  methods: {
       init (params) {
          var that=this;
          that.page.state=String(that.page.state)
          axios.get('/api/companyArea/list', params).then((v) => {
        that.tableData=v.company_area_list;
         that.total = v.pager_count
      }).catch(() => {})
    },
    // 搜索
     onSubmit () { 
        var that=this;
      that.currentPage = 1
      that.page.pager_offset = '0'
      that.$store.dispatch('region/setNewPage', that.page)
      that.init(that.page)
    },
    // 分页
    currentChange(page){
        var that=this;
      that.currentPage = page;
      
      that.page.pager_offset = String((page - 1) * 10)
      that.$store.dispatch('region/setNewPage', that.page)
      that.init(that.page)
    },
     changeState(row) {
      let { company_area_code, state } = row;
      state = state == 1 ? 2 : 1;
      axios.put("/api/companyArea/state/update", { company_area_code, state }).then(response => {
          this.init(this.page);
        });
    },
   godetail(index){
    this.$router.push({
        name: "BusinessRegionAdd",
        query: {
          id: index
        }
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
      company_area_name: '',
      company_name: '',
      state:'',
      };
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
  }
}
</script>
<style lang="scss" scoped>
.shopList{
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
  .list_tab{
    padding: 10px;
    background-color:  #f5f7fa;
    .list_tag{
    right: -10px;
    padding:2px 6px;
    border-radius: 10px;
    top: -10px;}
  }
  
 /deep/ .el-input-group__append .el-button--primary .el-icon-search{color: #fff}
  /deep/.el-table .aa .cell {display: flex;justify-content: center;}
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
