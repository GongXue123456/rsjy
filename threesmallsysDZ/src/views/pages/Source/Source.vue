<template>
  <el-container class="shopList">
    <el-header class="box add bb">
        <h5 class="mb10"><span class="lines"></span>溯源管理</h5>
        <!-- <div><el-button  class="general_color general_border"  icon="el-icon-plus" size="small" plain>新增备案</el-button></div> -->
    </el-header>
    <el-main class="pt0">
    <el-row class="box search mt20">
       <el-form :inline="true" :model="page" class="demo-form-inline">
        <el-col :span="4" class="mr10">
             <el-form-item size="small" >
         <el-input placeholder="企业名称、经营者" v-model="page.company_name" clearable @clear="onSubmit" class="input-with-select">
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
        <el-col :span="4" class="mr10">
          <el-form-item size="small">
           <el-date-picker type="date" placeholder="请选择溯源时间" v-model="page.food_source_time_last" style="width: 100%;" format="yyyy-MM-dd" value-format="yyyy-MM-dd" @change="change(6,page.food_source_time_last)"></el-date-picker>
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
        <el-table-column prop="business_form"  min-width="150" :show-overflow-tooltip="true"  label="主体业态" align='center' ></el-table-column>        
        <el-table-column prop="operator" min-width="120" :show-overflow-tooltip="true" label="法人/经营者" align='center'></el-table-column>
        <el-table-column prop="food_source_count"  min-width="150" :show-overflow-tooltip="true" label="溯源次数" align='center'>
            <template slot-scope="scope">
              <span>{{scope.row.food_source_count!=null?scope.row.food_source_count:'0'}}</span>
        </template>
        </el-table-column>
        <el-table-column prop="food_source_time_last" min-width="150" :show-overflow-tooltip="true" label="最后溯源时间" align='center'></el-table-column>
        <el-table-column label="操作" width="80" fixed="right"  align='center'>
          <template slot-scope="scope">
           <el-button type="text" class="general_color" size="small" @click="godetail(scope.row.company_code,scope.row.company_name)">详情</el-button>
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
      company_name: '',
      filing_state:'',
      companytype_code:'',
      companytag_code:'',
      business_state:'',
       search_time_bigen:'',
       search_time_end:'',
      food_source_time_last:'',
      },
      list_btn:[{id:'1001574645421581111111101',title: '四川省小作坊备案证'},{id:'1001574645421581111111102',title: '四川省小经营店备案证（流通）'},{id:'1001574645421581111111103',title: '食品经营许可（餐饮）'},{id:'1001574645421581111111104',title: '四川省小经营店备案证（餐饮）'},{title: '食品经营许可证（流通）',id:'1001574645421581111111105'}],
     currentPage: 1,
      total: 0,
      tableData:[],
    }
  },
    computed: {
    ...mapState({
      sourcePage: (state) => state.source.sourcePage
    })
    
  },
   created () {
     this.page = Object.assign({}, this.sourcePage);
    this.currentPage = this.page.pager_offset / 10 + 1
    this.init(this.page)
  },
  methods: {
           init (params) {
      axios.get('/api/company/cflist', params).then((v) => {
        this.tableData=v.companyList;
         this.total = v.pager_count
      })
    },
     userTypeList(row){return row.place_area+'平方米'},
        userTypeList3(row){
       if(row.companytag_code=='1001574645421581111111103'){return '食品经营许可（餐饮）';}else if(row.companytag_code=='1001574645421581111111104'){return '四川省小经营店备案证（餐饮）';}else if(row.companytag_code=='1001574645421581111111101'){return '四川省小作坊备案证';}else if(row.companytag_code=='1001574645421581111111102'){return '四川省小经营店备案证（流通）';}else if(row.companytag_code=='1001574645421581111111105'){return '食品经营许可证（流通）';}
    },
    change(index,val){
      if(val == null || val == undefined){val = '';} 
      if(index==1){this.page.companytag_code=val;}
      if(index==4){this.page.business_state=val;}
      if(index==5){this.page.business_form=val;}
      if(index==6){this.page.food_source_time_last=val;}
      this.onSubmit()
    },
     // 搜索
     onSubmit () { 
      this.currentPage = 1
      this.page.pager_offset = '0'
      this.$store.dispatch('source/setNewPage', this.page)
      this.init(this.page)
    },
    // 分页
    currentChange(page){
      this.currentPage = page;
      this.page.pager_offset = String((page - 1) * 10)
      this.$store.dispatch('source/setNewPage', this.page)
      this.init(this.page)
    },
   godetail(index,val){
    this.$router.push({
        name: "SourceDetail",
        query: {
          id: index,
          name:val
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
