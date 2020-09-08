<template>
  <el-container class="structure">
    <el-header class="box add bb">
      <h5 class="mb10">
        <span class="lines"></span>组织架构图
      </h5>
    </el-header>
    <el-main class="pt0">
      <el-row class="box search mt20" :gutter="10">
        <el-form :inline="true" :model="page" class="demo-form-inline">
          <el-col :span="4">
            <el-form-item size="small">
              <el-select
                v-model="provinceTemp"
                placeholder="请选择省级"
                clearable
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
              <el-select
                v-model="cityTemp"
                clearable
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
              <el-select
                v-model="areaTemp"
                clearable
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
              <el-select
                v-model="townTemp"
                clearable
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
              <el-select
                v-model="villTemp"
                clearable
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
          <el-col :span="1" class="tl mr10">
            <el-form-item size="small">
              <el-button type="primary" @click="onSearch" class="general_bgc general_border cfff">查询</el-button>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="2" class="tl mr10">
            <el-form-item size="small">
              <el-button @click="onClear">清空筛选</el-button>
            </el-form-item>
          </el-col>-->
        </el-form>
      </el-row>
      <div class="mt10">
        <el-container style="border: 1px solid #eee">
          <el-aside width="200px" style="background-color:#f7f8f9">
            <el-menu v-if="departmentList.length>0" style="background:transparent" :default-active="activeIndex" :active="activeIndex">
              <el-menu-item
                v-for="(department,index) in departmentList"
                :key="index"
                :index="department.department_code"
                @click="initUser(department.department_code)"
              >{{department.department_name}}</el-menu-item>
            </el-menu>
            <div v-else class="p15">暂无监管部门信息</div>
          </el-aside>

          <el-container>
            <el-main>
              <div v-if="supervisorList.length>0 || gridOperatorList.length>0">
                <template v-if="supervisorList.length>0">
                  <el-divider content-position="left">
                    <el-tag style="font-size:16px;">监管人员</el-tag>
                  </el-divider>
                  <el-row :gutter="20" class="mt20">
                    <el-col :span="4" v-for="(supervisor,index) in supervisorList" :key="index" class="mb10">
                      <div class="user-block">
                        <img :src="userAvatar" alt="头像" />
                        <span>{{supervisor.user_name}}</span>
                      </div>
                    </el-col>
                  </el-row>
                </template>

                <template v-if="gridOperatorList.length>0">
                  <el-divider content-position="left">
                    <el-tag style="font-size:16px;">网格信息员</el-tag>
                  </el-divider>
                  <el-row :gutter="20" class="mt20">
                    <el-col :span="4" v-for="(gridOperator,index) in gridOperatorList" :key="index" class="mb10">
                      <div class="user-block">
                        <img :src="userAvatar" alt="头像" />
                        <span>{{gridOperator.user_name}}</span>
                      </div>
                    </el-col>
                  </el-row>
                </template>
              </div>
              <div v-else>暂无人员信息</div>
            </el-main>
          </el-container>
        </el-container>
      </div>
    </el-main>
  </el-container>
</template>
<script>
import axios from "../../../util/api";
import { local } from "../../../util/util";
import { mapGetters } from "vuex";
import userAvatar from "../../../assets/image/user-avatar.png";
export default {
  data() {
    return {
      page: {},
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
      userData: {},
      department_code:'',
      departmentList: [],
      supervisorList: [],
      gridOperatorList: [],
      userAvatar,
      activeIndex:''
    };
  },
  filters: {},
  computed: {},
  mounted() {
    this.userData = local.get("user");
    // this.userData = {
    //   user_level: 5,
    //   province: "四川省",
    //   city: "成都市",
    //   area: "双流区",
    //   town: "中和街道办",
    //   vill: "劲松社区居委会",
    // };
   
    this.handleUserLevel(this.userData);
      this.initDepartmentData();
  },
  methods: {
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
    },
    initDepartmentData() {
      this.activeIndex=''
      let params = {
        pager_offset: "0",
        pager_openset: "200",
        province: this.provinceTemp.region_name,
        city: this.cityTemp.region_name,
        area: this.areaTemp.region_name,
        town: this.townTemp.region_name,
        vill: this.villTemp.region_name
      };
      axios.get("/api/department/list", params).then(response => {
        let res = response.department_list;
        this.departmentList = res;
        if(this.departmentList.length>0){
          if(this.userData.department!=null&&this.userData.department!=''){
        this.departmentList.forEach(item=>{
          if(item.department_code==this.userData.department.department_code){
             this.activeIndex=item.department_code;
          }
        })
        }else{
          this.activeIndex=res[0].department_code;
        }
       
           this.initUser(this.activeIndex); 
        }else{
          this.activeIndex='';
          this.supervisorList=[];
           this.gridOperatorList=[]
        }
          
      });
    },
    // 搜索
    onSearch() {
      this.initDepartmentData();
    },
    onClear() {
      this.resetPage();
      this.provinceTemp = "";
      this.cityTemp = "";
      this.areaTemp = "";
      this.townTemp = "";
      this.villTemp = "";
      this.init(this.page);
    },
    initUser(department_code) {
      this.initSupervisorData(department_code);
      this.initGridOperatorData(department_code);
    },
    initSupervisorData(department_code) {
      let params = {
        pager_offset: "0",
        pager_openset: "200",
        state: "",
        department_code
      };
      axios.get("/api/departmentUser/list", params).then(response => {
        let res = response.department_user_list;
        this.supervisorList = res;
      });
    },
    initGridOperatorData(department_code) {
      let params = {
        department_code
      };
      axios.get("/api/infoRegion/department", params).then(response => {
        let res = response.info_region_list;
        this.gridOperatorList = res;
      });
    },
    async handleChange(item, type) {
        let  regionData;
     if(item.region_code==undefined){
        regionData=''
     }else{
       regionData =  await this.fetchRegionData(type, item.region_code);
     }
      switch (type) {
        case 2:
          this.cityOptions = regionData;
          this.areaOptions = [];
          this.townOptions = [];
          this.villOptions = [];
          // this.page.province = item.region_name;
          // this.page.city = "";
          // this.page.area = "";
          // this.page.town = "";
          // this.page.vill = "";
          this.cityTemp = "";
          this.areaTemp = "";
          this.townTemp = "";
          this.villTemp = "";
          break;
        case 3:
          this.areaOptions = regionData;
          this.townOptions = [];
          this.villOptions = [];
          // this.page.city = item.region_name;
          // this.page.area = "";
          // this.page.town = "";
          // this.page.vill = "";
          this.areaTemp = "";
          this.townTemp = "";
          this.villTemp = "";
          break;
        case 4:
          this.townOptions = regionData;
          this.villOptions = [];
          // this.page.area = item.region_name;
          // this.page.town = "";
          // this.page.vill = "";
          this.townTemp = "";
          this.villTemp = "";
          break;
        case 5:
          this.villOptions = regionData;
          // this.page.town = item.region_name;
          // this.page.vill = "";
          this.villTemp = "";
          break;
        case 6:
          // this.page.vill = item.region_name;
          break;
      }
      this.onSearch()
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
  .user-block {
    text-align: center;
    vertical-align: middle;
    span {
      display: block;
    }
  }
  // .el-menu .is-active {
  //   border-left: 3px solid #2ec68a;
  // }
  .el-menu .is-active:before {
    content: " ";
    border-left: 3px solid #2ec68a;
    display: inline-block;
    height: 18px;
    position: absolute;
    top: 50%;
    left: 0;
    margin-top: -8px;
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

