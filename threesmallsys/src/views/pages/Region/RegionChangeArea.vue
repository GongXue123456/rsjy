<template>
  <el-container class="patroladd">
    <el-header class="box add bb">
      <h5 class="mb10">
        <span class="lines"></span>变更归属
      </h5>
      <div>
        <el-button class size="small" type="primary" @click="submitForm('form')">提交</el-button>
      </div>
    </el-header>
    <el-main class="pt0">
      <el-form :inline="true" status-icon ref="form" :model="form" class="demo-ruleForm">
        <el-row class="box mt20 f14">
          <el-col :span="24" class="patroladd-title bgcfbe tl mb20 pl15">待变更区域信息</el-col>
          <el-col :span="22" class="tl" :offset="1">
            <el-row class="box mt20 f14">
              <el-form-item class="w" label-width="120px" label="待变更区域：" size="small">
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
                <el-col :span="8">
                  <el-form-item size="small">
                    <el-select
                      v-model="villTemp"
                      multiple
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
        </el-row>
        <el-row class="box mt20 f14">
          <el-col :span="24" class="patroladd-title bgcfbe tl mb20 pl15">变更后区域信息</el-col>
          <el-col :span="22" class="tl" :offset="1">
            <el-row class="box mt20 f14">
              <el-form-item class="w" label-width="120px" label="变更后区域：" size="small">
                <el-col :span="4">
                  <el-form-item size="small">
                    <el-select
                      v-model="provinceTempTwo"
                      placeholder="请选择省级"
                      @change="handleChangeTwo($event,2)"
                      value-key="region_name"
                    >
                      <el-option
                        v-for="item in provinceOptionsTwo"
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
                      v-model="cityTempTwo"
                      placeholder="请选择市级"
                      @change="handleChangeTwo($event,3)"
                      value-key="region_name"
                    >
                      <el-option
                        v-for="item in cityOptionsTwo"
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
                      v-model="areaTempTwo"
                      placeholder="请选择区县级"
                      @change="handleChangeTwo($event,4)"
                      value-key="region_name"
                    >
                      <el-option
                        v-for="item in areaOptionsTwo"
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
                      v-model="townTempTwo"
                      placeholder="请选择镇级"
                      @change="handleChangeTwo($event,5)"
                      value-key="region_name"
                    >
                      <el-option
                        v-for="item in townOptionsTwo"
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
        region_type: 1,
        region_high_code: "C0",
        region_province: "",
        region_city: "",
        region_area: "",
        region_town: "",
        region_vill: "",
        region_province_new: "",
        region_city_new: "",
        region_area_new: "",
        region_town_new: "",
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
      provinceTempTwo: "",
      cityTempTwo: "",
      areaTempTwo: "",
      townTempTwo: "",
      provinceOptionsTwo: [],
      cityOptionsTwo: [],
      areaOptionsTwo: [],
      townOptionsTwo: [],
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
        this.form.region_code =  "'" + province.region_code + "'";     
        if (parseInt(userData.user_level) >= 1) {
          this.cityOptions = await this.fetchRegionData(
            2,
            province.region_code
          );
        }

        this.provinceOptionsTwo = this.provinceOptions;
        let provinceTwo = this.provinceOptionsTwo.find(
          item => item.region_name == userData.province
        );
        this.provinceTempTwo = provinceTwo;
        this.form.region_type = 1;        
        this.form.region_high_code = provinceTwo.region_code;
        if (parseInt(userData.user_level) >= 1) {
          this.cityOptionsTwo = await this.fetchRegionData(
            2,
            provinceTwo.region_code
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
          this.villTemp = "";
          break;
        case 6:
          break;
      }
    },
    async handleChangeTwo(item, type) {
      let regionData = await this.fetchRegionData(type, item.region_code);
      this.form.region_high_code = item.region_code;
      switch (type) {
        case 2:
          this.cityOptionsTwo = regionData;
          this.areaOptionsTwo = [];
          this.townOptionsTwo = [];
          this.villOptionsTwo = [];
          this.cityTempTwo = "";
          this.areaTempTwo = "";
          this.townTempTwo = "";
          break;
        case 3:
          this.areaOptionsTwo = regionData;
          this.townOptionsTwo = [];
          this.villOptionsTwo = [];
          this.areaTempTwo = "";
          this.townTempTwo = "";
          break;
        case 4:
          this.townOptionsTwo = regionData;
          this.villOptionsTwo = [];
          this.townTempTwo = "";
          break;
        case 5:
          break;
      }
    },
    submitForm(formInline) {
      let aa = this.villTemp;
      let codes = "";
      let onecode = "";
      let names = "";
      let showName = "";
      if(aa.length>0){
        aa.forEach(item => {
          codes +="'" + item.region_code + "',";
          names +="'" + item.region_name + "',";
          showName += item.region_name + "，";
        });
        codes = codes.substring(0,codes.length-1);
        names = names.substring(0,names.length-1);
        showName = showName.substring(0,showName.length-1);
      }
      let html = '您确定把' + this.provinceTemp.region_name;
      this.form.region_province = this.provinceTemp.region_name;
      if(codes.length<1){
        onecode="'" + this.provinceTemp.region_code + "'";
      }
      if(this.cityTemp.region_name !== undefined){
        html += this.cityTemp.region_name;  
        this.form.region_city = this.cityTemp.region_name; 
        if(codes.length<1){
          onecode="'" + this.cityTemp.region_code + "'";
        }
      }
      if(this.areaTemp.region_name !== undefined){
        html += this.areaTemp.region_name;
        this.form.region_area = this.areaTemp.region_name;
        if(codes.length<1){
          onecode="'" + this.areaTemp.region_code + "'";
        }
      }
      if(this.townTemp.region_name !== undefined){
        html += this.townTemp.region_name;
        this.form.region_town = this.townTemp.region_name;
        if(codes.length<1){
          onecode="'" + this.townTemp.region_code + "'";
        }
      }
      
      this.form.region_vill = names;
      this.form.region_code = codes.length<1?onecode:codes;
      if(showName.length>0){
        html += '下【' + showName + '】';
      }else{
        html += '下所有管辖区域';
      }

      let htmlNew = '';
      this.form.region_province_new = this.provinceTempTwo.region_name;
      if(this.cityTempTwo.region_name !== undefined){
        htmlNew += this.cityTempTwo.region_name;  
        this.form.region_city_new = this.cityTempTwo.region_name; 
      }
      if(this.areaTempTwo.region_name !== undefined){
        htmlNew += this.areaTempTwo.region_name;
        this.form.region_area_new = this.areaTempTwo.region_name;
      }
      if(this.townTempTwo.region_name !== undefined){
        htmlNew += this.townTempTwo.region_name;
        this.form.region_town_new = this.townTempTwo.region_name;
      }

      html+= '迁入到新区域【' + htmlNew + '】下';
      this.$confirm(html, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          axios.post("/api/region/changeArea", this.form).then(v => {
            this.form.region_code = '';
            this.form.region_high_code = '';
            this.form.region_type = 1;
            this.form.region_province = '';
            this.form.region_city = '';
            this.form.region_area = '';
            this.form.region_town = '';
            this.form.region_vill = '';
            this.form.region_province_new = '';
            this.form.region_city_new = '';
            this.form.region_area_new = '';
            this.form.region_town_new = '';
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
            this.provinceTempTwo = '';
            this.cityTempTwo = '';
            this.areaTempTwo = '';
            this.townTempTwo = '';
            this.provinceOptionsTwo = [];
            this.cityOptionsTwo = [];
            this.areaOptionsTwo = [];
            this.townOptionsTwo = [];

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