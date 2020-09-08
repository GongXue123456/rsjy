<template>
  <div class="edit">
    <van-nav-bar class="bgcfff border-b" title="编辑地址" left-arrow @click-left="back(-1)" />
    <!-- <van-address-edit
      class="pt50 mt10"
      :area-list="areaList"
      :show-postal="false"
      :address-info="addressinfo"
      show-delete
      show-set-default
      @save="onSave"
      @delete="onDelete"
    /> -->
     <van-cell-group class="pt50 mt10 transparent">
  <van-field class="border-b"
    v-model="addressinfo.name"
    label="收货人"
    placeholder="请输入收货人姓名"
  />
  <van-field class="border-b"
    v-model="addressinfo.tel"
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
  @focus="aaaa"
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
    v-model="addressinfo.addressDetail"
    label="详细地址"
    placeholder="街道门牌、楼层房间号等信息"
  />
  <van-switch-cell active-color="#45B7FF" v-model="addressinfo.isDefault" title="设为默认收货地址" />
 
</van-cell-group>
 <div class="save_btn">
   <van-button class="w" type="danger" size="normal" @click="onSave()">保存</van-button>
   <van-button class="w mt20" type="default" size="normal" @click="onDelete()">删除</van-button>
 </div>
  </div>
</template>
<script>
import areaList from "../../assets/js/area";
import { mapState, mapActions } from "vuex";
import {
  getAddressAddress,
  getAddresseditAddress,
  getAddressDelete,
  getCustomerAddress,
  getFiveAddress
} from "../../api/index";
import { local } from "@/until/data";
export default {
  data() {
    return {
      areaList,
      addressinfo: {
        id: 0,
        name: "",
        tel: "",
        province: "四川省",
        city: "成都市",
        county: "",
        area:'',
        town:'',
        vill:'',
        addressDetail: "",
        areaCode: "0",
        isDefault: false
      },
      list:'',
      addressinfoList:'',
        curr: -1,
        currSec: -1,
        currThr:-1,
        firstTimeClick: 0,
        isVisibleFirst: false,
        isVisibleSecond: false,
        isVisibleThird:false,
        theString: "",
        selectionBoxDisplay: true,
      user: local.get("userinfo")
    };
  },
  created() {
    if (!this.user) {
      this.$router.push({
        name: "LoginView"
      });
    }
    this.getData();
     getFiveAddress().then(response => {
        if (response.code == 200) {
          this.list=response.data;
        }else{
           this.$toast({
            message: "数据获取失败，请重新获取",
            duration: 5000
          });
        }
      });
  },
  methods: {
    getData() {
      let data = {
        c_id: this.user.c_id,
        ca_id: this.$route.query.id
      };
      getAddressAddress(data).then(response => {
        if (response.code == 200) {
          this.addressinfoList = response.data;
          this.addressinfo = {
            id: this.addressinfoList.ca_id,
            name: this.addressinfoList.oa_linkman,
            tel: this.addressinfoList.oa_telphone,
            province: this.addressinfoList.oa_province,
            city: this.addressinfoList.oa_city,
            county: this.addressinfoList.oa_area,
            addressDetail: this.addressinfoList.oa_address,
            areaCode: this.addressinfoList.oa_area_code,
              town:this.addressinfoList.oa_town,
        vill:this.addressinfoList.oa_vill,
            isDefault: this.addressinfoList.oa_often == 2 ? false : true
          };
          this.theString=this.addressinfoList.oa_area+this.addressinfoList.oa_town+this.addressinfoList.oa_vill;
        } else {
          this.$toast({
            message: response.msg,
            duration: 5000
          });
        }
      });
    },
    aaaa(){
       this.theString=='';
     this.addressinfo.county='';
    this.addressinfo.town='';
    this.addressinfo.vill='';
    },
    cancel(index){
       if(index==0){
                this.isVisibleFirst = false;

            }else if(index==1){
                this.isVisibleSecond = false;
            }else{
                this.isVisibleThird = false;
            }
        },
    onDelete() {
      let data = {
        c_id: this.user.c_id,
        ca_id: this.addressinfo.id
      };
      getAddressDelete(data).then(response => {
        if (response.code == 214) {
          this.$router.replace({
            path: "/addresslist",
            query: { id: this.$route.query.id }
          });
        } else {
          this.$toast({
            message: response.msg,
            duration: 5000
          });
        }
      });
    },
    onSave() {
      var oaoften;
      if(this.addressinfo.name==''|| !this.addressinfo.name){
          this.$toast("请输入收货人姓名");
        return false;
        };
        if (!(/^1[345789]\d{9}$/.test(this.addressinfo.tel))||this.addressinfo.tel == "" || !this.addressinfo.tel) {
          this.$toast("请输入正确的手机号");
        return false;
        }
        if(this.addressinfo.county==''|| !this.addressinfo.county){
          this.$toast("请选择地址");
          return false;
        };
      if (this.addressinfo.isDefault == false) {
        oaoften = 2;
      } else {
        oaoften = 1;
      }
      let data = {
        ca: [
          {
            c_id: this.user.c_id,
            ca_id: this.addressinfo.id,
            oa_province: this.addressinfo.province,
            oa_city: this.addressinfo.city,
            oa_area: this.addressinfo.county,
             oa_town:this.addressinfo.town,
            oa_vill:this.addressinfo.vill,
            oa_address: this.addressinfo.addressDetail,
            oa_area_code: this.addressinfo.areaCode,
            oa_linkman: this.addressinfo.name,
            oa_telphone: this.addressinfo.tel,
            oa_often: oaoften
          }
        ]
      };
      getAddresseditAddress(data).then(response => {
        if (response.code == 210) {
          this.$router.replace({
            path: "/addresslist",
            query: { id: this.$route.query.id }
          });
        } else {
          this.$toast({
            message: response.msg,
            duration: 5000
          });
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
          if(this.addressinfo.county!=''){
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
          this.addressinfo.county=this.list[this.curr].text;
        },
        clickingSecondLayer(index1) {
           if(this.addressinfo.town!=''){
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
          this.addressinfo.town=this.list[this.curr].regionList[this.currSec].text;
        },
        clickingThridLayer(index2) {
           if(this.addressinfo.vill!=''){
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
          this.addressinfo.vill=this.list[this.curr].regionList[this.currSec].regionList[this.currThr].text
        },
        back(index){
          if(index==-1){
             this.$router.replace({
        path: "/addresslist",
        query: { id: this.$route.query.id }
      });
          }else if(index==0){
            this.curr=-1;
            this.addressinfo.county=''
                this.selectionBoxDisplay = true;
                this.isVisibleFirst = false;
                this.isVisibleSecond = false;
                this.isVisibleThird = false;
                this.firstTimeClick = 0;
            }else if(index==1){
               this.currSec = -1;
               this.addressinfo.town='';
                this.isVisibleFirst = true;
                this.isVisibleSecond = false;
                this.isVisibleThird = false;
                this.firstTimeClick = 1;
                this.theString = this.list[this.curr].text;
            }else{
               this.currThr = -1;
               this.addressinfo.vill='';
                this.isVisibleFirst = false;
                this.isVisibleSecond = true;
                this.isVisibleThird = false;
                this.theString =this.list[this.curr].text +this.list[this.curr].regionList[this.currSec].text;
            }
            event.stopPropagation();
        }
    
  }
};
</script>>
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
.van-button--default {
  background-color: #fff;
  color: #323233;
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