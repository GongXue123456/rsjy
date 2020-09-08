<template>
  <div class="bigBox">
    <Nav title="台账信息" />
    
    <div class="information ">
     <van-tabs v-model="activeName"  @click="onClick">
       <van-tab v-for="(item,index) in tabs" :key="index" :title="item.val" :name="item.name"></van-tab>
     </van-tabs>
     <div class="list" v-if="this.activeName==='source'">
             <van-field class="f16" readonly clickable label="选择时间"  v-model="issue_time" placeholder="请选择时间" input-align="right" right-icon="arrow" :rules="[{ required: true, message: '请选择发证日期' }]"  @click="showdatePicker = true"/>
              <van-popup v-model="showdatePicker" round position="bottom">
             <van-datetime-picker  v-model="currentDate" type="year-month" :formatter="formatter" title="选择年月" :min-date="minDate" :max-date="maxDate" @confirm="onConfirm"/>  
          </van-popup>
    <div class=" f16 ">
       <van-tree-select class="bgcfff" v-show="!flag" :style="{ height: fullHeight + 'px' }" :items="navDay" @click-nav="onNavClick"   :main-active-index.sync="active">
        <template #content>
          <div v-for="(item,index) in items1" :key="index" class="pright_c m10 f14 bgf5">
            <div class="pright_c_info pr">
              <van-button class="pa" type="danger" @click="Delete(item.foodsource_code,index)" size="small">删除</van-button>
                <p>购买人：<span>{{item.sell_person}}</span></p> 
                <p>供应商：<span>{{item.supplier_name}}</span></p> 
                <p>购买地址：<span>{{item.supplier_address}}</span></p>
                <p class="f15 mt15">菜品列表</p>
                <div>
                   <div v-for="(item1,k) in item.foodSourceDetailList" :key="k">
                      <van-cell :title="item1.product_name" is-link :value="item1.product_spec+'x'+item1.sell_count" @click="$router.push('/foodSourceDetail?id='+item.foodsource_code)"/>
                   </div>
                </div>
            </div>
            
          </div>
        </template>
       </van-tree-select>
        <empty v-show="flag" title='暂无溯源信息'/>
    </div>
     </div>
     <div v-else>
        <div  class="record bgcfff w">
      <search v-if="params1==='sterilize'" class="p15" @myvalue="ser" :name.sync="params.sterilize_addr" type="home" />
       <search v-else-if="params1==='batchingin'" class="p15" @myvalue="ser" :name.sync="params.batching_name" type="home" />
       <search v-else-if="params1==='mixtureinfo'" class="p15" @myvalue="ser" :name.sync="params.sterilize_addr" type="home" />
        <search v-else class="p15" @myvalue="ser" :name.sync="params.product_name" type="home" />
       <div  class="m15 mt0">
         <van-field  v-if="params1==='sterilize'" class="bgcf0"  clickable label="搜索日期"  clearable v-model="params.sterilize_time" placeholder="请选择搜索日期" input-align="right" right-icon="arrow" :rules="[{ required: true, message: '请选择日期' }]"  @click="showdate1Picker = true"/>
         <van-field v-else-if="params1==='batchingin'" class="bgcf0"  clickable label="搜索日期"  clearable v-model="params.purchase_time" placeholder="请选择搜索日期" input-align="right" right-icon="arrow" :rules="[{ required: true, message: '请选择日期' }]"  @click="showdate1Picker = true"/>
         <van-field v-else-if="params1==='mixtureinfo'" class="bgcf0"  clickable label="搜索日期"  clearable v-model="params.info_time" placeholder="请选择搜索日期" input-align="right" right-icon="arrow" :rules="[{ required: true, message: '请选择日期' }]"  @click="showdate1Picker = true"/>
         <van-field v-else-if="params1==='additiveuse'" class="bgcf0"  clickable label="搜索日期"  clearable v-model="params.use_time" placeholder="请选择搜索日期" input-align="right" right-icon="arrow" :rules="[{ required: true, message: '请选择日期' }]"  @click="showdate1Picker = true"/>
         <van-field v-else-if="params1==='productcheck'" class="bgcf0"  clickable label="搜索日期"  clearable v-model="params.report_time" placeholder="请选择搜索日期" input-align="right" right-icon="arrow" :rules="[{ required: true, message: '请选择日期' }]"  @click="showdate1Picker = true"/>
         <van-field v-else-if="params1==='storage'" class="bgcf0"  clickable label="搜索日期"  clearable v-model="params.storage_in_time" placeholder="请选择搜索日期" input-align="right" right-icon="arrow" :rules="[{ required: true, message: '请选择日期' }]"  @click="showdate1Picker = true"/>
         <van-field v-else-if="params1==='sale'" class="bgcf0"  clickable label="搜索日期"  clearable v-model="params.sale_time" placeholder="请选择搜索日期" input-align="right" right-icon="arrow" :rules="[{ required: true, message: '请选择日期' }]"  @click="showdate1Picker = true"/>
         <van-field v-else-if="params1==='unqualifiedproduct'" class="bgcf0"  clickable label="搜索日期"  clearable v-model="params.handle_time" placeholder="请选择搜索日期" input-align="right" right-icon="arrow" :rules="[{ required: true, message: '请选择日期' }]"  @click="showdate1Picker = true"/>
       </div>
    </div>
     <van-popup v-model="showdate1Picker" round position="bottom">
      <van-datetime-picker  v-model="currentDate" type="date"  title="选择年月日" cancel-button-text='清空' :min-date="minDate" :max-date="maxDate" @cancel="onCancel" @confirm="onConfirm"/>  
    </van-popup>
     <div class="content ">
       <div class="bgcfff" v-if="items.length">
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad"  >
            <div class="reviewed pr  m15 mt0 p15  bgf5" v-for="(item,index) in items" :key="index" @click="toExamine(item)">
             <h3 v-if="params1==='sterilize'" class="c000 f18 fb">{{item.sterilize_addr}}</h3>
             <h3 v-else-if="params1==='batchingin'" class="c000 f18 fb">{{item.batching_name}}</h3>
             <h3 v-else-if="params1==='mixtureinfo'" class="c000 f18 fb">{{item.info_name}}</h3>
             <h3 v-else-if="params1==='additiveuse'" class="c000 f18 fb">{{item.product_name}}</h3>
             <h3 v-else-if="params1==='productcheck'" class="c000 f18 fb">{{item.product_name}}</h3>
             <h3 v-else-if="params1==='storage'" class="c000 f18 fb">{{item.product_name}}</h3>
             <h3 v-else-if="params1==='sale'" class="c000 f18 fb">{{item.product_name}}</h3>
             <h3 v-else-if="params1==='unqualifiedproduct'" class="c000 f18 fb">{{item.product_name}}</h3>
             <div v-if="params1==='sterilize'" class="address  f15 mt15 view-text">{{item.sterilize_time}}</div>
             <div v-else-if="params1==='batchingin'" class="address  f15 mt15 view-text">{{item.purchase_time}}</div>
             <div v-else-if="params1==='mixtureinfo'" class="address  f15 mt15 view-text">{{item.info_time}}</div>
             <div v-else-if="params1==='additiveuse'" class="address  f15 mt15 view-text">{{item.use_time}}</div>
             <div v-else-if="params1==='productcheck'" class="address  f15 mt15 view-text">{{item.report_time}}</div>
             <div v-else-if="params1==='storage'" class="address  f15 mt15 view-text">{{item.storage_in_time}}</div>
             <div v-else-if="params1==='sale'" class="address  f15 mt15 view-text">{{item.sale_time}}</div>
             <div v-else-if="params1==='unqualifiedproduct'" class="address  f15 mt15 view-text">{{item.handle_time}}</div>
             <span class="pa iconfont iconxiangyou"></span>
            </div>
          </van-list>
      </div>
       <empty v-else-if="!items.length&&finished==true" title="暂无数据信息" />
        
          
    </div>
     </div>
     
     
    </div>
  </div>
</template>
<script>
import Nav from "../../../components/Nav";
import search from "../../../components/search";
import axios from '../../../axios/index.js';
import empty from "../../../components/empty";
import {formatDate } from '../../../utils/index';
import { mapState } from 'vuex'
export default {
  components: {
    Nav,empty,search
  },
  data() {
    return {
      id1:'',
      activeName:'sterilize',
      fullHeight:document.documentElement.clientHeight,
      tabs:[
          {id:1,val:'溯源管理',name:'source'},
          {id:2,val:'场所清洁消毒记录',name:'sterilize'},
          {id:3,val:'进货记录',name:'batchingin'},
          // {id:4,val:'投料记录',name:'mixtureinfo'},
          {id:5,val:'食品添加剂使用记录',name:'additiveuse'},
          {id:6,val:'产品检验记录',name:'productcheck'},
          // {id:7,val:'成品入库记录',name:'storage'},
          {id:8,val:'产品销售记录',name:'sale'},
          {id:9,val:'不合格产品记录',name:'unqualifiedproduct'},
          ],
      params: {
        pager_offset: 0,
        pager_openset: 10,
        product_name: "",
        company_code:''
      },
      showdate1Picker:false,
      minDate: new Date(2010, 0, 1),
      maxDate: new Date(2030, 10, 1),
      currentDate: new Date(),
      params1:'source',
      url:'/sterilize/detail',
      items:[],
      loading: false,
      finished: false,
      issue_time:'',
      showdatePicker:false,
      active: 1,
       items1: [],
      navDay: [],
      aaa:'',
      flag:false,
  };
  },
  computed: {
    ...mapState({
      location: (state) => state.ledger.location
    })
    
  },
   created() {
    //    this.active=this.$route.query.active;
     this.params.company_code=this.$route.query.id
      this.activeName = Object.assign({}, this.location).activeName;
      this.params1=Object.assign({}, this.location).activeName;
    
      let time=this.$route.query.time!='null'?this.$route.query.time.split('-'):formatDate(new Date(), 'yyyy-MM-dd').split('-');
     this.issue_time=time[0] + '-' + time[1]
    //  this.currentDate=this.issue_time
    //  this.getTime()
    if(this.activeName==='source'){this.getTime()}else{
        this.onLoad()
    }
  },
   
  methods: {
     getData(params,params1) {
       axios.get("app/standingbook/"+params1+"/list", params).then(v => {
        if (v.code == 200) {
            this.items = this.items.concat(v.data.pager_list);
            this.loading = false;
              if (v.data.pager_list.length < 10) {
                this.finished = true;
              }
            this.params.pager_openset = this.params.pager_openset + 10;
        } else {
          this.$toast({
            message: v.msg,
            duration: 5000
          });
        }
      });
    },
     onLoad(){
        setTimeout(() => {
            this.getData(this.params,this.params1)
        }, 500);
     },
     onClick(title) {
         this.items=[]
      this.params1=title;
      if(title==='source'){
          this.activeName='source';
            this.$store.dispatch('ledger/location', this.activeName)
         this.getTime()
      }else{
         if(title==='sterilize'){
        this.activeName='sterilize';
        this.params.sterilize_time= '';
         this.params.sterilize_addr='';
      }else if(title==='batchingin'){
        this.activeName='batchingin';
         this.params.purchase_time='';
         this.params.batching_name='';
      }else if(title==='mixtureinfo'){
        this.activeName='mixtureinfo';
        this.params.info_time='';
         this.params.info_name='';
      }else if(title==='additiveuse'){
        this.activeName='additiveuse';
        this.params.use_time='';
         this.params.product_name='';
      }else if(title==='productcheck'){
        this.activeName='productcheck';
        this.params.report_time= '';
         this.params.product_name='';
      }else if(title==='storage'){
        this.activeName='storage';
        this.params.storage_in_time= '';
         this.params.product_name='';
      }else if(title==='sale'){
        this.activeName='sale';
        this.params.sale_time= '';
         this.params.product_name='';
      }else if(title==='unqualifiedproduct'){
        this.activeName='unqualifiedproduct';
        this.params.handle_time= '';
         this.params.product_name='';
      }
      this.$store.dispatch('ledger/location', this.activeName)
       this.getData(this.params,this.params1)
      }
     
    },
    toExamine(item) {
      if(this.params1==='sterilize'){
        this.code=item.sterilize_code;
        this.url="/sterilize/detail";
      }else if(this.params1==='batchingin'){
        this.code=item.batching_code;
        this.url="/purchase/detail";
      }else if(this.params1==='mixtureinfo'){
        this.code=item.info_code;
        this.url="/mixtureInfo/detail";
      }else if(this.params1==='additiveuse'){
        this.code=item.use_code;
        this.url="/additive/detail";
      }else if(this.params1==='productcheck'){
        this.code=item.check_code;
        this.url="/productCheck/detail";
      }else if(this.params1==='storage'){
        this.code=item.storage_code;
        this.url="/storage/detail";
      }else if(this.params1==='sale'){
        this.code=item.sale_code;
        this.url="/sale/detail";
      }else if(this.params1==='unqualifiedproduct'){
        this.code=item.unproduct_code;
        this.url="/unqualified/detail";
      }
      this.$router.push({
          path: this.url,
          query: {
            id: item.company_code,
            id1:this.code,
            active:this.active
          }
        });
    },
    ser(value) {
      this.items = [];
      this.flag = false;
      this.params.pager_offset = 0;
       if(this.params1==='sterilize'){
        this.params.sterilize_addr = value;
      }else if(this.params1==='batchingin'){
        this.params.batching_name = value;
      }else if(this.params1==='mixtureinfo'){
        this.params.info_name = value;
      }else {
       this.params.product_name = value;
      }
       this.getData(this.params,this.params1)
    },
    onConfirm(value){
       if(this.params1==='sterilize'){
         this.params.sterilize_time= formatDate(value, 'yyyy-MM-dd');this.showdate1Picker=false;
          this.ser(this.params.sterilize_addr)
      }else if(this.params1==='batchingin'){
         this.params.purchase_time= formatDate(value, 'yyyy-MM-dd');this.showdate1Picker=false;
         this.ser(this.params.batching_name)
      }else if(this.params1==='mixtureinfo'){
         this.params.info_time= formatDate(value, 'yyyy-MM-dd');this.showdate1Picker=false;
         this.ser(this.params.info_name)
      }else if(this.params1==='additiveuse'){
         this.params.use_time= formatDate(value, 'yyyy-MM-dd');this.showdate1Picker=false;
          this.ser(this.params.product_name)
      }else if(this.params1==='productcheck'){
        this.params.report_time= formatDate(value, 'yyyy-MM-dd');this.showdate1Picker=false;
         this.ser(this.params.product_name)
      }else if(this.params1==='storage'){
         this.params.storage_in_time= formatDate(value, 'yyyy-MM-dd');this.showdate1Picker=false;
          this.ser(this.params.product_name)
      }else if(this.params1==='sale'){
         this.params.sale_time= formatDate(value, 'yyyy-MM-dd');this.showdate1Picker=false;
          this.ser(this.params.product_name)
      }else if(this.params1==='unqualifiedproduct'){
         this.params.handle_time= formatDate(value, 'yyyy-MM-dd');this.showdate1Picker=false;
          this.ser(this.params.product_name)
      }else if(this.params1==='source'){
         this.issue_time= formatDate(value, 'yyyy-MM');this.showdatePicker=false;
        this.getTime()
      }
      
    },
    onCancel(){
       if(this.params1==='sterilize'){
         this.params.sterilize_time= '';this.showdate1Picker=false;
         this.ser(this.params.sterilize_addr)
      }else if(this.params1==='batchingin'){
         this.params.purchase_time='';this.showdate1Picker=false;
         this.ser(this.params.batching_name)
      }else if(this.params1==='mixtureinfo'){
         this.params.info_time='';this.showdate1Picker=false;
         this.ser(this.params.info_name)
      }else if(this.params1==='additiveuse'){
         this.params.use_time='';this.showdate1Picker=false;
          this.ser(this.params.product_name)
      }else if(this.params1==='productcheck'){
        this.params.report_time= '';this.showdate1Picker=false;
         this.ser(this.params.product_name)
      }else if(this.params1==='storage'){
         this.params.storage_in_time= '';this.showdate1Picker=false;
          this.ser(this.params.product_name)
      }else if(this.params1==='sale'){
         this.params.sale_time= '';this.showdate1Picker=false;
          this.ser(this.params.product_name)
      }else if(this.params1==='unqualifiedproduct'){
         this.params.handle_time= '';this.showdate1Picker=false;
          this.ser(this.params.product_name)
      }
      
    },
    getTime(){
      this.navDay=[];
       axios.get('app/foodsource/yearMonth', {company_code:this.params.company_code,year_month:this.issue_time+'-01'}).then(v => {
        if(v.data.foodSourceList.length>0){
           this.flag = false
          v.data.foodSourceList.map(item=>{
          let arr = item.add_time.split('-');
          let myday = parseInt(arr[2])<10?'0'+arr[2]:arr[2]
          this.navDay.push({text:arr[1] + '月' + arr[2] + '日',sell_time:arr[0] + '-' + arr[1] + '-'+myday})
        })
        this.active=this.navDay.length-1;
        this.aaa=this.navDay[this.active].sell_time;
         this.getData1(this.aaa)
        }else{
           this.flag = true
        }
        
   
      })
    },
    getData1(params){
       axios.get('app/foodsource/manage/fslist', {company_code:this.params.company_code,sell_time:params}).then(v => {
        this.items1=v.data.pager_list
      })
    },
   onNavClick(index) {
      this.aaa=this.navDay[index].sell_time;
      this.getData1(this.aaa)
    },
      formatter(type, val) {
      if (type === 'year') {
        return `${val}年`;
      } else if (type === 'month') {
        return `${val}月`;
      }
      return val;
    },
    Delete(code,index){
      this.$dialog.confirm({message: '确认删除？',}).then(() => {
         axios.delete('app/foodsource/delete', {foodsource_code:code}).then(() => {
         this.items1.splice(index, 1)
      })
     }).catch(() => {});
      
      
    },
  }
};
</script>
<style lang="less" scoped>
.record {
  overflow: hidden;
  position: fixed;
  z-index: 99;
  top: 114px;
  img {
    width: 25px;
    height: 25px;
    position: absolute;
    top: 15px;
    left: 20px;
    z-index: 100;
  }
}
.information {
  width: 100%;
  height: 100%;
  padding-top: 54px;
  box-sizing: border-box;
  /deep/ .van-tabs{
    .van-tab{font-size: 15px;flex-basis: 25% !important;}
    .van-tab--active{color: #1DB667;font-weight:bold;}
    .van-tabs__line{display: none;}
    .van-cell{font-size:16px;
    .van-cell__value{color: #426EB8;}}
    .van-tabs__wrap{position: fixed;width: 100%;z-index: 999;height: 60px;}
    .van-tabs__content{padding-top: 60px;}
   
  }
  .content{
    padding-top: 110px;
  }
    .reviewed {
    border-radius:5px;
    .address {
      color: #A6A6A6;
      width: 95%;
    }
    .mechanism {
      padding:8px 15px;
      border-radius:14px;
    }
    span {
      color: #A6A6A6;
      top: 30px;
      right: 10px;
    }
  }
  
}
.list {
  height: 100%;
  .list-nav{position: fixed;left: 0px;top: 0px;z-index: 100;
  .record{padding-top: 54px;
  }}
  .van-tree-select{
      .van-sidebar{width: 80px;}
     .van-sidebar-item{font-size: 16px;padding:20px 10px;}
     .van-sidebar-item--select::before{display: none;}
     .van-tree-select__content{flex: 3;}
  }
 .pright_c{
     padding: 15px 10px;
   .pright_c_info{
       line-height: 1.8;
       .van-cell{padding: 10px;}
   } 
   .van-button{
     right: 0px;
     top: -8px;
     height: 25px;
   }
 }
}
</style>