<template>
  <el-container class="shopList">
    <el-header class="box add bb">
        <h5 class="mb10"><span class="lines"></span>巡查列表</h5>
         <div><el-button   class=""  icon="el-icon-plus" size="small" type="primary" @click="$router.push({path: 'patrol/patrolConfigadd'})">新增巡查项</el-button></div>
    </el-header>
    <el-main class="p15 pt0">
    <el-row class="box search mt20">
       <!-- <el-form :inline="true" :model="page" class="demo-form-inline">
        
        <el-col :span="4" class="mr10">
         <el-form-item size="small">
          <el-select v-model="page.companytag_code" clearable placeholder="企业类型" @change="change(1,page.companytag_code)">
              <el-option v-for="v in list_btn" :key="v.val" :label="v.val" :value="v.title">{{v.title}}</el-option>
          </el-select>
        </el-form-item>
        </el-col>
         <el-col :span="2" class="tl mr10">
           <el-form-item  size="small">
          <el-button  type="primary"  @click="onSubmit" class="general_bgc general_border cfff">查询</el-button>
        </el-form-item>
        </el-col>
      </el-form> -->
    </el-row>
    <div class="box list">
       <el-table border :data="tableData" style="width: 100%">
        <el-table-column type="index" align='center' width="60"  label="序号"></el-table-column>
         <el-table-column prop="config_code"  min-width="120" :show-overflow-tooltip="true"  label="巡查项单号" align='center' ></el-table-column>
         <el-table-column prop="companytag_name" min-width="120" :show-overflow-tooltip="true"  label="主体类型" align='center'></el-table-column>
          <el-table-column label="操作" width="180" fixed="right"  align='center'>
          <template slot-scope="scope">
           <!-- <el-button type="text" class="general_color" size="small" @click="godetail(scope.row.config_code)">详情</el-button> -->
           <el-button type="text" class="general_color" size="small" @click="goupdate(scope.row.config_code,1)">更新</el-button>
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
        companytag_code:'',
      },
      options2:'',
    //   list_btn:[{title: '四川省小作坊备案证',val:'1001574645421581111111101'},{title: '四川省小经营店备案证（流通）',val:'1001574645421581111111102'},{title: '食品经营许可（餐饮）',val:'1001574645421581111111103'},{title: '四川省小经营店备案证（餐饮）',val:'1001574645421581111111104'},{title: '食品经营许可证（流通）',val:'1001574645421581111111105'}],
     currentPage: 1,
      total: 0,
      tableData:[],
      activeName:'1',
    }
  },
   created () {
    this.currentPage = this.page.pager_offset / 10 + 1
    this.init(this.page)
  },
  methods: {
           init (params) {
          axios.get('/api/patrolConfig/list',{companytag_code:''}).then((v) => {
              this.tableData=v.pager_list
              this.total = v.pager_count
          })
    },
    // 分页
    currentChange(page){
      this.currentPage = page;
      this.page.pager_offset = String((page - 1) * 10)
    //   this.$store.dispatch('patrol/setNewPage', this.page)
      this.init(this.page)
    },
     goupdate(val,index){
          this.$router.push({
        name: "patrolConfigAdd",
        query: {
          id: val,
          active:index
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

 /deep/ .el-input-group__append .el-button--primary .el-icon-search{color: #fff}
}

</style>
