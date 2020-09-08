<template>
  <el-container class="shopList">
    <el-header class="box add bb">
        <h5 class="mb10"><span class="lines"></span>帮厨管理</h5>
        <div> <el-button size="small" type="primary" @click="$router.push({name: 'MainSubChefAdd'})">新增帮厨</el-button></div>
    </el-header>
    <el-main class="p15 pt0">
    <el-row class="box search mt20">
       <el-form :inline="true" :model="page" class="demo-form-inline">
       
        <el-col :span="4" class="mr10">
             <el-form-item size="small" >
         <el-input placeholder="帮厨姓名" clearable @clear='onSubmit' v-model="page.user_name_subchef" class="input-with-select">
            </el-input>
        </el-form-item>
        </el-col>
        <el-col :span="4" class="mr10">
             <el-form-item size="small" >
         <el-input placeholder="帮厨身份证号" clearable @clear='onSubmit' v-model="page.user_idcard_subchef" class="input-with-select">
            </el-input>
        </el-form-item>
        </el-col>
         <el-col :span="6" class="tl mr10">
           <el-form-item  size="small">
          <el-button  type="primary"  @click="onSubmit" class="general_bgc general_border cfff">查询</el-button>
          <el-button type="primary" v-if="loading==false" size="small" @click="DownExcel">导出数据</el-button>
          <el-button  v-else-if="loading==true" type="info" disabled size="small" >导出数据</el-button>
        </el-form-item>
        </el-col>
      </el-form>
    </el-row>
    <div class="box list">
       <el-table border :data="tableData" style="width: 100%"  id='out-table'>
        <el-table-column type="index" align='center' width="60"  label="序号"></el-table-column>
          <el-table-column align="center" label="健康证" width="120" :show-overflow-tooltip="true" prop="user_health_logo_subchef">
      <template scope="scope">
        <el-popover placement="right"  title="" trigger="click">
          <el-image slot="reference" :src="user.qyurl+scope.row.user_health_logo_subchef" :alt="user.qyurl+scope.row.user_health_logo_subchef" style="width: 40px;height: 40px;max-height: 200px;max-width: 200px"></el-image>
          <el-image :src="user.qyurl+scope.row.user_health_logo_subchef"></el-image>
        </el-popover>
      </template>
    </el-table-column>
          <el-table-column prop="user_name_subchef" min-width="80" :show-overflow-tooltip="true"  label="姓名" align='center'></el-table-column>
        <el-table-column prop="user_idcard_subchef"  min-width="80" :show-overflow-tooltip="true"  label="身份证号码" align='center' ></el-table-column>
        <el-table-column label="操作" width="120" fixed="right"  align='center'>
          <template slot-scope="scope">
           <el-button type="text" class="orange" size="small" @click="godetail(scope.row.user_code_subchef,'1')">编辑</el-button>
           <el-button type="text" class="red" size="small" @click="godelete(scope.row.user_code_subchef,scope.$index)">删除</el-button>
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
import axios from '../../../../util/api'
import { local } from '../../../../util/util'
export default {
  data () {
    return {
      page: {
        pager_offset: '0',
        pager_openset:'10',
        user_idcard_subchef:'',
        user_name_subchef:'',
      },
       timer: '',
      loading:false,
     currentPage: 1,
      total: 0,
      tableData:[],
    }
  },
   created () {
      this.user = local.get('user');
    this.currentPage = this.page.pager_offset / 10 + 1
    this.init(this.page)
  },
  methods: {
         init (params) {
      axios.get('/api/mainSubChef/list',params).then((v) => {
this.tableData=v.pager_list
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
        PatroleAdd(){
     this.$router.push({
        name: "PatrolAdd",
        query: {
           id1:3,
           id2:1,
        }
      });
  },
   godetail(index,val){
    this.$router.push({
        name: "MainSubChefAdd",
        query: {
          id: index,
          active:val
        }
      });
  },
  godelete(val,index){
     this.$confirm('确定删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(() => {
           axios.delete('/api/mainSubChef/delete', {user_code_subchef:val}).then((v) => {
                this.tableData.splice(index, 1)
           })
        }).catch(() => {        
        });
 
  },
   //导出
    DownExcel () { 
  this.loading=true;
  this.timer=setInterval(() => { this.check();}, 1000);
      this.currentPage = 1
      this.page.pager_offset = '0'
 this.page.pager_openset=String(this.total);
      this.page.down_name = '帮厨管理列表信息'
      axios.fileget('/api/report/export_mainsubchef_search', this.page).then((v) => {
      })
    },
   check(){
     axios.get('/api/report/check', {down_name:'export_mainsubchef_search'}).then((v) => {
       if(v==true){
         clearInterval(this.timer);
         this.loading=false;
       }
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

 /deep/ .el-input-group__append .el-button--primary .el-icon-search{color: #fff}
}

</style>
