<template>
  <el-container class="punishadd">
    <el-header class="box add bb">
      <h5 v-if="id1==2" class="mb10"><span class="lines"></span>添加处理方式</h5>
      <h5 v-else class="mb10"><span class="lines"></span>编辑处理方式</h5>
      <div>
        <el-button class size="small" type="primary" @click="submitForm('formInline1')">提交</el-button>
        <el-button class="back_btn" size="small" plain @click="$router.back()">返回</el-button>
      </div>
    </el-header>
    <el-main class="pt0">
      <el-form
        ref="formInline1"
        :label-position="labelPosition"
        label-width="120px"
        :model="formInline1"
        class="form-container"
      >
        <el-form-item label="处理方式名称：" prop="punish_name" :rules="[{required: true,message: '请输入处理方式名称', trigger: 'blur' },{ pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+$/, message: '不允许输入空格等特殊符号' }]">
          <el-input
            v-model="formInline1.punish_name"
            size="small"
            placeholder="请填入处理方式名称"
          ></el-input>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>
<script>
import axios from "../../../util/api";
export default {
  data() {
    return {
      labelPosition: "right",
      formInline1: {
        punish_code: "",
        punish_name: ""
      },
      punish_code: ""
    };
  },
  filters: {},
  mounted() {},
  created () {
    this.punish_code=this.$route.query.id;
    this.formInline1.punish_code=this.$route.query.id;
    this.id1=this.$route.query.id1;
    this.init()
  },
  methods: {
    init (params) {
      if(this.id1==1){
        axios.get('/api/punish/single', {punish_code:this.punish_code}).then((v) => {
          this.formInline1=v.patrolPunish
        })
      }
    },
    submitForm(formInline1){
      let paramas=this.formInline1
      this.$refs[formInline1].validate((valid) => {
        if (valid) {
          if(this.id1==1){              
            axios.put('/api/punish/update', paramas).then((v) => {
              this.$router.back()
            })
          }else{
            axios.post('/api/punish/save', paramas).then((v) => {
              this.$router.back()
            })
          }
          
        }
      })
    }
  }
};
</script>
<style lang="scss" scoped>
.punishadd {
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
