<template>
  <div class="classifytwo-view">
    <div class="classifytwo-view-nav w" ref="element">
      <van-row style="border-bottom: 1px solid #f5f5f5;">
      <van-col span="3">
        <div style="height:50px;line-height: 50px;text-align: center;font-size: 16px">
          <div v-if="aa_==1" class="iconfont icon-arrowleft" @click="$router.back()"></div>
          <div v-else class="iconfont icon-arrowleft" @click="$router.push('/pages/classify')"></div>
        </div>
      </van-col>
      <van-col span="17">
        <div class="selectBox">
          <div class="selectBox_show" v-on:click.stop="arrowDown">
            <p title="请选择">
              {{unitName}}
              <i class="iconfont icon-xiangxia pa f16"></i>
            </p>
            <input type="hidden" name="unit" v-model="unitModel" />
          </div>
        </div>
      </van-col>
      <van-col span="4">
        <div style="height:50px;line-height: 50px;text-align: center;font-size: 16px">
          <van-col span="12" class="clearfix">
            <div class="iconfont icon-sousuo f18" @click="$router.replace('/search')"></div>
          </van-col>
          <van-col span="12" class="clearfix">
            <div class="iconfont iconshoppingtrolley_ic f18" @click="$router.push('/pages/cart?id=1')"></div>
          </van-col>
        </div>
      </van-col>
    </van-row>
    <van-grid :border="false" :column-num="3" v-show="isShowSelect" class="bgcfff w">
      <van-grid-item
        v-for="(item, index) in dataList"
        @click.stop="select(item, index)"
        :key="index"
      >
        <van-image class="pb10" :src="item.c_logo" />
        <div class="c28 f16" value="0" :data-id="item.c_id">{{item.c_name}}</div>
      </van-grid-item>
    </van-grid>
    <van-overlay
  v-show="isShowSelect"
/>
    <van-tabs v-model="aaa" :line-width="70" swipeable :animated="true" title-active-color="#45B7FF" :sticky="true"  @click="onClick" >
      <van-tab v-for="(item,index) in title" :title="item.c_name" :name="item.c_id" :key="index">
            
      </van-tab>
    </van-tabs>
     <van-row>
     <van-col span="24" class="selectBox1" v-if="option">
        <div class="selectBox" v-for="(item,index) in option" :key="index">
          <div class="selectBox_show" v-on:click.stop="arrowDown1(item)" v-for="(itema,indexa) in item" :key="indexa">
            <p title="请选择"  class="pr" v-if="itema.is_select==true">
              {{itema.text}}
              <i class="iconfont icon-xiangxia pa"></i>
            </p>
            <input type="hidden" name="unit" v-model="itema.value" />
          </div>
          <van-grid :border="false" :column-num="3" v-show="item[0].is_show" class="bgcfff w" style="top:155px">
      <van-grid-item
      v-for="(item1,index1) in item" :key="index1"
        @click.stop="select1(item,item1,item1.value,index)"
      >
        <div class="c28 f16" value="0" :data-id="item1.value">{{item1.text}}</div>
      </van-grid-item>
    </van-grid>
      <van-overlay style="top:160px"
  v-show="item[0].is_show"
/>
        </div>
      </van-col>
    </van-row> 
      <!-- <ul>
      <li v-for="(item,index) in list2" :key="index">
        {{item.name}}
        <select @change="changea($event)">
          <option value="" disabled selected>必选</option>
          <option  v-for="(item1,index1) in item.list3" :key="index1">{{item1.name}}</option>
        </select>
      </li>
    </ul> -->

  

    <!-- <van-dropdown-menu class="mt10">
      <van-dropdown-item v-for="(item,index) in option" :key="index"  v-model="item.value" :options="item" @change="toggleCate(item.value)"></van-dropdown-item>
    </van-dropdown-menu>  -->
     <van-row class="mt10">
                <van-col span="24">
                  <ul class="filter-bar">
                <li class="filter-opt "  v-for="(item, index) in sortMethods" :key="index" @click="sortBy(item.method)">
                 <span class="f14 c000" v-bind:class="{'general_color':  filter_index === index, 'filter-price': item.method === 'sortPrice', 'price-down': price_isAsc, 'price-up': !price_isAsc, 'filter-num': item.method === 'sortNum'}"> {{ item.name }} </span>
                  <i v-bind:class="{'filter-price iconfont f14 icon-xiangshang': item.method === 'sortPrice', 'general_color  price-down': aa==1&&price_isAsc&&item.method === 'sortPrice'} "></i>
                  <i v-bind:class="{ 'filter-price  iconfont f14 icon-xiangxia': item.method === 'sortPrice', 'general_color price-up': aa==1&&!price_isAsc&&item.method === 'sortPrice','filter-num  iconfont f14 icon-xiangxia': item.method === 'sortNum', 'general_color num-up': aa==2&&!num_isAsc&&item.method === 'sortNum'}"></i></li>
                <!-- 'filter-num iconfont f14 icon-xiangshang': item.method === 'sortNum' -->
                <!-- 'general_color  num-down': num_isAsc&&item.method === 'sortNum' -->
                </ul>
                </van-col>
              </van-row>
    <!-- <van-tabs  type="card" class="sec_tabs mt15"  swipeable title-active-color="#D52E3B"  :sticky="true"  :ellipsis="false">
                <van-tab class="sec_tab  c28 bgcfff">
                <div class="tab-title" slot="title"  @click="toggleCate()">全部</div>
                </van-tab>
                <van-tab class="sec_tab  c28 bgcfff"
                  v-for="(item1,index1) in nav"
                  :key="index1"
                >
                <div class="tab-title" slot="title"  @click="toggleCate(item1)" :data-id="item1.p_id">{{ item1.p_name}}</div>
                 
                </van-tab>
                  <div>
              <van-row class="mt15">
                <van-col span="24">
                  <ul class="filter-bar">
                <li class="filter-opt "  v-for="(item, index) in sortMethods" :key="index" @click="sortBy(item.method)">
                 <span class="f14 c000" v-bind:class="{'general_color': filter_index === index, 'filter-price': item.method === 'sortPrice', 'price-down': price_isAsc, 'price-up': !price_isAsc, 'filter-num': item.method === 'sortNum'}"> {{ item.name }} </span>
                  <i v-bind:class="{'filter-price iconfont f14 icon-xiangshang': item.method === 'sortPrice', 'general_color  price-down': price_isAsc&&item.method === 'sortPrice', 'general_color  num-down': num_isAsc&&item.method === 'sortNum'} "></i>
                  <i v-bind:class="{ 'filter-price  iconfont f14 icon-xiangxia': item.method === 'sortPrice', 'general_color price-up': !price_isAsc&&item.method === 'sortPrice','filter-num  iconfont f14 icon-xiangxia': item.method === 'sortNum', 'general_color num-up': !num_isAsc&&item.method === 'sortNum'}"></i></li>
                'filter-num iconfont f14 icon-xiangshang': item.method === 'sortNum'
                </ul>
                </van-col>
              </van-row>
             
            </div>
            </van-tabs> -->
    </div>
     <ul class="goods-list" id="goods-list " :style="'height:'+orderHight+'px;padding-top:'+height+'px;'">
                 <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
                    <List1 :items="nowdayImagesList" data-id='1'></List1>
                   <!-- <div v-for="(item,index) in nowdayImagesList" :key="index">
                    
                        {{item.ps_main_title}}
                       </div> -->
                 </van-list>
              </ul>
  </div>
</template>
<script>
  import {getCategorySearch,getCategoryAll,getCategorySecond} from "../api/index";
  import List1 from "../components/common/List1"
  import merge from 'webpack-merge'
export default {
  name: "",
  props: ["type"],
  components:{List1},
  data() {
    return {
      aaa:Number(this.$route.query.id1),
      isShowSelect: false,
      isShowSelect1: false,
      switch1: false,
      switch2: false,
      unitModel: 0,
      dataList: [],
      unitName: "",
       unitName1: "",
      nav: [],
      title:[],
      nowdayImagesList: [],
        loading: false,
         finished: false,
         sortMethods: [
            // { name: '常购', method: 'setList' },
            // { name: '促销', method: 'sortSales' },
            { name: '价格', method: 'sortPrice' },
            { name: '销量', method: 'sortNum' }
        ], 
        pageNumber:0,
       cate_index: '', // 当前分类项下标
        filter_index: '', // 当前条件筛选项下标
        price_isAsc: '', // 价格是否升序
         num_isAsc: true, // 销量是否升序
        list1:[],
        c_id:'',
        c_id1:this.$route.query.id1,
        price:'',
        num:'',
        msg:'',
        bbb:false,
         value: '',
      option:[],
      ak_id:'',
      ccc:0,
      aa:'',
      orderHight:'',
      height:'',
      aa_:''
      // option1: [
      //   { v_name: '全部商品', value: 0 },
      //   { v_name: '新款商品', value: 1 },
      //   { v_name: '活动商品', value: 2 }
      // ],
      // option2: [
      //   { text: '默认排序', value: 0 },
      //   { text: '好评排序', value: 233 },
      //   { text: '销量排序', value: 234 },
      // ]

    };
  },
  mounted: function () {
      this.unitName = this.$route.query.name1;
      this.c_id=this.$route.query.id;
      this.name2 = this.$route.query.name2;
       this.orderHight=document.documentElement.clientHeight || document.body.clientHeight;
       this.aa_=this.$route.query.aa;
    },
  methods: {
    arrowDown() {
      this.isShowSelect = !this.isShowSelect;
    },
    arrowDown1(item){
      item[0].is_show = !item[0].is_show;
    },
    select(item, index) {
      this.aa='';
      this.price='';
      this.filter_index='';
      this.num='';
      this.bbb=true;
      this.isShowSelect = false;
      this.unitModel = index;
      this.c_id= item.c_id;
       this.getData1();
        this.ak_id= '';
         this.cate_index=''
      this.unitName = item.c_name;
       this.loading=true,
       this.finished=false,
      this.nowdayImagesList=[];
       this.pageNumber=0;
        
    },
     select1(item,item1,index1,index) {
        this.aa='';
        this.ccc=1;
        this.price='';
        this.num='';
        this.filter_index='';
      item[0].is_show = false;
      item[0].text=item1.text;
      // item[index].text=item1.text
      // item.value = index;
      item[index].value=index1
      if(item1.ak_id==null){
        this.ak_id=''
      }else{
 this.ak_id= item1.ak_id;
      }
         
          if(item1.value==null){
             this.cate_index=''
          }else{
              this.cate_index= item1.value;
          }
    
       this.nowdayImagesList=[];
        this.pageNumber=0;
        this.initialization()
        
    },
    initialization(){
       
            this.loading = true;//下拉加载中
            this.finished = false;//下拉结束
            if(this.loading){
                this.onLoad();
               
            }
            
        },
     onClick(name, title) {
        this.aa='';
        this.price='';
        this.num='';
        this.ak_id= '';
        this.filter_index='';
        this.bbb=false;
         this.value='';
        this.nowdayImagesList=[];
         this.pageNumber=0;
         this.initialization()
          this.cate_index='';
          this.c_id1=name;
    },
    getData1(){
      getCategoryAll().then(response => {
        if (response.code == 200) {
          this.dataList = response.data;
          let data = {
                     c_id:this.c_id,
                };
          getCategorySecond(data).then(response=>{
             if (response.code == 200) {
              if(this.bbb==true){
                 this.aaa=response.data;
                this.c_id1=response.data;
              } 
              this.getImgList();   
             }
          })
        } else {
          this.$toast({
            message: response.msg,
            duration: 5000
          });
        }
      });
    },
    getData() {
      this.getData1();
    },
    getImgList() {
          let data = {
                     c_id:this.c_id1,
                     sort:'',
                     p_id:'',
                     ak_id:this.ak_id,
                     av_id:this.cate_index,
                     price:this. price,
                     sell:this.num,
                     pager_offset:this.pageNumber
                };
         getCategorySearch(data).then(response=>{
           if(response.code == 200){        
                        this.list1 = response.data;
                        this.title=response.data.pager_list;
                        this.nav=response.data.productList;
                         this.option=response.data.vnList;
                       this.$router.push({
                  query:merge(this.$route.query,{id1:this.c_id1,name1:this.unitName})
             })
             this.pdHeught()
                      // if(this.option!=''){
                      //    this.option.forEach((list,index)=>{
                      //     this.value=list[0].value;
                      //   })
                      // }
                      
                         this.nowdayImagesList = this.nowdayImagesList.concat(response.data.productSpecsList);
                          this.loading = false;
                        
                         if (response.data.productSpecsList.length <10) {
                            this.finished = true;
                            // return false
                        }
                         this.pageNumber=this.pageNumber+10;
                    }else{
                         this.$toast({
                          message: response.msg,
                          duration: 5000
                        });
                    }
      })
    },
        sortPrice: function () {
          this.aa=1;
            this.price= this.price_isAsc ? '2' : '1';
            this.num='';
             this.nowdayImagesList=[];
              this.pageNumber=0;
            this.price_isAsc = !this.price_isAsc;
            this.num_isAsc = true;
             this.initialization()
        },
      sortNum:function(){
         this.aa=2;
         this.num = this.num_isAsc ? '2' : '';
         this.price='';
          this.nowdayImagesList=[];
           this.pageNumber=0;
            this.num_isAsc = !this.num_isAsc;
             this.initialization()
       },
       
        sortBy: function (method) {
          //  this.ak_id= '';
          //  this.cate_index=''
            this.filter_index = this.sortMethods.findIndex(function(item) {
                return item.method === method;
            });
                //  method = method || 'setList';
            method = method;
            method !== 'sortPrice' && (this.price_isAsc = false);
             method !== 'sortNum' && (this.num_isAsc = false);
            this[method]();
           
        },
    onLoad() {
      setTimeout(() => {
            this.getData()
      }, 500);
    },
    toggleCate: function (item1) {
      this.price='';
      this.num='';
      this.ak_id= '';
      this.filter_index='';
     if(item1==undefined){
       this.cate_index='';
     }else{
       this.cate_index = item1;
     }
       this.nowdayImagesList=[];
        this.pageNumber=0;
        this.initialization()
    }, 
     pdHeught(){
        if(this.option.length!=0){
          this.height= 195; 
         }else{
            this.height= 145; 
         }
        
    },    
  }
};
</script>
<style scoped lang="scss">
.classifytwo-view-nav{position: fixed;left: 0px;top: 0px;z-index: 100;background-color: #f5f5f5;}
html{overflow-y: hidden;}
/deep/ .van-grid{
  position: fixed;
  top: 48px;
  left: 0px;
  z-index: 101;
}
/deep/ .van-overlay{
  z-index: 100 !important;
  top: 57px;
}
.classifytwo-view  .selectBox {
  height: 50px;
  line-height: 55px;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  color:#282828
}
.classifytwo-view .van-image {
  width: 100px;
      height: 100%;
}
.classifytwo-view .nav_po {
  font-size: 12px;
  text-align: center;
}
.classifytwo-view .banner_img {
  padding: 5px;
  img {
  border-radius: 5px;
}
}
.classifytwo-view .nav_po .nav_title {
  margin: 0px;
  color: grey;
  font-size: 12px;
}
.classifytwo-view .nav_bar {
  padding-top: 15px;
}
.classifytwo-view .nowDay-sell {
  line-height: 95px;
  height: 65px;
  text-align: center;
  font-weight: bolder;
  font-size: 12px;
}
/deep/  .van-tabs__nav{
    background-color: transparent;
    .van-tab{
        color: #282828;
    }
    .van-tabs__line{
            background-color: #45B7FF;
           width: 35px !important;
           border-radius: 3px;
    }
}
/deep/ .van-tabs--card{
    .van-tabs__wrap{
         height: inherit;
 .van-tabs__nav--card{
     background-color: #F5F5F5;
    box-sizing: border-box;
    height: inherit;
    border: none;
    border-radius: 0px;
  
    .van-tab{
        padding: 8px 13px;
background-color: #fff;
color: #282828;
    line-height:1;
    border-right:none;
    margin-right: 10px;
    border-radius: 4px;
    }
    .van-tab--active{
      color: #45B7FF;
      border: 1px solid #45B7FF;
    }
    }
    }
   
}

.filter-bar {
    display: flex;
    height: 40px;
    background-color: #fff;
    line-height: 40px;
        border-radius: 10px 10px 0px 0px;
}

.filter-opt {
    position: relative;
    width: 50%;
    color:rgba(0,0,0,0.2);
    text-align: center;
     .filter-active {
    color: #7B57C5;
}
    .icon-xiangshang{
position: absolute;
top: -3px;
}
.icon-xiangxia{
  position: absolute;
  top: 7px;
}.filter-num{top: 3px;}
}
.goods-list {
    padding-top: 145px;
     /* height: 650px !important; */
    overflow-y: scroll;
}
.item-list{
      height: 45px;
    line-height: 45px;
    padding: 0px 10px;
    color: #323232;
}
/deep/ .van-dropdown-menu__title::after{
  position: absolute;
    top: 0px;
    right: -25px;
    border: 10px solid;
    border-color: transparent transparent currentColor currentColor;
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
    opacity: .8;
    content: '';
}
/deep/ .van-dropdown-menu__title--down,/deep/ .van-dropdown-item__icon{
color: #45B7FF !important;
}
/deep/ .van-cell__title{color: #323232 !important}
.selectBox1{display: flex;justify-content: space-around;.icon-xiangxia{right: -18px;top: 1px; font-size: 13px;}}
</style>
