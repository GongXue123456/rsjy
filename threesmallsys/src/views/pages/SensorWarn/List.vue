<template>
  <el-container class="shopList">
    <el-header class="box add bb">
        <h5 class="mb10"><span class="lines"></span>传感器预警</h5>
    </el-header>
    <el-main class="pt0">
    <el-row class="box search mt20">
       <el-form :inline="true"   ref="addForm" :model="page" class="demo-form-inline">
        <el-col :span="5" class="mr10">
          <el-form-item prop="company_name" size="small">
          <el-input v-model="page.company_name" size="small" disabled clearable @clear="change(1,page.company_name,page.company_code)">
            <el-button slot="append" @click="handleChooseCompany(1)">请选择小作坊</el-button>
          </el-input>
        </el-form-item>
        </el-col>
        <el-col :span="5" class="mr10">
          <el-form-item prop="company_area_name" size="small">
          <el-input v-model="page.company_area_name" size="small" disabled clearable @clear="change(2,page.company_area_name,page.company_area_code)">
            <el-button slot="append" @click="handleChooseCompany(2)">请选择小作坊区域</el-button>
          </el-input>
        </el-form-item>
        </el-col>
        <el-col :span="4" class="mr10">
           <el-form-item size="small">
          <el-select v-model="page.companytype_code" clearable placeholder="请选择食品监管分类" @change="change(3,page.companytype_code)">
             <el-option v-for="(item,index) in companyTypeOptions" :key="index" :label="item.companytype_name" :value="item.companytype_code"
                  ></el-option>
          </el-select>
        </el-form-item>
        </el-col>
         <el-col :span="2" class="tl mr10">
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
    <div v-if="tableData.length>0" class="box list">
      <el-row  :gutter="20">
       <el-col :span="6" class="pr0 mb20" v-for="(item,index) in tableData" :key="index">
        <el-card  class="box-card">
          <div slot="header">
           <span class="fl fb f16">{{item.company_name}}<i  v-if="item.sensor_state==1&&item.sensor_log!=null" class="iconfont  iconyujing general_color" @click="toDetail(item.sensor_number)"></i><i  v-else class="iconfont  iconyujing caaa" ></i></span>
           <el-tag type="info" size="small" class="fr">{{item.companytype_name}}</el-tag>
           <div class="clear tl pt5 f12"><i class="iconfont iconxinzengshiyaosuo general_color vs mr5"></i>{{item.company_area_name}}</div>
          </div>
          <el-row v-if="item.sensor_log" class="f12 sensor_log tl">
          <el-col  :span="12" :class="item.sensor_log.temp>0?'c666':'caaa'"><div v-if="item.sensor_log.temp_state==2" class="containerwater"><div class="water1"></div><div class="water2"></div><div class="water3"></div></div><div v-else class="containerwater"></div><i class="iconfont icontemperature_ic  vs mr5" ></i>温度<span v-if="item.sensor_log.temp>0">：{{item.sensor_log.temp | numFilter}}℃</span></el-col>
          <el-col :span="12" :class="item.sensor_log.humidity>0?'c666':'caaa'"><div v-if="item.sensor_log.humidity_state==2" class="containerwater"><div class="water1"></div><div class="water2"></div><div class="water3"></div></div><div v-else class="containerwater"></div><i class="iconfont iconhumidity_ic  vs mr5" ></i>湿度<span v-if="item.sensor_log.humidity>0">：{{item.sensor_log.humidity}}%rh</span></el-col>
           <el-col  :span="12" :class="item.sensor_log.mq2_monitor_range!=''?'c666':'caaa'"><div v-if="item.sensor_log.mq2_state==2" class="containerwater"><div class="water1"></div><div class="water2"></div><div class="water3"></div></div><div v-else class="containerwater"></div><i class="iconfont iconsmog_ic  vs mr5"></i>烟雾<span v-if="item.sensor_log.mq2_monitor_range!=''">：{{item.sensor_log.mq2_monitor_range}}</span></el-col>
          <el-col :span="12" :class="item.sensor_log.mq4_monitor_range!=''?'c666':'caaa'"><div v-if="item.sensor_log.mq4_state==2" class="containerwater"><div class="water1"></div><div class="water2"></div><div class="water3"></div></div><div v-else class="containerwater"></div><i class="iconfont iconmethane_ic  vs mr5" ></i>甲烷<span v-if="item.sensor_log.mq4_monitor_range!=''">：{{item.sensor_log.mq4_monitor_range}}</span></el-col>
           <el-col  :span="12" :class="item.sensor_log.mq5_monitor_range!=''?'c666':'caaa'"><div v-if="item.sensor_log.mq5_state==2" class="containerwater"><div class="water1"></div><div class="water2"></div><div class="water3"></div></div><div v-else class="containerwater"></div><i class="iconfont iconliquefiedgas_ic  vs mr5" ></i>液化气<span v-if="item.sensor_log.mq5_monitor_range!=''">：{{item.sensor_log.mq5_monitor_range}}</span></el-col>
          <el-col :span="12" :class="item.sensor_log.mq9_monitor_range!=''?'c666':'caaa'"><div v-if="item.sensor_log.mq9_state==2" class="containerwater"><div class="water1"></div><div class="water2"></div><div class="water3"></div></div><div v-else class="containerwater"></div><i class="iconfont iconcarbonmonoxide_ic  vs mr5"></i>一氧化碳<span v-if="item.sensor_log.mq9_monitor_range!=''">：{{item.sensor_log.mq9_monitor_range}}</span></el-col>
           <el-col  :span="12" :class="item.sensor_log.tds!=''?'c666':'caaa'"><div v-if="item.sensor_log.tds_state==2" class="containerwater"><div class="water1"></div><div class="water2"></div><div class="water3"></div></div><div v-else class="containerwater"></div><i class="iconfont iconwaterquality_ic  vs mr5" ></i>水质<span v-if="item.sensor_log.tds!=''">：{{item.sensor_log.tds}}</span></el-col>
          <el-col :span="12" :class="item.sensor_log.ph>0?'c666':'caaa'"><div v-if="item.sensor_log.ph_state==2" class="containerwater"><div class="water1"></div><div class="water2"></div><div class="water3"></div></div><div v-else class="containerwater"></div><i class="iconfont iconpHvalue_ic vs mr5" ></i>酸碱度<span v-if="item.sensor_log.ph>0">：{{item.sensor_log.ph}}</span></el-col>
          </el-row>
          <el-row v-else class="f12 sensor_log tl">
          <el-col  :span="12"><div class="containerwater"></div><i class="iconfont icontemperature_ic  vs mr5 " ></i>温度：</el-col>
          <el-col :span="12" ><div class="containerwater"></div><i class="iconfont iconhumidity_ic  vs mr5 " ></i>湿度：</el-col>
           <el-col  :span="12" ><div class="containerwater"></div><i class="iconfont iconsmog_ic  vs mr5 "></i>烟雾：</el-col>
          <el-col :span="12" ><div class="containerwater"></div><i class="iconfont iconmethane_ic  vs mr5 " ></i>甲烷：</el-col>
           <el-col  :span="12" ><div class="containerwater"></div><i class="iconfont iconliquefiedgas_ic  vs mr5 " ></i>液化气：</el-col>
          <el-col :span="12" ><div class="containerwater"></div><i class="iconfont iconcarbonmonoxide_ic  vs mr5 "></i>一氧化碳：</el-col>
           <el-col  :span="12" ><div class="containerwater"></div><i class="iconfont iconwaterquality_ic  vs mr5 " ></i>水质：</el-col>
          <el-col :span="12" ><div class="containerwater"></div><i class="iconfont iconpHvalue_ic vs mr5 " ></i>酸碱度：</el-col>
          </el-row>
        </el-card>
       </el-col>
       </el-row>
       
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
    <div v-else class="box list tc">暂无数据</div>
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
          <el-table-column  property="company_name" label="小作坊名称" align="center" min-width="120" :show-overflow-tooltip="true"></el-table-column>
           
          <el-table-column v-if="type==1"  label="食品监管分类" align="center" min-width="120" :show-overflow-tooltip="true">
            <template slot-scope="scope">{{scope.row.companytype_name}}</template>
          </el-table-column>
          <el-table-column v-if="type==1"  label="小作坊主体类型" align="center" min-width="120" :show-overflow-tooltip="true">
            <template slot-scope="scope">{{scope.row.companytag_name}}</template>
          </el-table-column>
          <el-table-column v-if="type==1"  label="地址" align="center" min-width="150" :show-overflow-tooltip="true">
            <template slot-scope="scope">{{scope.row.province}}{{scope.row.city}}{{scope.row.area}}{{scope.row.vill}}{{scope.row.town}}</template>
          </el-table-column>
          <el-table-column v-else-if="type==2"  property="company_area_name" label="小作坊区域名称" align="center" min-width="150" :show-overflow-tooltip="true"></el-table-column>
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
import { mapState } from 'vuex'
export default {
  data () {
    return {
      page: {
        pager_offset: '0',
      company_name: '',
      company_code: '',
      company_area_code: '',
      company_area_name: '',
      
      },
       type:"",
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
     currentPage: 1,
     list_btn3:[],
      total: 0,
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
  numFilter (value) {
    let realVal = ''
    if (!isNaN(value) && value!== '') {
      realVal = parseFloat(value).toFixed(0)
    } else {
      realVal = '--'
    }
    return realVal
  }
},
   created () {
    this.currentPage = this.page.pager_offset / 10 + 1
    this.init(this.page)
  },
  methods: {
           init (params) {
      axios.get('/api/sensor/warn/list', params).then((v) => {
        this.tableData=v.sensor_warn_list;
         this.total = v.pager_count
      })
      this.fetchCompanyType()
    },
          change(index,val,val1){
if(index==1){this.page.company_name=val;this.page.company_code=val;  this.page.company_area_name='';
  this.page.company_area_code='';if(val==''||val==null){
  this.areaPage.company_code = '';
       this.areaPage.company_name = '';
}}
if(index==2){this.page.company_area_name=val;this.page.company_area_code=val;}
if(index==3){this.page.companytype_code=val;}
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
        company_name: '',
      company_code: '',
      company_area_code: '',
      company_area_name: '',
      };
    },
     // 搜索
     onSubmit () { 
      this.currentPage = 1
      this.page.pager_offset = '0'
      this.init(this.page)
    },
    // 分页
    currentChange(page){
      this.currentPage = page;
      this.page.pager_offset = String((page - 1) * 10)
      this.init(this.page)
    },
     handleChooseCompany(val) {
      this.type=val
     
      if(val==1){
       this.initCompany(this.companyPage);
      }else{
         if (this.page.company_name == '') {
          this.$notify.error({
            title: '请选择小作坊',
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
      initCompany(params) {
      this.companyListLoading = true;
      axios.get("/api/sensor/company/list", params).then(response => {
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
    onClose() {
      this.$refs["addForm"].validateField("company_name");
      this.selected='';
      this.type=''
    },
     toDetail(code) {
      this.$router.push({
        name: "SensorWarnDetail",
        query: {
          id:code
        }
      });
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
                title: '请选择小作坊区域',
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
 /deep/ .el-input-group__append .el-button--primary .el-icon-search{color: #fff}
     /deep/ .el-input.is-disabled .el-input__inner {
    background-color: #ffffff;
    border-color: #e4e7ed;
    color: #606266;
    cursor: not-allowed;
  }
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
   /deep/ .el-card__header{padding: 10px;background-color: #eee;
   .el-tag.el-tag--info {
    background-color: #ccc;
    border-color: #ccc;
}}
   /deep/ .el-card__body{padding: 5px 0px 15px 0px;}
   .sensor_log .el-col{margin-top: 10px;}
   i.iconfont {
    color: initial;
    margin-left: 0px;
    margin-right: 0px;
}
  /deep/ .el-radio__label {
    display: none !important;
  }
  .caaa i.iconfont {
    color: #aaa;
}
@-webkit-keyframes wateranimate {
      0% {
        -webkit-transform: scale(0);
        opacity: 0.5;
      }

      100% {
        -webkit-transform: scale(2);
        opacity: 0;
      }
    }

    @keyframes wateranimate {
      0% {
        -webkit-transform: scale(0);
        transform: scale(0);
        opacity: 0.8;
      }

      100% {
        -webkit-transform: scale(2);
        transform: scale(2);
        opacity: 0;
      }
    }

    .containerwater {
      display: inline-block;
          vertical-align: middle;
      position: relative;
      width: 25px;
      height: 25px;
    }

    .water1 {
      -webkit-animation: wateranimate 12s 9s ease-out infinite;
      animation: wateranimate 12s 9s ease-out infinite;
    }

    .water2 {
      -webkit-animation: wateranimate 12s 6s ease-out infinite;
      animation: wateranimate 12s 6s ease-out infinite;
    }

    .water3 {
      -webkit-animation: wateranimate 12s 3s ease-out infinite;
      animation: wateranimate 12s 3s ease-out infinite;
    }
    .water1,
    .water2,
    .water3{
      padding: 20%;
      position: absolute;
      left: 30%;
      top: 30%;
      box-shadow: 0 0 15px 10px red inset;
      border-radius: 100%;
      z-index: 1;
      opacity: 0;
    }
}

</style>
