<template>
  <div class="body">
    <div class="title" ref="Top"><img class="mr10" src="../../assets/image/dashujulogo.png"/>空港食品小作坊集约发展示范中心大数据平台<div  class="right_btn f13 cfff disib"><p class="f18 disib ml10">{{dateTime}}</p><p class="f45 dateTime1 disib ml20 mr20">{{dateTime1}}</p>
            </div></div>
    <div class="box" ref="Box">
      <el-row class="el-row1">
       <el-col :span="6">
         <div class="left-top w fl " >
          <div class="p20">
            <div class="title1 p10 tl f20">小作坊采购数据</div>
            <div class="clear mt10 w f14">
              <div class="aa">小作坊名称</div>
              <div class="aa">采购类目</div>
              <div class="aa">采购时间</div>
              <div class="aa">采购数量</div>
 
              <div class="scroll_bg" ref="scrollBg1" id="box" style="height:186px">
                 <vue-seamless-scroll :data="tableData" :class-option="optionSetting" class="seamless-warp">
          <ul class="item">
            <li v-for="(item, index) in tableData" :key="index" class="aa_li">
                <div class="fl">{{item.company_name}}</div>
          <div class="fl ">{{item.category_name}}</div>
          <div class="fl ">{{item.buy_time?item.buy_time:'--'}}</div>
            <div class="fl " >{{item.orderdetail_buyer_count?item.orderdetail_buyer_count:'--'}}</div>
            </li>
          </ul>
      </vue-seamless-scroll>
              </div>
            </div>
            <el-row class="cfff mt20 f14" style="height: 110px;">
              <el-col v-for="(item,index) in list.slice(0,9)" :key="index" :span="8" class="pt5 tl pb5"><span class="tag disib" :class="index+1>3?'tag2':'tag1'">{{index+1}}</span><span class="ml15 mr15">{{item.category_name}}</span>{{Number(item.category_ratio).toFixed(0)}}%</el-col>
            </el-row>
          </div>
          <div class="left-bottom w mt10 p20" ref="leftBottom">
            <div class="title1 p10 tl f20">食品安全检测</div>
            <div class="clear mt10 w f14">
              <div class="aa1">商品编号</div>
              <div class="aa1">检测项目</div>
              <div class="aa1">标准要求/限量</div>
              <div class="aa1">检测结果</div>
              <div class="aa1">单项判定</div>
              <div class="scroll_bg" ref="scrollBg1" id="box" style="height:230px">
                 <vue-seamless-scroll :data="tableData1" :class-option="optionSetting" class="seamless-warp">
          <ul class="item">
            <li v-for="(item, index) in tableData1" :key="index" class="aa1_li">
                <div class="fl">{{item.fast_check_num}}</div>
          <div class="fl " v-if="item.fast_check_project=='1'">甲醛</div>
          <div class="fl " v-else-if="item.fast_check_project=='2'">双氧水</div>
          <div class="fl " v-else-if="item.fast_check_project=='3'">农药残留</div>
          <div class="fl " v-else-if="item.fast_check_project=='4'">孔雀石绿</div>
          <div class="fl " v-else-if="item.fast_check_project=='5'">呋喃类</div>
          <div class="fl " v-else-if="item.fast_check_project=='6'">氯霉素</div>
          <div class="fl " v-else-if="item.fast_check_project=='7'">瘦肉精</div>
          <div class="fl " v-else-if="item.fast_check_project=='8'">菌落总数</div>
          <div class="fl " v-else-if="item.fast_check_project=='9'">大肠菌群</div>
          <div class="fl " v-else-if="item.fast_check_project=='10'">挥发性盐基氮</div>
          <div class="fl " v-else-if="item.fast_check_project=='11'">其他理化指标</div>
          <div class="fl " v-if="item.fast_check_standard=='1'">适量添加</div>
          <div class="fl " v-else-if="item.fast_check_standard=='2'">n=5,c=2,m=104,M=105</div>
          <div class="fl " v-else-if="item.fast_check_standard=='3'">&lt;15 </div>
          <div class="fl " v-else-if="item.fast_check_standard=='4'">不得检出</div>
          <div class="fl " v-else-if="item.fast_check_standard=='5'">未检出</div>
          <div class="fl " v-if="item.fast_check_result=='1'">阴性</div>
          <div class="fl " v-else-if="item.fast_check_result=='2'">阳性</div>
            <div class="fl " v-if="item.fast_check_conclusion=='1'">合格</div>
          <div class="fl cff5" v-else-if="item.fast_check_conclusion=='2'">不合格</div>
            </li>
          </ul>
      </vue-seamless-scroll>
              </div>
            </div>
            <el-row class="cfff mt15 f14" >
                <el-col :span="8" class="flex"><canvas id="canvas1" width="135" height="135"></canvas></el-col>
                <el-col :span="8" class="flex"><canvas id="canvas2" width="135" height="135"></canvas></el-col>
                <el-col :span="8" class="flex"><canvas id="canvas3" width="135" height="135"></canvas></el-col>
            </el-row>
          </div>
        </div>
       </el-col>
       <el-col :span="12" class="ml10 mr10">
         <div class="center-top" >
             <el-row  class="f13 mb20">
              <el-col  :span="8">
                <div class="grid-content1">
                 <div class="mb5 cfff f16">订单总数/单</div>
                 <span class="mr10">{{data1.total_order_count}}</span>
                </div>
              </el-col>
              <el-col :span="8" class="ml10 mr10">
                <div class="grid-content1">
                 <div class="mb5 cfff f16">今日下单量/单</div>
                 <span class="  mr10">{{data1.day_order_down_count}}</span>
                </div>
              </el-col>
               <el-col :span="8">
                <div class="grid-content1">
                 <div class="mb5 cfff f16"> 今日完成量/单</div>
                 <span class="  mr10" >{{data1.day_order_finish_count}}</span>
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="center-bottom mt10" >
               <div class="title1  p10 tl f20">GIS地图</div>
                <div class="grid-content2" style="height:420px">
                   <div id="map"  class="fl " style="width:100%;height:420px" ></div>
                </div>
                 </div> 
                <div class="mt10" style="height:330px;background:rgba(8,4,4,0.45)">
                    <div id="main2" class="f14 mt10"  ref="main2" style="height:320px"></div>
                </div>
               
         
         <!-- <div class="grid-content bg-purple2 fl" ref="Purple2"> -->
          <!-- -->
          
        <!-- </div> -->
       </el-col>
       <el-col :span="6">
          <div class="right-top p20" >
             <div class="title1 p10 tl f20">备案小作坊 <a  class="a_menu1"
              href="javascript:;"
             @click="redirect1($event,'http://rsjykj.com.cn:9990/#/monitorWarning?user_code=1011596167309787307851742')" 
            ><img class="ml10 w25 " style="vertical-align: sub;" src="../../assets/image/camear.png"></a></div>
             <div class="" id="main3" style="width: 100%;height:260px;"></div>
              <el-row class="mt15">
                 <el-col :span="8">
                   <p  class="cfff f16 mb10">从业人员/人</p>
                   <p class="f36">{{statistics.employees_num}}</p>
                 </el-col>
                 <el-col :span="8">
                   <p  class="cfff f16 mb10">健康证在效期/人</p>
                   <p class="f36">{{statistics.normal_num}}</p>
                 </el-col>
                 <el-col :span="8">
                   <p  class="cfff f16 mb10">健康证即将到期/人</p>
                   <p class="f36 cff5">{{statistics.willexpire_num}}</p>
                 </el-col>
                </el-row>
          </div>
          <div class="right-bottom p20 mt10" >
             <div class="title1 p10 tl f20">溯源监控</div>
            <div class="scroll_bg1" ref="scrollBg" id="box1"  style="height:410px">
                 <vue-seamless-scroll :data="activities" :class-option="optionSetting1" class="seamless-warp">
              <ul class="item">
            <li class="left-lineBox  tl" v-for="(item, index) in activities"  :key="index">
             <p class="name tl mb15">{{item.supplier_name}}</p>
             <p class="order_num mb20 f14 disib cfff">订单编号：{{item.order_code}} </p>
             <el-timeline class="">
              <el-timeline-item  icon="el-icon-check"  :color="item.company_name?'#49D796':''"  size="normal" >
                <p class="timeline-name f18">下单</p>
                <p class="timeline-content f16 cfff"><span class="disib aa2">{{item.company_name }} </span><span class="ml20 c999 disib aa2">{{ item.down_time }}</span></p>
              </el-timeline-item>
              <el-timeline-item  icon="el-icon-check"   :color="item.buyer_user_name?'#49D796':''"  size="normal" >
                <p class="timeline-name f18">采购</p>
                <p class="timeline-content f16 cfff"><span class="disib aa2">{{ item.buyer_user_name }} </span><span class="ml20 c999 disib aa2">{{ item.buy_time }}</span></p>
              </el-timeline-item>
              <el-timeline-item  icon="el-icon-check"   :color="item.check_user_name?'#49D796':''"  size="normal" >
                <p class="timeline-name f18">检测</p>
                <p class="timeline-content f16 cfff"><span class="disib aa2">{{ item.check_user_name }}</span> <span class="ml20 c999 disib aa2">{{ item.check_time }}</span></p>
              </el-timeline-item>
              <el-timeline-item  icon="el-icon-check"   :color="item.sorter_user_name?'#49D796':''"  size="normal" >
                <p class="timeline-name f18">分拣</p>
                <p class="timeline-content f16 cfff"><span class="disib aa2">{{ item.sorter_user_name }}</span> <span class="ml20 c999 disib aa2">{{ item.sort_time }}</span></p>
              </el-timeline-item>
              <el-timeline-item  icon="el-icon-check"  :color="item.delivery&&item.delivery.delivery_user_name?'#49D796':''"  size="normal" >
                <p class="timeline-name f18">配送</p>
                <p class="timeline-content f16 cfff" v-if="item.delivery"><span class="disib aa2">{{ item.delivery.delivery_user_name }}</span> <span class="ml20 c999 disib aa2">{{ item.delivery.delivery_time }}</span></p>
              </el-timeline-item>
              <el-timeline-item  icon="el-icon-check"   :color="item.delivery&&item.delivery.delivery_user_name?'#49D796':''"  size="normal" >
                <p class="timeline-name f18">小作坊确认收货</p>
                <!-- <p class="timeline-content f16 cfff">{{ item.company_name }} <span class="ml20 c999">{{ item.down_time }}</span></p> -->
              </el-timeline-item>
             </el-timeline>
              <p  v-if="item.delivery" class="order_num general_bgc mb20 f14 disib cfff"  @click="godetail(item.supplier_name,item.order_code)">查看配送路径 </p>
          </li>
           </ul>
          </vue-seamless-scroll>
              </div>
          </div>
       </el-col>
    </el-row>

    </div>
    <el-dialog :modal-append-to-body='false' :title="title" :visible.sync="dialogTableVisible" >
     <template>
  <baidu-map v-if="list1" class="Bmap" ak="oqnvdL14rNlcc5gi520BAbRZlW57T4NI" :center="center" :zoom="zoom" @ready="handler" :scroll-wheel-zoom="true">
     <bm-marker  :position="{lng: list1[0].longitude, lat: list1[0].latitude}" :icon="{url:require('../../assets/image/address.png') , size: {width: 40, height: 40}}"></bm-marker>
     <bm-marker  :position="{lng: list1[list1.length-1].longitude, lat: list1[list1.length-1].latitude}" :icon="{url:require('../../assets/image/address.png') , size: {width: 40, height: 40}}"></bm-marker>
     <!-- <bm-marker v-if="list1"  > -->
        <!-- <bm-point-collection :points="points" shape="BMAP_POINT_SHAPE_STAR" color="red" size="BMAP_POINT_SIZE_SMALL" @click="clickHandler"></bm-point-collection> -->
        <bm-driving  :start="{lng: list1[0].longitude, lat: list1[0].latitude}" :end="{lng: list1[list1.length-1].longitude, lat: list1[list1.length-1].latitude}"    
         :auto-viewport="true" policy="BMAP_DRIVING_POLICY_LEAST_DISTANCE" :panel="false" location="成都" :waypoints="list2" > </bm-driving>
     <!-- </bm-marker> -->
    
    </baidu-map>
  </template>
</el-dialog>
  </div>
</template>

<script>
import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
// import BmGeolocation from "vue-baidu-map/components/control/Geolocation";
import BmMarker from "vue-baidu-map/components/overlays/Marker";
// import BmView from 'vue-baidu-map/components/map/MapView.vue'
// import BmMarker from 'vue-baidu-map/components/overlays/Marker.vue'
// import BmInfoWindow from 'vue-baidu-map/components/overlays/InfoWindow.vue'
// import BmLocalSearch from 'vue-baidu-map/components/search/LocalSearch.vue'
// import BmView from 'vue-baidu-map/components/map/Map.vue'
import BmDriving from 'vue-baidu-map/components/search/Driving.vue'
import { local } from "../../util/util";
 import echarts from "echarts";
import axiosa from "../../util/api";
import axios from 'axios'
import options from "./js/map"; 
// import 'echarts/map/js/province/sichuan.js'; 
import Vue from "vue";
var chinaId = 100000;
var chinaName = "china";
var chinaJson = null;
let option,option2,option3,option4,endPercent,progress1;
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
let dmtData=[];
 var geoCoordMap={};
  var GZData=[];
import vueSeamlessScroll from 'vue-seamless-scroll'
export default {
  name: 'DutyInfo',
  components: {vueSeamlessScroll,BaiduMap,BmMarker,
    BmDriving},
  data() {
    return {
       center: { lng: 0, lat: 0 },
      zoom: 3,　 //地图展示级别
        activeClass:0,
      clientWidth: "",
      clientHeight: "",
      tableData:[],
      tableData1:[],
      statistics:'',
      page: {
        pager_offset: "0",
        pager_openset:'100'
      },
      page1:{province:'四川省',city:'成都市',area:'双流区',town:'',vill:'',pager_openset:'100'},
      page2:{province:'四川省',city:'成都市',area:'双流区',town:'',vill:'',pager_openset:'100',add_time:'',end_time:''},
      activeIndex: 0,
      activeIndex1: 0,
      firstPlayFlag: true,
      timer:'',
      user_loginname: "",
      user_loginpass: "",
      qyurl:'',
      list:[],
      list1:'',
      list2:[],
      data1:'',
      list_btn:[{title: '合格',val:'1'},{title: '不合格',val:'2'}],
      progressWidth:'',
      dateTime:'',
       dateTime1:'',
        dialogTableVisible: false,
        title:'',
        user:'',
        patrolCount:'',
        user_code:'',
          customColor: '#409eff',
         activities: [],
    };
  },
  mounted() {
    this.$nextTick(function() {
      this.drawPie();
     
    });
    this.timer = setInterval(() => {
    this.getNowTime()
    this.init1(this.page1)
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
    },
    optionSetting1 () {
      return {
        step:0.5, // 数值越大速度滚动越快
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
    this.init(this.page1)
    // this.getNowTime()
  },
  methods: {
    redirect1(e, num1) {
      window.open(num1, "_blank");
    },
    format(percentage) {
    return `${percentage}% 还剩 15 天`;
  },
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
         this.dateTime=`${year}/${month}/${date}`
          this.dateTime1=`${hh}:${mm}:${ss}`;
      },
    init(params) {
       this.getNowTime()
      this.page2.add_time=this.dateTime+' 00:00:00';
      this.page2.end_time=this.dateTime+' 23:59:59';
      axiosa.get('/api/cry/company/buy/statistics', this.page1).then((v) => {
        this.tableData=v.company_buy_list;
       this.list=v.company_buy_category_list;
      })
      axiosa.get('/api/cry/company/order/source/statistics', this.page1).then((v) => {
        this.activities=v.source_order_list;
      })
       axiosa.get('/api/cry/food/check/statistics', this.page1).then((v) => {
        this.tableData1=v.food_check_list;
       let time_canvas1 = document.getElementById("canvas1");//v.food_check_count
      options.drawMain(time_canvas1,'检测总量',247, 100, "#34ECB5", "#0B4C47");
        let time_canvas2 = document.getElementById("canvas2");//v.food_check_pass_count
      options.drawMain(time_canvas2,'合格数',247, v.food_check_pass_count/v.food_check_count*100, "#F69089", "#0B4C47");
        let time_canvas3 = document.getElementById("canvas3");
      options.drawMain(time_canvas3,'合格率',Number(v.food_check_pass_ratio).toFixed(0)+'%', v.food_check_pass_ratio, "#28AAF4", "#0B4C47");
      })
       axiosa.get('/api/company/statistics', this.page1).then((v) => {
        this.statistics=v;
        option3.series[0].data[0].value=v.passed_num
         option3.series[0].data[1].value=v.nopassed_num
        //  option3.series[0].data[1].value=v.logout_num
        // option3.series[0].data[0].value=v.expired_num
        option3.graphic[0].style.text=v.passed_num+v.logout_num+v.nopassed_num+v.expired_num+'\n\n小作坊备案'
           let myChart3 = echarts.init(document.getElementById("main3"));
         myChart3.setOption(option3);
      })
      axiosa.get('/api/cry/company/buy/count/addr', this.page2).then((v) => {
        v.company_order_list.forEach(item=>{
          option2.xAxis.data.push(item.region_name)
          option2.series[0].data.push(item.company_count)
          option2.series[1].data.push(item.order_count)
        })
           var charts2 = echarts.init(document.getElementById('main2'))
       charts2.setOption(option2);
      })
      axiosa.get('/api/cry/company/buy/gis', this.page1).then((v) => {
        GZData=[];
        geoCoordMap={};
        v.company_log_lat_list.forEach(item=>{
          this.$set(geoCoordMap,item.company_name,[item.longitude,item.latitude])
        })
         v.company_supplier_list.forEach((item,index)=>{
           item.forEach((item1,index1)=>{
             if(index==0){
               GZData.push([{
                 name: item1.supplier_name
                }, {
                 name: item1.supplier_name,
                 value: 150,
                 color:'#3ed4ff',
                 show:true
                }])
                GZData.push([{
                 name: item1.supplier_name
                }, {
                 name: item1.company_name,
                 value: 50,
                 color:'#ffa022',
                 show:false
                }])
             }else{
                GZData.push([{
                 name: item1.supplier_name
                }, {
                 name: item1.supplier_name,
                 value: 150,
                 color:'red',
                 show:false
                }])
                GZData.push([{
                 name: item1.supplier_name
                }, {
                 name: item1.company_name,
                 value: 50,
                 color:'#ffa022',
                 show:false
                }])
             }
                
           })
         })
this.mapChart();
      })
    },
    init1(){
      axiosa.get('/api/cry/company/order/statistics', this.page2).then((v) => {
        this.data1=v;
      })
    },
     godetail(val,code){
        this.dialogTableVisible=true
       this.title=val;
        axiosa.get('/api/cry/company/order/path', {order_code:code}).then((v) => {
       this.list1=v.log_lat_list;
          this.list1.forEach((item,index)=>{
         if(index>0&&index<this.list1.length-1){
           this.list2.push({lng:item.longitude,lat:item.latitude})
         }
       })
      })
    },
    handler ({ BMap, map }) {
      this.center.lng = 104.06
      this.center.lat = 30.67
      this.zoom = 10
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
              { text: "0", max: 1000}, //这里用于设置各轴的参数以及最大值
              { text: "0", max: 1000 },
              { text: "0", max: 1000 },
              { text: "0", max: 1000},
              { text: "0", max: 1000 }
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
      option2 = {
        grid:{ top:'20%',
        left: '5%',
        right: '5%',
        bottom: '5%',
        containLabel: true},
         legend: {show:true,icon:"circle",data: ['入驻小作坊', '今日已采订单'],right: '4%',top: '5%',textStyle: {fontSize: 14,color: '#fff'},},
        calculable : true,
        xAxis: {
            type: 'category',
            axisTick:{
                show:false,
            },
            boundaryGap: false,
            data:[],
            axisTick:{
                show:false,
            },
              splitLine:{
                            show:true,
                            lineStyle:{
                          color: ['#315070'],
                       }
                        },
            axisLabel:{
                color:'#fff',
                 interval:0,
                  rotate:40
            },
            axisLine:{
                lineStyle:{
                    color:'#315070',
                    width:1,
                }
            },
        },
        yAxis: {
            type: 'value',
            //  max :100,
            splitNumber :5,
            axisTick:{
                show:false,
            },
            axisLabel:{
                color:'#fff' 
            },
            axisLine:{
                lineStyle:{
                    width:1,
                    color:'#315070',
                }
            },
            splitLine: {
                show: false       
            }
        },
        series: [
            {
              name:'入驻小作坊',
                type:'line',
                symbol: 'none',
                smooth:true,
                itemStyle: {
                    normal: {
                        color: '#C77661',
                    }
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: '#FF7D63'
                        }, {
                            offset: 1,
                            color: '#F09F6E'
                        }])
                    }
                },
                data:[],
            },
            {
              name:'今日已采订单',
                type:'line',
                symbol: 'none',
                smooth:true,
                itemStyle: {
                    normal: {
                        color: '#1A9894',
                    }
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 0.7, [{
                            offset: 0,
                            color: '#13B9B7'
                        }, {
                            offset: 1,
                            color: 'rgba(94,245,197,0.8)'
                        }])
                    }
                },
                data:[],
            }
        ]
      };
      option3 = {
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}: {c} ({d}%)",
        },
        grid: { top: '0%', right: '2%', left: '2%',bottom:'15%'},
        color: ['#40CBA4','#1662C1','#24B2E7','#4773CD',],
         graphic: [{ //环形图中间添加文字
            type: 'text', //通过不同top值可以设置上下显示
            left: 'center',
            top: '33%',
            style: {
                text:'23,458\n\n小作坊备案',
                textAlign: 'center',
                fill: '#fff', //文字的颜色
                fontSize: 20,
                fontFamily: "Microsoft YaHei",
            }
        }],
        legend: {
           show: false,
          // orient: 'vertical',
          icon: "circle",
          itemHeight: 9,//改变圆圈大小
          bottom: 0,
          textStyle: {
            fontSize: 10,
            color:'#fff'
          },
          data: ['已通过审核/家','未通过审核/家'],
          // '已过期/家', '已注销/家','未通过审核/家',
        },
        series: [
          {
            name: '详细信息',
            type: 'pie',
            radius: ['45%', '63%'],
            center: ['50%', '45%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: true,
                 formatter: function(value) {
                            return value.data.name + '\n\n{a|'+ value.data.value +'}' ;
                    },
                    textStyle:{
                        fontSize:15,
                        color:'#fff',
                        //在rich中给formatter添加个别字体颜色
                        rich:{
                            a:{
                                color:'#fff',
                                margin:[0,10],
                                fontSize:25,
                            },
                        },
                    },
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
              // { value: '13899', name: '已过期/家' },
              // { value: '13899', name: '已注销/家' },
              { value: '13899', name: '已通过审核/家' },
              { value: '13899', name: '未通过审核/家' },
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
    },
     mapChart() {
var planePath = 'path://M.6,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705';
var convertData = function (data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
        var dataItem = data[i];
       
        var fromCoord = geoCoordMap[dataItem[0].name];
        var toCoord = geoCoordMap[dataItem[1].name];
        if (fromCoord && toCoord) {
            res.push([{
                coord: fromCoord
            }, {
                coord: toCoord
            }]);
        }
    }
    return res;
};

var color = ['#ffa022'];
var series = [];
[
    ['', GZData]
].forEach(function (item, i) {
    series.push({
        name: item[0] + ' Top10',
        type: 'lines',
        zlevel: 1,
        effect: {
            show: true,
            period: 6,
            trailLength: 0.7,
            color: '#fff',
            symbolSize: 3
        },
        lineStyle: {
            normal: {
                color: color[i],
                width: 0,
                curveness: 0.2
            }
        },
        data: convertData(item[1])
    }, {
        name: item[0] + ' Top10',
        type: 'lines',
        zlevel: 2,
        effect: {
            show: true,
            period: 6,
            trailLength: 0,
            symbol: planePath,
            symbolSize: 15
        },
        lineStyle: {
            normal: {
                color: color[i],
                width: 1,
                opacity: 0.4,
                curveness: 0.2
            }
        },
        data: convertData(item[1])
    }, {
        name: item[0] + ' Top10',
        type: 'effectScatter',
        coordinateSystem: 'geo',
        zlevel: 2,
        rippleEffect: {
            brushType: 'stroke'
        },
        label: {
            normal: {
                show: true,
                position: 'right',
                formatter: '{b}'
            }
        },
        symbolSize: function (val) {
            return val[2] / 8;
        },
        data: item[1].map(function (dataItem) {
            return {
                name: '双流',
                value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value]),
                itemStyle: {
                    normal: {
                        color: dataItem[1].color,
                    }
                },
                label: {
                 normal: {
                   show: dataItem[1].show,
                    textStyle:{
                        fontSize:25,
                        margin:[0,10],
                        color:'red',
                        fontWeight:600,
                        padding:[6,10],
                        backgroundColor:'rgba(16,55,72,0.6)',
                        borderRadius:4
                    },
                     
                position: 'bottom'
                 },
                },
            };
        })
    });
});
            let myChart4 = echarts.init(document.getElementById("map"));
                 option4 = null;
                axios.get("/510100.json", {}).then(result => {
                    echarts.registerMap(name, result.data);
                    option4 = {
                        tooltip: {
                            trigger: 'item',
                             extraCssText:'background:rgba(26,223,187,0.3);padding:5px 10px',
                            formatter: function (params) {
                                return params.name;
                            }
                        },
                        toolbox: {
                            show: false, 
                            left: 'left',
                            top: 'top',
                            feature: {
                                dataView: {
                                    readOnly: false
                                },
                                restore: {},
                                saveAsImage: {}
                            }
                        },
                        geo: {
                            type: 'map',
                            zoom: 1.2,   //地图初始大小，这里是关键，一定要放在 series中  因为geo在series中会加载，所以zoom放在此处
                            roam: true,
                            label: {
                                normal: {
                                    show: true,
                                     color: '#fff'
                                },
                                emphasis: {
                                    textStyle: {
                                        color: '#fff'
                                    }
                                }
                            },
                            itemStyle: {
                                normal: {
                                    borderColor: '#44D9AF', //区域边框颜色
                                    areaColor: '#203342', //区域填充颜色
                                },
                                emphasis: {
                                    areaColor: '#44D9AF',
                                    borderWidth: 0
                                }
                            },
                        },
                        series:series
                    };
             
                    myChart4.setOption(option4,true); 
                    window.addEventListener("resize",function(){ //浏览器大小调整echarts随之改变
                        myChart4.resize();
                    });
                });
    },
  }
};


</script>



<style scoped lang="scss">
.body {
  background-image: url("../../assets/image/dashuju.png");
  width: 1920px;
  height: 1080px;
  /* position: fixed; */
  z-index: -10;
  background-repeat: no-repeat;
  background-position: 0px 0px;
  background-size: 100% 100%;
  font-family:Source Han Sans CN;
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
.right_btn{position: absolute; right: 20px; top: 0px;}
.title {
  width:1920px;
  height:100px;
  text-align: left;
  line-height: 100px;
  padding: 0px 60px;
  color: #fff;
  font-size: 28px;
  display: table;
  img{width:50px;vertical-align: middle;}
  span{background:rgba(255,255,255,0.3); border-radius:24px;color: #34ECB5;padding: 6px 10px;vertical-align: middle;}
  .dateTime1{font-weight:500;
color:rgba(255,255,255,1);
opacity:0.6;}
}
.title1{color: #fff;}
.title2{top: 10px;left:30px;}
.box {
    padding: 0px 60px;
    .el-col-6{width: 510px;
    .left-top{height: 435px;background:rgba(8,4,4,0.45);
  .tag{width:25px;height:25px;line-height:25px;border-radius:50%;text-align: center;}}
  .tag1{background:linear-gradient(225deg,rgba(248,175,111,1),rgba(244,92,119,1));}
  .tag2{background:linear-gradient(225deg,rgba(116,254,239,1),rgba(34,173,132,1));}
  .left-bottom{ height: 495px;background:rgba(8,4,4,0.45);}
    .right-top{height: 435px;background:rgba(8,4,4,0.45);}
    .right-bottom{height: 496px;background:rgba(8,4,4,0.45);}}
     .el-col-12{width: 760px;
     .center-top{
       .el-col-8{width: 246.6666px;height: 120px;background:rgba(8,4,4,0.45);}
     }
      .center-bottom{height: 471px;background:rgba(8,4,4,0.45);}}
    
  color: #34ECB5;
  
  .grid-content1 {
    padding-top: 20px;
    span {
font-size:42px;
font-family:PingFang SC;
font-weight:bold;
font-style:italic;
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
  height: 435px;
 
}
/* .el-row1{ background:rgba(8,4,4,0.2);} */
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
.scroll_bg1 {
  width: 100%;
  margin: auto;
  overflow: hidden;
  position: relative;
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
  width: 20%;
  float: left;
  padding-bottom: 5px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #fff;
}
li div {
  padding: 10px 10px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.aa_li div {
  width: 25%;
}
.aa1_li div {
  width: 20%;
}
.aa2{
   width: 40%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.flex{  display: flex;  justify-content: center;}
.grid-content1 {
 /deep/ .el-progress__text{display: none;}
}

/deep/ .el-progress-bar__outer{background-color: #125D47;    border-radius: 0px;}
/deep/ .el-progress-bar__inner{ border-radius: 0px;}
 /deep/ .el-dialog {background:#0D2B48;width:65%;color:#fff;height: 650px;
   .el-dialog__header{text-align: left;.el-dialog__title{color: #34ECB5;font-size: 25px;}}
   .el-dialog__body{padding-top: 15px;}
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
     .el-progress__text{font-size: 15px !important;color: #fff;}
  }

}
  /deep/ .left-lineBox {
        margin-top: 12px;
        .name{font-size: 24px;}
        .order_num{padding: 8px 18px;background-color: rgba(238,238,236,0.06);border-radius: 17px;}
        .el-timeline {
          padding-left: 15px;
          .el-timeline-item {
            padding-bottom: 15px !important;
            .el-timeline-item__tail{
              border-left:2px solid #49D796;
            }
          }
        }
        .el-timeline-item__node{
          background-color: #0A212E;
        }
        .el-timeline-item__node--normal {
          width: 18px;
          height: 18px;
          left: -5px;
          border: 2px solid #49D796;
        }
        .eltimelinefocus {
          .el-timeline-item__node {
            border: 2px solid #49D796;
            background-clip: content-box;
            background: transparent;
          }
          .el-timeline-item__node--normal {
            left: -5px;
            width: 18px;
            height: 18px;
              
          }
        }
       /deep/ .el-timeline-item__icon{color: #0A212E;}
      /deep/ .el-timeline-item__content{
          display: flex;
              justify-content: space-between;
        }
        .timeline-name {
           text-align: left;
          color: #49D796;
        }
        .timeline-content {
          margin-left: 10px;
          text-align: right;
          width: 70%;
        }
      }
       .Bmap {
    width: 100%;
    height: 550px;
  }
</style>
