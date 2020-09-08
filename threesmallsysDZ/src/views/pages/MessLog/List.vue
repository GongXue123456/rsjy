<template>
  <el-container class="shopList">
    <el-header class="box add bb">
        <h5 class="mb10"><span class="lines"></span>消息日志</h5>
    </el-header>
    <el-main class="p15 pt0">
    <el-row class="box search mt20">
       <el-form :inline="true" :model="page" class="demo-form-inline">
        
        <el-col :span="4" class="mr10">
         <el-form-item size="small">
          <el-select v-model="page.mess_event"  clearable placeholder="通告方式" @change="change(1,page.mess_event)">
              <el-option v-for="v in list_btn" :key="v.id" :label="v.name" :value="v.id"></el-option>
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
        <el-col  v-if="user.user_type=='超级管理员'" :span="4" class="mr10">
             <el-form-item size="small" >
         <el-input placeholder="用户手机号" clearable v-model="page.user_mobilephone" class="input-with-select">
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
        <el-table-column prop="mess_event"  min-width="120" :show-overflow-tooltip="true" label="消息推送事件"  align='center'>
          <template slot-scope="scope">
              <span v-if="scope.row.mess_event==1">备案通过</span>
              <span v-else-if="scope.row.mess_event==2" >备案驳回</span>
              <span v-else-if="scope.row.mess_event==3" >巡查不合格</span>
              <span v-else-if="scope.row.mess_event==4">培训不合格</span>
               <span v-else-if="scope.row.mess_event==5">自查自纠</span>
              <span v-else-if="scope.row.mess_event==6">投诉举报待处理</span>
              <span v-else-if="scope.row.mess_event==7">投诉举报已处理</span>
              <span v-else-if="scope.row.mess_event==8" >应急通告</span>
              <span v-else-if="scope.row.mess_event==9">备案待审核</span>
              <span v-else-if="scope.row.mess_event==10">待巡查工单</span>
        </template>
        </el-table-column>
         <el-table-column prop="add_time"  min-width="120" :show-overflow-tooltip="true" label="发送时间"  align='center'></el-table-column>
          <el-table-column prop="user_mobilephone"  min-width="120" :show-overflow-tooltip="true"  label="手机号" align='center' ></el-table-column>
         <el-table-column prop="mess_sms_content"  min-width="120" :show-overflow-tooltip="true"  label="发送内容(短信)" align='center' ></el-table-column>
         <el-table-column prop="messlog_ms_state"  min-width="120" :show-overflow-tooltip="true" label="发送状态(短信)"  align='center'>
            <template slot-scope="scope">
              <span v-if="scope.row.messlog_ms_state==1">未发送</span>
              <span v-else-if="scope.row.messlog_ms_state==2" style="color:#9D9D9D">已发送</span>
        </template>
         </el-table-column>
         <el-table-column prop="mess_wx_content"  min-width="120" :show-overflow-tooltip="true"  label="发送内容(微信)" align='center' ></el-table-column>
         <el-table-column prop="messlog_wx_state"  min-width="120" :show-overflow-tooltip="true" label="发送状态(微信)"  align='center'>
            <template slot-scope="scope">
              <span v-if="scope.row.messlog_wx_state==1">未发送</span>
              <span v-else-if="scope.row.messlog_wx_state==2" style="color:#9D9D9D">已发送</span>
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
import { local } from '../../../util/util'
export default {
  data () {
    return {
      page: {
        pager_offset: '0',
        pager_openset:'10',
        mess_event:'',
        mess_type:'',
        messlog_ms_state:'',
        messlog_wx_state:'',
        user_mobilephone:'',
        add_time:'',
        end_time:'',
      },
      list_btn:[{name:'备案通过',id:'1'},{name:'备案驳回',id:'2'},{name:'巡查不合格',id:'3'},{name:'培训不合格',id:'4'},{name:'自查自纠',id:'5'},{name:'投诉举报待处理',id:'6'},{name:'投诉举报已处理',id:'7'},{name:'应急通告',id:'8'},{name:'备案待审核',id:'9'},{name:'待巡查工单',id:'10'}],
     currentPage: 1,
      total: 0,
      tableData:[],
      user:'',
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
      this.user = local.get('user');
    this.currentPage = this.page.pager_offset / 10 + 1
    this.init(this.page)
  },
  methods: {
           init (params) {
      axios.get('/api/messLog/list', params).then((v) => {
        this.tableData=v.mess_log_list;
         this.total = v.pager_count
      })
    },
          change(index,val){
            var that=this;
            if (val == null) val = '';
if(index==1){that.page.mess_event=val;}
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
