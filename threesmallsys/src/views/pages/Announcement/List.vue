<template>
  <el-container class="shopList">
    <el-header class="box add bb">
        <h5 class="mb10"><span class="lines"></span>应急通告</h5>
        <div><el-button  class=""  icon="el-icon-plus" size="small" type="primary" @click="$router.push({name: 'AnnouncementAdd'})">新增应急通告</el-button></div>
    </el-header>
    <el-main class="p15 pt0">
    <el-row class="box search mt20">
       <el-form :inline="true" :model="page" class="demo-form-inline">
         <el-col :span="4" class="mr10">
           <el-form-item size="small">
            <el-select v-model="mess_receive_person" multiple clearable placeholder="接收人"  @change="change(3,mess_receive_person)">
             <el-option  v-for="item in options" :key="item.id" :label="item.title" :value="item.id" ></el-option>
          </el-select>
        </el-form-item>
        </el-col>
       
        <el-col :span="8" class="mr10">
          <el-form-item size="small">
            <el-col class="line" :span="11">
            <el-date-picker type="date" clearable placeholder="通告开始日期" v-model="page.add_time"  :picker-options="pickerOptionsStart" style="width: 100%;" format="yyyy-MM-dd" value-format="yyyy-MM-dd" @change="change(6,page.add_time)"></el-date-picker>
           </el-col>
            <el-col class="line" :span="2">至</el-col>
           <el-col class="line" :span="11">
            <el-date-picker  type="date" clearable placeholder="通告结束日期" v-model="page.end_time" :picker-options="pickerOptionsEnd" style="width: 100%;" format="yyyy-MM-dd" value-format="yyyy-MM-dd" @change="change(7,page.end_time)"></el-date-picker>
           </el-col>
        </el-form-item>
        </el-col>
        <el-col :span="4" class="mr10">
             <el-form-item size="small" >
         <el-input placeholder="通告类容关键词" clearable v-model="page.company_name" class="input-with-select">
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
       <el-table border :data="tableData" style="width: 100%"  id='out-table'>
        <el-table-column type="index" align='center' width="60"  label="序号"></el-table-column>
         <el-table-column prop="mess_sms_content"  min-width="120" :show-overflow-tooltip="true"  label="通告内容(短信)" align='center' ></el-table-column>
         <el-table-column prop="mess_wx_content"  min-width="120" :show-overflow-tooltip="true"  label="通告内容(微信)" align='center' ></el-table-column>
         
        <el-table-column prop="mess_receive_person_name"  min-width="120" :show-overflow-tooltip="true"  label="接收人" align='center' ></el-table-column>
        <el-table-column prop="add_time"  min-width="120" :show-overflow-tooltip="true" label="发布时间"  align='center'></el-table-column>
        <el-table-column label="操作" width="200" fixed="right"  align='center'>
          <template slot-scope="scope">
           <el-button type="text" class="general_color" size="small" @click="godetail(scope.row.mess_code)">详情</el-button>
           <el-button type="text" class="cac" size="small" @click="goupdate(scope.row.mess_code)">编辑</el-button>
           <el-button type="text" class="orange" size="small" @click="godelete(scope.row.mess_code,scope.$index)">删除</el-button>
            <el-button type="primary" class="cfff" size="small" @click="goPublish(scope.row.mess_code)">发布</el-button>
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
        pager_openset:'10',
        mess_event:'8',
        mess_receive_person:'',
        companytype_codes:'',
        companytag_codes:'',
        mess_sms_content:'',
        mess_wx_content:'',
        add_time:'',
        end_time:'',
      },
      mess_receive_person:[],
      list_btn:[{name:'全部',id:'1'},{name:'短信',id:'2'},{name:'微信',id:'3'}],
        options:[{title: '省级',id:'1'},{title: '市级',id:'2'},{title: '区/县级',id:'3'},{title: '乡/镇级',id:'4'},{title: '村级',id:'5'}],
     currentPage: 1,
      total: 0,
      tableData:[],
       pickerOptionsStart: {
        disabledDate: time => {
          if (this.page.end_time) {
            return time.getTime() > new Date(this.page.end_time).getTime()
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
   created () {
      //  this.page = Object.assign({}, this.patrolPage);
    this.currentPage = this.page.pager_offset / 10 + 1
    this.init(this.page)
  },
  methods: {
           init (params) {
      axios.get('/api/mess/notice/list', params).then((v) => {
        this.tableData=v.notice_list;
         this.total = v.pager_count
      })
    },
          change(index,val){
            var that=this;
            if (val == null) val = '';
if(index==3){that.page.mess_receive_person=val.join(',');}
if(index==6){that.page.add_time=val}
if(index==7){that.page.end_time=val}
this.onSubmit()
    },
     // 搜索
     onSubmit () { 
      this.currentPage = 1
      this.page.pager_offset = '0'
            if(this.page.end_time==null){this.page.end_time='';}
      if(this.page.add_time==null){this.page.add_time='';}
      // this.$store.dispatch('patrol/setNewPage', this.page)
      this.init(this.page)
    },
    // 分页
    currentChange(page){
      this.currentPage = page;
      this.page.pager_offset = String((page - 1) * 10)
      // this.$store.dispatch('patrol/setNewPage', this.page)
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
   godetail(index){
    this.$router.push({
        name: "AnnouncementDetail",
        query: {
          id: index
        }
      });
  },
   goupdate(index){
    this.$router.push({
        name: "AnnouncementAdd",
        query: {
          id: index
        }
      });
  },
  goPublish(val){
    this.$confirm('是否发布?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(() => {
           axios.post('/api/mess/publish', {mess_code:val}).then((v) => {})
        }).catch(() => {        
        });
  },
  godelete(val,index){
     this.$confirm('确定删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(() => {
           axios.delete('/api/mess/notice/delete', {mess_code:val}).then((v) => {
                this.tableData.splice(index, 1)
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

 /deep/ .el-input-group__append .el-button--primary .el-icon-search{color: #fff}
}

</style>
