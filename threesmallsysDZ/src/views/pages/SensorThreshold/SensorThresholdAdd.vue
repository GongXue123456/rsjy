<template>
  <el-container class="camadd">
    <el-header class="box add bb">
      <h5 class="mb10">
        <span class="lines"></span>新增传感器预警项
      </h5>
      <div>
        <el-button class size="small" type="primary" @click="handleSave('dataForm')">提交</el-button>
        <el-button class="back_btn" size="small" plain @click="$router.back()">返回</el-button>
      </div>
    </el-header>
    <el-main class="pt0">
      <el-form 
         ref="dataForm"
        :label-position="labelPosition"
        label-width="150px"
        :model="dataForm"
        :rules="rules"
        class="form-container demo-ruleForm"
      >
        <el-form-item label="预警项中文名称："
           prop='sensor_name'
        >
          <el-input
            v-model="dataForm.sensor_name"
            size="small"
            placeholder="预警项中文名称"
            clearable
          ></el-input>
        </el-form-item>

        <el-form-item label="预警项英文名称："  prop='sensor_enname'>
          <el-input
            v-model="dataForm.sensor_enname"
            size="small"
            clearable
            placeholder="预警项英文名称"
            @blur="exist(dataForm.sensor_enname)"
          ></el-input>
        </el-form-item>

        <el-form-item label="预警最大值：" prop='max_value'>
          <el-input
            v-model="dataForm.max_value"
            size="small"
            placeholder="当监测值大于该值,触发预警"
            clearable
          ></el-input>
        </el-form-item>

        <el-form-item label="预警最小值：" prop='min_value'>
          <el-input
            v-model="dataForm.min_value"
            size="small"
            placeholder="最小值为0,则不触发预警,否则监测值小于该值,触发预警"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="同步频率：" prop='sync_interval'>
          <el-input
            v-model="dataForm.sync_interval"
            size="small"
            placeholder="请输入同步传感器间隔时长"
            clearable
          ></el-input>
        </el-form-item>

        
      </el-form>
      <div class="box list">
        <el-table :data="tableData" style="width: 100%" border fit>
          <el-table-column align="center" prop="name" width="200"  label="内容"></el-table-column>
           <el-table-column prop="remarks"  label="备注" align='center'></el-table-column>
        </el-table>
      </div>
    </el-main>
  </el-container>
</template>
<script>
import axios from "../../../util/api";
import { tengxuncloud } from "../../../util/tengxun";
export default {
  data() {
    return {
      labelPosition: "right",
      dataForm: {
        sensor_name: "",
        sensor_enname: "",
        max_value: "",
        min_value: "",
        sync_interval:""
      },
      rules: {
          sensor_name: [
            { required: true, message: '请输入预警项中文名', trigger: 'blur' }
          ],
          sensor_enname: [
            { required: true, message: '请输入预警项英文名', trigger: 'blur' }
          ],
          max_value: [
            { required: true, message: '请输入正数,支持两位小数', trigger: 'blur'},
            { pattern: /(^(0|[1-9]{1}\d{0,6})(\.\d{1,2})?$)/, message: '请输入正数,支持两位小数', trigger: 'blur'}
          ],
          min_value: [
            { required: true, message: '请输入正数,支持两位小数', trigger: 'blur'},
            { pattern: /(^(0|[1-9]{1}\d{0,6})(\.\d{1,2})?$)/, message: '请输入正数,支持两位小数', trigger: 'blur'}
          ],
          sync_interval:[{ required: true, message: '请输入正数,支持两位小数', trigger: 'blur'},
            { pattern: /(^(0|[1-9]{1}\d{0,6})(\.\d{1,2})?$)/, message: '请输入正数,支持两位小数', trigger: 'blur'}]
        },
         tableData:[{name:'mq9报警范围',remarks:'1：0ppm-50ppm   2：50ppm-100ppm  3：100ppm-150ppm  4：150ppm-200ppm 5：200ppm-250ppm  6：250ppm-300ppm 7：300ppm-350ppm  8：350ppm-400ppm 9：400ppm-450ppm  10：450ppm-∞ppm 大于或等于设定的范围，报警 '},{name:'mq5报警范围',remarks:'1：0ppm-300ppm  2：300ppm-500ppm 3：500ppm-1000ppm  4：1000ppm-2000ppm 5：2000ppm-3000ppm  6：3000ppm-4000ppm 7：4000ppm-5000ppm  8：5000ppm-6000ppm 9：7000ppm-8000ppm  10：8000ppm-∞ppm 大于或等于设定的范围，报警 '},{name:'mq4报警范围',remarks:'1：0ppm-300ppm  2：300ppm-500ppm 3：500ppm-1000ppm  4：1000ppm-2000ppm 5：2000ppm-3000ppm  6：3000ppm-4000ppm 7：4000ppm-5000ppm  8：5000ppm-6000ppm 9：7000ppm-8000ppm  10：8000ppm-∞ppm 大于或等于设定的范围，报警'},{name:'mq2报警范围',remarks:'1：0ppm-300ppm  2：300ppm-500ppm 3：500ppm-1000ppm  4：1000ppm-2000ppm 5：2000ppm-3000ppm  6：3000ppm-4000ppm 7：4000ppm-5000ppm  8：5000ppm-6000ppm 9：7000ppm-8000ppm  10：8000ppm-∞ppm 大于或等于设定的范围，报警'}]
    };
  },
  filters: {},
  mounted() {},
  methods: {
    handleSave(dataForm) {
        var data_form = this.dataForm;
        this.$refs[dataForm].validate((valid) => {
            if(valid){
                 axios.get("/api/sensorThreshold/exist", {sensor_enname:data_form.sensor_enname}).then(v => {
                    axios.post("/api/sensorThreshold/save",data_form).then(response => {
                      this.$router.back();
                    })
                 });
            }
        })
    },
    exist(sensor_enname) {
       if(sensor_enname != null && sensor_enname.length > 0){
          axios.get("/api/sensorThreshold/exist", {sensor_enname:sensor_enname}).then(v => {
          });
       }
    }
  }
};
</script>
<style lang="scss" scoped>
.camadd {
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
  .form-container {
    margin-top: 20px;
    padding-right: 35px;
    /deep/ .el-form-item__content {
      width: 50%;
    }
  }
  /deep/ .el-radio__label {
    display: none !important;
  }
  /deep/ .el-dialog__body {
    padding-top: 5px;
    padding-bottom: 10px;
  }
  /deep/ .el-input.is-disabled .el-input__inner {
    background-color: #ffffff;
    border-color: #e4e7ed;
    color: #606266;
    cursor: not-allowed;
  }
  /deep/ .el-dialog {
    width: 60% !important;
  }
  /* .el-form-item--small .el-form-item__content{width: 80%} */
}
</style>
