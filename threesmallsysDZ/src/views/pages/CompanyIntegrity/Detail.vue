<template>
  <el-container class="shopList">
    <el-header class="box add bb">
        <h5 class="mb10"><span class="lines"></span>诚信等级详情</h5>
       <div>
          <el-button  class="back_btn"  size="small" plain @click="$router.back()">返回</el-button>
        </div>
    </el-header>
    <el-main class="pt0">
       <div class="box title mt20 mb20 f16">
         <div class="tl tip mb10">
           <p class="f15 general_color ">诚信等级详情每条结果（不包含监管直接调整评分）计算公式如下</p>
           <p class="f13 t1">1：结果A=该周期（监管打分总分/监管打分总人数)*监管打分占比+（公众打分总分/公众打分总人数)*公众打分占比</p>
           <p class="f13 t1">2：结果A：小数位0.5，舍去小数位；小数位=0.5，值不变；小数位>0.5,五入</p>
         </div>
       <div class="tl c333 rate" >{{company_name}}
         <el-rate class="disib ml10 f20" v-model="lvl_new" disabled show-score text-color="#ff9900" score-template="{value}"> </el-rate>
       </div>
     </div>
     <div>
       <div id="main2" class="f13" ref="main2" style="width:100%;height:230px;"></div>
     </div>
    <div class="box list">
       <el-table border :data="tableData" style="width: 100%">
        <el-table-column type="index" label="序号" width="60" align='center'></el-table-column>
        <el-table-column prop="add_time" min-width="150" :show-overflow-tooltip="true" label="评定时间" align='center'></el-table-column>
        <el-table-column prop="integrity_lvl_new"  min-width="150" :show-overflow-tooltip="true" label="诚信经营等级"  align='center'>
            <template slot-scope="scope">
              <el-rate v-model="scope.row.integrity_lvl_new" disabled show-score text-color="#ff9900" score-template="{value}"> </el-rate>
        </template>
        </el-table-column>
        <el-table-column  min-width="150" :show-overflow-tooltip="true" label="备注" align='center'>
           <template slot-scope="scope">
             <span v-if="scope.row.remark!=null">{{scope.row.remark}}</span>
             <span v-else>---</span>
        </template>
        </el-table-column>
        <el-table-column label="操作" width="120" fixed="right"  align='center'>
          <template slot-scope="scope">
           <el-button type="text" class="general_color" size="small" @click="godetail(scope.row.company_integrity_code)">详情</el-button>
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


    </el-main>
  </el-container>
</template>
<script>
var echarts = require('echarts/lib/echarts');
require('echarts/lib/chart/line');
require('echarts/lib/chart/pie');
require('echarts/lib/chart/radar');
// 引入提示框和标题组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/legend');
require('echarts/lib/component/title');
import axios from '../../../util/api'
import { mapState } from 'vuex'
let option2;
export default {
  data () {
    return {
      page: {
        pager_offset: '0',
        company_code:'',
      
      },

      lvl_new:0,
      company_name: '',
     currentPage: 1,
      total: 0,
      tableData:[],
    }
  },
  mounted(){
      this.$nextTick(function() {
      this.drawPie();
    });
  },
   created () {
      this.page.company_code=this.$route.query.id;
       this.company_name=this.$route.query.name;
    this.currentPage = this.page.pager_offset / 10 + 1
    this.init(this.page)
  },
  methods: {
           init (params) {
             var that=this
        axios.get('/api/companyIntegrity/list', params).then((v) => {
        that.tableData=v.company_integrity_list;
        this.lvl_new=v.company_integrity_list[0].integrity_lvl_new
         that.total = v.pager_count;
         v.company_integrity_list.forEach(item=>{
           option2.xAxis.data.push(item.add_time)
           option2.series[0].data.push(item.integrity_lvl_new)
        })
               let myChart2 = echarts.init(document.getElementById("main2"));
       myChart2.setOption(option2);
      })
    },
    // 分页
    currentChange(page){
      this.currentPage = page;
      this.page.pager_offset = String((page - 1) * 10)
      this.init(this.page)
    },
   godetail(index){
    this.$router.push({
        name: "DetailLog",
        query: {
          id: index,
          name:this.company_name
        }
      });
  },
   drawPie() {
      option2 = {
        grid: {top: "5%",left: "5%",right: "5%", bottom: "5%",containLabel: true},
        legend: {icon: "rectangle",data: ["total", "dfs_used"],right: "4%",textStyle: { fontSize: 12, color: "#666" }},
        xAxis: {type: "category",axisTick: {show: false},
          boundaryGap: false,
          splitLine: {show: false,lineStyle: {color: ["#315070"] }},
          axisLabel: {color: "#315070",interval: 0,},
          axisLine: {lineStyle: {color: "#315070",width: 1 }},
        },
        yAxis: {type: "value", max: 5,splitNumber: 5, boundaryGap: false,
          axisTick: {show: false},
          axisLabel: {color: "#315070"},
          axisLine: {lineStyle: {width: 1,color: "#315070"}},
          splitLine: {show: false},
          // data: ["1","2","3","4","5"],
        },
        series: [{type: "line",symbol: "none",smooth: true,itemStyle: {normal: {color: "#2EC68A"}},
            areaStyle: {normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{offset: 0,color: "#E8F7EF"},{offset: 1,color: "rgba(232,247,239,.3)"}])
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

    }
  }
}
</script>
<style lang="scss" scoped>
.shopList{
  overflow-x: hidden;
  .add{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .title{.tip{background-color: #F5FAFF;border:1px dashed #2EC68A;padding: 8px 15px;border-radius: 6px;line-height: 1.8;}}
 /deep/ .el-input-group__append .el-button--primary .el-icon-search{color: #fff;}
  /deep/ .rate .el-rate__icon{font-size: 25px;}
}

</style>
