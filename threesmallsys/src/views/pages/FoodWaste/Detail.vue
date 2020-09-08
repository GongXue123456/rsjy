<template>
  <el-container class="shopList ">
    <el-header class="box add bb">
        <h5 ><span class="lines"></span>餐厨垃圾处理详情</h5>
         <div><el-button  class="back_btn" size="small" plain  @click="$router.back()">返回</el-button></div>
    </el-header>
    <el-main class="p15 pt0 mt20">
       <div class="box title mb20 f16">
        <div class="tl c333" >{{company_name}}</div>
     </div>
   <el-row class="box search">
       <el-form :inline="true"  :model="page" class="demo-form-inline">
        <el-col :span="4" class="mr10">
         <el-form-item size="small">
          <el-select v-model="page.dictionary_code" clearable placeholder="餐厨垃圾类型" @change="change(1,page.dictionary_code)">
              <el-option v-for="v in list_btn" :key="v.dictionary_code" :label="v.dictionary_module" :value="v.dictionary_code"></el-option>
          </el-select>
        </el-form-item>
        </el-col>
       
         <el-col :span="8" class="mr10">
          <el-form-item size="small">
            <el-col class="line" :span="11">
            <el-date-picker type="date" clearable placeholder="开始日期" v-model="page.add_time"  :picker-options="pickerOptionsStart" style="width: 100%;" format="yyyy-MM-dd" value-format="yyyy-MM-dd" @change="change(6,page.add_time)"></el-date-picker>
           </el-col>
            <el-col class="line" :span="2">至</el-col>
           <el-col class="line" :span="11">
            <el-date-picker  type="date" clearable placeholder="结束日期" v-model="page.end_time" :picker-options="pickerOptionsEnd" style="width: 100%;" format="yyyy-MM-dd" value-format="yyyy-MM-dd" @change="change(7,page.end_time)"></el-date-picker>
           </el-col>
        </el-form-item>
        </el-col>
         
        <el-col :span="2" class="tl">
           <el-form-item  size="small">
          <el-button  type="primary"  @click="onSubmit" class="general_bgc general_border cfff">查询</el-button>
        </el-form-item>
        </el-col>
       
      </el-form>
    </el-row>
    <div class="box list">
      <el-table border  :data="tableData"  style="width: 100%">
        <el-table-column type="index" align='center' width="60" label="序号"></el-table-column>
         <el-table-column prop="dictionary_module" min-width="150" :show-overflow-tooltip="true"  label="餐厨垃圾类型" align='center'></el-table-column>
          <el-table-column prop="cclj_count" min-width="150" :show-overflow-tooltip="true"  label="处理量" align='center'></el-table-column>
          <el-table-column prop="cclj_handler"  min-width="150" :show-overflow-tooltip="true" label="处理人" align='center'> </el-table-column>
        <el-table-column prop="cclj_time"  min-width="150" :show-overflow-tooltip="true"  label="处理时间" align='center'></el-table-column>
          <el-table-column prop="img"   min-width="180" align='center' label="餐厨垃圾处理照片">
       <template slot-scope="scope">
         <!-- <img v-if="scope.row.sample_img==='undefined'||scope.row.sample_img===''||scope.row.sample_img==='null'"  src="../../../assets/image/source.png"   style="width: 40px;height: 40px"/> -->
      <el-image v-for="(item,index) in scope.row.accessory_list" :key="index"  style="width: 40px;height: 40px" :src="user.qyurl+item.url" :preview-src-list="[user.qyurl+item.url]" alt=""></el-image>
      <!-- <img class="mr10" v-for="(item,index) in scope.row.accessory_list" :key="index" :src="user.qyurl+item.url" alt="" style="width: 40px;height: 40px"> -->
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
        company_code:'',
        dictionary_code:'',
      add_time:'',
      end_time:'',
      },
      company_name:'',
      options4:'',
      list_btn:[],
       list_btn3:[{id:'1',title: '注销'},{id:'2',title: '驳回'},{id:'3',title: '通过'}],
       currentPage: 1,
      total: 0,
      user:'',
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
     var that=this;
        this.user = local.get('user');
     this.page.company_code=this.$route.query.id;
      this.company_name=this.$route.query.name;
          that.currentPage = that.page.pager_offset / 10 + 1;
    that.init(that.page)
  },
  methods: {
       init (params) {
          var that=this;
           axios.get('/api/dictionary/cclj/list', '').then((v) => {that.list_btn=v.cclj_list })
          axios.get('/api/companyCCLJ/list', params).then((v) => {
        that.tableData=v.company_cclj_list;
         that.total = v.pager_count
      })
    },
      change(index,val){
        var that=this;
if(index==1){that.page.dictionary_code=val}
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
      that.$store.dispatch('foodWaste/setNewPage', that.page)
      that.init(that.page)
    },
    // 分页
    currentChange(page){
        var that=this;
      that.currentPage = page;
      that.page.pager_offset = String((page - 1) * 10)
      that.$store.dispatch('foodWaste/setNewPage', that.page)
      that.init(that.page)
    },
   godetail(index){
    this.$router.push({
        name: "FoodWasteDetail",
        query: {
          id: index
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
