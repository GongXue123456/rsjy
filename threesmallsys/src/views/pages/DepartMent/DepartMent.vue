<template>
  <el-container class="shopList">
    <el-header class="box add bb">
      <h5 class="mb10">
        <span class="lines"></span>监管部门管理
      </h5>
      <div>
        <el-button
          class
          icon="el-icon-plus"
          size="small"
          type="primary"
          @click="$router.push({path: 'department/add'})"
        >新增监管部门</el-button>
      </div>
    </el-header>
    <el-main class="pt0">
      <el-row class="box search mt20" :gutter="10">
        <el-form :inline="true" :model="page" class="demo-form-inline">
          <el-col :span="4">
            <el-form-item size="small">
              <el-input clearable
              @clear='onSearch'
                placeholder="请输入监管部门"
                v-model="page.department_name"
                class="input-with-select"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item size="small">
              <el-select clearable
                v-model="provinceTemp"
                placeholder="请选择省级"
                @change="handleChange($event,2)"
                value-key="region_name"
                :disabled="provinceFlag"
              >
                <el-option
                  v-for="item in provinceOptions"
                  :key="item.region_code"
                  :label="item.region_name"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item size="small">
              <el-select clearable
                v-model="cityTemp"
                placeholder="请选择市级"
                @change="handleChange($event,3)"
                value-key="region_name"
                :disabled="cityFlag"
              >
                <el-option
                  v-for="item in cityOptions"
                  :key="item.region_code"
                  :label="item.region_name"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item size="small">
              <el-select clearable
                v-model="areaTemp"
                placeholder="请选择区县级"
                @change="handleChange($event,4)"
                value-key="region_name"
                :disabled="areaFlag"
              >
                <el-option
                  v-for="item in areaOptions"
                  :key="item.region_code"
                  :label="item.region_name"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item size="small">
              <el-select clearable
                v-model="townTemp"
                placeholder="请选择镇级"
                @change="handleChange($event,5)"
                value-key="region_name"
                :disabled="townFlag"
              >
                <el-option
                  v-for="item in townOptions"
                  :key="item.region_code"
                  :label="item.region_name"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item size="small">
              <el-select clearable
                v-model="villTemp"
                placeholder="请选择村级"
                value-key="region_name"
                @change="handleChange($event,6)"
                :disabled="villFlag"
              >
                <el-option
                  v-for="item in villOptions"
                  :key="item.region_code"
                  :label="item.region_name"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="4">
             <el-form-item size="small" >
         <el-input placeholder="请输入监管人员" v-model="departmentPage.user_name" class="input-with-select">
      
            </el-input>
        </el-form-item>
        </el-col>
        <el-col :span="4">
             <el-form-item size="small" >
         <el-input placeholder="请输入网格信息员" v-model="departmentPage.user_info_name" class="input-with-select">
   
            </el-input>
        </el-form-item>
          </el-col>-->
          <el-col :span="2" class="tl mr10">
            <el-form-item size="small">
              <el-button type="primary" @click="onSearch" class="general_bgc general_border cfff">查询</el-button>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="2" class="tl mr10">
            <el-form-item size="small">
              <el-button @click="onClear">清空筛选</el-button>
            </el-form-item>
          </el-col> -->
        </el-form>
      </el-row>
      <div class="box list">
        <el-table border :data="tableData" style="width: 100%" fit>
          <el-table-column type="index" width="120" label="序号" align="center"></el-table-column>
          <el-table-column prop="department_name" label="监管部门名称" align="center"></el-table-column>
          <el-table-column label="监管部门所在地址" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.province}}{{scope.row.city}}{{scope.row.area}}{{scope.row.town}}{{scope.row.vill}}</span>
            </template>
          </el-table-column>
          <!-- <el-table-column prop="user_name"  label="监管人员"></el-table-column>
          <el-table-column prop="user_info_name" label="网格信息员"> </el-table-column>-->
          <el-table-column label="操作" fixed="right" width="120px" align="center">
            <template slot-scope="scope">
              <el-button
                type="text"
                class="general_color"
                size="small"
                @click="toEdit(scope.row)"
              >编辑</el-button>
              <el-button type="text" class="cac" size="small" @click="toSupervisor(scope.row)">监管员</el-button>
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
import { local } from "../../../util/util";

export default {
  data() {
    return {
      page: {
        pager_offset: "0",
        pager_openset: "10",
        department_name: "",
        province: "",
        city: "",
        area: "",
        town: "",
        vill: ""
      },
      provinceTemp: "",
      cityTemp: "",
      areaTemp: "",
      townTemp: "",
      villTemp: "",
      provinceFlag: false,
      cityFlag: false,
      areaFlag: false,
      townFlag: false,
      villFlag: false,
      provinceOptions: [],
      cityOptions: [],
      areaOptions: [],
      townOptions: [],
      villOptions: [],
      currentPage: 1,
      total: 0,
      tableData: [],
      userData:{},
      activeName: "1"
    };
  },
  computed: {
    ...mapGetters({
      departmentPage: "department/departmentPage"
    })
  },
  mounted() {
    this.userData = local.get("user");
    this.page = Object.assign({}, this.departmentPage);
    this.currentPage =
      parseInt(this.page.pager_offset) / parseInt(this.page.pager_openset) + 1;
    this.init(this.page);
    this.handleUserLevel(this.userData);
  },
  methods: {
    init(params) {
      axios.get("/api/department/list", params).then(v => {
        this.tableData = v.department_list;
        this.total = v.pager_count;
      });
    },
    async handleUserLevel(userData) {
      if (parseInt(userData.user_level) > 0) {
        this.provinceOptions = await this.fetchRegionData(1);
        let province = this.provinceOptions.find(
          item => item.region_name == userData.province
        );
        this.provinceTemp = province;
        if (parseInt(userData.user_level) >= 1&&userData.province!=null) {
          this.cityOptions = await this.fetchRegionData(2,province.region_code);
          let city = this.cityOptions.find(item => item.region_name == userData.city );
          this.provinceFlag = true;
          if (parseInt(userData.user_level) >= 2&&userData.city!=null) {
            this.areaOptions = await this.fetchRegionData(3, city.region_code);
            let area = this.areaOptions.find(
              item => item.region_name == userData.area
            );
            this.cityTemp = city;
            this.cityFlag = true;
            if (parseInt(userData.user_level) >= 3&&userData.area!=null) {
              this.townOptions = await this.fetchRegionData(4,area.region_code);
              let town = this.townOptions.find(
                item => item.region_name == userData.town
              );
              this.areaTemp = area;
              this.areaFlag = true;
              if (parseInt(userData.user_level) >= 4&&userData.town!=null) {
                this.villOptions = await this.fetchRegionData(5,town.region_code);
                let vill = this.villOptions.find(
                  item => item.region_name == userData.vill
                );
                this.townTemp = town;
                this.townFlag = true;
                if (parseInt(userData.user_level) >= 5&&userData.vill!=null) {
                  this.villTemp = vill;
                  this.villFlag = true;
                }
              }
            }
          }
        }
      }
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
      //  }
      
    },
    resetPage() {
      this.page = {
        pager_offset: "0",
        pager_openset: "10",
        department_name: "",
        province: "",
        city: "",
        area: "",
        town: "",
        vill: ""
      };
    },
    // 搜索
    onSearch() {
        this.currentPage = 1;
      this.page.pager_offset = "0";
      this.init(this.page);
    },
    // onClear() {

    //   this.resetPage();
    //   this.provinceTemp = "";
    //   this.cityTemp = "";
    //   this.areaTemp = "";
    //   this.townTemp = "";
    //   this.villTemp = "";
    //    this.currentPage = 1;
    //   this.init(this.page);
    // },
    handleCurrentChange(val) {
        this.currentPage = val;
      this.page.pager_offset = (val - 1) * this.page.pager_openset + "";
      this.init(this.page);
    },
    handleSizeChange(val) {
      this.page.pager_openset = val + "";
      this.init(this.page);
    },
    async handleChange(item, type) {
       let  regionData;
     if(item.region_code==undefined){
        regionData=''
     }else{
       regionData = await this.fetchRegionData(type, item.region_code);
     }
      
      switch (type) {
        case 2:
          this.cityOptions = regionData;
          this.areaOptions = [];
          this.townOptions = [];
          this.villOptions = [];
          this.page.province = item.region_name;
          this.page.city = "";
          this.page.area = "";
          this.page.town = "";
          this.page.vill = "";
          this.cityTemp = "";
          this.areaTemp = "";
          this.townTemp = "";
          this.villTemp = "";
          break;
        case 3:
          this.areaOptions = regionData;
          this.townOptions = [];
          this.villOptions = [];
          this.page.city = item.region_name;
          this.page.area = "";
          this.page.town = "";
          this.page.vill = "";
          this.areaTemp = "";
          this.townTemp = "";
          this.villTemp = "";
          break;
        case 4:
          this.townOptions = regionData;
          this.villOptions = [];
          this.page.area = item.region_name;
          this.page.town = "";
          this.page.vill = "";
          this.townTemp = "";
          this.villTemp = "";
          break;
        case 5:
          this.villOptions = regionData;
          this.page.town = item.region_name;
          this.page.vill = "";
          this.villTemp = "";
          break;
        case 6:
          this.page.vill = item.region_name;
          break;
      }
      this.onSearch()
    },
    toSupervisor(row) {
      this.$router.push({
        name: "Supervisor",
        query: {
          id: row.department_code
        }
      });
    },
    toEdit(row) {
      this.$router.push({
        name: "DepartMentEdit",
        query: {
          id: row.department_code
        }
      });
    }
  },
  beforeRouteLeave(to, from, next) {
    if (
      to.name == "DepartMentAdd" ||
      to.name == "DepartMentEdit" ||
      to.name == "Supervisor"
    ) {
      this.$store.dispatch("department/setDepartmentPage", this.page);
      next();
    } else {
      this.resetPage();
      this.$store.dispatch("department/setDepartmentPage", this.page);
      next();
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
