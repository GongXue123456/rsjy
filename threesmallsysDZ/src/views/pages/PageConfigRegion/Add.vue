<template>
  <el-container class="patroladd">
     
    <el-header class="box add bb">
        <h5 v-if="formInline.page_config_region_code" class="mb10"><span class="lines"></span>编辑管理员</h5>
         <h5 v-else class="mb10"><span class="lines"></span>添加管理员</h5>
        <div>
             <el-button  class=""  size="small" type="primary" @click="submitForm('formInline')">提交</el-button>
            <el-button  class="back_btn" size="small" plain @click="$router.back()">返回</el-button></div>
    </el-header>
    <el-main>
    <el-form :inline="true"  status-icon ref="formInline"  :model="formInline"  class="demo-ruleForm">
     <el-row class="box mt20  f14">
         <el-col :span="24" class="patroladd-title bgcfbe tl mb20 pl15">基础信息</el-col>
        <el-col :span="12" class="tl" :offset="1">
        <el-form-item label="绑定模板：" class="w" label-width="25%" prop="page_config_name" :rules="[{required: true,message: '请绑定模板', trigger: ['blur','change']}]">
          <el-input v-model="formInline.page_config_name" size="small" disabled>
            <el-button slot="append" icon="el-icon-search" @click="handleChooseCompany">请选择模板</el-button>
          </el-input>
        </el-form-item>
        </el-col>
        <el-col :span="22" class="tl" :offset="1">
            <el-row class="box   f14">
        <el-form-item  label="地域：" class="w" label-width="14%" size="small"  prop="province" :rules="[{required: true,message: '请选择地域', trigger: ['blur','change']}]">
          <el-col :span="4" class="tl">
          <el-select  v-model="formInline.province" clearable placeholder="请选择省级" @change="change(1,formInline.province)">
             <el-option v-for="group in options_province" :key="group.region_code" :label="group.region_name" :value="group.region_code"> </el-option>
          </el-select>
             </el-col>
          <el-col :span="4" class="tl ml10" >
          <el-select  v-model="formInline.city" clearable placeholder="请选择市级" @change="change(2,formInline.city)">
             <el-option v-for="group in options_city" :key="group.region_code" :label="group.region_name" :value="group.region_code"> </el-option>
          </el-select>
             </el-col>
            <el-col :span="4" class="tl ml10"  >
          <el-select  v-model="formInline.area" clearable placeholder="请选择区县" @change="change(3,formInline.area)">
             <el-option v-for="group in options_area" :key="group.region_code" :label="group.region_name" :value="group.region_code"> </el-option>
          </el-select>
             </el-col>  
             <el-col :span="4" class="tl ml10"  >
          <el-select  v-model="formInline.town" clearable placeholder="请选择乡镇" @change="change(4,formInline.town)">
             <el-option v-for="group in options_town" :key="group.region_code" :label="group.region_name" :value="group.region_code"> </el-option>
          </el-select>
             </el-col> 
              <el-col  :span="4" class="tl ml10"  >
          <el-select v-model="formInline.vill" clearable placeholder="请选择社区" @change="change(5,formInline.vill)"  @remove-tag="change(8,tag)">
             <el-option v-for="group in options_vill" :key="group.region_code" :label="group.region_name" :value="group.region_code"> </el-option>
          </el-select>
             </el-col>        
        </el-form-item>
            </el-row>
        </el-col>
         <el-col  :span="12" class="mr10" :offset="1" >
             <el-form-item v-if="page_module==1" size="small" class="w" label-width="25%" label="计算周期：" prop="calc_period" :rules="[{required: true,message: '请输入周期', trigger: 'blur'},{pattern:/^([0-9]|[1-9][0-9]|[1-2][0-9][0-9]|[3][0-5][0-9]|(360|361|363|362|364|365))$/,message: '请输入0到365之间整数',trigger: 'blur'}]">
         <el-input placeholder="请输入周期（0到365之间整数）" max="365" min="0" clearable v-model.number="formInline.calc_period" class="input-with-select">
            </el-input>
            </el-form-item>
             <el-form-item v-else size="small" class="w" label-width="25%" label="计算周期：" prop="calc_period" :rules="[{pattern:/^([0-9]|[1-9][0-9]|[1-2][0-9][0-9]|[3][0-5][0-9]|(360|361|363|362|364|365))$/,message: '请输入0到365之间整数',trigger: 'blur'}]">
         <el-input placeholder="请输入周期（0到365之间整数）" max="365" min="0" clearable v-model.number="formInline.calc_period" class="input-with-select">
            </el-input>
            </el-form-item>
        </el-col>
     </el-row>
        </el-form>
        <el-dialog title="企业列表" :visible.sync="dialogTableVisible" @close="onClose">
        <el-row class="box search mt20" :gutter="10">
           <el-form :inline="true" :model="page" class="demo-form-inline">
        <el-col :span="4" class="mr10">
             <el-form-item size="small" >
         <el-input placeholder="模板名称" clearable v-model="page.page_config_name" class="input-with-select">
            </el-input>
        </el-form-item>
        </el-col>
         <el-col :span="4" class="mr10">
         <el-form-item size="small">
          <el-select v-model="page.companytag_code" clearable placeholder="主体类型" @change="change1(page.companytag_code)">
              <el-option v-for="v in list_btn" :key="v.id" :label="v.title" :value="v.id"></el-option>
          </el-select>
        </el-form-item>
        </el-col>
         <el-col :span="4" class="mr10">
            <el-form-item size="small">
              <el-select v-model="page.state" clearable placeholder="全部" @change="change3(page.state)">
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
        <el-table border :data="companyData" style="width: 100%">
           <el-table-column label="选择" width="60" header-align="center" align="center">
            <template slot-scope="scope">
              <el-radio class="radio" v-model="selected" :label="scope.$index"></el-radio>
            </template>
          </el-table-column>
        <el-table-column type="index" align='center' width="60"  label="序号"></el-table-column>
        
         <el-table-column prop="page_config_name" min-width="120" :show-overflow-tooltip="true"  label="模板名称" align='center'></el-table-column>
         <el-table-column prop="companytag_code"  min-width="150" :show-overflow-tooltip="true"  label="主体类型" align='center' :formatter="userTypeList3" ></el-table-column>
          <el-table-column align="center" label="状态">
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.state | tagFilter"
              >{{scope.row.state | statusFilter}}</el-tag>
            </template>
          </el-table-column>
        <el-table-column   min-width="120" :show-overflow-tooltip="true" label="模板分类" align='center'>
            <template slot-scope="scope">
              <span v-if="scope.row.page_module=='1'" >诚信等级</span>
              <span v-else >信息公示</span>
        </template>
        </el-table-column>
        <el-table-column prop="add_time"  min-width="120" :show-overflow-tooltip="true" label="添加时间"  align='center'></el-table-column>
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
        <div slot="footer" class="dialog-footer" style="text-align:center;margin-top:50px">
          <el-button @click="dialogTableVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleConfirm()">确 定</el-button>
        </div>
      </el-dialog>
        </el-main>
  </el-container>
</template>
<script>
let obj;
import Vue from 'vue'
import axios from '../../../util/api'
import md5 from 'js-md5';
import { local,objKeySort,remove } from '../../../util/util'
export default {
  data () {
    return {
        formInline: {
          page_config_region_code:'',
         page_config_name:'',
         page_config_code:'',
        province:'',
         city:'',
         area:'',
          town:'',
         vill:'',
         calc_period:''
      },
      page: {
        pager_offset: '0',
        pager_openset:'10',
       companytype_code:'',
       companytag_code:'',
       page_config_name:'',
       state:'',
       owner_type:'1'
      },
      page_module:'',
      user:'',
      region_high_code:'',
      options_province:'',
      options_city:'',
      options_area:'',
      options_town:'',
      options_vill:'',
       dialogTableVisible: false,
       companyData: [],
        currentPage: 1,
      total: 0,
      selected: "",
      companyListLoading: false,
      list_btn:[{id:'1001574645421581111111101',title: '四川省小作坊备案证'},{id:'1001574645421581111111102',title: '四川省小经营店备案证（流通）'},{id:'1001574645421581111111103',title: '食品经营许可（餐饮）'},{id:'1001574645421581111111104',title: '四川省小经营店备案证（餐饮）'},{title: '食品经营许可证（流通）',id:'1001574645421581111111105'}],
        options: [{title: '全部',code: '1'}, {title: '自己管理',code: '2'}],
       statusOptions: [
        { label: "全部", value: "" },
        { label: "启用", value: "1" },
        { label: "禁用", value: "2" }
      ],
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
  },
     created () {
         this.user = local.get('user');
         this.formInline.page_config_region_code=this.$route.query.id;
     this.init()

  },
  methods: {
      init (params) {
       if(this.formInline.page_config_region_code){
           axios.get('/api/pageConfigRegion/single', {page_config_region_code:this.formInline.page_config_region_code}).then((v) => {
       this.formInline=v.page_config_region
      if(v.city!=null){this.formInline.city=v.city;}
      if(v.area!=null){this.formInline.area=v.area;}
      if(v.town!=null){this.formInline.town=v.town;}
      if(v.vill!=null){this.formInline.vill=a.vill;}
      this.getProvince();
     })
 
       }else{
      if(this.user.province!=''&&this.user.province!=null){this.formInline.province=this.user.province;}
      if(this.user.city!=''&&this.user.city!=null){this.formInline.city=this.user.city;}
      if(this.user.area!=''&&this.user.area!=null){this.formInline.area=this.user.area;}
      if(this.user.town!=''&&this.user.town!=null){this.formInline.town=this.user.town;}
      if(this.user.vill!=''&&this.user.vill!=null){this.formInline.vill=this.user.vill;}

      this.getProvince();
       }

    },
     handleChooseCompany() {
      this.dialogTableVisible = true;
      this.initCompany(this.page);
    },
     initCompany(params) {
      this.companyListLoading = true;
      axios.get("/api/pageConfig/list", params).then(response => {
        this.companyData = response.page_config_list;
        this.total = response.pager_count;
        this.companyListLoading = false;
      });
    },
      userTypeList3(row){
       if(row.companytag_code=='1001574645421581111111103'){return '食品经营许可（餐饮）';}else if(row.companytag_code=='1001574645421581111111104'){return '四川省小经营店备案证（餐饮）';}else if(row.companytag_code=='1001574645421581111111101'){return '四川省小作坊备案证';}else if(row.companytag_code=='1001574645421581111111102'){return '四川省小经营店备案证（流通）';}else if(row.companytag_code=='1001574645421581111111105'){return '食品经营许可证（流通）';}
    },
     change3(val) {this.page.state=val;this.onSubmit();},
    change1(val){this.page.companytag_code=val;this.onSubmit();},
        change2(val){if(val==''||val==null){val='1'}this.page.owner_type=val;this.onSubmit();},
     // 搜索
     onSubmit () { 
      this.currentPage = 1
      this.page.pager_offset = '0'
      this.initCompany(this.page);
    },
    // 分页
    currentChange(page){
      this.currentPage = page;
      this.page.pager_offset = String((page - 1) * 10)
      this.initCompany(this.page);
    },
        onClose() {
      this.$refs["formInline"].validateField("page_config_name");
    },
    handleConfirm() {
      let item = this.companyData[this.selected];
      this.formInline.page_config_code = item.page_config_code;
      this.formInline.page_config_name = item.page_config_name;
      this.page_module=item.page_module;
      this.dialogTableVisible = false;
    },
    change(index,val){
      if(index==1){
        this.getProvince(val,'2')
        this.options_province.forEach(item=>{
         if(item.region_code==val){this.formInline.province=item.region_name;}
        })
        this.formInline.city='';
         this.formInline.area='';
          this.formInline.town='';
           this.formInline.vill=''
      }
      if(index==2){
        this.getProvince(val,'3')
        this.options_city.forEach(item=>{
         if(item.region_code==val){this.formInline.city=item.region_name;}
        })
        this.formInline.area='';
         this.formInline.town='';
           this.formInline.vill=''
      }
      if(index==3){
        this.getProvince(val,'4')
        this.options_area.forEach(item=>{
         if(item.region_code==val){this.formInline.area=item.region_name;}
        })
        this.formInline.town='';
         this.formInline.vill=''
      }
      if(index==4){
        this.getProvince(val,'5')
        this.options_town.forEach(item=>{
         if(item.region_code==val){this.formInline.town=item.region_name;}
        })
        this.formInline.vill=''
      }
      if(index==5){
        this.options_vill.forEach(item=>{
         if(item.region_code==val){this.formInline.vill=item.region_name;}
        })
      }
     },
     submitForm(formInline){
          let paramas=this.formInline;
         this.$refs[formInline].validate((valid) => {
        if (valid) {
            if(this.formInline.page_config_region_code){
              axios.put('/api/pageConfigRegion/update', paramas).then((v) => {
                this.$router.back()
              })
            }else{
              axios.post('/api/pageConfigRegion/save', paramas).then((v) => {
                this.$router.back()
              })
            }       
        }
         })
      },
       getProvince(val,index){
        axios.get('/api/region/list',{region_high_code:val,region_type:index}).then((v) => {
          if(index=='2'){this.options_city=v;
          let city=this.formInline.city
          if(city){
             this.options_city.forEach(item=>{
               if(item.region_name==city){
                  this.getProvince(item.region_code,'3')
               }
             })
           }}
          else if(index=='3'){
            this.options_area=v;
            let area=this.formInline.area
          if(area){
             this.options_area.forEach(item=>{
               if(item.region_name==area){
                  this.getProvince(item.region_code,'4')
               }
             })
           }
          }
          else if(index=='4'){this.options_town=v;
          let town=this.formInline.town
          if(town){
             this.options_town.forEach(item=>{
               if(item.region_name==town){
                  this.getProvince(item.region_code,'5')
               }
             })
           }}
          else if(index=='5'){this.options_vill=v;}
          else{this.options_province=v
            let province=this.formInline.province
           if(province){
             this.options_province.forEach(item=>{
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
.patroladd{
  overflow-x: hidden;
  .add{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .el-image{width: 160px; height: 160px;margin-right: 10px}
  .back_btn{background:rgba(247,248,249,1);border:1px solid rgba(217,222,225,1);}
  .patroladd-title{height: 34px;line-height: 34px;border-left: 2px solid #788287}
  /deep/ .el-form--inline .el-col-12 .el-form-item__content{width: 75%}
  /deep/ .el-radio__label {
    display: none !important;
  }
  /deep/ .el-dialog__body {
    padding-top: 5px;
    padding-bottom: 10px;
  }
  /deep/ .el-input.is-disabled .el-input__inner {
    background-color: #ffffff;
    border-color: #e4e7ed;
    color: #606266;
    cursor: not-allowed;
  }
  /deep/ .el-dialog {
    width: 60% !important;
  }
}

</style>
