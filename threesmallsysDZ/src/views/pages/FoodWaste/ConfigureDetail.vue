<template>
  <el-container class="recorddetail container">
    <el-header class="box add bb">
        <h5 class="mb10"><span class="lines"></span>餐厨垃圾详情</h5>
        <div><el-button  class="back_btn" size="small" plain  @click="$router.back()">返回</el-button></div>
    </el-header>
<el-main class="pr pt0">
        <el-row class="box mt20  f14 c666">
         <el-col :span="24" class="recorddetail-title bgcfbe tl mb20 pl15">基础信息</el-col>
        
        <el-col :span="22" class="tl mb20" :offset="1">
          <span class="left">类型名称：</span><span class="c333">{{list.dictionary_module}}</span>
        </el-col>
         <el-col :span="22" class="tl mb20" :offset="1">
          <span class="left">适配企业：</span><span class="c333">{{list.companytype_names}}</span>
        </el-col>
        <el-col :span="22" class="tl mb20 " :offset="1">
         <span class="left vatop">类型图片：</span>  <el-image  v-if="list.dictionary_logo_url"
      :src="user.qyurl+list.dictionary_logo_url"
      :preview-src-list="[user.qyurl+list.dictionary_logo_url]"
      ></el-image>
       <el-image v-else
      :src="require('../../../assets/image/moren.png')"
      ></el-image>
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
       dictionary_code:'',
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
     this.page.dictionary_code=this.$route.query.id;
     this.init(this.page)
  },
  methods: {
      init (params) {
      axios.get('/api/dictionary/cclj/single', params).then((v) => {
       this.list=v.cclj
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
