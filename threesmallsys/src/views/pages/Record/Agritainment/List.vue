<template>
  <el-container class="shopList">
    <el-header class="box add bb">
        <h5 class="mb10"><span class="lines"></span>农家乐管理</h5>
        <div><el-button size="small" type="primary" @click="godetail('','0','农家乐')">新增农家乐</el-button></div>
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
         <el-input placeholder="小作坊名称、手机号" clearable @clear='onSubmit' v-model="page.company_name" class="input-with-select">
            </el-input>
        </el-form-item>
        </el-col>
        <el-col :span="4" class="mr10">
            <el-form-item size="small">
              <el-select v-model="page.user_state" clearable placeholder="请选择" @change="onSubmit(page.user_state)">
                <el-option
                  v-for="(item,index) in statusOptions"
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
          <el-button type="primary" v-if="loading==false" size="small" @click="DownExcel">导出数据</el-button>
          <el-button  v-else-if="loading==true" type="info" disabled size="small" >导出数据</el-button>
        </el-form-item>
        </el-col>
      </el-form>
    </el-row>
    <div class="box list">
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
         <el-table-column prop="company_name" min-width="80" :show-overflow-tooltip="true"  label="小作坊名称" align='center'></el-table-column>
          <el-table-column prop="user_name" min-width="80" :show-overflow-tooltip="true"  label="姓名" align='center'></el-table-column>
        <el-table-column prop="user_mobilephone"  min-width="80" :show-overflow-tooltip="true"  label="手机号" align='center' ></el-table-column>
        <el-table-column label="所属区域" align="center" min-width="150" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{scope.row.user_province}}{{scope.row.user_city}}{{scope.row.user_area}}{{scope.row.user_town}}{{scope.row.user_vill}}{{scope.row.user_address}}</span>
            </template>
          </el-table-column>
        <el-table-column align="center" label="状态">
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.user_state | tagFilter"
              >{{scope.row.user_state | statusFilter}}</el-tag>
            </template>
          </el-table-column>
        <el-table-column label="操作" width="120" fixed="right"  align='center'>
          <template slot-scope="scope">
           <el-button type="text" class="orange" size="small" @click="godetail(scope.row.user_code,'1','农家乐')">编辑</el-button>
             <el-button type="text" class="disib" :class="{'red':scope.row.user_state==1}" size="mini"  @click="changeState(scope.row)" >{{scope.row.user_state | antiStateFilter}}</el-button>
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
        company_name:'',
        user_name:'',
        user_state:'',
        user_type:'农家乐',
        user_province:'',
        user_city:'',
        user_area:'',
        user_town:'',
        user_vill:'',
        addtime:'',
        endtime:'',
        user_level_eq:'',
      },
       timer: '',
      loading:false,
        options:'',
      options1:'',
      options2:'',
      options3:'',
       options4:'',
      statusOptions: [
        { label: "全部", value: "" },
        { label: "已启用", value: "1" },
        { label: "已禁用", value: "2" },
        
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
        // if(index==6){this.page.user_state=String(val);}
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
      this.$store.dispatch('patrol/setNewPage', this.page)
      this.init(this.page)
    },
    // 分页
    currentChange(page){
      this.currentPage = page;
      this.page.pager_offset = String((page - 1) * 10)
      this.$store.dispatch('patrol/setNewPage', this.page)
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
    godetail(index,val,val1){
    this.$router.push({
        name: "ConductAdd",
        query: {
          id: index,
          active:val,
          name:val1
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
      this.page.down_name = '农家乐管理列表信息'
      axios.fileget('/api/report/export_agritainment_search', this.page).then((v) => {
      })
    },
   check(){
     axios.get('/api/report/check', {down_name:'export_agritainment_search'}).then((v) => {
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
    //          if(val==undefined){
    //     this.options=[]
    //  }else{
       
    //  }
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
