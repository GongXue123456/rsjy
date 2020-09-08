<template>
<div>
    <Nav title="个人中心"/>
    <div class="box">
      <header>
        <div class="head">
          <!-- v-if="form.user_logo_url==null" -->
          <div class="fl  pt15">
           
          <van-image width="80" v-if="form.user_logo_url" height="80" fit="cover" :src="(imageUrl+form.user_logo_url)"/> 
           <img class="moren" src="../../assets/img/user.png" v-else/>
          <van-uploader  camera :max-count="1" :after-read="uploadPic">
            <van-button icon="plus" type="primary"><img src="../../assets/img/touxiang.png"/></van-button>
          </van-uploader>
          </div>
          <div>
            <p class="name">{{user_name}}</p>
          <div class="circle disib mt10" v-if="user_type=='平台管理员'||user_type=='超级管理员'">管理员</div>
          <div class="circle disib mt10" v-else-if="user_type=='协管员'">协管员</div>
          <div class="circle disib mt10" v-else-if="user_type=='举办者'||user_type=='农家乐'||user_type=='乡厨酒店'||user_type=='食堂'||user_type=='配送企业'||user_type=='食品经营者'">食品经营者</div>
          </div>
        </div>
      </header>
      <section>
        <div>
          <div class="change border one" @click="toPhone">
          <img src="../../assets/img/phone.png"/>
          <p class="ml10">修改手机号</p>
          <i class="icon iconfont iconxiangyou"></i>
        </div>
        <div class="change border two" @click="toPassword">
          <img src="../../assets/img/password.png"/>
          <p  class="ml10">修改密码</p>
          <i class="icon iconfont iconxiangyou"></i>
        </div>
        </div>
      </section>
      <div class="button ">
        <van-button type="primary" @click="backLogin">退出登录</van-button>
      </div>
       <van-dialog v-model="show" title="退出登录" show-cancel-button @confirm="onConfirm">
          <p>确认退出!</p>
      </van-dialog>
    </div>
</div>
</template>
<script>
import Nav from "../../components/Nav";
import Vue from "vue";
import { Popup } from "vant";
import { Dialog } from 'vant';
import axios from "../../axios/index.js";
import {  uploadImg } from "../../utils/index";
import { imageUrl } from "../../config/index";

Vue.use(Popup)
Vue.use(Dialog);
export default {
  components:{
    Nav
  },
  data(){
    return{
     show:false,
     user_name:'',
     form:'',
     user_type:'',
     fileList:{
       user_loginname:'',
       user_logo_url:''
     },
     imageUrl: imageUrl,
     params: {
        filing_state: "",
        pager_offset: 0,
        pager_openset: 10,
        company_name: ""
      },
    }
  },
  created(){
    axios.get('app/user/single').then((v)=>{
      this.user_type=v.data.user_type
      this.form=v.data
      this.fileList.user_loginname=v.data.user_loginname
      this.user_name=v.data.user_name
    })
  },
  mounted(){
    this.getList()
  },
  methods:{
     getList(params) {
      axios.get("app/company/search", params).then(v => {
        console.log(v)
      })
     },
    toPhone(){
      this.$router.push({
        path:'/userCenter/changePhone'
      })
    },
    onConfirm(){
      window.location.href=imageUrl+"receiveLogin/logout"
    },
    uploadPic(file){
      let formData=new FormData()
      formData.append('uploadFile',file.file)
      const loading=this.$toast.loading({
        message:'上传中',
        forbidClick:true,
        duration:0
      })
      uploadImg(formData).then((res)=>{
        loading.clear()
        this.form.user_logo_url=res.data.visit_url.substring(res.data.visit_url.indexOf("resources"))
        this.fileList.user_logo_url=this.form.user_logo_url
        axios.put('app/user/updateDetails',this.fileList).then(()=>{
         
        })
      })
    },
    toPassword(){
       this.$router.push({
        path:'/userCenter/changePassword'
      })
    },
    backLogin(){
      this.show=true
    }
  }
}
</script>
<style lang="less" scoped>
/deep/ .box{
  .van-dialog__header {
    font-size: 16px;
  }
  .van-dialog__content{
    text-align: center;
    padding-top: 10px;
    font-size: 14px;
  }
  .van-dialog__confirm{
    color:red;
  }
}
header{
  padding-top: 54px;
  height:200px;
  background: url("../../assets/img/background.png");
  background-size:100% 100%;
  .head{
    padding: 15px ;
        display: flex;
        align-items: center;
      .moren{
        width: 80px;
        height: 80px;
            position: relative;
    display: inline-block;
      }  
    .van-image{
      /deep/ img{
      border-radius: 150px;
      }
    }
   .name{
      font-size: 18px;
      color:#fff;
    }
    .van-uploader{
      font-size: 14px;
      color:#fff;
      position: relative;
top: -20px;
left: -20px;
img{
      position: absolute;
      width: 32px;
      height: 32px;
      bottom: 0px;
      left: 0px;
    }
 .van-icon{
    display:none;
  }
  .van-button{
    border: none;
    background: transparent;
  }
    }
    .circle{
      font-size: 14px;
      color: #ffffff;
      border: 1px solid rgba(255,255,255,0.4);
      background: rgba(255,255,255,0.15);
      padding:8px 12px;
      text-align: center;
      border-radius: 12px;
    }
    .upload{
      font-size: 16px;
      color:#ffffff;
    }
  }
}
section{
  height: 100%;
  margin-top: 20px;
  background: #ffffff;
  div:nth-child(1){
    margin-top: -23px;
    .change{
      display: flex;
    padding: 15px;
    font-size: 14px;
    color: #333333;
    box-sizing: border-box;
    position: relative;
    img{
      width: 23px;
      height: 23px;
      vertical-align: middle;
      line-height: 20px;
    }
    i{
      font-size: 12px;
      position: absolute;
      top: 20px;
      right: 15px;
    }
    p{
      font-size: 15px;
         padding-top: 5px;
    }
  }
  .border{
    border-bottom: 1px solid #E0E0E0;
  }
  .two{
    border: none;
  }
  }
 
}
.button{
    width: 90%;
    margin:30px auto;
  .van-button{
     display: block;
    width: 100%;
            padding: 0 8px;
    font-size: 18px;
        box-sizing: border-box;
    height: 50px;
    line-height: 50px;
    text-align: center;
    border-radius: 4px;
    cursor: pointer;
    -webkit-transition: opacity .2s;
    transition: opacity .2s;
    -webkit-appearance: none;
    background-color: #07c160;
    border: 0.026667rem solid #07c160;
  border: 1px solid #ffffff;
  
}
}
</style>