<template>
  <el-container class="shopList ">
    <el-header class="box add bb">
        <h5 ><span class="lines"></span>备案管理/健康证管理</h5>
        <!-- <div><el-button v-if="menu_btns!=null&&menu_btns.indexOf('2-1-1')!== -1"  class=""  icon="el-icon-plus" size="small" type="primary" @click="$router.push({path: 'produce/add'})">新增备案</el-button></!--> 
    </el-header>
    <el-main class="p15 pt0">
    <el-tabs class="mt10">
  <!-- <el-tab-pane
    v-for="item in editableTabs"
    :key="item.name"
    :label="item.title"
    :name="item.name"
  >  -->
   <el-row class="box search">
       <el-form :inline="true"  :model="page" class="demo-form-inline">
        <el-col :span="4" class="mr10">
             <el-form-item size="small" >
         <el-input placeholder="人员姓名/企业名称" v-model="page.company_name" clearable class="input-with-select" @clear="onSubmit"></el-input>
        </el-form-item>
        </el-col>
        <el-col :span="4" class="mr10">
         <el-form-item size="small">
          <el-select v-model="page.c_state" clearable placeholder="备案证状态" @change="change(2,page.c_state)">
              <el-option key="1" label="有效" value="1"></el-option>
              <el-option key="2" label="过期" value="2"></el-option>
              <el-option key="3" label="注销" value="3"></el-option>
          </el-select>
        </el-form-item>
        </el-col>
        <el-col :span="4" class="tl">
           <el-form-item  size="small">
          <el-button  type="primary"  @click="onSubmit" class="general_bgc general_border cfff">查询</el-button>
        </el-form-item>
        </el-col>
       
      </el-form>
    </el-row>
    <div class="box list">
      <div class="tl list_tab ">
          <el-button v-for="(v,k) in list_btn4" :key="k" :class="activeClass ==k?'active':''" class="pr"  size="small" @click="IsActive(k,v.id)">{{v.title}} <span v-if="v.id=='2'" class="list_tag pa disib bgcred cfff">{{count.expired}}</span><span v-if="v.id=='4'" class="list_tag pa disib bgc666 cfff">{{count.will_expire}}</span></el-button>  
      </div>
      <el-table border  :data="tableData"  style="width: 100%">
        <el-table-column type="index" align='center' width="60" label="序号"></el-table-column>
        <el-table-column prop="company_name" min-width="150" :show-overflow-tooltip="true"  label="企业名称" align='center'></el-table-column>
        <el-table-column prop="employ_name" min-width="100" :show-overflow-tooltip="true" label="姓名" align='center'></el-table-column>
        <el-table-column prop="employ_idcard"  min-width="150" :show-overflow-tooltip="true" label="身份证号" align='center'> </el-table-column>
        <el-table-column align="center" label="健康证" width="80" :show-overflow-tooltip="true" prop="image_url">
          <template scope="scope">
            <el-popover
                placement="left"
                title=""
                trigger="click">
              <el-image slot="reference" :src="user.qyurl+scope.row.employ_health_url" :alt="user.qyurl+scope.row.employ_health_url" style="width: 40px;height: 40px;max-height: 200px;max-width: 200px"></el-image>
              <el-image :src="user.qyurl+scope.row.employ_health_url"></el-image>
            </el-popover>
          </template>
        </el-table-column>
         <el-table-column prop="c_state" label="备案证状态" min-width="100" :show-overflow-tooltip="true" align='center'>
           <template slot-scope="scope">
              <span v-if="scope.row.c_state==1">有效</span>
              <span v-else-if="scope.row.c_state==2" class="red">过期</span>
              <span v-else-if="scope.row.c_state==3" style="color:#9D9D9D">注销</span>
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
  <!-- </el-tab-pane>-->
</el-tabs> 
</el-main>
  </el-container>
</template>
<script>
import axios from '../../../../util/api'
import { local,aa } from '../../../../util/util'
import Globle from '@/components/Globle'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      page: {
        pager_offset: "0",
        company_name: '',
        e_state: '1',
        c_state:'1'
      },
      activeClass:0,
      list_btn4:[{id:'1',title: '正常'},{id:'2',title: '过期'},{id:'4',title: '即将过期'}],
      currentPage: 1,
      total: 0,
      count:'',
      tableData:[],
      user:'',
    }
  },
    computed: { },
   created () {
    this.user = local.get('user');
    var that=this;
    if(that.$route.query.id!=undefined){that.page.e_state=that.$route.query.id}
    if(that.page.e_state=='4'){that.activeClass=String(that.page.e_state)-2;}else{that.activeClass=String(that.page.e_state)-1;}
    
    that.currentPage = that.page.pager_offset / 10 + 1;
    that.init(that.page)
  },
  methods: {
    init (params) {
      var that=this;
      that.page.e_state=String(that.page.e_state)
      that.page.c_state=String(that.page.c_state)
      axios.get('/api/companyEmploy/search', params).then((v) => {
        that.count=v;
        that.tableData=v.pager_list;
        that.total = v.pager_count
      }).catch(() => {})
    },
    change(index,val){
      var that=this;
      if (val == null) val = '';
      if(index==1){that.page.e_state=val;}
      if(index==2){that.page.c_state=val;}
      this.onSubmit()
    },
    // 搜索
    onSubmit () { 
      var that=this;
      that.currentPage = 1
      that.page.pager_offset = '0'
      that.$store.dispatch('record/setNewPage3', that.page)
      that.init(that.page)
    },
    // 分页
    currentChange(page){
      var that=this;
      that.currentPage = page;
      
      that.page.pager_offset = String((page - 1) * 10)
      that.$store.dispatch('record/setNewPage3', that.page)
      that.init(that.page)
    },
    IsActive(k,val) {
      var that=this;
      this.activeClass = k;
      this.page.e_state=val;
      this.onSubmit()
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
