<template>
  <el-container class="shopList ">
    <el-header class="box add bb">
        <h5 ><span class="lines"></span>案件列表</h5>
       <div>
        <el-button icon="el-icon-plus" size="small" type="primary"  @click="$router.push({path: 'case/add'})">添加</el-button>
      </div>
    </el-header>
    <el-main class="p15 pt0">
   <el-row class="box mt20 search">
       <el-form :inline="true"  :model="page" class="demo-form-inline">
        <el-col :span="4" class="mr10">
             <el-form-item size="small" >
         <el-input placeholder="案件标题、办案人" v-model="page.casecenter_title" clearable class="input-with-select" @clear="onSubmit">
            </el-input>
        </el-form-item>
        </el-col>
        <el-col :span="4" class="mr10">
           <el-form-item size="small">
          <el-select v-model="page.casecenter_audit_state" clearable placeholder="案件状态" @change="change(1,page.casecenter_audit_state)">
            <el-option v-for="v in list_btn" :key="v.id" :label="v.title" :value="v.id"></el-option>
          </el-select>
        </el-form-item>
        </el-col>
        <el-col :span="4" class="mr10" v-show="resshow">
           <el-form-item size="small">
          <el-select v-model="page.result_state" clearable placeholder="处理状态" @change="change(2,page.result_state)">
            <el-option v-for="v in list_btn1" :key="v.id" :label="v.title" :value="v.id"></el-option>
          </el-select>
        </el-form-item>
        </el-col>
         <el-col :span="8" class="mr10">
          <el-form-item size="small">
            <el-col class="line" :span="11">
            <el-date-picker type="date" clearable placeholder="案件开始日期" v-model="page.add_time"  :picker-options="pickerOptionsStart" style="width: 100%;" format="yyyy-MM-dd" value-format="yyyy-MM-dd" @change="change(6,page.add_time)"></el-date-picker>
           </el-col>
            <el-col class="line" :span="2">至</el-col>
           <el-col class="line" :span="11">
            <el-date-picker  type="date" clearable placeholder="案件结束日期" v-model="page.end_time" :picker-options="pickerOptionsEnd" style="width: 100%;" format="yyyy-MM-dd" value-format="yyyy-MM-dd" @change="change(7,page.end_time)"></el-date-picker>
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
      <el-table border  :data="tableData" style="width: 100%">
        <el-table-column type="index" align='center' width="60" label="序号"></el-table-column>
      
        <el-table-column prop="casecenter_code"  min-width="150" :show-overflow-tooltip="true"  label="案件编号" align='center'></el-table-column>
         <el-table-column prop="casecenter_title" min-width="150" :show-overflow-tooltip="true"  label="案件标题" align='center'></el-table-column>
        <el-table-column prop="user_name_main" min-width="100" :show-overflow-tooltip="true" label="办理人员" align='center'></el-table-column>
        <el-table-column prop="casecenter_audit_state" min-width="100" :show-overflow-tooltip="true" label="处理进度" align='center'>
           <template slot-scope="scope">
              <span v-if="scope.row.casecenter_audit_state==1" class="cac">待审核</span>
              <span v-else-if="scope.row.casecenter_audit_state==3" class="red">审核不通过</span>
               <span v-else-if="scope.row.casecenter_audit_state==2&&scope.row.result_state==1" class="orange">未处理</span>
               <span v-else-if="scope.row.casecenter_audit_state==2&&scope.row.result_state==2" class="general_color">已处理</span>
        </template>
        </el-table-column>
        <el-table-column prop="add_time" min-width="150" :show-overflow-tooltip="true" label="案件生成时间" align='center'></el-table-column>
        <el-table-column  label="操作" class-name='aa' min-width="120"  fixed="right"  align='center'>
          <template slot-scope="scope">
            <el-button  type="text" class=" disib"  size="mini"  @click="godetail(1,scope.row.casecenter_code)">详情</el-button>
             <el-button type="primary" v-if="scope.row.casecenter_audit_state==1" size="small"  @click="godetail(2,scope.row.casecenter_code)">去审批</el-button>
             <el-button type="text" v-if="scope.row.casecenter_audit_state==2&&scope.row.result_state==1"  size="mini" class="orange" @click="goupdate(scope.row.casecenter_code)">编辑</el-button>
            <el-button type="text" size="mini" v-if="scope.row.casecenter_audit_state==2&&scope.row.result_state==2" class="red" @click="godelete(scope.row.casecenter_code,scope.$index)">删除</el-button>            
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
        pager_openset:'10',
       casecenter_title:'',
      casecenter_audit_state:'',
      result_state:'',
      add_time:'',
      end_time:''
      },
      resshow:false,
      page1:{
        checkself_code:'',
        checkself_code_list:[]
      },
       list_btn:[{id:'',title: '全部'},{id:'1',title: '待审核'},{id:'2',title: '审核通过'},{id:'3',title: '审核不通过'} ],
       list_btn1:[{id:'',title: '全部'},{id:'1',title: '未处理'},{id:'2',title: '已处理'}],
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
      casesPage: (state) => state.cases.casesPage
    })
  },
   created () {
     var that=this;
      that.page = Object.assign({}, that.casesPage);
          that.currentPage = that.page.pager_offset / 10 + 1;
    that.init(that.page)
  },
  methods: {
       init (params) {
          var that=this;
          axios.get('/api/caseCenter/list', params).then((v) => {
        that.tableData=v.pager_list;
         that.total = v.pager_count;
      })
    },
     change(index,val){
            var that=this;
            if(index==1){
              if(parseInt(val) == 2){
                that.resshow=true
              }else{
                that.resshow=false;
                that.page.result_state='';
              }
              that.page.casecenter_audit_state=val
              }
              if(index==2){that.page.result_state=val}
if(index==6){that.page.add_time=val}
if(index==7){that.page.end_time=val}
this.onSubmit()
    },

    // 搜索
     onSubmit () { 
        var that=this;
      that.currentPage = 1
      that.page.pager_offset = '0'
         if(this.page.end_time==null){this.page.end_time='';}
      if(this.page.add_time==null){this.page.add_time='';}
      that.$store.dispatch('cases/setNewPage', that.page)
      that.init(that.page)
    },
    // 分页
    currentChange(page){
        var that=this;
      that.currentPage = page;
      that.page.pager_offset = String((page - 1) * 10)
      that.$store.dispatch('cases/setNewPage', that.page)

      that.init(that.page)
    },
  godetail(index,val){
    this.$router.push({
        name: "CaseCenterDetail",
        query: {
          id: val,
          active:index
        }
      });
  },
  goupdate(val){
     this.$router.push({
        name: "CaseCenterAdd",
        query: {
          id: val
        }
      });
  },
    godelete(val,index){
       this.$confirm('确定删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(() => {
           axios.delete('/api/caseCenter/delete', {casecenter_code:val}).then((v) => {
                this.tableData.splice(index, 1)
           })
        }).catch(() => {        
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
