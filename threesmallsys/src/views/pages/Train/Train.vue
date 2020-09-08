<template>
  <el-container class="shopList">
    <el-header class="box add bb">
        <h5 class="mb10"><span class="lines"></span>培训管理</h5>
         <div><el-button   class=""  icon="el-icon-plus" size="small" type="primary" @click="$router.push({path: 'train/add'})">添加培训</el-button></div>
    </el-header>
    <el-main class="pt0">
    <el-row class="box search mt20">
       <el-form :inline="true" :model="page" class="demo-form-inline">
        <el-col :span="4" class="mr10">
             <el-form-item size="small" >
         <el-input placeholder="请输入培训标题" clearable v-model="page.train_title" @clear="onSubmit" class="input-with-select">
            </el-input>
        </el-form-item>
        </el-col>
        <el-col :span="4" class="mr10">
          <el-form-item size="small">
            <el-date-picker v-model="page.train_year" clearable type="year" placeholder="请选择培训年度" value-format="yyyy" style="width: 100%;" @change="change(1,page.train_year)"> </el-date-picker>
        </el-form-item>
        </el-col>
        <el-col :span="4" class="mr10">
          <el-form-item size="small">
            <el-select v-model="page.train_quarter" clearable placeholder="请选择季度" @change="change(4,page.train_quarter)">
             <el-option v-for="group in options2" :key="group.title" :label="group.title" :value="group.title"> </el-option>
          </el-select>
        </el-form-item>
        </el-col>
        <el-col :span="4" class="mr10">
          <el-form-item  size="small">
          <el-select v-model="page.owner_type"  placeholder="请选择" @change="change(2,page.owner_type)">
             <el-option v-for="group in options" :key="group.code" :label="group.title" :value="group.code"> </el-option>
          </el-select>
        </el-form-item>
        </el-col>
         <el-col :span="4" class="mr10">
          <el-form-item  size="small">
          <el-select v-model="page.train_state"  placeholder="请选择" @change="change(3,page.train_state)">
             <el-option v-for="group in options1" :key="group.code" :label="group.title" :value="group.code"> </el-option>
          </el-select>
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
       <el-table :data="tableData" style="width: 100%">
        <el-table-column align='center' width="60" type="index" label="序号"></el-table-column>
        <el-table-column prop="" align='center'  min-width="150" :show-overflow-tooltip="true" label="地区">
          <template slot-scope="scope">
            {{scope.row.train_province}}{{scope.row.train_city}}{{scope.row.train_area}}{{scope.row.train_town}}{{scope.row.train_vill}}
        </template>
        </el-table-column>
        <el-table-column prop="train_title"  min-width="150" :show-overflow-tooltip="true" align='center' label="培训标题"></el-table-column>
        <el-table-column prop="train_year" align='center'  label="年度"></el-table-column>
        <el-table-column prop="train_quarter" align='center' label="季度"> </el-table-column>
        <el-table-column prop="train_state" align='center'  label="状态"  :formatter="userTypeList"></el-table-column>
        <el-table-column label="操作" min-width="70" align='center' fixed="right">
          <template slot-scope="scope">
           <el-button type="text" class="general_color" size="small" @click="godetail(scope.row.train_code)">详情</el-button>
           <el-button  v-if="user.user_code==scope.row.user_code" type="text" class="orange disib " size="mini" @click="goedit(scope.row.train_code)">编辑</el-button>
           <el-button  v-if="user.user_code==scope.row.user_code&&scope.row.train_state==1"  type="text" class="orange disib " size="mini" @click="changeType(2,scope.row.train_code)">禁用</el-button>
           <el-button  v-if="user.user_code==scope.row.user_code&&scope.row.train_state==2"  type="text" class="orange disib " size="mini" @click="changeType(1,scope.row.train_code)">启用</el-button>
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
        train_title:'',
        train_year:'',
        owner_type:"1",
        train_state:'',
        train_quarter:''
      },
       options: [{title: '全部培训',code: '1'}, {title: '自己管理',code: '2'}],
        options1: [{title: '全部状态',code: ''}, {title: '启用状态',code: '1'}, {title: '禁用状态',code: '2'}],
        options2: [{title: '第一季度',name: '1'}, {title: '第二季度',name: '2'},{title: '第三季度',name: '3'},{title: '第四季度',name: '4'}],
     currentPage: 1,
      total: 0,
      tableData:[],
        user:''
    }
  },
      computed: {
    ...mapState({
     trainPage: (state) => state.train.trainPage
    })
  },
   created () {
      this.page = Object.assign({}, this.trainPage);
       this.user = local.get('user')
    this.currentPage = this.page.pager_offset / 10 + 1
    this.init(this.page)
  },
  methods: {
           init (params) {
      axios.get('/api/train/list', params).then((v) => {
        this.tableData=v.train_list;
         this.total = v.pager_count
      })
    },
     userTypeList (row) {
       if(row.train_state==1){return '启用'}else {return '禁用'}
    },
          change(index,val){
if(index==1){this.page.train_year=val;}
if(index==2){this.page.owner_type=val}
if(index==3){this.page.train_state=val}
if(index==4){this.page.train_quarter=val;}
this.onSubmit()
    },
     // 搜索
     onSubmit () { 
       var that=this
      this.currentPage = 1
      this.page.pager_offset = '0'
       if(this.page.train_year==null){this.page.train_year='';}
      this.$store.dispatch('train/setNewPage', this.page)
      that.init(that.page)
    },
    // 分页
    currentChange(page){
      this.currentPage = page;
      this.page.pager_offset = String((page - 1) * 10)
      this.$store.dispatch('train/setNewPage', this.page)
      this.init(this.page)
    },
   godetail(index){
    this.$router.push({
        name: "TrainDetail",
        query: {
          id: index
        }
      });
  },
  goedit(index){
    this.$router.push({
        name: "TrainAdd",
        query: {
          id: index,
        }
      });
  },
  changeType(id,val){
      axios.put('/api/train/state/update', {train_code:val,train_state:String(id)}).then((v) => {
     this.tableData.forEach(item=>{
           if(item.train_code==val){
             if(id==1){
               item.train_state=1
             }else{
                item.train_state=2
             }
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
}

</style>
