<template>
  <el-container class="shopList ">
    <el-header class="box add bb">
        <h5 ><span class="lines"></span>自查自纠记录</h5>
         <div><el-button  class="back_btn" size="small" plain  @click="$router.back()">返回</el-button></div>
    </el-header>
    <el-main class="p15 pt0">
      <div class="box title mt20 mb20 f16">
        <div class="tl c333" >{{company_name}}</div>
     </div>
    <div class="box list">
      <el-table border  :data="tableData"  style="width: 100%">
        <el-table-column type="index" align='center' width="60" label="序号"></el-table-column>
        <el-table-column prop="add_time" min-width="150" :show-overflow-tooltip="true" label="自查自纠时间" align='center'></el-table-column>
        <el-table-column  label="操作" class-name='aa' min-width="100"  fixed="right"  align='center'>
          <template slot-scope="scope">
           <el-button type="text" class=" disib"  size="mini"  @click="godetail(scope.row.checkself_code,scope.row.company_name)">详情</el-button>
         </template>
        </el-table-column>
      </el-table>

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
    </div> 
</el-main>
  </el-container>
</template>
<script>
import axios from '../../../util/api'
import { local,aa } from '../../../util/util'
import Globle from '@/components/Globle'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      page: {
        pager_offset: "0",
      company_code: '',
     
      },
      company_name:'',
      options4:'',
      options2:'',
       activeClass:0,
       currentPage: 1,
      total: 0,
      count:'',
      tableData:[],
    }
  },

   created () {
     var that=this;
        this.page.company_code=this.$route.query.id;
        this.company_name=this.$route.query.name;
          that.currentPage = that.page.pager_offset / 10 + 1;
    that.init(that.page)
  },
  methods: {
       init (params) {
          var that=this;
          axios.get('/api/checkSelf/clist', params).then((v) => {
        that.tableData=v.check_list;
         that.total = v.pager_count
      }).catch(() => {})
    },
    // 分页
    currentChange(page){
        var that=this;
      that.currentPage = page;
      that.page.pager_offset = String((page - 1) * 10)
      that.init(that.page)
    },
    godetail(index,val){
    this.$router.push({
        name: "SelfListDetail",
        query: {
          id: index,
          name:val
        }
      });
  },
  }
}
</script>
<style lang="scss" scoped>
.shopList{
  overflow-x: hidden;
  .add{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
    .active {
       background: #2EC68A;
    border-color: #2EC68A;
    color: #FFFFFF;
  }
  .list_tab{
    padding: 10px;
    background-color:  #f5f7fa;
    .list_tag{
    right: -10px;
    padding:2px 6px;
    border-radius: 10px;
    top: -10px;}
  }
  
 /deep/ .el-input-group__append .el-button--primary .el-icon-search{color: #fff}
  /deep/.el-table .aa .cell {display: flex;justify-content: center;}
}

</style>
