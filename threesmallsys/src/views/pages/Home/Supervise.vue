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
            <bm-driving  :start="startaddress" :end="endaddress" :panel="false" :auto-viewport="true" location=""></bm-driving>
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
                                class="f14 c666">
                                <div class="info_window">
                                  <div class="fl mr10">
                                     <el-image  v-if="marker.user_logo_url!=''" :src="user.qyurl+marker.user_logo_url" ></el-image>
                                     <el-image v-else :src="require('../../../assets/image/moren.png')" ></el-image></div>
                                  <div  class="fl">
                                      <p class="mb5 f14 c000"><span >{{marker.user_name}}</span></p>
                                       <p class="mb5 f12 c000"><span class="mr10"><i class="iconfont mr5 iconxinzengshiyaosuo general_color"></i>{{marker.department_names}}</span><span ><i class="iconfont mr5 iconshouji general_color"></i>{{marker.user_mobilephone}}</span></p>
                                  </div>
                                </div>
                                
                                <div class="clear f12" v-for="(item1,index) in marker1" :key="index" >
                  <p class="mb5  c000">工单编号：<span >{{item1.patrol_code}}</span></p>
                  <p class="mb5  c000">巡查小作坊：<span >{{item1.company_name}}</span></p>
                   <p class="mb5 c000">巡查地址：<span >{{item1.province}}{{item1.city}}{{item1.area}}{{item1.vill}}{{item1.town}}{{item1.address}}</span></p>
                 <div ><el-button type="primary" size="mini" class="bgccac" @click="godetail(marker.user_province+marker.user_city+marker.user_area+marker.user_vill+marker.user_town+marker.user_address,item1.province+item1.city+item1.area+item1.vill+item1.town+item1.address)">任务导航</el-button><el-button type="primary" size="mini"  @click="godetail1(marker.company_name,marker.patrol_code)">查看工单详情</el-button>  </div>
                                </div>
                   
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
            </div>
            <div class="p10 bgcfff disib">
               <el-col :span="24" class="mb10">
            <!-- <el-row class="box aa f14"> -->
         
          <el-col :span="7" class="tl">
          <el-select size="mini" v-model="formInline.user_province" clearable placeholder="请选择省级" @change="change(4,formInline.user_province)">
             <el-option v-for="group in options_province" :key="group.region_code" :label="group.region_name" :value="group.region_code"> </el-option>
          </el-select>
             </el-col>
          <el-col :span="7" class="tl ml10" >
          <el-select size="mini" v-model="formInline.user_city" clearable placeholder="请选择市级" @change="change(5,formInline.user_city)">
             <el-option v-for="group in options_city" :key="group.region_code" :label="group.region_name" :value="group.region_code"> </el-option>
          </el-select>
             </el-col>
            <el-col :span="7" class="tl ml10"  >
          <el-select size="mini" v-model="formInline.user_area" clearable placeholder="请选择区县" @change="change(6,formInline.user_area)">
             <el-option v-for="group in options_area" :key="group.region_code" :label="group.region_name" :value="group.region_code"> </el-option>
          </el-select>
             </el-col>  
             <!-- <el-col :span="4" class="tl ml10"  >
          <el-select v-model="formInline.user_town" clearable placeholder="请选择乡镇" @change="change(7,formInline.user_town)">
             <el-option v-for="group in options_town" :key="group.region_code" :label="group.region_name" :value="group.region_code"> </el-option>
          </el-select>
             </el-col> 
              <el-col :span="4" class="tl ml10"  >
          <el-select v-model="formInline.user_vill" clearable placeholder="请选择社区" @change="change(8,formInline.user_vill)"  @remove-tag="change(8,tag)">
             <el-option v-for="group in options_vill" :key="group.region_code" :label="group.region_name" :value="group.region_code"> </el-option>
          </el-select>
             </el-col>         -->
            <!-- </el-row> -->
        </el-col>
              <el-col :span="24" class="mb10">
                <el-form-item   size="mini" prop="user_name" class="mb5" :rules="[{required: true,message: '请输入巡查人姓名', trigger: 'blur' }]" style="pandding:0px;width:100%;margin-right:0px;">
          <el-input placeholder="巡查人姓名" v-model="formInline.user_name" clearable class="input-with-select" @clear="onSubmit">
            <el-button  slot="append" type="primary" icon="el-icon-search" class="general_bgc general_border cfff" @click="onSubmit(formInline.user_name)"></el-button></el-input>
        </el-form-item>
        </el-col> 
         <el-table :data="tableData" height="250" style="width: 100%">
        <el-table-column prop="user_name"  min-width="150" :show-overflow-tooltip="true" label="" align='left'> </el-table-column>
        <el-table-column  label="" class-name='aa'  fixed="right" min-width="100"  align='right'>
          <template slot-scope="scope">
            <el-button v-if="scope.row.user_patrol_state==1||activeClass==1"  type="primary" class="bgccac cfff disib"  size="mini" @click="PatroleAdd(scope.row.user_name,scope.row.user_code)">任务指派</el-button>
             <el-button  v-else-if="scope.row.user_patrol_state==2||scope.row.user_patrol_state==3||activeClass==2"  type="primary"  class="general_color cfff disib"  size="mini"  @click="infoWindow(scope.row)">任务导航</el-button>
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
import { local } from '../../../util/util'
import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
import BmMarker from 'vue-baidu-map/components/overlays/Marker.vue'
import BmInfoWindow from 'vue-baidu-map/components/overlays/InfoWindow.vue'
import BmLocalSearch from 'vue-baidu-map/components/search/LocalSearch.vue'
import BmDriving from 'vue-baidu-map/components/search/Driving.vue'
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
    BmLocalSearch,
    BmDriving
  },
  data () {
    return {
      center: { lng: 0, lat: 0 },
      zoom: 3,　 //地图展示级别
      user:'',
      markers: '',
      marker1:'',
      startaddress:'',
      endaddress:'',
       list_btn:[{title: '全部',name: ''},{title: '未指派',name: 'nopatroltoday'},{title: '待巡查',name: 'inpatrolandstateisonetoday'},{title: '已巡查',name: 'inpatrolandstateistwotoday'}],
       tableData:[],
       activeClass:'',
       options_province:'',
      options_city:'',
      options_area:'',
      formInline:{
         pager_offset:'0',
        user_name:'',
        user_province:'',
        user_city:'',
        user_area:'',
        user_screens:""
      },
      patrol_user_code:'',
      currentPage: 1,
      total:0,
      keyword: '成都市'
    }
  },
  mounted () {
  },
  created () {
      this.user = local.get('user');
    //  this.formInline.user_code=local.get('user').user_code;
      // this.formInline.user_name=local.get('user').user_name;
         this.currentPage = this.formInline.pager_offset / 100 + 1
    this.init()
    this.init1(this.formInline)
  },
  methods: {
    init () {
        if(this.user.province!=''&&this.user.province!=null){this.formInline.user_province=this.user.province;this.keyword=this.formInline.user_province;}
      if(this.user.city!=''&&this.user.city!=null){this.formInline.user_city=this.user.city;this.keyword=this.formInline.user_province+this.formInline.user_city;}
      if(this.user.area!=''&&this.user.area!=null){this.formInline.user_area=this.user.area;this.keyword=this.formInline.user_province+this.formInline.user_city+this.formInline.user_area}
      this.getProvince();
    },
    init1(params){
         this.markers='';
        axios.get('/api/user/realInfoUserlist', params).then((v) => {
        v.user_list.forEach(item=>{
              this.$set(item, "showFlag", false);
        })
         this.markers=v.user_list;
        this.tableData=v.user_list;
        this.total=v.pager_count;
      })
    },
  //    godetail(index,val){
  //      if(index=='食品加工'){ this.$router.push({name: "ProduceDetail", query: { id: val, id1:this.formInline.filing_state }});}
  // else if(index=='食品流通'){ this.$router.push({name: "CirculateDetail", query: { id: val, id1:this.formInline.filing_state }});}
  //  else if(index=='食品餐饮'){ this.$router.push({name: "RestaurantDetail", query: { id: val,id1:this.formInline.filing_state }});}
  // },
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
    IsActive(k,val) {
        this.activeClass = k;
        this.formInline.user_screens=val;
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
      this.marker1='';
      this.startaddress='';
         this.endaddress='';
      marker.showFlag = true;
        axios.get('/api/patrol/all', {patrol_user_code:marker.user_code,timesearch:'today'}).then((v) => {
         this.marker1=v.patrol_list;
      })     
    },
    infoWindow(val){
       this.infoWindowOpen(val)
    },
    godetail(val,val1){
         this.startaddress=val;
         this.endaddress=val1;
    },
        PatroleAdd(val,val1){
     this.$router.push({
        name: "PatrolAdd",
        query: {
           id1:3,
           id2:1,
           val:val,
           code:val1
        }
      });
  },
       change(index,val){
          if (val == null) val = '';
         if(index==1){this.formInline.company_name=val}
       if(index==4){
          if(val!=''){this.getProvince(val,'2')}
        this.options_province.forEach(item=>{
         if(item.region_code==val){this.formInline.user_province=item.region_name;
}
        })
         this.formInline.user_city='';
         this.formInline.user_area='';
             this.options_city=[];
           this.options_area=[];
            this.keyword=this.formInline.user_province;
        
      }
      if(index==5){
         if(val!=''){this.getProvince(val,'3')}
        this.options_city.forEach(item=>{
         if(item.region_code==val){this.formInline.user_city=item.region_name; }
        })
         this.formInline.user_area='';
            this.options_area=[];
            this.keyword=this.formInline.user_province+this.formInline.user_city;
      }
      if(index==6){
        this.options_area.forEach(item=>{
         if(item.region_code==val){this.formInline.user_area=item.region_name;}
        })
         this.keyword=this.formInline.user_province+this.formInline.user_city+this.formInline.user_area
      }
      
       this.init1(this.formInline)
    },
    getProvince(val,index){
        axios.get('/api/region/list',{region_high_code:val,region_type:index}).then((v) => {
          if(index=='2'){this.options_city=v;
          let city=this.formInline.user_city
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
            let province=this.formInline.user_province
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
  .el-form-item--mini .el-form-item__error {
    z-index: 999;
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
  .info_window .el-image{width: 50px;height: 50px;border-radius: 50%;}
  .el-col-24,.aa{    display: flex;justify-content:space-between;}
  /deep/ .BMap_bubble_title{display: none;}
 /deep/.el-table {
    thead{display: none;}
.el-table__header-wrapper{display: none;}
td{padding: 5px 0px;border-bottom: none;}
 } 
}
</style>