<template>
  <el-container class="monitor">
    <el-header class="box add bb">
      <h5 class="mb10">
        <span class="lines"></span>公司列表
      </h5>
    </el-header>
    <el-main class="pt0">
      <el-row class="box search mt20" :gutter="10">
        <el-form :inline="true" :model="page" class="demo-form-inline">
          <el-col :span="4">
            <el-form-item size="small">
              <el-input
                placeholder="企业名称" clearable 
                @clear="onSearch()"
                v-model="page.company_name"
                class="input-with-select"
              ></el-input>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="6">
            <el-form-item size="small">
              <el-select clearable
                v-model="page.companytype_code"
                placeholder="请选择食品监管分类"
                @change="handleCompanyTypeChange"
              >
                <el-option
                  v-for="(item,index) in companyTypeOptions"
                  :key="index"
                  :label="item.companytype_name"
                  :value="item.companytype_code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col> -->
          <el-col :span="6">
            <el-form-item size="small">
              <el-select clearable v-model="page.companytag_code" placeholder="请选择主体类型" @change="onSearch(page.companytag_code)">
                <el-option
                  v-for="(item,index) in companyTagOptions"
                  :key="index"
                  :label="item.companytag_name"
                  :value="item.companytag_code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="4">
              <el-form-item size="small">
                <el-select v-model="page.device_state" placeholder="请选择">
                  <el-option
                    v-for="(item,index) in statusOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item size="small">
                <el-input placeholder="企业名称" v-model="page.company_name" class="input-with-select"></el-input>
              </el-form-item>
          </el-col>-->
          <el-col :span="2" class="tl">
            <el-form-item size="small">
              <el-button type="primary" @click="onSearch" class="general_bgc general_border cfff">查询</el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <el-table :data="tableData" border fit>
        <el-table-column align="center" width="60" type="index" label="序号"></el-table-column>
        <el-table-column  label="设备状态" align="center" min-width="50px">
          <template slot-scope="scope"><i  class="iconfont  iconshexiangtou general_color" v-if="scope.row.device_count>0"  @click="toMonitorList(scope.row)"></i><i  class="iconfont  iconshexiangtou caaa" v-else ></i></template>
        </el-table-column>
        <el-table-column prop="company_name" label="企业名称" align="center" min-width="150px"></el-table-column>
        <el-table-column label="食品监管分类" align="center">
          <template slot-scope="scope">{{scope.row.companytype_name}}</template>
        </el-table-column>
        <el-table-column label="企业主体类型" min-width="150px" align="center">
          <template slot-scope="scope">{{scope.row.companytag_name}}</template>
        </el-table-column>
        <el-table-column label="最近评价等级" min-width="150px" align="center">
          <template slot-scope="scope">{{scope.row.advice_rate | rateFilter}}</template>
        </el-table-column>
        <el-table-column label="操作" width="120" align="center" fixed="right">
          <template slot-scope="scope">
            <el-button
              type="text"
              class="general_color"
              size="small"
              @click="toMonitorList(scope.row)"
            >查看</el-button>
            <el-button
              type="text"
              class="cac"
              size="small"
              @click="toRegulatoryRecord(scope.row)"
            >监管记录</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="i-page fr mt20">
        <el-pagination
          v-if="total!=0"
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10,20,30,50]"
          :page-size="parseInt(page.pager_openset)"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
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
        company_name: "",
        companytype_code: "",
        companytag_code: "",
        filing_state:'3',
        state:'1'
      },
      statusOptions: [
        { label: "已启用", value: "1" },
        { label: "已禁用", value: "2" },
        { label: "全部", value: "" }
      ],
      companyTypeOptions: [],
      companyTagOptions: [],
      currentPage: 1,
      total: 0,
      tableData: [],
      user: ""
    };
  },
  filters: {
    rateFilter(rate) {
      const rateMap = {
        1: "D",
        2: "C",
        3: "B",
        4: "A"
      };
      return rateMap[rate];
    }
  },
  computed: {
    ...mapGetters({ monitorPage: "monitor/monitorPage" })
  },
  mounted() {
    this.user = local.get("user");
    this.page = Object.assign({}, this.monitorPage);
    this.currentPage =this.page.pager_offset / 10 + 1;
    this.fetchCompanyType();
    this.init(this.page);
  },
  methods: {
    init(params) {
      axios.get("/api/device/company/list", params).then(v => {
        this.tableData = v.company_list;
        this.total = v.pager_count;
      });
      this.fetchCompanyTag()
    },
    fetchCompanyType() {
      axios.get("/api/companytype/all").then(response => {
        this.companyTypeOptions = response;
      });
    },
    fetchCompanyTag() {
      axios.get("/api/companytag/all", '').then(response => {
        this.companyTagOptions = response;
      });
    },
    // handleCompanyTypeChange(val) {
    //   this.page.companytag_code = "";
    //   this.fetchCompanyTag({ companytype_code: val });
    //   this.page.companytype_code =val;
    //   this.onSearch()
    // },
    // 搜索
    onSearch() {
         this.currentPage =1;
      this.page.pager_offset = "0";
      this.init(this.page);
    },
    resetPage() {
      this.page = {
        pager_offset: "0",
        pager_openset: "10",
        company_name: "",
        companytype_code: "",
        companytag_code: ""
      };
    },
    handleCurrentChange(val) {
        this.currentPage = val;
      this.page.pager_offset = (val - 1) * this.page.pager_openset + "";
      this.init(this.page);
    },
    handleSizeChange(val) {
       this.currentPage = val;
      this.page.pager_openset = val + "";
      this.init(this.page);
    },
    toMonitorList(row) {
      this.$router.push({
        name: "MonitorList",
        query: {
          id: row.company_code
        }
      });
    },
    toRegulatoryRecord(row) {
      this.$router.push({
        name: "RegulatoryRecord",
        query: {
          id: row.company_code
        }
      });
    }
  },
  beforeRouteLeave(to, from, next) {
    if (to.name == "RegulatoryRecord" || to.name == "MonitorList") {
      this.$store.dispatch("monitor/setMoniorPage", this.page);
      next();
    } else {
      this.resetPage();
      this.$store.dispatch("monitor/setMoniorPage", this.page);
      next();
    }
  }
};
</script>
<style lang="scss" scoped>
.monitor {
  overflow-x: hidden;
  .add {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  /deep/ .el-input-group__append .el-button--primary .el-icon-search {
    color: #fff;
  }
  .img{width: 1rem;vertical-align: text-bottom;}
}
</style>


