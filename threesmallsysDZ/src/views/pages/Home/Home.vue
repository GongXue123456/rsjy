<template>
  <el-container class="home">
    <el-main  class="p15 pt0">
      <div class="box add mb15">
      <el-row class="tl f14 home-nav">
        <el-col :span="8"
                class="bgcfff mr15">
          <div class="pt15 pl15"><img class="titletl mr5" 
                 src="../../../assets/image/home.png">待办事项</div>
           <div class="m15  c999">
            <div class="nav-grid1 bb f13 c999">
             <img  style="width:45px" class="vm" src="../../../assets/image/home1.png"><div  style="width:32.5%" class="ml10">待审核备案<br/><span class="f20 mt10  disib c333 mr5">{{data1.company_not_check}}</span>个</div><div  style="width:32.5%">已审核备案<br/><span class="f20 mt10 disib mr5">{{data1.company_pass_check}}</span>个</div><div  style="width:20%"><el-button size="mini" type="primary" class="bgccac"  @click="$router.push({path: 'produce'})">去审核</el-button></div>
            </div>
            <div class="nav-grid1 bb f14 c999">
             <img style="width:45px" class="vm" src="../../../assets/image/home2.png"><div  style="width:32.5%" class="ml10">待处理工单<br/><span class="f20 mt10  disib c333 mr5">{{data1.patrol_not_check}}</span>个</div><div  style="width:32.5%">已处理工单<br/><span class="f20 mt10 disib mr5">{{data1.patrol_pass_check}}</span>个</div><div style="width:20%"><el-button size="mini" type="primary" class="" @click="$router.push({path: 'patrol'})">去处理</el-button></div>
            </div>
            <div class="nav-grid1 bb f14 c999">
             <img style="width:45px" class="vm" src="../../../assets/image/home3.png"><div   style="width:32.5%" class="ml10">待处理投诉举报<br/><span class="f20 mt10  disib c333 mr5">{{data1.cr_not_check}}</span>个</div><div  style="width:32.5%">已处理投诉举报<br/><span class="f20 mt10 disib mr5">{{data1.cr_pass_check}}</span>个</div><div style="width:20%"><el-button size="mini" type="primary" class="bgecb bdecb" @click="$router.push({path: 'complaint'})">去处理</el-button></div>
            </div>
          </div>
        </el-col>
        <el-col :span="8"
                class="bgcfff mr15">
          <div class="pt15 pl15"><img class="titletl mr5" 
                 src="../../../assets/image/home.png">即将到期预警(备案证件)
                  <el-radio-group size="small" class="fr mr15" v-model="radio1" >
      <el-radio-button label="备案证件"></el-radio-button>
      <el-radio-button label="健康证"></el-radio-button>
           </el-radio-group>
                 </div>
          <div class="m15  c999">
            <div v-if="radio1=='备案证件'" class="nav-grid2 bf " @click="$router.push({name: 'Produce',query: {id:4}})">食品生产<div class="fr"><span class="num1">{{data2.company_willexpire_sc}}</span>个</div>
            <el-progress :percentage="data2.company_willexpire_sc" :stroke-width="8" color="#409eff"></el-progress>
            </div>
            <div v-if="radio1=='健康证'" class="nav-grid2 bf "  @click="$router.push({name: 'Employ',query: {id:4}})">食品生产<div class="fr"><span class="num1">{{data2.c_employ_willexpire_sc}}</span>个</div>
            <el-progress :percentage="data2.c_employ_willexpire_sc" :stroke-width="8" color="#409eff"></el-progress>
            </div>
            <div v-if="radio1=='备案证件'" class="nav-grid2 bf "  @click="$router.push({name: 'Circulate',query: {id:4}})">食品流通<div class="fr"><span class="num1">{{data2.company_willExpire_lt}}</span>个</div>
            <el-progress :percentage="data2.company_willExpire_lt" :stroke-width="8" color="#ECB257"></el-progress>
            </div>
            <div v-if="radio1=='健康证'" class="nav-grid2 bf "  @click="$router.push({name: 'Employ',query: {id:4}})">食品流通<div class="fr"><span class="num1">{{data2.c_employ_willexpire_lt}}</span>个</div>
            <el-progress :percentage="data2.c_employ_willexpire_lt" :stroke-width="8" color="#ECB257"></el-progress>
            </div>
            <div v-if="radio1=='备案证件'" class="nav-grid2 bf "  @click="$router.push({name: 'Restaurant',query: {id:4}})">食品餐饮<div class="fr"><span class="num1">{{data2.company_willexpire_cy}}</span>个</div>
            <el-progress :percentage="data2.company_willexpire_cy" :stroke-width="8" color="#25C08B"></el-progress>
            </div>
             <div v-if="radio1=='健康证'" class="nav-grid2 bf "   @click="$router.push({name: 'Employ',query: {id:4}})">食品餐饮<div class="fr"><span class="num1">{{data2.c_employ_willexpire_cy}}</span>个</div>
            <el-progress :percentage="data2.c_employ_willexpire_cy" :stroke-width="8" color="#25C08B"></el-progress>
            </div>
          </div>
        </el-col>
         <el-col :span="8"
                class="bgcfff ">
          <div class="pt15 pl15"><img class="titletl mr5" 
                 src="../../../assets/image/home.png">过期预警(备案证件)
                  <el-radio-group size="small" class="fr mr15" v-model="radio2">
      <el-radio-button label="备案证件"></el-radio-button>
      <el-radio-button label="健康证"></el-radio-button>
           </el-radio-group>
                 </div>
          <div class="m15  c999">
            <div v-if="radio2=='备案证件'" class="nav-grid2 bf " @click="$router.push({name: 'Produce',query: {id:2}})">食品生产<div class="fr"><span class="num1">{{data3.company_expired_sc}}</span>个</div>
            <el-progress  :percentage="data3.company_expired_sc" :stroke-width="8" color="#BFBFBF"></el-progress>
            </div>
            <div v-if="radio2=='备案证件'" class="nav-grid2 bf "  @click="$router.push({name: 'Circulate',query: {id:2}})">食品流通<div class="fr"><span class="num1">{{data3.company_expired_lt}}</span>个</div>
            <el-progress :percentage="data3.company_expired_lt" :stroke-width="8" color="#BFBFBF"></el-progress>
            </div>
            <div v-if="radio2=='备案证件'" class="nav-grid2 bf "  @click="$router.push({name: 'Restaurant',query: {id:2}})">食品餐饮<div class="fr"><span class="num1">{{data3.company_expired_cy}}</span>个</div>
            <el-progress :percentage="data3.company_expired_cy" :stroke-width="8" color="#BFBFBF"></el-progress>
            </div>
            <div v-if="radio2=='健康证'" class="nav-grid2 bf "  @click="$router.push({name: 'Employ',query: {id:2}})">食品生产<div class="fr"><span class="num1">{{data3.c_employ_expired_sc}}</span>个</div>
            <el-progress  :percentage="data3.c_employ_expired_sc" :stroke-width="8" color="#BFBFBF"></el-progress>
            </div>
            <div v-if="radio2=='健康证'" class="nav-grid2 bf "  @click="$router.push({name: 'Employ',query: {id:2}})">食品流通<div class="fr"><span class="num1">{{data3.c_employ_expired_lt}}</span>个</div>
            <el-progress :percentage="data3.c_employ_expired_lt" :stroke-width="8" color="#BFBFBF"></el-progress>
            </div>
            <div v-if="radio2=='健康证'" class="nav-grid2 bf "  @click="$router.push({name: 'Employ',query: {id:2}})">食品餐饮<div class="fr"><span class="num1">{{data3.c_employ_expired_cy}}</span>个</div>
            <el-progress :percentage="data3.c_employ_expired_cy" :stroke-width="8" color="#BFBFBF"></el-progress>
            </div>
          </div>
        </el-col>
      </el-row>
      </div>
     <el-row class="tl f14 home-content">
      <el-col :span="10"
              class="bgcfff mr15">
        <div class="">
          <div class="content-grid1  ">
            <div class="pt15 pl15"><img class="titletl mr5" 
                 src="../../../assets/image/home.png">今日新增食品经营责任人</div>
            <el-row class="tl f14 home-nav">
              <el-col :span="8">
                <div class="grid1-left  tc"> <img src="../../../assets/image/shangjia.png">
                  <p><span class="num c333 mr5">{{data4.company_today_all}}</span>家</p>
                  <el-tag class="mb10"  type="info">累计 {{data4.company_all}}</el-tag>
                </div>
              </el-col>
              <el-col :span="16">
                <div class="" id="main" style="width: 100%;height:230px;"></div>
              </el-col>
            </el-row>
            <el-row class="tc c999 f13 home-nav" >
               <el-col :span="8" class="Clearfix"><p class="mb10">食品生产</p><p class="f20 c333 mb10">{{data4.company_today_all_sc}}</p><el-tag class="mb10" size="small" type="info">累计 {{data4.company_all_sc}}</el-tag></el-col>
             <el-col :span="8" class="Clearfix"><p class="mb10">食品流通</p><p class="f20 c333 mb10">{{data4.company_today_all_lt}}</p><el-tag class="mb30" size="small" type="info">累计 {{data4.company_all_lt}}</el-tag></el-col>
              <el-col :span="8" class="Clearfix"><p class="mb10">食品餐饮</p><p class="f20 c333 mb10">{{data4.company_today_all_cy}}</p><el-tag class="mb30" size="small" type="info">累计 {{data4.company_all_cy}}</el-tag></el-col>
            </el-row>

          </div>
          <div class="jiange bgcf5"></div>
          <div class="grid1 bgcfff ">
            <div class="pt15 pl15"><img class="titletl mr5" 
                 src="../../../assets/image/home.png">今日备案管理情况</div>
                  <!--  -->
                   <el-row class="tc c999 f13 home-nav" >
               <el-col :span="8" class="Clearfix"><div class="" id="main1" style="width: 100%;height:170px;"> </div><el-tag class="mb10" size="small" type="info">累计 {{data5.company_not_check_all}}</el-tag></el-col>
              <el-col :span="8" class="Clearfix"><div class="" id="main2" style="width: 100%;height:170px;"></div><el-tag class="mb10" size="small" type="info">累计 {{data5.company_pass_check_all}}</el-tag></el-col>
               <el-col :span="8" class="Clearfix"><div class="" id="main3" style="width: 100%;height:170px;"> </div><el-tag class="mb10" size="small" type="info">累计 {{data5.company_goback_check_all}}</el-tag></el-col>
            </el-row>
          </div>

        </div>

      </el-col>
      <el-col :span="14"
              class="bgcfff">
        <div class="p15 "><img class="titletl mr5" 
                 src="../../../assets/image/home.png">今日巡查情况<el-button size="mini" type="primary" class="fr" @click="$router.push({path: 'map'})">进入GIS地图</el-button></div>
        <div ref="map" class="fl" style="height:350px;width:30%;" >
          <div class="nav-grid3 p15 f13 c999">
             <img class="vm" src="../../../assets/image/home4.png"><div class="ml30"><span class="f20  mb10 disib c333 mr5">{{data9.patrol_not_check}}</span><br/>待巡查</div>
            </div>
            <div class="nav-grid3 p15 f14 c999">
             <img class="vm" src="../../../assets/image/home5.png"><div class="ml30"><span class="f20  mb10 disib c333 mr5">{{data9.patrol_pass_check}}</span><br/>已巡查</div>
            </div>
            <div class="nav-grid3 p15 f14 c999">
             <img class="vm" src="../../../assets/image/home6.png"><div class="ml30"><span class="f20 mb10  disib c333 mr5">{{data9.patrol_pass_check_yes}}</span><br/>巡查合格</div>
            </div>
            <div class="nav-grid3 p15 f14 c999">
             <img class="vm" src="../../../assets/image/home7.png"><div class="ml30"><span class="f20 mt10  disib c333 mr5">{{data9.patrol_pass_check_no}}</span><br/>巡查不合格</div>
            </div>
        </div>
        <div ref="map" class="fl p10 pr10" style="height:350px;width:70%;" ></div>
        <!-- <baidu-map class="Bmap"
                   ak="oqnvdL14rNlcc5gi520BAbRZlW57T4NI"
                   :center="center"
                   :zoom="zoom"
                   @ready="handler"
                   :scroll-wheel-zoom="true">
          <bm-map-type :map-types="['BMAP_HYBRID_MAP','BMAP_NORMAL_MAP']"
                       anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-map-type>
          <bm-city-list anchor="BMAP_ANCHOR_TOP_RIGHT"
                        :offset="{width:100,height:10}"></bm-city-list>

          <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
                          :showAddressBar="true"
                          :autoLocation="true"></bm-geolocation>
          <div v-for="(marker, i) of markers"
               :key="i">
            <bm-marker :position="{lng: marker.lng, lat: marker.lat}"
                       :dragging="false"
                       @click="infoWindowOpen(marker)"
                       :icon="{url:require('../../../assets/image/address.png') , size: {width: 40, height: 40}}">
              <bm-info-window :show="marker.showFlag"
                              @close="infoWindowClose(marker)"
                              style="width:200px"
                              title="详细信息"
                              :position="{lng: marker.lng, lat: marker.lat}"
                              @open="infoWindowOpen(marker)"
                              class="f14 c666">
                <p>主体名称：<span class="c666">{{marker.name}}</span></p>
                <p>主体类型：<span class="c666">{{marker.type}}</span></p>
                <p>经营地址：<span class="c666">{{marker.address}}</span></p>
              </bm-info-window>
            </bm-marker>
          </div>
        </baidu-map> -->
        <div class="clear" style="height:300px;">
           <el-table :data="tableData" style="width: 100%"  id='out-table'>
         <el-table-column prop="work_order"  min-width="80" :show-overflow-tooltip="true"  label="工单编号" align='center' ></el-table-column>
         <el-table-column prop="patrol_user_name" min-width="80" :show-overflow-tooltip="true" label="巡查人" align='center'></el-table-column>
         <el-table-column prop="company_name" min-width="80" :show-overflow-tooltip="true"  label="巡查对象" align='center'></el-table-column>
         <el-table-column  prop="patrol_time"   min-width="80" :show-overflow-tooltip="true" label="巡查时间" align='center'></el-table-column>
         <el-table-column prop="location" min-width="80" :show-overflow-tooltip="true"  label="巡查地址" align='center'>
         </el-table-column>
        <el-table-column   min-width="80" :show-overflow-tooltip="true" label="巡查结果" align='center'>
            <template slot-scope="scope">
              <span v-if="scope.row.patrol_result=='不合格'" class="red">不合格</span>
              <span v-else-if="scope.row.patrol_result=='合格'">合格</span>
               <span v-else>---</span>
        </template>
        </el-table-column>
        <el-table-column label="操作" class-name='aa'  fixed="right" min-width="50"  align='center'>
          <template slot-scope="scope">
            <el-button   type="text" class="general_color disib"  size="mini"  @click="$router.push({name: 'AddDetail',query: {
          name:scope.row.company_name,
          code: scope.row.patrol_code,
        }
      })">详情</el-button>
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
         <!-- <div class='container'>
          <div class='mychart' id='mychart'></div>
         </div> -->
      </el-col>
    </el-row>
    <el-row class="mt15 home-nav tl f14 home-content el-row">
        <el-col :span="8" class=" mr15">
             <div class="content-grid1 bgcfff ">
            <div class="pt15 pl15"><img class="titletl mr5" 
                 src="../../../assets/image/home.png">备案审核率环比</div>
            <el-row class="tl f14 home-nav">
              <el-col :span="8">
                <div class="grid1-left  tc"> 
                    <div><span class="cercle mr10"></span><span class=" c333 mr5 ">上月</span><p class="mt10 ml30"><span class="f20">{{data6.last_company_pass_check}}</span>/{{data6.last_company_no_check+data6.last_company_pass_check}}</p></div>
                    <div class="mt10"><span class="cercle mr10 general_bgc"></span><span class=" c333 mr5 ">本月</span><p class="mt10 ml30"><span class="f20 general_color">{{data6.company_pass_check}}</span>/{{data6.company_pass_check+data6.company_no_check}}</p></div>
                </div>
              </el-col>
              <el-col :span="16">
                 <div id="pie"  style="height:220px;"></div>
              </el-col>
                 </el-row>
                  </div>
              </el-col>
               
        <el-col :span="8" class=" mr15">
             <div class="content-grid1 bgcfff ">
            <div class="pt15 pl15"><img class="titletl mr5" 
                 src="../../../assets/image/home.png">巡查合格率环比</div>
            <el-row class="tl f14 home-nav">
              <el-col :span="8">
                <div class="grid1-left  tc"> 
                    <div><span class="cercle mr10"></span><span class=" c333 mr5 ">上月</span><p class="mt10 ml30"><span class="f20">{{data7.last_patrol_check_yes}}</span>/{{data7.last_patrol_check_all}}</p></div>
                    <div class="mt10"><span class="cercle mr10 general_bgc"></span><span class=" c333 mr5 ">本月</span><p class="mt10 ml30"><span class="f20 general_color">{{data7.patrol_check_yes}}</span>/{{data7.patrol_check_all}}</p></div>
                </div>
              </el-col>
              <el-col :span="16">
                 <div id="pie1"  style="height:220px;"></div>
              </el-col>
                 </el-row>
                  </div>
              </el-col>
              <el-col :span="8" class=" ">
             <div class="content-grid1 bgcfff ">
            <div class="pt15 pl15"><img class="titletl mr5" 
                 src="../../../assets/image/home.png">考试通过率环比</div>
            <el-row class="tl f14 home-nav">
              <el-col :span="8">
                <div class="grid1-left  tc"> 
                    <div><span class="cercle mr10"></span><span class=" c333 mr5 ">上月</span><p class="mt10 ml30"><span class="f20">{{data8.exam_pass_count_pre_month}}</span>/{{data8.exam_count_pre_month}}</p></div>
                    <div class="mt10"><span class="cercle mr10 general_bgc"></span><span class=" c333 mr5 ">本月</span><p class="mt10 ml30"><span class="f20 general_color">{{data8.exam_pass_count_cur_month}}</span>/{{data8.exam_count_cur_month}}</p></div>
                </div>
              </el-col>
              <el-col :span="16">
                 <div id="pie2"  style="height:220px;"></div>
              </el-col>
                 </el-row>
                  </div>
              </el-col>
    </el-row>
     
    </el-main>
  </el-container>
</template>
<script>
import axios from '../../../util/api'
import { local } from '../../../util/util'
import md5 from 'js-md5';
var echarts = require('echarts/lib/echarts');
import options from "./js/map"; 
import 'echarts/map/js/province/sichuan.js'; 
// 引入柱状图
require('echarts/lib/chart/bar');
require('echarts/lib/chart/pie');
// 引入提示框和标题组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/legend');
require('echarts/lib/component/title');

let option;
let option1,option11,option111;
let option2,option3,option4;
     var BorderWidth = '10';
      var mapData = []
      let dmtData=[]
export default {
  data () {
    return {
      list:'',
       radio1: '备案证件',
       radio2: '备案证件',
       percentage:20,
       data1:'',
       data2:'',
       data3:'',
       data4:'',
       data5:'',
       data6:'',
       data7:'',
        data8:'',
        data9:'',
        currentPage: 1,
      total: 0,
      page:{pager_offset:'0',pager_openset:'5'},
         tableData:[],
      list1:[],
      list2:[],
      list3:'',
      center: { lng: 0, lat: 0 },
      zoom: 3,　 //地图展示级别
    }
  },
  mounted () {
    this.drawChart();
    //  this.mapEchartsInit();
  },
   created () {
    this.init()
    const secounds = 5
    let num = 0
    const timer = setInterval(() => {
      if(num < secounds) {
        num++
      }else {
        clearInterval(timer)
        this.init1(this.page)
      }
    }, 1000)
  },
  methods: {
     // 分页
    currentChange(page){
      this.currentPage = page;
      this.page.pager_offset = String((page - 1) * 5)
      this.init1(this.page)
    },
     init () {
       let usercode = local.get('usercode')
        axios.get('/api/index/todoList', {user_code:usercode}).then((v) => {this.data1=v})
        axios.get('/api/index/willExpireList', {user_code:usercode}).then((v) => {this.data2=v})
         axios.get('/api/index/expiredList', {user_code:usercode}).then((v) => {this.data3=v})
      axios.get('/api/index/newSaveList', {user_code:usercode}).then((v) => {
        this.data4=v;
        if(v!=''){
       option.series[0].data[0].value=v.company_all_sc
       option.series[0].data[1].value=v.company_all_lt
       option.series[0].data[2].value=v.company_all_cy;
      
        }
        let myChart = echarts.init(document.getElementById("main"));
       myChart.setOption(option);
      })
     axios.get('/api/index/todayCompanyList', {user_code:usercode}).then((v) => {
        this.data5=v;
        if(v!=''){
       option1.series[0].data[0].value=v.company_not_check
       option11.series[0].data[0].value=v.company_pass_check
       option111.series[0].data[0].value=v.company_goback_check
        }
          let myChart1 = echarts.init(document.getElementById("main1"));
          let myChart2 = echarts.init(document.getElementById("main2"));
          let myChart3 = echarts.init(document.getElementById("main3"));
       myChart1.setOption(option1);
         myChart2.setOption(option11);
           myChart3.setOption(option111);
      })
   axios.get('/api/index/companyCheckRate', {user_code:usercode}).then((v) => {
        this.data6=v;
         option2.series[0].data[0].label.normal.formatter=v.chain_rate+'%';
          option2.series[0].data[0].value=v.last_company_pass_check;
           if(v.last_company_no_check==0){ option2.series[0].data[1].value=100}else{  option2.series[0].data[1].value=v.last_company_no_check}
          option2.series[1].data[0].value=v.company_pass_check;
          if(v.company_no_check==0){option2.series[1].data[1].value=100}else{ option2.series[1].data[1].value=v.company_no_check}
      let myChart4 = echarts.init(document.getElementById('pie'));
           myChart4.setOption(option2);
      })
      axios.get('/api/index/patrolCheckRate', {user_code:usercode}).then((v) => {
        this.data7=v;
         option3.series[0].data[0].label.normal.formatter=v.chain_rate+'%';
          option3.series[0].data[0].value=v.last_patrol_check_yes;
          if(v.last_patrol_check_all==0){ option3.series[0].data[1].value=100}else{ option3.series[0].data[1].value=v.last_patrol_check_all-v.last_patrol_check_yes}
          option3.series[1].data[0].value=v.patrol_check_yes;
          if(v.patrol_check_all==0){ option3.series[1].data[1].value=100}else{option3.series[1].data[1].value=v.patrol_check_all-v.patrol_check_yes}
         
         let myChart5 = echarts.init(document.getElementById('pie1'));
           myChart5.setOption(option3);
      })  
     axios.get('/api/index/exam', {user_code:usercode}).then((v) => {
        this.data8=v.exam[0];
         option4.series[0].data[0].label.normal.formatter=this.data8.link_rate+'%';
          option4.series[0].data[0].value=this.data8.exam_pass_count_pre_month;
           if(v.last_patrol_check_all==0){ option4.series[0].data[1].value=100}else{  option4.series[0].data[1].value=this.data8.exam_count_pre_month-this.data8.exam_pass_count_pre_month}
          option4.series[1].data[0].value=this.data8.exam_pass_count_cur_month;
           if(v.last_patrol_check_all==0){option4.series[1].data[1].value=100}else{  option4.series[1].data[1].value=this.data8.exam_count_cur_month-this.data8.exam_pass_count_cur_month}
         
        let myChart6 = echarts.init(document.getElementById('pie2'));
           myChart6.setOption(option4);
      }) 
      


    },
    init1(params){
      axios.get('/api/index/gisMapList',params).then((v) => {
        this.data9=v;
        this.tableData=v.patrol_list;
        this.total=v.pager_count;
      // 
        v.patrol_list.forEach((item,index)=>{
          dmtData.push({name:'',value:[item.longitude,item.latitude,index]});
        })
options.series[0].data= dmtData
           var myChart=echarts.init(this.$refs.map);
    myChart.setOption(options, true);
       
      }) 
    },
    checkradio1(val){},
    drawChart () {
      // 基于准备好的dom，初始化echarts实例
      // let myChart = this.$echarts.init(document.getElementById("main"));
      // let myChart1 = this.$echarts.init(document.getElementById("main1"));
      // 指定图表的配置项和数据
       option1 ={
         color:['#25C08B','#F2F5FA'],
		    series: [
		        {type:'pie',radius: ['65%', '75%'],avoidLabelOverlap: false, hoverAnimation: false,labelLine: {normal: {show: false} },
		            data:[{value:20,name:'待审核',selected:false,label: {normal: {show: true,position: 'center',fontSize: 15,formatter:'{b}\n\n{c}',}},},{value:100, label:{ normal:{show:false,}}},]
		        }
		    ]
       };
       option11 ={
         color:['#60BAF3','#F2F5FA'],
		    series: [
		        {type:'pie',radius: ['65%', '75%'],avoidLabelOverlap: false, hoverAnimation: false,labelLine: {normal: {show: false} },
		            data:[{value:20,name:'审核通过',selected:false,label: {normal: {show: true,position: 'center',fontSize: 15,formatter:'{b}\n\n{c}',}},},{value:100, label:{ normal:{show:false,}}},]
		        }
		    ]
       };
       option111 ={
         color:['#ECB257','#F2F5FA'],
		    series: [
		        {type:'pie',radius: ['65%', '75%'],avoidLabelOverlap: false, hoverAnimation: false,labelLine: {normal: {show: false} },
		            data:[{value:20,name:'已驳回',selected:false,label: {normal: {show: true,position: 'center',fontSize: 15,formatter:'{b}\n\n{c}',}},},{value:100, label:{ normal:{show:false,}}},]
		        }
		    ]
	   	};
      // myChart1.setOption(option1);
      option = {
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        grid: { top: '8%', right: '2%', left: '12%'},
        color: ['#41D590', '#0DB5EF', '#92E6FF'],
        legend: {
           show: false,
          // orient: 'vertical',
          icon: "circle",
          itemHeight: 9,//改变圆圈大小
          bottom: 0,
          textStyle: {
            fontSize: 10
          },
          data: ['食品生产','食品流通', '食品餐饮']
        },
        series: [
          {
            name: '详细信息',
            type: 'pie',
            radius: ['35%', '50%'],
            center: ['50%', '50%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: true,
                // position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '20',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: true
              }
            },
            data: [
              { value: '0', name: '食品生产' },
              { value: '0', name: '食品流通' },
              { value: '0', name: '食品餐饮' },
            ],
            itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                   hoverAnimation:false,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                },
                normal:{
                  label:{
                    show: true,
                    formatter: '{b}' // 展示具体数值，b：展示数据的名称； c：展示数据的值
                  },
                  labelLine :{show:true} // 是否显示线
                }
              }
          }
        ]
      };
      option2={
        color:['#dc1439','#e6b600','#053afe'],
        series: [
            {
                type:'pie',
                clockWise: true,
                hoverAnimation: false,
                radius: ['50%', '40%'],//环的位置
                label: {normal: {position: 'inner'}},
                labelLine: { normal: { show: false } },
                data:[
                    {value:'', //需要显示的数据
		                    selected:false,
		                    label: {
				                normal: {
				                    show: true,
				                    position: 'center',
                            fontSize: 14,
                            formatter:'',
                  //           formatter : function(params) {
                  //   var res = '';
                  //   	res += ' '+ '\n {img1|}' + 11
									// 	return res;
                  // },
                  // rich : {
									// 	img1 : {
									// 		backgroundColor : {
									// 			image : '../../../assets/image/home.png'
									// 		},
									// 	},
									// 	},
				                }
		               
		            		},
                    itemStyle: {
                                normal: {
                                 color: '#C6CAD1'
                                }
                     }},
                   {value:'',
                    itemStyle: {
                                normal: {
                                 color: '#F2F5FA'
                                }
                     }}
                ]
            },
            { 
                type:'pie',
                clockWise: true,
                hoverAnimation: false,
                radius: ['60%', '70%'],
                label: {  normal: { position: 'inner' } },
                labelLine: {  normal: { show: false } },
                data:[
                    {value:'', 
                    itemStyle: {
                                normal: {
                                 color: '#25C08B'
                                }
                     }},
                   {value:'', 
                    itemStyle: {
                                normal: {
                                 color: '#F2F5FA'
                                }
                     },
                   }
                ]
            },
        ]
};
option3={
        color:['#dc1439','#e6b600','#053afe'],
        series: [
            {
                type:'pie',
                clockWise: true,
                hoverAnimation: false,
                radius: ['50%', '40%'],//环的位置
                label: {normal: {position: 'inner'}},
                labelLine: { normal: { show: false } },
                data:[
                    {value:10, //需要显示的数据
		                    selected:false,
		                    label: {
				                normal: {
				                    show: true,
				                    position: 'center',
				                    fontSize: 14,
				                    formatter: '10',
				                }
		               
		            		},
                    itemStyle: {
                                normal: {
                                 color: '#C6CAD1'
                                }
                     }},
                   {value:90,
                    itemStyle: {
                                normal: {
                                 color: '#F2F5FA'
                                }
                     }}
                ]
            },
            { 
                type:'pie',
                clockWise: true,
                hoverAnimation: false,
                radius: ['60%', '70%'],
                label: {  normal: { position: 'inner' } },
                labelLine: {  normal: { show: false } },
                data:[
                    {value:20, 
                    itemStyle: {
                                normal: {
                                 color: '#ECB257'
                                }
                     }},
                   {value:80, 
                    itemStyle: {
                                normal: {
                                 color: '#F2F5FA'
                                }
                     },
                   }
                ]
            },
        ]
};
option4={
        color:['#dc1439','#e6b600','#053afe'],
        series: [
            {
                type:'pie',
                clockWise: true,
                hoverAnimation: false,
                radius: ['50%', '40%'],//环的位置
                label: {normal: {position: 'inner'}},
                labelLine: { normal: { show: false } },
                data:[
                    {value:10, //需要显示的数据
		                    selected:false,
		                    label: {
				                normal: {
				                    show: true,
				                    position: 'center',
				                    fontSize: 14,
				                    formatter: '10',
				                }
		               
		            		},
                    itemStyle: {
                                normal: {
                                 color: '#C6CAD1'
                                }
                     }},
                   {value:90,
                    itemStyle: {
                                normal: {
                                 color: '#F2F5FA'
                                }
                     }}
                ]
            },
            { 
                type:'pie',
                clockWise: true,
                hoverAnimation: false,
                radius: ['60%', '70%'],
                label: {  normal: { position: 'inner' } },
                labelLine: {  normal: { show: false } },
                data:[
                    {value:20, 
                    itemStyle: {
                                normal: {
                                 color: '#60BAF3'
                                }
                     }},
                   {value:80, 
                    itemStyle: {
                                normal: {
                                 color: '#F2F5FA'
                                }
                     },
                   }
                ]
            },
        ]
};


    },
//     mapEchartsInit(){
//     var myChart=echarts.init(this.$refs.map);
//     myChart.setOption(options, true);
// },
    handler ({ BMap, map }) {
      this.center.lng = 104.06
      this.center.lat = 30.67
      this.zoom = 10
    },
    infoWindowClose (marker) {
      marker.showFlag = false
    },
    infoWindowOpen (marker) {
      marker.showFlag = true
    }

 }}
</script>
<style lang="scss" scoped>
.home {
  height: auto;
  background-color: #f7f8f9;
  overflow-x: hidden;
  .titletl{width: 10px;}
  .home-nav {
    display: flex;
    justify-content: center;
  }
  .nav-grid {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 230px;
    img {
      width: 25px;
    }
    .num {
      font-size: 36px;
    }
  }
  .nav-grid1 {
    height: 80px;
    // line-height: 80px;
        display: flex;
        // padding: 0px 5px;
    /* justify-content: space-between; */
    align-items: center;
    img{width: 45px;}
    .num1 {
      font-size: 24px;
      margin-right: 5px;
      color: #333;
    }
  }
  .nav-grid3 {
    margin-bottom: 10px;
    box-shadow: 8px 8px 8px #F6F3F7;
        display: flex;
    align-items: center;
    img{width: 45px;}
  }
  .nav-grid2 {
    height: 80px;
    padding-top: 16px;
    img{width: 45px;}
    .num1 {
      font-size: 24px;
      margin-right: 5px;
      color: #333;
    }
    /deep/ .el-progress-bar{
          padding-right: 0px;
    margin-right: 0px;
    }
    /deep/ .el-progress__text{display: none;}
  }
  .el-radio-group{margin-top: -10px;}
  .home-content {
    display: flex;
    justify-content: center;
  }
  .content-grid1 {
   .grid1-left img {
      width: 42px;
    }
    .el-col-8 {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .num {
      font-size: 36px;
    }
  }
  .jiange {
    height: 10px;
  }
  .Bmap {
    width: 100%;
    height: 100vh;
  }
  .cercle{
    width:10px;
    display: inline-block;
height:10px;
background:rgba(166,166,166,1);
border-radius:50%;
  }
 /deep/ .el-table{
     th,td {
    padding: 9px 0 !important;}
 }

}
</style>