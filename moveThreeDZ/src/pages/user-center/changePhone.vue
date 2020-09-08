<template>
<div>
  <Nav title="修改手机号"/>
  <div class="body">
    <van-form  @submit="onSubmit">
    <van-field v-model="tel" type="tel"  label="新手机号"  :rules="[{ pattern, message: '请输入正确手机号码' }]" placeholder="请输入手机号"/>
    <hr />
    <van-field
      v-model="sms"
      center
      clearable
      :rules="[{ required: true, message: '请输入短信验证码' }]"
      label="短信验证码"
      placeholder="请输入短信验证码" 
      type="number"
>
  <template #button>
    <van-button size="small" v-show="show" type="primary" @click="mess">发送验证码</van-button>
    <van-button size="small" v-show="!show" :disabled="flag" type="primary" @click="mess">剩余{{count}}s</van-button>
  </template>
    </van-field>
   <van-row gutter="20"  class="p15  w footer">
          <van-col span="24"><van-button class="next" round block type="primary" native-type="submit"> 确认修改</van-button></van-col>
         </van-row>
  </van-form>
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
    return{
      tel:'',
      sms:'',
      pattern:/^1[13456789]\d{9}$/,
      messcode:'',
      user_loginname:'',
      form:{},
      timer:null,
      show:true,
      count:'',
      flag:false,
    }
  },
  mounted(){
    this.getUser()
  },
  methods:{
     getUser(){
      axios.get('app/user/single').then((v)=>{
      this.form=v.data
      this.user_loginname=v.data.user_loginname
    })
    },
    mess(){
      const TIME_COUNT = 60;
          if (!this.timer) {
          this.count = TIME_COUNT;
          this.show = false;
          this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
          this.flag=true
          this.count--;
          if(this.count==59){
             if(this.tel!== this.user_loginname){
            axios.get('app/user/exist',{user_loginname:this.tel}).then((v)=>{
          if(v.code===200){
            axios.get('app/user/mess',{user_loginname:this.tel}).then((v)=>{
              this.messcode=v.data.messcode
            })
          }
        })
      }else{
        this.$toast('请输入新的手机号码')
      }
          }
      } else {
          this.show = true;
          clearInterval(this.timer);
          this.timer = null;
        }
    }, 1000)
 }
    },
    onSubmit(){
      if(this.sms==this.messcode){
        axios.put('app/user/updateDetails',{user_loginname:this.tel}).then((v)=>{
          console.log(v.data)
        })
      }else{
        this.$toast('验证码输入不正确')
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