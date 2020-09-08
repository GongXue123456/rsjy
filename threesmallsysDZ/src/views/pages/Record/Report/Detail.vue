<template>
  <el-container class="patroldetail container">
    <el-header class="box add bb">
        <h5 class="mb10"><span class="lines"></span>报备管理详情</h5>
        <div>
            <el-button type="primary" v-if="loading==false" size="small" @click="downDetailExcel">导出报备表</el-button>
      <el-button  v-else-if="loading==true" type="info" disabled size="small" >导出报备表</el-button>
       <el-button v-if="loading1==false&&(list.report_state==4||list.report_state==5)" type="primary"  size="small" @click="downDetailExcel1">导出检查表</el-button>
      <el-button  v-else-if="loading1==true&&(list.report_state==4||list.report_state==5)" type="info" disabled size="small" >导出检查表</el-button>
            <el-button  class="back_btn" size="small" plain @click="$router.back()">返回</el-button></div>
    </el-header>
    <el-main class="p15 mt20 pt0  pr">
        <div class="box title mt20 mb20 f16">
             <img class="type_img" v-if="list.report_state==1&&list.report_timeout_state==1" src="../../../../assets/image/shenhe.png">
         <img class="type_img" v-if="(list.report_state==1&&list.report_timeout_state==2)||(list.report_state==3&&list.report_timeout_state==2)"  src="../../../../assets/image/guoqi.png">
         <img class="type_img" v-if="list.report_state==2"  src="../../../../assets/image/shixiao.png">
          <img class="type_img" v-if="list.report_state==3&&list.report_timeout_state==1"  src="../../../../assets/image/daijiancha.png">
          <img class="type_img" v-if="list.report_state==4"  src="../../../../assets/image/hege.png">
          <img class="type_img" v-if="list.report_state==5"  src="../../../../assets/image/buhege.png">
            
     </div>
        <el-row class="box mt20  f14 c666">
         <el-col :span="24" class="patroldetail-title bgcfbe tl mb20 pl15">举办者信息</el-col>
          <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">举办者：</span><span class="c333">{{list.user_name_conduct}}</span>
        </el-col>
         <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">联系电话：</span><span class="c333">{{list.user_mobilephone_conduct}}</span>
        </el-col>
     </el-row>
     <el-row class="box mt20  f14 c666">
         <el-col :span="24" class="patroldetail-title bgcfbe tl mb20 pl15">厨师信息</el-col>
        <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">主厨姓名：</span><span class="c333">{{list.user_name_mainchef}}</span>
        </el-col>
          <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">联系电话：</span><span class="c333">{{list.user_mobilephone_mainchef}}</span>
        </el-col>
         <el-col :span="22" class="tl mb20" :offset="1">
          <span class="left">帮厨人数({{reportSubChefCount}})人：</span>
          <span class="mr20" v-for="(item,index) in list1" :key="index">{{item.user_name_subchef}}&nbsp;&nbsp;<el-image v-if="item.user_health_logo_subchef!=''"
    style="width:60px; height: 20px;vertical-align: bottom;"
    :src="url" 
    :preview-src-list="[user.qyurl+item.user_health_logo_subchef]">
  </el-image></span>
        </el-col>
     </el-row>
     <el-row class="box mt20  f14 c666">
         <el-col :span="24" class="patroldetail-title bgcfbe tl mb20 pl15">办宴信息</el-col>
          <el-col :span="22" class="tl mb20" :offset="1">
          <span class="left">办宴地址：</span><span class="c333">{{list.province_conduct}}{{list.city_conduct}}{{list.area_conduct}}{{list.town_conduct}}{{list.vill_conduct}}{{list.address_conduct}}</span>
        </el-col>
          <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">办宴时间：</span><span class="c333">{{list.banquet_time}}</span>
        </el-col>
         <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">办宴天数：</span><span class="c333">{{list.banquet_day}}</span>
        </el-col>
         <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">就餐人数：</span><span class="c333">{{list.banquet_people}}</span>
        </el-col>
         <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">办宴类型：</span><span v-if="list.banquet_type==1" class="c333">红事</span><span v-else-if="list.banquet_type==2" class="c333">白事</span><span v-else-if="list.banquet_type==3" class="c333">生日</span><span v-else-if="list.banquet_type==4" class="c333">状元</span><span v-else-if="list.banquet_type==5" class="c333">乔迁</span><span v-else-if="list.banquet_type==6" class="c333">其他</span>
        </el-col>
     </el-row>
    <el-row class="box mt20  f14 c666">
         <el-col :span="24" class="patroldetail-title bgcfbe tl mb20 pl15">加工场地信息</el-col>
         <el-col :span="9" class="tl mb20" :offset="1">
            <span class="left">使用水源：</span><span class="c333">{{list.water_source}}</span>
         </el-col>
         <el-col :span="9" class="tl mb20" :offset="1">
            <span class="left">餐具消毒方式：</span><span class="c333">{{list.tablewater_disinfect}}</span>
         </el-col>
         <el-col :span="9" class="tl mb20" :offset="1">
            <span class="left">留样设施：</span><span v-if="list.reservedsample_state==1" class="c333">有</span><span v-else-if="list.reservedsample_state==2" class="c333">无</span>
         </el-col>
         <el-col :span="9" class="tl mb20" :offset="1">
            <span class="left">有无贮存或使用有毒有害物品：</span><span v-if="list.narcotics_state==1" class="c333">有</span><span v-else-if="list.narcotics_state==2" class="c333">无</span>
         </el-col>
         <el-col :span="9" class="tl mb20" :offset="1">
            <span class="left">餐具保洁柜数量：</span><span class="c333">{{list.cleancontainer_count}}</span>
         </el-col>
         <el-col :span="9" class="tl mb20" :offset="1">
            <span class="left">冰箱数量：</span><span class="c333">{{list.refrigerator_count}}</span>
         </el-col>
         <el-col :span="9" class="tl mb20" :offset="1">
            <span class="left">专用消毒柜数量：</span><span class="c333">{{list.disinfectioncabinet_count}}</span>
         </el-col>
         <el-col :span="9" class="tl mb20" :offset="1">
            <span class="left">食品留样柜数量：</span><span class="c333">{{list.reservedsample_count}}</span>
         </el-col>
          <el-col :span="9" class="tl mb20" :offset="1">
            <span class="left">带盖垃圾桶数量：</span><span class="c333">{{list.garbage_count}}</span>
         </el-col>
         <el-col :span="9" class="tl mb20" :offset="1">
            <span class="left">防鼠、防蝇、防尘设施数量：</span><span class="c333">{{list.ratproof_count}}</span>
         </el-col>
     </el-row>
     <el-row v-if="list.report_state!=1&&id!=2" class="box mt20  f14 c666">
         <el-col :span="24" class="patroldetail-title bgcfbe tl mb20 pl15">审核信息</el-col>
         <el-col :span="9" class="tl mb20" :offset="1">
            <span class="left">审核人员：</span><span class="c333">{{list.user_name_qualified}}</span>
         </el-col>
         <el-col :span="9" class="tl mb20" :offset="1">
            <span class="left">审核时间：</span><span class="c333">{{list.qualified_time}}</span>
         </el-col>
         <el-col v-if="list.report_state==2" :span="9" class="tl mb20" :offset="1">
            <span class="left">无效原因：</span><span class="c333">{{list.invalid_reason}}</span>
         </el-col>
     </el-row>
     <el-row v-if="list.report_state==1||list.report_state==4||list.report_state==5" class="box mt20  f14 c666">
         <el-col :span="24" class="patroldetail-title bgcfbe tl mb20 pl15">检查信息</el-col>
         <el-col :span="9" class="tl mb20" :offset="1">
            <span class="left">检查人员：</span><span class="c333">{{list.user_name_check}}</span>
         </el-col>
         <el-col :span="9" class="tl mb20" :offset="1">
            <span class="left">检查时间：</span><span class="c333">{{list.check_time}}</span>
         </el-col>
         <el-col :span="9" class="tl mb20" :offset="1">
            <span class="left">主厨个人卫生：</span><span v-if="this.list2!=null&&list2.check_mainchef_health==1" class="c333">合格</span><span v-else-if="this.list2!=null&&list2.check_mainchef_health==2" class="c333">不合格</span>
         </el-col>
         <el-col :span="9" class="tl mb20" :offset="1">
            <span class="left">帮厨个人卫生：</span><span v-if="this.list2!=null&&list2.check_subchef_health==1" class="c333">合格</span><span v-else-if="this.list2!=null&&list2.check_subchef_health==2" class="c333">不合格</span>
         </el-col>
          <el-col :span="9" class="tl mb20" :offset="1">
            <span class="left">办宴场所：</span><span v-if="this.list2!=null&&list2.check_place_standard==1" class="c333">合格</span><span v-else-if="this.list2!=null&&list2.check_place_standard==2" class="c333">不合格</span>
         </el-col>
         <el-col :span="9" class="tl mb20" :offset="1">
            <span class="left">加工场地：</span><span v-if="this.list2!=null&&list2.check_process_standard==1" class="c333">合格</span><span v-else-if="this.list2!=null&&list2.check_process_standard==2" class="c333">不合格</span>
         </el-col>
         <el-col :span="9" class="tl mb20" :offset="1">
            <span class="left">食品存储：</span><span v-if="this.list2!=null&&list2.check_store==1" class="c333">合格</span><span v-else-if="this.list2!=null&&list2.check_store==2" class="c333">不合格</span>
         </el-col>
         <el-col :span="9" class="tl mb20" :offset="1">
            <span class="left">餐具消毒：</span><span v-if="this.list2!=null&&list2.check_disinfection==1" class="c333">合格</span><span v-else-if="this.list2!=null&&list2.check_disinfection==2" class="c333">不合格</span>
         </el-col>
         <el-col :span="9" class="tl mb20" :offset="1">
            <span class="left">饮用水：</span><span v-if="this.list2!=null&&list2.check_water==1" class="c333">合格</span><span v-else-if="this.list2!=null&&list2.check_water==2" class="c333">不合格</span>
         </el-col>
          <el-col :span="9" class="tl mb20" :offset="1">
            <span class="left">食品留样：</span><span v-if="this.list2!=null&&list2.check_reserved_sample==1" class="c333">合格</span><span v-else-if="this.list2!=null&&list2.check_reserved_sample==2" class="c333">不合格</span>
         </el-col>
         <el-col :span="9" class="tl mb20" :offset="1">
            <span class="left">禁用食材：</span><span v-if="this.list2!=null&&list2.check_forbidden_food==1" class="c333">合格</span><span v-else-if="this.list2!=null&&list2.check_forbidden_food==2" class="c333">不合格</span>
         </el-col>
         <el-col :span="9" class="tl mb20" :offset="1">
            <span class="left">食品发票：</span><span v-if="this.list2!=null&&list2.check_invoice==1" class="c333">合格</span><span v-else-if="this.list2!=null&&list2.check_invoice==2" class="c333">不合格</span>
         </el-col>
         <el-col :span="9" class="tl mb20" :offset="1">
            <span class="left">有毒有害物质：</span><span v-if="this.list2!=null&&list2.check_poison==1" class="c333">合格</span><span v-else-if="this.list2!=null&&list2.check_poison==2" class="c333">不合格</span>
         </el-col>
          <el-col :span="9" class="tl mb20" :offset="1">
            <span class="left">风险点：</span><span v-if="this.list2!=null" class="c333">{{list2.check_risk}}</span><span v-else class="c333">无</span>
         </el-col>
         <el-col :span="9" class="tl mb20" :offset="1">
            <span class="left">风险点整改情况：</span><span v-if="this.list2!=null" class="c333">{{list2.check_risk_suggestion}}</span><span v-else class="c333">无</span>
         </el-col>
     </el-row>
     <el-row v-if="list.report_state==3&&list.report_timeout_state==1" class="box mt20  f14 c666">
         <el-col :span="24" class="patroldetail-title bgcfbe tl mb20 pl15">检查信息</el-col>
         <el-col :span="9" class="tl mb20" :offset="1">
            <span class="left">主厨个人卫生：</span><el-switch v-model="formInline.report_check.check_mainchef_health" active-text="合格" active-value='1' inactive-value='2' inactive-text="不合格"></el-switch>
         </el-col>
         <el-col :span="9" class="tl mb20" :offset="1">
            <span class="left">帮厨个人卫生：</span><el-switch v-model="formInline.report_check.check_subchef_health" active-text="合格" inactive-text="不合格" active-value='1' inactive-value='2'></el-switch>
         </el-col>
          <el-col :span="9" class="tl mb20" :offset="1">
            <span class="left">办宴场所：</span><el-switch v-model="formInline.report_check.check_place_standard" active-text="合格" inactive-text="不合格" active-value='1' inactive-value='2'></el-switch>
         </el-col>
         <el-col :span="9" class="tl mb20" :offset="1">
            <span class="left">加工场地：</span><el-switch v-model="formInline.report_check.check_process_standard" active-text="合格" inactive-text="不合格" active-value='1' inactive-value='2'></el-switch>
         </el-col>
         <el-col :span="9" class="tl mb20" :offset="1">
            <span class="left">食品存储：</span><el-switch v-model="formInline.report_check.check_store" active-text="合格" inactive-text="不合格" active-value='1' inactive-value='2'></el-switch>
         </el-col>
         <el-col :span="9" class="tl mb20" :offset="1">
            <span class="left">餐具消毒：</span><el-switch v-model="formInline.report_check.check_disinfection" active-text="合格" inactive-text="不合格" active-value='1' inactive-value='2'></el-switch>
         </el-col>
         <el-col :span="9" class="tl mb20" :offset="1">
            <span class="left">饮用水：</span><el-switch v-model="formInline.report_check.check_water" active-text="合格" inactive-text="不合格" active-value='1' inactive-value='2'></el-switch>
         </el-col>
          <el-col :span="9" class="tl mb20" :offset="1">
            <span class="left">食品留样：</span><el-switch v-model="formInline.report_check.check_reserved_sample" active-text="合格" inactive-text="不合格" active-value='1' inactive-value='2'></el-switch>
         </el-col>
         <el-col :span="9" class="tl mb20" :offset="1">
            <span class="left">禁用食材：</span><el-switch v-model="formInline.report_check.check_forbidden_food" active-text="合格" inactive-text="不合格" active-value='1' inactive-value='2'></el-switch>
         </el-col>
         <el-col :span="9" class="tl mb20" :offset="1">
            <span class="left">食品发票：</span><el-switch v-model="formInline.report_check.check_invoice" active-text="合格" inactive-text="不合格" active-value='1' inactive-value='2'></el-switch>
         </el-col>
         <el-col :span="9" class="tl mb20" :offset="1">
            <span class="left">有毒有害物质：</span><el-switch v-model="formInline.report_check.check_poison" active-text="合格" inactive-text="不合格" active-value='1' inactive-value='2'></el-switch>
         </el-col>
          <el-col :span="22" class="tl mb20" :offset="1">
            <span class="left">风险点：</span><el-input  size="small" style="width:80%" placeholder="请输入风险点" maxlength="30" clearable autocomplete="off"  v-model="formInline.report_check.check_risk" class="input-with-select disib w">
            </el-input>
         </el-col>
         <el-col :span="22" class="tl mb20" :offset="1">
            <span class="left">风险点整改情况：</span><el-input  size="small"  style="width:80%" placeholder="请输入风险点整改情况" maxlength="30" clearable autocomplete="off"  v-model="formInline.report_check.check_risk_suggestion" class="input-with-select disib">
            </el-input>
         </el-col>
     </el-row>
     <el-row v-if="list.report_state==3&&list.report_timeout_state==1" class="box mt20  f14">
      <el-col :span="24" class="patroldetail-title bgcfbe tl mb20 pl15">现场照片</el-col>
      <el-col :span="24" class="tl">
  <div class="recordadd-upload">
              <el-upload 
                ref="upload"
                multiple
                action="/api/file/upload"
                 accept="image/png,image/jpg,image/jpeg"
                list-type="picture-card"
                :on-success="handlepoll"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                >
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
              </div>
      </el-col>
       <el-col :span="24" class="tl mt20 ">
            <el-button  class="" size="small" type="primary" @click="examine(3)">检查合格</el-button>
            <el-button  class="back_btn" size="small" @click="examine(4)">检查不合格</el-button>
       </el-col>
       
     </el-row>
      <el-row v-if="list2!=null&&(list.report_state==1||list.report_state==4)" class="box mt20  f14">
      <el-col :span="24" class="patroldetail-title bgcfbe tl mb20 pl15">现场照片</el-col>
      <el-col :span="24" class="tl">
         <div class="block fl" v-for="(item,index) in patrol_imgs_list" :key='index'>
    <el-image  v-if="item" 
      :src="user.qyurl+item"
      :preview-src-list="[user.qyurl+item]"
      ></el-image>
       <el-image v-else
      :src="require('../../../../assets/image/moren.png')"
      ></el-image>
  </div>
      </el-col>
     </el-row>
      <el-row v-if="id==2&&list.report_state==1" class="box mt20  f14 c666">
         <el-col :span="24" class="patroldetail-title bgcfbe tl mb20 pl15">无效原因</el-col>
         <div class="box list">
         <el-input
       type="textarea"
       :autosize="{ minRows:4, maxRows: 8}"
       placeholder="如果审核不通过，请填写无效原因"
       v-model="formInline.invalid_reason">
       </el-input>
      </div> 
       <div class="tl mt20"> 
            <el-button v-if="list.report_state==1"  class="" size="small" type="primary" @click="examine(1)">审核通过</el-button>
            <el-button v-if="list.report_state==1" class="back_btn" size="small" @click="examine(2)">无效</el-button>
          </div>
     </el-row>
     <!-- <el-row  v-if="list.report_state==2"  class="box mt20  f14 c666">
         <el-col :span="24" class="patroldetail-title bgcfbe tl mb20 pl15">无效原因</el-col>
         <div class="box list">
         <el-col :span="24" class="tl mb20" :offset="1">
         无效原因：<span class="c333">{{list.unpass_cause}}</span>
        </el-col>
      </div> 
     </el-row> -->
    </el-main>
    <!-- 
      -->
  </el-container>
</template>
<script>
import axios from '../../../../util/api'
import { local,objKeySort } from '../../../../util/util'
export default {
  data () {
    return {
      page: {
       report_code:'',
      },
      id:'',
      dialogImageUrl:'',
      patrol_imgs_list:[],
       dialogVisible: false,
      user_name_conduct: '',
      reportSubChefCount:'',
       list: [],
       list1: [],
       list2:[],
       loading:false,
       loading1:false,
        url:require('../../../../assets/image/a.png'),
      user:'',
      formInline: {
        report_code:'',
        report_check:{
           check_code:'',
           check_imgurls:"",
           check_risk_suggestion:'',
           check_water:'2',
           check_invoice: '2',
           check_mainchef_health:'2',
           check_subchef_health:'2',
           check_forbidden_food:'2',
           check_store:'2',
           check_poison:'2',
           check_reserved_sample:'2',
           check_disinfection:'2',
           check_risk:'',
           check_process_standard:'2',
           check_place_standard:'2',
         },
         report_state:'',
        invalid_reason:'',
      },
    }
  },
   created () {
          this.user = local.get('user');
     this.page.report_code=this.$route.query.code;
      this.formInline.report_code=this.$route.query.code;
      this.id=this.$route.query.id;
     this.init(this.page)
  },
  methods: {
       init (params) {
      axios.get('/api/qy/report/single', params).then((v) => {
       this.list=v.report;
       this.reportSubChefCount=v.reportSubChefCount
        this.list1=v.reportSubChefList;
        this.list2=v.reportCheck;
        if(v.reportCheck!=null){
           this.formInline.report_check.check_code=v.reportCheck.check_code;
          this.patrol_imgs_list=v.reportCheck.check_imgurls.indexOf(",") != -1?v.reportCheck.check_imgurls.split(','):v.reportCheck.check_imgurls.split(' ')
        }
        
    //    this.region_code=v.region_code
      })
    },
     //导出
  downDetailExcel() { 
    this.loading=true;
    this.timer=setInterval(() => { this.check();}, 2000);
    let d_name =this.list.user_name_conduct + '';
    d_name+='报备信息';
    axios.fileget('/api/report/export_report_detail', {down_name:d_name ,report_code:this.page.report_code,report_state:'4'}).then((v) => {})
  },
  check(){
    axios.get('/api/report/check',  {down_name:'export_report_detail'}).then((v) => {
      if(v==true){
        clearInterval(this.timer);
        this.loading=false;
      }
    })
  },
  downDetailExcel1() { 
    this.loading1=true;
    this.timer=setInterval(() => { this.check1();}, 2000);
    let d_name1 =this.list.user_name_conduct + '';
    d_name1+='检查信息';
    axios.fileget('/api/report/export_report_check_search', {down_name:d_name1 ,report_code:this.page.report_code,report_state:'4'}).then((v) => {})
  },
check1(){
    axios.get('/api/report/check',  {down_name:'export_report_check_search'}).then((v) => {
      if(v==true){
        clearInterval(this.timer);
        this.loading1=false;
      }
    })
  },
  handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
          handlepoll(response, file, fileList) {
             this.patrol_imgs_list.push(response.data.visit_url.substring(response.data.visit_url.indexOf("resources")));
            this.formInline.report_check.check_imgurls=this.patrol_imgs_list.join(',');
    },
       handleRemove(file, fileList) {
         this.patrol_imgs_list=[];
         fileList.forEach(item1 => {
            this.patrol_imgs_list.push(item1.response.data.visit_url.substring(item1.response.data.visit_url.indexOf("resources")));
           this.formInline.report_check.check_imgurls=this.patrol_imgs_list.join(',');
      });
      },
  examine(index){
     if(index==2){
        this.formInline.report_state='2';
         if(this.formInline.invalid_reason===undefined||this.formInline.invalid_reason.length<1){
          this.$message({
            message: '请填写无效原因',
            type: 'warning'
          });
          return false;
        }else{
           this.formInline.invalid_reason=this.formInline.invalid_reason
        }
      //   this.$confirm('确定无效?', '提示', {
      //     confirmButtonText: '确定',
      //     cancelButtonText: '取消',
      //   }).then(() => {
      //      axios.put('/api/qy/report/updateState', this.formInline).then((v) => {
      //  this.$router.back()
      // }).catch(() => {})
      //   }).catch(() => {});
     }else if(index==1){
         this.formInline.report_state='3'; 
     }else if(index==3){
         this.formInline.report_state='4'; 
     }else if(index==4){
         this.formInline.report_state='5'; 
     }
     this.formInline.report_check=objKeySort(this.formInline.report_check)
     axios.put('/api/qy/report/updateState', this.formInline).then((v) => {
       this.$router.back()
      }).catch(() => {})
    
  }
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
  }.el-col-9 .left{width: 49% !important}
  .el-col-22 .left{width: 20%}
  .el-image{width: 160px; height: 160px;margin-right: 10px}
  .back_btn{background:rgba(247,248,249,1);border:1px solid rgba(217,222,225,1);}
  .patroldetail-title{height: 34px;line-height: 34px;border-left: 2px solid #788287}
   .title{
    div{min-height: 20px}
    img{width: 18px;margin-left: 5px;vertical-align: text-bottom}
    .type_img{    
  position: absolute;
    right: 10%;
    width: 80px;
    z-index: 100;
    top: 10%;}
  }

}

</style>
