<template>
  <el-container class="recorddetail container">
    <el-header class="box add bb">
        <h5 class="mb10"><span class="lines"></span>管理员详情</h5>
        <div><el-button  class="back_btn" size="small" plain  @click="$router.back()">返回</el-button></div>
    </el-header>
<el-main class="pr pt0">
     <el-tabs v-model="activeName" >
    <el-tab-pane label="基本信息" name="first">
        <el-row class="box mt20  f14 c666">
         <el-col :span="24" class="recorddetail-title bgcfbe tl mb20 pl15">基础信息</el-col>
         <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">管理权限：</span><span class="c333">{{list.manage_type=='3'?'三小+群宴':'三小'}}</span>
        </el-col>
        <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">管理员类型：</span><span class="c333">{{list.user_type}}</span>
        </el-col>
         <el-col :span="22" class="tl mb20" :offset="1">
          <span class="left">主体业态：</span><span class="c333">{{list.business_forms}}</span>
        </el-col>
        <el-col :span="9" class="tl mb20" :offset="1">
         <span class="left">登录账号：</span> <span class="c333">{{list.user_loginname}}</span>
        </el-col>
        <!-- <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">登录密码：</span><span class="c333">{{list.user_loginpass}}</span>
        </el-col> -->
        <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">姓名：</span><span class="c333">{{list.user_name}}</span>
        </el-col>
         <!-- <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">手机号：</span><span class="c333">{{list.user_mobilephone}}</span>
        </el-col> -->
        <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">身份证：</span><span class="c333">{{list.user_idcard}}</span>
        </el-col>
        <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">性别：</span><span class="c333">{{list.user_sex}}</span>
        </el-col>
         <el-col :span="22" class="tl mb20" :offset="1">
          <span class="left">地域：</span><span class="c333">{{list.user_province}}{{list.user_city}}{{list.user_area}}{{list.user_town}}{{list.user_vill}}</span>
        </el-col>
         <el-col :span="22" class="tl mb20" :offset="1">
          <span class="left">详细地址：</span><span class="c333">{{list.user_address}}</span>
        </el-col>        
        <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">添加时间：</span><span class="c333">{{list.addtime}}</span>
        </el-col>
     </el-row>
      <el-row class="box mt20  f14">
      <el-col :span="24" class="recorddetail-title bgcfbe tl mb20 pl15">附件信息</el-col>
      <el-col :span="24" class="tl">
         <div class="block fl">
    <el-image  v-if="list.user_logo_url"
      :src="user.qyurl+list.user_logo_url"
      :preview-src-list="[user.qyurl+list.user_logo_url]"
      :fit="fits[0]">111</el-image>
       <el-image v-else
      :src="require('../../../assets/image/moren.png')"
      :preview-src-list="[require('../../../assets/image/moren.png')]"
      :fit="fits[0]"></el-image>
      <p class="demonstration tc p15">{{ fits[0] }}</p>
  </div>
  <div class="block fl">
    <el-image  v-if="list.user_idcard_logo_front"
      :src="user.qyurl+list.user_idcard_logo_front"
      :preview-src-list="[user.qyurl+list.user_idcard_logo_front]"
      :fit="fits[1]"></el-image>
       <el-image v-else
      :src="require('../../../assets/image/moren.png')"
      :preview-src-list="[require('../../../assets/image/moren.png')]"
      :fit="fits[1]"></el-image>
      <p class="demonstration tc p15">{{ fits[1] }}</p>
  </div>
  <div class="block fl">
    <el-image  v-if="list.user_idcard_logo_back"
      :src="user.qyurl+list.user_idcard_logo_back"
      :preview-src-list="[user.qyurl+list.user_idcard_logo_back]"
      :fit="fits[2]"></el-image>
       <el-image v-else
      :src="require('../../../assets/image/moren.png')"
      :preview-src-list="[require('../../../assets/image/moren.png')]"
      :fit="fits[2]"></el-image>
      <p class="demonstration tc p15">{{ fits[2] }}</p>
  </div>
      </el-col>
     </el-row>
    </el-tab-pane>
   
  </el-tabs>
</el-main>
  </el-container>
</template>
<script>
import axios from '../../../util/api'
import { local} from '../../../util/util'
export default {
  data () {
    return {
      page: {
       user_code:'',
      },
      activeName: 'first',
       fits: ['头像', '身份证正面', '身份证背面'],
       list: [],
       companytag_code:'',
       id1:'',
       id2:'',
       textarea: '',
       user:'',
    }
  },
   created () {
         this.user = local.get('user');
     this.page.user_code=this.$route.query.id;
     this.init(this.page)
  },
  methods: {
      init (params) {
      axios.get('/api/user/single', params).then((v) => {
       this.list=v
      })
    },

  }
}
</script>
<style lang="scss" scoped>
.recorddetail{
  overflow-x: hidden;
  .add{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .title{
    div{min-height: 20px}
    img{width: 18px;margin-left: 5px;vertical-align: text-bottom}
    .type_img{    
  position: absolute;
    right: 10%;
    width: 80px;
    z-index: 100;
    top: 10%;}
  }
  .el-image{width: 160px; height: 160px;margin-right: 10px}
  .back_btn{background:rgba(247,248,249,1);border:1px solid rgba(217,222,225,1);}
  .recorddetail-title{height: 34px;line-height: 34px;border-left: 2px solid #788287}
/deep/ .el-collapse{border:1px solid rgba(235, 239, 241, 1);
  .el-collapse-item__header{background:rgba(247,248,249,1);
  .flex{display: flex;align-items: center};
  .el-col-9{line-height: 1.5};
}
.el-collapse-item__content{padding-bottom: 0px;
.el-table{margin-bottom: 0px !important;}

} }

}

</style>
