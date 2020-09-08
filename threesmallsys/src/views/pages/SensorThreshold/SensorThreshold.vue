<template>
  <el-container class="cam">
    <el-header class="box add bb">
      <h5 class="mb10">
        <span class="lines"></span>传感器预警项管理
      </h5>
      <div>
        <el-button
          icon="el-icon-plus"
          size="small"
          type="primary"
          @click="$router.push({path: 'sensorThreshold/add'})"
        >添加</el-button>
      </div>
    </el-header>
    <el-main class="pt0">
      <el-row class="box search mt20" :gutter="10">
        <el-form :inline="true" :model="page" class="demo-form-inline">
          <el-col :span="4">
            <el-form-item size="small">
              <el-input
                placeholder="传感器预警项名称"
                @keyup.enter.native="onSearch()"
                v-model="page.sensor_name"
                class="input-with-select"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item size="small">
              <el-input
                placeholder="传感器预警项英文名称"
                @keyup.enter.native="onSearch()"
                v-model="page.sensor_enname"
                class="input-with-select"
              ></el-input>
            </el-form-item>
          </el-col>   
          <el-col :span="2" class="tl">
            <el-form-item size="small">
              <el-button type="primary" @click="onSearch" class="general_bgc general_border cfff">查询</el-button>
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
            label="传感器预警项中文名称"
          >
            <template slot-scope="scope">{{scope.row.sensor_name}}</template>
          </el-table-column>
          
          <el-table-column
            align="center"
            min-width="150"
            :show-overflow-tooltip="true"
            label="传感器预警项英文名称"
          >
            <template slot-scope="scope">{{scope.row.sensor_enname}}</template>
          </el-table-column>

         <el-table-column
            align="center"
            min-width="150"
            :show-overflow-tooltip="true"
            label="预警最大值"
          >
            <template slot-scope="scope">{{scope.row.max_value}}</template>
          </el-table-column>

            <el-table-column
              align="center"
              min-width="150"
              :show-overflow-tooltip="true"
              label="预警最小值（值为0,则只对最大值预警）"
            >
            <template slot-scope="scope">{{scope.row.min_value}}</template>
          </el-table-column>
            <el-table-column prop="sync_interval" min-width="150" :show-overflow-tooltip="true"  label="同步频率" align='center'></el-table-column>
          <el-table-column label="操作" min-width="70" align="center" fixed="right">
            <template slot-scope="scope">
              <el-button
                type="text"
                class="orange disib"
                size="mini"
                @click="toEdit(scope.row.sensor_threshold_code)"
              >编辑</el-button>
            </template>
          </el-table-column>

        </el-table>
        <div class="i-page fr disib mt20">
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
        sensor_name: "",
        sensor_enname:""
      },
      currentPage: 1,
      total: 0,
      tableData: [],
      user: ""
    };
  },
  computed: {
    ...mapGetters({ sensorThresholdPage: "sensorThreshold/sensorThresholdPage" })
  },
  mounted() {
    this.user = local.get("user");
    this.page = Object.assign({}, this.sensorThresholdPage);
    this.currentPage =
      parseInt(this.page.pager_offset) / parseInt(this.page.pager_openset) + 1;
    this.init(this.page);
  },
  methods: {
    init(params) {
      axios.get("/api/sensorThreshold/list", params).then(v => {
        this.tableData = v.sensor_threshold_list;
        this.total = v.pager_count;
      });
    },
    resetPage() {
      this.page = {
        pager_offset: "0",
        pager_openset: "10",
        sensor_name: "",
        sensor_enname: ""
      };
    },
    // 搜索
    onSearch() {
      this.page.pager_offset = "0";
      this.init(this.page);
    },
    handleCurrentChange(val) {
      this.page.pager_offset = (val - 1) * this.page.pager_openset + "";
      this.init(this.page);
    },
    handleSizeChange(val) {
      this.page.pager_openset = val + "";
      this.init(this.page);
    },
    toEdit(id) {
      this.$router.push({
        name: "SensorThresholdEdit",
        query: {
          id
        }
      });
    }
  },
  beforeRouteLeave(to, from, next) {
    if (to.name == "SensorThresholdAdd" || to.name == "SensorThresholdEdit") {
      this.$store.dispatch("sensorThreshold/setSensorThresholdPage", this.page);
      next();
    } else {
      this.resetPage();
      this.$store.dispatch("sensorThreshold/setSensorThresholdPage", this.page);
      next();
    }
  }
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
}
</style>
