<template>
  <div class="my-order">
   
    <div class="my-order-nav w">
        <Nav title="小作坊列表" />
        <div class="record  w">
      <search @myvalue="ser" :name.sync="params.company_name" type="home" />
    </div>
    </div>
    <div class="pt100 bgcfff">
       <div v-if="items.length">
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad"  >
            <div class="reviewed pr m15 p15 pt15 bgf5" v-for="(item,index) in items" :key="index" @click="onEnter(item)">
             <h3 class="c000 f16 fb">{{item.company_name}}</h3>
             <div class="address  f15 mt15 view-text">{{item.province+item.city+item.area+item.town+item.vill}}</div>
             <i v-if="urlName!='announce'" class="pa iconfont iconxiangyou"></i>
             <div class="address  f15 mt15 view-text" v-if="urlName==='foodSourceUser'"><span class="fl general_color">溯源次数：{{item.food_source_count}}</span><span class="fr">{{item.food_source_time_last}}</span></div>
             <div class="address  f15 mt15 view-text" v-else-if="urlName==='sampleList'"><span class="fl general_color">留样次数：{{item.food_sample_count}}</span><span class="fr">{{item.food_sample_time_last}}</span></div>
             <div v-if="item.business_form" class="mechanism f14 mt10 disib" :class="item.companytype_code==='1001574645421581000000001'?'cnormal1 bgcnormal1':(item.companytype_code==='1001574645421581000000002'?'cnormal2 bgcnormal2':'cnormal3 bgcnormal3')">{{item.business_form}}</div>
             <van-button  v-if="urlName==='announce'" class="fr mt10 " size="normal" type="primary"  @click="showQR(item)">生成公示二维码</van-button>
        </div>
      
             </van-list>
          </div>
            <empty v-else-if="!items.length&&finished==true" title="暂无小作坊信息" />
        
          
    </div>
    <div class="mask" v-show="isFlag"></div>
		<div class="qrcodeinfo"  v-show="isFlag">
			<div class="qrcodeinfo_url" >
        <div ref="qrcodeContainer" style="display: none"></div>
				<!-- <div id="QRCodeNone" style="width:54%;height:200px;margin:8% 0 8% 23%;display:none;"></div> -->
				<div class="qrcode" id="qrcode" ref="qrCodeUrl" style="margin: 0 auto;width: 220px;height: 220px;"></div>
			</div>
			<p class="explain">长按二维码可识别或保存图片，打印公示</p>
			<div class="close" @click="toClose">
				<i class="icon  iconfont iconclose f30"></i>
			</div>
		</div>
  </div>
</template>
<script>
import QRCode from 'qrcodejs2'
import Nav from "../../components/Nav";
import search from "../../components/search";
import axios from "../../axios/index.js";
import empty from "../../components/empty";

export default {
  name: "my-order",
  components: {Nav,search,empty},
  data() {
    return {
      items:[],
      isFlag: false,
       params: {
        filing_state: "3",
        pager_offset: 0,
        pager_openset: 10,
        company_name: "",
      },
      urlName:'',
      loading: false,
      finished: false,
    };
  },
  created(){
     this.urlName=this.$route.query.urlName;
     this.onLoad()
  },
  methods: {
       ser(value) {
      this.items = [];
      this.params.pager_offset = 0;
      this.params.company_name = value;
      this.loading = true;
      this.finished = false;
      if(this.loading){
        this.onLoad();
      }
    },
    getData() {
       axios.get("app/company/search", this.params).then(v => {
        if (v.code == 200) {
            this.items = this.items.concat(v.data.companyList);
            this.loading = false;
              if (v.data.companyList.length < 10) {
                this.finished = true;
              }
            this.params.pager_offset = this.params.pager_offset + 10;
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
        this.getData()
      }, 500);
     },
     onEnter(item){
       if(this.urlName==='selfexamination'){
          this.$router.push({
            path:'/selfexamination',
            query:{
              id:item.company_code,
              province:item.province
            }
          })
       }else if(this.urlName==='sampleList'){
          this.$router.push('/sampleList?id='+item.company_code)
       }else if(this.urlName==='foodSourceUser'){
          this.$router.push('/foodSourceUser?id='+item.company_code)
      }
     },
     showQR(item){
       console.log(item)
       var self = this
       var url = window.location.protocol+"//"+window.location.host + "/#/view2scan?company_code="+item.company_code
       self.isFlag = true
       window.console.log(url)
       new QRCode(this.$refs.qrcodeContainer,{
         text:url,
         width:220,
         height:220,
         colorDark:'#000',
         colorLight:'#fff',
       })
       var myCanvas = document.getElementsByTagName('canvas')[0];
       var image = new Image();
       image.src = myCanvas.toDataURL("image/png");
        this.$refs.qrCodeUrl.append(image);
     },
     toClose: function() {
			var self = this;
			self.isFlag = false;
			self.$refs.qrCodeUrl.innerHTML='';
		},
   
  }
};
</script>
<style lang="less" scoped>
.my-order {
  height: 100vh;
  background-color: #fff !important;
  .my-order-nav{position: fixed;left: 0px;top: 0px;z-index: 100;
  .record{padding-top: 54px;
   img {
    width: 25px;
    height: 25px;
    position: absolute;
    top: 69px;
    left: 20px;
    z-index: 100;
  }}}
  /deep/ .van-tabs{
  .van-tabs__nav{.van-tab{font-size: 16px;}.van-tabs__line{display: none;}.van-tab--active{color: #e8864c;font-size: 20px;}}
  } 
  /deep/ .van-tabs__wrap--scrollable .van-tab{flex-basis: 20% !important; }
  /deep/ .van-cell__value,.van-cell__right-icon { display: contents;color: #D52E3B}
  .reviewed {
    border-radius:5px;
    .address {
      color: #A6A6A6;
      width: 95%;
    }
    .mechanism {
      padding:8px 10px;
    }
    i {
      color: #A6A6A6;
      top: 45px;
      right: 10px;
    }
    .van-button{height: 35px;}
  }
.mask{
	position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 999;
    background: rgba(0,0,0,.8);
}
.qrcodeinfo{
    position: fixed;
    top: 30%;
    left: 0;
    width: 100%;
    z-index: 1000;
}
.qrcodeinfo_url{
    width: 240px;
    height: 240px;
    background: #fff;
    margin: 0 auto;
        display: flex;
    align-items: center;
}
.savetophotoalbum{
	width: 150px;
    height: 45px;
    line-height: 45px;
    margin: 0 auto;
    background: #1DB65E;
    text-align: center;
    color: #fff;
    border-radius: 4px;
    margin-top: 20px;
}
.explain{
    font-size: 13px;
    text-align: center;
    color: #fff;
    margin-top: 10px;
}
.close{
    text-align: center;
    margin-top: 20px;
}
}
</style>