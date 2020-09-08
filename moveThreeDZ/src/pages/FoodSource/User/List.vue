<template>
  <div class="list">
    <div class="list-nav w">
        <Nav  title="溯源" />
        <div class="record  w" >
             <van-field class="f16" readonly clickable label="选择时间"  v-model="issue_time" placeholder="请选择时间" input-align="right" right-icon="arrow" :rules="[{ required: true, message: '请选择发证日期' }]"  @click="showdatePicker = true"/>
              <van-popup v-model="showdatePicker" round position="bottom">
             <van-datetime-picker  v-model="currentDate" type="year-month" :formatter="formatter" title="选择年月" :min-date="minDate" :max-date="maxDate" @confirm="onConfirm"/>  
          </van-popup>
        </div>
    </div>
    <div class="information  pt100">
      <van-tree-select class="bgcfff" v-show="!flag" :style="{ height: fullHeight + 'px' }" :items="navDay" @click-nav="onNavClick"   :main-active-index.sync="active">
        <template #content>
          <div v-for="(item,index) in items" :key="index" class="pright_c m10 f14 bgf5">
            <div class="pright_c_info pr">
              
                <p>购买人：<span>{{item.sell_person}}</span></p> 
                <p>供应商：<span>{{item.supplier_name}}</span></p> 
                <p>购买地址：<span>{{item.supplier_address}}</span></p>
                <p class="f15 mt15"></p>
                <van-cell title="菜品列表"  is-link @click="$router.push('/foodSourceUser/detail?id='+item.foodsource_code)"/>
                <div v-if="item.foodSourceDetailList.length>0">
                   <div class="bgcfff pb10" v-for="(item1,k) in item.foodSourceDetailList" :key="k">
                      <van-cell :title="item1.product_name"  :value="item1.product_spec+'x'+item1.sell_count" />
                       <van-button class="ml10 mt10" type="danger" @click="Delete1(item1.foodsourcedetail_code,index,k)" size="small">删除</van-button>
                   </div>
                </div>
                <div v-else class="bgcfff tc pb10">
                  无
                </div>
                <van-button class="mt10" type="primary" @click="$router.push('/foodSourceUser/add?id='+item.foodsource_code+'&company_code='+company_code)" size="small">添加食材</van-button>
                <van-button class="ml10" type="danger" @click="Delete(item.foodsource_code,index)" size="small">删除</van-button>
            </div>
            
          </div>
        </template>
       </van-tree-select>
        <empty v-show="flag" title='暂无溯源信息'/>
      <div class="footer p15 bgcfff w"> 
        <van-row gutter="20">
          <van-col span="24"><van-button  block type="primary" native-type="submit"  @click="$router.push('/foodSourceUser/add?company_code='+company_code)"> 新增溯源 </van-button></van-col>
         
        </van-row>
       </div>
      <div>
        
      </div>
     
    </div>
  </div>
</template>
<script>
import Nav from "../../../components/Nav";
import {formatDate } from '../../../utils/index';
import axios from "../../../axios/index.js";
import empty from "../../../components/empty";
export default {
  components: {Nav,empty},
  data() {
    return {
      issue_time:formatDate(new Date(), 'yyyy-MM'),
      showdatePicker:false,
      minDate: new Date(2010, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(),
      params: {
        filing_state: "3",
        pager_offset: 0,
        pager_openset: 10,
        company_name: ""
      },
      user_type:'',
      company_code:'',
      active: 1,
      items: [],
      navDay: [],
      aaa:'',
      flag:false,
      fullHeight:document.documentElement.clientHeight - 100,
    };
  },
   created() {
     this.company_code=this.$route.query.id
     this.getTime()
  },
  methods: {
    getTime(){
      this.navDay=[];
       axios.get('app/foodsource/yearMonth', {company_code:this.company_code,year_month:this.issue_time+'-01'}).then(v => {
        if(v.data.foodSourceList.length>0){
           this.flag = false
          v.data.foodSourceList.map(item=>{
          let arr = item.add_time.split('-');
          let myday = parseInt(arr[2])<10?'0'+arr[2]:arr[2]
          this.navDay.push({text:arr[1] + '月' + arr[2] + '日',sell_time:arr[0] + '-' + arr[1] + '-'+myday})
        })
        this.active=this.navDay.length-1;
         this.aaa=this.navDay[this.active].sell_time;
         this.getData(this.aaa)
        }else{
           this.flag = true
        }
        
   
      })
    },
    getData(params){
       this.items=[]
       axios.get('app/foodsource/manage/fslist', {company_code:this.company_code,sell_time:params}).then(v => {
        this.items=v.data.pager_list
         console.log(this.items)
      })
    },
   onNavClick(index) {
      this.aaa=this.navDay[index].sell_time;
      this.getData(this.aaa)
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
      this.$dialog.confirm({message: '确认删除溯源？',}).then(() => {
         axios.delete('app/foodsource/delete', {foodsource_code:code}).then(() => {
         this.items.splice(index, 1)
      })
     }).catch(() => {});
    },
    Delete1(code,index,index1){
      this.$dialog.confirm({message: '确认删除食材？',}).then(() => {
        axios.delete('app/foodsource/detail/delete', {foodsourcedetail_code:code}).then(() => {
           this.items[index].foodSourceDetailList.splice(index1, 1)
      })
     }).catch(() => {});
      
      
    },
      onConfirm(value){
        this.issue_time= formatDate(value, 'yyyy-MM');this.showdatePicker=false;
        this.getTime()
      },
  }
};
</script>
<style lang="less" scoped>
.list {
  height: 100%;
  .list-nav{position: fixed;left: 0px;top: 0px;z-index: 100;
  .record{padding-top: 54px;
  }}
  .van-tree-select{
      padding-bottom: 60px;
      .van-sidebar{width: 80px;}
     .van-sidebar-item{font-size: 16px;padding:20px 10px;}
     .van-sidebar-item--select::before{display: none;}
     .van-tree-select__content{flex: 3;}
  }
 .pright_c{
     padding: 15px 10px;
   .pright_c_info{
       line-height: 1.8;
       .van-cell{padding:10px 10px 0px 10px;}
   } 
   .van-button{
     right: 0px;
   }
 }
 .footer{
   position: fixed;bottom: 0px;left: 0px;
    .van-button__text{
     font-size: 18px;
   }
   }
.van-button--default{color: #fff;
    background-color: #C7C7C7;
    border: 0.026667rem solid #C7C7C7;
        display: block;
    width: 100%;
            padding: 0 8px;
    font-size: 14px;
        box-sizing: border-box;
    height: 44px;
    margin: 0;
    padding: 0;
    line-height: 44px;
    text-align: center;
    border-radius: 4px;
    cursor: pointer;
    -webkit-transition: opacity .2s;
    transition: opacity .2s;
    -webkit-appearance: none;
}
.van-button--primary{
      background-color: #07c160;
    border: 0.026667rem solid #07c160;
}

}


</style>