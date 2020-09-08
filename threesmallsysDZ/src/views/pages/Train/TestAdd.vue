<template>
  <el-container class="patroladd">
    
    <el-header class="box add bb">
        <h5 class="mb10"><span class="lines"></span>新增试卷</h5>
        <div>
             <el-button  class=""  size="small" type="primary" @click="submitForm('formInline')">提交</el-button>
            <el-button  class="back_btn" size="small" plain @click="$router.back()">返回</el-button></div>
    </el-header>
    <el-main class="pt0">
     <el-form :inline="true"  status-icon ref="formInline"  :model="formInline"  class="demo-ruleForm">
     <el-row class="box mt20  f14">
         <el-col :span="24" class="patroladd-title bgcfbe tl mb20 pl15">试卷信息</el-col>
        
        <el-col :span="22" class="tl" :offset="1">
        <el-form-item  class="rules w" label-width="10%" label="试卷标题："  size="small"  prop="train_exam_title" :rules="[{required: true,message: '请输入课程标题', trigger: 'blur' }]">
           <el-input  style="width:100%" placeholder="试卷标题" v-model="formInline.train_exam_title" class="input-with-select">
            </el-input>
        </el-form-item>
        </el-col>
         <el-col :span="22"  class="tl" :offset="1">
          <el-form-item class="rules w" label-width="10%" label="合格题数：" size="small" prop="train_exam_standard" :rules="Rules.train_exam_standard">
          <el-input style="width:100%" placeholder="合格题数" v-model="formInline.train_exam_standard" class="input-with-select" maxlength="3">
            </el-input>
        </el-form-item>
        </el-col>
     </el-row>
     <el-row class="box mt20  f14">
         <el-col :span="24" class="patroladd-title bgcfbe tl mb20 pl15">试题信息</el-col>
         <div class="disib mb20 border-b" v-for="(item, index) in formInline.train_exam_topic_list" :key="item.key">
        <el-col :span="22" class="tl" :offset="1" >
            <el-form-item class="rules w c000"  size="small"  label-width="10%" :label="'试题'+(index+1)+'：'" :prop="'train_exam_topic_list.' + index +'.train_exam_topic_title'" :rules="Rules.Name1">
                <el-input v-model="item.train_exam_topic_title" placeholder="试题"  class="el-select_box"></el-input>
              </el-form-item>
        </el-col>
        <div></div>
         <el-col :span="9"  class="tl" :offset="1">
             <el-form-item class="rules w"  size="small"  label-width="24%" label="A：" :prop="'train_exam_topic_list.' + index +'.train_exam_topic_option_a'" :rules="Rules.Name2">
                <el-input  v-model="item.train_exam_topic_option_a" placeholder="选项内容A"  class="el-select_box"></el-input>
              </el-form-item>
        </el-col>
        <el-col :span="9"  class="tl" :offset="1">
             <el-form-item class="rules w"  size="small"  label-width="24%" label="B：" :prop="'train_exam_topic_list.' + index +'.train_exam_topic_option_b'" :rules="Rules.Name3">
                <el-input v-model="item.train_exam_topic_option_b" placeholder="选项内容B"  class="el-select_box"></el-input>
              </el-form-item>
         
        </el-col>
        <el-col :span="9"  class="tl" :offset="1">
             <el-form-item class="rules w"  size="small"  label-width="24%" label="C：" :prop="'train_exam_topic_list.' + index +'.train_exam_topic_option_c'" :rules="Rules.Name4">
                <el-input v-model="item.train_exam_topic_option_c" placeholder="选项内容C"  class="el-select_box"></el-input>
              </el-form-item>
         
        </el-col>
        <el-col :span="9"  class="tl" :offset="1">
            <el-form-item class="rules w"  size="small"  label-width="24%" label="D：" :prop="'train_exam_topic_list.' + index +'.train_exam_topic_option_d'" :rules="Rules.Name5">
                <el-input v-model="item.train_exam_topic_option_d" placeholder="选项内容D"  class="el-select_box"></el-input>
              </el-form-item>
         
        </el-col> 
        <el-col :span="9"  class="tl" :offset="1">
          <el-form-item label="正确答案："   class="w" label-width="24%" size="small" :prop="'train_exam_topic_list.' + index +'.train_exam_topic_standard'" :rules="Rules.Name6">
            <el-select class="w" v-model="item.train_exam_topic_standard" placeholder="请选择正确答案" >
             <el-option v-for="group in options" :key="group.name" :label="group.name" :value="group.name"> </el-option>
          </el-select>
        </el-form-item>
        </el-col>
        <el-col :span="9"  class="tr" :offset="1">
          <div><el-button icon="el-icon-plus" size="small" class="back_btn" @click="deleteRules(item, index)">删除此题</el-button></div>
        </el-col>
         </div>
         <el-col :span="24"  class="tl" :offset="1">
          <div><el-button icon="el-icon-plus" size="small" type="primary" @click="Add">添加试题</el-button></div>
        </el-col>
     </el-row>
     </el-form>
         </el-main>
  </el-container>
</template>
<script>
import Vue from 'vue'
import axios from '../../../util/api'
import { local } from '../../../util/util'
var _code
function findSystemCode(code_prefix){
 var prefix=code_prefix;
 var timestamp = (new Date()).valueOf();
 prefix+=timestamp;
 var len = subtr(19,prefix.length);
 _code=prefix+RndNum(len)+RndNum(6);
 return prefix+RndNum(len)+RndNum(6);
}
function subtr(arg1,arg2){
 var r1,r2,m,n;
 try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
 try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
 m=Math.pow(10,Math.max(r1,r2));
 n=(r1>=r2)?r1:r2;
 return ((arg1*m-arg2*m)/m).toFixed(n);
}
function RndNum(n) {
    var rnd = "";
    for (var i = 0; i < n; i++) {
        rnd += Math.floor(Math.random() * 10);
    }
    return rnd;
}
var maxnum=0
export default {
    name:'patroladd',
  data () {
    var checkTrainExamStandard = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('合格题数不能为空'));
        }
        setTimeout(() => {
          if (parseInt(value) > maxnum) {
            callback(new Error('合格题数不能大于题目总数'));
          } else {
            callback();
          }
        }, 200);
      };
    return {
      id1:'',
        formInline: {
            train_code:"",
            train_exam_code:"",
            train_exam_title:"",
            train_exam_standard:"",
            train_exam_topic_list: [{
            train_exam_code: "",
            train_exam_topic_code:"",
            train_exam_topic_option_a: "",
            train_exam_topic_option_b: "",
            train_exam_topic_option_c: "",
            train_exam_topic_option_d: "",
            train_exam_topic_standard:"",
            train_exam_topic_title:"",
          }],
      },
      aaaa:1,
      region_high_code:'',
     options: [{name: 'A'}, {name: 'B'},{name: 'C'},{name: 'D'}],
      user:'',
        tableData:'',
         Rules: {
        Name1: [{ required: true, message: '请输入试题', trigger: 'blur' }],
       Name2: [{ required: true, message: '请输入选项内容A', trigger: 'blur' }],
        Name3: [{ required: true, message: '请输入选项内容B', trigger: 'blur' }],
        Name4: [{ required: true, message: '请输入选项内容C', trigger: 'blur' }],
        Name5: [{ required: true, message: '请输入选项内容D', trigger: 'blur' }],
        Name6: [{ required: true, message: '请输入正确答案', trigger: 'blur' }],
        train_exam_standard: [{ required: true,message: '请输入合格题数', trigger: 'blur' },
            { pattern: /^[1-9]{1}[0-9]*$/, message: '只能输入正整数' },
            { validator: checkTrainExamStandard, trigger: 'blur' }
          ]
      }
    }
    
  },
     created () {
      this.user = local.get('user');
        this.id1=this.$route.query.id1;

             this.formInline.train_code=this.$route.query.id;
              this.formInline.train_exam_code=findSystemCode("111");
         
        this.initData()
  },
  methods: {
     
       initData(){
        this.formInline.train_exam_topic_list = []
    },
     Add() {
       maxnum++
      this.formInline.train_exam_topic_list.push({
            train_exam_code:this.formInline.train_exam_code,
           train_exam_topic_code:findSystemCode("112"),
            train_exam_topic_option_a: "",
            train_exam_topic_option_b: "",
            train_exam_topic_option_c: "",
            train_exam_topic_option_d: "",
            train_exam_topic_standard:"",
           train_exam_topic_title:"",
      })
    },

deleteRules(item, index) {
  maxnum--
      this.index = this.formInline.train_exam_topic_list.indexOf(item)
      if (index !== -1) {
        this.formInline.train_exam_topic_list.splice(index, 1)
      }
    },
     submitForm(formInline){
          let paramas=this.formInline
          this.aaaa=2;
         this.$refs[formInline].validate((valid) => {
        if (valid) {
axios.post('/api/trainExam/save', paramas).then((v) => {
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
  /* .el-form-item--small .el-form-item__content{width: 80%} */
 /deep/ .el-form-item__content{width: 76%;}
}

</style>
