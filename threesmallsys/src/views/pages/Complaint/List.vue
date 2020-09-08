<template>
  <el-container class="shopList ">
    <el-header class="box add bb">
        <h5 ><span class="lines"></span>投诉举报列表</h5>
       
    </el-header>
    <el-main class="p15 pt0">
   <el-row class="box mt20 search">
       <el-form :inline="true"  :model="page" class="demo-form-inline">
        <el-col :span="4" class="mr10">
             <el-form-item size="small" >
         <el-input placeholder="投诉举报对象、内容" v-model="page.company_name" clearable class="input-with-select" @clear="onSubmit">
            </el-input>
        </el-form-item>
        </el-col>
         <el-col :span="8" class="mr10">
          <el-form-item size="small">
            <el-col class="line" :span="11">
            <el-date-picker type="date" clearable placeholder="开始日期" v-model="page.add_time"  :picker-options="pickerOptionsStart" style="width: 100%;" format="yyyy-MM-dd" value-format="yyyy-MM-dd" @change="change(6,page.add_time)"></el-date-picker>
           </el-col>
            <el-col class="line" :span="2">至</el-col>
           <el-col class="line" :span="11">
            <el-date-picker  type="date" clearable placeholder="结束日期" v-model="page.end_time" :picker-options="pickerOptionsEnd" style="width: 100%;" format="yyyy-MM-dd" value-format="yyyy-MM-dd" @change="change(7,page.end_time)"></el-date-picker>
           </el-col>
        </el-form-item>
        </el-col>
        <el-col :span="2" class="tl">
           <el-form-item  size="small">
          <el-button  type="primary"  @click="onSubmit" class="general_bgc general_border cfff">查询</el-button>
        </el-form-item>
        </el-col>
       
      </el-form>
    </el-row>
    <div class="box list">
       <div class="tl list_tab ">
          <div v-for="(v,k) in list_btn4" :key="k" class="pr disib mr10">
          <el-button  :class="activeClass ==k?'active':''" size="small" @click="IsActive(k,v.id)">{{v.title}}<span v-if="v.id=='1'&&count>0" class="list_tag pa disib bgcred cfff">{{count}}</span></el-button>  
         </div>
         </div>
      <el-table border  :data="tableData" style="width: 100%">
        <el-table-column type="index" align='center' width="60" label="序号"></el-table-column>
      
        <el-table-column prop="complaintreport_title"  min-width="150" :show-overflow-tooltip="true"  label="投诉举报标题" align='center'></el-table-column>
         <el-table-column prop="company_name" min-width="150" :show-overflow-tooltip="true"  label="投诉举报对象" align='center'></el-table-column>
        <el-table-column prop="result_user_name" min-width="100" :show-overflow-tooltip="true" label="处理人员" align='center'></el-table-column>
        <el-table-column prop="complaintreport_state" min-width="100" :show-overflow-tooltip="true" label="处理进度" align='center'>
           <template slot-scope="scope">
              <span v-if="scope.row.complaintreport_state==1" class="red">待处理</span>
              <span v-else-if="scope.row.complaintreport_state==2" >已处理</span>
        </template>
        </el-table-column>
        <el-table-column prop="update_time" min-width="150" :show-overflow-tooltip="true" label="时间" align='center'></el-table-column>
        <el-table-column  label="操作" class-name='aa' min-width="120"  fixed="right"  align='center'>
          <template slot-scope="scope">
            <el-button  type="text" class=" disib"  size="mini"  @click="godetail(1,scope.row.complaintreport_code)">详情</el-button>
             <el-button type="primary" v-if="scope.row.complaintreport_state==1" size="small" @click="godetail(2,scope.row.complaintreport_code)">去处理</el-button>
            
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
      company_name: '',
     complaintreport_state:'',
     add_time:'',
     end_time:''
      },
      page1:{
        checkself_code:'',
        checkself_code_list:[]
      },
       activeClass:0,
       list_btn4:[{id:'',title: '全部'},{id:'1',title: '未处理'},{id:'2',title: '已处理'}],
       currentPage: 1,
      total: 0,
      count:'',
      tableData:[],
        pickerOptionsStart: {
        disabledDate: time => {
          if (this.page.end_time) {
            return time.getTime() > new Date(this.page.end_time).getTime()
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
      complaintPage: (state) => state.complaint.complaintPage
    })
  },
   created () {
     var that=this;
      that.page = Object.assign({}, that.complaintPage);
      that.activeClass=String(that.page.complaintreport_state)
          that.currentPage = that.page.pager_offset / 10 + 1;
    that.init(that.page)
    that.getCount();
  },
  methods: {
       init (params) {
          var that=this;
          axios.get('/api/complaintReport/list', params).then((v) => {
        that.tableData=v.complaintReportList;
         that.total = v.pager_count;
      }).catch(() => {})
    },
     change(index,val){
            var that=this;
if(index==6){that.page.add_time=val}
if(index==7){that.page.end_time=val}
this.onSubmit()
    },
    getCount(){
        axios.get('/api/complaintReport/list', {
         pager_offset: "0",
      company_name: '',
     complaintreport_state:'1',
     add_time:'',
     end_time:''
      }).then((v) => {
           this.count=v.pager_count
      })
    },
    // 搜索
     onSubmit () { 
        var that=this;
      that.currentPage = 1
      that.page.pager_offset = '0'
         if(this.page.end_time==null){this.page.end_time='';}
      if(this.page.add_time==null){this.page.add_time='';}
      that.$store.dispatch('complaint/setNewPage', that.page)
      that.init(that.page)
    },
    // 分页
    currentChange(page){
        var that=this;
      that.currentPage = page;
      that.page.pager_offset = String((page - 1) * 10)
      that.$store.dispatch('complaint/setNewPage', that.page)

      that.init(that.page)
    },
  godetail(index,val){
    this.$router.push({
        name: "ComplaintDetail",
        query: {
          id: val,
          active:index
        }
      });
  },
    IsActive(k,val) {
      var that=this;
        this.activeClass = k;
           this.page.complaintreport_state=val;
        that.$store.dispatch('complaint/setNewPage', that.page)
      that.init(that.page)
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
   /deep/ .el-checkbox__label {
    display: none !important;
  }
 /deep/ .el-input-group__append .el-button--primary .el-icon-search{color: #fff}
  /deep/.el-table .aa .cell {display: flex;justify-content: center;}
   /deep/ .el-table .disabledCheck .cell .el-checkbox__inner{
    display: none !important; 
}
}

</style>
