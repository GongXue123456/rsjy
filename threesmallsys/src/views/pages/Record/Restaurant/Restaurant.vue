<template>
  <el-container class="shopList ">
    <el-header class="box add bb">
        <h5 ><span class="lines"></span>备案管理/食品餐饮</h5>
         <!-- v-if="user_level==5" -->
        <div><el-button v-if="menu_btns!=null&&menu_btns.indexOf('5-3-1')!== -1"  class=""  icon="el-icon-plus" size="small" type="primary" @click="$router.push({path: 'restaurant/add'})">新增备案</el-button></div>
    </el-header>
    <el-main class="p15 pt0">
    <el-tabs class="mt10" v-model="activeName"  @tab-click="handleClick">
  <el-tab-pane
    v-for="item in editableTabs"
    :key="item.name"
    :label="item.title"
    :name="item.name"
  >
   <el-row class="box search">
       <el-form :inline="true"  :model="page" class="demo-form-inline">
        <el-form-item size="small" >
            <el-col :span="4" class="tl">
              <el-select v-if="user.province"  disabled  v-model="user.province"></el-select>
          <el-select v-else v-model="page.province" clearable placeholder="请选择省级" @change="change(11,page.province)">
             <el-option v-for="group in options11" :key="group.region_code" :label="group.region_name" :value="group.region_code"> </el-option>
          </el-select>
             </el-col>
          <el-col :span="4" class="tl ml10" >
            <el-select v-if="user.city"  disabled  v-model="user.city"></el-select>
          <el-select v-else  v-model="page.city" clearable placeholder="请选择市级" @change="change(12,page.city)">
             <el-option v-for="group in options12" :key="group.region_code" :label="group.region_name" :value="group.region_code"> </el-option>
          </el-select>
             </el-col>
            <el-col :span="4" class="tl ml10"  >
              <el-select v-if="user.area"  disabled  v-model="user.area"></el-select>
          <el-select v-else v-model="page.area" clearable placeholder="请选择区县" @change="change(13,page.area)">
             <el-option v-for="group in options13" :key="group.region_code" :label="group.region_name" :value="group.region_code"> </el-option>
          </el-select>
             </el-col>  
             <el-col :span="4" class="tl ml10"  >
               <!-- <el-select v-if="user.town"  disabled  v-model="user.town"></el-select> -->
          <el-select v-model="page.town" clearable placeholder="请选择乡镇" @change="change(14,page.town)">
             <el-option v-for="group in options14" :key="group.region_code" :label="group.region_name" :value="group.region_code"> </el-option>
          </el-select>
             </el-col> 
             <el-col :span="4" class="tl ml10"  >
               <!-- <el-select v-if="user.vill"  disabled  v-model="user.vill"></el-select> -->
          <el-select v-model="page.vill" clearable placeholder="请选择社区" @change="change(15,page.vill)">
             <el-option v-for="group in options15" :key="group.region_code" :label="group.region_name" :value="group.region_code"> </el-option>
          </el-select>
             </el-col> 
            </el-form-item>
        <el-col :span="4" class="mr10">
             <el-form-item size="small" >
         <el-input placeholder="小作坊名称、经营者" v-model="page.company_name" clearable class="input-with-select" @clear="onSubmit">
       
            </el-input>
        </el-form-item>
        </el-col>
        <!-- <el-col :span="4" class="mr10">
         <el-form-item size="small">
          <el-select v-model="page.companytag_code" clearable placeholder="主体类型" @change="change(1,page.companytag_code)">
              <el-option v-for="v in list_btn" :key="v.id" :label="v.title" :value="v.id"></el-option>
          </el-select>
        </el-form-item>
        </el-col>
        <el-col :span="4" class="mr10">
         <el-form-item size="small">
          <el-select v-model="page.business_form" clearable placeholder="主体业态" @visible-change='visibleChange' @change="change(5,page.business_form)">
              <el-option v-for="v in options2" :key="v.dictionary_field" :label="v.dictionary_field" :value="v.dictionary_field"></el-option>
          </el-select>
        </el-form-item>
        </el-col> -->
        <el-col :span="4" class="mr10">
           <el-form-item size="small">
          <el-select v-model="page.business_type" clearable placeholder="业务类型" @change="change(8,page.business_type)">
            <el-option v-for="v in list_btn3" :key="v.id" :label="v.title" :value="v.id"></el-option>
          </el-select>
        </el-form-item>
        </el-col>
        <el-col :span="4" class="mr10">
           <el-form-item size="small">
            <el-select v-model="page.department_code" filterable clearable placeholder="监管部门"  @change="change(3,page.department_code)">
             <el-option  v-for="item in options4" :key="item.department_code" :label="item.department_name" :value="item.department_code" ></el-option>
          </el-select>
         
        </el-form-item>
        </el-col>
        <el-col v-if="activeName==3" :span="4" class="mr10">
           <el-form-item size="small">
              <el-select v-model="page.state" clearable placeholder="证件状态" @change="change(2,page.state)">
            <el-option v-for="v in list_btn1" :key="v.id" :label="v.title" :value="v.id"></el-option>
          </el-select>
        </el-form-item>
        </el-col>
        <el-col :span="8" class="mr10">
          <el-form-item size="small">
            <el-col class="line" :span="11">
            <el-date-picker v-if="activeName==3" type="date" placeholder="开始日期（归档）" v-model="page.search_time_bigen"  :picker-options="pickerOptionsStart" style="width: 100%;" format="yyyy-MM-dd" value-format="yyyy-MM-dd" @change="change(6,page.search_time_bigen)"></el-date-picker>
            <el-date-picker v-if="activeName==4" type="date" placeholder="开始日期（驳回）" v-model="page.search_time_bigen"  :picker-options="pickerOptionsStart" style="width: 100%;" format="yyyy-MM-dd" value-format="yyyy-MM-dd" @change="change(6,page.search_time_bigen)"></el-date-picker>
            <el-date-picker v-if="activeName==1" type="date" placeholder="开始日期（备案）" v-model="page.search_time_bigen"  :picker-options="pickerOptionsStart" style="width: 100%;" format="yyyy-MM-dd" value-format="yyyy-MM-dd" @change="change(6,page.search_time_bigen)"></el-date-picker>
             <el-date-picker v-if="activeName==5" type="date" placeholder="开始日期（加入黑名单）" v-model="page.search_time_bigen"  :picker-options="pickerOptionsStart" style="width: 100%;" format="yyyy-MM-dd" value-format="yyyy-MM-dd" @change="change(6,page.search_time_bigen)"></el-date-picker>
           </el-col>
            <el-col class="line" :span="2">至</el-col>
           <el-col class="line" :span="11">
            <el-date-picker  v-if="activeName==3" type="date" placeholder="结束日期（归档）" v-model="page.search_time_end" :picker-options="pickerOptionsEnd" style="width: 100%;" format="yyyy-MM-dd" value-format="yyyy-MM-dd" @change="change(7,page.search_time_end)"></el-date-picker>
            <el-date-picker v-if="activeName==4" type="date" placeholder="结束日期（驳回）" v-model="page.search_time_end" :picker-options="pickerOptionsEnd" style="width: 100%;" format="yyyy-MM-dd" value-format="yyyy-MM-dd" @change="change(7,page.search_time_end)"></el-date-picker>
            <el-date-picker v-if="activeName==1" type="date" placeholder="结束日期（备案）" v-model="page.search_time_end" :picker-options="pickerOptionsEnd" style="width: 100%;" format="yyyy-MM-dd" value-format="yyyy-MM-dd" @change="change(7,page.search_time_end)"></el-date-picker>
            <el-date-picker v-if="activeName==5" type="date" placeholder="结束日期（加入黑名单）" v-model="page.search_time_end" :picker-options="pickerOptionsEnd" style="width: 100%;" format="yyyy-MM-dd" value-format="yyyy-MM-dd" @change="change(7,page.search_time_end)"></el-date-picker>
           </el-col>
        </el-form-item>
        </el-col>
        <el-col :span="4" class="tl">
           <el-form-item  size="small">
          <el-button  type="primary"  @click="onSubmit" class="general_bgc general_border cfff">查询</el-button>
          <el-button type="primary" v-if="loading==false" size="small" @click="DownExcel">导出数据</el-button>
          <el-button  v-else-if="loading==true" type="info" disabled size="small" >导出数据</el-button>
        </el-form-item>
        </el-col>
       
      </el-form>
    </el-row>
    <div class="box list">
       <div v-if="page.filing_state=='3'" class="tl list_tab ">
          <div v-for="(v,k) in list_btn4" :key="k" class="pr disib mr10">
            <el-button  :class="activeClass ==k?'active':''"  size="small" @click="IsActive(k,v.id)">{{v.title}} <span v-if="v.id=='2'" class="list_tag pa disib bgcred cfff">{{count.expired}}</span><span v-if="v.id=='4'" class="list_tag pa disib bgc666 cfff">{{count.will_expire}}</span></el-button></div>  
         </div>
      <el-table border  :data="tableData"  style="width: 100%">
        <el-table-column type="index" align='center' width="60" label="序号"></el-table-column>
        <!-- <el-table-column prop="companytag_code"  min-width="150" :show-overflow-tooltip="true"  label="主体类型" align='center' :formatter="userTypeList3" ></el-table-column>
        <el-table-column prop="business_form"  min-width="150" :show-overflow-tooltip="true"  label="主体业态" align='center' ></el-table-column> -->
        <el-table-column prop="company_name" min-width="150" :show-overflow-tooltip="true"  label="名称" align='center'></el-table-column>
        <el-table-column  min-width="100" prop="operator" :show-overflow-tooltip="true" label="法人/经营者" align='center'></el-table-column>
        <el-table-column prop="mobilephone" min-width="100" :show-overflow-tooltip="true" label="手机号" align='center'></el-table-column>
        <el-table-column prop="record_code"  min-width="200" :show-overflow-tooltip="true" label="备案证号/食品经营许可证号" align='center'> </el-table-column>
        <el-table-column v-if="activeName==2||activeName==1" prop="add_time" min-width="150" :show-overflow-tooltip="true" label="备案日期" align='center'></el-table-column>
        <!-- <el-table-column v-if="activeName==3" prop="filing_state_time"  min-width="150" :show-overflow-tooltip="true" label="归档日期" align='center'></el-table-column> -->
        <el-table-column v-if="activeName==4" prop="filing_state_time"   min-width="150" :show-overflow-tooltip="true" label="驳回日期" align='center'></el-table-column>
        <el-table-column prop="department_name"  min-width="150" :show-overflow-tooltip="true" label="监管部门"  align='center'></el-table-column>
        <el-table-column  min-width="120" :show-overflow-tooltip="true" label="面积"  align='center' :formatter="userTypeList"></el-table-column>
        <!-- <el-table-column prop="employ_num"  min-width="120" :show-overflow-tooltip="true" label="从业人数"  align='center'></el-table-column> -->
        <el-table-column prop="business_type" min-width="100" :show-overflow-tooltip="true" align='center' label="业务类型">
             <template slot-scope="scope">
              <span v-if="scope.row.business_type==1">首次</span>
              <span v-else-if="scope.row.business_type==2" style="color:#9D9D9D">延续</span>
              <span v-else-if="scope.row.business_type==3" class="red">注销</span>
              <span v-else style="color: #FAA500">变更</span>
        </template>
          </el-table-column>
        
         <el-table-column prop="state" label="证件状态" min-width="100" :show-overflow-tooltip="true" align='center'>
           <template slot-scope="scope">
              <span v-if="scope.row.state==1">有效</span>
              <span v-else-if="scope.row.state==2" class="red">过期</span>
              <span v-else-if="scope.row.state==3" style="color:#9D9D9D">注销</span>
              <span v-else style="color: #FAA500">即将过期</span>
        </template>
         </el-table-column>
        
        <el-table-column v-if="activeName==3" label="操作" class-name='aa' min-width="250"  fixed="right"  align='center'>
          <template slot-scope="scope">
            <el-button type="text" class="general_color disib"  size="mini"  @click="godetail(scope.row.company_code)">详情</el-button>
            <el-button type="text" v-if="loading==false" class="orange disib " size="mini" @click="downDetailExcel(scope.row.company_code,scope.row.company_name)">导出</el-button>
            <el-button  v-else-if="loading==true" type="text" disabled class="orange disib " size="mini" >导出</el-button>
             <el-button   type="text" class="general_color disib"  size="mini"  @click="addRole(scope.row.company_code)">设置管理员</el-button>
            <el-button  v-if="scope.row.state==2||scope.row.state==4" type="text" class="general_color disib"  size="mini"  @click="setUnusefulTime(scope.row.company_code,scope.row.company_name)">延续</el-button>
            <el-button type="text" class="general_color disib"  size="mini"  @click="addPower(scope.row.company_code)">人员管理</el-button>
         </template>
        </el-table-column>
        <el-table-column v-else label="操作" class-name='aa'  fixed="right" min-width="150"  align='center'>
          <template slot-scope="scope">
            <el-button  v-if="activeName==1" type="text" class="general_color disib"  size="mini"  @click="goUpdate(scope.row.company_code)">审核</el-button>
            <el-button v-else type="text" class="general_color disib"  size="mini"  @click="godetail(scope.row.company_code)">详情</el-button>
            <el-button  v-if="activeName==2" type="text" class="orange disib " size="mini" @click="godetail1(scope.row.company_code)">审核</el-button>
            <el-button type="text" v-if="loading==false" class="orange disib " size="mini" @click="downDetailExcel(scope.row.company_code,scope.row.company_name)">导出</el-button>
            <el-button  v-else-if="loading==true" type="text" disabled class="orange disib " size="mini" >导出</el-button>
             <el-button  v-if="activeName==1&&user.user_type=='超级管理人员'" type="text" class="general_color disib"  size="mini"  @click="goUpdateType(scope.row.company_code)">类型修改</el-button>
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
    <el-dialog title="备案延续" :visible.sync="timeVisible" :modal-append-to-body="false" width="25%" :show-close="false">
      <el-form ref="formInline" :model="formInline">
        <span>延续主体：{{c_name}}</span>
        <el-form-item  label="选择延续至：" prop="unuseful_time" :rules="[{required: true, message: '请选择时间', trigger: 'change'}]">
          <el-date-picker type="date" clearable placeholder="选择延续至"  v-model="formInline.unuseful_time"   format="yyyy-MM-dd" value-format="yyyy-MM-dd" :picker-options="pickerOptions"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button @click="timeVisible = false">取 消</el-button>
        <el-button type="primary" @click="continueTime('formInline')">确 定</el-button>
        </el-form-item>
      </el-form>     
    </el-dialog>
    </div> 
  </el-tab-pane>
</el-tabs>
</el-main>
  </el-container>
</template>
<script>
import axios from '../../../../util/api'
import Globle from '@/components/Globle'
import { local } from '../../../../util/util'
import { mapState } from 'vuex'
export default {
  data () {
    
    return {
      page: {
        pager_offset: "0",
      company_name: '',
      state: '1',
      isblacklist:'1',
      filing_state:"3",
      companytype_code:"1001574645421581000000003",
      business_form:'',
      companytag_code:'',
      business_state:'',
       department_code:'',
      search_time_bigen:'',
      search_time_end:'',
      filing_state_time:'',
      business_type:'',
      province: '',
      city: '',
      area:"",
      town:"",
      vill:'',
      },
      c_name:'',
      formInline:{        
        unuseful_time:''
      },
       user:'',
      options11:'',
      options12:'',
      options13:'',
      options14:'',
      options15:'',
      timeVisible:false,
      timer: '',
      loading:false,
      options4:'',
      menu_btns:Globle.menu_btns,
      options2:'',
      activeClass:0,
      editableTabs: [{title: '已归档',name: '3'},{title: '已驳回',name: '4'},{title: '待审核',name: '1'}],
      // {title: '黑名单',name: '5'}
       list_btn:[{id:'1001574645421581111111103',title: '食品经营许可（餐饮）'},{id:'1001574645421581111111104',title: '四川省小经营店备案证（餐饮）'}],
       list_btn1:[{id:'1',title: '有效'},{id:'2',title: '过期'},{id:'3',title: '注销'},{id:'4',title: '即将过期'}],
       list_btn3:[{id:'1',title: '首次'},{id:'2',title: '延续'},{id:'3',title: '注销'},{id:'4',title: '变更'}],
        list_btn4:[{id:'1',title: '正常'},{id:'2',title: '过期'},{id:'3',title: '注销'},{id:'4',title: '即将过期'}],
      currentPage: 1,
      total: 0,
      count:'',
      tableData:[],
      user_level:'',
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
       pickerOptions: {
         disabledDate(time) {
            return time.getTime() < Date.now();
          },
        }
    }
  },
    computed: {
    ...mapState({
      recordPage2: (state) => state.record.recordPage2
    })
    
  },
   created () {
     var that=this;
      that.user = local.get('user');
     that.page = Object.assign({}, that.recordPage2);
      that.user_level = local.get('user_level')
      if(that.$route.query.id!=undefined){that.page.state=that.$route.query.id}
     that.activeName=String(that.page.filing_state)
        if(that.page.filing_state==''){that.activeName='5'}
       that.activeClass=String(that.page.state)-1
    that.currentPage = that.page.pager_offset / 10 + 1;
    that.init(that.page)
  },
  methods: {
    userTypeList(row){return row.place_area+'平方米'},
   
    userTypeList3(row){
       if(row.companytag_code=='1001574645421581111111103'){return '食品经营许可（餐饮）';}else if(row.companytag_code=='1001574645421581111111104'){return '四川省小经营店备案证（餐饮）';}
    },
     handleClick() {
        var that=this;
      if(that.activeName==1){that.page.filing_state='1';that.page.state='';that.page.isblacklist='1';}else if(that.activeName==2){that.page.filing_state='2';that.page.state='';that.page.isblacklist='1';}else if(that.activeName==3){that.page.filing_state='3';that.page.state='1';that.page.isblacklist='1';}else if(that.activeName==4){that.page.filing_state='4';that.page.state='';that.page.isblacklist='1';}else if(that.activeName==5){that.page.filing_state='';that.page.state='';that.page.isblacklist='2';}
      this.onSubmit()
    },
       init (params) {
          var that=this;
          that.page.filing_state=String(that.page.filing_state)
           that.page.state=String(that.page.state)
             that.page.isblacklist=String(that.page.isblacklist)
          if(this.user.province!=''&&this.user.province!=null){this.page.province=this.user.province;}
          if(this.user.city!=''&&this.user.city!=null){this.page.city=this.user.city;}
          if(this.user.area!=''&&this.user.area!=null){this.page.area=this.user.area;}
          // if(this.user.town!=''&&this.user.town!=null){this.page.town=this.user.town;}
          // if(this.user.vill!=''&&this.user.vill!=null){this.page.vill=this.user.vill;}
          this.getProvince();     
          axios.get('/api/region/list',{region_high_code:''}).then((v) => {
            this.options11=v
          })
          axios.get('/api/company/department/list',{state:'1',pager_openset:'1000'}).then((v) => {that.options4=v.department_list }).catch(() => {})
          axios.get('/api/company/search', params).then((v) => {
             that.count=v;
        that.tableData=v.companyList;
         that.total = v.pager_count
      }).catch(() => {})
    },
    visibleChange(val){
      if(this.page.companytag_code===''&&val===true){
        this.$notify.error({title: '请选择主体类型',message: '',duration: 2000})
              return false
      }else{
        axios.get('/api/dictionary/search', {companytag_code:this.page.companytag_code}).then((v) => {
      this.options2=v.主体业态.食品经营许可
      }).catch(() => {})
      }
    },
      change(index,val){
        var that=this;
         if (val == null) val = '';
if(index==1){that.page.companytag_code=val;that.page.business_form='';that.options2=''}
if(index==2){that.page.state=val; }
if(index==3){that.page.department_code=val;}
if(index==4){that.page.business_state=val;}
if(index==5){that.page.business_form=val;}
if(index==6){that.page.search_time_bigen=val}
if(index==7){that.page.search_time_end=val}
if(index==8){that.page.business_type=val;}
if(index==11){
          if(val!=''){this.getProvince(val,'2')}
        this.options11.forEach(item=>{
         if(item.region_code==val){this.page.province=item.region_name;}
        })
        this.page.city='';
         this.page.area='';
          this.page.town='';
           this.page.vill='';
           this.options12=[];
           this.options13=[];
           this.options14=[];
           this.options15=[]
       }
        if(index==12){
          if(val!=''){this.getProvince(val,'3')}
        this.options12.forEach(item=>{
         if(item.region_code==val){this.page.city=item.region_name;}
        })
        this.page.area='';
         this.page.town='';
           this.page.vill='';
           this.options13=[];
           this.options14=[];
           this.options15=[]
        }
       if(index==13){
         if(val!=''){ this.getProvince(val,'4')}
        this.options13.forEach(item=>{
         if(item.region_code==val){this.page.area=item.region_name;}
        })
        this.page.town='';
         this.page.vill='';
          this.options14=[];
           this.options15=[]
       }
       if(index==14){
           if(val!=''){ this.getProvince(val,'5')}
        this.options14.forEach(item=>{
         if(item.region_code==val){this.page.town=item.region_name;}
        })
        this.page.vill='';
        this.options15=[]
        }
        if(index==15){
            this.options15.forEach(item=>{
          if(item.region_code==val){this.page.vill=item.region_name;}
          })
        }
 this.onSubmit()
    },
    // 搜索
     onSubmit () { 
        var that=this;
      that.currentPage = 1
      that.page.pager_offset = '0'
            if(this.page.search_time_end==null){this.page.search_time_end='';}
      if(this.page.search_time_bigen==null){this.page.search_time_bigen='';}
      that.$store.dispatch('record/setNewPage2', that.page)
      that.init(that.page)
    },
    // 分页
    currentChange(page){
        var that=this;
      that.currentPage = page;
      that.page.pager_offset = String((page - 1) * 10)
      that.$store.dispatch('record/setNewPage2', that.page)
      that.init(that.page)
    },
   godetail(index){
    this.$router.push({
        name: "RestaurantDetail",
        query: {
          id: index,
          id1:this.page.filing_state
        }
      });
  },
   addRole(index,index1){
    this.$router.push({
        name: "AddRole",
        query: {
          id: index,
          id1:index1
        }
      });
  },
  goUpdate(index){
    this.$router.push({
        name: "RecordUpdate",
        query: {
          id: index,
          code:'1001574645421581000000003'
        }
      });
  },
   goUpdateType(index){this.$router.push({name: "changeCompanytype",query: {id: index}});},
 addPower(val){ this.$router.push({name: "AddPower",query: {id: val}});},
  godetail1(index){
    this.$router.push({
        name: "RestaurantDetail",
        query: {
          id: index,
           id1:this.page.filing_state,
           id2:1
        }
      });
  },
  IsActive(k,val) {
      var that=this;
        this.activeClass = k;
           this.page.state=val;
        this.onSubmit()
      },
  setUnusefulTime(c_code,c_name) {
    this.formInline.unuseful_time='';
    this.c_name=c_name;
    this.formInline.company_code=c_code;
    this.timeVisible = true;
  },
  continueTime(formInline){    
    let paramas=this.formInline;
    this.$refs.formInline[0].validate((valid) => {
        if (valid) {
         axios.post('/api/company/continueTime', paramas).then((v) => {
          this.timeVisible = false;
      }).catch(() => {})
        }
    })
  },
  //导出
  DownExcel () { 
    this.loading=true;
    this.timer=setInterval(() => { this.check("export_company_search");}, 1000);
    this.currentPage = 1
    this.page.pager_offset = '0'
    this.page.pager_openset=String(this.total);
    if(this.page.search_time_end==null){this.page.search_time_end='';}
    if(this.page.search_time_bigen==null){this.page.search_time_bigen='';}
    let statename = '';
    if(this.page.state == '2'){
      statename = '（过期）';
    }else if(this.page.state == '3'){
      statename = '（注销）';
    }else if(this.page.state == '4'){
      statename = '（即将过期）';
    }else{
      statename = '（有效）';
    }
    if(this.activeName==1){this.page.down_name = '食品餐饮待审核备案信息'}else if(this.activeName==5){this.page.down_name = '食品餐饮黑名单备案信息'}else if(this.activeName==3){this.page.down_name = '食品餐饮已归档' + statename + '备案信息'}else if(this.activeName==4){this.page.down_name = '食品餐饮已驳回备案信息'}
    axios.fileget('/api/report/export_company_search', this.page).then((v) => {})
  },
  downDetailExcel(c_code,c_name) { 
    this.loading=true;
    this.timer=setInterval(() => { this.check("export_company_detail");}, 1000);
    let d_name = c_name + '';
    d_name+='备案信息(食品餐饮)';
    axios.fileget('/api/report/export_company_detail', {down_name:d_name ,company_code:c_code}).then((v) => {})
  },
  check(d_name){
    axios.get('/api/report/check',  {down_name:d_name}).then((v) => {
      if(v==true){
        clearInterval(this.timer);
        this.loading=false;
      }
    })
  },
  getProvince(val,index){
      let mythis = this
        axios.get('/api/region/list',{region_high_code:val,region_type:index}).then((v) => {
          if(index=='2'){
            mythis.options12=v;
          let city=mythis.page.city;

          if(city){
             mythis.options12.forEach(item=>{
               if(item.region_name==city){
                  mythis.getProvince(item.region_code,'3')
               }
             })
           }}
          else if(index=='3'){
            mythis.options13=v;
            let area=mythis.page.area
          if(area){
             mythis.options13.forEach(item=>{
               if(item.region_name==area){
                  mythis.getProvince(item.region_code,'4')
               }
             })
           }
          }
          else if(index=='4'){mythis.options14=v;
          let town=mythis.page.town
          if(town){
             mythis.options14.forEach(item=>{
               if(item.region_name==town){
                  mythis.getProvince(item.region_code,'5')
               }
             })
           }}
          else if(index=='5'){mythis.options15=v;}
          else{
            mythis.options11=v
            let province=mythis.page.province
           if(province){
             mythis.options11.forEach(item=>{
               if(item.region_name==province){
                  mythis.getProvince(item.region_code,'2')
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
