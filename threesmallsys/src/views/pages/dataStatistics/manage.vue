<template>
  <el-container class="shopList">
    <el-header class="box add bb">
      <h5 class="mb10">
        <span class="lines"></span>管理员统计
      </h5>
    </el-header>
    <el-main class="pt0">
      <el-row class="box search mt20" :gutter="10">
        <el-form :inline="true" :model="page" class="demo-form-inline">
          <el-col :span="4">
            <el-form-item size="small">
              <el-select clearable  v-model="provinceTemp"  placeholder="请选择省级" @change="handleChange($event,2)" value-key="region_name" :disabled="provinceFlag" >
                <el-option v-for="item in provinceOptions" :key="item.region_code" :label="item.region_name" :value="item" ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item size="small">
              <el-select clearable v-model="cityTemp" placeholder="请选择市级" @change="handleChange($event,3)" value-key="region_name" :disabled="cityFlag"  >
                <el-option v-for="item in cityOptions" :key="item.region_code" :label="item.region_name" :value="item" ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item size="small">
              <el-select clearable v-model="areaTemp" placeholder="请选择区县级" @change="handleChange($event,4)" value-key="region_name" :disabled="areaFlag" >
                <el-option  v-for="item in areaOptions" :key="item.region_code" :label="item.region_name" :value="item" ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item size="small">
              <el-select clearable v-model="townTemp" placeholder="请选择镇级" @change="handleChange($event,5)" value-key="region_name" :disabled="townFlag" >
                <el-option v-for="item in townOptions" :key="item.region_code" :label="item.region_name" :value="item" ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item size="small">
              <el-select clearable v-model="villTemp" placeholder="请选择村级" value-key="region_name" @change="handleChange($event,6)" :disabled="villFlag" >
                <el-option v-for="item in villOptions" :key="item.region_code" :label="item.region_name" :value="item" ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8" class="mr10">
          <el-form-item size="small">
            <el-col class="line" :span="11">
            <el-date-picker  type="date" placeholder="开始日期" v-model="page.search_time_bigen"  :picker-options="pickerOptionsStart" style="width: 100%;" format="yyyy-MM-dd" value-format="yyyy-MM-dd" @change="change(1,page.search_time_bigen)"></el-date-picker>
            
           </el-col>
            <el-col class="line" :span="2">至</el-col>
           <el-col class="line" :span="11">
            <el-date-picker   type="date" placeholder="结束日期" v-model="page.search_time_end" :picker-options="pickerOptionsEnd" style="width: 100%;" format="yyyy-MM-dd" value-format="yyyy-MM-dd" @change="change(2,page.search_time_end)"></el-date-picker>
           
           </el-col>
        </el-form-item>
        </el-col>
          <el-col :span="2" class="tl mr10">
            <el-form-item size="small">
              <el-button type="primary" @click="onSearch" class="general_bgc general_border cfff">查询</el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <div class="echarts">
          <div class="ml20 tl f14 c999">时间：<span  v-if="page.search_time_bigen" class="c333 mr30">{{page.search_time_bigen}} 至 {{page.search_time_end}}</span><span class="mr30" v-else>---</span>地点：<span class="c333 ">{{page.user_province}}{{page.user_city}}{{page.user_area}}{{page.user_town}}{{page.user_vill}}</span></div>
          <el-row v-if="user_level=='1'" class="mt20 c999 f14">
           <el-col  :span="6">市级管理员<p class="mt5"><span class="c333 f25 fb mr5">{{data1.user_city}}</span>人</p></el-col>
           <el-col :span="6">区县管理员<p class="mt5"><span class="c333 f25 fb mr5">{{data1.user_area}}</span>人</p></el-col>
           <el-col :span="6">乡镇管理员<p class="mt5"><span class="c333 f25 fb mr5">{{data1.user_town}}</span>人</p></el-col>
           <el-col :span="6">协管员<p class="mt5"><span class="c333 f25 fb mr5">{{data1.user_vill}}</span>人</p></el-col>
          </el-row>
          <el-row v-else-if="user_level=='2'" class="mt20 c999 f14">
           <el-col :span="8">区县管理员<p class="mt5"><span class="c333 f25 fb mr5">{{data1.user_area}}</span>人</p></el-col>
           <el-col :span="8">乡镇管理员<p class="mt5"><span class="c333 f25 fb mr5">{{data1.user_town}}</span>人</p></el-col>
           <el-col :span="8">协管员<p class="mt5"><span class="c333 f25 fb mr5">{{data1.user_vill}}</span>人</p></el-col>
          </el-row>
          <el-row v-else-if="user_level=='3'" class="mt20 c999 f14">
           <el-col :span="12">乡镇管理员<p class="mt5"><span class="c333 f25 fb mr5">{{data1.user_town}}</span>人</p></el-col>
           <el-col :span="12">协管员<p class="mt5"><span class="c333 f25 fb mr5">{{data1.user_vill}}</span>人</p></el-col>
          </el-row>
          <el-row v-else-if="user_level=='4'" class="mt20 c999 f14">
           <el-col :span="24">协管员<p class="mt5"><span class="c333 f25 fb mr5">{{data1.user_vill}}</span>人</p></el-col>
          </el-row>
          <div id="aaa" class="mt20" style="height:380px"></div>
      </div>
     
      <div class="box list  mt20">
         <div class="title f15">
          <p><span class="triangle-right fl ml10 mr10"></span>管理员统计明细表</p>
        <el-button type="primary" v-if="loading==false" size="small" @click="DownExcel">导出数据</el-button>
          <el-button  v-else-if="loading==true" type="info" disabled size="small" >导出数据</el-button>
      </div>
        <el-table  class="mt20  clear" border :data="tableData" style="width: 100%" fit>
          <el-table-column type="index" width="120" label="序号" align="center"></el-table-column>
          <el-table-column label="区域" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.region_name}}</span>
            </template>
          </el-table-column>
          <el-table-column  v-if="data1.user_city>=0" prop="user_city" label="市级管理员" align="center"></el-table-column>
          <el-table-column  v-if="data1.user_area>=0" prop="user_area" label="区县管理员" align="center"></el-table-column>
          <el-table-column  v-if="data1.user_town>=0" prop="user_town" label="乡镇管理员" align="center"></el-table-column>
          <el-table-column  v-if="data1.user_vill>=0" prop="user_vill" label="协管员" align="center"></el-table-column>
        </el-table>
      </div>
    </el-main>
  </el-container>
</template>
<script>
import axios from "../../../util/api";
import { mapGetters } from "vuex";
import { local } from "../../../util/util";
var echarts = require('echarts/lib/echarts');
import 'echarts/map/js/province/sichuan.js'; 
// 引入柱状图
require('echarts/lib/chart/bar');
require('echarts/lib/chart/pie');
// 引入提示框和标题组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/legend');
require('echarts/lib/component/title');

let option,legenddata;
export default {
  data() {
    return {
      page: {
        down_name:'',
        user_province: "",
        user_city: "",
        user_area: "",
        user_town: "",
        user_vill: "",
        search_time_bigen:"",
        search_time_end:''
      },
      provinceTemp: "",
      cityTemp: "",
      areaTemp: "",
      townTemp: "",
      villTemp: "",
      provinceFlag: false,
      cityFlag: false,
      areaFlag: false,
      townFlag: false,
      villFlag: false,
      provinceOptions: [],
      cityOptions: [],
      areaOptions: [],
      townOptions: [],
      villOptions: [],
      tableData: [],
      userData:{},
      data1:'',
      timer:'',
      user_level:'',
      loading:false,
      pickerOptionsStart: {
        disabledDate: time => {
          if (this.page.search_time_end) {
            return time.getTime() > new Date(this.page.search_time_end).getTime()
          }else{return time.getTime() > Date.now()}
        }
      },
      pickerOptionsEnd: {
        disabledDate: time => {
          return time.getTime() > Date.now()
        }
      },
    };
  },
  computed: {
  },
  mounted() {
    this.userData = local.get("user");
    this.user_level=local.get("user").user_level
    this.getDate();
   
    this.handleUserLevel(this.userData);
    this.init(this.page);
  },
  methods: {
    init(params) {
        if(this.userData.province){this.page.user_province=this.userData.province;}
          if(this.userData.city){this.page.user_city=this.userData.city;}
          if(this.userData.area){this.page.user_area=this.userData.area;}
          if(this.userData.town){this.page.user_town=this.userData.town;}
          if(this.userData.vill){this.page.user_vill=this.userData.vill;}
       axios.get('/api/statistics/user/manager', params).then((v) => {
           this.data1=v
      })
      axios.get('/api/statistics/user/managerList', params).then((v) => {
           this.tableData=v.user_list
           if(this.tableData.length>0){
             v.user_list.map(item=>{
          option.xAxis[0].data.push(item.region_name.replace(/([^\n]{1})/g,"$1\n"))
           option.series[0].data.push(item.user_city)
            option.series[1].data.push(item.user_area)
            option.series[2].data.push(item.user_town)
             option.series[3].data.push(item.user_vill)
        })
              let myChart = echarts.init(document.getElementById("aaa"));
       myChart.setOption(option);
           }
      })

    },
    async handleUserLevel(userData) {
      if (parseInt(userData.user_level) > 0) {
        this.provinceOptions = await this.fetchRegionData(1);
        let province = this.provinceOptions.find(
          item => item.region_name == userData.province
        );
         this.provinceTemp = province;
        if (parseInt(userData.user_level) >= 1&&userData.province!=null) {
          this.cityOptions = await this.fetchRegionData(2,province.region_code);
          let city = this.cityOptions.find(item => item.region_name == userData.city );
         
          this.provinceFlag = true;
          if (parseInt(userData.user_level) >= 2&&userData.city!=null) {
            this.areaOptions = await this.fetchRegionData(3, city.region_code);
            let area = this.areaOptions.find(
              item => item.region_name == userData.area
            );
            this.cityTemp = city;
            this.cityFlag = true;
            if (parseInt(userData.user_level) >= 3&&userData.area!=null) {
              this.townOptions = await this.fetchRegionData(4,area.region_code);
              let town = this.townOptions.find(
                item => item.region_name == userData.town
              );
              this.areaTemp = area;
              this.areaFlag = true;
              if (parseInt(userData.user_level) >= 4&&userData.town!=null) {
                this.villOptions = await this.fetchRegionData(5,town.region_code);
                let vill = this.villOptions.find(
                  item => item.region_name == userData.vill
                );
                this.townTemp = town;
                this.townFlag = true;
                if (parseInt(userData.user_level) >= 5&&userData.vill!=null) {
                  this.page.vill = vill;
                  this.villFlag = true;
                }
              }
            }
          }
        }
      }
    },
    fetchRegionData(type, region_high_code) {
 
      let region_type = type.toString();
         return new Promise((resolve, reject) => {
        axios
          .get("/api/region/list", { region_type, region_high_code })
          .then(response => {
            resolve(response);
          })
          .catch(err => {
            reject(err);
          });
      });
      //  }
      
    },
    // 搜索
    onSearch() {
        if(this.page.search_time_end==null){this.page.search_time_end='';}
      if(this.page.search_time_bigen==null){this.page.search_time_bigen='';}
       this.getDate();
      this.init(this.page);
    },
      DownExcel () { 
    this.loading=true;
    this.timer=setInterval(() => { this.check("export_managerlist_search");}, 2000);
    if(this.page.search_time_end==null){this.page.search_time_end='';}
    if(this.page.search_time_bigen==null){this.page.search_time_bigen='';}
    let statename
    if(this.page.search_time_end!=''&&this.page.search_time_bigen!=''){
        statename = this.page.search_time_bigen+'至'+this.page.search_time_end+'管理员统计明细表';
    }else{
        statename ='管理员统计明细表';
    }
   this.page.down_name = statename
    axios.fileget('/api/report/export_managerlist_search', this.page).then((v) => {})
  },
check(d_name){
    axios.get('/api/report/check',  {down_name:d_name}).then((v) => {
      if(v==true){
        clearInterval(this.timer);
        this.loading=false;
      }
    })
  },
    async handleChange(item, type) {
       let  regionData;
     if(item.region_code==undefined){
        regionData=''
     }else{
       regionData = await this.fetchRegionData(type, item.region_code);
     }
       if(item==''){ 
          this.user_level=type-2
         }else{this.user_level=type-1}
      switch (type) {
        case 2:
          this.cityOptions = regionData;
          this.areaOptions = [];
          this.townOptions = [];
          this.villOptions = [];
          this.page.user_province = item.region_name;
          this.page.user_city = "";
          this.page.user_area = "";
          this.page.user_town = "";
          this.page.user_vill = "";
          break;
        case 3:
          this.areaOptions = regionData;
          this.townOptions = [];
          this.villOptions = [];
          this.page.user_city = item.region_name;
          this.page.user_area = "";
          this.page.user_town = "";
          this.page.user_vill = "";
          break;
        case 4:
          this.townOptions = regionData;
          this.villOptions = [];
          this.page.user_area = item.region_name;
          this.page.user_town = "";
          this.page.user_vill = "";
          break;
        case 5:
          this.villOptions = regionData;
          this.page.user_town = item.region_name;
          this.page.user_vill = "";
          break;
        case 6:
          this.page.user_vill = item.region_name;
          break;
      }
       
      this.onSearch()
    },
     change(index,val){
        var that=this;
         if (val == null) val = '';
if(index==1){that.page.search_time_bigen=val}
if(index==2){that.page.search_time_end=val}
 this.onSearch()
     },
     
    getDate(){
         if(this.user_level=='1'){
             legenddata= ['市级管理员', '区县管理员', '乡镇管理员', '协管员']
        }else if(this.user_level=='2'){
              legenddata= ['','区县管理员', '乡镇管理员', '协管员']
        }else if(this.user_level=='3'){
              legenddata= ['','','乡镇管理员', '协管员']
        }else if(this.user_level=='4'){
              legenddata= ['','','','协管员']
        }
        option = {
            legend: {
              x:'right',      //可设定图例在左、右、居中
              y:'top',     //可设定图例在上、下、居中
              padding:[0,30,0,0],   //可设定图例[距上方距离，距右方距离，距下方距离，距左方距离]
              data: legenddata
            },
             color: ['#4CD1D0', '#49D26D','#FD9246','#C6CAD1'],
            tooltip : {
               show:false
            },
            grid: {
                left: '2%',
                right: '2%',
                bottom: '2%',
                containLabel: true
            },
            xAxis : [
                {
                    type : 'category',
                    data: [],
                    axisTick: {
                     show: false
                    },
                }
            ],
            
            yAxis: [
                {  
                    type: 'value', 
                    name:'单位：人', 
                    axisLabel: {  
                        show: true,  
                        interval: 'auto',  
                        formatter: '{value}'  
                    },
                    axisTick: {
                     show: false
                    },  
                    show: true  
                        }  
                    ],
            series : [
                {
                    name:'市级管理员',
                    type:'bar',
                    barWidth: '10',
                    data:[]
                },
                {
                  name: '区县管理员',
                  type: 'bar',
                  barGap: 0,
                  barWidth: '10',
                  data: []
                },{
                  name: '乡镇管理员',
                  type: 'bar',
                  barGap: 0,
                  barWidth: '10',
                  data: []
                },{
                  name: '协管员',
                  type: 'bar',
                  barGap: 0,
                  barWidth: '10',
                  data: []
                },
            ]
        };
  }
  },
  
};
</script>
<style lang="scss" scoped>
.shopList {
  overflow-x: hidden;
  .add {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .echarts{
      .el-col-6,.el-col-8,.el-col-12,.el-col-24{border: 1px solid #ccc;border-right: none;padding: 10px;}
      .el-col-6:last-child,.el-col-8:last-child,.el-col-12:last-child,.el-col-24:last-child{border-right: 1px solid #ccc;}
  }
  /deep/ .el-input-group__append .el-button--primary .el-icon-search {
    color: #fff;
  }
  .title{
    display: flex;
    justify-content: space-between;
    align-items: center;
 
      .triangle-right {
 display: inline-block;
 vertical-align: bottom;
 width: 0; 
 height: 0;
 border-width: 10px 0px 10px 16px;
 border-style: solid;
 border-color: transparent  transparent  transparent #FF992C;
} }
   
}
</style>
