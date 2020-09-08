<template>
  <el-container class="patroldetail container">
    <el-header class="box add bb">
        <h5 class="mb10" v-if="aa==1"><span class="lines"></span>投诉举报详情</h5>
        <h5 class="mb10" v-else-if="aa==2"><span class="lines"></span>投诉举报处理</h5>
        <div> <el-button v-if="aa==2" class=""  size="small" type="primary" @click="submitForm('formInline')">提交</el-button><el-button  class="back_btn" size="small" plain @click="$router.back()">返回</el-button></div>
    </el-header>
    <el-main class="p15 pt0">
    <div class="box mt20 mb20 f16">
        <div class="tl c333" >{{list.company_name}}</div>
     </div>
        <el-row class="box mt20  f14 c666">
         <el-col :span="24" class="patroldetail-title bgcfbe tl mb20 pl15">投诉举报信息</el-col>
          <el-col :span="22" class="tl mb20" :offset="1">
          <span class="left">投诉举报对象：</span><span class="c333">{{list.company_name}}</span>
        </el-col>
         <el-col :span="22" class="tl mb20" :offset="1">
          <span class="left">投诉举报标题：</span><span class="c333">{{list.complaintreport_title}}</span>
        </el-col>
        <el-col :span="22" class="tl mb20" :offset="1">
          <span class="left">投诉举报内容：</span><span class="c333">{{list.complaintreport_content}}</span>
        </el-col>
        <el-col :span="22" class="tl mb20" :offset="1">
          <span class="left">投诉联系电话：</span><span class="c333">{{list.complaintreport_telephone}}</span>
        </el-col>
        <el-col :span="22" class="tl mb20" :offset="1">
          <span class="left">投诉举报时间：</span><span class="c333">{{list.add_time}}</span>
        </el-col>
     </el-row>
     <el-row v-if="imgs1.length>0" class="box mt20  f14">
      <el-col :span="24" class="patroldetail-title bgcfbe tl mb20 pl15">投诉现场照片</el-col>
      <el-col :span="24" class="tl">
         <div class="block fl" v-for="(fit,index) in imgs1" :key="index">
    <el-image  v-if="fit"
      :src="user.qyurl+fit"
      :preview-src-list="[user.qyurl+fit]"
      ></el-image>
       <el-image v-else
      :src="require('../../../assets/image/moren.png')"
      ></el-image>
  </div>
      </el-col>
     </el-row>
     <el-row v-if="aa==1&&list.complaintreport_state==2" class="box mt20  f14 c666">
         <el-col :span="24" class="patroldetail-title bgcfbe tl mb20 pl15">处理结果</el-col>

        <el-col  :span="9" class="tl mb20" :offset="1">
          <span class="left">处理人员：</span><span class="c333">{{list.result_user_name}}</span>
        </el-col>
        <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">处理时间：</span><span class="c333">{{list.update_time}}</span>
        </el-col>
          <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">处理结果：</span><span class="c333">{{list.result_content}}</span>
        </el-col>
        
     </el-row>
     <el-row v-if="imgs.length>0" class="box mt20  f14">
      <el-col :span="24" class="patroldetail-title bgcfbe tl mb20 pl15">处理结果附件展示</el-col>
      <el-col :span="24" class="tl">
         <div class="block fl" v-for="(fit,index) in imgs" :key="index">
    <el-image  v-if="fit"
      :src="user.qyurl+fit"
      :preview-src-list="[user.qyurl+fit]"
      ></el-image>
       <el-image v-else
      :src="require('../../../assets/image/moren.png')"
      ></el-image>
  </div>
      </el-col>
     </el-row>
      <el-form :inline="true"  status-icon ref="formInline"  :model="formInline"  class="demo-ruleForm">
     <el-row v-if="aa==2" class="box mt20  f14 c666">
       
         <el-col :span="24" class="patroldetail-title bgcfbe tl mb20 pl15">处理结果</el-col>

        <el-col :span="22" :offset="1" class="tl">
        <el-form-item  label="处理结果：" class="w" label-width="14%" size="small" prop="result_content" :rules="[{required: true,message: '请输入处理结果', trigger: 'blur' }]">
           <el-input type="textarea" :rows="5" placeholder="处理结果" v-model="formInline.result_content" class="input-with-select">
            </el-input>
        </el-form-item>
        </el-col>
         
       
     </el-row>
      <el-row  v-if="aa==2" class="box mt20  f14">
      <el-col :span="24" class="patroldetail-title bgcfbe tl mb20 pl15">现场照片</el-col>
      <el-col :span="24" class="tl">
     <div class="recordadd-upload">
              <el-upload 
                ref="upload"
                multiple
                action="/api/file/upload"
                 accept="image/png,image/jpg,image/jpeg"
                list-type="picture-card"
                :on-success="handlepoll"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                >
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
              </div>
      </el-col>
     </el-row>
      </el-form>
      
 
    </el-main>
    <!-- 
      -->
  </el-container>
</template>
<script>
import axios from '../../../util/api'
import { local } from '../../../util/util'
export default {
  data () {
    return {
      page: {
       complaintreport_code :'',
      },
      formInline:{
        complaintreport_code:'',
        complaintreport_state:'2',
        result_user_code:'',
        result_user_name:'',
        result_content:'',
        result_img:''
      },
       list: [],
       imgs_list:[],
       imgs:[],
       imgs1:[],
      user:'',
      aa:'',
       dialogImageUrl: '',
        dialogVisible: false,
    }
  },
   created () {
          this.user = local.get('user');
     this.page.complaintreport_code=this.$route.query.id;
      this.aa=this.$route.query.active;
      this.formInline.complaintreport_code=this.$route.query.id;
      this.formInline.result_user_name=local.get('user').user_name;
        this.formInline.result_user_code=local.get('user').user_code;
     this.init(this.page)
  },
  methods: {
       init (params) {
      axios.get('/api/complaintReport/single', params).then((v) => {
       this.list=v;
       if(v.complaintreport_img!=''&&v.complaintreport_img!=null){
this.imgs1=v.complaintreport_img.indexOf(",") != -1?v.complaintreport_img.split(','):v.complaintreport_img.split(' ')
       }
       if(v.result_img!=''&&v.result_img!=null){
this.imgs=v.result_img.indexOf(",") != -1?v.result_img.split(','):v.result_img.split(' ')
       }
      })
    },
       handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
          handlepoll(response, file, fileList) {
             this.imgs_list.push(response.data.visit_url.substring(response.data.visit_url.indexOf("resources")));
    },
       handleRemove(file, fileList) {
         this.imgs_list=[];
         fileList.forEach(item1 => {
            this.imgs_list.push(item1.response.data.visit_url.substring(item1.response.data.visit_url.indexOf("resources")));
        });
      },
      submitForm(formInline){
          let paramas=this.formInline;
          this.formInline.result_img=this.imgs_list.join(',');
         this.$refs[formInline].validate((valid) => {
        if (valid) {
          axios.post('/api/complaintReport/update', paramas).then((v) => {
            this.$router.back()
         })
        }
         })
      },
  }
}
</script>
<style lang="scss" scoped>
.patroldetail{
  overflow-x: hidden;
  .add{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .el-image{width: 160px; height: 160px;margin-right: 10px}
  .back_btn{background:rgba(247,248,249,1);border:1px solid rgba(217,222,225,1);}
  .patroldetail-title{height: 34px;line-height: 34px;border-left: 2px solid #788287}

}

</style>
