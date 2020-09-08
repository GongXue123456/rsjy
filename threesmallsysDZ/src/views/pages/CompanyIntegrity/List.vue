<template>
  <el-container class="shopList">
    <el-header class="box add bb">
        <h5 class="mb10"><span class="lines"></span>诚信等级</h5>
        <!-- <div><el-button  class="general_color general_border"  icon="el-icon-plus" size="small" plain>新增备案</el-button></div> -->
    </el-header>
    <el-main class="pt0">
    <el-row class="box search mt20">
       <el-form :inline="true" :model="page" class="demo-form-inline">
         <el-row>
          <el-col :span="8" class="mr10 tl">
           <el-form-item size="small" class="rate" label="请选择诚信经营等级：" >
          <el-rate v-model="value"   show-score score-template="{value}" allow-half @change="change(2,value)"></el-rate>
        </el-form-item>
        </el-col>
         <el-col :span="2" class="tl">
           <el-form-item  size="small">
          <el-button type="primary" plain @click="clear()">清除诚信经营等级</el-button>
        </el-form-item>
        </el-col>
         </el-row>
        <el-col :span="4" class="mr10">
             <el-form-item size="small" >
         <el-input placeholder="企业名称、经营者" clearable @clear='onSubmit' v-model="page.company_name" class="input-with-select">
            </el-input>
        </el-form-item>
        </el-col>
        <el-col :span="4" class="mr10">
         <el-form-item size="small">
          <el-select v-model="page.companytag_code" clearable placeholder="主体类型" @change="change(1,page.companytag_code)">
              <el-option v-for="v in list_btn" :key="v.id" :label="v.title" :value="v.id"></el-option>
          </el-select>
        </el-form-item>
        </el-col>
        <el-col :span="8" class="mr10">
         <el-form-item size="small">
            <el-col class="line" :span="11">
            <el-date-picker  type="date" placeholder="开始日期" v-model="page.search_time_bigen"  :picker-options="pickerOptionsStart" style="width: 100%;" format="yyyy-MM-dd" value-format="yyyy-MM-dd" @change="change(6,page.search_time_bigen)"></el-date-picker>
           </el-col>
            <el-col class="line" :span="2">至</el-col>
           <el-col class="line" :span="11">
            <el-date-picker  type="date" placeholder="结束日期" v-model="page.search_time_end" :picker-options="pickerOptionsEnd" style="width: 100%;" format="yyyy-MM-dd" value-format="yyyy-MM-dd" @change="change(7,page.search_time_end)"></el-date-picker>
           </el-col>
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
        <el-table-column type="index" label="序号" width="60" align='center'></el-table-column>
        <el-table-column prop="company_name" min-width="150" :show-overflow-tooltip="true"  label="企业名称" align='center'></el-table-column>
       <el-table-column prop="companytag_code"  min-width="150" :show-overflow-tooltip="true"  label="主体类型" align='center' :formatter="userTypeList3" ></el-table-column>
        <el-table-column prop="operator" min-width="100" :show-overflow-tooltip="true" label="法人/经营者" align='center'></el-table-column>
        <el-table-column prop="integrity_lvl_last"  min-width="150" :show-overflow-tooltip="true" label="上次诚信经营等级" align='center'>
           <template slot-scope="scope">
              <el-rate v-model="scope.row.integrity_lvl_last" disabled show-score text-color="#ff9900" score-template="{value}"> </el-rate>
        </template>
        </el-table-column>
        <el-table-column min-width="150" :show-overflow-tooltip="true" label="上次等级评定时间" align='center'>
          <template slot-scope="scope">
             <span v-if="scope.row.mete_time_last!=null">{{scope.row.mete_time_last}}</span>
             <span v-else>---</span>
        </template>
        </el-table-column>
        <el-table-column prop="integrity_lvl_new"  min-width="150" :show-overflow-tooltip="true" label="最新诚信经营等级"  align='center'>
            <template slot-scope="scope">
              <el-rate v-model="scope.row.integrity_lvl_new" disabled show-score text-color="#ff9900" score-template="{value}"> </el-rate>
        </template>
        </el-table-column>
        <el-table-column prop="mete_time_new" min-width="150" :show-overflow-tooltip="true" label="最新等级评定时间" align='center'></el-table-column>
        <el-table-column prop=""  min-width="80" :show-overflow-tooltip="true" label="变化趋势"  align='center'>
           <template slot-scope="scope">
            <span v-if="scope.row.integrity_lvl_change_trend==1">--</span>
            <span v-else-if="scope.row.integrity_lvl_change_trend==2"><i class="iconfont iconjuxingkaobei1 general_color"></i></span>
              <span v-else-if="scope.row.integrity_lvl_change_trend==3" ><i class="iconfont iconjuxingkaobei orange"></i></span>
              </template>
        </el-table-column>
        <el-table-column label="操作" width="120" fixed="right"  align='center'>
          <template slot-scope="scope">
           <el-button type="text" class="general_color" size="small" @click="godetail(scope.row.company_code,scope.row.company_name)">详情</el-button>
           <el-button type="text" class="orange" size="small" @click="changeRate(scope.row.company_code)">调整评分</el-button>
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
    <el-dialog  width="35%" title="调整评分" :visible.sync="dialogFormVisible">
  <el-form :model="page1">
     <el-form-item size="small" class="rate" label="请选择诚信经营等级：" >
          <el-rate v-model="value1" allow-half show-score text-color="#ff9900" score-template="{value}" @change="change(3,value1)"></el-rate>
        </el-form-item>
    <el-form-item >
      <el-input class="w" type="textarea" :rows="3" placeholder="请输入评分理由"  v-model="page1.remark"> </el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button  size="small" @click="cancel()">取 消</el-button>
    <el-button  size="small" type="primary" @click="handleConfirm()">确 定</el-button>
  </div>
</el-dialog>

    </el-main>
  </el-container>
</template>
<script>
import axios from '../../../util/api'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      value:0,
      value1:0,
      page: {
        pager_offset: '0',
      company_name: '',
      integrity_lvl_new:'0',
       filing_state:"3",
      companytype_code:'',
      companytag_code:'',
       search_time_bigen:'',
       search_time_end:'',
      },
      page1:{
        company_code:'',
        integrity_lvl_new:'0',
        remark:''
      },
      list_btn:[{id:'1001574645421581111111101',title: '四川省小作坊备案证'},{id:'1001574645421581111111102',title: '四川省小经营店备案证（流通）'},{id:'1001574645421581111111103',title: '食品经营许可（餐饮）'},{id:'1001574645421581111111104',title: '四川省小经营店备案证（餐饮）'},{title: '食品经营许可证（流通）',id:'1001574645421581111111105'}],
     currentPage: 1,
      total: 0,
      tableData:[],
       dialogFormVisible: false,
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
      gradePage: (state) => state.grade.gradePage
    })
    
  },
   created () {
     this.page = Object.assign({}, this.gradePage);
    this.currentPage = this.page.pager_offset / 10 + 1
    this.init(this.page)
  },
  methods: {
           init (params) {
             var that=this
        axios.get('/api/company/search', params).then((v) => {
        that.tableData=v.companyList;
         that.total = v.pager_count
      })
    },
    clear(){
      this.value=0;
      this.page.integrity_lvl_new='0';
      this.onSubmit()
    },
        userTypeList3(row){
       if(row.companytag_code=='1001574645421581111111103'){return '食品经营许可（餐饮）';}else if(row.companytag_code=='1001574645421581111111104'){return '四川省小经营店备案证（餐饮）';}else if(row.companytag_code=='1001574645421581111111101'){return '四川省小作坊备案证';}else if(row.companytag_code=='1001574645421581111111102'){return '四川省小经营店备案证（流通）';}else if(row.companytag_code=='1001574645421581111111105'){return '食品经营许可证（流通）';}
    },
          change(index,val){
            var aa=String(val)
if(index==1){this.page.companytag_code=val;}
if(index==2){this.page.integrity_lvl_new=aa;}
if(index==3){this.page1.integrity_lvl_new=aa;}
if(index==6){this.page.search_time_bigen=val}
if(index==7){this.page.search_time_end=val}
this.onSubmit()
    },
     // 搜索
     onSubmit () { 
      this.currentPage = 1
      this.page.pager_offset = '0'
          if(this.page.search_time_end==null){this.page.search_time_end='';}
      if(this.page.search_time_bigen==null){this.page.search_time_bigen='';}
      this.$store.dispatch('grade/setNewPage', this.page)
      this.init(this.page)
    },
    // 分页
    currentChange(page){
      this.currentPage = page;
      this.page.pager_offset = String((page - 1) * 10)
      this.$store.dispatch('grade/setNewPage', this.page)
      this.init(this.page)
    },
   godetail(index,val){
    this.$router.push({
        name: "CompanyIntegrityDetail",
        query: {
          id: index,
          name:val
        }
      });
  },
  changeRate(code){
     this.dialogFormVisible = true;
     this.page1.company_code=code;
  },
  cancel(){
     this.dialogFormVisible = false;
         this.reset();
  },
    handleConfirm() {
      if(this.page1.integrity_lvl_new==0){
        this.$notify.error({
                title: '请评定分数',
                message: '',
                duration: 2000
              })
      }else if(this.page1.remark==''){
        this.$notify.error({
                title: '请填写备注',
                message: '',
                duration: 2000
              })
      }else{
         axios.post('/api/companyIntegrity/save', this.page1).then((v) => {
         this.dialogFormVisible = false;
         this.init(this.page)
         this.reset();
      })
      }
        
     
    },
    reset(){
      this.value1=0;
      this.page1={
        company_code:'',
        integrity_lvl_new:'0',
        remark:''
      }
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
  /deep/ .rate .el-form-item__content{width: initial;vertical-align: text-bottom;.el-rate__icon{font-size: 25px;}}
   /deep/ .el-dialog__body .el-form-item__content{margin-left: 0px !important;}
  /deep/ .el-dialog__body {padding: 5px 20px 5px 20px;}
}

</style>
