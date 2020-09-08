<template>
  <el-container class="shopList">
    <el-main class="pt0">
      <el-row >
       <el-col :span="6" class="mb20"><span>温度</span><div class="chart" id="chart1"   ref="Purple">1</div></el-col>
       <el-col :span="6" class="mb20"><span>湿度</span><div class="chart" id="chart2" ref="Purple1">2</div></el-col>
       <el-col :span="6" class="mb20"><span>烟雾</span><div class="chart" id="chart3" ref="Purple2">3</div></el-col>
       <el-col :span="6" class="mb20"><span>甲烷</span><div class="chart" id="chart4" ref="Purple3"></div></el-col>
       <el-col :span="6"><span>液化气</span><div class="chart" id="chart5" ref="Purple4"></div></el-col>
       <el-col :span="6"><span>一氧化碳</span><div class="chart"  id="chart6" ref="Purple5"></div></el-col>
       <el-col :span="6"><span>水质</span><div class="chart" id="chart7" ref="Purple6"></div></el-col>
       <el-col :span="6"><span>酸碱度</span><div class="chart" id="chart8" ref="Purple7"></div></el-col>
     </el-row>
    </el-main>
  </el-container>
</template>
<script>
import axios from '../../../util/api'
import { mapState } from 'vuex'
// import echarts from 'echarts'
var echarts = require('echarts/lib/echarts');
require('echarts/lib/chart/gauge');
let option,option1,option2,option3,option4,option5,option6,option7,myChart,myChart1,myChart2,myChart3,myChart4,myChart5,myChart6,myChart7,mq2_monitor_val,mq4_monitor_val,mq5_monitor_val,mq9_monitor_val;
export default {
  data () {
    return {
      page: {
        sensor_number: '',
      
      },
    }
    
  },
   created () {
       this.page.sensor_number = this.$route.query.id;
    this.init(this.page)
    
  },
  mounted(){
      this.clientWidth = `${document.documentElement.clientWidth}`;
    this.$refs.Purple.style.width = (this.clientWidth-300)/4 + "px";
    this.$refs.Purple.style.height =(this.clientWidth-300)/4+ "px";
     this.$refs.Purple1.style.width = (this.clientWidth-300)/4 + "px";
    this.$refs.Purple1.style.height =(this.clientWidth-300)/4+ "px";
     this.$refs.Purple2.style.width = (this.clientWidth-300)/4 + "px";
    this.$refs.Purple2.style.height =(this.clientWidth-300)/4+ "px";
     this.$refs.Purple3.style.width = (this.clientWidth-300)/4 + "px";
    this.$refs.Purple3.style.height =(this.clientWidth-300)/4+ "px";
this.$refs.Purple4.style.width = (this.clientWidth-300)/4 + "px";
    this.$refs.Purple4.style.height =(this.clientWidth-300)/4+ "px";
    this.$refs.Purple5.style.width = (this.clientWidth-300)/4 + "px";
    this.$refs.Purple5.style.height =(this.clientWidth-300)/4+ "px";
    this.$refs.Purple6.style.width = (this.clientWidth-300)/4 + "px";
    this.$refs.Purple6.style.height =(this.clientWidth-300)/4+ "px";
    this.$refs.Purple7.style.width = (this.clientWidth-300)/4 + "px";
    this.$refs.Purple7.style.height =(this.clientWidth-300)/4+ "px";
      this.initChart()
  },
  methods: {
    getCaption(obj){
      var index=obj.lastIndexOf("\-");
      obj=obj.substring(index+1,obj.length);
      return obj;
    },
    init (params) {
      axios.get('/api/sensor/warn/single', params).then((v) => {
          option.series[0].data[0].value = v.sensor_log.temp;
      myChart.setOption(option, true);
       option1.series[0].data[0].value = v.sensor_log.humidity;
      myChart1.setOption(option1, true);
      mq2_monitor_val=this.getCaption(v.sensor_log.mq2_monitor_range)
      option2.series[0].max = mq2_monitor_val;
      mq4_monitor_val=this.getCaption(v.sensor_log.mq4_monitor_range)
      option3.series[0].max = mq4_monitor_val;
      mq5_monitor_val=this.getCaption(v.sensor_log.mq5_monitor_range)
      option4.series[0].max = mq5_monitor_val;
      mq9_monitor_val=this.getCaption(v.sensor_log.mq9_monitor_range)
      option5.series[0].max = mq9_monitor_val;
      option6.series[0].data[0].value = v.sensor_log.tds;
      myChart6.setOption(option6, true);
      option7.series[0].data[0].value = v.sensor_log.ph;
      myChart7.setOption(option7, true);
       myChart2.setOption(option2, true);
       myChart3.setOption(option3, true);
       myChart4.setOption(option4, true);
      myChart5.setOption(option5, true);
      setInterval(function () {
        option2.series[0].data[0].value = (Math.random() * mq2_monitor_val).toFixed(0) - 0;
          myChart2.setOption(option2, true);
         option3.series[0].data[0].value = (Math.random() * mq4_monitor_val).toFixed(0) - 0;
        myChart3.setOption(option3, true);
         option4.series[0].data[0].value = (Math.random() * mq5_monitor_val).toFixed(0) - 0;
         myChart4.setOption(option4, true);
          option5.series[0].data[0].value = (Math.random() * mq9_monitor_val).toFixed(0) - 0;
         myChart5.setOption(option5, true);
      },3000);
      
      })
    },
    
    initChart(){
     myChart = echarts.init(document.getElementById('chart1'));
     myChart1 = echarts.init(document.getElementById('chart2'));
     myChart2 = echarts.init(document.getElementById('chart3'));
     myChart3 = echarts.init(document.getElementById('chart4'));
     myChart4 = echarts.init(document.getElementById('chart5'));
     myChart5 = echarts.init(document.getElementById('chart6'));
     myChart6 = echarts.init(document.getElementById('chart7'));
     myChart7 = echarts.init(document.getElementById('chart8'));
     option = {
      series: [
        {
            name: '业务指标',
            type: 'gauge',
            center: ['51%', '53%'],
            detail: {formatter: '{value} ℃',textStyle : {fontSize : 25,fontWeight: 'bolder'}},
            data: [{value: 50, name: ''}],
            axisLine : {show : true,lineStyle : {color : [[ 0.2, "#4FDBCF" ],[ 0.8, "#66BDF9" ],[ 1, "#EA5844" ],],width : 10 }},
            splitLine : {length : 15,lineStyle : { width : 2}},
            axisTick : { length : 10},
            axisLabel : {color : "#fff",distance : 10},
        }
      ]
     };
     option1 = {
      series: [
        {
            name: '业务指标',
            type: 'gauge',
            center: ['51%', '53%'],
            detail: {formatter: '{value}%rh',textStyle : {fontSize : 25,fontWeight: 'bolder'}},
            data: [{value: 50, name: ''}],
            axisLine : {show : true,lineStyle : {color : [[ 0.2, "#4FDBCF" ],[ 0.8, "#66BDF9" ],[ 1, "#EA5844" ],],width : 10}},
            splitLine : {length : 15,lineStyle : {width : 2}},
            axisTick : {length : 10},
            axisLabel : {color : "#fff",distance : 10},
        }
      ]
     };
     option2= {
      series: [
        {
            name: '业务指标',
            type: 'gauge',
            center: ['51%', '53%'],
            detail: {formatter: '{value}%',textStyle : {fontSize : 25,fontWeight: 'bolder'}},
            data: [{value: 50, name: ''}],
            axisLine : {show : true,lineStyle : {color : [[ 0.2, "#4FDBCF" ],[ 0.8, "#66BDF9" ],[ 1, "#EA5844" ],],width : 10}},
            splitLine : {length : 15,lineStyle : {width : 2}},
            axisTick : {length : 10},
            axisLabel : {color : "#fff",distance : 10},
        }
      ]
     };
    option3 = {
      series: [
        {
            name: '业务指标',
            type: 'gauge',
            center: ['51%', '53%'],
            detail: {formatter: '{value}',textStyle : {fontSize : 25,fontWeight: 'bolder'}},
            data: [{value: 50, name: ''}],
            axisLine : {show : true,lineStyle : {color : [[ 0.2, "#4FDBCF" ],[ 0.8, "#66BDF9" ],[ 1, "#EA5844" ],],width : 10}},
            splitLine : {length : 15,lineStyle : {width : 2}},
            axisTick : {length : 10},
            axisLabel : {color : "#fff",distance : 10},
        }
      ]
    };
    option4 = {
      series: [
        {
            name: '业务指标',
            type: 'gauge',
            center: ['51%', '53%'],
            detail: {formatter: '{value}',textStyle : {fontSize : 25,fontWeight: 'bolder'}},
            data: [{value: 50, name: ''}],
            axisLine : {show : true,lineStyle : {color : [[ 0.2, "#4FDBCF" ],[ 0.8, "#66BDF9" ],[ 1, "#EA5844" ],],width : 10}},
            splitLine : {length : 15,lineStyle : {width : 2}},
            axisTick : {length : 10},
            axisLabel : {color : "#fff",distance : 10},
        }
      ]
    };
    option5 = {
      series: [
        {
            name: '业务指标',
            type: 'gauge',
            center: ['51%', '53%'],
            detail: {formatter: '{value}',textStyle : {fontSize : 25,fontWeight: 'bolder'}},
            data: [{value: 50, name: ''}],
            axisLine : {show : true,lineStyle : {color : [[ 0.2, "#4FDBCF" ],[ 0.8, "#66BDF9" ],[ 1, "#EA5844" ],],width : 10}},
            splitLine : {length : 15,lineStyle : {width : 2}},
            axisTick : {length : 10},
            axisLabel : {color : "#fff",distance : 10},
        }
      ]
    };
    option6 = {
      series: [
        {
            name: '业务指标',
            type: 'gauge',
            max:'250',
            center: ['51%', '53%'],
            detail: {formatter: '{value}',textStyle : {fontSize : 25,fontWeight: 'bolder'}},
            data: [{value: 50, name: ''}],
            axisLine : {show : true,lineStyle : {color : [[ 0.2, "#4FDBCF" ],[ 0.8, "#66BDF9" ],[ 1, "#EA5844" ],],width : 10}},
            splitLine : {length : 15,lineStyle : {width : 2}},
            axisTick : {length : 10},
            axisLabel : {color : "#fff",distance : 10},
        }
      ]
    };
    option7 = {
      series: [
        {
            name: '业务指标',
            type: 'gauge',
            center: ['51%', '53%'],
            max:'14',
            detail: {formatter: '{value}',textStyle : {fontSize : 25,fontWeight: 'bolder'}},
            data: [{value: 50, name: ''}],
            axisLine : {show : true,lineStyle : {color : [[ 0.2, "#4FDBCF" ],[ 0.8, "#66BDF9" ],[ 1, "#EA5844" ],],width : 10}},
            splitLine : {length : 15,lineStyle : {width : 2}},
            axisTick : {length : 10},
            axisLabel : {color : "#fff",distance : 10},
        }
      ]
    };
    },
    
  }
}
</script>
<style lang="scss" scoped>
.el-header{display: none !important;background-color: #000 !important;}
.shopList{
  overflow-x: hidden;
  background-color: #070B10;
  .add{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .el-main{margin: auto;}
    .el-col-6{
    background: url('../../../assets/image/sensor.png') no-repeat 0px 0px;
 background-size: contain;
     span{display: inline-block;margin-top: 3px;color: #000;font-weight: bolder;}
  }
  @media screen and (min-width: 1401px) {
             .el-col-6{
     span{margin-top: 10px;}
  }
              }
}

</style>
