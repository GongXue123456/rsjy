<template>
  <div class="body">
    <div class="title" ref="Top"><img class="mr10" src="../../assets/image/dashujulogo.png">中国食安数智云大数据中心 <span class="f13 ml10">食品生产经营者</span><a  class="right_btn f13 cfff disib"
              :href="qyurl+'JKYJLogin/login?user_loginname='+user_loginname+'&user_loginpass='+user_loginpass+'&returnurl=todayData/findByList'" 
            ><p class="f13 disib ml10">{{dateTime}}</p><p class="f20 disib ml20 mr20">{{dateTime1}}</p><p class="disib">群宴预警中心</p>
            </a></div>
    <div class="box" ref="Box">
      <el-row class="el-row1" :gutter="20">
       <el-col :span="6">
         <div class="grid-content bg-purple1 fl " >
          <div class="left-top ml10" ref="leftTop">
            <div class=" title1 tl f16">食品生产经营者备案<span class="pt10 fr f30">915<span class="pt10 tr f13">条</span></span></div>
            <div class="a clear w f14" ref="leftTop1">
              <div class="aa">主体名称</div>
              <div class="aa">主体类型</div>
              <div class="aa">经营者</div>
              <div class="aa">审核状态</div>
 
              <div class="scroll_bg" ref="scrollBg1" id="box">
                 <vue-seamless-scroll :data="tableData" :class-option="optionSetting" class="seamless-warp">
          <ul class="item">
            <li v-for="(item, index) in tableData" :key="index" class="aa_li">
                <div class="fl p5">{{item.company_name}}</div>
          <div class="fl p5" v-if="item.companytype_code=='1001574645421581000000001'">食品生产</div>
          <div class="fl p5" v-else-if="item.companytype_code=='1001574645421581000000002'">食品流通</div>
          <div class="fl p5" v-else-if="item.companytype_code=='1001574645421581000000003'">食品餐饮</div>
          <div class="fl p5">{{item.operator}}</div>
            <div class="fl p5" v-if="item.filing_state=='1'">待审核</div>
          <div class="fl p5" v-else-if="item.filing_state=='4'">已驳回</div>
          <div class="fl p5" v-else-if="item.filing_state=='3'">已归档</div>
          <div class="fl p5" v-else-if="item.filing_state=='5'">黑名单</div>
            </li>
          </ul>
      </vue-seamless-scroll>
              </div>
            </div>
          </div>
          <div class="left-top ml10" ref="leftBottom">
            <div class="pt10 mb10 tl f16">鹰眼</div>
            <div class="mt10 mb10 title1 tl f12">报警设备<span class=" fr">启动设备</span></div>
            <el-progress :text-inside="true" :stroke-width="30" color="#F47448" :percentage="0"></el-progress>
            <div id="main1" class="mt10 f13" ref="main1">
              <el-row  class="tc">
                <el-col :span="8" class="flex"><div  id="progress1"  :style="{width:progressWidth+'px',height:progressWidth+'px'}"> </div></el-col>
                <el-col :span="8" class="flex"><div class="" id="progress2"  :style="{width:progressWidth+'px',height:progressWidth+'px'}"> </div></el-col>
                <el-col :span="8" class="flex"><div class="" id="progress3"  :style="{width:progressWidth+'px',height:progressWidth+'px'}"> </div></el-col>
              </el-row>
              <el-row >
                <el-col :span="12" class="flex"><div  id="progress4" class="ml20" :style="{width:progressWidth+'px',height:progressWidth+'px'}"> </div></el-col>
                <el-col :span="12" class="flex"><div id="progress5" class="mr20" :style="{width:progressWidth+'px',height:progressWidth+'px'}"> </div></el-col>

              </el-row>
              <el-row >
                <el-col :span="8" class="flex"><div class="" id="progress6"  :style="{width:progressWidth+'px',height:progressWidth+'px'}"> </div></el-col>
                <el-col :span="8" class="flex"><div class="" id="progress7"  :style="{width:progressWidth+'px',height:progressWidth+'px'}"> </div></el-col>
                <el-col :span="8" class="flex"><div class="" id="progress8"  :style="{width:progressWidth+'px',height:progressWidth+'px'}"> </div></el-col>
              </el-row>
                
            </div>
          </div>
        </div>
       </el-col>
       <el-col :span="12">
         <div class="grid-content bg-purple2 fl" ref="Purple2">
          <div class="center-top pr ml10" ref="centerTop">
            <el-row :gutter="20" class="f13">
               <div class="title2 pa tl f16">GIS地图</div>
              <el-col :span="24">
                <div class="grid-content2" ref="gridContent2">
                   <div ref="map" class="fl " style="width:100%;" ></div>
                </div>
              </el-col>
              
            </el-row>
          </div>
          <div class="center-bottom" ref="centerBottom">
             <el-row :gutter="20" class="f13 mt20 mb20">
              <el-col  :span="9">
                <div class="grid-content1 tl">
                 <div class="mb5 cfff f16">总巡查数量</div>
                 <span class="f30 mr10" v-if="data3!=''">{{patrolCount}}</span>
                </div>
              </el-col>
              <el-col  :span="5">
                <div class="grid-content1">
                 <div class="mb5 ">巡查不合格</div>
                 <span class="f30 cfff mr10"  v-if="data3!=''">{{data3[1].svalue}}</span>
                 <el-progress v-if="data3!=''" :percentage="percentage1" :stroke-width="3" color="#F47448"></el-progress>
                </div>
              </el-col>
              <el-col :span="5">
                <div class="grid-content1">
                 <div class="mb5 ">待巡查</div>
                 <span class="f30 cfff mr10" v-if="data3!=''">{{data3[2].svalue}}</span>
                  <el-progress v-if="data3!=''" :percentage="percentage2" :stroke-width="3" color="#35B8F7"></el-progress>
                </div>
              </el-col>
               <el-col :span="5">
                <div class="grid-content1">
                 <div class="mb5 "> 巡查合格</div>
                 <span class="f30 cfff mr10" v-if="data3!=''">{{data3[3].svalue}}</span>
                  <el-progress v-if="data3!=''" :percentage="percentage3" :stroke-width="3" color="#1ADFBB"></el-progress>
                </div>
              </el-col>
            </el-row>
            <div class=" clear w f14 mt40">
              <div class="aa1">工单号</div>
              <div class="aa1">巡查方式</div>
              <div class="aa1">巡查对象</div>
              <div class="aa1">巡查人</div>
              <div class="aa1">巡查时间</div>
              <div class="aa1">巡查结果</div>
              <div class="scroll_bg" id="box">
                 <vue-seamless-scroll :data="tableData1" :class-option="optionSetting" class="seamless-warp">
          <ul class="item">
            <li v-for="(item, index) in tableData1" :key="index" class="aa1_li">
               <div class="fl ">{{item.work_order}}</div>
          <!-- <div class="fl ">{{item.patrol_type}}</div> -->
           <div class="fl p5" v-if="item.patrol_type=='1'">巡查工单</div>
          <div class="fl p5" v-else-if="item.patrol_type=='2'">双随机工单</div>
          <div class="fl p5" v-else-if="item.patrol_type=='3'">派发工单</div>
           <div class="fl p5" v-else>---</div>
          <div class="fl ">{{item.company_name}}</div>
           <div class="fl">{{item.patrol_user_name}}</div>
           <div class="fl ">{{item.patrol_time}}</div>
           <div class="fl general_color" v-if="item.patrol_result=='合格'">{{item.patrol_result}}</div>
           <div class="fl f47" v-else-if="item.patrol_result=='不合格'">{{item.patrol_result}}</div>
            </li>
          </ul>
      </vue-seamless-scroll>
              </div>
            </div>
          </div>
        </div>
       </el-col>
       <el-col :span="6">
         <div class="grid-content bg-purple1 fl" ref="Purple3">
          <div class="right-top mb10" ref="rightTop">
            <div class="pt10 pl10 tl f16 mb20">证件预警</div>
           <div class="pr "> <el-progress class="tl ml20 mt10 " :stroke-width="10" color="#F47448" :percentage="percentage4" :format="format"></el-progress><span class="pa f13">{{percentage4}}</span></div>
              <div class="pr"> <el-progress class="tl ml20 mt10 " :stroke-width="10" color="#F47448" :percentage="percentage5" :format="format1"></el-progress><span class="pa f13">{{percentage5}}</span></div>
               <div class="pr"> <el-progress class="tl ml20 mt10 " :stroke-width="10" color="#F47448" :percentage="percentage6" :format="format2"></el-progress><span class="pa f13">{{percentage6}}</span></div>
            <div class="pr"> <el-progress class="tl ml20 mt10 " :stroke-width="10" color="#F47448" :percentage="percentage7" :format="format3"></el-progress><span class="pa f13">{{percentage7}}</span></div>
            <!-- <div id="main"  class="f13" ref="main"></div> -->
          </div>
          <div class="right-center"  ref="rightCenter">
             <div class="pt10 pl10 tl f16">用户雷达</div>
            <div id="main"  class="f13" ref="main"></div>
          </div>
          <!-- <div class="right-center"  ref="rightCenter">
            <div class="pt10 pl10 mb10 title1 f13">日常巡查<span class=" fr mr10">
               <el-button v-for="(v,k) in list_btn" :key="k" :class="activeClass ==k?'active':''" class=""  size="mini" @click="IsActive(k,v.title)">{{v.title}}</el-button>  </span></div>
            <div class="a w f14 tc" ref="rightCenter1">
              <div style="width:40%" class="fl cfff mb5">企业</div>
              <div style="width:30%" class="fl cfff mb5">巡查人</div>
              <div style="width:30%" class="fl cfff mb5">培训状态</div>
              <div class="scroll_bg" ref="scrollBg" id="box1">
                 <vue-seamless-scroll :data="tableData1" :class-option="optionSetting" class="seamless-warp">
          <ul class="item">
            <li v-for="(item, index) in tableData1" :key="index" class="w">
                <div class="fl p5" style="width:40%">{{item.company_name}}</div>
                   <div class="fl p5" style="width:30%">{{item.patrol_user_name}}</div>
                    <div class="fl p5" style="width:30%">{{item.patrol_result}}</div>
            </li>
          </ul>
      </vue-seamless-scroll>
              </div>
            </div>
          </div> -->
          <div class="right-top"  ref="rightBottom">
            <div class="pt10 pl10 mb10 tl f16">溯源管理</div>
             <div class="a w f14 tc" ref="rightCenter1">
              <div  class="fl aa cfff mb5">企业名称</div>
              <div  class="fl aa cfff mb5">法人/经营者</div>
              <div  class="fl aa cfff mb5">溯源次数</div>
               <div  class="fl aa cfff mb5">操作</div>
              <div class="scroll_bg" ref="scrollBg" id="box1">
                 <vue-seamless-scroll :data="tableData3" :class-option="optionSetting" class="seamless-warp">
          <ul class="item">
            <li v-for="(item, index) in tableData3" :key="index" class="w aa_li">
                <div class="fl p5" >{{item.company_name}}</div>
                   <div class="fl p5" >{{item.operator}}</div>
                    <div class="fl p5" >{{item.food_source_count}}</div>
                     <div class="fl p5 general_color" style="cursor:pointer" @click="godetail(item.company_name,item.company_code)">查看详情</div>
                    <!-- <el-button type="text" @click="dialogTableVisible = true">Dialog</el-button> -->
            </li>
          </ul>
      </vue-seamless-scroll>
              </div>
            </div>
          </div>
        </div>
       </el-col>
    </el-row>

    </div>
    <el-dialog :modal-append-to-body='false' :title="title" :visible.sync="dialogTableVisible" >
        <el-collapse accordion v-if="list1.length>0" class="pr">
         
  <el-collapse-item v-for="(item,index) in list1" :key="index"  class="pr">
    <template slot="title">
      <span v-if="index<list1.length-1"  class="pa asa"></span>
       <span class="tap tap1"></span> 
     <el-row class="w tl pl10 flex cfff" @click.native="aaa(item.foodsource_code)">
  <el-col :span="6">购买时间：{{item.sell_time}}</el-col>
  <el-col :span="5">产品种类：{{item.food_source_detail_count}}</el-col>
  <el-col :span="6">购买人：{{item.sell_person}}</el-col>
  <el-col :span="7" class="lh150">购买地址：{{item.supplier_address}}</el-col>
  </el-row>
    </template>
      <el-table  :data="list2"  class="cfff" style="width: 100%;margin-bottom: 20px;" >
    <el-table-column prop="img"  align='center'  label="图片">
       <template slot-scope="scope">
          <img v-if="scope.row.product_logo==='undefined'||scope.row.product_logo===''||scope.row.product_logo==='null'"  src="../../assets/image/source.png"   style="width: 40px;height: 40px"/>
      <el-image v-else :src="qyurl+scope.row.product_logo" :preview-src-list="[qyurl+scope.row.product_logo]" alt="" style="width: 40px;height: 40px"></el-image>
    </template>
    </el-table-column>
    <el-table-column align='center'  prop="category_name" label="种类"> </el-table-column>
    <el-table-column align='center' prop="product_name"  label="产品名称"> </el-table-column>
    <el-table-column align='center' prop="product_spec" label="规格"> </el-table-column>
    <el-table-column align='center' prop="product_unit" label="单位"> </el-table-column>
    <el-table-column align='center' prop="sell_count" label="数量"> </el-table-column>
    <el-table-column align='center' prop="supplier_name"  label="供应商"></el-table-column>
    <el-table-column align='center' prop="userset_name" label="采购人员"></el-table-column>
    <el-table-column align='center' prop="produce_name" label="生产人员"> </el-table-column>
    
  </el-table>
  </el-collapse-item>
</el-collapse>
  <div  v-else>暂无数据</div>
</el-dialog>
  </div>
</template>

<script>
import { local } from "../../util/util";
var echarts = require('echarts/lib/echarts');
require('echarts/lib/chart/line');
require('echarts/lib/chart/pie');
require('echarts/lib/chart/radar');
require('echarts/lib/chart/bar');
require('echarts/lib/component/tooltip');
require('echarts/lib/component/legend');
require('echarts/lib/component/title');
import axios from "../../util/api";
import axiosa from 'axios'
import options from "./js/map"; 
import 'echarts/map/js/province/sichuan.js'; 
import Vue from "vue";
var chinaId = 100000;
var chinaName = "china";
var chinaJson = null;
let option,option3,progress1,progress2,progress3,progress4,progress5,progress6,progress7,progress8,endPercent;
var mapStack = [];
var parentId = null;
var parentName = null;
var parentId1 = null;
var parentName1 = null;
var cityId;
var cityId1;
var mapJson1;
var s = 0;
var sss = true;
var myChart = null;
let dmtData=[]
import vueSeamlessScroll from 'vue-seamless-scroll'
export default {
  name: 'DutyInfo',
  components: {vueSeamlessScroll},
  data() {
    return {
       animate: false,
       animate1: false,
        activeClass:0,
      clientWidth: "",
      clientHeight: "",
      tableData:[],
      tableData1:[],
      tableData2:[],
       tableData3:[],
      page: {
        pager_offset: "0",
        pager_openset:'100'
      },
      page1:{pager_offset:'0',pager_openset:'100',patrol_result:''},
      activeIndex: 0,
      activeIndex1: 0,
      firstPlayFlag: true,
      data1:'',
      data2:'',
      data3:'',
      data4:'',
      data5:'',
      timer:'',
      list1:[],
      list2:[],
      percentage1:0,
      percentage2:0,
      percentage3:0,
      percentage4:0,
      percentage5:0,
      percentage6:0,
      percentage7:0,
      user_loginname: "",
      user_loginpass: "",
      qyurl:'',
      list_btn:[{title: '合格',val:'1'},{title: '不合格',val:'2'}],
      progressWidth:'',
      dateTime:'',
       dateTime1:'',
        dialogTableVisible: false,
        title:'',
        user:'',
        patrolCount:'',
        user_code:''
    };
  },
  mounted() {
    this.clientWidth = `${document.documentElement.clientWidth}`;
    this.clientHeight = `${document.documentElement.clientHeight}`;
     this.$refs.Top.style.height = this.clientHeight * (115 / 1920) + "px";
    this.$refs.leftTop.style.height = (this.clientHeight-this.clientHeight * (115 / 1920)-50)*0.4 + "px";
    this.$refs.scrollBg1.style.height =(this.clientHeight-this.clientHeight * (115 / 1920)-50)*0.4- 70 + "px";
    this.$refs.leftBottom.style.height =(this.clientHeight-this.clientHeight * (115 / 1920)-50)*0.6+ "px";
    this.$refs.main1.style.height =(this.clientHeight-this.clientHeight * (115 / 1920)-50)*0.6 - 20 + "px";
   this.progressWidth=((this.clientHeight-this.clientHeight * (115 / 1920)-50)*0.6 - 80)/3;
    
    this.$refs.rightTop.style.height =(this.clientHeight)*0.23 + "px";
     this.$refs.rightCenter.style.height =(this.clientHeight)*0.33 + "px";
     this.$refs.main.style.height =(this.clientHeight)*0.33 + "px";
    // this.$refs.rightCenter.style.height =(this.clientHeight-this.clientHeight * (115 / 1920))*0.34 + "px";
    this.$refs.rightBottom.style.height =(this.clientHeight)*0.45 + "px";
    // this.$refs.scrollBg.style.height =(this.clientHeight-this.clientHeight * (115 / 1920)-50)*0.34  - 70 + "px";
    // this.$refs.main3.style.height =(this.clientHeight-this.clientHeight * (115 / 1920)-50)*0.28+15 + "px";
  this.$refs.map.style.height = (this.clientHeight)*0.45 +"px";
    this.$refs.centerBottom.style.height =(this.clientHeight)*0.55+"px";
      
    this.$nextTick(function() {
      this.drawPie();
    });
    this.timer = setInterval(() => {
    this.getNowTime()
    }, 1000)

  },
   beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer); 
    }
  },
   computed: {
    optionSetting () {
      return {
        step:1, // 数值越大速度滚动越快
        hoverStop: true, // 是否开启鼠标悬停stop
        direction: 1, // 0向下 1向上 2向左 3向右
        openWatch: true, // 开启数据实时监控刷新dom
        singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        waitTime: 500 // 单步运动停止的时间(默认值1000ms)
      }
    }
  },
  created() {
    this.user_code=this.$route.query.user_code;
    this.getToken()
    // this.getNowTime()
  },
  methods: {
    getNowTime() {
	       var now = new Date();
	       var year = now.getFullYear(); 
	       var month = now.getMonth(); 
         var date = now.getDate();
           var hh =now.getHours() < 10? "0" + now.getHours(): now.getHours();
      var mm =now.getMinutes() < 10? "0" + now.getMinutes(): now.getMinutes();
      var ss =now.getSeconds() < 10? "0" + now.getSeconds():now.getSeconds();
       var hour =' '+hh+':'+mm+':'+ss; 
	       month = month + 1;
	       month = month.toString().padStart(2, "0");
	       date = date.toString().padStart(2, "0");
         this.dateTime=`${year}-${month}-${date}`
          this.dateTime1=`${hh}:${mm}:${ss}`
      },
       format(percentage) {  return  '即将到期备案证件'; },
       format1(percentage) {  return  '已过期备案证件'; },
       format2(percentage) {  return  '即将到期健康证'; },
       format3(percentage) {  return  '已过期健康证';},
     IsActive(k,val) {
        this.activeClass = k;
        this.page1.patrol_result=val
        this.init1(this.page1)
      },
      getToken(){
         axiosa.get("/api/token?user_code="+this.user_code).then(v => {
          local.set('token', v.data.data.token)
          this.user_loginname = v.data.data.user_loginname;
          this.user_loginpass = v.data.data.user_loginpass;
          this.qyurl=v.data.data.qyurl;
          let token = local.get('token')
          if (token) {
            this.init(this.page);
            this.init1(this.page1)
          } 
         
      });
      },
    init(params) {
      axios.get("/api/bigData/userTypeCount", "").then(v => {
        option.radar[0].indicator=[];
        option.series[0].data[0].value=[]
        var maxs= v[0].svalue;
        let arr=[];
         v.forEach(item=>{
            arr.push(item.svalue);
        })
        maxs = parseInt(Math.max.apply(null, arr))+100;
        v.forEach(item=>{
          option.radar[0].indicator.push({text:item.sname+' '+item.svalue,max: maxs})
          option.series[0].data[0].value.push(item.svalue)
        })
         let myChart = echarts.init(document.getElementById("main"));
       myChart.setOption(option);
      });
     axios.get('/api/index/willExpireList', {user_code:this.user_code}).then((v) => {this.data4=v;this.percentage4=v.company_willexpire_sc+v.company_willExpire_lt+v.company_willexpire_cy;this.percentage6=v.c_employ_willexpire_sc+v.c_employ_willexpire_lt+v.c_employ_willexpire_cy})
         axios.get('/api/index/expiredList', {user_code:this.user_code}).then((v) => {this.data5=v;this.percentage5=v.company_expired_sc+v.company_expired_lt+v.company_expired_cy;this.percentage7=v.c_employ_expired_sc+v.c_employ_expired_lt+v.c_employ_expired_cy})
      axios.get('/api/company/search', params).then((v) => {
        this.tableData=v.companyList;
        this.tableData2=v.companyList;
         var companytype_name,filing_name;
        v.companyList.forEach((item,index)=>{
           if(item.companytype_code=='1001574645421581000000001'){companytype_name='食品生产'}else if(item.companytype_code=='1001574645421581000000002'){companytype_name='食品流通'}else if(item.companytype_code=='1001574645421581000000003'){companytype_name='食品餐饮'}
            if(item.filing_state=='1'){filing_name='待审核'}else if(item.filing_state=='3'){filing_name='已归档'}else if(item.filing_state=='4'){filing_name='已驳回'}
          dmtData.push({company_name:item.company_name,operator:item.operator,mobilephone:item.mobilephone,companytype_name:companytype_name,filing_name:filing_name,value:[item.longitude,item.latitude,item.filing_state]});
        })
         options.aa.series[0].data= dmtData
           var myCharts=echarts.init(this.$refs.map);
        myCharts.setOption(options.aa, true);
      })
       axios.get('/api/bigData/mapCompany', '').then((v) => {
        this.data1=v
      })
       axios.get('/api/bigData/company/food/source', {pager_openset:'100',}).then((v) => {
        this.tableData3=v.company_food_source_list
      })
       
      axios.get('/api/bigData/monitorDevice','').then((v) => {this.data2=v.monitor_list 
        progress1.series[0].data[0].value=v.monitor_list[2].svalue
        if(v.monitor_list[2].svalue>0){progress1.color[0]='#F47448'}
         var charts4 = echarts.init(document.getElementById("progress1"));
          charts4.setOption(progress1);
           progress2.series[0].data[0].value=v.monitor_list[9].svalue
           if(v.monitor_list[9].svalue>0){progress2.color[0]='#F47448'}
         var charts5 = echarts.init(document.getElementById("progress2"));
          charts5.setOption(progress2);
          progress3.series[0].data[0].value=v.monitor_list[3].svalue
           if(v.monitor_list[3].svalue>0){progress3.color[0]='#F47448'}
          var charts6 = echarts.init(document.getElementById("progress3"));
         charts6.setOption(progress3);
         progress4.series[0].data[0].value=v.monitor_list[4].svalue
         if(v.monitor_list[4].svalue>0){progress4.color[0]='#F47448'}
         var charts7 = echarts.init(document.getElementById("progress4"));
         charts7.setOption(progress4);
         progress5.series[0].data[0].value=v.monitor_list[6].svalue
         if(v.monitor_list[6].svalue>0){progress5.color[0]='#F47448'}
         var charts8 = echarts.init(document.getElementById("progress5"));
        charts8.setOption(progress5);
         progress6.series[0].data[0].value=v.monitor_list[8].svalue
         if(v.monitor_list[8].svalue>0){progress6.color[0]='#F47448'}
         var charts9 = echarts.init(document.getElementById("progress6"));
         charts9.setOption(progress6);
         progress7.series[0].data[0].value=v.monitor_list[5].svalue
         if(v.monitor_list[5].svalue>0){progress7.color[0]='#F47448'}
         var charts10 = echarts.init(document.getElementById("progress7"));
         charts10.setOption(progress7);
         progress8.series[0].data[0].value=v.monitor_list[7].svalue
        if(v.monitor_list[7].svalue>0){progress8.color[0]='#F47448'}
        var charts11 = echarts.init(document.getElementById("progress8"));
         charts11.setOption(progress8);
        })
      // axios.get('/api/bigData/train','').then((v) => {
      //      endPercent = (6 / v.train_list.length) * 100;
      //      v.train_list.forEach(item=>{
      //     option3.xAxis[0].data.push(item.region_name)
      //     option3.series[0].data.push(item.train_pass_count)
      //   })
      //    var charts3 = echarts.init(document.getElementById("main3"));
      //    charts3.setOption(option3);
      //     })
          axios.get('/api/bigData/cpList', '').then((v) => {
        this.data3=v;
        this.percentage1=Number(this.data3[1].svalue)
        this.percentage2=Number(this.data3[2].svalue)
        this.percentage3=Number(this.data3[3].svalue)
      })
    },
    init1(params){
           axios.get('/api/patrol/search', params).then((v) => {this.tableData1=v.pager_list;this.patrolCount=v.pager_count })
    },
    godetail(val,code){
      this.dialogTableVisible=true
       this.title=val;
       axios.get('/api/bigData/food/source/list', {company_code:code}).then((v) => {
       this.list1=v.food_source_list
      })
    },
    aaa(val){
     axios.get('/api/bigData/food/source/detail', {foodsource_code:val}).then((v) => {
       this.list2=v.food_source_deital_list
      })
    },
    drawPie() {
       option = {
        title: {
          text: "",
          subtext: " "
        },
        tooltip: { show: false },
        legend: {
          orient: "vertical",
          // x: "center",
          // y: "bottom",
          data: ["A同学成绩 "],
        },
        toolbox: {
          show: true,
          feature: {}
        },
        radar: [
          {
            name: {
              textStyle: {
                color: '#34ECB5',
               },
          },
            axisLine: {
              lineStyle: {
                color: "#29746d"
              }
            },
            splitLine: {
              show: true,
              lineStyle: {
                width: 1,
                color: "#29746d" // 设置网格的颜色
              }
            },
            splitArea : {show : true, 
                            areaStyle : {
                                color: ["#194255"] 
                            }
                        },
            indicator: [
              { text: "0", max: 50000}, //这里用于设置各轴的参数以及最大值
              { text: "0", max: 50000 },
              { text: "0", max: 50000 },
              { text: "0", max: 50000},
              { text: "0", max: 50000 }
            ],
            center: ["50%", "50%"],
            radius: 75
          }
        ],
        calculable: true,
        series: [
          {
            symbol: "none",
            name: "",
            type: "radar",
            itemStyle: {
              normal: {
                lineStyle: { color: ["#1ADFBB"] },
                areaStyle: {
                  opacity: 1,
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: "#48DAE3"
                    },
                    {
                      offset: 1,
                      color: "#1ADFBB"
                    }
                  ])
                }
              }
            },
            data: [
              {
                value: [1, 1, 1, 4, 1],
                ame: "A同学 "
              }
            ]
          }
        ]
      };
      // option3 = {
      //   title: {subtext: "单位：人",fontSize: 12,left: "5%",top: "-10px"},
      //   grid: {top: "20%",left: "5%",right: "5%",bottom: 0, containLabel: true},
      //   tooltip: {show: false},
      //   legend: { data: ["合格",'不合格'],textStyle: {fontSize: 12,color: "#F1F1F3"},right: "10%"},
      //   dataZoom: [{start:0,end: endPercent,type: 'slider',show: true,xAxisIndex: [0],handleSize: 0,height: 8,left: 35,right: 20,bottom: 10,handleStyle: {borderColor: "#cacaca",borderWidth: "1",shadowBlur: 2,background: "#ddd", },showDetail: false,},  
      //                      {type: 'inside',show: true,xAxisIndex: [0],start: 0,end: 50},  
      //                  ],
      //   calculable: true,
      //   xAxis: [{
      //       axisLabel: {color: "#315070",interval: 0,rotate: 30},
      //       axisLine: {lineStyle: { width: 1,color: "#315070"}},
      //       type: "category",
      //       axisTick: {show: false},
      //       data:[]
      //     }],
      //   yAxis: [{
      //       type: "value",splitLine: {show: true,lineStyle: {color: ["#315070"]}},
      //       axisTick: {show: false},
      //       axisLabel: {color: "#315070"},
      //       axisLine: {lineStyle: {width: 1,color: "#315070"}}
      //     }],
      //   series: [{name: "合格",type: "bar",barWidth: 10,data: [],color: "#31C1A7"},{name: "不合格",type: "bar",barWidth: 10,data: [],color: "#F47448"}]
      // };
       
        progress1 ={
         color:['#fff','#125D47'],
		      series: [
		        {type:'pie',radius: ['70%', '83%'],avoidLabelOverlap: false, hoverAnimation: false,labelLine: {normal: {show: false} },
		            data:[{value:20,name:'温度',selected:false,label: {normal: {show: true,position: 'center',fontSize: 13,formatter:'{b}\n{c}',}},},{value:100, label:{ normal:{show:false,}}},]
		        }
		     ]
        };
        progress2 ={
         color:['#fff','#125D47'],
		     series: [
		        {type:'pie',radius:['70%', '83%'],avoidLabelOverlap: false, hoverAnimation: false,labelLine: {normal: {show: false} },
		            data:[{value:20,name:'湿度',selected:false,label: {normal: {show: true,position: 'center',fontSize: 13,formatter:'{b}\n{c}',}},},{value:100, label:{ normal:{show:false,}}},]
		        }
		     ]
        };
        progress3 ={
         color:['#fff','#125D47'],
		     series: [
		        {type:'pie',radius:['70%', '83%'],avoidLabelOverlap: false, hoverAnimation: false,labelLine: {normal: {show: false} },
		            data:[{value:20,name:'烟雾',selected:false,label: {normal: {show: true,position: 'center',fontSize: 13,formatter:'{b}\n{c}',}},},{value:100, label:{ normal:{show:false,}}},]
		        }
		      ]
        };
        progress4 ={
         color:['#fff','#125D47'],
		     series: [
		        {type:'pie',radius:['70%', '83%'],avoidLabelOverlap: false, hoverAnimation: false,labelLine: {normal: {show: false} },
		            data:[{value:20,name:'甲烷',selected:false,label: {normal: {show: true,position: 'center',fontSize: 13,formatter:'{b}\n{c}',}},},{value:100, label:{ normal:{show:false,}}},]
		        }
		      ]
        };
        progress5 ={
         color:['#fff','#125D47'],
		     series: [
		        {type:'pie',radius:['70%', '83%'],avoidLabelOverlap: false, hoverAnimation: false,labelLine: {normal: {show: false} },
		            data:[{value:20,name:'CO',selected:false,label: {normal: {show: true,position: 'center',fontSize: 13,formatter:'{b}\n{c}',}},},{value:100, label:{ normal:{show:false,}}},]
		        }
		     ]
        };
        progress6 ={
         color:['#fff','#125D47'],
		      series: [
		        {type:'pie',radius:['70%', '83%'],avoidLabelOverlap: false, hoverAnimation: false,labelLine: {normal: {show: false} },
		            data:[{value:20,name:'PH',selected:false,label: {normal: {show: true,position: 'center',fontSize: 13,formatter:'{b}\n{c}',}},},{value:100, label:{ normal:{show:false,}}},]
		        }
		      ]
        };
        progress7 ={
         color:['#fff','#125D47'],
		      series: [
		        {type:'pie',radius:['70%', '83%'],avoidLabelOverlap: false, hoverAnimation: false,labelLine: {normal: {show: false} },
		            data:[{value:20,name:'液化气',selected:false,label: {normal: {show: true,position: 'center',fontSize: 13,formatter:'{b}\n{c}',}},},{value:100, label:{ normal:{show:false,}}},]
		        }
		      ]
         };
        progress8 ={
         color:['#fff','#125D47'],
	  	    series: [
		        {type:'pie',radius:['70%', '83%'],avoidLabelOverlap: false, hoverAnimation: false,labelLine: {normal: {show: false} },
		            data:[{value:20,name:'水质TDS',selected:false,label: {normal: {show: true,position: 'center',fontSize: 13,formatter:'{b}\n{c}',}},},{value:100, label:{ normal:{show:false,}}},]
		        }
		     ]
        };
    }
  }
};


</script>



<style scoped lang="scss">
.body {
  background-image: url("../../assets/image/dashuju.png");
  width: 100%;
  height: 100vh;
  position: fixed;
  z-index: -10;
  background-repeat: no-repeat;
  background-position: 0px 0px;
  background-size: 100% 100%;
}
.el-tooltip__popper {
  max-width: 60px;
}
 .active {
       background: #2EC68A;
    border-color: #2EC68A;
    color: #FFFFFF;
  }
  .el-button--mini{border-radius: 20px;}
.right_btn{position: absolute; right: 20px; top: 20px;}
.title {
  width: 100%;
  height: 12vh;
  text-align: left;
  padding: 10px 20px 10px 20px;
  color: #fff;
  font-size: 23px;
  background-size: 100% 100%;
  display: table;
  img{width:3rem;vertical-align: middle;}
  span{background:rgba(255,255,255,0.3); border-radius:24px;color: #34ECB5;padding: 6px 10px;vertical-align: middle;}
}
.title2{top: 10px;left:30px;}
.left-top,.right-center{
    .title1{
          display: flex;
    justify-content: space-between;
    align-items: center;
    }
  }
.box {
  color: #34ECB5;
  .grid-content1 {
    padding: 10px;
    height: 60px;
    line-height: 1.2;
    span {
      font-family: PingFang SC;
      font-weight: bold;
    }
  }
}
.el-row {
  &:last-child {
    margin-bottom: 0;
  }
}
.grid-content {
  width: 100%;
  height: 100%;
  border-radius: 4px;
  min-height: 36px;
 
}
.el-row1{ background:rgba(8,4,4,0.2);}
.scroll_bg {
  width: 100%;
  margin: auto;
  overflow: hidden;
  position: relative;
  color: #fff;
  li{display: flex;
  }
  li:nth-child(2n){
   background:rgba(255,255,255,0.1);
  }
  li:nth-child(2n+1){
   background:rgba(0,0,0,0);;
  }
}
.a {
  margin: auto;
}
.aa {
  width: 25%;
  float: left;
  padding-bottom: 5px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #fff;
}
.aa1 {
  width: 16.5%;
  float: left;
  padding-bottom: 5px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #fff;
}
li div {
  padding: 8px 5px;
  font-size: 12px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.aa_li div {
  width: 25%;
}
.aa1_li div {
  width: 16.5%;
}
.flex{  display: flex;  justify-content: center;}
.right-top{
  span{right: 15px;top: 0px;}
  /deep/ .el-progress{
 .el-progress-bar{width:55%;padding-right: 0; margin-right: 0;}
  .el-progress__text{font-size: 12px !important;color: #fff;}
  }
 
}
.grid-content1 {
 /deep/ .el-progress__text{display: none;}
}

/deep/ .el-progress-bar__outer{background-color: #125D47;    border-radius: 0px;}
/deep/ .el-progress-bar__inner{ border-radius: 0px;}

  .scroll-content {
    position: relative;
    transition: top 0.5s;
  }
  .scroll-content p {
    line-height: 30px;
    text-align: center;
  }
 /deep/ .el-dialog {background:#0D2B48;width:65%;color:#fff;height: 400px;
   .el-dialog__header{text-align: left;font-size: 14px;.el-dialog__title{color: #34ECB5;}}
   .el-dialog__body{padding-top: 0px;}
 }
 /deep/ .el-collapse{border:none;position: relative;padding-left:20px;height: 300px;overflow-y:scroll;
  .el-collapse-item__header{background:#091F2F;border-bottom:none;
  .flex{display: flex;align-items: center};
  .el-col-9{line-height: 1.5};
}
.el-collapse-item__arrow{color:#fff;}
.el-collapse-item__wrap{background:#0D2B48;border-bottom:none}
.el-collapse-item__content{padding-bottom: 0px;
.el-table{margin-bottom: 0px !important;background-color:#0D2B48 !important;tr,th,td{background-color:#0D2B48 !important;border-bottom:none}}
.el-table::before{height: 0;}
} 
}
.tap{
  width: 8px;
    height: 8px;
    font-family: 'ecoico';
    speak: none;
    font-style: normal;
    font-weight: normal;
    font-variant: normal;
    text-transform: none;
    font-size: 1.4em;
    line-height: 40px;
    -webkit-font-smoothing: antialiased;
    position: absolute;
    color: #fff;
    background: #0B2931;
    border-radius: 50%;
    box-shadow: 0 0 0 1px #34ECB5;
    text-align: center;
   
    margin: 0 0 0 -9px;
}
 .tap1{
     left: -5px;
    top: 20px;
}
 .tap2{
        left: 15px;
    bottom: -20px;
}
 .asa {
    content: '';
    position: absolute;
    top: 20px;
     left: 0px;
    width: 1px;
    background: #34ECB5;
    /* left: 20px; */
    height: 100%;
    margin-left: -10px;
}
/deep/ .v-modal{opacity: 0.75;}
  @media screen and (min-width: 1401px) {
 .right-top { span{right: 35px;font-size: 15px}} 
 /deep/ .el-progress{
    margin-bottom: 20px;
     .el-progress__text{font-size: 15px !important;margin-left: 30px;}
  }

}
</style>
