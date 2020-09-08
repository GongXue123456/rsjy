<template>
  <el-container class="shopList">
    <el-header class="box add bb">
        <h5  class="mb10"><span class="lines"></span>用户管理</h5>
         <!-- v-if="user_level==5" -->
    </el-header>
    <el-main class="pt0">
  
   <el-row class="box mt20 search">
       <el-form :inline="true"  :model="page1" class="demo-form-inline">

        <el-col :span="4">
             <el-form-item size="small" class="w">
              <el-input placeholder="姓名、手机号" clearable v-model="page1.user_name" @clear='onSubmit' class="input-with-select"></el-input>
        </el-form-item>
        </el-col>
        <el-col :span="2" class="tl ml10">
           <el-form-item  size="small">
          <el-button  type="primary"  @click="onSubmit" class="general_bgc general_border cfff">查询</el-button>
        </el-form-item>
        </el-col>
       
      </el-form>
    </el-row>
    <div class="box list mt20">
      <el-table border  :data="tableData"  style="width: 100%">
        <el-table-column type="index" align='center' width="60" label="序号"></el-table-column>
        <el-table-column prop="user_name"   min-width="180" :show-overflow-tooltip="true" label="姓名" align='center'></el-table-column>
        <el-table-column prop="user_mobilephone" min-width="150" :show-overflow-tooltip="true"  label="手机号" align='center'></el-table-column>
         <el-table-column prop="" align='center'  min-width="200" :show-overflow-tooltip="true" label="地区">
          <template slot-scope="scope">
            {{scope.row.user_province}}{{scope.row.user_city}}{{scope.row.user_area}}{{scope.row.user_town}}{{scope.row.user_vill}}
        </template>
        </el-table-column>
         <el-table-column prop="user_type"  min-width="150" :show-overflow-tooltip="true" label="身份类型"  align='center' ></el-table-column>
        <el-table-column  label="操作" class-name='aa'  fixed="right" min-width="100"  align='center'>
          <template slot-scope="scope">
            <el-button  type="text" class="orange disib " size="mini" @click="handleChoose(scope.row.user_type,scope.row.user_code)">更改身份类型</el-button>
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
    <el-dialog title="请选择身份" :visible.sync="dialogTableVisible" @close="onClose" >
        <el-row class="box search mt20" :gutter="10">
          <el-form  :inline="true" :model="companyPage" class="demo-form-inline">
             <el-col  :span="24" class="tl"> 
               <el-form-item size="small" >
               <el-button v-for="(v,k) in options" :key="k" :class="activeClass ==k?'active':''" class=""  size="small" @click="IsActive(k,v.user_type)">{{v.user_type}}</el-button>
            </el-form-item>
         </el-col>
          </el-form>
         
        </el-row>
        <div slot="footer" class="dialog-footer" style="text-align:center;margin-top:15px">
          <el-button @click="dialogTableVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleConfirm()">确 定</el-button>
        </div>
      </el-dialog>
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
      
      user_code:'',
      user_type:''
    },
    page1:{user_name:''},
    companyPage:{},
      currentPage: 1,
      activeClass:0,
      total: 0,
      tableData:[],
      options:[{user_type:'食品经营者',key:0},{user_type:'乡厨',key:1},{user_type:'举办者',key:2},{user_type:'农家乐',key:3},{user_type:'乡村酒店',key:4},{user_type:'学校食堂',key:5},{user_type:'配送企业',key:6}],
      user:'',
      dialogTableVisible: false,
        companyListLoading: false,
    }
  },
   created () {
     var that=this;
    
    this.currentPage = this.page.pager_offset / 10 + 1;
    that.init(this.page1)
  },
  methods: {
      IsActive(k,val) {
        this.activeClass = k;
        this.page.user_type=val;
      },
    init (params) {
      axios.get('/api/user/list',params).then((v) => {
this.tableData=v.user_list
 this.total = v.pager_count
      })
     
      
      
    },
  
    // 搜索
     onSubmit () { 
        var that=this;
      this.currentPage = 1
      this.page.pager_offset = '0'
      that.init(that.page1)
    },
    // 分页
    currentChange(page){
        var that=this;
      this.currentPage = page;
      this.page.pager_offset = String((page - 1) * 10)
      that.init(that.page1)
    },
  handleChoose(val,val1) {
          this.page.user_code = val1;
       this.dialogTableVisible = true;
       this.options.forEach(item=>{
           if(item.user_type===val){
                 this.activeClass = item.key;
                this.page.user_type=item.user_type;
           }
       })
    },
  onClose() {
     this.dialogTableVisible = false;
    },
  handleConfirm() {
      let params=this.page;
        if(this.page.user_type==''){
          this.$notify.error({
                title: '请选择身份',
                message: '',
                duration: 2000
              })
              return false
      }
       axios.put('/api/user/supermanage/update',params).then((v) => {
           this.page.user_type='';
             this.init(this.page1)
           this.dialogTableVisible = false;
      })
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
 /deep/ .el-input-group__append .el-button--primary .el-icon-search{color: #fff}
  /deep/.el-table .aa .cell {display: flex;justify-content: center;}
 /deep/ .el-dialog{width: 80%;.el-form-item{
     margin-bottom: 0px;
     .el-button--small{margin-bottom: 10px;padding: 12px 25px;font-size: 15px;}
 }}
}

</style>
