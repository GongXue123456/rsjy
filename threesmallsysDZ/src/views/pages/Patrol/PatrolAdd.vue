<template>
  <el-container v-if="formInline.patrol_type==1" class="patroladd">
    <el-header class="box add bb">
        <h5 class="mb10"><span class="lines"></span>新增巡查</h5>
        <div>
             <el-button  class=""  size="small" type="primary" @click="submitForm('formInline')">提交</el-button>
            <el-button  class="back_btn" size="small" plain @click="$router.back()">返回</el-button></div>
    </el-header>
    <el-main class="p15 pt0">
        <el-form :inline="true"  status-icon ref="formInline"  :model="formInline"  class="demo-ruleForm">
     <div class="box mt20 f14">
        <div class="tl c333" >工单号：{{formInline.work_order}}<span class="ml10 f13 patrol_way">普通巡查</span></div>
     </div>
     <el-row class="box mt20  f14">
         <el-col :span="24" class="patroladd-title bgcfbe tl mb20 pl15">巡查信息</el-col>
         <el-col :span="9" class="tl" :offset="1">
         <el-form-item class="w" label-width="34%" label="巡查人：" size="small" prop="patrol_user_name" :rules="[{required: true,message: '请选择巡查人', trigger: ['blur','change']}]">
           <el-select v-model="formInline.patrol_user_name" clearable placeholder="请选择巡查人" @change="change(2,formInline.patrol_user_name)">
             <el-option v-for="group in options7" :key="group.user_name" :label="group.user_name" :value="group.user_name" > </el-option>
          </el-select>
        </el-form-item>
        </el-col>
         <el-col :span="9" class="tl" :offset="1">
          <el-form-item class="w" label-width="34%" label="巡查时间：" size="small" prop="patrol_time" :rules="[{required: true,message: '请选择日期', trigger: 'blur' }]">
           <el-date-picker type="date" placeholder="选择日期" v-model="formInline.patrol_time" :picker-options="pickerOptionsStart"  format="yyyy-MM-dd" value-format="yyyy-MM-dd" style="width: 100%;" @change="change(3,formInline.patrol_time)"></el-date-picker>
        </el-form-item>
        </el-col>
        <el-col :span="9" class="tl" :offset="1">
        <el-form-item class="w" label-width="34%" label="巡查对象：" size="small" >
           <el-input placeholder="巡查对象" disabled v-model="company_name" class="input-with-select">
            </el-input>
        </el-form-item>
        </el-col>
         <el-col :span="9" class="tl" :offset="1">
         <el-form-item class="w" label-width="34%" label="巡查结果：" size="small" prop="patrol_result" :rules="[{required: true,message: '请选择巡查结果', trigger: ['blur','change']}]">
           <el-select v-model="formInline.patrol_result" clearable placeholder="请选择巡查结果" @change="change(6,formInline.patrol_result)">
             <el-option v-for="group in options4" :key="group.title" :label="group.title" :value="group.title"> </el-option>
          </el-select>
        </el-form-item>
        </el-col>
     </el-row>
    
     <el-row v-if="formInline.patrol_result=='不合格'" class="box mt20  f14">
         <el-col :span="24" class="patroladd-title bgcfbe tl mb20 pl15">处罚信息</el-col>
         <el-col :span="9" class="tl" :offset="1">
          <el-form-item class="w" label-width="34%" label="处理方式：" size="small" >
          <el-select v-model="formInline.dispose_name" clearable placeholder="请选择处理方式" @change="change(1,formInline.dispose_name)">
             <el-option v-for="group in options" :key="group.dispose_code" :label="group.dispose_name" :value="group.dispose_code"> </el-option>
          </el-select>
        </el-form-item>
        </el-col>
         <el-col :span="9" class="tl" :offset="1">
          <el-form-item class="w" label-width="34%" label="处罚方式：" size="small" >
          <el-select  v-model="formInline.punish_name_list" multiple placeholder="请选择处罚方式" >
             <el-option  v-for="group in options1" :key="group.punish_name" :label="group.punish_name" :value="group.punish_name"> </el-option>
          </el-select>
        </el-form-item>
        </el-col>
     </el-row>
     <el-row class="box mt20  f14">
         <el-col :span="24" class="patroladd-title bgcfbe tl mb20 pl15">备注信息</el-col>
        <el-col :span="9" class="tl" :offset="1">
        <el-form-item class="w" label-width="34%" label="备注信息：" size="small" >
           <el-input placeholder="请输入备注信息"  v-model="formInline.note" class="input-with-select">
            </el-input>
        </el-form-item>
        </el-col>
       
     </el-row>
      <el-row class="box mt20  f14">
      <el-col :span="24" class="patroladd-title bgcfbe tl mb20 pl15">现场照片</el-col>
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
     </el-row>
        </el-form>
        </el-main>
  </el-container>
  <el-container v-else-if="formInline.patrol_type==2" class="patroladd">
    <el-header class="box add bb">
        <h5 class="mb10"><span class="lines"></span>双随机工单派发</h5>
        <div>
             <el-button  class=""  size="small" type="primary" @click="submitForm('formInline')">提交</el-button>
            <el-button  class="back_btn" size="small" plain @click="$router.back()">返回</el-button></div>
    </el-header>
    <el-main class="p15 pt0">
        <el-form :inline="true"  status-icon ref="formInline"  :model="formInline"  class="demo-ruleForm">
     <div class="box mt20 f14">
        <div class="tl c333" >工单号：{{formInline.work_order}}<span class="ml10 f13 patrol_way">双随机工单派发</span></div>
     </div>
     <el-row class="box mt20  f14">
         <el-col :span="24" class="patroladd-title bgcfbe tl mb20 pl15">工单信息</el-col>
         
         <el-col :span="9" class="tl" :offset="1">
        <el-form-item class="w" label-width="34%" label="派发人：" size="small" >
           <el-input placeholder="派发人" disabled v-model="user_name" class="input-with-select">
            </el-input>
        </el-form-item>
        </el-col>
         <el-col :span="9" class="tl" :offset="1">
          <el-form-item class="w" label-width="34%" label="巡查时间：" size="small" prop="patrol_time" :rules="[{required: true,message: '请选择日期', trigger: 'blur' }]">
           <el-date-picker type="date" placeholder="选择日期" :picker-options="pickerOptionsStart" v-model="formInline.patrol_time"  format="yyyy-MM-dd" value-format="yyyy-MM-dd" style="width: 100%;" @change="change(3,formInline.patrol_time)"></el-date-picker>
        </el-form-item>
        </el-col>
        <el-col :span="9" class="tl" :offset="1">
         <el-form-item class="w" label-width="34%" label="巡查人：" size="small" prop="patrol_user_name" :rules="[{required: true,message: '请选择巡查人', trigger: ['blur','change']}]">
            <el-input placeholder="巡查人" disabled v-model="formInline.patrol_user_name" class="input-with-select">
               <el-button slot="append" @click="startLottery1">随机抽查<i class="iconfont iconshuaxin general_color f14"></i></el-button>
            </el-input>
        </el-form-item>
         <ul class="user_list tr">
        <li v-for="(item,i) in user_list"  :key="i">
          <div class="box">
            <el-button size="small" :type="i==index?'primary':''">{{item.user_name}}</el-button>
          </div>
        </li>
      </ul>
          
        </el-col>
        <el-col :span="9" class="tl" :offset="1">
        <el-form-item class="w" label-width="34%" label="巡查对象：" size="small"  prop="company_name" :rules="[{required: true,message: '请输入巡查对象', trigger: 'blur' }]">
           <el-input placeholder="巡查对象" disabled v-model="formInline.company_name" class="input-with-select">
             <el-button slot="append" @click="startLottery2">随机抽查<i class="iconfont iconshuaxin general_color f14"></i></el-button>
            </el-input>
        </el-form-item>
        <ul class="user_list  tr">
        <li v-for="(item,i) in tableData" :key="i">
          <div class="box">
            <el-button size="small" :type="i==index2?'primary':''" :title="item.company_name">{{item.company_name}}</el-button>
          </div>
        </li>
      </ul>
        </el-col>
     </el-row>
        </el-form>
        </el-main>
  </el-container>
  <el-container v-else-if="formInline.patrol_type==3&&this.$route.query.id2!=1" class="patroladd">
    <el-header class="box add bb">
        <h5 class="mb10"><span class="lines"></span>工单派发</h5>
        <div>
             <el-button  class=""  size="small" type="primary" @click="submitForm('formInline')">提交</el-button>
            <el-button  class="back_btn" size="small" plain @click="$router.back()">返回</el-button></div>
    </el-header>
    <el-main class="p15 pt0">
        <el-form :inline="true"  status-icon ref="formInline"  :model="formInline"  class="demo-ruleForm">
     <div class="box mt20 f14">
        <div class="tl c333" >工单号：{{formInline.work_order}}<span class="ml10 f13 patrol_way">工单派发</span></div>
     </div>
     <el-row class="box mt20  f14">
         <el-col :span="24" class="patroladd-title bgcfbe tl mb20 pl15">工单信息</el-col>
         
         <el-col :span="9" class="tl" :offset="1">
        <el-form-item class="w" label-width="34%" label="派发人：" size="small">
           <el-input placeholder="派发人" disabled v-model="user_name" class="ko
           
           ;'
           
           
           ll'input-with-select">
            </el-input>
        </el-form-item>
        </el-col>
         <el-col :span="9" class="tl" :offset="1">
          <el-form-item class="w" label-width="34%" label="巡查时间：" size="small" prop="patrol_time" :rules="[{required: true,message: '请选择日期', trigger: 'blur' }]">
           <el-date-picker type="date" placeholder="选择日期" v-model="formInline.patrol_time" :picker-options="pickerOptionsStart"  format="yyyy-MM-dd" value-format="yyyy-MM-dd"  style="width: 100%;" @change="change(3,formInline.patrol_time)"></el-date-picker>
        </el-form-item>
        </el-col>
        <el-col :span="9" class="tl" :offset="1">
         <el-form-item class="w" label-width="34%" label="巡查人：" size="small" prop="patrol_user_name" :rules="[{required: true,message: '请选择巡查人', trigger: ['blur','change']}]">
           <el-select v-model="formInline.patrol_user_name" clearable placeholder="请选择巡查人" @change="change(2,formInline.patrol_user_name)">
             <el-option v-for="group in options7" :key="group.user_name" :label="group.user_name" :value="group.user_name" > </el-option>
          </el-select>
        </el-form-item>
        </el-col>
        <el-col :span="9" class="tl" :offset="1">
        <el-form-item class="w" label-width="34%" label="巡查对象：" size="small"  >
           <el-input placeholder="巡查对象" disabled v-model="company_name" class="input-with-select">
            </el-input>
        </el-form-item>
        </el-col>
     </el-row>
        </el-form>
        </el-main>
  </el-container>
  <el-container v-else-if="formInline.patrol_type==3&&this.$route.query.id2==1" class="patroladd">
    <el-header class="box add bb">
        <h5 class="mb10"><span class="lines"></span>工单派发</h5>
        <div>
             <el-button  class=""  size="small" type="primary" @click="submitForm('formInline')">提交</el-button>
            <el-button  class="back_btn" size="small" plain @click="$router.back()">返回</el-button></div>
    </el-header>
    <el-main class="p15 pt0">
        <el-form :inline="true"  status-icon ref="formInline"  :model="formInline"  class="demo-ruleForm">
     <div class="box mt20 f14">
        <div class="tl c333" >工单号：{{formInline.work_order}}<span class="ml10 f13 patrol_way">工单派发</span></div>
     </div>
     <el-row class="box mt20  f14">
         <el-col :span="24" class="patroladd-title bgcfbe tl mb20 pl15">工单信息</el-col>
         
         <el-col :span="9" class="tl" :offset="1">
        <el-form-item class="w" label-width="34%" label="派发人：" size="small" >
           <el-input placeholder="派发人" disabled v-model="user_name" class="input-with-select">
            </el-input>
        </el-form-item>
        </el-col>
         <el-col :span="9" class="tl" :offset="1">
          <el-form-item class="w" label-width="34%" label="巡查时间：" size="small" prop="patrol_time" :rules="[{required: true,message: '请选择日期', trigger: 'blur' }]">
           <el-date-picker type="date" placeholder="选择日期" :picker-options="pickerOptionsStart" v-model="formInline.patrol_time"  format="yyyy-MM-dd" value-format="yyyy-MM-dd" style="width: 100%;" @change="change(3,formInline.patrol_time)"></el-date-picker>
        </el-form-item>
        </el-col>
        <el-col :span="9" :offset="1" class="tl">
          <el-form-item class="w " label-width="34%"   label="巡查人：" size="small" prop="patrol_user_name" :rules="[{required: true,message: '请选巡查人', trigger: ['blur','change']}]">
              <el-select v-if="this.$route.query.val"  v-model="formInline.patrol_user_name" filterable placeholder="请选择巡查人" disabled>
            <el-option  v-for="item in user_list" :key="item.user_name" :label="item.user_name" :value="item.user_name" ></el-option>
          </el-select>
          <el-select v-else  v-model="formInline.patrol_user_name" filterable placeholder="请选择巡查人"  clearable @change="change(5,formInline.patrol_user_name)">
            <el-option  v-for="item in user_list" :key="item.user_name" :label="item.user_name" :value="item.user_name" ></el-option>
          </el-select>
        </el-form-item>
        </el-col>
        <el-col :span="9" :offset="1" class="tl">
        <el-form-item class="w" label-width="34%"  label="巡查对象：" size="small" prop="company_name" :rules="[{required: true,message: '请选择巡查对象', trigger: 'blur' }]">
           <el-select   v-model="formInline.company_name" filterable placeholder="请选择巡查对象"  clearable @change="change(4,formInline.company_name)">
            <el-option  v-for="item in tableData" :key="item.company_code" :label="item.company_name" :value="item.company_name" ></el-option>
          </el-select>
        </el-form-item>
        </el-col>
     </el-row>
        </el-form>
        </el-main>
  </el-container>
</template>
<script>
import axios from '../../../util/api'
import { local } from '../../../util/util'
function findSystemCode(){
var year = new Date().getFullYear();
var month = new Date().getMonth() + 1;
var day = new Date().getDate();
 var num = '';
if (month < 10) {month = "0" + month; }
if (day < 10) {day = "0" + day;}
for(var i=0;i<5;i++){num+=Math.floor(Math.random()*10);}
     return year + month+ day+num
}
export default {
  data () {
    return {
      index: -1,  // 当前转动到哪个位置，起点位置
      count: 20,  // 总共有多少个位置
      timer: 0,  // 每次转动定时器
      speed: 200,  // 初始转动速度
      times: 0,    // 转动次数
      cycle: 50,   // 转动基本次数：即至少需要转动多少次再进入抽奖环节
      prize: -1,   // 中奖位置
      click: true,
      index2: -1,  
      count2: 20, 
      timer2: 0, 
      speed2: 200, 
      times2: 0, 
      cycle2: 50, 
      prize2: -1, 
      click2: true,
      company_name:'',
      user_name:'',
      region_code:'',
      user_list:'',
      tableData:'',
        formInline: {
          patrol_type:'',
          patrol_state:'',
          work_order:'',
        dispose_code: '',
        patrol_user_name: '',
        patrol_result:'',
        patrol_time:'',
        dispose_name:'无',
        punish_name_list:[],
        note:'',
        company_code:'',
        company_name:'',
        patrol_user_code:'',
        patrol_imgs_list:[]
      },
      options:'',
      options1:'', 
      options7:'',
        options4:[{title: '合格',name: '1'}, {title: '不合格',name: '2'}],
       dialogImageUrl: '',
        dialogVisible: false,
        aa:'',
        aa2:'',
         pickerOptionsStart: {
        disabledDate: time => {
            return time.getTime() < Date.now() - 8.64e7;
        }
      },
    }
  },
     created () {
       this.formInline.patrol_type=this.$route.query.id1;
        this.formInline.company_code=this.$route.query.id;
        this.company_name=this.$route.query.name;
        this.formInline.patrol_user_name=this.$route.query.val;
        this.formInline.company_name=this.$route.query.name;
         this.formInline.patrol_user_code=this.$route.query.code;
        this.region_code=this.$route.query.tag;
        this.user_name=local.get('user').user_name;
        this.formInline.work_order=findSystemCode()
      this.init()
  },
  methods: {
     init (params) {
      axios.get('/api/patrol/dispose', '').then((v) => {
       this.options=v
      })
        axios.get('/api/patrol/punish', '').then((v) => {
       this.options1=v
      })
     
      if(this.formInline.patrol_type==3){
        this.formInline.patrol_state=1;
        if(this.$route.query.id2==1){
           axios.get('/api/user/list', {pager_openset:'100',user_type:'协管员',user_state:'1',user_province:local.get('user').province==null?'':local.get('user').province,user_city:local.get('user').city==null?'':local.get('user').city,user_area:local.get('user').area==null?'':local.get('user').area,user_town:local.get('user').town==null?'':local.get('user').town,user_vill:local.get('user').vill==null?'':local.get('user').vill,}).then((v) => {
            this.user_list=v.user_list;
      })
       axios.get('/api/company/search', {pager_openset:'100',filing_state:"3"}).then((v) => {
        this.tableData=v.companyList;
      })
        }else{
 axios.get('/api/company/detail', {company_code:this.formInline.company_code}).then((v) => {
        this.init1(v.region_code)
      })
        }
        
      }else if(this.formInline.patrol_type==2){
        this.formInline.patrol_state=1;
          axios.get('/api/user/list', {pager_openset:'20',user_type:'协管员',user_state:'1',user_province:local.get('user').province==null?'':local.get('user').province,user_city:local.get('user').city==null?'':local.get('user').city,user_area:local.get('user').area==null?'':local.get('user').area,user_town:local.get('user').town==null?'':local.get('user').town,user_vill:local.get('user').vill==null?'':local.get('user').vill,}).then((v) => {
            this.user_list=v.user_list;
            this.count=v.user_list.length<20?v.user_list.length:20
      })
       axios.get('/api/company/search', {pager_openset:'20',filing_state:"3"}).then((v) => {
        this.tableData=v.companyList;
         this.total = v.pager_count
           this.count2=v.companyList.length<20?v.companyList.length:20
      })
      }else{
        this.formInline.patrol_state=2;
        this.init1(this.region_code)
      }
    },
    init1(params){
      axios.get('/api/infoRegion/region/user', {region_code:params,state:'1',pager_openset:'100'}).then((v) => {
       this.options7=v.info_region_list
      })
    },
     change(index,val){
       if(index==1){
         this.formInline.dispose_code=val;
         var obj = {}
      obj = this.options.find(function(item){
        return item.dispose_code === val
      })
       this.formInline.dispose_name=obj.dispose_name}
        if(index==2){this.formInline.patrol_user_name=val;
          this.options7.forEach(item=>{
            if(item.user_name==val){
              this.formInline.patrol_user_code=item.user_code
            }
          })
       }
       if(index==3){this.formInline.patrol_time=val;}
       if(index==4){
        this.tableData.forEach(item=>{
            if(item.company_name==val){
              this.formInline.company_code=item.company_code
            }
          })
       }
       if(index==5){this.formInline.patrol_user_name=val;
          this.user_list.forEach(item=>{
            if(item.user_name==val){
              this.formInline.patrol_user_code=item.user_code
            }
          })
       }
       if(index==6){this.formInline.patrol_result=val;
       }
     },
     submitForm(formInline){
          let paramas=this.formInline;
         this.$refs[formInline].validate((valid) => {
        if (valid) {
          axios.post('/api/patrol/save', paramas).then((v) => {
            this.$router.back()
         })
        }
         })
      },
         handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
          handlepoll(response, file, fileList) {
             this.formInline.patrol_imgs_list.push(response.data.visit_url.substring(response.data.visit_url.indexOf("resources")));
    },
       handleRemove(file, fileList) {
         this.formInline.patrol_imgs_list=[];
         fileList.forEach(item1 => {
            this.formInline.patrol_imgs_list.push(item1.response.data.visit_url.substring(item1.response.data.visit_url.indexOf("resources")));
        });
      },
      startLottery1(){
      if (!this.click) { return }
       this.startRoll1();
     },
      startLottery2(){
      if (!this.click2) { return }
       this.startRoll2();
     },
    startRoll1 () {
			this.times += 1 
			this.oneRoll() 
			if (this.times > this.cycle + 10 && this.prize === this.index) {
        clearTimeout(this.timer) 
         this.formInline.patrol_user_name=this.aa;
         this.user_list.forEach(item=>{
            if(item.user_name==this.aa){
              this.formInline.patrol_user_code=item.user_code
            }
          })
			  this.prize = -1
			  this.times = 0
			  this.speed = 200
			  this.click = true; 
			  var that = this;	                  
			} else {
			  if (this.times < this.cycle) {
        this.speed -= 10  
        if(this.speed<=80){  this.speed =80 }
			  } else if (this.times === this.cycle) { 
				const index = parseInt(Math.random() * this.count) || 0;
          this.prize = index;
         this.aa=this.user_list[index].user_name
				if (this.prize > this.count) { this.prize = this.count }
			  } else if (this.times > this.cycle + 10 && ((this.prize === 0 && this.index === (this.count-1)) || this.prize === this.index + 1)) {
				this.speed += 50
			  } else {
				this.speed += 20
        }    
			  if (this.speed < 40) {this.speed = 40}
			  this.timer = setTimeout(this.startRoll1, this.speed)
			}
		},
 startRoll2 () {
			this.times2 += 1 
			this.oneRoll2() 
			if (this.times2 > this.cycle2 + 10 && this.prize2 === this.index2) {
        clearTimeout(this.timer2) 
         this.formInline.company_name=this.aa2.company_name;
         this.formInline.company_code=this.aa2.company_code;
			  this.prize2 = -1
			  this.times2 = 0
			  this.speed2= 200
			  this.click2 = true; 
			  var that = this;	                  
			} else {
			  if (this.times2 < this.cycle2) {
        this.speed2 -= 10  
        if(this.speed2<=80){  this.speed2 =80 }
			  } else if (this.times2=== this.cycle2) { 
				const index2 = parseInt(Math.random() * this.count2) || 0;
          this.prize2 = index2;
        this.aa2=this.tableData[index2]
				if (this.prize2 > this.count2) { this.prize2 = this.count2 }
			  } else if (this.times2 > this.cycle2 + 10 && ((this.prize2 === 0 && this.index2 === (this.count2-1)) || this.prize2 === this.index2 + 1)) {
				this.speed2 += 50
			  } else {
				this.speed2 += 20
        }    
			  if (this.speed2 < 40) {this.speed2 = 40}
			  this.timer2 = setTimeout(this.startRoll2, this.speed2)
			}
		},
		// 每一次转动
		oneRoll () {
		  let index = this.index // 当前转动到哪个位置
      const count = this.count // 总共有多少个位置
		  index += 1
		  if (index > count - 1) { index = 0 }
      this.index = index
    },
    	oneRoll2 () {
		  let index2 = this.index2 // 当前转动到哪个位置
      const count2 = this.count2 // 总共有多少个位置
		  index2 += 1
		  if (index2 > count2 - 1) { index2 = 0 }
      this.index2 = index2
		},
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
  /deep/ .el-input-group__append, .el-input-group__prepend{background-color:#fff;color: #2EC68A}
.patrol_way{padding: 5px;background-color:rgba($color: #2EC68A, $alpha: 0.2);color:#2EC68A; border-radius: 4px;}
.user_list li{padding: 3px;display: inline-block;}
.user_list .box .el-button--small{width: 5.2rem;
	overflow: hidden;     /*设置超出的部分进行影藏*/
	text-overflow: ellipsis;     /*设置超出部分使用省略号*/
	white-space:nowrap ;}

}

</style>
