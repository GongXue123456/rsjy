<template>
  <el-container class="shopList">
    <el-header class="box add bb">
        <h5 class="mb10"><span class="lines"></span>区域页面参数模板列表</h5>
         <div><el-button   class=""  icon="el-icon-plus" size="small" type="primary" @click="$router.push({path: 'pageConfigRegion/Add'})">新增模板</el-button></div>
    </el-header>
    <el-main class="p15 pt0">
    <el-row class="box search mt20">
       <el-form :inline="true" :model="page" class="demo-form-inline">
        <el-col :span="4" class="mr10">
             <el-form-item size="small" >
         <el-input placeholder="模板名称" clearable v-model="page.page_config_name" class="input-with-select">
            </el-input>
        </el-form-item>
        </el-col>
         <el-col :span="4" class="mr10">
            <el-form-item size="small">
              <el-select v-model="page.state" clearable placeholder="全部" @change="change(page.state)">
                <el-option
                  v-for="(item,index) in statusOptions"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4" class="mr10">
          <el-form-item  size="small">
          <el-select v-model="page.owner_type" clearable  placeholder="全部" @change="change2(page.owner_type)">
             <el-option v-for="group in options" :key="group.code" :label="group.title" :value="group.code"> </el-option>
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
       <el-table border :data="tableData" style="width: 100%">
        <el-table-column type="index" align='center' width="60"  label="序号"></el-table-column>
         <el-table-column prop="page_config_name" min-width="120" :show-overflow-tooltip="true"  label="模板名称" align='center'></el-table-column>
         <el-table-column prop="" align='center'  min-width="200" :show-overflow-tooltip="true" label="地区">
          <template slot-scope="scope">
            {{scope.row.province}}{{scope.row.city}}{{scope.row.area}}{{scope.row.town}}{{scope.row.vill}}
        </template>
        </el-table-column>
          <el-table-column align="center" label="状态">
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.state | tagFilter"
              >{{scope.row.state | statusFilter}}</el-tag>
            </template>
          </el-table-column>
        <el-table-column prop="level"  min-width="120" :show-overflow-tooltip="true" label="级别" align='center' :formatter="userTypeList">
        </el-table-column>
        <el-table-column prop="add_time"  min-width="120" :show-overflow-tooltip="true" label="添加时间"  align='center'></el-table-column>
         <el-table-column prop="update_time"  min-width="120" :show-overflow-tooltip="true"  label="更新时间" align='center' ></el-table-column>
        <el-table-column  label="操作" width="100" fixed="right"  align='center'>
          <template slot-scope="scope">
           <el-button v-if="user.user_code==scope.row.user_code_add" type="text" class="orange" size="small" @click="godetail(scope.row.page_config_region_code)">编辑</el-button>
            <el-button v-if="user.user_code==scope.row.user_code_add"
                type="text"
                class="disib"
                :class="{'red':scope.row.state==1}"
                size="mini"
                @click="changeState(scope.row)"
              >{{scope.row.state | antiStateFilter}}</el-button>
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
        pager_offset: '0',
        pager_openset:'10',
       province:'',
       city:'',
       area:'',
       town:'',
       vill:'',
       page_config_name:'',
       state:'',
       owner_type:'1'
      },
       list_btn:[{title: '全部',code:''},{title: '省级',code:'1'},{title: '市级',code:'2'},{title: '区/县级',code:'3'},{title: '乡/镇级',code:'4'},{title: '村级',code:'5'},],
        options: [{title: '全部',code: '1'}, {title: '自己管理',code: '2'}],
       statusOptions: [
        { label: "全部", value: "" },
        { label: "启用", value: "1" },
        { label: "禁用", value: "2" }
      ],
     currentPage: 1,
      total: 0,
      tableData:[],
       user:''
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        1: "已启用",
        2: "已禁用"
      };
      return statusMap[status];
    },
    tagFilter(status) {
      const statusMap = {
        1: "success",
        2: "warning"
      };
      return statusMap[status];
    },
    antiStateFilter(state) {
      const stateMap = {
        1: "禁用",
        2: "启用"
      };
      return stateMap[state];
    }
  },
   created () {
    this.currentPage = this.page.pager_offset / 10 + 1;
        this.user = local.get('user')
    this.init(this.page)
  },
  methods: {
           init (params) {
      axios.get('/api/pageConfigRegion/list', params).then((v) => {
        this.tableData=v.page_config_region_list;
         this.total = v.pager_count
      })
    },
       userTypeList (row) {
       if(row.level==1){return '省级'}else if(row.level==2){return '市级'}else if(row.level==3){ return '区县级'}else if(row.level==4){ return '乡镇级'}else {return '村级'}
    },
     change(val) {
      this.page.state=val
      this.onSubmit();
    },
    change1(val){this.page.companytag_code=val;this.onSubmit();},
     change2(val){if(val==''||val==null){val='1'}this.page.owner_type=val;this.onSubmit();},
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
        name: "PageConfigRegionAdd",
        query: {
          id: index
        }
      });
  },
     changeState(row) {
      let { page_config_region_code, state } = row;
      state = state == 1 ? 2 : 1;
      axios.put("/api/pageConfigRegion/state/update", { page_config_region_code, state }).then(response => {
          this.init(this.page);
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
