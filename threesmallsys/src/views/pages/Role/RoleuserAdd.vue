<template>
  <el-container class="patroladd">
    <el-header class="box add bb">
      <h5 class="mb10">
        <span class="lines"></span>编辑权限用户
      </h5>
      <div>
        <el-button class="back_btn" size="small" plain @click="$router.back()">返回</el-button>
      </div>
    </el-header>
    <el-main class="pt0">
     
        <el-row class="box mt20 f14">
          <el-col :span="24" class="patroladd-title bgcfbe tl mb20 pl15">权限用户信息</el-col>
          <el-col :span="11" class="tl" >
            <div class="patroladd-title1 f14 bgcfbe tl pl15 pr15">该组用户</div>
             <el-form :inline="true" status-icon ref="page" :model="page" class="demo-ruleForm mt15">
             <el-col :span="10" class="mr10">
             <el-form-item size="small" >
               <el-input placeholder="请输入姓名或者电话号码" clearable v-model="page.user_name"  @clear='clear(1)'  class="input-with-select">
               </el-input>
             </el-form-item>
              </el-col>
             <el-col :span="4" class="tl mr10">
              <el-form-item  size="small">
               <el-button  type="primary"  @click="onSubmit(1)" class="general_bgc general_border cfff">查询</el-button>
              </el-form-item>
             </el-col>
              </el-form>
             <el-table :data="user_list"  border style="width: 100%;min-height:580px">
              <el-table-column prop="user_name" label="姓名" align='center'  width="100"> </el-table-column>
               <el-table-column prop="user_mobilephone" label="电话" align='center' width="180"> </el-table-column>
               <el-table-column  label="操作" class-name='aa' min-width="130"  fixed="right"  align='center'>
                <template slot-scope="scope">
                 <el-button type="primary" size="mini"  @click="todelete(scope.row.user_code)">移除该组</el-button>
                </template>
               </el-table-column>
            </el-table>
            <div class="i-page fr disib mt20">
             <el-pagination background :page-size='10' layout="total,prev, pager, next"  :pager-count="5" :total="total" :current-page="currentPage" @current-change = 'currentChange'></el-pagination>
            </div>
          </el-col>
          <el-col :span="11" class="tl" :offset="2">
            <div class="patroladd-title1 f14 bgcfbe tl pl15 pr15">不在该组用户</div>
            <el-form :inline="true" status-icon ref="page1" :model="page1" class="demo-ruleForm mt15">
             <el-col :span="10" class="mr10">
             <el-form-item size="small" >
               <el-input placeholder="请输入姓名或者电话号码" clearable @clear='clear(2)' v-model="page1.user_name" class="input-with-select">
               </el-input>
             </el-form-item>
              </el-col>
             <el-col :span="4" class="tl mr10">
              <el-form-item  size="small">
               <el-button  type="primary"  @click="onSubmit(2)" class="general_bgc general_border cfff">查询</el-button>
              </el-form-item>
             </el-col>
              </el-form>
            <el-table :data="tableData"  border style="width: 100%">
              <el-table-column prop="user_name" label="姓名" align='center'  width="100"> </el-table-column>
               <el-table-column prop="user_mobilephone" label="电话" align='center' width="180"> </el-table-column>
               <el-table-column  label="操作" class-name='aa' min-width="130"  fixed="right"  align='center'>
                <template slot-scope="scope">
                 <el-button type="primary" size="mini"  @click="add(scope.row.user_code)">添加到该组</el-button>
                </template>
               </el-table-column>
            </el-table>
            <div class="i-page fr disib mt20">
             <el-pagination background :page-size='10' layout="total,prev, pager, next"  :pager-count="5" :total="total1" :current-page="currentPage1" @current-change = 'currentChange1'></el-pagination>
            </div>
          </el-col>
          
        </el-row>
     
    </el-main>
  </el-container>
</template>
<script>
import axios from "../../../util/api";
import { local,remove } from "../../../util/util";
export default {
  data() {
    return {
      menu_list: "",
      formInline: {
        role_code: "",
        role_name: "",
        menu_list: []
      },
      page: {
        pager_offset: "0",
        role_code: "",
        user_name:''
      },
       page1: {
        pager_offset: "0",
        role_code: "",
        user_name:''
      },
      user_list: [],
      total:0,
      total1:0,
      currentPage1: 1,
       currentPage: 1,
       tableData: [],
    };
  },
  created() {
    this.user = local.get("user");
     this.currentPage = this.page.pager_offset / 10 + 1;
     this.currentPage1 = this.page1.pager_offset / 10 + 1;
    this.page.role_code = this.$route.query.id;
      this.page1.role_code = this.$route.query.id;
    this.init(this.page);
     this.init1(this.page1);
    // this.getalluser(this.page)
  },
  methods: {
    userTypeList(row){return row.user_province+row.user_city+row.user_area+row.user_town+row.user_vill},
    init(params) {
      axios.get("/api/role/roleUser", params)
        .then(v => {
          this.user_list = v.user_list;
           this.total= v.pager_count
        });
      
    },
    init1(params){
      axios.get("/api/user/list", params).then(v => {
        this.tableData=v.user_list;
         this.total1 = v.pager_count
        
      });
    },
    clear(index){
        this.onSubmit(index)
    },
     currentChange(page){
        var that=this;
      that.currentPage = page;
       that.page.pager_offset = String((page - 1) * 10)
      that.init(that.page)
    },
     currentChange1(page){
        var that=this;
      that.currentPage1 = page;
       that.page1.pager_offset = String((page - 1) * 10)
      that.init1(that.page1)
    },
    add(index) {
       axios.post("/api/userRole/save", {user_code:index,role_code:this.page1.role_code}).then(v => {
        this.init1(this.page1);
         this.init(this.page);
            });
    },
    todelete(index){
        axios.delete("/api/userRole/delete", {user_code:index,role_code:this.page.role_code}).then(v => {
           if(this.total%10==1){
           this.page.pager_offset = String(this.page.pager_offset-10)
         }
        this.init1(this.page1);
         this.init(this.page);
            });
    },
     onSubmit (index) { 
      if(index==1){
         this.currentPage = 1
      this.page.pager_offset = '0'
      this.init(this.page)
      }else{
         this.currentPage1 = 1
      this.page1.pager_offset = '0'
      this.init1(this.page1)
      }
     
    },
  }
};
</script>
<style lang="scss" scoped>
.patroladd {
  overflow-x: hidden;
  .add {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .el-image {
    width: 160px;
    height: 160px;
    margin-right: 10px;
  }
  .back_btn {
    background: rgba(247, 248, 249, 1);
    border: 1px solid rgba(217, 222, 225, 1);
  }
  .patroladd-title {
    height: 34px;
    line-height: 34px;
    border-left: 2px solid #788287;
  }
  .patroladd-title1 {
    height: 43px;
    line-height: 43px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .el-checkbox {
    display: flex;
    justify-content: left;
    align-items: center;
  }
  /deep/ .el-dialog {
    width: 60% !important;
  }
}
</style>
