<template>
  <div class="body">
     <div class="viewport">
        <div class="column">
            <!-- 地图 -->
            <div class="map">
                <h3>
                    <span class="icon-cube"></span>
                    设备数据统计
                </h3>
                <div class="chart">
                    <div class="map-box" id="map" style="margin: 30px auto; width: 1200px; height: 500px;"></div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>
<script>
import { local } from "../../util/util";
 import echarts from "echarts";
import axios from "axios";
import Vue from "vue";
var chinaId = 100000;
var chinaName = "china";
var chinaJson = null;
let option,option2,option1,option3,endPercent,progress1,dom;
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
export default {
  name: 'DutyInfo',
  components: {},
  data() {
    return {
       
    };
  },
  mounted() {
       this.mapChart();

  },
  methods: {
       mapChart() {
            let myChart = echarts.init(document.getElementById("map"));
                 option1 = null;
                axios.get("/510100.json", {}).then(result => {
                    echarts.registerMap(name, result.data);
                    option1 = {
                        tooltip: {
                            trigger: 'item',
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
                            zoom: 1.3,   //地图初始大小，这里是关键，一定要放在 series中  因为geo在series中会加载，所以zoom放在此处
                            roam: true,
                            label: {
                                normal: {
                                    show: true,
                                    color:'#333'
                                },
                                emphasis: {
                                    textStyle: {
                                        color: '#fff'
                                    }
                                }
                            },
                            itemStyle: {
                                normal: {
                                    borderColor: '#4a86fd', //区域边框颜色
                                    areaColor: '#bfdfe0', //区域填充颜色
                                },
                                emphasis: {
                                    areaColor: '#4380fd',
                                    borderWidth: 0
                                }
                            },
            
                        },
                        series: [{
                            type: 'effectScatter',      
                            coordinateSystem: 'geo',
                            // animation: true,
                            rippleEffect: {
                               brushType: 'stroke'
                           },
                            symbolSize: function (val,params) { //散点大小
                                  return val[2];
                            },
                            data:[]
            
                        }]
                    };
             
                    myChart.setOption(option1,true); 
                    window.addEventListener("resize",function(){ //浏览器大小调整echarts随之改变
                        myChart.resize();
                    });
                });
    },
     


     }
  }



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

</style>
