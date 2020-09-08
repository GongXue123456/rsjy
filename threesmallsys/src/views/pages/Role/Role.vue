<template>
  <el-container class="shopList">
    <el-header class="box add bb">
        <h5 class="mb10"><span class="lines"></span>权限管理</h5>
         <div><el-button   class=""  icon="el-icon-plus" size="small" type="primary" @click="$router.push({path: 'role/add'})">新增权限</el-button></div>
    </el-header>
    <el-main class="pt0">
    <el-row class="box search mt20">
       <el-form :inline="true" :model="page" class="demo-form-inline">
        <el-col :span="4" class="mr10">
             <el-form-item size="small" >
         <el-input placeholder="请输入权限名称" clearable v-model="page.role_name"  @clear="onSubmit" class="input-with-select">
            </el-input>
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
        <el-table-column align='center' width="100" type="index" label="序号"></el-table-column>
        <el-table-column prop="role_name" :show-overflow-tooltip="true" align='center' label="权限名称"></el-table-column>
        <el-table-column label="操作" min-width="70" align='center' fixed="right">
          <template slot-scope="scope">
           <el-button type="primary" size="mini" @click="godetail(scope.row.role_code)">编辑权限菜单</el-button>
           <el-button type="danger" size="mini" @click="godelete(scope.row.role_code,scope.$index)">删除</el-button>
           <el-button type="primary" size="mini" @click="goedit(scope.row.role_code)">编辑权限用户</el-button>
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
import { local } from '../../../util/util'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      page: {
        pager_offset:'0',
        role_name:'',
      },
     currentPage: 1,
      total: 0,
      tableData:[],
        user:''
    }
  },
   created () {
       this.user = local.get('user')
    this.currentPage = this.page.pager_offset / 10 + 1
    this.init(this.page)
  },
  methods: {
           init (params) {
      axios.get('/api/role/list', params).then((v) => {
        this.tableData=v.role_list;
         this.total = v.pager_count
      })
    },
     // 搜索
     onSubmit () { 
      this.currentPage = 1
      this.page.pager_offset = '0'
      this.init(this.page)
    },
    // 分页
    currentChange(page){
      this.currentPage = page;
      this.page.pager_offset = String((page - 1) * 10)
      this.init(this.page)
    },
   godetail(index){
    this.$router.push({
        name: "RoleAdd",
        query: {
          id: index
        }
      });
  },
  godelete(val,index){
       this.$confirm('确定删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(() => {
           axios.delete('/api/role/delete', {role_code:val}).then((v) => {
                this.tableData.splice(index, 1)
           })
        }).catch(() => {        
        });
  },
  goedit(index){
    this.$router.push({
        name: "RoleuserAdd",
        query: {
          id: index,
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

 /deep/ .el-input-group__append .el-button--primary .el-icon-search{color: #fff}
}

</style>
