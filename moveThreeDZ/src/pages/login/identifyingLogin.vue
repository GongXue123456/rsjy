<template>
  <div>
    <Nav title="验证码登录" />
    <div class="header">
    <h3>Hi,欢迎登录</h3>
    <span class="register">欢迎使用食安数智云平台</span>
    <div class="body">
      <div class="box">
      <div class="top"></div>
      <van-form  @submit="onSubmit" class="form" @failed="onFailed">
        <van-field  left-icon="iconfont-shoujihao" type="number" v-model="form.user_loginname" placeholder="请输入手机号" ref="status"  :rules="[{ required: true, message: '请输入手机号' },{pattern,message:'请输入正确的手机号码'}]" class="card">
          <van-icon class="iconfont iconfont-shoujihao" class-prefix="iconfont" slot="left-icon" name="iconfont-shoujihao"></van-icon>
        </van-field>
       <van-field
      v-model="form.messcode"
      center
      clearable
      left-icon="iconfont-yanzhengma"
      :rules="[{ required: true, message: '请输入短信验证码' }]"
      placeholder="请输入短信验证码"
      class="card" 
>
    <van-icon class="iconfont iconfont-yanzhengma" class-prefix="iconfont" slot="left-icon" name="iconfont-yanzhengma"></van-icon>
  <template #button>
    <van-button size="small" v-show="show" :disabled="disabled" type="primary" @click="mess">发送验证码</van-button>
    <van-button size="small" v-show="!show" :disabled="flag" type="primary" @click="mess">剩余{{count}}s</van-button>
  </template>
    </van-field>
        <span class="forget" @click="forgetPassword">忘记登录密码？</span>
        <span class="identifying" @click="identifying">密码登录</span>
        <van-icon class="iconfont icon-iconuser" class-prefix="icon" slot="left-icon" name="iconuser"></van-icon>
        <van-button size="small"  type="primary" class="toLogin">登录</van-button>
        <p>若没有帐号，您可以选择</p>
        <!-- <van-button size="small"  type="primary" class="login">注册</van-button> -->
        <div class="login1">注册</div>
        <div class="foot"></div>
      </van-form>
      </div>
     
    </div>
      <div class="footer"></div>
  </div>
  
  </div>
</template>
<script>
import Nav from "../../components/Nav";
import axios from "../../axios/index.js";

export default {
  components:{
    Nav
  },
  data(){
    return {
      show:true,
      disabled:false,
      flag:false,
      timer:null,
      count:'',
      mess_code:'',
      pattern:/^1[13456789]\d{9}$/,
      form: {
        user_loginname:'',
        login_type:'2',
        messcode:'',
      },
    }
  },
  methods:{
    onSubmit(){
      console.log(this.form.messcode)
       if(this.mess_code==this.form.messcode){
                  axios.post('app/login',this.form).then((v)=>{
                    console.log(v.data)
                    this.$router.push({
                      path:'/home'
                    })
                  })
                }else{
                  this.$toast("验证码输入错误")
                }
    },
    onFailed(errorInfo) {
      this.$toast(errorInfo.errors[0].message)
      },
    identifying(){
      this.$router.push({
        path:'/PasswordLogin'
      })
    },
     forgetPassword(){
      this.$router.push({
        path:'/ForgetPassword'
      })
    },
     mess(){
      if(this.$refs.status.value!==""){
       const TIME_COUNT = 60;
          if (!this.timer) {
          this.count = TIME_COUNT;
          this.show = false;
          this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
          this.flag=true
          this.count--;
          if(this.count==59){
            axios.get('app/user/mess',{user_loginname:this.form.user_loginname,messtype:531530}).then((v)=>{
              this.mess_code=v.data.mess_code
           })
          }
      } else {
          this.show = true;
          clearInterval(this.timer);
          this.timer = null;
        }
    }, 1000)
      }
      }else{
        this.$toast("请输入手机号码")
      }
     }
  },
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
    /deep/ .box{
      padding: 0px 20px;
      .forget{
        font-size: 16px;
        color:#A6A6A6;
        margin-right: 137px;
      }
      .identifying{
        font-size: 16px;
        color:#1DB65E;
      }
       .register1{
      background: #1DB65E;
      font-size: 16px;
      color:#ffffff;
      text-align: center;
      margin-top: 30px;
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
    }
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
        .van-button{
          border: none;
          background: transparent;
          color:#1DB65E;
          font-size: 16px;
        }
      }
      .toLogin{
        padding: 22px 130px 22px 145px;
        margin-top: 20px;
        box-sizing: border-box;
        .van-button__content{
          width: 40px;
          .van-button__text{
         font-size: 18px !important;
       }
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
    .footer{
    height: 20px;
  }
  .top{
    padding-bottom: 10px;
  }
}
</style>