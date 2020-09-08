<template>
  <el-container class="punish">
    <el-header class="box add bb">
      <h5 class="mb10">
        <span class="lines"></span>处罚方式管理
      </h5>
      <div>
        <el-button
          icon="el-icon-plus"
          size="small"
          type="primary"
          @click="goedit('',2)"
        >添加</el-button>
      </div>
    </el-header>
    <el-main class="pt0">
      <el-row class="box search mt20" :gutter="10">
        <el-form :inline="true" ref="addForm"  :model="page" class="demo-form-inline">
          <el-col :span="4">
            <el-form-item size="small">
              <el-input clearable
                placeholder="处罚方式名称"
                @clear="onSubmit()"
                v-model="page.punish_name"
                class="input-with-select"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2" class="tl">
            <el-form-item size="small">
              <el-button type="primary" @click="onSubmit" class="general_bgc general_border cfff">查询</el-button>
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
            label="处罚方式名称"
          >
            <template slot-scope="scope">{{scope.row.punish_name}}</template>
          </el-table-column>
          <el-table-column align="center" label="状态">
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.state | tagFilter"
              >{{scope.row.state | statusFilter}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" min-width="80" align="center" fixed="right">
            <template slot-scope="scope">
              <el-button
                type="text"
                class="orange disib"
                size="mini"
                @click="goedit(scope.row.punish_code,1)"
              >编辑</el-button>
              <el-button
                type="text"
                class="disib"
                :class="{'red':scope.row.state==1}"
                size="mini"
                @click="changeState(scope.row)"
              >{{scope.row.state | antiStateFilter}}</el-button>
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
        punish_name: "",
        state: ""
      },
      statusOptions: [
        { label: "全部", value: "" },
        { label: "已启用", value: "1" },
        { label: "已禁用", value: "2" }        
      ],
      currentPage: 1,
      total: 0,
      tableData: []
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
    antiStateFilter(state) {
      const stateMap = {
        1: "禁用",
        2: "启用"
      };
      return stateMap[state];
    }
  },
  computed: {
    ...mapGetters({ punishPage: "punish/punishPage" })
  },
  mounted() {
    this.page = Object.assign({}, this.punishPage);
    this.currentPage =
      parseInt(this.page.pager_offset) / parseInt(this.page.pager_openset) + 1;
    this.init(this.page);
  },
  methods: {
    init(params) {
      axios.get("/api/punish/list", params).then(v => {
        this.tableData = v.pager_list;
        this.total = v.pager_count;
      });
    },
    // 搜索
    onSubmit() {
      this.page.pager_offset = "0";
      this.init(this.page);
    },
     currentChange(page){
      this.currentPage = page;
      this.page.pager_offset = String((page - 1) * 10)
      this.init(this.page)
    },
    goedit(index,index1){
     this.$router.push({name: "PunishAdd",query: {id: index,id1:index1}});
    },
    changeState(row) {
      let { punish_code, state } = row;
      state = state == 1 ? 2 : 1;
      axios
        .put("/api/punish/state/update", { punish_code, state })
        .then(response => {
          this.init(this.page);
        });
    },
  },
  beforeRouteLeave(to, from, next) {
    if (to.name == "PunishAdd") {
      this.$store.dispatch("punish/setPunishPage", this.page);
      next();
    }
  },
};
</script>
<style lang="scss" scoped>
.punish {
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
