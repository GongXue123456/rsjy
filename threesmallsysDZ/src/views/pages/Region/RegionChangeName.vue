<template>
  <el-container class="patroladd">
    <el-header class="box add bb">
      <h5 class="mb10">
        <span class="lines"></span>更新区域名称
      </h5>
      <div>
        <el-button class size="small" type="primary" @click="submitForm('form')">提交</el-button>
      </div>
    </el-header>
    <el-main class="pt0">
      <el-form :inline="true" status-icon ref="form" :model="form" class="demo-ruleForm">
        <el-row class="box mt20 f14">
          <el-col :span="24" class="patroladd-title bgcfbe tl mb20 pl15">变更区域信息</el-col>
          <el-col :span="22" class="tl" :offset="1">
            <el-row class="box mt20 f14">
              <el-form-item class="w" label-width="120px" label="需变更的区域：" size="small">
                <el-col :span="4">
                  <el-form-item size="small">
                    <el-select
                      v-model="provinceTemp"
                      placeholder="请选择省级"
                      @change="handleChange($event,2)"
                      value-key="region_name"
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

          <el-col :span="9" class="tl" :offset="1">
            <el-form-item
              class="w"
              label-width="120px"
              label="区域新名称："
              size="small"
              prop="region_name"
              :rules="[{required: true,message: '必填项', trigger: 'blur' }]"
            >
              <el-input placeholder="变更后的名称" v-model="form.region_name" class="input-with-select"></el-input>
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
        region_code: "",
        region_name: "",
        region_type: 1,
        region_province: "",
        region_city: "",
        region_area: "",
        region_town: "",
        region_vill: ""
      },
      provinceTemp: "",
      cityTemp: "",
      areaTemp: "",
      townTemp: "",
      villTemp: "",
      provinceOptions: [],
      cityOptions: [],
      areaOptions: [],
      townOptions: [],
      villOptions: [],
      userData: {}
    };
  },
  mounted() {
    this.userData = {
      user_level: 1,
      province: "四川省",
      city: "",
      area: "",
      town: "",
      vill: "",
    };
    this.handleDefaultRegion(this.userData);
  },
  methods: {
    async handleDefaultRegion(userData) {
      if (parseInt(userData.user_level) > 0) {
        this.provinceOptions = await this.fetchRegionData(1);
        let province = this.provinceOptions.find(
          item => item.region_name == userData.province
        );
        this.provinceTemp = province;
        this.form.region_type = 1;        
        this.form.region_code = province.region_code;        
        if (parseInt(userData.user_level) >= 1) {
          this.cityOptions = await this.fetchRegionData(
            2,
            province.region_code
          );
          let city = this.cityOptions.find(
            item => item.region_name == userData.city
          );
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
    async handleChange(item, type) {
      let regionData = await this.fetchRegionData(type, item.region_code);
      this.form.region_type = type - 1;
      this.form.region_code = item.region_code;
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
          // this.form.town = item.region_name;
          this.villTemp = "";
          break;
        case 6:
          // this.form.vill = item.region_name;
          break;
      }
    },
    submitForm(formInline) {
      this.$refs[formInline].validate((valid) => {
        if (valid) {
          let html = '您确定把【' ;
          let rarea = this.provinceTemp.region_name;
          this.form.region_province = this.provinceTemp.region_name;
          if(this.cityTemp.region_name !== undefined){
            rarea+= this.cityTemp.region_name;
            this.form.region_city = this.cityTemp.region_name;
          }
          if(this.areaTemp.region_name !== undefined){
            rarea+= this.areaTemp.region_name;
            this.form.region_area = this.areaTemp.region_name;
          }
          if(this.townTemp.region_name !== undefined){
            rarea+= this.townTemp.region_name;
            this.form.region_town = this.townTemp.region_name;
          }
          if(this.villTemp.region_name !== undefined){
            rarea+= this.villTemp.region_name;
            this.form.region_vill = this.villTemp.region_name;
          }
          let rareanew = '';
          if(this.form.region_type > 1){
            rareanew = this.provinceTemp.region_name;
          }
          if(this.form.region_type > 2){
            rareanew += this.cityTemp.region_name;
          }
          if(this.form.region_type > 3){
            rareanew += this.areaTemp.region_name;
          }
          if(this.form.region_type > 4){
            rareanew += this.townTemp.region_name;
          }
          html+= rarea+ '】变更为【' + rareanew + this.form.region_name + '】';
          let forma = this.form;
          this.$confirm(html, '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
              center: true
            }).then(() => {
              axios.post("/api/region/changeName", this.form).then(v => {
                this.form.region_name = '';
                this.form.region_code = '';
                this.form.region_type = 1;
                this.form.region_province = '';
                this.form.region_city = '';
                this.form.region_area = '';
                this.form.region_town = '';
                this.form.region_vill = '';
                this.provinceTemp = '';
                this.cityTemp = '';
                this.areaTemp = '';
                this.townTemp = '';
                this.villTemp = '';
                this.provinceOptions = [];
                this.cityOptions = [];
                this.areaOptions = [];
                this.townOptions = [];
                this.villOptions = [];
                this.userData = {
                  user_level: 1,
                  province: "四川省",
                  city: "",
                  area: "",
                  town: "",
                  vill: "",
                };
                this.handleDefaultRegion(this.userData);
              });          
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消操作'
              });
            });
        }
      })
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
}
</style>