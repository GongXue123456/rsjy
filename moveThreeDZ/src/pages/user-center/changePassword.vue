<template>
<div>
  <Nav title="修改密码"/>
  <div class="body">
    <van-form  @submit="onSubmit">
    <van-field v-model="password" type="password" :rules="[{ required: true, message: '请输入原登录密码' },{ pattern, message: '原登录密码不正确' }]" label="原登录密码" placeholder="原登录密码、长度4-15位数字或字母组成" />
    <hr />
    <van-field v-model="password1" type="password" :rules="[{ required: true, message: '请输入新登录密码' },{ pattern, message: '新登录密码不正确' }]" label="新登录密码" placeholder="新登录密码、长度4-15位数字或字母组成" />
    <hr />
    <van-field v-model="password2" type="password" :rules="[{ required: true, message: '请确认新密码' },{ pattern, message: '新密码不正确' }]" label="确认新密码" placeholder="确认新密码、长度4-15位数字或字母组成" />
    <!-- <div class="sureChange">
      <van-button color="#ffffff">确认修改</van-button>
    </div> -->
     <van-row gutter="20"  class="p15 footer">
          <van-col span="24"><van-button class="next" round block type="primary" native-type="submit"> 确认修改</van-button></van-col>
         </van-row>
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
      password:'',
      password1:'',
      password2:'',
      form:{
        user_loginpass:''
      },
      formList:{
        user_loginpass:'',
        user_code:''
      },
      pattern:/^[a-zA-Z0-9]{4,15}$/,
    }
  },
  mounted(){
    this.getUser()
  },
  methods:{
    getUser(){
      axios.get('app/user/single').then((v)=>{
      console.log(v.data)
      this.formList.user_code=v.data.user_code
      this.form.user_loginpass=v.data.user_loginpass
    })
    },
     onSubmit(){
     if(md5(this.password)==this.form.user_loginpass){
       if(md5(this.password)==md5(this.password1)){
         this.$toast('旧密码与新密码一致，请重新输入')
       }else{
         if(md5(this.password1)===md5(this.password2)){
         this.formList.user_loginpass=md5(this.password2)
         axios.put('/app/user/updatePass',this.formList).then((res)=>{
           console.log(res)
         })
       }else{
       this.$toast('两次密码输入不一致')
       }
       }
     }else{
       this.$toast('原始登录密码不正确')
     }
     }
  }
}
</script>
<style scoped lang="less">
.body{
  margin-top: 55px;
  hr{
    margin: 0px 0px 0px 15px;
    border-top: none;
  }
  /deep/ .van-cell{font-size:16px;
  .van-field__label{width: 3.5rem;}}
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
.footer{
  span{font-size: 18px};
}
</style>