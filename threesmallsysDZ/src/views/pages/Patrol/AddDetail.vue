<template>
  <el-container class="patroladd container">
    <el-header class="box add bb">
        <h5 class="mb10"><span class="lines"></span>巡查详情</h5>
        <div>
            <el-button  class="back_btn" size="small" plain @click="$router.back()">返回</el-button></div>
    </el-header>
    <el-main class="p15 pt0">
    <div class="box mt20 f14">
        <div class="tl c333" >{{company_name}}</div>
     </div>
     <el-row class="box mt20  f14 c666">
         <el-col :span="24" class="patroladd-title bgcfbe tl mb20 pl15">巡查信息</el-col>
         <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">巡查人：</span><span class="c333">{{list.patrol_user_name}}</span>
        </el-col>
       
        <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">巡查时间：</span><span class="c333">{{list.patrol_time}}</span>
        </el-col>
     </el-row>
     <el-row class="box mt20  f14 c666">
         <el-col :span="24" class="patroladd-title bgcfbe tl mb20 pl15">巡查项</el-col>
          <el-col  v-for="(item,index) in config_content" :key="index" :span="9" class="tl mb20" :offset="1">
           <span class="left" >{{item.val}}：</span><span class="c333">{{item.key}}</span>
        </el-col>
         <!-- <el-col :span="9" class="tl mb20" :offset="1">
           <span class="left">备案证明：</span><span class="c333">{{list.record_proof}}</span>
        </el-col>
        <el-col v-if="companytag_code==3" :span="12" class="tl mb20" :offset="1">
          <span class="left">生产的首批食品检验：</span><span class="c333">{{list.food_inspection}}</span>
        </el-col>
        <el-col v-if="companytag_code==3" :span="9" class="tl mb20" :offset="1">
          <span class="left">食品检验次数：</span><span class="c333">{{list.food_inspection_count}}</span>
        </el-col>
        <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">进货、保存查验记录：</span><span class="c333">{{list.related_credentials}}</span>
        </el-col>
        <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">生产经营：</span><span class="c333">{{list.production_operation}}</span>
        </el-col>
        <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">禁止生产经营食品：</span><span class="c333">{{list.ban_production_operation}}</span>
        </el-col>
        <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">废物处理：</span><span class="c333">{{list.waste_disposal}}</span>
        </el-col>
         <el-col :span="9" class="tl mb20" :offset="1">
           <span class="left">小作坊应具备条件：</span><span class="c333">{{list.requirements}}</span>
        </el-col>
         <el-col v-if="companytag_code==3" :span="9" class="tl mb20" :offset="1">
           <span class="left">禁止生产加工食品：</span><span class="c333">{{list.ban_food}}</span>
        </el-col>
         <el-col v-if="companytag_code==3" :span="9" class="tl mb20" :offset="1">
           <span class="left">食品标签内容：</span><span class="c333">{{list.food_label_content}}</span>
        </el-col>
         <el-col :span="9" class="tl mb20" :offset="1">
           <span class="left">风险评级：</span><span class="c333">{{list.risk_assessment}}</span>
        </el-col> -->
     </el-row>
     <el-row class="box mt20  f14 c666">
         <el-col :span="24" class="patroladd-title bgcfbe tl mb20 pl15">巡查结果</el-col>
         <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">巡查结果：</span><span class="c333">{{list.patrol_result}}</span>
        </el-col>
        <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">处理方式：</span><span class="c333">{{list.dispose_name}}</span>
        </el-col>
     </el-row>
      <el-row class="box mt20  f14 c666">
         <el-col :span="24" class="patroladd-title bgcfbe tl mb20 pl15">处罚信息</el-col>
         <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">处罚方式：</span><span class="c333">{{list.punish_name}}</span>
        </el-col>
       
     </el-row>
      <el-row class="box mt20  f14 c666">
         <el-col :span="24" class="patroladd-title bgcfbe tl mb20 pl15">备注信息</el-col>
         <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">备注信息：</span><span class="c333">{{list.note}}</span>
        </el-col>
       
     </el-row>
      <el-row class="box mt20  f14 c666">
         <el-col :span="24" class="patroladd-title bgcfbe tl mb20 pl15">现场照片</el-col>
          <el-col :span="24" class="tl">
         <div class="block fl" v-for="(fit,index) in list.patrol_imgs_list" :key="index">
    <el-image 
      :src="user.qyurl+fit"
      :preview-src-list="[user.qyurl+fit]"
      :fit="fit.accessory_type"></el-image>
       <!-- <el-image v-else
      :src="require('../../../assets/image/moren.png')"
      :preview-src-list="[require('../../../assets/image/moren.png')]"
      :fit="fit.accessory_type"></el-image> -->
      <p class="demonstration tc p15">{{ fit.accessory_type }}</p>
  </div>
      </el-col>
     </el-row>
    </el-main>
  </el-container>
</template>
<script>
import axios from '../../../util/api'
import { tengxuncloud } from '../../../util/tengxun'
import { local } from '../../../util/util'
export default {
  data () {
    return {
      user:'',
       page: {
       patrol_code:''
      },
      company_name:'',
       list: '',
       config_content:'',
       companytag_code:''
    }
  },
     created () {
       this.user = local.get('user');
        this.page.patrol_code=this.$route.query.code;
        this.name=this.$route.query.name;
         this.companytag_code=this.$route.query.tag;
     this.init(this.page)
  },
  methods: {
     init (params) {
      axios.get('/api/patrol/detail', params).then((v) => {
        this.config_content=JSON.parse(v.config_content)
       this.list=v
      })
    
    },
    
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
  .left{width: 60%;}
}

</style>
