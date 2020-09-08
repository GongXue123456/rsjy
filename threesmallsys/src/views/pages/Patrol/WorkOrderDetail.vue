<template>
  <el-container class="patroldetail container">
    <el-header class="box add bb">
        <h5 class="mb10"><span class="lines"></span>工单详情</h5>
        <div><el-button  class="back_btn" size="small" plain @click="$router.back()">返回</el-button></div>
    </el-header>
    <el-main class="p15 pt0">
    <div class="box mt20 mb20 f16">
        <div class="tl c333" >工单号：{{list.work_order}}
            <span v-if="list.patrol_type==3" class="ml10 f13 patrol_way">工单派发</span>
            <span v-if="list.patrol_type==2" class="ml10 f13 patrol_way">日常监督抽查</span>
            <span v-if="list.patrol_type==1" class="ml10 f13 patrol_way">普通巡查</span></div>
     </div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
   <el-tab-pane label="基本信息" name="first">
        <el-row class="box mt20  f14 c666">
         <el-col :span="24" class="patroldetail-title bgcfbe tl mb20 pl15">工单信息</el-col>
          <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">派发人：</span><span class="c333">{{list.user_name}}</span>
        </el-col>
         <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">巡查时间：</span><span class="c333">{{list.patrol_time}}</span>
        </el-col>
        <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">巡查人：</span><span class="c333">{{list.patrol_user_name}}</span>
        </el-col>
        <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">巡查对象：</span><span class="c333">{{list.company_name}}</span>
        </el-col>
        <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">巡查结果：</span><span v-if="list.patrol_result=='不合格'" class="red">不合格</span><span v-else-if="list.patrol_result=='合格'" class="c333">合格</span><span v-else class="c333">---</span>
        </el-col>
     </el-row>
     <el-row class="box mt20  f14 c666">
         <el-col :span="24" class="patroldetail-title bgcfbe tl mb20 pl15">处罚信息</el-col>
          <el-col  :span="9" class="tl mb20" :offset="1">
          <span class="left">处理方式：</span><span class="c333">{{list.dispose_name}}</span>
        </el-col>
        <el-col  :span="9" class="tl mb20" :offset="1">
          <span class="left">处罚方式：</span><span class="c333">{{list.punish_name}}</span>
        </el-col>
     </el-row>
     <el-row class="box mt20  f14 c666">
         <el-col :span="24" class="patroldetail-title bgcfbe tl mb20 pl15">备注信息</el-col>
          <el-col  :span="9" class="tl mb20" :offset="1">
          <span class="left">备注信息：</span><span class="c333">{{list.note}}</span>
        </el-col>
     </el-row>
      <el-row class="box mt20  f14">
      <el-col :span="24" class="patroldetail-title bgcfbe tl mb20 pl15">附件上传</el-col>
      <el-col :span="24" class="tl">
         
  <div v-if="list.patrol_imgs==null" class="block fl" >
   <el-image 
      :src="require('../../../assets/image/moren.png')"
      ></el-image>
  </div>
  <div v-else class="block fl" >
    <el-image  v-for="(fit,index) in list.patrol_imgs_list" :key="index"
      :src="user.qyurl+fit"
      :preview-src-list="[user.qyurl+fit]"
      :fit="fit.name"></el-image>  
  </div>
      </el-col>
     </el-row>
    </el-tab-pane>
  </el-tabs>
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
       patrol_code:'',
      },
      activeName: 'first',
       list: [],
       region_code:'',
      formInline: {
          pager_offset:'0',
         company_code:'',
        patrol_result:'',
        business_form:'',
        patrol_user_name:'',
        department_code:'',
        search_time_bigen:'',
        search_time_end:'',
      },
       currentPage: 1,
      total: 0,
      list_btn3:[{id:'1',title: '合格'},{id:'2',title: '不合格'}],
      user:'',
    }
  },
   created () {
     this.user = local.get('user');
     this.page.patrol_code=this.$route.query.id;
     this.formInline.company_code=this.$route.query.id;
     this.init1(this.page)
  },
  methods: {
     init1 (params) {
       axios.get('/api/patrol/detail', params).then((v) => {
       this.list=v;
      })
    },
     change(index,val){
     if(index==1){this.formInline.patrol_result=val;}
if(index==3){this.formInline.search_time_bigen=val;}
if(index==4){this.formInline.search_time_end=val;}
    },
     handleClick() {},
      PatroleAdd(){
     this.$router.push({
        name: "PatrolAdd",
        query: {
          id:this.page.company_code,
           id1:1,
          name:this.list.company_name,
           tag:this.region_code
        }
      });
  },
   godetail(index,index1){
    this.$router.push({
        name: "AddDetail",
        query: {
          name:index,
          code: index1,
          tag:this.region_code
        }
      });
  }
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
  .patrol_way{padding: 5px;background-color:rgba($color: #2EC68A, $alpha: 0.2);color:#2EC68A; border-radius: 4px;}

}

</style>
