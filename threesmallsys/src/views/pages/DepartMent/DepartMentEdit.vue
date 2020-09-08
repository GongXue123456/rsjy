<template>
  <el-container class="patroladd">
    <el-header class="box add bb">
      <h5 class="mb10">
        <span class="lines"></span>新增监管部门
      </h5>
      <div>
        <el-button class size="small" type="primary" @click="submitForm()">提交</el-button>
        <el-button class="back_btn" size="small" plain @click="$router.back()">返回</el-button>
      </div>
    </el-header>
    <el-main class="pt0">
      <el-form :inline="true" status-icon ref="form" :model="form" class="demo-ruleForm">
        <el-row class="box mt20 f14">
          <el-col :span="24" class="patroladd-title bgcfbe tl mb20 pl15">监管部门信息</el-col>

          <el-col :span="9" class="tl" :offset="1">
            <el-form-item
              class="w"
              label-width="120px"
              label="监管部门名称："
              size="small"
              prop="department_name"
              :rules="[{required: true,message: '必填项', trigger: 'blur' }]"
            >
              <el-input
                placeholder="监管部门名称"
                v-model="form.department_name"
                class="input-with-select"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="22" class="tl" :offset="1">
            <el-row class="box mt20 f14">
              <el-form-item class="w" label-width="120px" label="所在地址：" size="small">
                <el-col :span="4">
                  <el-form-item size="small">
                    <el-select
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
                    <el-select
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
                    <el-select
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
                    <el-select
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
                    <el-select
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
              </el-form-item>
            </el-row>
          </el-col>

          <el-col :span="22" class="tl" :offset="1">
            <el-form-item class="w" label-width="120px" label="管理区域：" size="small">
              <template v-if="townOptions.length>0">
                <el-checkbox
                  :indeterminate="isIndeterminate"
                  v-model="checkAll"
                  @change="handleCheckAllChange"
                >全选</el-checkbox>
                <div style="margin: 15px 0;"></div>
                <el-checkbox-group v-model="checkedList" @change="handleCheckedChange">
                  <el-checkbox
                    v-for="(town,index) in townOptions"
                    :label="town.region_code"
                    :key="index"
                  >{{town.region_name}}</el-checkbox>
                </el-checkbox-group>
              </template>
              <span v-else>至少选择区县后显示</span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-main>
  </el-container>
</template>
<script>
import axios from "../../../util/api";
import { local } from "../../../util/util";

export default {
  data() {
    return {
      form: {
        department_code: "",
        department_name: "",
        province: "",
        city: "",
        area: "",
        town: "",
        vill: "",
        region_codes: ""
      },
      department: {},
      regionList: [],
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
      checkAll: false,
      checkedList: [],
      isIndeterminate: false
    };
  },
  async mounted() {
    this.userData = local.get("user");
    // this.userData = {
    //   user_level: 5,
    //   province: "四川省",
    //   city: "成都市",
    //   area: "双流区",
    //   town: "中和街道办",
    //   vill: "劲松社区居委会",
    // };
    await this.init({ department_code: this.$route.query.id });
  },
  methods: {
    init(params) {
      axios.get("/api/department/single", params).then(response => {
        this.department = response.department;
        this.form.department_code = response.department.department_code;
        this.form.department_name = response.department.department_name;
        this.regionList = response.region_list;
        this.handleUserLevel(this.userData, this.department);
      });
    },
    async handleUserLevel(userData, department) {
      if (parseInt(userData.user_level) > 0 || department.province) {
        this.provinceOptions = await this.fetchRegionData(1);
        let province = this.provinceOptions.find(
          item =>
            item.region_name ==
            (department.province ? userData.province : department.province)
        );
        this.provinceTemp = province;
        if (parseInt(userData.user_level) >= 1 || department.city) {
          this.cityOptions = await this.fetchRegionData(
            2,
            province.region_code
          );
          let city = this.cityOptions.find(
            item =>
              item.region_name ==
              (userData.city ? userData.city : department.city)
          );
          if (parseInt(userData.user_level) >= 1) this.provinceFlag = true;
          if (parseInt(userData.user_level) >= 2 || department.area) {
            this.areaOptions = await this.fetchRegionData(3, city.region_code);
            let area = this.areaOptions.find(
              item =>
                item.region_name ==
                (userData.area ? userData.area : department.area)
            );
            this.cityTemp = city;
            if (parseInt(userData.user_level) >= 2) this.cityFlag = true;
            if (parseInt(userData.user_level) >= 3 || department.town) {
              this.townOptions = await this.fetchRegionData(
                4,
                area.region_code
              );
              let town = this.townOptions.find(
                item =>
                  item.region_name ==
                  (userData.town ? userData.town : department.town)
              );
              this.areaTemp = area;
              if (parseInt(userData.user_level) >= 3) this.areaFlag = true;
              if (parseInt(userData.user_level) >= 4 || department.vill) {
                this.villOptions = await this.fetchRegionData(
                  5,
                  town.region_code
                );
                let vill = this.villOptions.find(
                  item =>
                    item.region_name ==
                    (userData.vill ? userData.vill : department.vill)
                );
                this.townTemp = town;
                if (parseInt(userData.user_level) >= 4) this.townFlag = true;
                if (parseInt(userData.user_level) >= 5 || department.vill) {
                  this.villTemp = vill;
                  if (parseInt(userData.user_level) >= 5) this.villFlag = true;
                }
              }
            }
          }
        }
      }
      this.checkedList = this.regionList.map(item => item.region_code);
      this.handleCheckedChange(this.checkedList);
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
    async handleChange(item, type) {
      let regionData = await this.fetchRegionData(type, item.region_code);
      switch (type) {
        case 2:
          this.cityOptions = regionData;
          this.areaOptions = [];
          this.townOptions = [];
          this.villOptions = [];
          this.cityTemp = "";
          this.areaTemp = "";
          this.townTemp = "";
          this.villTemp = "";
          break;
        case 3:
          this.areaOptions = regionData;
          this.townOptions = [];
          this.villOptions = [];
          this.areaTemp = "";
          this.townTemp = "";
          this.villTemp = "";
          break;
        case 4:
          this.townOptions = regionData;
          this.villOptions = [];
          this.townTemp = "";
          this.villTemp = "";
          break;
        case 5:
          this.villOptions = regionData;
          this.form.town = item.region_name;
          this.villTemp = "";
          break;
        case 6:
          this.form.vill = item.region_name;
          break;
      }
    },
    handleCheckAllChange(val) {
      this.checkedList = val
        ? this.townOptions.map(item => item.region_code)
        : [];
      this.isIndeterminate = false;
    },
    handleCheckedChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.townOptions.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.townOptions.length;
    },
    submitForm() {
      let checkedList = this.checkedList.map(item =>
        JSON.stringify(item).replace(/\"/g, "'")
      );
      this.form.region_codes = checkedList.toString();
      this.form.province = this.provinceTemp.region_name;
      this.form.city = this.cityTemp.region_name;
      this.form.area = this.areaTemp.region_name;
      this.form.town = this.townTemp.region_name;
      this.form.vill = this.villTemp.region_name;
      axios.get("/api/department/exist", this.form).then(v => {
        axios.put("/api/department/update", this.form).then(v => {
          this.$router.back();
        });
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.patroladd {
  overflow-x: hidden;
  .add {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .el-image {
    width: 160px;
    height: 160px;
    margin-right: 10px;
  }
  .back_btn {
    background: rgba(247, 248, 249, 1);
    border: 1px solid rgba(217, 222, 225, 1);
  }
  .patroladd-title {
    height: 34px;
    line-height: 34px;
    border-left: 2px solid #788287;
  }
  /* .el-form-item--small .el-form-item__content{width: 80%} */
}
</style>
