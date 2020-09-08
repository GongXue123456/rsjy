<template>
  <el-container class="patroladd">
     
    <el-header class="box add bb">
        <h5 class="mb10"><span class="lines"></span>预警项管理</h5>
        <div>
             <el-button  class=""  size="small" type="primary" @click="submitForm('formInline')">提交</el-button>
            <el-button  class="back_btn" size="small" plain @click="$router.back()">返回</el-button></div>
    </el-header>
    <el-main class="pt0">
    <el-form :inline="true"  status-icon ref="formInline"  :model="formInline"  class="demo-ruleForm">
     <el-row v-for="(item,index) in formInline.threshold_content" :key="index" class="box mt20  f14">
         <el-col :span="24" class="patroladd-title bgcfbe tl mb20 pl15">{{item.sensor_name}}&nbsp;&nbsp;&nbsp;({{item.sensor_enname}})</el-col>
        <el-col :span="9" class="tl" :offset="1">
        <el-form-item class="w" label-width="34%" label="预警最大值：" size="small"  :prop="`threshold_content.${index}.max_value`"   :rules="[{required: true,message: '请输入预警最大值', trigger: 'blur' }]">
           <el-input placeholder="预警最大值" v-model="item.max_value" clearable class="input-with-select">
            </el-input>
        </el-form-item>
        <el-form-item class="w" label-width="34%" label="预警最小值：" size="small" :prop="`threshold_content.${index}.min_value`"  :rules="[{required: true,message: '请输入预警最小值', trigger: 'blur' }]">
           <el-input placeholder="预警最小值" v-model="item.min_value" clearable class="input-with-select">
            </el-input>
        </el-form-item>
        <el-form-item class="w" label-width="34%" label="同步频率：" size="small" :prop="`threshold_content.${index}.sync_interval`"  :rules="[{required: true,message: '请输入同步频率', trigger: 'blur' }]">
           <el-input placeholder="同步频率" v-model="item.sync_interval" clearable class="input-with-select">
            </el-input>
        </el-form-item>
        </el-col>
     </el-row>
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
import axios from '../../../util/api'
import { local,objKeySort } from '../../../util/util'
export default {
  data () {
    return {
      threshold_content:'',
        formInline: {
            sensor_code:'',
            threshold_content:[],
      },
      tableData:[{name:'mq9报警范围',remarks:'1：0ppm-50ppm   2：50ppm-100ppm  3：100ppm-150ppm  4：150ppm-200ppm 5：200ppm-250ppm  6：250ppm-300ppm 7：300ppm-350ppm  8：350ppm-400ppm 9：400ppm-450ppm  10：450ppm-∞ppm 大于或等于设定的范围，报警 '},{name:'mq5报警范围',remarks:'1：0ppm-300ppm  2：300ppm-500ppm 3：500ppm-1000ppm  4：1000ppm-2000ppm 5：2000ppm-3000ppm  6：3000ppm-4000ppm 7：4000ppm-5000ppm  8：5000ppm-6000ppm 9：7000ppm-8000ppm  10：8000ppm-∞ppm 大于或等于设定的范围，报警 '},{name:'mq4报警范围',remarks:'1：0ppm-300ppm  2：300ppm-500ppm 3：500ppm-1000ppm  4：1000ppm-2000ppm 5：2000ppm-3000ppm  6：3000ppm-4000ppm 7：4000ppm-5000ppm  8：5000ppm-6000ppm 9：7000ppm-8000ppm  10：8000ppm-∞ppm 大于或等于设定的范围，报警'},{name:'mq2报警范围',remarks:'1：0ppm-300ppm  2：300ppm-500ppm 3：500ppm-1000ppm  4：1000ppm-2000ppm 5：2000ppm-3000ppm  6：3000ppm-4000ppm 7：4000ppm-5000ppm  8：5000ppm-6000ppm 9：7000ppm-8000ppm  10：8000ppm-∞ppm 大于或等于设定的范围，报警'}]
    }
  },
     created () {
      this.user = local.get('user');
       this.formInline.sensor_code=this.$route.query.id;
     this.init()
  },
  methods: {
     init (params) {
        axios.get('/api/sensor/single',{sensor_code:this.formInline.sensor_code}).then((v) => {
         if(v.sensor.threshold_content==null){
              axios.get('/api/sensorThreshold/list', '').then((v) => {
        v.sensor_threshold_list.forEach(item=>{
          this.formInline.threshold_content.push(objKeySort({sensor_threshold_code:item.sensor_threshold_code,sensor_name:item.sensor_name,sensor_enname:item.sensor_enname,max_value:'',min_value:'',sync_interval:''}))
        })
      })
         }else{
           v.sensor.threshold_content.forEach(item=>{
          this.formInline.threshold_content.push(objKeySort({sensor_threshold_code:item.sensor_threshold_code,sensor_name:item.sensor_name,sensor_enname:item.sensor_enname,max_value:item.max_value,min_value:item.min_value,sync_interval:item.sync_interval}))
        })
         }
       }) 
    },
     submitForm(formInline){
          let paramas=this.formInline
          
         this.$refs[formInline].validate((valid) => {
        if (valid) {
                axios.put('/api/sensor/threshold/update', paramas).then((v) => {
      this.$router.back()
      })
           
            
        }
         })
      }
  }
}
</script>
<style lang="scss" scoped>
.patroladd{
   overflow-x: hidden;
  .add{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .el-image{width: 160px; height: 160px;margin-right: 10px}
  .back_btn{background:rgba(247,248,249,1);border:1px solid rgba(217,222,225,1);}
  .patroladd-title{height: 34px;line-height: 34px;border-left: 2px solid #788287}
  .patroladd-title1{height: 34px;line-height: 34px;}
.el-checkbox{    display: flex;
    justify-content: left;
    align-items: center;}

}

</style>
