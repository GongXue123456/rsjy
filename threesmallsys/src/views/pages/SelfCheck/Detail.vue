<template>
  <el-container class="recorddetail container">
    <el-header class="box add bb">
        <h5 class="mb10"><span class="lines"></span>自查自纠详情</h5>
        <div><el-button  class="back_btn" size="small" plain  @click="$router.back()">返回</el-button></div>
    </el-header>
<el-main class="pr pt0">
         <div class="box title mt20 mb20 f16">
        <div class="tl c333" >{{company_name}}</div>
     </div>
      <el-collapse accordion v-if="list.length>0">
  <el-collapse-item v-for="(item,index) in list" :key="index">
    <template slot="title">
     <el-row class="w tl pl20 flex">
  <el-col :span="24">{{item.page_config_name}}</el-col>
</el-row>
    </template>
      <el-table border :data="item.page_config_content_new"  style="width: 100%;margin-bottom: 20px;" >
    <el-table-column width="80px" align='center' type="index" label="序号">
    </el-table-column>
    <el-table-column align='center' min-width="150" :show-overflow-tooltip="true" prop="attr_ch" label="自查自纠标题"> </el-table-column>
    <el-table-column align='center' min-width="150" :show-overflow-tooltip="true" prop="" label="是否合格">
        <template slot-scope="scope">
              <span v-if="scope.row.attr_val=='合格'">合格</span>
              <span v-else-if="scope.row.attr_val=='不合格'" class="red">不合格</span>

        </template>
    </el-table-column>
    <el-table-column  align='center' min-width="150" :show-overflow-tooltip="true" prop="describe" label="描述"></el-table-column>
    <el-table-column align='center' min-width="150" :show-overflow-tooltip="true" label="现场照片">
        <template slot-scope="scope">
      <el-image v-if="scope.row.url" class="mr10" :src="user.qyurl+scope.row.url" :preview-src-list="[user.qyurl+scope.row.url]" style="width:35px;height:35px"></el-image>
       <img v-else src="../../../assets/image/moren.png"   style="width: 40px;height: 40px"/>
    </template>
    </el-table-column>
   
   
  </el-table>
  </el-collapse-item>
</el-collapse>
  <div  v-else>暂无数据</div>
        <!-- <el-row v-for="(item,index) in list" :key="index" class="box mt20  f14 c666">
         <el-col :span="24" class="recorddetail-title bgcfbe tl mb20 pl15">{{item.page_config_name}}</el-col>
        <el-col :span="10" v-for="(item1,index1) in item.page_config_content_new" :key="index1" class="tr mb20" :offset="1">
          <span class="left tr" style="width:80%">{{item1.attr_ch}}：</span><span class="c333">{{item1.attr_val}}</span>
          <span class="left tr" style="width:80%">{{item1.describe}}：</span> <el-image style="width:50px;height:50px;" v-if="item1.url"
      :src="user.qyurl+item1.url"
      :preview-src-list="[user.qyurl+item1.url]"
      ></el-image>
       <el-image style="width:50px;height:50px;"  v-else
      :src="require('../../../assets/image/moren.png')"
      ></el-image>
        </el-col>
     </el-row> -->
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
       checkself_code:'',
      },
      company_name:'',
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
     this.page.checkself_code=this.$route.query.id;
     this.company_name=this.$route.query.name;
     this.init(this.page)
  },
  methods: {
      init (params) {
      axios.get('/api/checkSelf/single', params).then((v) => {
       this.list=JSON.parse(v.checkSelf.checkself_content)
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
