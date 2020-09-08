<template>
  <div  class="login bgcfff">
    <img class="logo" src="../assets/images/login_logo.png">
    <div class="title">欢迎登录菜如意Mall！</div>
    <div v-if="type==='password'">
    <van-cell-group class>
      <van-field v-model="form.loginname"   clearable placeholder="请输入用户名(手机号)" ><img slot="left-icon" src="../assets/images/zhanghao.png" /></van-field>
      <van-field type="password" v-model="form.loginpass"  clearable  placeholder="请输入密码" ><img slot="left-icon" src="../assets/images/password.png" /></van-field>
    </van-cell-group>
    <div class="login-type mt15 tr">
      <div @click="changeType(2)">短信登录</div>
    </div>
    <div class="login_btn">
      <van-button @click="submit" type="info">登录</van-button>
    </div>
  </div>
  <div v-else-if="type==='text'" >
    <van-cell-group>
       <!-- <van-field class="hidden-input" v-model="form.loginname" clearable  placeholder="请输入手机号"></van-field> -->
      <van-field v-model="form.loginname" clearable  placeholder="请输入手机号"><img slot="left-icon" src="../assets/images/zhanghao.png" /></van-field>
       <van-field class="hidden-input" type="text" v-model="form.MESSCODE" clearable  placeholder="请输入短信验证码">
      </van-field>
      <van-field type="text" v-model="form.MESSCODE" clearable  placeholder="请输入短信验证码"><img slot="left-icon" src="../assets/images/yanzhengma.png" />
        <van-button
          slot="button"
          size="small"
          type="primary"
          class="text general_bgc general_border"
          @click="getText()"
        >{{this.text==null?countNum+'s后重新发送':this.text}}</van-button>
      </van-field>
    </van-cell-group>
    <div class="login-type mt15 tr">
      <div @click="changeType(1)">密码登录</div>
    </div>
    <div class="login_btn">
      <van-button @click="submit" type="info">登录</van-button>
    </div>
  </div>
  <div v-else-if="type==='replace'" >
    <van-row class="transparent" style="border-bottom: 1px solid #f5f5f5">
      <van-col span="3">
        <div style="height:50px;line-height: 55px;text-align: center;font-size: 16px">
          <div class="iconfont icon-arrowleft" @click="changeType(1)"></div>
        </div>
      </van-col>
      <van-col span="21">
        <van-search class="search_all" v-model="value" show-action placeholder="请输入搜索手机号">
          <div slot="action" @click="onSearch">搜索</div>
        </van-search>
      </van-col>
    </van-row>
     <van-contact-card v-if="customer"
  type="edit"
  :name="customer.c_name"
  :tel="customer.c_loginname"
  @click="helplogin()"
  
/>
  </div>
  </div>
</template>
<script>
import { login, loginGenerateMessCode, searchCustomer,getOpenId,helpLogin } from "../api";
import { local } from "../until/data";
import md5 from 'js-md5';
export default {
  data() {
    return {
      phone: "",
      form: {
        loginname: "",
        loginpass: "",
        MESSCODE:""
      },
      loginpass:'',
      img1:'../assets/images/zhanghao.png',
      type: "password",
      sms: "",
      value: "",
      text: "获取验证码",
      countNum: 60,
      countFlag: false,
      intervalBtn: {},
      //默认按钮的值
      btnMsg: "点击发送验证码",
      //手机号码
      mobile: "",
      customer:'',
      openid:'',
    };
  },
  mounted() {
    this.openid=this.$route.query.openid;
    // this.$route.query.openid;
    // 'ovlGAw3bo297LvGwpQQyyQ03RjSY';
     local.set("openid", this.openid);
    // var data={
    //   local:'http://mall.cairuyi.com.cn/wxlogin/callBack/'
    // }
    if(this.$route.query.id==0){
      this.type='replace'
    }
    if(this.$cookies.get("loginname")!=null){
      this.form.loginname=this.$cookies.get("loginname")
    }
    if(this.$cookies.get("loginpass")!=null){
      this.form.loginpass=this.$cookies.get("loginpass")
    }
  },
  methods: {
    changeType(id) {
      if (id == 1) {
        this.type = "password";
        this.form.MESSCODE='';
      } else if (id == 2) {
        this.form.loginpass='';
        this.type = "text";
        
      }
    },
    getText() {
      let data = {
        loginname: this.form.loginname
      };
      if (!/^1(3|4|5|7|8)\d{9}$/.test(this.form.loginname)) {
        this.$toast("请输入正确的手机号！");
        return;
      }
       loginGenerateMessCode(data).then(response => {
        console.log(response.data)
      });
      this.countDown();
    },
    submit() {
      // this.form.loginpass=md5(this.form.loginpass)
      let  data1={
        loginname:this.form.loginname,
        loginpass:md5(this.form.loginpass),
        MESSCODE:this.form.MESSCODE
      }
      login(data1).then(v => {
        if (v.code == 499) {
          this.$toast(v.msg);
        } else if (v.code == 488) {
           this.$toast("登录成功");
          local.set("userinfo", v.data);
          this.$cookies.set("token", v.data.token);
          this.$cookies.set("loginname", this.form.loginname,60 * 60 * 24*30);
          this.$cookies.set("loginpass", this.form.loginpass,60 * 60 * 24*30);
          this.$router.push({ path: "/" });
        }
      });
    },
    onSearch() {
      let data = {
        c_loginname: this.value
      };
      searchCustomer(data).then(response => {
        console.log(response.data);
        this.customer=response.data[0]
      });
    },
    countDown() {
      this.text = null;
      this.countFlag = !this.countFlag;
      this.intervalBtn = setInterval(() => {
        if (this.countNum <= 0) {
          this.text = "点击发送验证码";
          clearInterval(this.intervalBtn);
          this.countFlag = !this.countFlag;
          this.countNum = 60;
        }
        this.countNum--;
      }, 1000);
    },
    helplogin(){
       let data = {
        loginname: this.value,
        helpcode:local.get('userinfo').c_id
      };
      helpLogin(data).then(response => {
         if (response.code == 499) {
          this.$toast(response.msg);
        } else if (response.code == 488) {
          local.set("userinfo", response.data);
           this.$cookies.set("token", response.data.token);
            this.$toast("登录成功");
          this.$router.push({ path: "/" });
          
        }
      });
    }
  },
};
</script>
<style lang="scss">
.login {
  /* background: url('../assets/images/login_bg.png') no-repeat;
  background-size: 100%;
  position: absolute;
  top:0;
  bottom:0; */
  width: 100%;
  height: 100vh;
  padding: 0 20px;
  padding-top: 40px;
  .logo{width: 50px;height: 50px;}
  .title{color: #333333;font-weight: bold;font-family:PingFang SC;font-size:25px;padding: 20px 0px; }
  .login_btn {
    padding-top: 15px;
    .van-button--info {
      width: 100%;
    }
  }
  input:-webkit-autofill {
    box-shadow: 0 0 0px 1000px white inset;
  }
  .van-field__left-icon img{width: 21px;height: 21px;vertical-align: sub;margin-right: 10px;}
  .van-cell {
    padding: 13px 15px;
    font-size: 15px;
    line-height: 30px;
    border: 1px solid #d6d6d6;
  }
  .van-cell:first-child {
    border-bottom: none;
    border-radius: 4px 4px 0px 0px;
  }
  .van-cell:last-child {
    border-radius: 0px 0px 4px 4px;
  }
  .van-button {
    height: 50px;
    line-height: 50px;
  }
  .van-button.text {
    height: 30px;
    line-height: 30px;
  }
  .van-button--info {
    border: none;
    background: -webkit-gradient(linear, 0% 25%, 75% 100%, from(#15A4FF), to(#20CAE3));
    /* from(#C71919), to(#EF4C32) */
    border-radius: 4px;
  }
  .login-type {
    font-size: 14px;
    color: #333;
  }
  .hidden-input{
  position: relative;
  width: 0;
  height: 0;
  overflow: hidden;
  display: none
}
}
.search_all {
  padding: 10px 16px 10px 0px;
  .van-search__content{
    background-color: transparent;padding-left:0px;
    .van-cell{border-bottom:1px solid #d6d6d6;border-radius:4px}
  }
}
</style>

