<template>
  <el-container class="recorddetail">
    <el-header class="box add bb">
        <h5 class="mb10"><span class="lines"></span>留样管理</h5>
        <div><el-button  class="back_btn" size="small" plain  @click="$router.back()">返回</el-button></div>
    </el-header>
     <el-main class="pt0">
       <div class="box title mt20 mb20 f16"><div class="tl c333">{{company_name}}</div>
     </div>
     <el-tabs v-model="activeName">
    
    <el-tab-pane label="留样信息" name="first">
  <el-table border
    :data="list"
    style="width: 100%;margin-bottom: 20px;"
   >
    <el-table-column
    width="80px"
    align='center'
     type="index"
      label="序号">
    </el-table-column>
    <el-table-column  prop="image_url" align='center' label="留样图片">
       <template slot-scope="scope">
      <img v-if="scope.row.sample_img==='undefined'||scope.row.sample_img===''||scope.row.sample_img==='null'"  src="../../../assets/image/source.png"   style="width: 40px;height: 40px"/>
      <el-image v-else style="width: 40px;height: 40px" :src="user.qyurl+scope.row.sample_img" :preview-src-list="[user.qyurl+scope.row.sample_img]" alt=""></el-image>
    </template>
    </el-table-column>
    <el-table-column align='center'
      prop="sample_name"
      label="留样样品名">
    </el-table-column>
    <el-table-column align='center'
      prop="sample_num"
      :formatter="userTypeList"
      label=" 留样数量">
    </el-table-column>
    <el-table-column align='center'
      prop="sample_person"
      label="留样人">
    </el-table-column>
    <el-table-column align='center'
      prop="sample_time"
      label="留样时间">
    </el-table-column>
  </el-table>

    </el-tab-pane>
  </el-tabs>
     <div class="i-page fr disib mt20">
        <el-pagination
          background
          :page-size='10'
          layout="total,prev, pager, next"
          :total="total"
          :current-page="currentPage"
          @current-change = 'currentChange'>
        </el-pagination>
      </div>  
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
            pager_offset: '0',
       company_code:'',
      },
      company_name:'',
      activeName: 'first',
       list:[],
        currentPage: 1,
      total: 0,
      user:'',
    }
  },
   created () {
     this.user = local.get('user');
     this.page.company_code=this.$route.query.id;
     this.company_name=this.$route.query.name;
     this.init(this.page)
  },
  methods: {
     userTypeList(row){return row.sample_num+' g'},
      init (params) {
       axios.get('/api/foodsource/sample', params).then((v) => {
       this.list=v.list
         this.total = v.pager_count
      })
    },
      // 分页
    currentChange(page){
      this.currentPage = page;
      this.page.pager_offset = String((page - 1) * 10)
      this.init(this.page)
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
    img{width: 18px;margin-left: 5px;vertical-align: text-bottom}
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
