<template>
  <el-container class="patroladd">
    
    <el-header class="box add bb">
        <h5 class="mb10" v-if="id1==1"><span class="lines"></span>编辑课程</h5>
        <h5 class="mb10" v-else><span class="lines"></span>新增课程</h5>
        <div>
             <el-button  class=""  size="small" type="primary" @click="submitForm('formInline')">提交</el-button>
            <el-button  class="back_btn" size="small" plain @click="$router.back()">返回</el-button></div>
    </el-header>
    <el-main class="pt0">
     <el-form :inline="true"  status-icon ref="formInline"  :model="formInline"  class="demo-ruleForm">
     <el-row class="box mt20  f14">
         <el-col :span="24" class="patroladd-title bgcfbe tl mb20 pl15">课程信息</el-col>
        
        <el-col :span="22" class="tl" >
        <el-form-item class="w" label-width="14%"  label="课程标题：" size="small"  prop="train_course_title" :rules="[{required: true,message: '请输入课程标题', trigger: 'blur' }]">
           <el-input  style="width:100%" placeholder="课程标题" v-model="formInline.train_course_title" class="input-with-select">
            </el-input>
        </el-form-item>
        </el-col>
         <el-col :span="22"  class="tl" >
          <el-form-item class="w" label-width="14%" label="学时(小时)：" size="small"  prop="train_course_period" :rules="[{required: true,message: '请输入学时', trigger: 'blur' }]">
            <el-input-number style="width:200px" v-model="formInline.train_course_period" controls-position="right" @change="handleChange" :min="1" :max="100"></el-input-number>
        </el-form-item>
        </el-col>
         <el-col :span="22" class="tl" >
          <el-form-item class="w" label-width="14%" label="课程内容：" size="small" >
           <el-card>
      <Editor v-model="formInline.train_course_content" :list.sync="content" @updateData="updateData"></Editor>
    </el-card>
        </el-form-item>
        </el-col>
     </el-row>
     </el-form>
    </el-main>
  </el-container>
</template>
<script>
import axios from '../../../util/api'
import { local } from '../../../util/util'
import Editor from './Editor'

export default {
    name:'patroladd',
    components: {Editor},
  data () {
    return {
      content:'',
      id1:'',
        formInline: {
          train_code:'',
          train_course_code:'',
         train_course_period:'',
        train_course_title:'',
        train_course_content:'',
      },
        user:'',
    }
  },
     created () {
      this.user = local.get('user');
       this.formInline.train_code=this.$route.query.id;
       this.formInline.train_course_code=this.$route.query.id
        this.id1=this.$route.query.id1;
        
        this.init()
  },
  methods: {
    updateData(data) {
this.products = data;
},
    init (params) {
       if(this.id1==1){
          axios.get('/api/trainCourse/single',{train_course_code:this.formInline.train_course_code}).then((v) => {
       this.formInline=v.train_course
      this.content=v.train_course.train_course_content
      })
       }
     
      
    },
     handleChange(value) {
         this.formInline.train_course_period=value
      },

     submitForm(formInline){
          let paramas=this.formInline
         this.$refs[formInline].validate((valid) => {
        if (valid) {
        if(this.id1==1){
            axios.put('/api/trainCourse/update', paramas).then((v) => {
           this.$router.back()
          })
        }else{
          axios.post('/api/trainCourse/save', paramas).then((v) => {
           this.$router.back()
          })
        }
             
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
 .info{
    border-radius: 10px;
    line-height: 20px;
    padding: 10px;
    margin: 10px;
    background-color: #ffffff;
  }
}

</style>
