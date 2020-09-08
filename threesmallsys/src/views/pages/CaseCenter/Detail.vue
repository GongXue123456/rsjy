<template>
  <el-container class="patroldetail container">
    <el-header class="box add bb">
        <h5 v-if="active==2" class="mb10"><span class="lines"></span>案件审批</h5>
        <h5 v-if="active==1" class="mb10"><span class="lines"></span>案件详情</h5>
        <div><el-button v-if="active==2"  class="" size="small" type="primary" @click="examine(1)">审批通过</el-button>
         <el-button v-if="active==2" size="small"  type="danger" @click="examine(2)">审批不通过</el-button><el-button  class="back_btn" size="small" plain @click="$router.back()">返回</el-button></div>
    </el-header>
    <el-main class="p15 pt0">
    <div class="box mt20 mb20 f16">
        <div class="tl c333" >案件编号：{{list.casecenter_code}}</div>
     </div>
        <el-row class="box mt20  f14 c666">
         <el-col :span="24" class="patroldetail-title bgcfbe tl mb20 pl15">案件进度</el-col>
         <el-col  :span="9" class="tl mb20" :offset="1">
          <div class="block">
  <el-timeline :reverse="false">
     <el-timeline-item color="#2EC68A" class="state1" v-if="list.casecenter_audit_state==1" timestamp="案件待审批"  placement="top">
    </el-timeline-item>
    <el-timeline-item color="#36ACFF" class="state2" v-if="list.casecenter_audit_state==2&&list.result_state==1" :timestamp="list.casecenter_audit_time"  placement="top">
      <p ><span class="name mr20">{{list.user_name_main}},{{list.user_names_secondary.replace(/\'/g, '')}}</span>待处理</p>
    </el-timeline-item>
     <el-timeline-item color="#36ACFF" class="state2" v-if="list.casecenter_audit_state==2&&list.result_state==2" :timestamp="list.update_time"  placement="top">
      <p ><span class="name mr20">{{list.user_name_main}},{{list.user_names_secondary.replace(/\'/g, '')}}</span>已处理</p>
    </el-timeline-item>
    <el-timeline-item color="#36ACFF" class="state2" v-if="list.casecenter_audit_state==2" :timestamp="list.casecenter_audit_time"  placement="top">
      <p ><span class="name mr20">{{list.user_name_audit}}</span>审核通过</p>
    </el-timeline-item>
    <el-timeline-item color="#E02626"   class="state3" v-if="list.casecenter_audit_state==3" :timestamp="list.casecenter_audit_time"  placement="top">
      <p  class="red"><span class=" mr20">{{list.user_name_audit}}</span>审核未通过</p>
      <div class="card mt10 p10">审核未通过原因：<span class="mr10">{{list.casecenter_audit_note}}</span>
       </div>
    </el-timeline-item>
    <el-timeline-item v-if="list.add_time" :timestamp="list.add_time"  placement="top">
      <p ><span class="general_color mr20">{{list.user_name_add}}</span>新增案件</p>
       <div class="card mt10 p10">主要办案人：<span class="mr10">{{list.user_name_main}}</span>协同办案人:
       <span>{{list.user_names_secondary.replace(/\'/g, '')}}</span>
       </div>
    </el-timeline-item>
  </el-timeline>
</div>
        </el-col>
          
     </el-row>
 
     <el-row  class="box mt20  f14 c666">
         <el-col :span="24" class="patroldetail-title bgcfbe tl mb20 pl15">案件信息</el-col>

        <el-col  :span="22" class="tl mb20" :offset="1">
          <span class="left">案件标题：</span><span class="c333 right">{{list.casecenter_title}}</span>
        </el-col>
        <el-col :span="22" class="tl mb20" :offset="1">
          <span class="left">处理内容：</span><span class="c333 right">{{list.casecenter_content}}</span>
        </el-col>
          <el-col :span="22" class="tl mb20" :offset="1">
          <span class="left">主要办案人：</span><span class="c333 right">{{list.user_name_main}}</span>
        </el-col>
        <el-col :span="22" class="tl mb20" :offset="1">
          <span class="left">协同办案人：</span>
          <span class="c333 right">{{list.user_names_secondary.replace(/\'/g, '')}}</span>
        </el-col>
        
     </el-row>
     <el-row v-if="list.result_state==2" class="box mt20  f14 c666">
         <el-col :span="24" class="patroldetail-title bgcfbe tl mb20 pl15">处理结果</el-col>
        <el-col  :span="22" class="tl mb20" :offset="1">
          <span class="left">处理结果：</span><span class="c333 right">{{list.casecenter_result}}</span>
        </el-col>
     </el-row>
      <el-row v-if="list1.length>0" class="box mt20  f14">
      <el-col :span="24" class="patroldetail-title bgcfbe tl mb20 pl15">附件展示</el-col>
      <el-col :span="24" class="tl">
         <div class="block fl" v-for="(fit,index) in list1" :key="index">
    <el-image  v-if="fit.accessory_url"
      :src="user.qyurl+fit.accessory_url"
      :preview-src-list="[user.qyurl+fit.accessory_url]"
      ></el-image>
       <el-image v-else
      :src="require('../../../assets/image/moren.png')"
      ></el-image>
  </div>
      </el-col>
     </el-row>
     <el-form v-if="active==2"  :inline="true"  status-icon ref="formInline"  :model="formInline"  class="demo-ruleForm">
      <el-row  class="box mt50  f14 c666">
         <el-col :span="24" class="patroldetail-title bgcfbe tl mb20 pl15">无效原因</el-col>
         <div class="box list">
         <el-input
       type="textarea"
       :autosize="{ minRows:4, maxRows: 8}"
       placeholder="如果审核不通过，请填写无效原因"
       v-model="formInline.casecenter_audit_note">
       </el-input>
      </div> 
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
let defaultDate;
export default {
  data () {
    return {
      page: {
        casecenter_code:'',
      },
      formInline:'',
      active:'',
       list: [],
       list1: [],
      user:'',
    }
  },
   created () {
          this.user = local.get('user');
     this.page.casecenter_code=this.$route.query.id;
      this.active= this.$route.query.active;
     this.init(this.page)
  },
  methods: {
       init (params) {
      axios.get('/api/caseCenter/single', params).then((v) => {
       this.list=v.caseCenter;
       this.formInline=v.caseCenter;
       this.list1=v.accessory_list;
      })
    },
    examine(val){
     this.formInline.casecenter_audit_time=this.getNowTime();
      if(val==2){
         this.formInline.casecenter_audit_state='3'
         if(this.formInline.casecenter_audit_note===undefined||this.formInline.casecenter_audit_note==null){
          this.$message({
            message: '请填写不通过原因',
            type: 'warning'
          });
          return false;
        }
      }else{
        this.formInline.casecenter_audit_state='2'
      }
        axios.put('/api/caseCenter/update', this.formInline).then((v) => {
             this.$router.back()
      })
    },
    getNowTime() {
	       var now = new Date();
	       var year = now.getFullYear(); 
	       var month = now.getMonth(); 
         var date = now.getDate();
           var hh =now.getHours() < 10? "0" + now.getHours(): now.getHours();
      var mm =now.getMinutes() < 10? "0" + now.getMinutes(): now.getMinutes();
      var ss =now.getSeconds() < 10? "0" + now.getSeconds():now.getSeconds();
       var hour =' '+hh+':'+mm+':'+ss; 
	       month = month + 1;
	       month = month.toString().padStart(2, "0");
	       date = date.toString().padStart(2, "0");
	       defaultDate = `${year}-${month}-${date}${hour}`;
         return defaultDate;
        //  this.formInline.unuseful_time=defaultDate
	       this.$set(this.info, "stockDate", defaultDate);
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
.card{background-color: #F9F5EC;color: #97866E;border-radius: 4px;}
/deep/ .state1 .el-timeline-item__timestamp{color:#2EC68A}
/deep/ .state2 .el-timeline-item__timestamp,.name{color:#36ACFF}
/deep/ .state3 .el-timeline-item__timestamp{color:#E02626}
}

</style>
