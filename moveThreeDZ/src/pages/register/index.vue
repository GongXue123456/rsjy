<template>
<div>
  <Nav title="注册"/>
  <div class="header">
    <h3>Hi,欢迎注册</h3>
    <span class="register">欢迎使用食安数智云平台</span>
    <div class="body">
      <div class="box">
      <span class="foodworker">{{form.user_type}}</span>
      <span @click="showPopup">重新选择</span>
      <div class="iconfont">
        <i class="icon iconfont iconxiangyou"></i>
      </div>
      <van-form  @submit="onSubmit" class="form" @failed="onFailed">
        <van-field  left-icon="iconfont-user" v-model="form.user_name" placeholder="请输入真实姓名"   :rules="[{ required: true, message: '请输入真实姓名' }]" class="card">
          <van-icon class="iconfont iconfont-user" class-prefix="iconfont" slot="left-icon" name="iconfont-user"></van-icon>
        </van-field>
        <van-field  left-icon="iconfont-shoujihao" v-model="form.user_loginname" type="number" placeholder="请输入手机号"   :rules="[{ required: true, message: '请输入手机号' },{pattern,message:'请输入正确的手机号码'}]" class="card">
          <van-icon class="iconfont iconfont-shoujihao" class-prefix="iconfont" slot="left-icon" name="iconfont-shoujihao"></van-icon>
        </van-field>
        <van-field  left-icon="iconfont-mima" v-model="form.user_loginpass" placeholder="请输入密码" type="password"  :rules="[{ required: true, message: '请输入密码' },{ validator, message: '密码错误，密码长度4-15位数字或字母组成' }]" class="card">
          <van-icon class="iconfont iconfont-mima" class-prefix="iconfont" slot="left-icon" name="iconfont-mima"></van-icon>
        </van-field>
        <van-field readonly clickable  type="textarea" v-model="place_operate" rows="1" autosize  placeholder="请输入企业所在地"  right-icon="arrow" @click="show_Picker" :rules="[{ required: true, message: '请选择企业所在地' }]" class="card" />
        <van-field   placeholder="请输入详细地址" v-model="form.user_address"  :rules="[{ required: true, message: '请输入详细地址' }]" class="card"/>

        <getAddress v-if="showPicker" @closeTip="show1(5)" @closeTip1="showAddress" :province="form.user_province" :city="form.user_city" :area="form.user_area" :vill="form.user_vill" :town="form.user_town"  />
        <van-button size="small"  type="primary">注册</van-button>
      
        <p>若已有帐号，您可以选择</p>
        <!-- <van-button size="small"  type="primary" class="login" @click="login">登录</van-button> -->
        <div class="login1" @click="login">登录</div>
        <div class="foot"></div>
      </van-form>
      </div>
    </div>
      <div class="footer"></div>
      <van-popup v-model="show" :append-to-body="true" class="popup">
          <p>请选择身份</p>
          <div class="food" ref="status" :class="{active :click==0}" @click="active">{{foodwork}}</div>
          <div class="chief" ref="status1" :class="{active :click==1}" @click="active1">{{chief}}</div>
      </van-popup>
       <van-popup v-model="flag" :append-to-body="true" class="popup">
          <p>请选择身份</p>
          <div class="food" ref="status" :class="{active :click==0}" @click="active">{{foodwork}}</div>
          <div class="chief" ref="status1" :class="{active :click==1}" @click="active1">{{chief}}</div>
      </van-popup>
  </div>
  
</div>
</template>
<script>
import Nav from "../../components/Nav";
import getAddress from "../../components/getAddress";
import axios from "../../axios/index.js";
import Vue from "vue";
import { Popup } from "vant";
import md5 from "js-md5"

Vue.use(Popup);
export default {
  components:{
    Nav,
    getAddress
  },
  data(){
    return{
      click:'',
      showPicker: false,
      show:false,
      flag:false,
      foodwork:'食品经营者',
      chief:'乡厨',
      pattern:/^1[13456789]\d{9}$/,
      place_operate:'',
      form: {
        user_province: "",
        user_city: "",
        user_area: "",
        user_vill: "",
        user_town: "",
        user_name:'',
        user_loginname:'',
        user_mobilephone:'',
        user_loginpass:'',
        user_address:'',
        user_type:''
      },
    }
  },
  created(){
    this.show=true
  },
  mounted(){
    this.form.user_type=this.$refs.status.innerText
  },
  methods:{
    onSubmit(){
      if(this.form.user_province==''|| this.form.user_city==''|| this.form.user_area==''|| this.form.user_vill==''|| this.form.user_town==''){
          this.$dialog.confirm({
           title:'',
           message:'请填写完整企业地址',
       })
      }else{
         axios.get('app/user/exist',{user_loginname:this.form.user_loginname}).then((v)=>{
        if(v.code===200){
           this.form.user_mobilephone=this.form.user_loginname
           this.form.user_loginpass=md5(this.form.user_loginpass)
           axios.post('app/user/save',this.form).then((v)=>{
        console.log(v)
      })
        }
      })
      }
    },
    validator(val) {
      return /^[a-zA-Z0-9]{4,15}$/.test(val);
    },
    show_Picker(){this.showPicker=!this.showPicker;},
    show1(val){
      if(val==5){this.showPicker=false;}  
    },
    showAddress(val1,val2,val3,val4,val5){
      this.form.user_province=val1;
      this.form.user_city=val2;
      this.form.user_area=val3;
      this.form.user_vill=val4;
      this.form.user_town=val5;
      this.place_operate=val1+val2+val3+val4+val5;
    },
    login(){
      this.$router.push({
        path:'/PasswordLogin'
      })
    },
    showPopup(){
      this.flag=true
    },
    onFailed(errorInfo) {
      this.$toast(errorInfo.errors[0].message)
      },
    active(){
    this.form.user_type=this.$refs.status.innerText
    this.click=0
    this.show=false
    this.flag=false
    },
    active1(){
      this.form.user_type=this.$refs.status1.innerText
      this.click=1
      this.show=false
      this.flag=false
    }
  }
}
</script>
<style scoped lang="less">
.header{
  background: url("../../assets/img/background (2).jpg") no-repeat ;
  background-size:100% 100%;
  margin-top: 54px;
  h3{
    padding-left: 27px;
    padding-top: 50px;
    font-size: 30px;
    color:#ffffff;
  }
  .register{
    padding-left: 27px;
    padding-top: 94px;
    font-size: 16px;
    color:#ffffff;
  }
  .body{
    box-sizing: border-box;
    border-radius: 5px;
    margin:38px 10px 20px 10px;
    background: #ffffff;
    .box{
      padding: 0px 20px;
    }
    .foodworker{
      float: left;
      color:#000000;
      display: block;
      font-size: 18px;
      font-weight: bold;
      padding: 29px 0px 29px 0px;
    }
    span:nth-child(2){
      position: absolute;
      top: 206px;
      left: 270px;
      color:#1DB567;
      display: block;
      font-size: 15px;
      font-weight: bold;
      padding: 29px 0px;
    }
    .iconfont{
      i{
      position: absolute;
      top: 206px;
      left: 330px;
      color:#1DB567;
      font-size: 12px;
      padding-top: 29px;
    }
    }
    .register1{
      background: #1DB65E;
      font-size: 16px;
      color:#ffffff;
      text-align: center;
      padding: 16px 0px;
      border-radius: 5px;
    }
    .login1{
      font-size: 16px;
      color:#1DB65E;
      text-align: center;
      padding: 16px 0px;
      border: 1px solid #1DB667;
      border-radius: 5px;
    }
    .foot{
      padding-bottom: 30px;
    }
    .form{
      .van-field{
        margin: 10px 0px !important;
        /deep/ .van-field__control--right {
          text-align: left !important;
        }
        /deep/ .van-field__error-message{
          display: none;
        }
        /deep/ .van-field__control{
          margin-left: 10px;
        }
      }
      .card{
        background-color:#F5F5F5 ;
      }
      .van-button{
        padding: 22px 130px 22px 145px;
        .van-button__content{
              width: 40px;
        }
          .van-button__text{
              font-size: 18px !important;
              text-align: center;
        }
      }
      p{
        font-size: 12px;
        color:#A5A5A5;
        padding: 20px 86px;
      }
      .login{
        background: #ffffff;
        margin-bottom: 20px;
        span{
          font-size: 18px;
          color:#1DB55D;
        }
      }
    }
  }
  .footer{
    height: 20px;
  }
  .popup{
    border-radius: 5px;
    width: 94%;
    p{
     text-align:center ;
     font-size: 18px;
     margin-top: 33px;
     margin-bottom: 42px;
     color:rgba(50,50,50,1);
    }
   div{
     font-size: 17px;
     border-radius: 5px;
     background: #F0F0F0;
     box-sizing: border-box;
     margin-bottom: 40px;
   }
   .food{
       float: left;
       margin-left: 40px;
       padding: 15px 24px;
      //  margin-right: 15px;
     }
     .chief{
       float: left;
       margin-left: 15px;
       padding: 15px 48px;
     }
  }
}
.active{
  border:1px solid #1DB65E;
  background: #E4FBEF !important;
  color:#1DB667;
}
</style>