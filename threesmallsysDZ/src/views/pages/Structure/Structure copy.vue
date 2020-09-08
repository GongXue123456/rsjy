<template>
  <el-container class="structure">
    <el-header class="box add bb">
      <h5 class="mb10">
        <span class="lines"></span>组织架构树形图
      </h5>
    </el-header>
    <el-main class="pt0">
      <div class="mt20">
        <el-tree :indent="0" :props="props" :load="loadNode" lazy></el-tree>
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
      props: {
        label: "name",
        children: "children",
        isLeaf: "leaf"
      }
    };
  },
  filters: {},
  computed: {},
  mounted() {},
  methods: {
    loadNode(node, resolve) {
      if (node.level < 5) {
        this.initRegionData(node, resolve);
      } else if (node.level == 5) {
        this.initDepartmentData(node, resolve);
      } else if (node.level == 6) {
        return resolve([
          {
            name: "监管人员",
            code: node.data.code,
            type: 1
          },
          {
            name: "网格信息员",
            code: node.data.code,
            type: 2
          }
        ]);
      } else if (node.level == 7) {
        if (node.data.type == 1) {
          this.initSupervisorData(node, resolve);
        }else if(node.data.type == 2){
          this.initGridOperatorData(node, resolve);
        }
      }
    },
    async initRegionData(node, resolve) {
      let type = node.level + 1;
      let code = "";
      if (type > 1) {
        code = node.data.code;
      }
      let regionData = await this.fetchRegionData(type, code);
      let nodeData = [];
      regionData.forEach(item => {
        nodeData.push({
          name: item.region_name,
          code: item.region_code
        });
      });
      return resolve(nodeData);
    },
    initDepartmentData(node, resolve) {
      let params = {
        pager_offset: "0",
        pager_openset: "200",
        vill: node.data.name
      };
      axios.get("/api/department/list", params).then(response => {
        let res = response.department_list;
        let total = response.pager_count;
        let department = [];
        res.forEach(item => {
          department.push({
            name: item.department_name,
            code: item.department_code
          });
        });
        return resolve(department);
      });
    },
    initSupervisorData(node, resolve) {
      let params = {
        pager_offset: "0",
        pager_openset: "200",
        department_code: node.data.code,
        state: ""
      };
      axios.get("/api/departmentUser/list", params).then(response => {
        let res = response.department_user_list;
        let total = response.pager_count;
        let supervisor = [];
        res.forEach(item => {
          supervisor.push({
            name: item.user_name,
            code: item.user_code,
            leaf: true
          });
        });
        return resolve(supervisor);
      });
    },
    initGridOperatorData(node, resolve) {
      let params = {
        department_code: node.data.code,
      };
      axios.get("/api/infoRegion/department", params).then(response => {
        let res = response.info_region_list;
        let total = response.pager_count;
        let gridOperator = [];
        res.forEach(item => {
          gridOperator.push({
            name: item.user_name,
            code: item.user_code,
            leaf: true
          });
        });
        return resolve(gridOperator);
      });
    },
    fetchRegionData(type, region_high_code) {
      let region_type = type.toString();
      return new Promise((resolve, reject) => {
        axios
          .get("/api/region/list", { region_type, region_high_code })
          .then(response => {
            resolve(response);
          })
          .catch(err => {
            reject(err);
          });
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.structure {
  overflow-x: hidden;
  .add {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  /deep/ .el-input-group__append .el-button--primary .el-icon-search {
    color: #fff;
  }

  /deep/ .el-tree-node {
    position: relative;
    padding-left: 16px;
  }
  /deep/ .el-tree-node__children {
    padding-left: 16px;
  }
  /deep/ .el-tree-node :last-child:before {
    height: 38px;
  }
  /deep/ .el-tree > .el-tree-node:before {
    border-left: none;
  }
  /deep/ .el-tree > .el-tree-node:after {
    border-top: none;
  }
  /deep/ .el-tree-node:before,
  /deep/ .el-tree-node:after {
    content: "";
    left: -4px;
    position: absolute;
    right: auto;
    border-width: 1px;
  }
  /deep/ .tree :first-child .el-tree-node:before {
    border-left: none;
  }
  /deep/ .el-tree-node:before {
    border-left: 1px dashed #4386c6;
    bottom: 0px;
    height: 100%;
    top: -26px;
    width: 1px;
  }
  /deep/ .el-tree-node:after {
    border-top: 1px dashed #4386c6;
    height: 20px;
    top: 12px;
    width: 24px;
  }
}
</style>

