<template>
  <el-container class="shopList">
    <el-header class="box add bb">
        <h5  class="mb10"><span class="lines"></span>人员管理</h5>
         <!-- v-if="user_level==5" -->
        <div><el-button   class=""  icon="el-icon-plus" size="small" type="primary" @click="goedit('',2)">新增管理员</el-button></div>
    </el-header>
    <el-main class="pt0">
    <el-tabs class="mt10" v-model="activeName" @tab-click="handleClick">
  <el-tab-pane 
   v-for="item in editableTabs"
     :key="item.name"
    :label="item.title"
    :name="item.name"
    >
   <el-row class="box search">
       <el-form :inline="true"  :model="page" class="demo-form-inline">
            <el-col v-if="page.user_type=='平台管理员'" :span="24" class="tl"> 
               <el-form-item size="small" >
            <el-button v-for="(v,k) in list_btn" :key="k" :class="activeClass ==k?'active':''" class=""  size="small" @click="IsActive(k)">{{v.title}}</el-button>
            </el-form-item>
        </el-col>
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
        <el-col :span="4">
             <el-form-item size="small" class="w">
              <el-input placeholder="姓名、手机号" clearable v-model="page.user_name" @clear='onSubmit' class="input-with-select"></el-input>
        </el-form-item>
        </el-col>
       <el-col :span="4" class=" ml10">
           <el-form-item size="small" class="w ">
              <el-select v-model="page.user_state"  clearable placeholder="全部" @change="change(6,page.user_state)">
            <el-option v-for="v in list_btn1" :key="v.id" :label="v.title" :value="v.id"></el-option>
          </el-select>
        </el-form-item>
        </el-col>
        <el-col :span="8" class="ml10">
          <el-form-item size="small" class="w">
            <el-col class="line" :span="11">
            <el-date-picker type="date" placeholder="开始日期" clearable v-model="page.search_time_bigen"  :picker-options="pickerOptionsStart" style="width: 100%;" format="yyyy-MM-dd" value-format="yyyy-MM-dd" @change="change(7,page.search_time_bigen)"></el-date-picker>
           </el-col>
            <el-col class="line" :span="2">至</el-col>
           <el-col class="line" :span="11">
            <el-date-picker type="date" placeholder="结束日期" clearable v-model="page.search_time_end" :picker-options="pickerOptionsEnd" style="width: 100%;" format="yyyy-MM-dd" value-format="yyyy-MM-dd" @change="change(8,page.search_time_end)"></el-date-picker>
           </el-col>
        </el-form-item>
        </el-col>
        <el-col :span="2" class="tl ml10">
           <el-form-item  size="small">
          <el-button  type="primary"  @click="onSubmit" class="general_bgc general_border cfff">查询</el-button>
        </el-form-item>
        </el-col>
       
      </el-form>
    </el-row>
    <div class="box list">
      <el-table border  :data="tableData"  style="width: 100%">
        <el-table-column type="index" align='center' width="60" label="序号"></el-table-column>
        <!-- <el-table-column prop="img" align='center' label="留样图片"><template slot-scope="scope">
          <img  :src="'http://120.76.235.46:8099/qy/images/'+scope.row.user_logo_url" alt="" style="width: 40px;height: 40px">
           </template></el-table-column> -->
        <el-table-column prop="user_name"   min-width="180" :show-overflow-tooltip="true" label="姓名" align='center'></el-table-column>
        <el-table-column prop="user_mobilephone" min-width="150" :show-overflow-tooltip="true"  label="手机号" align='center'></el-table-column>
         <el-table-column prop="" align='center'  min-width="200" :show-overflow-tooltip="true" label="地区">
          <template slot-scope="scope">
            {{scope.row.user_province}}{{scope.row.user_city}}{{scope.row.user_area}}{{scope.row.user_town}}{{scope.row.user_vill}}
        </template>
        </el-table-column>
         <el-table-column prop="department_names"  min-width="150" :show-overflow-tooltip="true"  label="监管部门" align='center' :formatter="userTypeList2" ></el-table-column>
        <el-table-column prop="user_level"  min-width="150" :show-overflow-tooltip="true"  label="级别" align='center' :formatter="userTypeList" ></el-table-column>
        <el-table-column align="center" label="状态"  min-width="150" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.user_state | tagFilter"
              >{{scope.row.user_state | statusFilter}}</el-tag>
            </template>
          </el-table-column>
         <!-- <el-table-column prop="user_state"  min-width="150" :show-overflow-tooltip="true" label="状态"  align='center' :formatter="userTypeList1"></el-table-column> -->
        <el-table-column  label="操作" class-name='aa'  fixed="right" min-width="120"  align='center'>
          <template slot-scope="scope">
            <el-button type="text" class="general_color disib"  size="mini"  @click="godetail(scope.row.user_code)">详情</el-button>
            <el-button  type="text" class="orange disib " size="mini" @click="goedit(scope.row.user_code,1)">编辑</el-button>
            <el-button type="text" class="disib" :class="{'red':scope.row.user_state==1}"  size="mini" @click="changeState(scope.row)" >{{scope.row.user_state | antiStateFilter}}</el-button>
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
  </el-tab-pane>
</el-tabs>
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
      pager_offset: "0",
      user_province: '',
      user_city: '',
      user_area:"",
      user_town:"",
      user_vill:'',
      user_level_eq:'',
      user_name:'',
      user_type:'平台管理员',
      user_state:'',
      search_time_bigen:'',
      search_time_end:'',
    },
     activeClass:0,
       options:'',
      options1:'',
      options2:'',
      options3:'',
       options4:'',
      editableTabs: [{title: '监管员',name:'1'}, {title: ' 网格员',name:'2'}],
       list_btn:[{title: '全部'},{title: '市级'},{title: '区/县级'},{title: '乡/镇级'},],
      list_btn1:[{id:'',title: '全部'},{id:'1',title: '启用'},{id:'2',title: '禁用'}],
      currentPage: 1,
      total: 0,
      tableData:[],
      activeName:'',
      user_level:'',
      user:'',
      pickerOptionsStart: {
        disabledDate: time => {
          if (this.page.search_time_end) {
            return time.getTime() > new Date(this.page.search_time_end).getTime()
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
    computed: {
    ...mapState({
      powerPage: (state) => state.power.powerPage
    })
  },
   created () {
     var that=this;
      that.page = Object.assign({}, that.powerPage);
      this.user = local.get('user');
      
      this.activeClass = this.page.user_level_eq==''?0:this.page.user_level_eq-1;
      this.user_level = local.get('user_level')
    this.activeName=this.page.user_type=='平台管理员'?'1':'2'
    this.currentPage = this.page.pager_offset / 10 + 1;
    that.init(this.page)
  },
  methods: {
     IsActive(k) {
        this.activeClass = k;
        this.page.user_level_eq=String(k+1)>1?String(k+1):'';

         this.onSubmit()
      },
       handleClick() {
        var that=this;
        
      if(that.activeName==1){that.page.user_type='平台管理员'; this.page.user_level_eq='';
          this.activeClass =0;}else {that.page.user_type='协管员';that.page.user_level_eq='5'}
      this.$store.dispatch('power/setNewPage', that.page)
       
    that.init(that.page)
    },
     userTypeList (row) {
       if(row.user_level==1){return '省级'}else if(row.user_level==2){return '市级'}else if(row.user_level==3){ return '区县级'}else if(row.user_level==4){ return '乡镇级'}else {return '村级'}
    },
    userTypeList1 (row) {
      return row.user_state==1?'启用':'禁用'
    },
 userTypeList2 (row) {
      return row.department_names==null?'---':row.department_names
    },
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
      axios.get('/api/user/search',params).then((v) => {
this.tableData=v.user_list
 this.total = v.pager_count
      })
     
      
      
    },
    changeState(row) {
      let { user_code, user_state } = row;
      user_state = user_state == 1 ? 2 : 1;
      axios.put("/api/user/updateState", { user_code, user_state }).then(response => {
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
        if(index==6){this.page.user_state=String(val);}
        if(index==7){this.page.search_time_bigen=val}
        if(index==8){this.page.search_time_end=val}
        this.onSubmit()
         
     },
    // 搜索
     onSubmit () { 
        var that=this;
      this.currentPage = 1
      this.page.pager_offset = '0'
            if(this.page.search_time_end==null){this.page.search_time_end='';}
      if(this.page.search_time_bigen==null){this.page.search_time_bigen='';}
      this.$store.dispatch('power/setNewPage', that.page)
      that.init(that.page)
    },
    // 分页
    currentChange(page){
        var that=this;
      this.currentPage = page;
      this.page.pager_offset = String((page - 1) * 10)
      this.$store.dispatch('power/setNewPage', that.page)
      that.init(that.page)
    },
  godetail(index){
    this.$router.push({
        name: "PowerDetail",
        query: {
          id: index,
        }
      });
  },
  goedit(index,index1){
     this.$router.push({name: "PowerAdd",query: {id: index,id1:index1,id2:this.activeName}});
  },
  off(index){
       axios.post('/api/company/examine', {company_code:index,examine:1}).then((v) => {
         this.tableData.forEach(item=>{
           if(item.company_code==index){
             item.state=3
           }
         })
         
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
  .active {
       background: #2EC68A;
    border-color: #2EC68A;
    color: #FFFFFF;
  }
 /deep/ .el-input-group__append .el-button--primary .el-icon-search{color: #fff}
  /deep/.el-table .aa .cell {display: flex;justify-content: center;}
}

</style>
