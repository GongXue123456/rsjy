<template>
  <div class="recorddetail p15">
    <div class="box add">
        <h5 class="mb10"><span class="lines"></span>留样管理</h5>
        <div><el-button  class="back_btn" size="small" plain  @click="$router.back()">返回</el-button></div>
    </div>
    <!-- <div class="box title mt20 mb20 f16"><div class="tl c333">{{list.company_name}}</div>
     </div> -->
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
    <el-table-column
      prop="img"
      align='center'
      label="留样图片">
       <template slot-scope="scope">
      <img  :src="''+scope.row.sample_img" alt="" style="width: 40px;height: 40px">
    </template>
    </el-table-column>
    <el-table-column align='center'
      prop="sample_name"
      label="留样样品名">
    </el-table-column>
    <el-table-column align='center'
      prop="sample_num"
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
    
    <!-- 
      -->
  </div>
</template>
<script>
import axios from '../../../util/api'
import aa from '../../../../static/data.json'
export default {
  data () {
    return {
      page: {
            pager_offset: '0',
       foodsource_code:'',
      },
      activeName: 'first',
       list:[],
        currentPage: 1,
      total: 0,
    }
  },
   created () {
     this.page.foodsource_code=this.$route.query.id;
     this.init(this.page)
  },
  methods: {
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
