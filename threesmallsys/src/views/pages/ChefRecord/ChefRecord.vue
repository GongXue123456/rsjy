<template>
  <el-container class="shopList">
    <el-header class="box add bb">
        <h5 class="mb10"><span class="lines"></span>一厨一档 </h5>
    </el-header>
    <el-main class="p15 pt0">
    <el-row class="box search mt20">
       <el-form :inline="true" :model="page" class="demo-form-inline">
        <el-form-item size="small" >
            <el-col :span="4" class="tl">
                <el-select v-if="user.province"  disabled  v-model="user.province"></el-select>
          <el-select v-else v-model="page.user_province" clearable placeholder="请选择省级" @change="change(1,page.user_province)">
             <el-option v-for="group in options" :key="group.region_code" :label="group.region_name" :value="group.region_code"> </el-option>
          </el-select>
             </el-col>
          <el-col :span="4" class="tl ml10" >
              <el-select v-if="user.city"  disabled  v-model="user.city"></el-select>
          <el-select v-else v-model="page.user_city" clearable placeholder="请选择市级" @change="change(2,page.user_city)">
             <el-option v-for="group in options1" :key="group.region_code" :label="group.region_name" :value="group.region_code"> </el-option>
          </el-select>
             </el-col>
            <el-col :span="4" class="tl ml10"  >
                <el-select v-if="user.area"  disabled  v-model="user.area"></el-select>
          <el-select v-else v-model="page.user_area" clearable placeholder="请选择区县" @change="change(3,page.user_area)">
             <el-option v-for="group in options2" :key="group.region_code" :label="group.region_name" :value="group.region_code"> </el-option>
          </el-select>
             </el-col>  
             <el-col :span="4" class="tl ml10"  >
                 <el-select v-if="user.town"  disabled  v-model="user.town"></el-select>
          <el-select v-else v-model="page.user_town" clearable placeholder="请选择乡镇" @change="change(4,page.user_town)">
             <el-option v-for="group in options3" :key="group.region_code" :label="group.region_name" :value="group.region_code"> </el-option>
          </el-select>
             </el-col> 
             <el-col :span="4" class="tl ml10"  >
                 <el-select v-if="user.vill"  disabled  v-model="user.vill"></el-select>
          <el-select v-else v-model="page.user_vill" clearable placeholder="请选择社区" @change="change(5,page.user_vill)">
             <el-option v-for="group in options4" :key="group.region_code" :label="group.region_name" :value="group.region_code"> </el-option>
          </el-select>
             </el-col> 
            </el-form-item>
        <el-col :span="4" class="mr10">
             <el-form-item size="small" >
         <el-input placeholder="姓名、手机号" clearable @clear='onSubmit' v-model="page.user_name" class="input-with-select">
            </el-input>
        </el-form-item>
        </el-col>
         <el-col :span="4" class="mr10">
           <el-form-item size="small">
          <el-select v-model="page.user_audit_state" clearable placeholder="审核状态" @change="onSubmit(page.user_audit_state)">
              <el-option v-for="(item,index) in statusOptions1"  :key="index" :label="item.label" :value="item.value" ></el-option>
          </el-select>
        </el-form-item>
        </el-col>
         <el-col :span="4" class="mr10">
           <el-form-item size="small">
          <el-select v-model="page.user_health_state" clearable placeholder="健康证状态" @change="onSubmit(page.user_health_state)">
             <el-option v-for="(item,index) in statusOptions2"  :key="index" :label="item.label" :value="item.value" ></el-option>
          </el-select>
        </el-form-item>
        </el-col>
         <el-col :span="4" class="mr10">
           <el-form-item size="small">
          <el-select v-model="page.vip_state" clearable placeholder="用户状态" @change="onSubmit(page.vip_state)">
             <el-option v-for="(item,index) in statusOptions3"  :key="index" :label="item.label" :value="item.value" ></el-option>
          </el-select>
        </el-form-item>
        </el-col>
        <el-col :span="4">
            <el-form-item size="small">
              <el-select v-model="page.user_state" clearable placeholder="请选择" @change="onSubmit(page.user_state)">
                <el-option v-for="(item,index) in statusOptions"  :key="index" :label="item.label" :value="item.value" ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        <el-col :span="8" class="mr10">
          <el-form-item size="small">
            <el-col class="line" :span="11">
            <el-date-picker type="date" clearable placeholder="查询开始日期" v-model="page.addtime"  :picker-options="pickerOptionsStart" style="width: 100%;" format="yyyy-MM-dd" value-format="yyyy-MM-dd" @change="change(6,page.addtime)"></el-date-picker>
           </el-col>
            <el-col class="line" :span="2">至</el-col>
           <el-col class="line" :span="11">
            <el-date-picker  type="date" clearable placeholder="查询结束日期" v-model="page.endtime" :picker-options="pickerOptionsEnd" style="width: 100%;" format="yyyy-MM-dd" value-format="yyyy-MM-dd" @change="change(7,page.endtime)"></el-date-picker>
           </el-col>
        </el-form-item>
        </el-col>
         <el-col :span="6" class="tl mr10">
           <el-form-item  size="small">
          <el-button  type="primary"  @click="onSubmit" class="general_bgc general_border cfff">查询</el-button>
        </el-form-item>
        </el-col>
      </el-form>
    </el-row>
    <div class="box list">
      <div class="tl w f20 p10 bgf5f c666">健康证过期：<span class="red mr20">{{User_health_over_count}}</span></div>
       <el-table border :data="tableData" style="width: 100%"  id='out-table'>
        <el-table-column type="index" align='center' width="60"  label="序号"></el-table-column>
          <el-table-column align="center" label="头像" width="80" :show-overflow-tooltip="true" prop="user_logo_url">
      <template scope="scope">
        <el-popover
            placement="right"
            title=""
            trigger="click">
          <el-image slot="reference" :src="user.qyurl+scope.row.user_logo_url" :alt="user.qyurl+scope.row.user_logo_url" style="width: 40px;height: 40px;max-height: 200px;max-width: 200px"></el-image>
          <el-image :src="user.qyurl+scope.row.user_logo_url"></el-image>
        </el-popover>
      </template>
    </el-table-column>
         <el-table-column prop="user_name" min-width="80" :show-overflow-tooltip="true"  label="姓名" align='center'></el-table-column>
        <el-table-column prop="user_mobilephone"  min-width="80" :show-overflow-tooltip="true"  label="手机号" align='center' ></el-table-column>
         <el-table-column label="所属区域" align="center" min-width="150" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{scope.row.user_province}}{{scope.row.user_city}}{{scope.row.user_area}}{{scope.row.user_town}}{{scope.row.user_vill}}{{scope.row.user_address}}</span>
            </template>
          </el-table-column>
        <el-table-column prop="report_count"  min-width="80" :show-overflow-tooltip="true"  label="报备次数" align='center' ></el-table-column>
        <el-table-column prop="banquet_count"  min-width="80" :show-overflow-tooltip="true"  label="办宴次数" align='center' ></el-table-column>
        <el-table-column prop="user_health_state"  min-width="80" :show-overflow-tooltip="true"  label="健康证状态" align='center' >
           <template slot-scope="scope">
              <span v-if="scope.row.user_health_state==1">正常</span>
              <span v-else-if="scope.row.user_health_state==2" style="color:#9D9D9D">过期</span>
        </template>
        </el-table-column>
         <el-table-column prop="user_audit_state"  min-width="80" :show-overflow-tooltip="true"  label="审核状态" align='center' >
           <template slot-scope="scope">	
              <span v-if="scope.row.user_audit_state==1" style="color:#9D9D9D">待审核</span>
              <span v-else-if="scope.row.user_audit_state==2" class="general_color">通过</span>
              <span v-else-if="scope.row.business_type==3" class="red">不通过</span>
        </template>
        </el-table-column>
       
        <el-table-column align="center" label="状态">
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.user_state | tagFilter"
              >{{scope.row.user_state | statusFilter}}</el-tag>
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
export default {
  data () {
    return {
      page: {
        pager_offset: '0',
        pager_openset:'10',
        user_name:'',
        user_state:'',
        user_type:'乡厨',
        user_province:'',
        user_city:'',
        user_area:'',
        user_town:'',
        user_vill:'',
        addtime:'',
        endtime:'',
        user_level_eq:'',
        user_audit_state:'',
        user_health_state:'',
        vip_state:''
      },
       timer: '',
         loading:false,
       User_health_over_count:'',
        options:'',
      options1:'',
      options2:'',
      options3:'',
       options4:'',
      statusOptions: [
        { label: "全部", value: "" },
        { label: "已启用", value: "1" },
        { label: "已禁用", value: "2" },
        
      ],statusOptions1: [
        { label: "全部审核状态", value: "" },
        { label: "待审核", value: "1" },
        { label: "通过", value: "2" },
        { label: "不通过", value: "3" },
        
      ],statusOptions2: [
        { label: "全部健康证状态", value: "" },
        { label: "正常", value: "1" },
        { label: "过期", value: "2" },
        
      ],statusOptions3: [
        { label: "全部用户状态", value: "" },
        { label: "vip", value: "2" },
        { label: "非vip", value: "1" },
        
      ],
     currentPage: 1,
      total: 0,
      tableData:[],
      activeName:'1',
       pickerOptionsStart: {
        disabledDate: time => {
          if (this.page.endtime) {
            return time.getTime() > new Date(this.page.endtime).getTime()
          }else{ 
            return time.getTime() > Date.now()+30 * 24 * 3600 * 1000}
        }
      },
      pickerOptionsEnd: {
        disabledDate: time => {
          return time.getTime() > Date.now()+30 * 24 * 3600 * 1000
        }
      },
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
      this.user = local.get('user');
    this.currentPage = this.page.pager_offset / 10 + 1
    this.init(this.page)
  },
  methods: {
         init (params) {
       if(this.user.province!=''&&this.user.province!=null){this.page.user_province=this.user.province;}
      if(this.user.city!=''&&this.user.city!=null){this.page.user_city=this.user.city;}
      if(this.user.area!=''&&this.user.area!=null){this.page.user_area=this.user.area;}
      if(this.user.town!=''&&this.user.town!=null){this.page.user_town=this.user.town;}
      if(this.user.vill!=''&&this.user.vill!=null){this.page.user_vill=this.user.vill;}
      this.getProvince();

 axios.get('/api/region/list',{region_high_code:''}).then((v) => {
       this.options=v
      })
      axios.get('/api/user/list',params).then((v) => {
this.tableData=v.user_list
 this.total = v.pager_count
 this.User_health_over_count=v.User_health_over_count
      })
     
      
      
    },
       change(index,val){
         if (val == null) val = '';
       if(index==1){
          if(val!=''){this.getProvince(val,'2')}
        this.options.forEach(item=>{
         if(item.region_code==val){this.page.user_province=item.region_name;}
        })
        this.page.user_city='';
         this.page.user_area='';
          this.page.user_town='';
           this.page.user_vill='';
           this.options1=[];
           this.options2=[];
           this.options3=[];
           this.options4=[]
       }
        if(index==2){
          if(val!=''){this.getProvince(val,'3')}
        this.options1.forEach(item=>{
         if(item.region_code==val){this.page.user_city=item.region_name;}
        })
        this.page.user_area='';
         this.page.user_town='';
           this.page.user_vill='';
           this.options2=[];
           this.options3=[];
           this.options4=[]
        }
       if(index==3){
         if(val!=''){ this.getProvince(val,'4')}
        this.options2.forEach(item=>{
         if(item.region_code==val){this.page.user_area=item.region_name;}
        })
        this.page.user_town='';
         this.page.user_vill='';
          this.options3=[];
           this.options4=[]
       }
         if(index==4){
           if(val!=''){ this.getProvince(val,'5')}
        this.options3.forEach(item=>{
         if(item.region_code==val){this.page.user_town=item.region_name;}
        })
        this.page.user_vill='';
        this.options4=[]
        }
         if(index==5){
            this.options4.forEach(item=>{
         if(item.region_code==val){this.page.user_vill=item.region_name;}
        })
        }
        if(index==6){this.page.addtime=val}
        if(index==7){this.page.endtime=val}
        this.onSubmit()
         
     },
     // 搜索
     onSubmit () { 
      this.currentPage = 1
      this.page.pager_offset = '0'
            if(this.page.endtime==null){this.page.endtime='';}
      if(this.page.addtime==null){this.page.addtime='';}
      this.init(this.page)
    },
    // 分页
    currentChange(page){
      this.currentPage = page;
      this.page.pager_offset = String((page - 1) * 10)
      this.init(this.page)
    },
     getProvince(val,index){
        axios.get('/api/region/list',{region_high_code:val,region_type:index}).then((v) => {
          if(index=='2'){
            this.options1=v;
          let city=this.page.user_city;

          if(city){
             this.options1.forEach(item=>{
               if(item.region_name==city){
                  this.getProvince(item.region_code,'3')
               }
             })
           }}
          else if(index=='3'){
            this.options2=v;
            let area=this.page.user_area
          if(area){
             this.options2.forEach(item=>{
               if(item.region_name==area){
                  this.getProvince(item.region_code,'4')
               }
             })
           }
          }
          else if(index=='4'){this.options3=v;
          let town=this.page.user_town
          if(town){
             this.options3.forEach(item=>{
               if(item.region_name==town){
                  this.getProvince(item.region_code,'5')
               }
             })
           }}
          else if(index=='5'){this.options4=v;}
          else{
            this.options=v
            let province=this.page.user_province
           if(province){
             this.options.forEach(item=>{
               if(item.region_name==province){
                  this.getProvince(item.region_code,'2')
               }
             })
           }
          }
       
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
