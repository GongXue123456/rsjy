<template>
  <el-container class="shopList">
    <el-header class="box add bb">
      <h5 class="mb10">
        <span class="lines"></span>企业统计
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
          <div class="ml20 tl f14 c999">时间：<span  v-if="page.search_time_bigen" class="c333 mr30">{{page.search_time_bigen}} 至 {{page.search_time_end}}</span><span class="mr30" v-else>---</span>地点：<span class="c333 ">{{page.province}}{{page.city}}{{page.area}}{{page.town}}{{page.vill}}</span></div>
          <el-row class="mt20 c999 f14">
           <el-col :span="6">已备案企业<p class="mt5"><span class="c333 f25 fb mr5">{{data1.company_all}}</span>家</p></el-col>
           <el-col :span="6">食品生产<p class="mt5"><span class="c333 f25 fb mr5">{{data1.company_all_sc}}</span>家</p></el-col>
           <el-col :span="6">食品流通<p class="mt5"><span class="c333 f25 fb mr5">{{data1.company_all_lt}}</span>家</p></el-col>
           <el-col :span="6">食品餐饮<p class="mt5"><span class="c333 f25 fb mr5">{{data1.company_all_cy}}</span>家</p></el-col>
          </el-row>
          <div id="aaa" class="mt20" style="height:380px"></div>
      </div>
     
      <div class="box list  mt20">
         <div class="title f15">
          <p><span class="triangle-right fl ml10 mr10"></span>企业统计明细表</p>
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
          <el-table-column prop="company_all" label="已备案企业" align="center"></el-table-column>
          <el-table-column prop="company_all_sc" label="食品生产" align="center"></el-table-column>
          <el-table-column prop="company_all_lt" label="食品流通" align="center"></el-table-column>
          <el-table-column prop="company_all_cy" label="食品餐饮" align="center"></el-table-column>
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
let option;
export default {
  data() {
    return {
      page: {
        down_name:'',
        province: "",
        city: "",
        area: "",
        town: "",
        vill: "",
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
    this.getDate();
    this.userData = local.get("user");
    this.handleUserLevel(this.userData);
    this.init(this.page);
  },
  methods: {
    init(params) {
        if(this.userData.province){this.page.province=this.userData.province;}
          if(this.userData.city){this.page.city=this.userData.city;}
          if(this.userData.area){this.page.area=this.userData.area;}
          if(this.userData.town){this.page.town=this.userData.town;}
          if(this.userData.vill){this.page.vill=this.userData.vill;}
       axios.get('/api/statistics/company/companyRecord', params).then((v) => {
           this.data1=v
      })
      axios.get('/api/statistics/company/companyRecordList', params).then((v) => {
           this.tableData=v.company_list
           if(this.tableData.length>0){
             v.company_list.map(item=>{
          option.xAxis[0].data.push(item.region_name.replace(/([^\n]{1})/g,"$1\n"))
           option.series[0].data.push(item.company_all_sc)
            option.series[1].data.push(item.company_all_lt)
            option.series[2].data.push(item.company_all_cy)
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
    this.timer=setInterval(() => { this.check("export_companyrecordlist_search");}, 2000);
    if(this.page.search_time_end==null){this.page.search_time_end='';}
    if(this.page.search_time_bigen==null){this.page.search_time_bigen='';}
    let statename
    if(this.page.search_time_end!=''&&this.page.search_time_bigen!=''){
        statename = this.page.search_time_bigen+'至'+this.page.search_time_end+'企业统计明细表';
    }else{
        statename ='企业统计明细表';
    }
   this.page.down_name = statename
    axios.fileget('/api/report/export_companyrecordlist_search', this.page).then((v) => {})
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
      
      switch (type) {
        case 2:
          this.cityOptions = regionData;
          this.areaOptions = [];
          this.townOptions = [];
          this.villOptions = [];
          this.page.province = item.region_name;
          this.page.city = "";
          this.page.area = "";
          this.page.town = "";
          this.page.vill = "";
          break;
        case 3:
          this.areaOptions = regionData;
          this.townOptions = [];
          this.villOptions = [];
          this.page.city = item.region_name;
          this.page.area = "";
          this.page.town = "";
          this.page.vill = "";
          break;
        case 4:
          this.townOptions = regionData;
          this.villOptions = [];
          this.page.area = item.region_name;
          this.page.town = "";
          this.page.vill = "";
          break;
        case 5:
          this.villOptions = regionData;
          this.page.town = item.region_name;
          this.page.vill = "";
          break;
        case 6:
          this.page.vill = item.region_name;
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
        option = {
            legend: {
              x:'right',      //可设定图例在左、右、居中
              y:'top',     //可设定图例在上、下、居中
              padding:[0,30,0,0],   //可设定图例[距上方距离，距右方距离，距下方距离，距左方距离]
              data: ['食品生产', '食品流通', '食品餐饮']
            },
            color: ['#4CD1D0', '#6B7DED','#C6CAD1'],
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
                    name:'单位：家', 
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
                    name:'食品生产',
                    type:'bar',
                    barWidth: '10',
                    data:[]
                },
                {
                  name: '食品流通',
                  type: 'bar',
                  barGap: 0,
                  barWidth: '10',
                  data: []
                },{
                  name: '食品餐饮',
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
      .el-col-6{border: 1px solid #ccc;border-right: none;padding: 10px;}
      .el-col-6:last-child{border-right: 1px solid #ccc;}
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
