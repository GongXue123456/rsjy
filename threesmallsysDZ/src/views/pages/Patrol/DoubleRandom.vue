<template>
  <el-container class="shopList">
    <el-header class="box add bb">
        <h5 class="mb10"><span class="lines"></span>双随机抽查</h5>
        <!-- <div><el-button  class="general_color general_border"  icon="el-icon-plus" size="small" plain>新增备案</el-button></div> -->
    </el-header>
    <el-main class="p15 pt0">
    <el-row class="box search mt20">
       <el-form :inline="true" :model="page" class="demo-form-inline">
        <el-col :span="4" class="mr10">
           <el-form-item size="small">
          <el-select v-model="page.patrol_result" clearable placeholder="抽查结果" @change="change(8,page.patrol_result)">
            <el-option v-for="v in list_btn3" :key="v.title" :label="v.title" :value="v.title"></el-option>
          </el-select>
        </el-form-item>
        </el-col>
        
        <el-col :span="8" class="mr10">
          <el-form-item size="small">
            <el-col class="line" :span="11">
            <el-date-picker type="date" placeholder="抽查开始日期" v-model="page.search_time_bigen"  :picker-options="pickerOptionsStart" style="width: 100%;" format="yyyy-MM-dd" value-format="yyyy-MM-dd" @change="change(6,page.search_time_bigen)"></el-date-picker>
           </el-col>
            <el-col class="line" :span="2">至</el-col>
           <el-col class="line" :span="11">
            <el-date-picker  type="date" placeholder="抽查结束日期" v-model="page.search_time_end" :picker-options="pickerOptionsEnd" style="width: 100%;" format="yyyy-MM-dd" value-format="yyyy-MM-dd" @change="change(7,page.search_time_end)"></el-date-picker>
           </el-col>
        </el-form-item>
        </el-col>
        <el-col :span="4" class="mr10">
             <el-form-item size="small" >
         <el-input placeholder="抽查对象、抽查人、派发人" clearable @clear='onSubmit' v-model="page.company_name" class="input-with-select">
            </el-input>
        </el-form-item>
        </el-col>
         <el-col :span="6" class="tl mr10">
           <el-form-item  size="small">
          <el-button  type="primary"  @click="onSubmit" class="general_bgc general_border cfff">查询</el-button>
          <el-button type="primary" v-if="loading==false" size="small" @click="DownExcel">导出数据</el-button>
          <el-button  v-else-if="loading==true" type="info" disabled size="small" >导出数据</el-button><el-button type="primary" size="small" @click="PatroleAdd">双随机工单派发</el-button>
        </el-form-item>
        </el-col>
      </el-form>
    </el-row>
     <div class="box list">
       <el-table border :data="tableData" style="width: 100%">
        <el-table-column type="index" align='center' width="60"  label="序号"></el-table-column>
         <el-table-column prop="work_order"  min-width="120" :show-overflow-tooltip="true"  label="工单号" align='center' ></el-table-column>
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
        pager_openset:'10',
        patrol_result:'',
        business_form:'',
        patrol_user_name:'',
        department_code:'',
        search_time_bigen:'',
        search_time_end:'',
        patrol_type:'2',
      },
      timer: '',
      loading:false,
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
      }
    }
  },
    computed: {
    ...mapState({
      patrolPage: (state) => state.patrol.patrolPage
    })
    
  },
  // mounted() {
     
  //   },
   created () {
      this.page = Object.assign({}, this.patrolPage);
    this.currentPage = this.page.pager_offset / 10 + 1    
    this.page.search_time_bigen = ''
    this.page.search_time_end = ''
    this.init(this.page)
    // this.check()
  },
  methods: {
           init (params) {
            params.patrol_type='2';
          axios.get('/api/company/department/list', {state:'1'}).then((v) => {this.options4=v.department_list })
      axios.get('/api/patrol/search', params).then((v) => {
        this.tableData=v.pager_list;
         this.total = v.pager_count
      })
    },
     userTypeList(row){return row.place_area+'平方米'},
    userTypeList3(row){
       if(row.companytag_code=='1001574645421581111111103'){return '食品经营许可';}else if(row.companytag_code=='1001574645421581111111104'){return '小餐饮（备案）';}else if(row.companytag_code=='1001574645421581111111101'){return '四川省小作坊备案证';}else if(row.companytag_code=='1001574645421581111111102'){return '四川省小经营店备案证';}
    },
          change(index,val){
             var that=this;
            if (val == null) val = '';
if(index==1){that.page.business_form=val;}
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
    PatroleAdd(){
     this.$router.push({
        name: "PatrolAdd",
        query: {
           id1:2,
        }
      });
  },
   godetail(index){
   this.$router.push({
        name: "WorkOrderDetail",
        query: {
          id: index
        }
      });
  },
  //导出
    DownExcel () { 

  this.loading=true;
  this.timer=setInterval(() => { this.check();}, 1000);
      this.currentPage = 1
      this.page.pager_offset = '0'
 this.page.pager_openset=String(this.total);
      if(this.page.search_time_end==null){this.page.search_time_end='';}
      if(this.page.search_time_bigen==null){this.page.search_time_bigen='';}
      this.page.down_name = '随机抽查列表信息'
      axios.fileget('/api/report/export_patrol_double', this.page).then((v) => {
      })
    },
   check(){
     axios.get('/api/report/check',  {down_name:'export_patrol_double'}).then((v) => {
       if(v==true){
         clearInterval(this.timer);
         this.loading=false;
       }
      })
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
