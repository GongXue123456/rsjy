<template>
  <el-container class="shopList ">
    <el-header class="box add bb">
        <h5 ><span class="lines"></span>餐厨垃圾类型配置</h5>
       <div><el-button size="small" type="primary" @click="$router.push({path: 'ccljConfig/add'})">添加类型</el-button></div>
    </el-header>
    <el-main class="p15 pt0">
    <div class="box mt20 list">
      <el-table border  :data="tableData" style="width: 100%">
        <el-table-column type="index" align='center' width="60" label="序号"></el-table-column>
      
        <el-table-column prop="dictionary_module"  min-width="150" :show-overflow-tooltip="true"  label="餐厨垃圾类型" align='center'></el-table-column>
         <el-table-column prop="companytype_names" min-width="150" :show-overflow-tooltip="true"  label="适配小作坊类型" align='center'></el-table-column>
        <el-table-column prop="add_time" min-width="100" :show-overflow-tooltip="true" label="添加时间" align='center'></el-table-column>
        
        <el-table-column  label="操作" class-name='aa' min-width="120"  fixed="right"  align='center'>
          <template slot-scope="scope">
            <el-button  type="text" class=" disib"  size="mini"  @click="godetail(scope.row.dictionary_code)">详情</el-button>
             <el-button  type="text" class=" disib orange"  size="mini"  @click="goEdit(scope.row.dictionary_code)">编辑</el-button>
             <el-button type="text" class=" disib red" size="small" @click="godelete(scope.row.dictionary_code,scope.$index)">删除</el-button>
            
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
      pager_openset: '10',
     dictionary_group:'餐厨垃圾',
     companytype_codes:'',
     add_time:'',
     end_time:''
      },
      page1:{
        checkself_code:'',
        checkself_code_list:[]
      },
       currentPage: 1,
      total: 0,
      count:'',
      tableData:[],
    }
  },
   created () {
     var that=this;
          that.currentPage = that.page.pager_offset / 10 + 1;
    that.init(that.page)
  },
  methods: {
       init (params) {
          var that=this;
          axios.get('/api/dictionary/cclj/list', params).then((v) => {
        that.tableData=v.cclj_list;
         that.total = v.pager_count;
      }).catch(() => {})
    },
     change(index,val){
            var that=this;
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
      that.init(that.page)
    },
    // 分页
    currentChange(page){
        var that=this;
      that.currentPage = page;
      that.page.pager_offset = String((page - 1) * 10)

      that.init(that.page)
    },
  godetail(val){
    this.$router.push({
        name: "ConfigureDetail",
        query: {
          id: val
        }
      });
  },
  goEdit(val){
    this.$router.push({
        name: "FoodWasteConfigureAdd",
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
           axios.delete('/api/dictionary/cclj/delete', {dictionary_code:val}).then((v) => {
                this.tableData.splice(index, 1)
                 this.init(this.page)
           })
        }).catch(() => {        
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
