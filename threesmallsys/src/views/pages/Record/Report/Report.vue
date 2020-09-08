<template>
  <el-container class="shopList">
    <el-header class="box add bb">
        <h5 class="mb10"><span class="lines"></span>报备管理</h5>
        <!-- <div><el-button size="small" type="primary" @click="godetail('','0','举办者')">新增报备</el-button></!--> 
    </el-header>
    <el-main class="p15 pt0">
    <el-row class="box search mt20">
       <el-form :inline="true" :model="page" class="demo-form-inline">
        <el-form-item size="small" >
            <el-col :span="4" class="tl">
                <el-select v-if="user.province"  disabled  v-model="user.province"></el-select>
          <el-select v-else v-model="page.province_conduct" clearable placeholder="请选择省级" @change="change(1,page.province_conduct)">
             <el-option v-for="group in options" :key="group.region_code" :label="group.region_name" :value="group.region_code"> </el-option>
          </el-select>
             </el-col>
          <el-col :span="4" class="tl ml10" >
              <el-select v-if="user.city"  disabled  v-model="user.city"></el-select>
          <el-select v-else v-model="page.city_conduct" clearable placeholder="请选择市级" @change="change(2,page.city_conduct)">
             <el-option v-for="group in options1" :key="group.region_code" :label="group.region_name" :value="group.region_code"> </el-option>
          </el-select>
             </el-col>
            <el-col :span="4" class="tl ml10"  >
                <el-select v-if="user.area"  disabled  v-model="user.area"></el-select>
          <el-select v-else v-model="page.area_conduct" clearable placeholder="请选择区县" @change="change(3,page.area_conduct)">
             <el-option v-for="group in options2" :key="group.region_code" :label="group.region_name" :value="group.region_code"> </el-option>
          </el-select>
             </el-col>  
             <el-col :span="4" class="tl ml10"  >
                 <el-select v-if="user.town"  disabled  v-model="user.town"></el-select>
          <el-select v-else v-model="page.town_conduct" clearable placeholder="请选择乡镇" @change="change(4,page.town_conduct)">
             <el-option v-for="group in options3" :key="group.region_code" :label="group.region_name" :value="group.region_code"> </el-option>
          </el-select>
             </el-col> 
             <el-col :span="4" class="tl ml10"  >
                 <el-select v-if="user.vill"  disabled  v-model="user.vill"></el-select>
          <el-select v-else v-model="page.vill_conduct" clearable placeholder="请选择社区" @change="change(5,page.vill_conduct)">
             <el-option v-for="group in options4" :key="group.region_code" :label="group.region_name" :value="group.region_code"> </el-option>
          </el-select>
             </el-col> 
            </el-form-item>
        <el-col :span="4" class="mr10">
             <el-form-item size="small" >
         <el-input placeholder="举办者姓名、手机号" clearable @clear='onSubmit' v-model="page.user_name_conduct" class="input-with-select">
            </el-input>
        </el-form-item>
        </el-col>
         <el-col :span="4" class="mr10">
            <el-form-item size="small">
              <el-select v-model="page.report_mode" clearable placeholder="请选择" @change="onSubmit(page.report_mode)">
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
            <el-form-item size="small">
              <el-select v-model="page.report_state" clearable placeholder="请选择" @change="onSubmit(page.report_state)">
                <el-option
                  v-for="(item,index) in statusOptions1"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4" class="mr10">
            <el-form-item size="small">
              <el-select v-model="page.report_timeout_state" clearable placeholder="请选择" @change="onSubmit(page.report_timeout_state)">
                <el-option
                  v-for="(item,index) in statusOptions2"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4" class="mr10">
            <el-form-item size="small">
              <el-select v-model="page.banquet_type" clearable placeholder="请选择" @change="onSubmit(page.banquet_type)">
                <el-option
                  v-for="(item,index) in statusOptions3"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        <el-col :span="8" class="mr10">
          <el-form-item size="small">
            <el-col class="line" :span="11">
            <el-date-picker type="date" clearable placeholder="报备开始日期" v-model="page.addtime"  :picker-options="pickerOptionsStart" style="width: 100%;" format="yyyy-MM-dd" value-format="yyyy-MM-dd" @change="change(6,page.addtime)"></el-date-picker>
           </el-col>
            <el-col class="line" :span="2">至</el-col>
           <el-col class="line" :span="11">
            <el-date-picker  type="date" clearable placeholder="报备结束日期" v-model="page.endtime" :picker-options="pickerOptionsEnd" style="width: 100%;" format="yyyy-MM-dd" value-format="yyyy-MM-dd" @change="change(7,page.endtime)"></el-date-picker>
           </el-col>
        </el-form-item>
        </el-col>
        <el-col :span="8" class="mr10">
          <el-form-item size="small">
            <el-col class="line" :span="11">
            <el-date-picker type="date" clearable placeholder="办宴开始日期" v-model="page.banquet_time_start"  :picker-options="pickerOptionsStart" style="width: 100%;" format="yyyy-MM-dd" value-format="yyyy-MM-dd" @change="change(8,page.banquet_time_start)"></el-date-picker>
           </el-col>
            <el-col class="line" :span="2">至</el-col>
           <el-col class="line" :span="11">
            <el-date-picker  type="date" clearable placeholder="办宴结束日期" v-model="page.banquet_time_end" :picker-options="pickerOptionsEnd" style="width: 100%;" format="yyyy-MM-dd" value-format="yyyy-MM-dd" @change="change(9,page.banquet_time_end)"></el-date-picker>
           </el-col>
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
         <el-table-column prop="addtime" min-width="160" :show-overflow-tooltip="true"  label="报备时间" align='center'></el-table-column>
        <el-table-column prop="banquet_time"  min-width="120" :show-overflow-tooltip="true"  label="办宴时间" align='center' ></el-table-column>
         <el-table-column prop="banquet_day"  min-width="80" :show-overflow-tooltip="true"  label="办宴天数" align='center' ></el-table-column>
        <el-table-column align="center" label="办宴类型">
            <template slot-scope="scope">
              <span v-if="scope.row.banquet_type==1">红事</span>
              <span v-else-if="scope.row.banquet_type==2">白事</span>
              <span v-else-if="scope.row.banquet_type==3" >生日</span>
               <span v-else-if="scope.row.banquet_type==4" >状元</span>
              <span v-else-if="scope.row.banquet_type==5" >乔迁</span>
              <span v-else-if="scope.row.banquet_type==6" >其他</span>
           </template>
          </el-table-column>
          <el-table-column prop="user_name_conduct"  min-width="80" :show-overflow-tooltip="true"  label="举办者" align='center' ></el-table-column>
        <el-table-column label="地址" align="center" min-width="150" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{scope.row.province_conduct}}{{scope.row.city_conduct}}{{scope.row.area_conduct}}{{scope.row.town_conduct}}{{scope.row.vill_conduct}}{{scope.row.address_conduct}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="user_mobilephone_conduct"  min-width="120" :show-overflow-tooltip="true"  label="电话" align='center' ></el-table-column>
           <el-table-column prop="user_name_mainchef"  min-width="80" :show-overflow-tooltip="true"  label="厨师" align='center' ></el-table-column>
            <el-table-column align="center" min-width="100" :show-overflow-tooltip="true" label="报备状态">
            <template slot-scope="scope">
              <span v-if="scope.row.report_state==1">待审核</span>
              <span v-else-if="scope.row.report_state==2">无效</span>
              <span v-else-if="scope.row.report_state==3" >待检查</span>
               <span v-else-if="scope.row.report_state==4" >检查合格</span>
              <span v-else-if="scope.row.report_state==5" >检查不合格</span>
           </template>
          </el-table-column>
          <el-table-column align="center" label="管理状态	">
            <template slot-scope="scope">
             
              <span v-if="scope.row.report_timeout_state==2&&(scope.row.report_state==1||scope.row.report_state==3)">过期</span>
               <span v-else>正常</span>
           </template>
          </el-table-column>
        <el-table-column label="操作" width="100" fixed="right"  align='center'>
          <template slot-scope="scope">
           <el-button type="text" class="orange" size="small" @click="godetail(scope.row.report_code,1)">详情</el-button>
           <el-button  v-if="scope.row.report_state==1&&scope.row.report_timeout_state==1&&(user.user_type=='协管员'||user.user_type=='平台管理员')" type="text" class="" size="small" @click="godetail(scope.row.report_code,2)">审核</el-button>
           <el-button  v-if="scope.row.report_state==3&&scope.row.report_timeout_state==1&&user.user_type=='协管员'" type="text" class="" size="small" @click="godetail(scope.row.report_code,2)">检查</el-button>
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
        user_name_conduct:'',
        report_mode:'',
        report_state:'',
        report_timeout_state:'',
        banquet_type:'',
        province_conduct:'',
        city_conduct:'',
        area_conduct:'',
        town_conduct:'',
        vill_conduct:'',
        addtime:'',
        endtime:'',
        banquet_time_start:'',
        banquet_time_end:''
      },
      user:'',
       timer: '',
      loading:false,
        options:'',
      options1:'',
      options2:'',
      options3:'',
       options4:'',
      statusOptions: [{ label: "全部报备方式", value: "" },{ label: "主家", value: "1" },{ label: "乡厨", value: "2" },{ label: "农家乐", value: "3" },{ label: "乡村酒店", value: "4" },],
      statusOptions1: [{ label: "全部报备状态", value: "" },{ label: "待审核", value: "1" },{ label: "无效", value: "2" },{ label: "待检查", value: "3" },{ label: "检查合格", value: "4" },{ label: "检查不合格", value: "5" }],
      statusOptions2: [{ label: "全部管理状态", value: "" },{ label: "正常", value: "1" },{ label: "过期", value: "2" } ],
      statusOptions3: [{ label: "全部办宴类型", value: "" },{ label: "红事", value: "1" },{ label: "白事", value: "2" },{ label: "生日", value: "3" },{ label: "状元", value: "4" },{ label: "乔迁", value: "5" },{ label: "其他", value: "6" }],
     currentPage: 1,
      total: 0,
      tableData:[],
      activeName:'1',
       pickerOptionsStart: {
        disabledDate: time => {
          if (this.page.endtime) {
            return time.getTime() > new Date(this.page.endtime).getTime()
          }else if (this.page.banquet_time_end) {
            return time.getTime() > new Date(this.page.banquet_time_end).getTime()
          }else{ 
            return time.getTime() > Date.now()}
        }
      },
      pickerOptionsEnd: {
        disabledDate: time => {
          return time.getTime() > Date.now()
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
       if(this.user.province!=''&&this.user.province!=null){this.page.province_conduct=this.user.province;}
      if(this.user.city!=''&&this.user.city!=null){this.page.city_conduct=this.user.city;}
      if(this.user.area!=''&&this.user.area!=null){this.page.area_conduct=this.user.area;}
      if(this.user.town!=''&&this.user.town!=null){this.page.town_conduct=this.user.town;}
      if(this.user.vill!=''&&this.user.vill!=null){this.page.vill_conduct=this.user.vill;}
      this.getProvince();

 axios.get('/api/region/list',{region_high_code:''}).then((v) => {
       this.options=v
      })
      axios.get('/api/qy/report/search',params).then((v) => {
this.tableData=v.reportList
 this.total = v.pager_count
      })
     
      
      
    },
    changeState(row) {
      let { user_code, user_state } = row;
      user_state = user_state == 1 ? 2 : 1;
      axios
        .put("/api/user/updateState", { user_code, user_state })
        .then(response => {
          this.init(this.page);
        });
    },
       change(index,val){
         if (val == null) val = '';
       if(index==1){
          if(val!=''){this.getProvince(val,'2')}
        this.options.forEach(item=>{
         if(item.region_code==val){this.page.province_conduct=item.region_name;}
        })
        this.page.city_conduct='';
         this.page.area_conduct='';
          this.page.town_conduct='';
           this.page.vill_conduct='';
           this.options1=[];
           this.options2=[];
           this.options3=[];
           this.options4=[]
       }
        if(index==2){
          if(val!=''){this.getProvince(val,'3')}
        this.options1.forEach(item=>{
         if(item.region_code==val){this.page.city_conduct=item.region_name;}
        })
        this.page.area_conduct='';
         this.page.town_conduct='';
           this.page.vill_conduct='';
           this.options2=[];
           this.options3=[];
           this.options4=[]
        }
       if(index==3){
         if(val!=''){ this.getProvince(val,'4')}
        this.options2.forEach(item=>{
         if(item.region_code==val){this.page.area_conduct=item.region_name;}
        })
        this.page.town_conduct='';
         this.page.vill_conduct='';
          this.options3=[];
           this.options4=[]
       }
         if(index==4){
           if(val!=''){ this.getProvince(val,'5')}
        this.options3.forEach(item=>{
         if(item.region_code==val){this.page.town_conduct=item.region_name;}
        })
        this.page.vill_conduct='';
        this.options4=[]
        }
         if(index==5){
            this.options4.forEach(item=>{
         if(item.region_code==val){this.page.vill_conduct=item.region_name;}
        })
        }
        // if(index==6){this.page.user_state=String(val);}
        if(index==6){this.page.addtime=val}
        if(index==7){this.page.endtime=val}
         if(index==8){this.page.banquet_time_start=val}
        if(index==9){this.page.banquet_time_end=val}
        this.onSubmit()
         
     },
     // 搜索
     onSubmit () { 
      this.currentPage = 1
      this.page.pager_offset = '0'
            if(this.page.endtime==null){this.page.endtime='';}
      if(this.page.addtime==null){this.page.addtime='';}
       if(this.page.banquet_time_end==null){this.page.banquet_time_end='';}
      if(this.page.banquet_time_start==null){this.page.banquet_time_start='';}
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
   godetail(val,index){
    this.$router.push({
        name: "ReportDetail",
        query: {
          code: val,
          id:index
        }
      });
  },
   //导出
    DownExcel () { 
  this.loading=true;
  this.timer=setInterval(() => { this.check();}, 1000);
      this.currentPage = 1
      this.page.pager_offset = '0'
 this.page.pager_openset=String(this.total);
      if(this.page.endtime==null){this.page.endtime='';}
      if(this.page.addtime==null){this.page.addtime='';}
      if(this.page.banquet_time_end==null){this.page.banquet_time_end='';}
      if(this.page.banquet_time_start==null){this.page.banquet_time_start='';}
      this.page.down_name = '群宴报备列表信息'
      axios.fileget('/api/report/export_report_search', this.page).then((v) => {
      })
    },
   check(){
     axios.get('/api/report/check', {down_name:'export_report_search'}).then((v) => {
       if(v==true){
         clearInterval(this.timer);
         this.loading=false;
       }
      })
    },
     getProvince(val,index){
        axios.get('/api/region/list',{region_high_code:val,region_type:index}).then((v) => {
          if(index=='2'){
            this.options1=v;
          let city=this.page.city_conduct;

          if(city){
             this.options1.forEach(item=>{
               if(item.region_name==city){
                  this.getProvince(item.region_code,'3')
               }
             })
           }}
          else if(index=='3'){
            this.options2=v;
            let area=this.page.area_conduct
          if(area){
             this.options2.forEach(item=>{
               if(item.region_name==area){
                  this.getProvince(item.region_code,'4')
               }
             })
           }
          }
          else if(index=='4'){this.options3=v;
          let town=this.page.town_conduct
          if(town){
             this.options3.forEach(item=>{
               if(item.region_name==town){
                  this.getProvince(item.region_code,'5')
               }
             })
           }}
          else if(index=='5'){this.options4=v;}
          else{
    //          if(val==undefined){
    //     this.options=[]
    //  }else{
       
    //  }
            this.options=v
            let province=this.page.province_conduct
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
