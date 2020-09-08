<template>
  <el-container class="patroladd">
    <el-header class="box add bb">
      <h5 class="mb10">
        <span class="lines"></span>新增区域
      </h5>
      <div>
        <el-button class size="small" type="primary" @click="submitForm('form')">提交</el-button>
      </div>
    </el-header>
    <el-main class="pt0">
      <el-form :inline="true" status-icon ref="form" :model="form" class="demo-ruleForm">
        <el-row class="box mt20 f14">
          <el-col :span="24" class="patroladd-title bgcfbe tl mb20 pl15">新增区域信息</el-col>
          <el-col :span="22" class="tl" :offset="1">
            <el-row class="box mt20 f14">
              <el-form-item class="w" label-width="120px" label="选择新区域归属：" size="small">
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
              </el-form-item>
            </el-row>
          </el-col>

          <el-col :span="9" class="tl" :offset="1">
            <el-form-item
              class="w"
              label-width="120px"
              label="新增区域名称："
              size="small"
              prop="region_name"
              :rules="[{required: true,message: '必填项', trigger: 'blur' },{ pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+$/, message: '不允许输入空格等特殊符号' }]"
            >
              <el-input placeholder="区域名称" v-model="form.region_name" class="input-with-select"></el-input>
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
        region_name: "",
        region_type: 1,
        region_high_code: "C0"
      },
      provinceTemp: "",
      cityTemp: "",
      areaTemp: "",
      townTemp: "",
      provinceOptions: [],
      cityOptions: [],
      areaOptions: [],
      townOptions: [],
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
        this.form.region_type = 2;        
        this.form.region_high_code = province.region_code;        
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
      this.form.region_type = type;        
      this.form.region_high_code = item.region_code;
      switch (type) {
        case 2:
          this.cityOptions = regionData;
          this.areaOptions = [];
          this.townOptions = [];
          this.villOptions = [];
          this.cityTemp = "";
          this.areaTemp = "";
          this.townTemp = "";
          break;
        case 3:
          this.areaOptions = regionData;
          this.townOptions = [];
          this.villOptions = [];
          this.areaTemp = "";
          this.townTemp = "";
          break;
        case 4:
          this.townOptions = regionData;
          this.villOptions = [];
          this.townTemp = "";
          break;
        case 5:
          // this.form.town = item.region_name;
          break;
      }
    },
    submitForm(formInline) {
      this.$refs[formInline].validate((valid) => {
        if (valid) {
          let html = '您确定在' + this.provinceTemp.region_name;
          if(this.cityTemp.region_name !== undefined){
            html+= this.cityTemp.region_name;
          }
          if(this.areaTemp.region_name !== undefined){
            html+= this.areaTemp.region_name;
          }
          if(this.townTemp.region_name !== undefined){
            html+= this.townTemp.region_name;
          }
          html+= '下添加新区域【' + this.form.region_name + '】';
          let dhthis = this;
          this.$confirm(html, '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
              center: true
            }).then(() => {
              axios.post("/api/region/addArea", this.form).then(v => {
                this.form.region_name = "";
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