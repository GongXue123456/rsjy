<template>
  <el-container class="home">
    
    <el-main class=" p0">
      <el-row class="tl f14 home-content">
        <el-col :span="24"
                class="bgcfff pr">
          <baidu-map class="Bmap"
                     ak="oqnvdL14rNlcc5gi520BAbRZlW57T4NI"
                     :center="center"
                     :zoom="zoom"
                     @ready="handler"
                     :scroll-wheel-zoom="true">
            <!-- <bm-map-type :map-types="['BMAP_HYBRID_MAP','BMAP_NORMAL_MAP']"
                         anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-map-type> -->
            <!-- <bm-city-list anchor="BMAP_ANCHOR_TOP_RIGHT"
                          :offset="{width:100,height:10}"></bm-city-list> -->
            <div v-for="(marker, i) of markers"
                 :key="i">
              <bm-marker :position="{lng: marker.longitude, lat: marker.latitude}"
                         :dragging="false"
                         @click="infoWindowOpen(marker)"
                         :icon="{url:require('../../../assets/image/address.png') , size: {width: 40, height: 40}}">
                <bm-info-window :show="marker.showFlag"
                                @close="infoWindowClose(marker)"
                                style="width:300px"
                                title=""
                                :position="{lng: marker.longitude, lat: marker.latitude}"
                                @open="infoWindowOpen(marker)"
                                class="f14 c666">
                   <p class="mb5"><span class="f12 type type1 disib mr10">{{marker.companytype_name}}</span><span class="f12 type type2 disib" v-if="marker.filing_state=='1'">待审核</span><span class="f12 type type2 disib" v-else-if="marker.filing_state=='3'">已归档</span><span class="f12 type type2 disib" v-else-if="marker.filing_state=='4'">已驳回</span></p>
                  <p class="mb5 f15 c000"><span >{{marker.company_name}}</span></p>
                  <p class="mb5 f12 c666"><span>{{marker.company_address}}</span></p>
                 <div class="mb5 disib">
                    <p class="fl mr10" v-for="(item,index) in marker.accessory_list" :key="index">
                     <el-image  v-if="item.accessory_url!=''" :src="user.qyurl+item.accessory_url" fit="fill" style="width: 90px;height: 110px"></el-image>
                     <el-image v-else style="width: 90px;height: 110px" :src="require('../../../assets/image/moren.png')"
      ></el-image></p>
                 </div>
                 <div ><el-button type="primary" size="mini"  @click="godetail(marker.companytype_name,marker.company_code)">详情</el-button>  </div>
                </bm-info-window>
              </bm-marker>
            </div>
            <bm-local-search style="display:none" :keyword="keyword" :auto-viewport="true" ></bm-local-search>
          </baidu-map>
           <el-form :inline="true"  :model="formInline" class="demo-form-inline">
          <div class="map-left pa ">
            <div class="p10 bgcfff mb10">
               <el-row class="box f14">
                  <p class="mb10 f14">备案状态</p>
         <el-col :span="24" class="">
              <el-button v-for="(v,k) in list_btn" :key="k" :class="activeClass ==k?'active':''" class=""  size="mini" @click="IsActive(k,v.name)">{{v.title}}</el-button>  
         </el-col>
               </el-row>
               <el-row class="mt10 box f14">
                  <p class="mb10 f14">企业类型</p>
         <el-col :span="24" class="">
            <el-button  :class="activeClass1 ==-1?'active':''" class=""  size="mini" @click="IsActive1(-1,'')">全部</el-button>  
              <el-button v-for="(v,k) in list_btn1" :key="k" :class="activeClass1 ==k?'active':''" class=""  size="mini" @click="IsActive1(k,v.companytype_code)">{{v.companytype_name}}</el-button>  
         </el-col>
               </el-row>
            </div>
            <div class="p10 bgcfff disib">
               <el-col :span="24" class="mb10">
            <!-- <el-row class="box aa f14"> -->
         
          <el-col :span="7" class="tl">
          <el-select size="mini" v-model="formInline.province" clearable placeholder="请选择省级" @change="change(4,formInline.province)">
             <el-option v-for="group in options_province" :key="group.region_code" :label="group.region_name" :value="group.region_code"> </el-option>
          </el-select>
             </el-col>
          <el-col :span="7" class="tl ml10" >
          <el-select size="mini" v-model="formInline.city" clearable placeholder="请选择市级" @change="change(5,formInline.city)">
             <el-option v-for="group in options_city" :key="group.region_code" :label="group.region_name" :value="group.region_code"> </el-option>
          </el-select>
             </el-col>
            <el-col :span="7" class="tl ml10"  >
          <el-select size="mini" v-model="formInline.area" clearable placeholder="请选择区县" @change="change(6,formInline.area)">
             <el-option v-for="group in options_area" :key="group.region_code" :label="group.region_name" :value="group.region_code"> </el-option>
          </el-select>
             </el-col>  
        </el-col>
              <!-- <el-col :span="24" class="mb10">
                <el-form-item   size="mini" prop="company_code" :rules="[{required: true,message: '请输入企业名称', trigger: 'blur' }]" style="pandding:0px;width:100%;margin-right:0px;">
           <el-select   v-model="formInline.company_code" filterable placeholder="请输入企业名称"  clearable @change="change(1,formInline.company_code)">
            <el-option  v-for="item in tableData" :key="item.company_code" :label="item.company_name" :value="item.company_code" ></el-option>
          </el-select>
        </el-form-item>
        </el-col>  -->
          <el-col :span="24" class="mb10">
                <el-form-item   size="mini" prop="company_name" class="mb5" :rules="[{required: true,message: '请输入企业名称', trigger: 'blur' }]" style="pandding:0px;width:100%;margin-right:0px;">
          <el-input placeholder="企业名称" v-model="formInline.company_name" clearable class="input-with-select" @clear="onSubmit(formInline.company_name)">
            <el-button  slot="append" type="primary" icon="el-icon-search" class="general_bgc general_border cfff" @click="onSubmit(formInline.company_name)"></el-button></el-input>
        </el-form-item>
        </el-col> 
         <el-table :data="tableData" height="250" style="width: 100%;">
        <el-table-column prop="company_name"  min-width="150" :show-overflow-tooltip="true" label="" align='left' > </el-table-column>
        <el-table-column  label="" class-name='aa'  fixed="right" min-width="100"  align='right'>
          <template slot-scope="scope">
            <el-button  type="primary" class="bgccac cfff disib"  size="mini" @click="change(1,scope.row.company_name)">企业信息</el-button>
          
         </template>
        </el-table-column>
      </el-table>
      <div class="i-page fr disib mt20">
        <el-pagination
          background
          :page-size='100'
           :pager-count="5"
          layout="prev, pager, next"
          :total="total"
          :current-page="currentPage"
         @current-change = 'currentChange'>
        </el-pagination>
      </div>
            </div>
          </div>
          
          </el-form>
        </el-col>
      </el-row>
    </el-main>
     
  </el-container>
</template>
<script>
import axios from '../../../util/api'
import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
import BmMarker from 'vue-baidu-map/components/overlays/Marker.vue'
import BmInfoWindow from 'vue-baidu-map/components/overlays/InfoWindow.vue'
import BmLocalSearch from 'vue-baidu-map/components/search/LocalSearch.vue'
import { local } from '../../../util/util'
import md5 from 'js-md5';
var echarts = require('echarts/lib/echarts');
// 引入柱状图
require('echarts/lib/chart/bar');
require('echarts/lib/chart/pie');
// 引入提示框和标题组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/legend');
require('echarts/lib/component/title');
export default {
   components: {
    BaiduMap,
    BmMarker,
    BmInfoWindow,
    BmLocalSearch
  },
  data () {
    return {
      center: { lng: 0, lat: 0 },
      zoom: 3,　 //地图展示级别
      user:'',
      markers: '',
       list_btn:[{title: '全部',name: ''},{title: '待审核',name: '1'},{title: '已驳回',name: '4'},{title: '已归档',name: '3'}],
       list_btn1:'',
       tableData:'',
       activeClass:'',
      activeClass1:-1,
       options_province:'',
      options_city:'',
      options_area:'',
      // options_town:'',
      // options_vill:'',
      formInline:{
        pager_offset:'0',
        pager_openset:'100',
         company_code:'',
        company_name:'',
        companytype_code:'',
        companytag_code:'',
        filing_state:'',
        province:'',
        city:'',
        area:'',
      },
      currentPage: 1,
      total:0,
      keyword: '成都市'
    }
  },
  mounted () {
  },
  created () {
      this.user = local.get('user');
     this.formInline.user_code=local.get('usercode');
       this.currentPage = this.formInline.pager_offset / 100 + 1
    this.init()
    this.init1(this.formInline)
  },
  methods: {
    init () {
       axios.get('/api/department/list', {state:'1',pager_openset:'100'}).then((v) => {this.options4=v.department_list })
        if(this.user.province!=''&&this.user.province!=null){this.formInline.province=this.user.province;this.keyword=this.formInline.province;}
      if(this.user.city!=''&&this.user.city!=null){this.formInline.city=this.user.city;  this.keyword=this.formInline.province+this.formInline.city}
      if(this.user.area!=''&&this.user.area!=null){this.formInline.area=this.user.area;  this.keyword=this.formInline.province+this.formInline.city+this.formInline.area}
      // if(this.user.town!=''&&this.user.town!=null){this.formInline.town=this.user.town;}
      // if(this.user.vill!=''&&this.user.vill!=null){this.formInline.vill=this.user.vill;}
      this.getProvince();
       axios.get('/api/companytype/all', '').then((v) => {
        this.list_btn1=v;
      })
    },
    init1(params){
         this.markers='';
        axios.get('/api/device/company/list', params).then((v) => {
        v.company_list.forEach(item=>{
              this.$set(item, "showFlag", false);
          // item.push({showFlag: false});
        })
         this.markers=v.company_list;
        this.tableData=v.company_list;
         this.total=v.pager_count;
      })
    },
    // 搜索
     onSubmit () { 
      this.currentPage = 1
      this.formInline.pager_offset = '0'
      this.init1(this.formInline)
    },
     // 分页
    currentChange(page){
      this.currentPage = page;
      this.formInline.pager_offset = String((page - 1) * 100)
      this.init1(this.formInline)
    },
     godetail(index,val){
       if(index=='食品生产'){ this.$router.push({name: "ProduceDetail", query: { id: val, id1:this.formInline.filing_state }});}
  else if(index=='食品流通'){ this.$router.push({name: "CirculateDetail", query: { id: val, id1:this.formInline.filing_state }});}
   else if(index=='食品餐饮'){ this.$router.push({name: "RestaurantDetail", query: { id: val,id1:this.formInline.filing_state }});}
  },
  getdate(){
    
  },
    IsActive(k,val) {
     
        this.activeClass = k;
        this.formInline.filing_state=val;
        this.init1(this.formInline)
      },
      IsActive1(k,val) {
        this.activeClass1 = k;
        this.formInline.companytype_code=val;
        this.init1(this.formInline)
      },
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
    },
       change(index,val){
          if (val == null) val = '';
         if(index==1){this.formInline.company_name=val}
       if(index==4){
          if(val!=''){this.getProvince(val,'2')}
        this.options_province.forEach(item=>{
         if(item.region_code==val){this.formInline.province=item.region_name;}
        })
         this.formInline.city='';
         this.formInline.area='';
             this.options_city=[];
           this.options_area=[];
           this.keyword=this.formInline.province;
      }
      if(index==5){
         if(val!=''){this.getProvince(val,'3')}
        this.options_city.forEach(item=>{
         if(item.region_code==val){this.formInline.city=item.region_name;}
        })
         this.formInline.area='';
            this.options_area=[];
            this.keyword=this.formInline.province+this.formInline.city
      }
      if(index==6){
        this.options_area.forEach(item=>{
         if(item.region_code==val){this.formInline.area=item.region_name;}
        })
        this.keyword=this.formInline.province+this.formInline.city+this.formInline.area
      }
       this.init1(this.formInline)
    },
    getProvince(val,index){
        axios.get('/api/region/list',{region_high_code:val,region_type:index}).then((v) => {
          if(index=='2'){this.options_city=v;
          let city=this.formInline.city
          if(city){
             this.options_city.forEach(item=>{
               if(item.region_name==city){
                  this.getProvince(item.region_code,'3')
               }
             })
           }}
          else if(index=='3'){
            this.options_area=v;
          }
          else{this.options_province=v
            let province=this.formInline.province
           if(province){
             this.options_province.forEach(item=>{
               if(item.region_name==province){
                  this.getProvince(item.region_code,'2')
               }
             })
           }
          }
       
      })
      }
  }}
</script>
<style lang="scss">
  .BMap_shadow, .BMap_shadow img, .BMap_shadow div {
    display: none;
  }
</style>
<style lang="scss" scoped>
.home {
   height: 100vh;
  background-color: #f7f8f9;
  overflow-x: hidden;
.type{
 padding: 5px 8px;
border-radius:3px;
}

.type1{
background:rgba(29,182,94,0.1);
color: #1DB65E;
}
.type2{
background:rgba(239,42,42,0.1);
color: #EF2A2A;
}
  .home-content {
    display: flex;
    justify-content: center;
  }
  .Bmap {
    width: 100%;
    height: 100vh;
  }
  .map-left {
    width: 360px;
    height: 200px;
    left: 30px;
    top: 30px;
  }
  .active {
       background: #2EC68A;
    border-color: #2EC68A;
    color: #FFFFFF;
  }
  .el-col-24,.aa{    display: flex;justify-content:space-between;}
    /deep/ .BMap_bubble_title{display: none;}
 /deep/.el-table {
    thead{display: none;}
.el-table__header-wrapper{display: none;}
td{padding: 5px 0px;border-bottom: none;}
 } 
}
</style>