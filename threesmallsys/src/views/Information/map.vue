<template>
  <div class="body">
    <div class="title" ref="Top"><img class="mr10" src="../../assets/image/dashujulogo.png">小作坊数智云平台 <a  class="right_btn f13 cfff disib"
              :href="qyurl+'JKYJLogin/login?user_loginname='+user_loginname+'&user_loginpass='+user_loginpass+'&returnurl=todayData/findByList'" 
            ><p class="f13 disib ml10">{{dateTime}}</p><p class="f20 disib ml20 mr20">{{dateTime1}}</p><p class="disib">三小预警中心</p>
            </a></div>
    <div class="box" ref="Box">
      <el-row class="el-row1" :gutter="20">
       <el-col :span="12">
         <div class="grid-content bg-purple2 fl" ref="Purple2">
          <div class="center-top pr ml10" ref="centerTop">
            <el-row :gutter="20" class="f13">
               <div class="title2 pa tl f16">今日办宴{{data3}}场</div>
              <el-col :span="24">
                <div class="grid-content2" ref="gridContent2">
                   <div ref="map" class="fl " id="map" style="width:600px;height:500px" ></div>
                </div>
              </el-col>
              
            </el-row>
          </div>
        
        </div>
       </el-col>
      
    </el-row>

    </div>
   

  </div>
</template>

<script>
import { local } from "../../util/util";
// var echarts = require('echarts/lib/echarts');
// require('echarts/lib/chart/line');
// require('echarts/lib/chart/pie');
// require('echarts/lib/chart/radar');
// require('echarts/lib/chart/bar');
// require('echarts/lib/component/tooltip');
// require('echarts/lib/chart/scatter');
// require('echarts/lib/chart/map');
// require('echarts/lib/chart/effectScatter');
// require('echarts/lib/component/legend');
// require('echarts/lib/component/visualMap');
// require('echarts/lib/component/geo');
// require('echarts/lib/component/title');
import echarts from "echarts";
Vue.prototype.$echarts = echarts;
import axios from "../../util/api";
import axiosa from 'axios'
// import options from "./js/map1"; 
// import sichuan 'echarts/map/js/province/sichuan.js'; 
import sichuan from 'echarts/map/json/province/sichuan.json'
import Vue from "vue";
var chinaId = 100000;
var chinaName = "sichuan";
var chinaJson = null;
let options,myCharts;
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
  var name_title = ""
var subname = ''
var nameColor = " rgb(55, 75, 113)"
var name_fontFamily = '等线'
var subname_fontSize = 15
var name_fontSize = 18
var mapName = 'sichuan'
var data = [
    {name:"成都市",value:177},
    ];
    
var geoCoordMap = {};
var toolTipData = [ 
    {name:"成都市",value:[{name:"待检查",value:95},{name:"合格",value:82},{name:"不合格",value:82}]},
    
];
var max = 480,
    min = 9; // todo 
var maxSize4Pin = 100,
    minSize4Pin = 20;

var convertData = function(data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
        var geoCoord = geoCoordMap[data[i].name];
        if (geoCoord) {
            res.push({
                name: data[i].name,
                value: geoCoord.concat(data[i].value),
            });
        }
    }
    return res;
    
};

export default {
  name: 'DutyInfo',
  components: {},
  data() {
    return {
       animate: false,
       animate1: false,
        activeClass:0,
      clientWidth: "",
      clientHeight: "",
      pcount:'',
      tableData:[],
      tableData1:[],
      tableData2:[],
       tableData3:[],
      page: {
        pager_offset: "0",
        pager_openset:'100'
      },
      data1:'',
      data2:'',
      data3:'',
      data4:'',
      data5:'',
      data6:'',
      timer2:'',
      timer1:'',
      list1:[],
      list2:[],
      companyData:[],
      percentage1:0,
      percentage2:0,
      percentage3:0,
      percentage4:0,
      percentage5:0,
      percentage6:0,
      user_loginname: "",
      user_loginpass: "",
      qyurl:'',
      list_btn:[{title: '合格',val:'1'},{title: '不合格',val:'2'}],
      progressWidth:'',
      dateTime:'',
       dateTime1:'',
        title:'',
        user:'',
        user_code:''
    };
  },
  mounted() {
    this.clientWidth = `${document.documentElement.clientWidth}`;
    this.clientHeight = `${document.documentElement.clientHeight}`;
//   this.$refs.map.style.height = (this.clientHeight)*0.45 +"px";
    this.$nextTick(function() {
      this.drawPie();
    });

  },
   computed: {},
  created() {
    this.user_code=this.$route.query.user_code;
    this.getToken()
  },
  methods: {
   
      getToken(){
         axiosa.get("/api/token?user_code="+this.user_code).then(v => {
          local.set('token', v.data.data.token)
          this.user_loginname = v.data.data.user_loginname;
          this.user_loginpass = v.data.data.user_loginpass;
          this.qyurl=v.data.data.qyurl;
          let token = local.get('token')
          if (token) {
            this.init(this.page);
          } 
         
      });
      },
    init(params) {
           myCharts=echarts.init(document.getElementById('map'));
            echarts.registerMap('sichuan',sichuan);
  
//  var myCharts=this.$echarts.init(this.$refs.map);



/*获取地图数据*/
    
    // this.$echarts.registerMap('china',china);   
myCharts.showLoading();
var mapFeatures = echarts.getMap(mapName).geoJson.features;
myCharts.hideLoading();
mapFeatures.forEach(function(v) {
    // 地区名称
    var name = v.properties.name;
    // 地区经纬度
    geoCoordMap[name] = v.properties.cp;

});

      options.series[0].data=convertData(data);
      options.series[2].data=convertData(data);
      options.series[3].data=convertData(data.sort(function(a, b) {
                return b.value - a.value;
            }).slice(0, 5));
        myCharts.setOption(options);
    },
    drawPie() {
       
   options = {
      title: {
        text: name_title,
        subtext: subname,
        x: 'center',
        textStyle: {
            color: nameColor,
            fontFamily: name_fontFamily,
            fontSize: name_fontSize
        },
        subtextStyle:{
            fontSize:subname_fontSize,
            fontFamily:name_fontFamily
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: function(params) {
            if (typeof(params.value)[2] == "undefined") {
                var toolTiphtml = ''
                for(var i = 0;i<toolTipData.length;i++){
                    if(params.name==toolTipData[i].name){
                        toolTiphtml += toolTipData[i].name+':<br>'
                        for(var j = 0;j<toolTipData[i].value.length;j++){
                            toolTiphtml+=toolTipData[i].value[j].name+':'+toolTipData[i].value[j].value+"<br>"
                        }
                    }
                }
                return toolTiphtml;
            } else {
                var toolTiphtml = ''
                for(var i = 0;i<toolTipData.length;i++){
                    if(params.name==toolTipData[i].name){
                        toolTiphtml += toolTipData[i].name+':<br>'
                        for(var j = 0;j<toolTipData[i].value.length;j++){
                            toolTiphtml+=toolTipData[i].value[j].name+':'+toolTipData[i].value[j].value+"<br>"
                        }
                    }
                }
                return toolTiphtml;
            }
        }
      },
      visualMap: {
        show: true,
        min: 0,
        max: 200,
        left: 'left',
        top: 'bottom',
        text: ['高', '低'], // 文本，默认为数值文本
        calculable: true,
        seriesIndex: [1],
        inRange: {
            color: ['#00467F', '#A5CC82']
        }
      },
      geo: {
        show: true,
        map: mapName,
        label: {
            normal: {
                show: false
            },
            emphasis: {
                show: true,
                color:'#e3e3e3'
            }
        },
        roam: true,
        itemStyle: {
            normal: {
                areaColor: '#031525',
                borderColor: '#3B5077',
            },
            emphasis: {
                areaColor: '#2B91B7',
            }
        }
      },
      series: [{
            name: '散点',
            type: 'scatter',
            coordinateSystem: 'geo',
            data:'', //[{name: "北京",value:[116.405285, 39.904989, 177]}],
            symbolSize: function(val) {
                return val[2] / 10;
            },
            label: {
                normal: {
                    formatter: '{b}',
                    position: 'right',
                    show: true
                },
                emphasis: {
                    show: true
                }
            },
            itemStyle: {
                normal: {
                    color: '#05C3F9'
                }
            }
        },
        {
            type: 'map',
            map: mapName,
            geoIndex: 0,
            aspectScale: 0.75, //长宽比
            showLegendSymbol: false, // 存在legend时显示
            label: {
                normal: {
                    show: true
                },
                emphasis: {
                    show: false,
                    textStyle: {
                        color: '#fff'
                    }
                }
            },
            roam: true,
            itemStyle: {
                normal: {
                    areaColor: '#031525',
                    borderColor: '#3B5077',
                },
                emphasis: {
                    areaColor: '#2B91B7'
                }
            },
            animation: false,
            data: data
        },
        {
            name: '点',
            type: 'scatter',
            coordinateSystem: 'geo',
            symbol: 'pin', //气泡
            symbolSize: function(val) {
                var a = (maxSize4Pin - minSize4Pin) / (max - min);
                var b = minSize4Pin - a * min;
                b = maxSize4Pin - a * max;
                return a * val[2] + b;
            },
            label: {
                normal: {
                    show: false,
                }
            },
            itemStyle: {
                normal: {
                    color: '#F62157', //标志颜色
                }
            },
            zlevel: 6,
            data: '',
        },
        {
            name: 'Top 5',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            data:'',
            symbolSize: function(val) {
                return val[2] / 10;
            },
            showEffectOn: 'render',
            rippleEffect: {
                brushType: 'stroke'
            },
            hoverAnimation: true,
            label: {
                normal: {
                    formatter: '{b}',
                    position: 'right',
                    show: true
                }
            },
            itemStyle: {
                normal: {
                    color: 'yellow',
                    shadowBlur: 10,
                    shadowColor: 'yellow'
                }
            },
            zlevel: 1
        },

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


</style>
