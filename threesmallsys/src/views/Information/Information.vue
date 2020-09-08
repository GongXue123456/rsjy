<template>
  <div class="body">
    <div class="title" ref="Top">中国小作坊数智云平台大数据中心 <a  class="right_btn f13 cfff disib"
              :href="user.qyurl+'JKYJLogin/login?user_loginname='+user_loginname+'&user_loginpass='+user_loginpass+'&returnurl=todayData/findByList'" 
            ><p class="disib">群宴预警中心</p>
            </a></div>
    <div class="box" ref="Box">
      <div>
        <div class="grid-content bg-purple1 fl" ref="Purple1">
          <div class="left-top" ref="leftTop">
            <div class="pt10 f15">数据报备</div>
            <div class="a w f14" ref="leftTop1">
              <div class="aa">主体业态</div>
              <div class="aa">单位名称</div>
              <div class="aa">经营者</div>
              <div class="scroll_bg" ref="scrollBg1" id="box">
                 <div id="con1" ref="con1" :class="{anim:animate==true}" @mouseenter="mEnter"  @mouseleave="mLeave">
                   <li v-for="(item,index) in tableData" :key="index" class="pl10 pr15">
          <div class="fl">{{item.business_form}}</div>
          <div class="fl">{{item.company_name}}</div>
          <div class="fl">{{item.operator}}</div>
        </li>
    </div>
              </div>
            </div>
          </div>
          <div class="left-top" ref="leftBottom">
            <div class="pt10 f15">溯源</div>
            <div id="main1" class="f13" ref="main1"></div>
          </div>
        </div>
        <div class="grid-content bg-purple2 fl" ref="Purple2">
          <div class="center-top pr" ref="centerTop">
            <el-row :gutter="20" class="f13 mt5">
              <el-col v-for="(item,index) in data1" :key="index" :span="8">
                <div class="grid-content1">
                 <div class="mb5"> {{item.sname}}</div>
                 <span class="f25 mr10">{{item.svalue}}</span><span v-if="index<2">条</span>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="f13">
              <el-col :span="18">
                <div class="grid-content2 pr" ref="gridContent2">
                  <!-- <button class="backBtn" @click="back()">返回</button> -->
                </div>
              </el-col>
              <!-- <el-col :span="6">
                <div class="grid-content1 mt10">
                  三小备案数
                  <br />
                  <span class="f25 mr10">4</span>条
                </div>
                <div class="grid-content1 mt10">
                  三小巡查率
                  <br />
                  <span class="f25 mr10">100%</span>
                </div>
              </el-col> -->
            </el-row>
          </div>
          <div class="center-bottom" ref="centerBottom">
            <div class="pt10 f15 tc">备案大数据</div>
            <div id="main2" class="f13" ref="main2"></div>
          </div>
        </div>
        <div class="grid-content bg-purple1 fl" ref="Purple3">
          <div class="right-top" ref="rightTop">
            <div class="pt10 f15">用户雷达</div>
            <div id="main" class="f13" ref="main"></div>
          </div>
          <div class="right-center" ref="rightCenter">
            <div class="pt10 f15">市场监管局</div>
            <div class="a w f14 tc" ref="rightCenter1">
              <div style="width:33%" class="fl ">主体名称</div>
              <div style="width:60%" class="fl ">所属区域</div>
              <div class="scroll_bg" ref="scrollBg" id="box1">
                <div id="con2" ref="con2" :class="{anim1:animate1==true}" @mouseenter="mEnter1"  @mouseleave="mLeave1">
                   <li v-for="(item,index) in tableData1" :key="index" class="w">
                      <div class="fl">{{item.department_name}}</div>
                   <div class="fl" style="width:60%">{{item.province+item.city+item.area+item.town+item.vill}}</div>
                     </li>
                </div>
                <!-- <el-table :data="tableData1" style="width: 100%" >
                 <el-table-column  prop="department_name" width="100"  align='center'> </el-table-column>
                 <el-table-column prop="company_name"   :show-overflow-tooltip="true" align='center'  :formatter="userTypeList"> </el-table-column>
                </el-table> -->
                <!-- <ul class="scroll_content" :style="{ top }">
                  <li v-for="(item,index) in tableData1" :key="index">
                    <div class="fl">{{item.department_name}}</div>
                    <div class="fl" style="width:60%">{{item.province+item.city+item.area+item.town+item.vill}}</div>
                  </li>
                </ul> -->
              </div>
            </div>
          </div>
          <div class="right-top" ref="rightBottom">
            <div class="pt10 f15">培训</div>
            <div id="main3" class="f13" ref="main3"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import cityMap from "@/assets/js/china-main-city-map.js";
import { local } from "../../util/util";
var echarts = require('echarts/lib/echarts');
require('echarts/lib/chart/line');
require('echarts/lib/chart/pie');
require('echarts/lib/chart/radar');
// 引入提示框和标题组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/legend');
require('echarts/lib/component/title');
import axios from "../../util/api";
import Vue from "vue";
var chinaId = 100000;
var chinaName = "china";
var chinaJson = null;
let option,option2;
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

export default {
  components: {},
  data() {
    return {
       animate: false,
       animate1: false,
      clientWidth: "",
      clientHeight: "",
      tableData:[],
      tableData1:[],
      page: {
        pager_offset: "0",
        filing_state:"3",
        pager_openset:'100'
      },
      activeIndex: 0,
      activeIndex1: 0,
      firstPlayFlag: true,
      data1:'',
      timer2:'',
      timer1:'',
      user_loginname: "",
      user_loginpass: "",
    };
  },
  mounted() {
    this.clientWidth = `${document.documentElement.clientWidth}`;
    this.clientHeight = `${document.documentElement.clientHeight}`;
    this.$refs.Purple1.style.width = this.clientWidth * (430 / 1908) + "px";
    this.$refs.Purple3.style.width = this.clientWidth * (430 / 1908) + "px";
    this.$refs.Purple2.style.width = this.clientWidth * (850 / 1908) + "px";
    this.$refs.leftTop.style.height = this.clientWidth * (460 / 1908) * (460 / 523) + 5 + "px";
    this.$refs.scrollBg1.style.height =this.clientWidth * (460 / 1908) * (460 / 523) - 70 + "px";
    this.$refs.leftTop1.style.width =this.clientWidth * (430 / 1908) - 20 + "px";
    this.$refs.leftBottom.style.height =this.clientWidth * (460 / 1908) * (460 / 523) + "px";
    this.$refs.main1.style.width = this.clientWidth * (430 / 1908) - 10 + "px";
    this.$refs.main1.style.height =this.clientWidth * (460 / 1908) * (460 / 523) - 30 + "px";
    this.$refs.Top.style.height = this.clientHeight * (115 / 1908) + "px";
    this.$refs.Box.style.height =this.clientHeight - this.clientHeight * (115 / 1908) + "px";
    this.$refs.centerBottom.style.height =this.clientWidth * (900 / 1908) * (346 / 900) + "px";
    this.$refs.main2.style.width = this.clientWidth * (850 / 1908) - 10 + "px";
    this.$refs.main2.style.height =this.clientWidth * (900 / 1908) * (346 / 900) - 30 + "px";
    this.$refs.rightTop.style.height =this.clientWidth * (445 / 1908) * (347 / 523) + 10 + "px";
    this.$refs.main.style.width = this.clientWidth * (430 / 1908) + "px";
    this.$refs.main.style.height =this.clientWidth * (445 / 1908) * (347 / 523) - 30 + "px";
    this.$refs.rightCenter.style.height =this.clientWidth * (445 / 1908) * (254 / 523) + "px";
    this.$refs.rightBottom.style.height =this.clientWidth * (445 / 1908) * (347 / 523) + "px";
    this.$refs.main3.style.width = this.clientWidth * (430 / 1908) + "px";

    this.$refs.rightCenter1.style.width = this.clientWidth * (430 / 1908) - 20 + "px";
    this.$refs.scrollBg.style.height =this.clientWidth * (445 / 1908) * (254 / 523) - 70 + "px";
    this.$refs.main3.style.height =this.clientWidth * (445 / 1908) * (347 / 523) - 30 + "px";
    this.$refs.gridContent2.style.height = this.clientHeight -this.clientWidth * (115 / 1908) -this.clientWidth * (862 / 1908) * (346 / 890) -50 +"px";
    this.$refs.centerTop.style.height =this.clientHeight -this.clientWidth * (115 / 1908) -this.clientWidth * (862 / 1908) * (346 / 890) +"px";
    //    this.draw();
    this.$nextTick(function() {
      this.drawPie();
    });
    // this.mapChart("mapChart");
    let _this = this;
    _this.timer1 = setInterval(_this.scroll, 1000);
     _this.timer2 = setInterval(_this.scroll1, 1000);

  },
  watch: {
    clientHeight: function() {
      this.changeFixed(this.clientWidth);
    }
  },
  created() {
     this.user=local.get("user")
         this.user_loginname = local.get("userloginname");
    this.user_loginpass = local.get("userloginpass");
    this.init(this.page);
  },
  methods: {
    scroll() {
      let con1 = this.$refs.con1;
      con1.style.marginTop = "-30px";
      this.animate = !this.animate;
      var that = this; // 在异步函数中会出现this的偏移问题，此处一定要先保存好this的指向
      setTimeout(function() {
        that.tableData.push(that.tableData[0]);
        that.tableData.shift();
        con1.style.marginTop = "0px";
        that.animate = !that.animate; // 这个地方如果不把animate 取反会出现消息回滚的现象，此时把ul 元素的过渡属性取消掉就可以完美实现无缝滚动的效果了
      }, 500);
    },
    scroll1() {
      let con2 = this.$refs.con2;
      con2.style.marginTop = "-30px";
      this.animate1 = !this.animate1;
      var that = this; // 在异步函数中会出现this的偏移问题，此处一定要先保存好this的指向
      setTimeout(function() {
        that.tableData1.push(that.tableData1[0]);
        that.tableData1.shift();
        con2.style.marginTop = "0px";
        that.animate1 = !that.animate1; // 这个地方如果不把animate 取反会出现消息回滚的现象，此时把ul 元素的过渡属性取消掉就可以完美实现无缝滚动的效果了
      }, 500);
    },
    mEnter() {
      clearInterval(this.timer1);
    },
    mLeave() {
      this.timer1 = setInterval(this.scroll, 1000);
    },
    mEnter1() {
      clearInterval(this.timer2);
    },
    mLeave1() {
      this.timer2 = setInterval(this.scroll2, 1000);
    },
    userTypeList(row){return row.province+row.city+row.area+row.town+row.vill},
    init(params) {
      axios.get("/api/bigData/userTypeCount", "").then(v => {
        option.polar[0].indicator=[];
        option.series[0].data[0].value=[]
        v.forEach(item=>{
          option.polar[0].indicator.push({text:item.sname+' '+item.svalue,max: 10000})
          option.series[0].data[0].value.push(item.svalue)
        })
         let myChart = echarts.init(document.getElementById("main"));
       myChart.setOption(option);
      });
      axios.get('/api/bigData/companyByCity','').then((v) => {

        // option2.xAxis.data=['0','1','1'];
        // option2.series[0].data=['0','2','0'];
        v.forEach(item=>{
           option2.xAxis.data.push(item.sname)
           option2.series[0].data.push(item.svalue)
        })
         let myChart2 = echarts.init(document.getElementById("main2"));
       myChart2.setOption(option2);
      })
      axios.get('/api/company/search', params).then((v) => {
        this.tableData=v.companyList;
      })
       axios.get('/api/bigData/mapCompany', '').then((v) => {
        this.data1=v
      })
       axios.get('/api/department/list', {state:'1',pager_openset:'100'}).then((v) => {this.tableData1=v.department_list })
    },
    /**
     * 返回上一级地图
     */
    //     back() {

    //       if (mapStack.length != 0) {
    //          sss=true
    //           s--;
    //         if(s<=0){s=0}
    //         var map = mapStack.pop();
    //         axios
    //           .get("./json/map/" + map.mapId + ".json", {})
    //           .then(response => {
    //             const mapJson = response.data;
    //  registerAndsetOption(
    //               myChart,
    //               map.mapId,
    //               map.mapName,
    //               mapJson,
    //               false
    //             );
    //             parentId = map.mapId;
    //             parentName = map.mapName;
    //           });
    //       }
    //     },
    /**
     * Echarts地图
     */

    // mapChart(divid) {
    //   axios.get("./json/map/" + chinaId + ".json", {}).then(response => {
    //     const mapJson = response.data;
    //     chinaJson = mapJson;
    //     myChart = echarts.init(document.getElementById(divid));
    //     registerAndsetOption(myChart, chinaId, chinaName, mapJson, false);
    //     parentId = chinaId;
    //     parentName = "china";
    //     myChart.on("click", function(param) {
    //       s++;
    //       cityId = cityMap[param.name];
    //       if (s<=2) {
    //           cityId1=cityId;
    //          axios.get("./json/map/" + cityId + ".json", {})
    //           .then(response => {
    //             const mapJson = response.data;
    //             registerAndsetOption(myChart,cityId,param.name,mapJson,true);
    //           });
    //         if(s>=2){
    //           s=2
    //            axios.get("./json/map/" + cityId + ".json", {})
    //           .then(response => {
    //             const mapJson = response.data;
    //             if(cityId1=='510100'){
    //                  registerAndsetOption1(myChart, chinaId, chinaName, mapJson, false);
    //             }else{
    //               registerAndsetOption(myChart,chinaId,param.name,mapJson,false);
    //             }
    //           });
    //         }

    //       }else{
    //         s=2
    //       }

    //     });
    //   });
    // },
    changeFixed(clientWidth) {},
    drawPie() {
      // var charts = echarts.init(document.getElementById("main"));
       option = {
        title: {
          text: "",
          subtext: " "
        },
        tooltip: { show: false },
        grid: {
          left: 35
        },
        legend: {
          orient: "vertical",
          x: "center",
          y: "bottom",
          data: ["A同学成绩 "]
        },
        toolbox: {
          show: true,
          feature: {}
        },
        polar: [
          {
            axisLine: {
              lineStyle: {
                color: "#63D5FA"
              }
            },

            splitLine: {
              show: true,
              lineStyle: {
                width: 1,
                color: "#8EDDFF" // 设置网格的颜色
              }
            },
            indicator: [
              { text: "0", max: 100000 }, //这里用于设置各轴的参数以及最大值
              { text: "0", max: 100000 },
              { text: "0", max: 100000 },
              { text: "0", max: 100000 },
              { text: "0", max: 100000 }
            ],
            center: ["50%", "55%"],
            radius: 45
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
                lineStyle: { color: ["#5EFFE3"] },
                areaStyle: {
                  opacity: 1,
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: "#3674D1"
                    },
                    {
                      offset: 1,
                      color: "#5EFFE3"
                    }
                  ])
                }
              }
            },
            data: [
              {
                value: [1, 1, 1, 4, 4918],
                ame: "A同学 "
              }
            ]
          }
        ]
      };
      // charts.setOption(option);
      var charts1 = echarts.init(document.getElementById("main1"));
      var option1 = {
        tooltip: { show: false },
        legend: {
          itemWidth: 20,
          itemHeight: 10,
          itemGap: 10,
          data: [
            { name: "海鲜", icon: "rect" },
            { name: "冻品", icon: "rect" },
            { name: "肉类", icon: "rect" },
            { name: "家禽", icon: "rect" },
            { name: "水发", icon: "rect" },
            { name: "蔬菜", icon: "rect" },
            { name: "干杂", icon: "rect" },
            { name: "其他", icon: "rect" }
          ], //分别修改legend格式
          selectedMode: "single",
          bottom: "10%",
          left: "10%",
          textStyle: {
            fontSize: 12,
            color: "#F1F1F3"
          }
        },
        grid: {
          top: "5%",
          left: "3%",
          right: "4%",
          bottom: "33%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            axisTick: {
              show: false
            },
            data: [
              "1月",
              "2月",
              "3月",
              "4月",
              "5月",
              "6月",
              "7月",
              "8月",
              "9月",
              "10月",
              "11月",
              "12月"
            ],
            splitLine: {
              show: true,
              lineStyle: {
                color: ["#315070"]
              }
            },
            axisLine: { lineStyle: { color: "#315070" } },
            axisLabel: { textStyle: { color: "#315070" } }
          }
        ],
        yAxis: [
          {
            type: "value",
            //  max :100,
            splitNumber: 5,
            //  interval:100,
            splitLine: { show: false },
            axisTick: {
              show: false
            },
            axisLine: { lineStyle: { color: "#315070" } },
            axisLabel: { textStyle: { color: "#315070" } }
          }
        ],
        series: [
          {
            name: "海鲜",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [ '0','0','0','0','0','0','0','0','0','0','0','0','0'],
            areaStyle: { normal: { color: "#091e3b" } },
            itemStyle: {
              normal: { color: "#8cd5c2", lineStyle: { color: "#8cd5c2" } }
            }
          },
          {
            name: "冻品",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [ '0','0','0','0','0','0','0','0','0','0','0','0','0'],
            areaStyle: { normal: { color: "#091e3b" } },
            itemStyle: {
              normal: { color: "#8cd5c2", lineStyle: { color: "#8cd5c2" } }
            }
          },
          {
            name: "肉类",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [ '0','0','0','0','0','0','0','0','0','0','0','0','0'],
            areaStyle: { normal: { color: "#091e3b" } },
            itemStyle: {
              normal: { color: "#8cd5c2", lineStyle: { color: "#8cd5c2" } }
            }
          },
          {
            name: "家禽",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [ '0','0','0','0','0','0','0','0','0','0','0','0','0'],
            areaStyle: { normal: { color: "#091e3b" } },
            itemStyle: {
              normal: { color: "#8cd5c2", lineStyle: { color: "#8cd5c2" } }
            }
          },
          {
            name: "水发",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [ '0','0','0','0','0','0','0','0','0','0','0','0','0'],
            areaStyle: { normal: { color: "#091e3b" } },
            itemStyle: {
              normal: { color: "#8cd5c2", lineStyle: { color: "#8cd5c2" } }
            }
          },
          {
            name: "蔬菜",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [ '0','0','0','0','0','0','0','0','0','0','0','0','0'],
            areaStyle: { normal: { color: "#091e3b" } },
            itemStyle: {
              normal: { color: "#8cd5c2", lineStyle: { color: "#8cd5c2" } }
            }
          },
          {
            name: "干杂",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [ '0','0','0','0','0','0','0','0','0','0','0','0','0'],
            areaStyle: { normal: { color: "#091e3b" } },
            itemStyle: {
              normal: { color: "#8cd5c2", lineStyle: { color: "#8cd5c2" } }
            }
          },
          {
            name: "其他",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [ '0','0','0','0','0','0','0','0','0','0','0','0','0'],
            areaStyle: { normal: { color: "#091e3b" } },
            itemStyle: {
              normal: { color: "#8cd5c2", lineStyle: { color: "#8cd5c2" } }
            }
          }
        ]
      };
      charts1.setOption(option1);
      option2 = {
        grid: {top: "5%",left: "5%",right: "5%", bottom: "5%",containLabel: true},
        legend: {icon: "rectangle",data: ["total", "dfs_used"],right: "4%",textStyle: { fontSize: 12, color: "#666" }},
        xAxis: {type: "category",axisTick: {show: false},
          boundaryGap: false,axisTick: {show: false},
          splitLine: {show: true,lineStyle: {color: ["#315070"] }},
          axisLabel: {color: "#315070",interval: 0,rotate: 40},
          axisLine: {lineStyle: {color: "#315070",width: 1 }}
        },
        yAxis: {type: "value", max: 100,splitNumber: 5,
          axisTick: {show: false},
          axisLabel: {color: "#315070"},
          axisLine: {lineStyle: {width: 1,color: "#315070"}},
          splitLine: {show: false}
        },
        series: [{type: "line",symbol: "none",smooth: true,itemStyle: {normal: {color: "#09b0f5"}},
            areaStyle: {normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{offset: 0,color: "#09b0f5"},{offset: 1,color: "rgba(12,102,173,.5)"}])
              }
            }
          },
          {type: "line",symbol: "none",
            smooth: true,
            itemStyle: {normal: {color: "#09b0f5"}},
            areaStyle: {normal: {color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{offset: 0,color: "#09b0f5"},{offset: 1,color: "rgba(12,102,173,.5)"}])}
            }
          }
        ]
      };
      option2.xAxis.data = [];
      option2.series[0].data = [];
      var charts3 = echarts.init(document.getElementById("main3"));
      var option3 = {
        title: {subtext: "单位：人",fontSize: 12,left: "5%",top: "-10px"},
        grid: {top: "20%",left: "5%",right: "5%",bottom: 0, containLabel: true},
        tooltip: {show: false},
        legend: { data: ["小作坊数智云平台"],textStyle: {fontSize: 12,color: "#F1F1F3"},right: "10%"},
        calculable: true,
        xAxis: [{
            axisLabel: {color: "#315070",interval: 0,rotate: 40},
            axisLine: {lineStyle: { width: 1,color: "#315070"}},
            type: "category",
            axisTick: {show: false},
            data: ["锦江区","青羊区","金牛区","武侯区","成华区","龙泉驿区","青白江区","新都区"]
          }],
        yAxis: [{
            type: "value",splitLine: {show: true,lineStyle: {color: ["#315070"]}},
            axisTick: {show: false},
            axisLabel: {color: "#315070"},
            axisLine: {lineStyle: {width: 1,color: "#315070"}}
          }],
        series: [{name: "小作坊数智云平台",type: "bar",barWidth: 10,data: [0, 0, 0,0, 0,0,0, 0],color: "#C14AA6"}]
      };
      charts3.setOption(option3);
    }
  }
};

//             function registerAndsetOption(myChart, id, name, mapJson, flag) {

//   echarts.registerMap(name, mapJson);
//   myChart.setOption({
//     series: [
//       {
//        type: 'map',
//         map: name,
//         itemStyle: {
//           normal: {
//             borderWidth: 1,
//              borderColor: '#667684',
//              areaColor:new echarts.graphic.LinearGradient(0, 0, 0, 1, [{

//                 offset: 0,
//                 color: 'rgba(31,127,188,1)'
//             },{
//                 offset: 1,
//                 color: 'rgba(99,213,250,1)'
//             }]),
//           },
//            emphasis:{
//                                 areaColor:'rgba(88,175,190, 0.8)',
//                             }
//         },
//          label: {
//                     emphasis: {
//                         show: true,
//                         textStyle:{color:"#e3e3e3"}
//                     }
//                 },
//         data: initMapData(mapJson)
//       }
//     ]
//   },true);

//   if (flag) {
//     mapStack.push({
//       mapId: parentId,
//       mapName: parentName
//     });
//     parentId = id;
//     parentName = name;
//   }
// }

// function initMapData(mapJson) {
//   var mapData = [];
//   for (var i = 0; i < mapJson.features.length; i++) {
//     mapData.push({
//       name: mapJson.features[i].properties.name
//     });
//   }
//    if(s==1){
// mapJson1=mapJson
//    }

//   return mapData;
// }

// function registerAndsetOption1(myChart, id, name, mapJson, flag) {
//   mapJson=mapJson1
//   echarts.registerMap(name, mapJson);
//   myChart.setOption({
//        grid: {
//         top:'0%',
//         left: '3%',
//         right: '4%',
//         bottom: '0%',
//         containLabel: true
//     },
//     tooltip: {
//                         show: true,
//                         trigger: 'item',
//                         formatter:function(params, ticket, callback){
//                            return `
//                 <div class="tl">
//                     <div>${params.data.title}</div>
//                     <div>${params.data.title1}</div>
//                     <div>${params.data.title2}</div>
//                 </div>
//                 `
//                         }
//                     },
//     visualMap: {
//         type: 'piecewise',
//         textStyle: {
//             color: '#fff'
//         },
//         pieces: [
//             {min: 200, max: 300, label: '三小', color: '#be4f51'},
//             {min: 100, max: 200, label: '群宴', color: '#e3bf4c'}
//         ],
//          left:"2%",
//         bottom:"10%",
//         color: ['#e3bf4c', '#be4f51']
//     },
//      geo: {
//                         show: true,
//                         roam: true,
//                         map: '成都市',
//                         selectedMode: false,
//                         markLine:{
//                             lineStyle:{
//                                 color:'#e3e3e3'
//                             }
//                         },
//                         label:{
//                             normal: {
//                                 show: false,
//                                 color:'#e3e3e3'
//                             },
//                             emphasis:{
//                                 show: true,
//                                 color:'#e3e3e3'
//                             }
//                         },
//                         itemStyle: {
//                             normal: {
//                                 borderColor: '#667684',
//                                 areaColor:new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
//                              offset: 0,
//                 color: 'rgba(31,127,188,1)'
//             },{
//                 offset: 1,
//                 color: 'rgba(99,213,250,1)'
//             }]),
//                             },
//                             emphasis:{
//                                 areaColor:'rgba(88,175,190, 0.8)',
//                             }
//                         }
//                     },
//     series: [
//       {
//         type: "scatter",
//           coordinateSystem: 'geo',
//                             symbolSize: 10,
//         data: geoCoordMap1
//       }
//     ]
//   },true);
// }
// let geoCoordMap1= [
//   {name:'群宴1',value:[104.06, 30.69, 110],title:'举办者：廖前付',title1:'乡厨：张加永',title2:'就餐人数：200'},
//   {name:'群宴2',value:[104.26, 30.57, 110],title:'举办者：蒋梦宣',title1:'乡厨：曾顶文',title2:'就餐人数：100'},
//   {name:'群宴3',value:[104.36, 30.67, 110],title:'举办者：彭素芬',title1:'乡厨：刘晓琴',title2:'就餐人数：90'},
//   {name:'群宴4',value:[104.16, 30.57, 110],title:'举办者：陈辉水',title1:'乡厨：彭兵',title2:'就餐人数：70'},
//   {name:'三小1',value:[104.66, 30.62, 210],title:'主体名称：四川吉善缘餐饮管理有限公司',title1:'主体类型：小作坊',title2:'经营者：张利轲'},
//   {name:'三小2',value:[103.49, 30.87, 210],title:'主体名称：双流国根海参水产经营部',title1:'主体类型：小作坊',title2:'经营者：王国根'},
//   {name:'三小3',value:[103.26, 30.57, 210],title:'主体名称：双流潘氏水产经营部',title1:'主体类型：小作坊',title2:'经营者：潘森林'},
//   {name:'三小4',value:[104.67, 30.77, 210],title:'主体名称：双流周记水产品经营部',title1:'主体类型：小作坊',title2:'经营者：周茂芳'},
//   {name:'群宴5',value:[104.16, 30.57, 110],title:'举办者：林建平',title1:'乡厨：李忠文',title2:'就餐人数：300'}];
</script>



<style scoped lang="scss">
.body {
  background-image: url("../../assets/image/beijingtupian.jpg");
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
.right_btn{position: absolute; right: 20px; top: 10px;}
.title {
  background: url("../../assets/image/top.png") no-repeat 0px 0px;
  width: 100%;
  height: 12vh;
  text-align: center;
  padding: 10px 0 20px 0;
  color: #fff;
  font-size: 23px;
  background-size: 100% 100%;
  display: table;
}
.box {
  position: absolute;
  left: 5%;
  color: #8eddff;

  .left-top {
    background: url("../../assets/image/l-t.png") no-repeat 0px 0px;
    background-size: contain;
  }
  .left-bottom {
    background: url("../../assets/image/l-b.png") no-repeat 0px 0px;
    background-size: contain;
  }
  .center-bottom {
    background: url("../../assets/image/c-b.png") no-repeat 0px 0px;
    background-size: contain;
  }
  .right-top {
    background: url("../../assets/image/r-t.png") no-repeat 0px 0px;
    width: 100%;
    background-size: contain;
  }
  .right-center {
    background: url("../../assets/image/r-c.png") no-repeat 0px 0px;
    width: 100%;
    height: 30%;
    background-size: contain;
  }
  .grid-content1 {
    padding: 10px;
    height: 60px;
    line-height: 1.2;
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(116, 213, 254, 0.4);
    box-shadow: 0px 5px 12px 0px rgba(5, 12, 39, 0.6);
    span {
      font-family: PingFang SC;
      font-weight: bold;
      font-style: italic;
    }
  }
  .grid-content2 {
    padding: 10px;
  }
}
.el-row {
  &:last-child {
    margin-bottom: 0;
  }
}
.grid-content {
  height: 100%;
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.chart {
  position: relative;
  height: 100%;
}
.backBtn {
  position: absolute;
  top: 10px;
  padding: 5px 10px;
  background-color: #63d5fa;
  border: 0;
  color: #fff;
  border-radius: 6px;
  font-family: Microsoft Yahei;
  font-size: 1em;
  cursor: pointer;
  left: 0px;
  z-index: 999;
}
.myBlog {
  position: absolute;
  top: 2px;
  right: 5%;
  display: block;
  border: 2px solid #262a53;
}
.myBlog a {
  text-decoration: none;
  display: inline-block;
  color: #fff;
  padding: 5px;
  font-size: 1em;
}

.myBlog a img {
  vertical-align: middle;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  margin: -5px 5px auto auto;
}
.bottom {
  position: absolute;
  width: 100%;
  height: 5%;
  line-height: 100%;
  left: 0;
  bottom: 0%;
  text-align: center;
}
.scroll_bg {
  width: 100%;
  margin: auto;
  overflow: hidden;
  position: relative;
}

.scroll_content {
  position: relative;
  transition: top 0.5s;
  -webkit-transition: top 0.5s;
}
.a {
  margin: auto;
}
.aa {
  width: 33%;
  float: left;
  padding-bottom: 5px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.scroll_content li {
  height: 30px;
  line-height: 30px;
}
li div {
  width: 33%;
  font-size: 12px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
#box,#box1 {
  width: 300px;
  height: 175px;
  line-height: 30px;
  overflow: hidden;
  transition: all 0.5s;
}
.anim {
  transition: all 0.5s;
}
.anim1 {
  transition: all 0.5s;
}
</style>
