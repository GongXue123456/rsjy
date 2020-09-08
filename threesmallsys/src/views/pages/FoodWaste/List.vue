<template>
  <el-container class="shopList ">
    <el-header class="box add bb">
        <h5 ><span class="lines"></span>餐厨垃圾处理</h5>
        <!-- <div><el-button  class=""  icon="el-icon-plus" size="small" type="primary" @click="$router.push({path: 'produce/add'})">新增备案</el-button></div> -->
    </el-header>
    <el-main class="p15 pt0 mt20">
   <el-row class="box search">
       <el-form :inline="true"  :model="page" class="demo-form-inline">
        <el-col :span="4" class="mr10">
             <el-form-item size="small" >
         <el-input placeholder="小作坊名称、经营者" v-model="page.company_name" clearable class="input-with-select" @clear="onSubmit">
       
            </el-input>
        </el-form-item>
        </el-col>
        <el-col :span="4" class="mr10">
         <el-form-item size="small">
          <el-select v-model="page.companytag_code" clearable placeholder="主体类型" @change="change(1,page.companytag_code)">
              <el-option v-for="v in list_btn" :key="v.companytag_code" :label="v.companytag_name" :value="v.companytag_code"></el-option>
          </el-select>
        </el-form-item>
        </el-col>
        <el-col :span="4" class="mr10">
           <el-form-item size="small">
          <el-select v-model="page.examine" clearable placeholder="业务类型" @change="change(8,page.examine)">
            <el-option v-for="v in list_btn3" :key="v.id" :label="v.title" :value="v.id"></el-option>
          </el-select>
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
         <el-col :span="4" class="mr10">
           <el-form-item size="small">
            <el-select v-model="page.department_code" clearable placeholder="监管部门"  @change="change(3,page.department_code)">
             <el-option  v-for="item in options4" :key="item.department_code" :label="item.department_name" :value="item.department_code" ></el-option>
          </el-select>
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
      <el-table border  :data="tableData"  style="width: 100%">
        <el-table-column type="index" align='center' width="60" label="序号"></el-table-column>
         <el-table-column prop="record_code" min-width="150" :show-overflow-tooltip="true"  label="社会信用代码" align='center'></el-table-column>
          <el-table-column prop="company_name" min-width="150" :show-overflow-tooltip="true"  label="小作坊名称" align='center'></el-table-column>
          <el-table-column prop="record_code"  min-width="150" :show-overflow-tooltip="true" label="备案证号" align='center'> </el-table-column>
        <el-table-column prop="companytag_code"  min-width="150" :show-overflow-tooltip="true"  label="主体类型" align='center' :formatter="userTypeList3" ></el-table-column>
        <!-- <el-table-column prop="examine"  min-width="150" :show-overflow-tooltip="true" label="业务类型"  align='center'>
          <template slot-scope="scope">
              <span v-if="scope.row.examine==1" class="red">注销</span>
              <span v-else-if="scope.row.examine==2" style="color:#9D9D9D">驳回</span>
              <span v-else-if="scope.row.examine==3" >通过</span>
        </template>
        </el-table-column> -->
       <el-table-column prop="department_name"  min-width="150" :show-overflow-tooltip="true" label="监管部门"  align='center'></el-table-column>
        <el-table-column prop="cclj_time_last" min-width="150" :show-overflow-tooltip="true" label="最近一次处理时间" align='center'></el-table-column>
        <el-table-column  min-width="150" :show-overflow-tooltip="true" label="餐厨垃圾处理记录"  align='center'>
          <template slot-scope="scope">
              <span>{{scope.row.cclj_count!=null?scope.row.cclj_count:0}}</span>
        </template>
        </el-table-column>
        
        <el-table-column  label="操作" class-name='aa'  fixed="right" min-width="100"  align='center'>
          <template slot-scope="scope">
            <el-button  type="text" class="general_color disib"  size="mini"  @click="goDetail(scope.row.company_code,scope.row.company_name)">详情</el-button>
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
        companytag_code:'',
        department_code:'',
      company_name: '',
      examine:'',
      add_time:'',
      end_time:'',
       filing_state:'3'
      },
      options4:'',
      list_btn:[],
       list_btn3:[{id:'1',title: '注销'},{id:'2',title: '驳回'},{id:'3',title: '通过'}],
       currentPage: 1,
      total: 0,
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
      foodWastePage: (state) => state.foodWaste.foodWastePage
    })
    
  },
   created () {
     var that=this;
      that.page = Object.assign({}, that.foodWastePage);
          that.currentPage = that.page.pager_offset / 10 + 1;
    that.init(that.page)
  },
  methods: {
     userTypeList3(row){
       if(row.companytag_code=='1001574645421581111111103'){return '食品经营许可（餐饮）';}else if(row.companytag_code=='1001574645421581111111104'){return '四川省小经营店备案证（餐饮）';}else if(row.companytag_code=='1001574645421581111111101'){return '四川省小作坊备案证';}else if(row.companytag_code=='1001574645421581111111102'){return '四川省小经营店备案证（流通）';}else if(row.companytag_code=='1001574645421581111111105'){return '食品经营许可证（流通）';}
    },
       init (params) {
          var that=this;
          axios.get('/api/company/department/list', {state:'1',pager_openset:'500'}).then((v) => {that.options4=v.department_list })
           axios.get('/api/companytag/all', '').then((v) => {that.list_btn=v })
          axios.get('/api/company/cclj/list', params).then((v) => {
        that.tableData=v.company_list;
         that.total = v.pager_count
      })
    },
      change(index,val){
        var that=this;
if(index==1){that.page.companytag_code=val}
if(index==3){that.page.department_code=val;}
if(index==6){that.page.add_time=val}
if(index==7){that.page.end_time=val}
if(index==8){that.page.examine=val;}
 this.onSubmit()
    },
    // 搜索
     onSubmit () { 
        var that=this;
      that.currentPage = 1
      that.page.pager_offset = '0'
        if(this.page.end_time==null){this.page.end_time='';}
      if(this.page.add_time==null){this.page.add_time='';}
      that.$store.dispatch('foodWaste/setNewPage', that.page)
      that.init(that.page)
    },
    // 分页
    currentChange(page){
        var that=this;
      that.currentPage = page;
      that.page.pager_offset = String((page - 1) * 10)
      that.$store.dispatch('foodWaste/setNewPage', that.page)
      that.init(that.page)
    },
   goDetail(index,val){
    this.$router.push({
        name: "FoodWasteDetail",
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
