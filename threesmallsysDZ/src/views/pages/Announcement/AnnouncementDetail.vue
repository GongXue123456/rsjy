<template>
  <el-container class="recorddetail container">
    <el-header class="box add bb">
        <h5 class="mb10"><span class="lines"></span>应急通告详情</h5>
        <div><el-button  class="back_btn" size="small" plain  @click="$router.back()">返回</el-button></div>
    </el-header>
<el-main class="pr pt0">
        <el-row class="box mt20  f14 c666">
         <el-col :span="24" class="recorddetail-title bgcfbe tl mb20 pl15">基础信息</el-col>
         <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">提醒方式：</span><span v-if="list.mess_type=='1'" class="c333">微信、短信</span><span v-if="list.mess_type=='2'" class="c333">短信</span><span v-if="list.mess_type=='3'" class="c333">微信</span>
        </el-col>
        <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">食品监管接受人：</span><span class="c333">{{list.mess_receive_person_name}}</span>
        </el-col>
         <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">企业用户接收人：</span><span class="c333">{{list.companytype_names}}</span>
        </el-col>
        <el-col :span="22" class="tl mb20" :offset="1">
         <span class="left">主体类型：</span> <span class="c333">{{list.companytag_names}}</span>
        </el-col>
        <el-col :span="22" class="tl mb20" :offset="1">
          <span class="left">短信模板id：</span><span class="c333">{{list.mess_sms_code}}</span>
        </el-col>
         <el-col :span="22" class="tl mb20" :offset="1">
          <span class="left">短信模板内容：</span><span class="c333">{{list.mess_sms_content}}</span>
        </el-col>
        <el-col :span="22" class="tl mb20" :offset="1">
          <span class="left">微信模板id：</span><span class="c333">{{list.mess_wx_code}}</span>
        </el-col>
        <el-col :span="22" class="tl mb20" :offset="1">
          <span class="left">微信模板id：</span><span class="c333">{{list.mess_wx_content}}</span>
        </el-col>
        
         <el-col :span="22" class="tl mb20" :offset="1">
          <span class="left">是否自动提醒：</span><span v-if="list.mess_warn_state=='1'" class="c333">是</span><span v-if="list.mess_warn_state=='2'" class="c333">否</span>
        </el-col>
        
     </el-row>
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
       mess_code:'',
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
     this.page.mess_code=this.$route.query.id;
     this.init(this.page)
  },
  methods: {
      init (params) {
      axios.get('/api/mess/notice/single', params).then((v) => {
       this.list=v.notice
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
