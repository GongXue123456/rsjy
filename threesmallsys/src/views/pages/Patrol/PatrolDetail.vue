<template>
  <el-container class="patroldetail container">
    <el-header class="box add bb">
        <h5 class="mb10"><span class="lines"></span>档案管理</h5>
        <div><el-button  class="back_btn" size="small" plain @click="$router.back()">返回</el-button></div>
    </el-header>
    <el-main class="p15 pt0">
    <div class="box mt20 mb20 f16">
        <div class="tl c333" >{{list.company_name}}</div>
     </div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
   <el-tab-pane label="基本信息" name="first">
        <el-row class="box mt20 f14">
           <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">主体类型：</span><span v-if="list.companytag_code=='1001574645421581111111101'" class="c333">四川省小作坊备案证</span><span v-else-if="list.companytag_code=='1001574645421581111111102'" class="c333">四川省小经营店备案证（流通）</span><span v-else-if="list.companytag_code=='1001574645421581111111103'" class="c333">食品经营许可证（餐饮）</span><span v-else-if="list.companytag_code=='1001574645421581111111104'" class="c333">四川省小经营店备案证（餐饮）</span>
          <span v-else-if="list.companytag_code=='1001574645421581111111105'" class="c333">食品经营许可证（流通）</span>
        </el-col>
         <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">主体业态：</span><span class="c333">{{list.business_form}}</span>
        </el-col>
      </el-row>
        <el-row class="box mt20  f14 c666">
         <el-col :span="24" class="patroldetail-title bgcfbe tl mb20 pl15">基础信息</el-col>
          <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">小作坊名称：</span><span class="c333">{{list.company_name}}</span>
        </el-col>
         <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">经营者姓名：</span><span class="c333">{{list.operator}}</span>
        </el-col>
        <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">手机号：</span><span class="c333">{{list.mobilephone}}</span>
        </el-col>
        <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">身份证号：</span><span class="c333">{{list.idcard}}</span>
        </el-col>
        <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">备案时间：</span><span class="c333">{{list.record_time}}</span>
        </el-col>
     </el-row>
     <el-row class="box mt20  f14 c666">
         <el-col :span="24" class="patroldetail-title bgcfbe tl mb20 pl15">经营信息</el-col>
        
        <el-col v-if="list.companytag_code=='1001574645421581111111103'" :span="9" class="tl mb20" :offset="1">
          <span class="left">社会信用代码：</span><span class="c333">{{list.credit_code}}</span>
        </el-col>
        <el-col v-if="list.companytag_code=='1001574645421581111111103'" :span="9" class="tl mb20" :offset="1">
          <span class="left">食品经营许可证号：</span><span class="c333">{{list.record_code}}</span>
        </el-col>
        <el-col v-else :span="9" class="tl mb20" :offset="1">
          <span class="left">备案证号：</span><span class="c333">{{list.record_code}}</span>
        </el-col>
        <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">发证日期：</span><span class="c333">{{list.issue_time}}</span>
        </el-col>
          <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">有效期至：</span><span class="c333">{{list.unuseful_time}}</span>
        </el-col>
         <el-col :span="22" class="tl mb20" :offset="1">
          <span class="left">经营场所：</span><span class="c333">{{list.province}}&nbsp;&nbsp;{{list.city}}&nbsp;&nbsp;{{list.area}}&nbsp;&nbsp;{{list.town}}&nbsp;&nbsp;{{list.vill}}</span>
        </el-col>
         <el-col  v-if="list.companytag_code=='1001574645421581111111101'" :span="22" class="tl mb20" :offset="1">
          <span class="left">加工形式：</span><span class="c333">{{list.produce_form}}</span>
        </el-col>
         <el-col  v-if="list.companytag_code=='1001574645421581111111101'" :span="22" class="tl mb20" :offset="1">
          <span class="left">加工类别：</span><span class="c333">{{list.producetype_codes}}</span>
        </el-col>
         <el-col v-if="list.companytag_code=='1001574645421581111111103'" :span="22" class="tl mb20" :offset="1">
          <span class="left">经营范围：</span><span class="c333">{{list.business_range}}</span>
         </el-col>
         <el-col v-if="list.companytag_code=='1001574645421581111111104'||list.companytag_code=='1001574645421581111111102'" :span="22" class="tl mb20" :offset="1">
          <span class="left">主营项目：</span><span class="c333">{{list.main_subject}}</span>
        </el-col>
        <el-col v-if="list.companytag_code=='1001574645421581111111104'||list.companytag_code=='1001574645421581111111102'" :span="22" class="tl mb20" :offset="1">
          <span class="left">兼营项目：</span><span class="c333">{{list.sub_subject}}</span>
        </el-col>
         
         <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">面积：</span><span class="c333">{{list.place_area}}</span>（㎡）
        </el-col>
          <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">从业人数：</span><span class="c333">{{list.employ_num}}</span>
        </el-col>
     </el-row>
     <el-row class="box mt20  f14 c666">
         <el-col :span="24" class="patroldetail-title bgcfbe tl mb20 pl15">人员信息</el-col>
         <div class="box list">
      <el-table :data="list.companyEmployReturnList" style="width: 100%" class="no-header">
        <el-table-column label="姓名" prop="employ_name" ></el-table-column>
        <el-table-column label="健康证明">
           <template slot-scope="scope"> 
           <el-image :src="user.qyurl+scope.row.employ_health_url" fit="fill"  :preview-src-list="[user.qyurl+scope.row.employ_health_url]"  style="width: 40px;height: 40px"></el-image>
             </template>
        </el-table-column>
        <el-table-column label="健康证有效期" prop="user_health_datedue"></el-table-column>
      </el-table>
    </div> 
     </el-row>
    <el-row class="box mt20  f14 c666">
         <el-col :span="24" class="patroldetail-title bgcfbe tl mb20 pl15">责任落实</el-col>
          <el-col :span="9" class="tl" :offset="1">
           <el-col :span="24" class="tl mb20" >
             <span class="left" style="width: 34%;">监管部门：</span><span class="c333">{{list.department_name}}</span>
           </el-col>
         </el-col>
           <el-col :span="9" class="tl" :offset="1">
           <el-col :span="24" class="tl mb20" >
            <span class="left" style="width: 34%;">所属村：</span><span class="c333">{{list.region_name}}</span>
           </el-col>
         </el-col>
         <el-col :span="9" class="tl" :offset="1">
           <el-col v-for="(item,index) in list.user_name_manage_list" :key="index" :span="24" class="tl mb20" >
            <span class="left" style="width: 34%;">监管人员{{index+1}}：</span><span class="c333">{{item}}</span>
           </el-col>
         </el-col>
          <el-col :span="9" class="tl" :offset="1">
           <el-col v-for="(item,index) in list.user_moblephone_manage_list" :key="index" :span="24" class="tl mb20" >
            <span class="left" style="width: 34%;">联系方式：</span><span class="c333">{{item}}</span>
           </el-col>
         </el-col>
          <el-col :span="9" class="tl" :offset="1">
           <el-col v-for="(item,index) in list.user_name_info_list" :key="index" :span="24" class="tl mb20" >
            <span class="left" style="width: 34%;">网格信息员{{index+1}}：</span><span class="c333">{{item}}</span>
           </el-col>
         </el-col>
          <el-col :span="9" class="tl" :offset="1">
           <el-col v-for="(item,index) in list.user_moblephone_info_list" :key="index" :span="24" class="tl mb20" >
            <span class="left" style="width: 34%;">联系方式：</span><span class="c333">{{item}}</span>
           </el-col>
         </el-col>
  
     </el-row>
      <el-row class="box mt20  f14">
      <el-col :span="24" class="patroldetail-title bgcfbe tl mb20 pl15">附件上传</el-col>
      <el-col :span="24" class="tl">
         <div class="block fl" v-for="(fit,index) in list.accessoryReturnList" :key="index">
    <el-image  v-if="fit.url"
      :src="user.qyurl+fit.url"
      :preview-src-list="[user.qyurl+fit.url]"
      :fit="fit.name"></el-image>
       <el-image v-else
      :src="require('../../../assets/image/moren.png')"
      ></el-image>
      <p class="demonstration tc p15">{{ fit.name }}</p>
  </div>
      </el-col>
     </el-row>
    </el-tab-pane>
    <el-tab-pane label="巡查记录" name="second">
       <el-row class="box search">
       <el-form :inline="true" :model="formInline" class="demo-form-inline">
         <el-col :span="4" class="mr10">
             <el-form-item size="small" >
         <el-input placeholder="巡查人姓名" clearable @clear='onSubmit' v-model="formInline.patrol_user_name" class="input-with-select">
         </el-input>
        </el-form-item>
        </el-col>
         <el-col :span="4" class="mr10">
           <el-form-item size="small">
          <el-select v-model="formInline.patrol_result" clearable placeholder="最近巡查结果" @change="change(1,formInline.patrol_result)">
            <el-option v-for="v in list_btn3" :key="v.title" :label="v.title" :value="v.title"></el-option>
          </el-select>
        </el-form-item>
        </el-col>
        
        <el-col :span="8" class="mr10">
          <el-form-item size="small">
            <el-col class="line" :span="11">
            <el-date-picker type="date" placeholder="巡查开始日期" v-model="formInline.search_time_bigen" style="width: 100%;" :picker-options="pickerOptionsStart" format="yyyy-MM-dd" value-format="yyyy-MM-dd" @change="change(3,formInline.search_time_bigen)"></el-date-picker>
           </el-col>
            <el-col class="line" :span="2">至</el-col>
           <el-col class="line" :span="11">
            <el-date-picker type="date" placeholder="巡查结束日期" v-model="formInline.search_time_end" style="width: 100%;" format="yyyy-MM-dd" :picker-options="pickerOptionsEnd" value-format="yyyy-MM-dd" @change="change(4,formInline.search_time_end)"></el-date-picker>
           </el-col>
        </el-form-item>
        </el-col> 
        <el-col :span="2" class="tl">
           <el-form-item  size="small">
          <el-button  type="primary"  @click="onSubmit" class="general_bgc general_border cfff">查询</el-button>
        </el-form-item>
        </el-col>
        <el-col class="fr  tr" :span="3"><el-button type="primary" size="small" @click="PatroleAdd">新增巡查</el-button></el-col>
      </el-form>
    </el-row>
    <div class="box list">
      <el-table border :data="list1" style="width: 100%">
        <el-table-column type="index" align='center' width="80" label="序号"></el-table-column>
         <el-table-column prop="work_order" min-width="120" :show-overflow-tooltip="true" label="工单号" align='center' ></el-table-column>
        <el-table-column prop="patrol_user_name" min-width="120" :show-overflow-tooltip="true" align='center' label="巡查人"></el-table-column>
        <el-table-column min-width="120" :show-overflow-tooltip="true" align='center' label="巡查结果">
          <template slot-scope="scope">
              <span v-if="scope.row.patrol_result=='不合格'" class="red">不合格</span>
              <span v-else-if="scope.row.patrol_result=='合格'">合格</span>
               <span v-else>---</span>
        </template>
        </el-table-column>
        <el-table-column label="处理方式" min-width="120" align='center' :show-overflow-tooltip='true'>
         <template slot-scope="scope"  >
          <div :class="scope.row.dispose_name?'danger':''">{{ scope.row.dispose_name==''?'无':scope.row.dispose_name}}</div>
        </template>
        </el-table-column>
        <el-table-column prop="patrol_time" min-width="120" :show-overflow-tooltip="true" align='center' label="巡查时间"></el-table-column>
        <el-table-column  label="处罚方式"  min-width="120" align='center' :show-overflow-tooltip='true'>
          <template slot-scope="scope">
           <div :class="scope.row.dispose_name?'danger':''">{{ scope.row.punish_name==''?'无':scope.row.punish_name}}</div>
        </template>
        </el-table-column>
        <el-table-column label="操作" width="80" fixed="right" align='center'>
          <template slot-scope="scope">
           <el-button type="text" class="general_color" size="small" @click="godetail(list.company_name,scope.row.patrol_code)" >详情</el-button>
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
    <!-- 
      -->
  </el-container>
</template>
<script>
import axios from '../../../util/api'
import { local } from '../../../util/util'
export default {
  data () {
    return {
      page: {
       company_code:'',
      },
      activeName: '',
       list: [],
       list1: [],
       region_code:'',
      formInline: {
          pager_offset:'0',
         company_code:'',
        patrol_result:'',
        business_form:'',
        patrol_user_name:'',
        department_code:'',
        search_time_bigen:'',
        search_time_end:'',
      },
       currentPage: 1,
      total: 0,
      list_btn3:[{id:'1',title: '合格'},{id:'2',title: '不合格'}],
      user:'',
      pickerOptionsStart: {
        disabledDate: time => {
          if (this.formInline.search_time_end) {
            return time.getTime() > new Date(this.formInline.search_time_end).getTime()
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
     this.page.company_code=this.$route.query.id;
     this.formInline.company_code=this.$route.query.id;
     this.activeName=this.$route.query.active
     this.init(this.page)
     this.init1(this.formInline)
  },
  methods: {
       init (params) {
      axios.get('/api/company/detail', params).then((v) => {
       this.list=v
       this.region_code=v.region_code
      })
    },
     init1 (params) {
       axios.get('/api/patrol/search', params).then((v) => {
       this.list1=v.pager_list;
        this.total = v.pager_count
      })
    },
     change(index,val){
     if(index==1){this.formInline.patrol_result=val;}
if(index==3){this.formInline.search_time_bigen=val;}
if(index==4){this.formInline.search_time_end=val;}
this.onSubmit()
    },
     handleClick() {},
      PatroleAdd(){
     this.$router.push({
        name: "PatrolAdd",
        query: {
          id:this.page.company_code,
           id1:1,
          name:this.list.company_name,
           tag:this.region_code
        }
      });
  },
   godetail(index,index1){
    this.$router.push({
        name: "AddDetail",
        query: {
          name:index,
          code: index1,
          tag:this.region_code
        }
      });
  },
    // 搜索
     onSubmit () { 
      this.currentPage = 1
      this.formInline.pager_offset = '0'
        if(this.formInline.search_time_end==null){this.formInline.search_time_end='';}
      if(this.formInline.search_time_bigen==null){this.formInline.search_time_bigen='';}
      this.init1(this.formInline)
    },
    // 分页
    currentChange(page){
      this.currentPage = page;
      this.formInline.pager_offset = String((page - 1) * 10)
       this.init1(this.formInline)
    },
  }
}
</script>
<style lang="scss" scoped>
.patroldetail{
  overflow-x: hidden;
  .add{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .el-image{width: 160px; height: 160px;margin-right: 10px}
  .back_btn{background:rgba(247,248,249,1);border:1px solid rgba(217,222,225,1);}
  .patroldetail-title{height: 34px;line-height: 34px;border-left: 2px solid #788287}

}

</style>
