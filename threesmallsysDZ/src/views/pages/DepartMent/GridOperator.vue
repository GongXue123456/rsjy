<template>
  <el-container class="grid-operator">
    <el-header class="box add bb">
      <h5 class="mb10">
        <span class="lines"></span>
        {{department.department_name}}
      </h5>
      <div>
        <el-button
          class
          icon="el-icon-plus"
          size="small"
          type="primary"
          @click="$router.push({path: 'gridOperatorAdd',query:{
            id:department.department_code,
            name:department.department_name
          }})"
        >新增网格信息员</el-button>
      </div>
    </el-header>
    <el-main class="pt0">
      <el-row class="box search mt20" :gutter="10">
        <el-form :inline="true" :model="page" class="demo-form-inline">
          <el-col :span="4">
            <el-form-item size="small">
              <el-input
                placeholder="请输入姓名|手机号"
                @keyup.enter.native="onSearch()"
                v-model="page.user_name"
                class="input-with-select"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item size="small">
              <el-select v-model="page.state" placeholder="请选择状态">
                <el-option
                  v-for="(item,index) in statusOptions"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="2" class="tl mr10">
            <el-form-item size="small">
              <el-button type="primary" @click="onSearch" class="general_bgc general_border cfff">查询</el-button>
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
        <el-table border :data="tableData" style="width: 100%" fit>
          <el-table-column type="index" width="120" label="序号" align="center"></el-table-column>
          <el-table-column prop="user_name" label="姓名" align="center"></el-table-column>
          <el-table-column prop="user_mobilephone" label="手机号" align="center"></el-table-column>
          <el-table-column prop="user_vill" label="监管区域" align="center"></el-table-column>
          <el-table-column label="状态" align="center">
            <template slot-scope="scope">{{scope.row.state | stateFilter}}</template>
          </el-table-column>
          <el-table-column label="操作" fixed="right" width="120px" align="center">
            <template slot-scope="scope">
              <el-button type="text" class="disib" size="mini" @click="handleDelete(scope.row)">删除</el-button>
              <!-- <el-button
                type="text"
                class="disib"
                :class="{'red':scope.row.state==1}"
                size="mini"
                @click="changeState(scope.row)"
              >{{scope.row.state | antiStateFilter}}</el-button> -->
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
      </div>
    </el-main>
  </el-container>
</template>
<script>
import axios from "../../../util/api";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      page: {
        pager_offset: "0",
        pager_openset: "10",
        state: "",
        user_name: ""
      },
      statusOptions: [
        { label: "已启用", value: "1" },
        { label: "已禁用", value: "2" },
        { label: "全部", value: "" }
      ],
      department: {},
      currentPage: 1,
      total: 0,
      tableData: []
    };
  },
  computed: {
    ...mapGetters({
      gridOperatorPage: "department/gridOperatorPage"
    })
  },
  filters: {
    stateFilter(state) {
      const stateMap = {
        "1": "已启用",
        "2": "已禁用"
      };
      return stateMap[state];
    },
    antiStateFilter(state) {
      const stateMap = {
        1: "禁用",
        2: "启用"
      };
      return stateMap[state];
    }
  },
  mounted() {
    this.page = Object.assign({}, this.gridOperatorPage);
    this.currentPage =
      parseInt(this.page.pager_offset) / parseInt(this.page.pager_openset) + 1;
    this.init(this.page);
  },
  methods: {
    init(params) {
      axios.get("/api/infoRegion/list", params).then(response => {
        this.department = response.department;
        this.tableData = response.info_region_list;
        this.total = response.pager_count;
      });
    },
    resetPage() {
      this.page = {
        pager_offset: "0",
        pager_openset: "10",
        state: "",
        user_name: ""
      };
    },
    // 搜索
    onSearch() {
      this.page.pager_offset = "0";
      this.init(this.page);
    },
    onClear() {
      this.resetPage();
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
    changeState(row) {
      let { user_code, state } = row;
      state = state == 1 ? 2 : 1;
      axios
        .put("/api/departmentUser/state/update", {
          department_code: this.$route.query.id,
          user_code,
          state
        })
        .then(response => {
          this.init(this.page);
        });
    },
    handleDelete(row) {
      let { user_code,region_code } = row;
      axios
        .delete("/api/infoRegion/delete", {
          region_code,
          user_code
        })
        .then(response => {
          this.init(this.page);
        });
    }
  },
  beforeRouteLeave(to, from, next) {
    if (to.name == "GridOperatorAdd") {
      this.$store.dispatch("department/setGridOperatorPage", this.page);
      next();
    } else {
      this.resetPage();
      this.$store.dispatch("department/setGridOperatorPage", this.page);
      next();
    }
  }
};
</script>
<style lang="scss" scoped>
.grid-operator {
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
