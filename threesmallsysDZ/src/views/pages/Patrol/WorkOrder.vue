<template>
  <el-container class="shopList">
    <el-header class="box add bb">
        <h5 class="mb10"><span class="lines"></span>工单查询</h5>
        <!-- <div><el-button  class="general_color general_border"  icon="el-icon-plus" size="small" plain>新增备案</el-button></div> -->
    </el-header>
    <el-main class="p15 pt0">
    <el-row class="box search mt20">
       <el-form :inline="true" :model="page" class="demo-form-inline">
        <el-col :span="4" class="mr10">
           <el-form-item size="small">
          <el-select v-model="page.patrol_result" clearable placeholder="巡查结果" @change="change(8,page.patrol_result)">
            <el-option v-for="v in list_btn3" :key="v.title" :label="v.title" :value="v.title"></el-option>
          </el-select>
        </el-form-item>
        </el-col>
        <el-col :span="4" class="mr10">
         <el-form-item size="small">
          <el-select v-model="page.patrol_type" clearable placeholder="工单类型" @change="change(1,page.patrol_type)">
              <el-option v-for="v in options2" :key="v.id" :label="v.name" :value="v.id"></el-option>
          </el-select>
        </el-form-item>
        </el-col>
        
        <el-col :span="8" class="mr10">
          <el-form-item size="small">
            <el-col class="line" :span="11">
            <el-date-picker type="date" placeholder="巡查开始日期" v-model="page.search_time_bigen"  :picker-options="pickerOptionsStart" style="width: 100%;" format="yyyy-MM-dd" value-format="yyyy-MM-dd" @change="change(6,page.search_time_bigen)"></el-date-picker>
           </el-col>
            <el-col class="line" :span="2">至</el-col>
           <el-col class="line" :span="11">
            <el-date-picker  type="date" placeholder="巡查结束日期" v-model="page.search_time_end" :picker-options="pickerOptionsEnd" style="width: 100%;" format="yyyy-MM-dd" value-format="yyyy-MM-dd" @change="change(7,page.search_time_end)"></el-date-picker>
           </el-col>
        </el-form-item>
        </el-col>
        <el-col :span="4" class="mr10">
             <el-form-item size="small" >
         <el-input placeholder="巡查对象、巡查人、派发人" clearable @clear='onSubmit' v-model="page.company_name" class="input-with-select">
            </el-input>
        </el-form-item>
        </el-col>
         <el-col :span="2" class="tl mr10">
           <el-form-item  size="small">
          <el-button  type="primary"  @click="onSubmit" class="general_bgc general_border cfff">查询</el-button>
        </el-form-item>
        </el-col>
      </el-form>
    </el-row>
     <div class="box list">
       <el-table border :data="tableData" style="width: 100%">
        <el-table-column type="index" align='center' width="60"  label="序号"></el-table-column>
         <el-table-column prop="work_order"  min-width="120" :show-overflow-tooltip="true"  label="工单号" align='center' ></el-table-column>
         <el-table-column  min-width="120" :show-overflow-tooltip="true"  label="工单类型" align='center' :formatter="userTypeList"></el-table-column>
          <el-table-column prop="user_name"  min-width="120" :show-overflow-tooltip="true"  label="派发人" align='center' ></el-table-column>
         <el-table-column prop="patrol_user_name"  min-width="120" :show-overflow-tooltip="true"  label="抽查人" align='center' ></el-table-column>
         <el-table-column prop="company_name" min-width="120" :show-overflow-tooltip="true"  label="抽查对象" align='center'></el-table-column>
        <el-table-column  prop="add_time"   min-width="120" :show-overflow-tooltip="true" label="派发时间" align='center'></el-table-column>
         <el-table-column  prop="patrol_time"   min-width="120" :show-overflow-tooltip="true" label="巡查时间" align='center'></el-table-column>
        <el-table-column   min-width="120" :show-overflow-tooltip="true" label="巡查结果" align='center'>
            <template slot-scope="scope">
              <span v-if="scope.row.patrol_result=='不合格'" class="red">不合格</span>
              <span v-else-if="scope.row.patrol_result=='合格'">合格</span>
               <span v-else>---</span>
        </template>
        </el-table-column>
        <el-table-column label="操作" width="80" fixed="right"  align='center'>
          <template slot-scope="scope">
           <el-button type="text" class="general_color" size="small" @click="godetail(scope.row.patrol_code)">详情</el-button>
          
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
        company_code:'',
        patrol_result:'',
        business_form:'',
        patrol_user_name:'',
        department_code:'',
        search_time_bigen:'',
        search_time_end:'',
      },
      options2:[{name:'普通巡查',id:'1'},{name:'双随机抽查',id:'2'},{name:'工单派发',id:'3'}],
      options4:'',
      list_btn3:[{id:'1',title: '合格'},{id:'2',title: '不合格'}],
     currentPage: 1,
      total: 0,
      tableData:[],
       pickerOptionsStart: {
        disabledDate: time => {
          if (this.page.search_time_end) {
            return time.getTime() > new Date(this.page.search_time_end).getTime()
          }else{return time.getTime() > Date.now()}
        }
      },
      pickerOptionsEnd: {
        disabledDate: time => {
          return time.getTime() > Date.now()
        }
      },
    }
  },
    computed: {
    ...mapState({
      patrolPage: (state) => state.patrol.patrolPage
    })
    
  },
   created () {
     this.page = Object.assign({}, this.patrolPage);
    this.currentPage = this.page.pager_offset / 10 + 1
    this.page.search_time_bigen = ''
    this.page.search_time_end = ''
    this.init(this.page)
  },
  methods: {
           init (params) {
          axios.get('/api/company/department/list', {state:'1'}).then((v) => {this.options4=v.department_list })
      axios.get('/api/patrol/search', params).then((v) => {
        this.tableData=v.pager_list;
         this.total = v.pager_count
      })
      // axios.get('/api/dictionary/search', {companytag_code:this.page.companytag_code}).then((v) => {
      // this.options2=v.主体业态.食品经营许可
      // })
    },
     userTypeList(row){if(row.patrol_type==1){return '普通巡查'}else if(row.patrol_type==2){return '双随机抽查'}else if(row.patrol_type==3){return '工单派发'}},
          change(index,val){
             var that=this;
            if (val == null) val = '';
if(index==1){that.page.patrol_type=val;}
if(index==3){that.page.department_code=val;}
if(index==6){that.page.search_time_bigen=val}
if(index==7){that.page.search_time_end=val}
if(index==8){that.page.patrol_result=val;}
this.onSubmit()
    },
     // 搜索
     onSubmit () { 
      this.currentPage = 1
      this.page.pager_offset = '0'
        if(this.page.search_time_end==null){this.page.search_time_end='';}
      if(this.page.search_time_bigen==null){this.page.search_time_bigen='';}
      this.$store.dispatch('patrol/setNewPage', this.page)
      this.init(this.page)
    },
    // 分页
    currentChange(page){
      this.currentPage = page;
      this.page.pager_offset = String((page - 1) * 10)
      this.$store.dispatch('patrol/setNewPage', this.page)
      this.init(this.page)
    },
   godetail(index){
    this.$router.push({
        name: "WorkOrderDetail",
        query: {
          id: index
        }
      });
  }
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
