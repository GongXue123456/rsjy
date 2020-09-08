<template>
<div>
  <Nav title="忘记登录密码"/>
   <div class="body">
    <van-form @submit="onSubmit">
    <van-field v-model="form.user_loginname" ref="status" type="number" :rules="[{ required: true, message: '请输入手机号码' },{ pattern, message: '手机号码不正确' }]" label="手机号码" placeholder="请输入手机号码" />
    <hr />
     <van-field
      v-model="form.messcode"
      label="短信验证码"
      center
      clearable
      :rules="[{ required: true, message: '请输入短信验证码' }]"
      placeholder="请输入短信验证码"
      class="card" 
>
  <template #button>
    <van-button size="small" v-show="show" :disabled="disabled" type="primary" @click="mess">发送验证码</van-button>
    <van-button size="small" v-show="!show" :disabled="flag" type="primary" @click="mess">剩余{{count}}s</van-button>
  </template>
    </van-field>
    <van-field v-model="form.user_loginpass" type="password" :rules="[{ required: true, message: '请输入新登录密码' },{ validator, message: '密码错误，密码长度4-15位数字或字母组成' }]" label="新登录密码" placeholder="新登录密码、长度4-15位数字或字母组成" />
    <hr />
    <van-field v-model="form.login_pass_sure" type="password" :rules="[{ required: true, message: '请确认新密码' },{ validator, message: '密码错误，密码长度4-15位数字或字母组成' }]" label="确认新密码" placeholder="确认新密码、长度4-15位数字或字母组成" />
    <hr />
     <div class="sureChange">
      <van-button color="#ffffff">确认修改</van-button>
    </div>
    </van-form>
  </div>
</div>
</template>
<script>
import Nav from "../../components/Nav";
import axios from "../../axios/index.js";
import md5 from "js-md5"

export default {
  components:{
    Nav
  },
  data(){
    return{
      pattern:/^1[13456789]\d{9}$/,
      show:true,
      disabled:false,
      flag:false,
      timer:null,
      mess_code:'',
      count:'',
      form: {
        user_loginname:'',
        messcode:'',
        user_loginpass:'',
        login_pass_sure:''
      },
    }
  },
  methods:{
     validator(val) {
      return /^[a-zA-Z0-9]{4,15}$/.test(val);
    },
     onSubmit(){
    if(this.form.messcode==this.mess_code){
      if(this.form.user_loginpass==this.form.login_pass_sure){
        console.log(123)
        this.form.user_loginpass=md5(this.form.user_loginpass)
        this.form.login_pass_sure=md5(this.form.login_pass_sure)
        axios.put('app/user/password/forget',this.form).then((v)=>{
          console.log(v)
        })
      }else{
      this.$toast("两次密码输入不一致")
      }
    }else{
      this.$toast("验证码输入不正确")
    }
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
            axios.get('app/user/mess',{user_loginname:this.form.user_loginname,messtype:531064}).then((v)=>{
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
.body{
  margin-top: 55px;
  hr{
    margin: 0px 0px 0px 15px;
    border-top: none;
  }
  // /deep/ .van-field__error-message{
  //         display: none;
  //       }
  .sureChange{
    .van-button{
  margin: 200px 15px 0px 15px;
  padding: 0px 143px;
  .van-button__content{
   color:red;
  }
  }
  }
}
</style>