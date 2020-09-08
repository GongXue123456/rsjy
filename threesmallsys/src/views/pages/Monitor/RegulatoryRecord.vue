<template>
  <el-container class="shopList">
    <el-header class="box add bb">
      <h5 class="mb10">
        <span class="lines"></span>监管记录
      </h5>
      <div>
        <el-button class="back_btn" size="small" @click="$router.back()">返回</el-button>
      </div>
    </el-header>
    <el-main class="pt0">
      <el-row class="box search mt20" :gutter="10">
        <el-form :inline="true" :model="page" class="demo-form-inline">
          <el-col :span="4">
            <el-form-item size="small">
              <el-select v-model="page.advice_type" placeholder="评定类型" clearable @change="onSearch(page.advice_type)">
                <el-option
                  v-for="(item,index) in typeOptions"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item size="small">
              <el-select v-model="page.advice_rate" placeholder="评定等级" clearable @change="onSearch(page.advice_rate)">
                <el-option
                  v-for="(item,index) in rateOptions"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
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
                <el-input placeholder="小作坊名称" v-model="page.company_name" class="input-with-select"></el-input>
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
        <el-table-column label="评定类型" align="center">
          <template slot-scope="scope">{{scope.row.advice_type | typeFilter}}</template>
        </el-table-column>
        <el-table-column label="评定等级" align="center">
          <template slot-scope="scope">{{scope.row.advice_rate | rateFilter}}</template>
        </el-table-column>
        <el-table-column property="advice_remark" label="补充意见" align="center" min-width="150px"></el-table-column>
        <el-table-column label="图片类型" align="center">
          <template slot-scope="scope">{{scope.row.type | picTypeFilter}}</template>
        </el-table-column>
        <el-table-column label="图片" align="center">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.imgs_url"
              type="text"
              size="small"
              @click="handlePreview(scope.row.imgs_url)"
            >{{scope.row.imgs_url | picFilter}}</el-button>
            <span v-else>无</span>
          </template>
        </el-table-column>
      </el-table>

      <el-image-viewer v-if="showViewer" :on-close="closeViewer" :url-list="srcList" />
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
    </el-main>
  </el-container>
</template>
<script>
import axios from "../../../util/api";
import { local } from "../../../util/util";
import { mapState } from "vuex";
import ElImageViewer from "element-ui/packages/image/src/image-viewer";
export default {
  components: { ElImageViewer },
  data() {
    return {
      page: {
        pager_offset: "0",
        pager_openset: "10",
        company_code: "",
        device_code: "",
        advice_rate: "",
        advice_type: ""
      },
      typeOptions: [
        { label: "资证不齐", value: "1" },
        { label: "现场卫生不规范", value: "2" },
        { label: "人员卫生不规范", value: "3" },
        { label: "追溯记录不符合要求", value: "4" },
        { label: "无违规", value: "5" }
      ],
      rateOptions: [
        { label: "优秀", value: "4" },
        { label: "良好", value: "3" },
        { label: "一般", value: "2" },
        { label: "差", value: "1" }
      ],
      total: 0,
      tableData: [],
      user: "",
      showViewer: false,
      srcList: []
    };
  },
  filters: {
    typeFilter(type) {
      const typeMap = {
        1: "资证不齐",
        2: "现场卫生不规范",
        3: "人员卫生不规范",
        4: "追溯记录不符合要求",
        5: "无违规"
      };
      return typeMap[type];
    },
    rateFilter(rate) {
      const rateMap = {
        1: "差",
        2: "一般",
        3: "良好",
        4: "优秀"
      };
      return rateMap[rate];
    },
    picTypeFilter(type) {
      const typeMap = {
        1: "现场",
        2: "抓拍"
      };
      return typeMap[type];
    },
    picFilter(str) {
      const picList = JSON.parse(str);
      let buttonDesc = "查看 " + picList.length + " 张";
      return buttonDesc;
    }
  },
  mounted() {
    this.user = local.get("user");
    this.page.company_code = this.$route.query.id;
    this.page.device_code = this.$route.query.deviceCode
      ? this.$route.query.deviceCode
      : "";
    this.init(this.page);
  },
  methods: {
    init(params) {
      axios.get("/api/advice/list", params).then(v => {
        this.tableData = v.advice_list;
        this.total = v.pager_count;
      });
    },
    // 搜索
    onSearch() {
      this.page.pager_offshet = "0";
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
    handlePreview(urls) {
      this.srcList = JSON.parse(urls);
      this.onPreview();
    },
    onPreview() {
      this.showViewer = true;
    },
    closeViewer() {
      this.showViewer = false;
    }
  }
};
</script>
<style lang="scss" scoped>
.shopList {
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


