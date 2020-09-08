<template>
  <el-container class="shopList">
    <el-header class="box add bb">
        <h5 class="mb10"><span class="lines"></span>诚信等级详情</h5>
       <div>
          <el-button  class="back_btn"  size="small" plain @click="$router.back()">返回</el-button>
        </div>
    </el-header>
    <el-main class="pt0">
       <el-form :inline="true"  status-icon ref="page"  :model="page"  class="demo-ruleForm">
       <div class="box title mt20 mb20 f16">
       <div class="tl c333 rate mb20" >{{company_name}}
         <el-rate class="disib ml10 f20" v-model="lvl_new" disabled show-score text-color="#ff9900" score-template="{value}"> </el-rate>
       </div>
       <el-col :span="22" class="tl" >
          <el-form-item class="w"  label="" >
              <el-button v-for="(v,k) in list_btn" :key="k" :class="activeClass ==k?'active':''" class=""  size="small" @click="IsActive(k,v.val)">{{v.title}}</el-button>  
          </el-form-item>
         </el-col>
     </div>
       </el-form>
    <div class="box list">
       <el-table border :data="tableData" style="width: 100%">
        <el-table-column type="index" label="序号" width="60" align='center'></el-table-column>
         <el-table-column prop="" min-width="150" :show-overflow-tooltip="true" label="评定类型" align='center'>
            <template slot-scope="scope">
             <span v-if="scope.row.mete_type==1">公众评分</span>
              <span v-else-if="scope.row.mete_type==2">监管评分</span>
            </template>
         </el-table-column>
        <el-table-column prop="add_time" min-width="150" :show-overflow-tooltip="true" label="评定时间" align='center'></el-table-column>
         <el-table-column prop="remark" min-width="150" :show-overflow-tooltip="true" label="备注" align='center'></el-table-column>
        <el-table-column prop="integrity_lvl"  min-width="150" :show-overflow-tooltip="true" label="评分"  align='center'>
            <template slot-scope="scope">
              <el-rate v-model="scope.row.integrity_lvl" disabled show-score text-color="#ff9900" score-template="{value}"> </el-rate>
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
import { mapState } from 'vuex'
export default {
  data () {
    return {
      page: {
        pager_offset: '0',
        company_integrity_code:'',
        mete_type:''
      },
      lvl_new:0,
      company_name: '',
     currentPage: 1,
      total: 0,
      tableData:[],
      activeClass:0,
      list_btn:[{title: '全部',val:''},{title: '公众评分',val:'1'},{title: '监管评分',val:'2'}],
    }
  },
  mounted(){
  },
   created () {
      this.page.company_integrity_code=this.$route.query.id;
       this.company_name=this.$route.query.name;
    this.currentPage = this.page.pager_offset / 10 + 1
    this.init(this.page)
  },
  methods: {
           init (params) {
             var that=this
        axios.get('/api/companyIntegrityLog/list', params).then((v) => {
        that.tableData=v.company_integrity_log_list;
        if(v.company_integrity_log_list.length>0){ this.lvl_new=v.company_integrity_log_list[0].integrity_lvl}
       
         that.total = v.pager_count;
      })
    },
     IsActive(k,val) {
        this.activeClass = k;
        this.page.mete_type=val;
          this.init(this.page)
      },
    // 分页
    currentChange(page){
      this.currentPage = page;
      this.page.pager_offset = String((page - 1) * 10)
      this.init(this.page)
    },
   godetail(index){
    this.$router.push({
        name: "DetailLog",
        query: {
          id: index,
          name:this.company_name
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
 /deep/ .el-input-group__append .el-button--primary .el-icon-search{color: #fff}
  /deep/ .rate .el-rate__icon{font-size: 25px;}
}

</style>
