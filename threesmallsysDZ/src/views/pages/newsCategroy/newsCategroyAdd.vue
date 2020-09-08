<template>
  <el-container class="patroladd">
    <el-header class="box add bb">
        <h5 class="mb10"><span class="lines"></span>新闻栏目新增</h5>
        <div>
             <el-button  class=""  size="small" type="primary" @click="submitForm('formInline')">提交</el-button>
            <el-button  class="back_btn" size="small" plain @click="$router.back()">返回</el-button></div>
    </el-header>
    <el-main class="p15 pt0">
        <el-form :inline="true"  status-icon ref="formInline"  :model="formInline"  class="demo-ruleForm">
            <el-row class="box mt20  f14">
                <el-col :span="24" class="patroladd-title bgcfbe tl mb20 pl15">新闻栏目</el-col>
                
                <el-col :span="9" class="tl" :offset="1">
                  <el-form-item class="w" label-width="34%" label="栏目名：" size="small"  prop="news_category_name" :rules="[{required: true,message: '请输入栏目名', trigger: 'blur' }]">
                    <el-input placeholder="请输入栏目名" v-model="formInline.news_category_name" class="input-with-select">
                      </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="9" class="tl" :offset="1">
                  <el-form-item class="w" label-width="34%" label="状态：" size="small" prop="news_category_state" >
                  <el-select v-model="formInline.news_category_state" placeholder="请选择状态">
                    <el-option label="开启" value=1></el-option>
                    <el-option label="关闭" value=2></el-option>
                  </el-select>
                   </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </el-main>
  </el-container>
</template>
<script>
import axios from '../../../util/api'
import { tengxuncloud } from '../../../util/tengxun'
import {local} from '../../../util/util'
export default {
  data () {
    return {
      formInline: {
        news_category_name: '',
        news_category_state: "1"
      }
    }
  },
  created () {
  },
  methods: {
     submitForm(formInline){
        let paramas=this.formInline
        this.$refs[formInline].validate((valid) => {
        if (valid) {
          axios.post('/api/newsCategory/save', paramas).then((v) => {
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

}

</style>
