<template>
  <el-container class="supervisor-add">
    <el-header class="box add bb">
      <h5 class="mb10">
        <span class="lines"></span>
        {{$route.query.name}}--新增网格信息员
      </h5>
      <div>
        <el-button class size="small" type="primary" @click="submitUser">提交</el-button>
        <el-button class size="small" @click="$router.back()">返回</el-button>
      </div>
    </el-header>
    <el-main class="pt0">
      <el-row class="mt20" style="text-align:left;padding-left:10px" :gutter="10">
        <el-form :inline="true" :model="page" label-position="left">
          <el-row>
            <el-col :span="2">管理区域</el-col>
            <el-col :span="20">
              <el-form-item size="small">
                <el-checkbox
                  :indeterminate="isIndeterminate"
                  v-model="checkAll"
                  @change="handleCheckAllChange"
                >全选</el-checkbox>
                <div style="margin: 15px 0;"></div>
                <el-checkbox-group v-model="checkedList" @change="handleCheckedChange">
                  <el-checkbox
                    v-for="region in departmentRegions"
                    :label="region.region_name"
                    :key="region.region_code"
                  ></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10" class="mt10">
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
            <el-col :span="2" class="tl mr10">
              <el-form-item size="small">
                <el-button
                  type="primary"
                  @click="onSearch"
                  class="general_bgc general_border cfff"
                >查询</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-row>
      <div class="box list mt20">
        <el-table
          border
          :data="tableData"
          ref="userTable"
          @selection-change="handleSelectionChange"
          style="width: 100%"
          :row-key="getRowKeys"
          fit
        >
          <el-table-column type="selection" :reserve-selection="true" width="55" align="center"></el-table-column>
          <el-table-column type="index" width="120" label="序号" align="center"></el-table-column>
          <el-table-column prop="user_name" label="姓名" align="center"></el-table-column>
          <el-table-column prop="user_mobilephone" label="手机号" align="center"></el-table-column>
          <el-table-column prop="user_vill" label="监管区域" align="center"></el-table-column>
          <el-table-column label="状态" align="center">
            <template slot-scope="scope">{{scope.row.state | stateFilter}}</template>
          </el-table-column>
          <!-- <el-table-column label="操作" fixed="right" width="120px" align="center">
            <template slot-scope="scope">
              <el-button
                type="text"
                class="general_color"
                size="small"
                @click="toEdit(scope.row)"
              >编辑</el-button>
            </template>
          </el-table-column>-->
        </el-table>
        <div class="i-page fr mt20">
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
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
        user_name: "",
        user_vills: "",
        user_type: "协管员"
      },
      checkAll: false,
      checkedList: [],
      isIndeterminate: false,
      departmentRegions: [],
      department: {},
      total: 0,
      tableData: [],
      multipleSelection: [],
      getRowKeys(row) {
        return row.user_code;
      }
    };
  },
  computed: {},
  filters: {
    stateFilter(state) {
      const stateMap = {
        "1": "启用",
        "2": "禁用"
      };
      return stateMap[state];
    }
  },
  mounted() {
    // this.page.department_code = this.$route.query.id;
    this.fetchRegionList();
  },
  methods: {
    init(params) {
      axios.get("/api/user/info/list", params).then(response => {
        this.tableData = response.user_list;
        this.total = response.pager_count;
      });
    },
    fetchRegionList() {
      axios
        .get("/api/departmentRegion/list", {
          department_code: this.$route.query.id,
          param_type: "2"
        })
        .then(response => {
          this.departmentRegions = response.department_region_list;
        });
    },
    submitUser() {
      let info_region_list = [];
      this.multipleSelection.forEach(item => {
        info_region_list.push({
          region_code: item.region_code,
          user_code: item.user_code
        });
      });
      axios
        .post("/api/infoRegion/save", { info_region_list })
        .then(response => {
          this.$router.back();
        });
    },
    handleCurrentChange(val) {
      this.page.pager_offset = (val - 1) * this.page.pager_openset + "";
      this.init(this.page);
    },
    handleSizeChange(val) {
      this.page.pager_openset = val + "";
      this.init(this.page);
    },
    onSearch() {
      this.page.pager_offset = "0";
      this.init(this.page);
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.userTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.userTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleCheckAllChange(val) {
      this.checkedList = val
        ? this.departmentRegions.map(item => item.region_name)
        : [];
      this.isIndeterminate = false;
      this.handleCheckedChange(this.checkedList);
    },
    handleCheckedChange(value) {
      let checkedList = value.map(item =>
        JSON.stringify(item).replace(/\"/g, "'")
      );
      this.page.user_vills = checkedList.toString();
      this.page.pager_offset = "0";
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.departmentRegions.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.departmentRegions.length;
      if (value.length > 0) {
        this.init(this.page);
      } else {
        this.tableData = [];
        this.total = null;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.supervisor-add {
  overflow-x: hidden;
  .add {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .el-form-item--small.el-form-item {
    margin-bottom: 0px;
  }
}
</style>
