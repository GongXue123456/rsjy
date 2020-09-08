<template>
    <div class="newaddress">
         <van-nav-bar class="bgcfff" title="添加地址" left-arrow @click-left="back(-1)" />
    <!-- <van-address-edit class="pt50 mt10"
      :area-list="areaList"
      :show-postal="false"
      :show-delete="false"
      show-set-default
      :address-info="addressinfo"
      show-search-result
      @save="onSave"
    /> -->
    <van-cell-group class="pt50 mt10 transparent">
  <van-field class="border-b"
    v-model="username"
    label="收货人"
    placeholder="请输入收货人姓名"
  />
  <van-field  class="border-b"
    v-model="phone"
    label="手机号"
    placeholder="请输入手机号"
  />
  
  <div id="app" :class="{'on':isVisibleFirst||isVisibleSecond||isVisibleThird}" class="border-b">
 
    <div class="select-box" @click="showFirstLayer">
      <van-field
  readonly
  clickable
  label="城市"
  :value="'四川省成都市'+theString"
  placeholder="选择城市"
  @click="isVisibleFirst = true"
  MultiLine = "true"
/>
   
      <div class="" :class="{'list-box':isVisibleFirst||isVisibleSecond||isVisibleThird}">
         <div v-if="isVisibleFirst" @click.stop="cancel(0)" class="van-overlay" style="z-index: 100;"></div>
        <div class="list" v-if="isVisibleFirst">
<!-- <van-popup v-model="isVisibleFirst"  position="bottom">
  <van-picker show-toolbar title="标题" :columns="list" @cancel="back(0)"  @confirm="givenValueOfCurr" />
</van-popup> -->
  
<van-action-sheet v-model="isVisibleFirst" :overlay="false">
 
   <div class="title"><div @click="back(0)" class="general_color">取消</div><div>区/县</div><div @click="givenValueOfCurr" class="general_color">确定</div></div>
  <div class="content">
     <div class="item" v-for="(theitem,index) in list" :key="index"  @click="givenValueOfCurr1(index)" :class="{'active':index==curr}">
     {{theitem.text}}
 </div>
  </div>
</van-action-sheet>
        </div>
         <div v-if="isVisibleSecond" @click.stop="cancel(1)" class="van-overlay" style="z-index: 100;"></div>
        <div class="list" v-if="isVisibleSecond">
          <!-- <van-popup v-model="isVisibleSecond"  position="bottom">
  <van-picker show-toolbar title="标题" :columns="list[curr].regionList" @cancel="back(1)" @confirm="clickingSecondLayer"/>
</van-popup> -->
       
        <van-action-sheet v-model="isVisibleSecond" :overlay="false">
         <div class="title"><div @click="back(1)" class="general_color">取消</div><div>镇/街道</div><div class="general_color" @click="clickingSecondLayer">确定</div></div>
   <div class="content">
     <div class="item" v-for="(theSeItem,index1) in list[curr].regionList" :key="index1" @click="clickingSecondLayer1(index1)" :class="{'active':index1==currSec}">
     {{theSeItem.text}}
 </div>
   </div>
</van-action-sheet>
        </div>
          <div v-if="isVisibleThird" @click.stop="cancel(2)" class="van-overlay" style="z-index: 100;"></div>
        <div class="list" v-if="isVisibleThird" >
           <!-- <van-popup v-model="isVisibleThird"  position="bottom">
  <van-picker show-toolbar title="标题" :columns="list[curr].regionList[currSec].regionList" @cancel="back(2)" @confirm="clickingThridLayer"/>
</van-popup> -->

<van-action-sheet v-model="isVisibleThird" :overlay="false">
  <div class="title"><div @click="back(2)" class="general_color">取消</div><div>村/社区</div><div class="general_color" @click="clickingThridLayer">确定</div></div>
   <div class="content">
     <div class="item" v-for="(theThItem,index2) in list[curr].regionList[currSec].regionList" :key="index2" @click="clickingThridLayer1(index2)" :class="{'active':index2==currThr}">
     {{theThItem.text}}
 </div>
   </div>
</van-action-sheet>
          </div>
      </div>
    </div>
 
  </div>
   <van-field class="border-b"
    v-model="address1"
    label="详细地址"
    placeholder="街道门牌、楼层房间号等信息"
  />
  <van-switch-cell active-color="#45B7FF" v-model="checked" title="设为默认收货地址" />
 
</van-cell-group>
 <div class="save_btn">
   <van-button class="w" type="danger" size="normal" @click="onSave()">保存</van-button>
 </div>
    </div>
</template>
<script>
// import areaList from "../../assets/js/area";
import {getAddressSave,getCustomerAddress,getFiveAddress} from '../../api/index';
import {local} from '@/until/data'
export default {
    data() {
    return {
      username:'',
      phone:'',
      address:'',
      address1:'',
      user:local.get('userinfo'),
      checked: true,
      list:'',
        curr: -1,
        currSec: -1,
        currThr:-1,
        firstTimeClick: 0,
        isVisibleFirst: false,
        isVisibleSecond: false,
        isVisibleThird:false,
        theString: "",
        selectionBoxDisplay: true,
        oa_province:'四川省',
        oa_city:'成都市',
        oa_area:'',
        oa_town:'',
        oa_vill:''
    };
  },
    created(){
    if (!this.user) {
         this.$router.push({
          name: "LoginView"
        });
     };
     getFiveAddress().then(response => {
        if (response.code == 200) {
          this.list=response.data
        }else{
           this.$toast({
            message: "数据获取失败，请重新获取",
            duration: 5000
          });
        }
      });
  },
  methods:{
    cancel(index){
       if(index==0){
                this.isVisibleFirst = false;

            }else if(index==1){
                this.isVisibleSecond = false;
            }else{
                this.isVisibleThird = false;
            }
        },

        onSave() {
        var oaoften;
        if(this.username==''|| !this.username){
          this.$toast("请输入收货人姓名");
        return false;
        };
        if (!(/^1[345789]\d{9}$/.test(this.phone))||this.phone == "" || !this.phone) {
          this.$toast("请输入正确的手机号");
        return false;
        }
        if(this.oa_area==''|| !this.oa_area){
          this.$toast("请选择地址");
          return false;
        };
        if(this.checked==false){
          oaoften=2
        }else{
          oaoften=1
        }
       let data = {
       ca:[{c_id:this.user.c_id,oa_province:this.oa_province,oa_city:this.oa_city,oa_area:this.oa_area,oa_town:this.oa_town,oa_vill:this.oa_vill,oa_address:this.address1,oa_linkman:this.username,oa_telphone:this.phone,oa_often:oaoften,}]
      };
     getAddressSave(data).then(response => {
        if (response.code == 210) {
           this.$router.replace({path: '/addresslist', query:{id:this.$route.query.id}});
           this.getData()
        } else {
          this.$toast({
            message: response.msg,
            duration: 5000
          });
        }
      });
    },
    //   back(){
    //    
    // },
     getData(){
       let data = {
        c_id: this.user.c_id
      };
      getCustomerAddress(data).then(response => {
        if (response.code == 200) {
         this.list1=response.data.customerAndAddressesList;
           this.list1.forEach(lists=>{
            if(lists.oa_often==1){
              var data=lists;
               this.$store.dispatch('address/setAddress',data);
            }
        })
        }
      });
    },
    showFirstLayer() {
          this.isVisibleFirst = true;
          if (this.firstTimeClick ==1) {
            this.isVisibleFirst = false;
            this.isVisibleSecond = true;
          }else if(this.firstTimeClick == 2){
            this.isVisibleFirst = false;
            this.isVisibleSecond = false;
            this.isVisibleThird = true;
          }
          this.selectionBoxDisplay = false;
 
        },
        givenValueOfCurr(index) {
          if(this.oa_area!=''){
             this.firstTimeClick = 1;
          this.isVisibleSecond = true;
          this.isVisibleThird = false;
          }else{
              this.$toast("请选择区/县");
          }
        },
        givenValueOfCurr1(index){
           this.curr = index;
          this.currSec = -1;
          this.theString = this.list[this.curr].text;
          this.oa_area=this.list[this.curr].text;
        },
        clickingSecondLayer(index1) {
           if(this.oa_town!=''){
             this.firstTimeClick = 2;
          }else{
              this.$toast("请选择镇/街道");
          }
        },
         clickingSecondLayer1(index1) {
            this.theString = this.list[this.curr].text;
          this.currSec = index1;
          this.currThr = -1;
          this.theString += this.list[this.curr].regionList[this.currSec].text;
          this.oa_town=this.list[this.curr].regionList[this.currSec].text;
        },
        clickingThridLayer(index2) {
           if(this.oa_vill!=''){
              this.isVisibleFirst = false;
          this.isVisibleSecond = false;
          this.isVisibleThird = false;
          }else{
              this.$toast("请选择村/社区");
          }
         
          event.stopPropagation();
        },
         clickingThridLayer1(index2) {
            this.theString =this.list[this.curr].text+this.list[this.curr].regionList[this.currSec].text;
          this.currThr = index2;
          this.theString += this.list[this.curr].regionList[this.currSec].regionList[this.currThr].text;
          this.oa_vill=this.list[this.curr].regionList[this.currSec].regionList[this.currThr].text
        },
        back(index){
          if(index==-1){
             this.$router.replace({path: '/addresslist', query:{id: this.$route.query.id}});
          }else if(index==0){
             this.curr=-1;
             this.oa_area=''
                this.selectionBoxDisplay = true;
                this.isVisibleFirst = false;
                this.isVisibleSecond = false;
                this.isVisibleThird = false;
                this.firstTimeClick = 0;

            }else if(index==1){
               this.currSec = -1;
               this.oa_town=''
                this.isVisibleFirst = true;
                this.isVisibleSecond = false;
                this.isVisibleThird = false;
                this.firstTimeClick = 1;
                this.theString = this.list[this.curr].text;
            }else{
               this.currThr = -1;
               this.oa_vill=''
                this.isVisibleFirst = false;
                this.isVisibleSecond = true;
                this.isVisibleThird = false;
                this.theString =this.list[this.curr].text +this.list[this.curr].regionList[this.currSec].text;
            }
            event.stopPropagation();
        }
  }
}
</script>
<style lang="scss" scoped>
 .van-nav-bar {
    .van-nav-bar__title {
      color: #282828;
      font-weight: Bold;
      font-size: 18px;
    }
    .van-icon {
      color: #282828;
    }
  }
  /deep/ .van-button--danger{ background: -webkit-gradient(linear, 0% 25%, 75% 100%, from(#15A4FF), to(#20CAE3));}
   /deep/ .van-overlay {
  top:0px;
}
.van-action-sheet__content .content{    height: 224px;
    overflow: scroll;
    text-align: center;}
.save_btn{padding: 30px 15px;}

   .list .item {
    height: 38px;
    line-height: 38px;
    font-size: 14px;
    cursor: pointer;
    position: relative;
}
.list .item.active {
      color: #45B7FF;
      font-weight: bolder;
      font-size: 16px;
    }
.title{
  display: flex;
      justify-content: space-between;
    height: 40px;
    align-items: center;
        padding: 0 15px;
    font-size: 15px;
        border-bottom: 0.5px solid #f5f5f5;
}
   
</style>