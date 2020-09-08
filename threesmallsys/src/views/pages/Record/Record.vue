<template>
  <el-container class="shopList ">
    <el-header class="box add bb">
        <h5 ><span class="lines"></span>备案管理</h5>
         <!-- v-if="user_level==5" -->
        <div><el-button v-if="menu_btns!=null&&menu_btns.indexOf('5-1-1')!== -1"  class=""  icon="el-icon-plus" size="small" type="primary" @click="$router.push({path: 'record/recordadd'})">新增备案</el-button></div>
    </el-header>
    <el-main class="p15 pt0">
    <el-tabs class="mt10" v-model="activeName"  @tab-click="handleClick">
  <el-tab-pane
    v-for="item in editableTabs"
    :key="item.name"
    :label="item.title"
    :name="item.name"
  >
   <el-row class="box search">
       <el-form :inline="true"  :model="recordPage" class="demo-form-inline">
        <el-col :span="4" class="mr10">
             <el-form-item size="small" >
         <el-input placeholder="小作坊名称、经营者" v-model="recordPage.company_name" clearable class="input-with-select">
       
            </el-input>
        </el-form-item>
        </el-col>
        <el-col :span="4" class="mr10">
         <el-form-item size="small">
          <el-select v-model="recordPage.companytag_code" clearable placeholder="主体类型" @change="change(1,recordPage.companytag_code)">
              <el-option v-for="v in list_btn" :key="v.id" :label="v.title" :value="v.id"></el-option>
          </el-select>
        </el-form-item>
        </el-col>
        <el-col :span="4" class="mr10">
           <el-form-item size="small">
          <el-select v-model="recordPage.business_type" clearable placeholder="业务类型" @change="change(8,recordPage.business_type)">
            <el-option v-for="v in list_btn3" :key="v.id" :label="v.title" :value="v.id"></el-option>
          </el-select>
        </el-form-item>
        </el-col>
        <el-col :span="4" class="mr10">
           <el-form-item size="small">
              <!-- <el-col class="line" :span="11"> -->
            <el-select v-model="recordPage.department_code" clearable placeholder="分管区域"  @change="change(3,recordPage.department_code)">
             <el-option  v-for="item in options4" :key="item.department_code" :label="item.department_name" :value="item.department_code" ></el-option>
          </el-select>
           <!-- </el-col> -->
           <!-- <el-col class="line" :span="2">-</el-col>
           <el-col class="line" :span="11">
            <el-select v-model="page.region_name" placeholder="分管区域">
             <el-option  v-for="item in options5" :key="item.region_name" :label="item.region_name" :value="item.region_name"></el-option>
          </el-select>
           </el-col> -->
         
        </el-form-item>
        </el-col>
        <el-col v-if="activeName==3" :span="4" class="mr10">
           <el-form-item size="small">
             
          <el-select v-model="recordPage.business_state" clearable placeholder="营业状态" @change="change(4,recordPage.business_state)">
            <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value" ></el-option>
          </el-select>
        </el-form-item>
        </el-col>
        <el-col v-if="activeName==3" :span="4" class="mr10">
           <el-form-item size="small">
              <el-select v-model="recordPage.state" clearable placeholder="主体状态" @change="change(2,recordPage.state)">
            <el-option v-for="v in list_btn1" :key="v.id" :label="v.title" :value="v.id"></el-option>
          </el-select>
          <!-- <el-select v-model="page.filing_state" placeholder="" @change="change(5,page.filing_state)">
            <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value" ></el-option>
          </el-select> -->
        </el-form-item>
        </el-col>
        <el-col :span="8" class="mr10">
          <el-form-item size="small">
            <el-col class="line" :span="11">
            <el-date-picker v-if="activeName==3" type="date" placeholder="开始日期（归档）" v-model="recordPage.search_time_bigen"  :picker-options="pickerOptionsStart" style="width: 100%;" format="yyyy-MM-dd" value-format="yyyy-MM-dd" @change="change(6,recordPage.search_time_bigen)"></el-date-picker>
            <el-date-picker v-if="activeName==4" type="date" placeholder="开始日期（驳回）" v-model="recordPage.search_time_bigen"  :picker-options="pickerOptionsStart" style="width: 100%;" format="yyyy-MM-dd" value-format="yyyy-MM-dd" @change="change(6,recordPage.search_time_bigen)"></el-date-picker>
            <el-date-picker v-if="activeName==1" type="date" placeholder="开始日期（备案）" v-model="recordPage.search_time_bigen"  :picker-options="pickerOptionsStart" style="width: 100%;" format="yyyy-MM-dd" value-format="yyyy-MM-dd" @change="change(6,recordPage.search_time_bigen)"></el-date-picker>
           </el-col>
            <el-col class="line" :span="2">至</el-col>
           <el-col class="line" :span="11">
            <el-date-picker  v-if="activeName==3" type="date" placeholder="结束日期（归档）" v-model="recordPage.search_time_end" :picker-options="pickerOptionsEnd" style="width: 100%;" format="yyyy-MM-dd" value-format="yyyy-MM-dd" @change="change(7,recordPage.search_time_end)"></el-date-picker>
            <el-date-picker v-if="activeName==4" type="date" placeholder="结束日期（驳回）" v-model="recordPage.search_time_end" :picker-options="pickerOptionsEnd" style="width: 100%;" format="yyyy-MM-dd" value-format="yyyy-MM-dd" @change="change(7,recordPage.search_time_end)"></el-date-picker>
            <el-date-picker v-if="activeName==1" type="date" placeholder="结束日期（备案）" v-model="recordPage.search_time_end" :picker-options="pickerOptionsEnd" style="width: 100%;" format="yyyy-MM-dd" value-format="yyyy-MM-dd" @change="change(7,recordPage.search_time_end)"></el-date-picker>
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
      <el-table border  :data="tableData"  style="width: 100%">
        <el-table-column type="index" align='center' width="60" label="序号"></el-table-column>
        <!-- <el-table-column prop="company_code"  min-width="150" :show-overflow-tooltip="true" align='center' label="工单号"></el-table-column> -->
        <el-table-column prop="credit_code"   min-width="150" :show-overflow-tooltip="true" label="社会信用代码" align='center'></el-table-column>
        <el-table-column prop="company_name" min-width="150" :show-overflow-tooltip="true"  label="小作坊名称" align='center'></el-table-column>
        <el-table-column prop="record_code"  min-width="150" :show-overflow-tooltip="true" label="备案号" align='center'> </el-table-column>
        <el-table-column prop="companytag_code"  min-width="150" :show-overflow-tooltip="true"  label="主体类型" align='center' :formatter="userTypeList3" ></el-table-column>
        <el-table-column v-if="activeName==3" prop="operator" min-width="100" :show-overflow-tooltip="true" label="经营者" align='center'></el-table-column>
        <el-table-column prop="region_name"  min-width="180" :show-overflow-tooltip="true" label="分管区域（社区/村级别）"  align='center'></el-table-column>
         <el-table-column v-if="activeName==2||activeName==1" prop="add_time" min-width="150" :show-overflow-tooltip="true" label="备案时间" align='center'></el-table-column>
        <el-table-column v-if="activeName==3" prop="filing_state_time"  min-width="150" :show-overflow-tooltip="true" label="归档时间" align='center'></el-table-column>
         <el-table-column v-if="activeName==4" prop="filing_state_time"   min-width="150" :show-overflow-tooltip="true" label="驳回时间" align='center'></el-table-column>
          <el-table-column v-if="activeName==2||activeName==4||activeName==1" prop="business_type" min-width="100" :show-overflow-tooltip="true" align='center' label="业务类型">
             <template slot-scope="scope">
              <span v-if="scope.row.business_type==1">首次</span>
              <span v-else-if="scope.row.business_type==2" style="color:#9D9D9D">延续</span>
              <span v-else-if="scope.row.business_type==3" class="red">注销</span>
              <span v-else style="color: #FAA500">变更</span>
        </template>
          </el-table-column>
         <el-table-column v-if="activeName==3" prop="business_state" label="营业状态" min-width="100" style="color:red" :show-overflow-tooltip="true" align='center'>
           <template slot-scope="scope">
              <span v-if="scope.row.business_state==1">正常营业</span>
              <span v-else-if="scope.row.business_state==2" style="color:#9D9D9D">暂停营业</span>
              <span v-else class="red">停止营业</span>
        </template>
         </el-table-column>
         <el-table-column v-if="activeName==3" prop="state" label="主体状态" min-width="100" :show-overflow-tooltip="true" align='center'>
           <template slot-scope="scope">
              <span v-if="scope.row.state==1">有效</span>
              <span v-else-if="scope.row.state==2" class="red">过期</span>
              <span v-else-if="scope.row.state==3" style="color:#9D9D9D">注销</span>
              <span v-else style="color: #FAA500">即将过期</span>
        </template>
         </el-table-column>
        
        <el-table-column v-if="activeName==3" label="操作" class-name='aa' min-width="130"  fixed="right"  align='center'>
          <template slot-scope="scope">
            <el-button type="text" class="general_color disib"  size="mini"  @click="godetail(scope.row.company_code)">详情</el-button>
            <el-button  v-if="scope.row.state!=3" type="text" class="red disib " size="mini" @click="off(scope.row.company_code)">注销</el-button>
            <el-button  v-if="scope.row.state!=3" type="text" class="orange disib " size="mini"  @click="recordChange(scope.row.company_code,1)">变更</el-button>
            <!-- <el-button  v-if="scope.row.state!=3" type="text" class="orange disib " size="mini"  @click="recordChange(scope.row.company_code,2)">延续</el-button> -->
         </template>
        </el-table-column>
        <el-table-column v-else label="操作" class-name='aa'  fixed="right" min-width="100"  align='center'>
          <template slot-scope="scope">
            <el-button  v-if="activeName==1" type="text" class="general_color disib"  size="mini"  @click="goUpdate(scope.row.company_code)">编辑</el-button>
            <el-button v-else type="text" class="general_color disib"  size="mini"  @click="godetail(scope.row.company_code)">详情</el-button>
            <el-button  v-if="activeName==2" type="text" class="orange disib " size="mini" @click="godetail1(scope.row.company_code)">审核</el-button>
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
  </el-tab-pane>
</el-tabs>
</el-main>
  </el-container>
</template>
<script>
import axios from '../../../util/api'
import { local } from '../../../util/util'
import { mapState } from 'vuex'
export default {
  data () {
    
    return {
      page: {
        pager_offset: "0",
        company_name: '',
        state: '',
        filing_state:"3",
        companytype_code:"1",
        companytag_code:'',
        business_state:'',
         department_code:'',
        search_time_bigen:'',
        search_time_end:'',
        filing_state_time:'',
      },
      options4:'',
      options5:'',
      // {title: '待审核',name: '2'},
      editableTabs: [{title: '已归档',name: '3'},{title: '已驳回',name: '4'},{title: '待审核',name: '1'}],
       options1:[{value: '1',label: '提交申请'},{ value: '2',label: '已归档'}, {value: '3',label: '已驳回'}],
       list_btn:[{id:'1',title: '小经营店（餐饮）'},{id:'2',title: '小经营店（销售）'},{id:'3',title: '小作坊'},{id:'4',title: '小摊贩'},],
       list_btn1:[{id:'1',title: '有效'},{id:'2',title: '过期'},{id:'3',title: '注销'},{id:'4',title: '即将过期'}],
       list_btn3:[{id:'1',title: '首次'},{id:'2',title: '延续'},{id:'3',title: '注销'},{id:'4',title: '变更'}],
       options2: [{ value: '1',label: '正常营业'}, {value: '2',label: '暂停营业'}, {value: '3',label: '停止营业'}],
      currentPage: 1,
      total: 0,
      tableData:[],
      // activeName:'3',
      user_level:'',
      pickerOptionsStart: {
        disabledDate: time => {
          if (this.recordPage.search_time_end) {
            return time.getTime() > new Date(this.recordPage.search_time_end).getTime()
          }else{return time.getTime() > Date.now()}
        }
      },
      pickerOptionsEnd: {
        disabledDate: time => {
          // if (this.recordPage.search_time_bigen) {
          //    return time.getTime() < new Date(this.recordPage.search_time_bigen).getTime() - 86400000&&time.getTime();
           
          // }else{
          //   return time.getTime() > Date.now()
          // }
          return time.getTime() > Date.now()
        }
      },
    }
  },
    computed: {
    ...mapState({
      recordPage: (state) => state.record.recordPage
    })
    
  },
   created () {
     var that=this;
      that.user_level = local.get('user_level')
    that.activeName=String(that.recordPage.filing_state)
    that.currentPage = that.recordPage.pager_offset / 10 + 1;
    that.init(that.recordPage)
  },
  methods: {
       userTypeList3(row){
       if(row.companytag_code=='1001574645421581111111103'){return '食品经营许可（餐饮）';}else if(row.companytag_code=='1001574645421581111111104'){return '四川省小经营店备案证（餐饮）';}else if(row.companytag_code=='1001574645421581111111101'){return '四川省小作坊备案证';}else if(row.companytag_code=='1001574645421581111111102'){return '四川省小经营店备案证（流通）';}else if(row.companytag_code=='1001574645421581111111105'){return '食品经营许可证（流通）';}
    },
     handleClick() {
        var that=this;
      if(that.activeName==1){that.recordPage.filing_state='1'}else if(that.activeName==2){that.recordPage.filing_state='2'}else if(that.activeName==3){that.recordPage.filing_state='3'}else{that.recordPage.filing_state='4'}
      this.onSubmit()
    },
       init (params) {
          var that=this;
          that.recordPage.filing_state=String(that.recordPage.filing_state)
          axios.get('/api/department/list', '').then((v) => {that.options4=v })
          axios.get('/api/company/search', params).then((v) => {
        that.tableData=v.companyList;
         that.total = v.pager_count
      })
    },
      change(index,val){
        var that=this;
if(index==1){that.recordPage.companytag_code=val}
if(index==2){that.recordPage.state=val; }
if(index==3){that.recordPage.department_code=val;}
if(index==4){that.recordPage.business_state=val;}
if(index==6){that.recordPage.search_time_bigen=val}
if(index==7){that.recordPage.search_time_end=val}
if(index==8){that.recordPage.business_type=val;}
 this.onSubmit()
    },
    // 搜索
     onSubmit () { 
        var that=this;
      that.currentPage = 1
      that.recordPage.pager_offset = '0'
      that.$store.dispatch('record/setNewPage', that.recordPage)
      that.init(that.recordPage)
    },
    // 分页
    currentChange(page){
        var that=this;
      that.currentPage = page;
      that.recordPage.pager_offset = String((page - 1) * 10)
      that.$store.dispatch('record/setNewPage', that.recordPage)
      that.init(that.recordPage)
    },
   godetail(index){
    this.$router.push({
        name: "RecordDetail",
        query: {
          id: index,
          id1:this.recordPage.filing_state
        }
      });
  },
  goUpdate(index){
    this.$router.push({
        name: "RecordUpdate",
        query: {
          id: index
        }
      });
  },
  recordChange(index,index1){
    this.$router.push({
        name: "RecordChange",
        query: {
          id: index,
          id1:index1
        }
      });
  },
  godetail1(index){
    this.$router.push({
        name: "RecordDetail",
        query: {
          id: index,
           id1:this.recordPage.filing_state,
           id2:1
        }
      });
  },
  off(index){
       axios.post('/api/company/examine', {company_code:index,examine:1}).then((v) => {
         this.tableData.forEach(item=>{
           if(item.company_code==index){
             item.state=3
           }
         })
         
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
  /deep/.el-table .aa .cell {display: flex;justify-content: center;}
}

</style>
