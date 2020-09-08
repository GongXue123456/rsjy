<template>
  <div>
    <Nav title="个人消息"/>
    <div class="personal">
      <van-list
        v-model="loading"
        :finished="finished"
        :immediate-check="false"
        :offset="10"
        finished-text="没有更多了"
        @load="onLoad"
>
  <div class="information" v-for="(item, index) in formList" :key="index"  @click="showPopu(item)">
        <p>{{item.add_time}}</p>
        <i class="icon iconfont iconxiangyou"></i>
        <p v-if="item.mess_type==1">全部推送</p>
        <p v-if="item.mess_type==2">短信推送</p>
        <p v-if="item.mess_type==3">微信推送</p>
        </div>
</van-list>
   </div>
    <van-popup v-model="show" :append-to-body="true" :close-on-click-overlay="false">
      <div class="popu">
        <i class="icon iconfont icontixing"></i>
        <p v-if="item.mess_type==1">全部内容</p>
        <p v-if="item.mess_type==2">短信内容</p>
        <p v-if="item.mess_type==3">微信内容</p>
        <p>{{item.mess_sms_content}}</p>
      </div>
      <p class="sure" @click="close">确定</p>
    </van-popup>
  </div>
  
</template>
<script>
import Nav from "../../components/Nav";
import axios from '../../axios/index.js';
import Vue from "vue";
import { Popup } from "vant";
import { List } from 'vant';

Vue.use(List);
Vue.use(Popup)
export default {
  components:{
    Nav
  },
  data(){
    return{
      show: false,
      loading: false,
      finished: false,
      item:{},
      personalList:{
        user_code:'',
        pager_offset:0,
        pager_openset:10,
      },
      formList:[]
    }
  },
  mounted(){
    this.personalList.user_code=this.$route.query.user_code
    this.onLoad()
  },
  methods: {
    onLoad(){
      console.log(123)
       setTimeout(() => {
        this.getPersonal()
      }, 500);
    },
    getPersonal(){
      axios.get('/app/messLog/list',this.personalList).then((res)=>{
         if(res.code==200){
          this.formList=res.data.mess_log_list
          this.loading = false;
          if (res.data.mess_log_list.length < 10) {
                this.finished = true;
              }
            this.personalList.pager_offset = this.personalList.pager_offset + 10;
          }else{
            this.$toast({
            message: res.msg,
            duration: 5000
          });
          }
          console.log(res.data)
      })
    },
    showPopu(item) {
      this.item=item
      this.show = true;
    },
    close(){
      this.show = false;
    }
  },
}
</script>
<style scoped lang="less">
.personal{
  margin-top: 55px;
}
.information{
  background: #ffffff;
  border-bottom: 1px solid #cccccc;
  p{
    font-size: 16px;
    padding-left: 10px;
  }
  p:nth-child(1){
    padding-top: 10px;
  }
  p:nth-child(3){
    margin-top: -22px;
    padding-bottom: 10px;
  }
  i{
    font-size: 12px;
    position: relative;
    top: -29px;
    left:352px;
  }
}
.popu{
  width: 270px;
  text-align: center;
  border-bottom: 1px solid #cccccc;
  i{
    font-size: 50px;
    display: block;
    box-sizing: border-box;
    margin: 18px 0px;
  }
  p:nth-child(2){
    font-size: 16px;
    color: #333;
    padding-bottom: 12px;
  }
  p:nth-child(3){
    color: #666;
    line-height: 25px;
    margin-top: 2px;
    font-size: 14px;
    padding: 0px 16px;
    text-align: left;
    padding-bottom: 12px;
  }
}
.sure{
  padding: 16px 0px;
  line-height: 25px;
  text-align: center;
  font-size: 16px;
  color:#fc9153;
}
/deep/ .van-overlay{
  opacity: 0.8 !important;
}
</style>