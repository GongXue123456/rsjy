<template>
  <div class="address-list">
    <van-nav-bar class="bgcfff" title="地址管理" left-arrow @click-left="$router.back()" />
    <!-- <van-tabs type="card" class="bgcfff" v-model="active"> -->
      <div v-if="active==0" title="自提点" class="bgcfff mt60 pt10" name="0">
        <van-cell class="transparent f14 p15 pt0 pb0 c91" title="收货地址" />
        <van-row class=" bgcfff p15 mb10" v-for="(item,index) in list" :key="index" >
        <van-col span="24" >
          <van-cell class="p0" :title="item.oa_province+item.oa_city+item.oa_area+item.oa_town+item.oa_vill+item.oa_address"  :label="item.oa_linkman+' '+item.oa_telphone" @click="checkAddress(item)"/>
        </van-col>

      </van-row>
      </div>
       <div  v-else-if="active==1&&show" title="送货上门" class="bgcfff mt60 pt10" name="1">
        <van-cell class="transparent f14 p15 pt0 pb10 c91  address1" title="收货地址" icon="">
        <template slot="icon">
            <img  class="mr5" src="../../assets/images/address1.png">
          </template>
        </van-cell>
        <div v-if="show" class="address_list">
          <van-row  class=" bgcfff p15 mb10" v-for="(item,index) in list1" :key="index">
        <van-col span="22" >
          <van-cell class="p0" :title="item.oa_province+item.oa_city+item.oa_area+item.oa_town+item.oa_vill+item.oa_address"  :label="item.oa_linkman+' '+item.oa_telphone" @click="checkAddress1(item)"/>
        </van-col>
        <van-col span="2"  class="tr">
          <span class="iconfont icon-bianji" @click="$router.replace('/editaddress?id='+item.ca_id)"></span>
           <!--  -->
        </van-col>
      </van-row>
        </div>
       <div v-if="active==1" class="w addAddreaa"> <button class="f16 general_border general_color bgcfff" @click="addAddress()"><span class="mr10">+</span>新增地址</button></div>
      </div>
      <div v-if="active==1&&!show">
        
         <div class="tc pt150 pb100">
        <div class="wrap_cart">
         <img src="../../assets/images/address_null.png">
        </div>
        <p class="text_empty f14 pt20 c9D">您还没有地址赶快添加一个吧~</p>
        <div class="general_bgc f15 cfff go_index mt20" @click="addAddress()">新增地址</div>
      </div>
      </div>
    <!-- </van-tabs> -->
   
  </div>
</template>
<script>
import {getCustomerAddress} from '../../api/index'
import { mapState, mapActions } from "vuex";
import {local} from '@/until/data'
export default {
    data() {
    return {
      chosenAddressId: '1',
      state:0,
      list: [],
      list1:[],
      checked:false,
      user:local.get('userinfo'),
      active: '1',
      show:true
    }
  },
   computed:{
            ...mapState({
                address:state=> state.address.address,
            })
        },
  created(){
     this.getData();
    if (!this.user) {
         this.$router.push({
          name: "LoginView"
        });
     }
      console.log(this.$route.query.id)
     if(this.$route.query.id!=''){
          this.active = "1";
     }else{
         this.active ="0"
       
     }
 
   
   
  },
  methods: {
    getData(){
       let data = {
        c_id: this.user.c_id
      };
      getCustomerAddress(data).then(response => {
        if (response.code == 200) {
         this.list=response.data.selfMentionAndAddressesList;
         this.list1=response.data.customerAndAddressesList;
            if (this.list1.length > 0) {
            this.show=true;
            this.list1.forEach(lists => {
              if (lists.oa_often == 1) {
                var data = lists;
                this.$store.dispatch("address/setAddress", data);
              }
            });
          } else {
            this.show=false;
            this.$store.dispatch("address/setAddress", this.list1);
          }
        }
      });
    },
    checkAddress(item){
      console.log(local.get('backto'))
       console.log(this.$route.query.id)
       if(this.$route.query.id!=null&&local.get('backto')!='a'){
          var data=item;
           console.log(this.$route.query.id)
        this.$store.dispatch('address/setSelfAddress',data);
       this.$router.push({
        name: "ConfirmOrderView",
         query: {
         id:1
      }
      });
       }
    },
     checkAddress1(item){
       if(this.$route.query.id!=''&&local.get('backto')!='a'){
         var data=item;
      this.$store.dispatch('address/setAddress',data);
        this.$router.push({
        name: "ConfirmOrderView",
        query: {
         id:'a'
      }
      });
       }
    },
     onClick(name, title) {
      this.state = name;
      },
       toggle(index) {
      this.$refs.checkboxes[index].toggle();
    },
    addAddress(){
     this.$router.replace({
        name: "NewAddressView",
         query: {
         id:this.$route.query.id
      }
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.address-list {
  .address_list{margin-bottom: 65px;}
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

    .van-row{
        display: flex;
    align-items: center;
    justify-content: center;
    .van-cell__title span{font-size: 16px;color: #3C3C3C;font-weight: bold}
    .van-cell__label{font-size: 14px;color: #A6A6A6}
   }
  .van-tabs--card {
    height: 50px;
    padding-top: 100px;
    /deep/ .van-tabs__nav--card {
      width: 170px;
      height: 35px;
      margin: auto;
      border-radius: 20px;
          border: 0.05rem solid #45B7FF;
      .van-tab {
        padding: 3px 8px;
        border-radius: 20px 0px 0px 20px;
            color: #45B7FF;
            border-right: 0.05rem solid #45B7FF;
                margin-right: 0px;
                    line-height: 2;
      }
      .van-tab.van-tab--active{
            color: #fff;
          background-color: #45B7FF
      }
      .van-tab:last-child {
        border-radius: 0px 20px 20px 0px;
      }
     
    }
  }
    .address1 img{width: 17px;height:17px;margin-top: 3px}
  .address1 .van-cell__title{font-size: 14px;}
   /deep/ .van-tabs__content{margin-bottom: 60px}
  /deep/ .van-tabs--card > .van-tabs__wrap {
    height: 50px;
    line-height: 50px;
    top: 55px;
  }
  .van-address-list{padding-bottom: 50px}

/deep/ .van-radio__icon--checked .van-icon {
    background-color: #45B7FF !important;
    border-color: #45B7FF !important;
}
.van-address-list__add {
    width: 90%;
    bottom: 20px;
    left: 5%;
    background-color: transparent;
    color: #45B7FF;
    border: 1px solid #45B7FF;
    border-radius: 50px;
}
.addAddreaa{
  height:66px;
  position: fixed;
  bottom: 0px;
  text-align: center;
  padding: 10px 0px;
background-color: #f5f5f5;
}
.addAddreaa button{
 width:208px;
  height:46px;
  line-height: 45px;
  border-radius: 23px;
}
.wrap_cart img{width: 125px}
.go_index{display: inline-block;padding: 10px 20px;border-radius:4px;}
}
</style>

