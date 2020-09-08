<template>
  <div class="login">
     
      <div class="contain">
          <img class="mb10" src="../assets/image/menu-title.png" />
        <div class="login-contain mt20" ref="Purple">
      <el-form v-if="show_div=='1'" autocomplete="off" class="contain_right tl"   label-position="top" label-width="80px" :rules="rules" ref="ruleForm" :model="form">
        <div class="title cac fb">
       Hi，欢迎登录
      </div>
        <div  class=" cac child">欢迎使用小作坊数智云平台平台</div>
        <el-form-item  class="cac "  label="" prop="user_loginname" :rules="[{type: 'number',message: '请输入手机号',trigger: 'blur'},{pattern: /^1[3|4|5|7|8|9][0-9]\d{8}$/,message: '手机号格式不对',trigger: 'blur'}]">
          <el-input id="aaa" placeholder="请输入手机号" clearable v-model.number="form.user_loginname"></el-input>
        </el-form-item>
        <el-form-item label="" prop="user_loginpass" :rules="[{required: true,message: '请输入密码', trigger: 'blur' },{ pattern: /^[A-Za-z0-9]+$/, message: '请输入密码,长度4-15位数字或字母组成',trigger: 'blur'},{ min: 4, max: 15, message: '请输入密码,长度4-15位数字或字母组成',trigger: 'blur'}]">
          <el-input type="password" placeholder="请输入密码"  clearable v-model="form.user_loginpass"></el-input>
        </el-form-item>
        <el-form-item class="mt15">
          <el-button round style="width:100%" type="primary" @click="submitForm('ruleForm')" :loading="loading">登录</el-button>
          <p class="tr fr disib forget_btn" @click="show_div='2'" style="cursor:pointer;">忘记密码</p>
        </el-form-item>
      </el-form>
       <el-form v-else-if="show_div=='2'" autocomplete="off" class="contain_right tl"   label-position="top" label-width="80px" :rules="rules" ref="twoForm" :model="twoForm">
        <div class="title fb cac mb30">
       <i class="el-icon-arrow-left " @click="show_div='1'" style="cursor:pointer;"></i> 找回密码
      </div>
        <el-form-item  class="cac "  label="" prop="user_loginname" :rules="[{type: 'number',message: '请输入手机号',trigger: 'blur'},{pattern: /^1[3|4|5|7|8|9][0-9]\d{8}$/,message: '手机号格式不对',trigger: 'blur'}]">
          <el-input id="aaa"  placeholder="请输入手机号" clearable v-model.number="twoForm.user_loginname">
             <!-- <el-button  slot="append" type="primary" @click="takeNum">获取验证码</el-button> -->
             <el-button icon="el-icon-mobile-phone" @click="takeNum('twoForm')" slot="append" type="primary" :disabled="disabled=!show" >  
                <span v-show="show">获取验证码</span>
                <span v-show="!show" class="count">{{count}} s</span>
            </el-button>
          </el-input>
        </el-form-item>
        <el-form-item label="" prop="messcode" v-validate="'required'" :rules="[{required: true,message: '请输入验证码',trigger: ['blur','change']}]">
          <el-input placeholder="请输入验证码"   clearable v-model="twoForm.messcode"></el-input>
        </el-form-item>
        <el-form-item class="mt15">
          <el-button round style="width:100%" type="primary" @click="changePass('twoForm')" :loading="loading">下一步</el-button>
        </el-form-item>
      </el-form>
        <el-form v-else-if="show_div=='3'" autocomplete="off" class="contain_right tl"   label-position="top" label-width="80px" :rules="rules" ref="threeForm" :model="threeForm">
        <div class="title cac fb mb30">
       <i class="el-icon-arrow-left" @click="show_div='2'" style="cursor:pointer;"></i> 找回密码
      </div>
        <el-form-item label="" prop="upuser_loginpass" :rules="[{required: true,message: '请输入密码', trigger: 'blur' },{ pattern: /^[A-Za-z0-9]+$/, message: '请输入密码,长度4-15位数字或字母组成',trigger: 'blur'},{ min: 4, max: 15, message: '请输入密码,长度4-15位数字或字母组成',trigger: 'blur'}]">
          <el-input type="password" placeholder="请输入新密码" autocomplete="off" clearable v-model="threeForm.upuser_loginpass"></el-input>
        </el-form-item>
         <el-form-item label="" prop="checkPass" :rules="[{required: true,message: '请输入密码', trigger: 'blur' },{ pattern: /^[A-Za-z0-9]+$/, message: '请输入密码,长度4-15位数字或字母组成',trigger: 'blur'},{ min: 4, max: 15, message: '请输入密码,长度4-15位数字或字母组成',trigger: 'blur'}]">
          <el-input type="password" placeholder="确认新密码"  autocomplete="off" clearable v-model="threeForm.checkPass"></el-input>
        </el-form-item>
        <el-form-item class="mt15">
          <el-button round style="width:100%" type="primary" @click="upPass('threeForm')">确定</el-button>
        </el-form-item>
      </el-form>
   </div>
      </div>
  </div>
</template>

<script>
import Vue from 'vue'
import md5 from 'js-md5';
import axios from 'axios'
import { local } from '../util/util'
export default {
  name: 'login',
  data () {
    var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.threeForm.checkPass !== '') {
            this.$refs.threeForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.threeForm.upuser_loginpass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
    return {
      show_div:'1',
      clientWidth:'',
      clientHeight:'',
      form: {
        user_loginname: '',
        user_loginpass: ''
      },
      twoForm: {
        user_loginname: '',
        messcode: ''
      },
      threeForm: {
        upuser_loginpass: '',
        messcode: ''
      },
      rules: {
        user_loginname: [
          { required: true, message: '请输入账户名', trigger: 'blur' }
        ],
        user_loginpass: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        upuser_loginpass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      },
      loading: false,
      show: true,
      count: '',
      timer: null,
      messcodetemp: '',
    }
  },
  mounted(){
      this.clientWidth = `${document.documentElement.clientWidth}`;
                       this.$refs.Purple.style.width = this.clientWidth*(1080/1920)+ "px";
                     this.$refs.Purple.style.height = this.clientWidth*(1080/1920)*(540/1080)+ "px";
                    // this.$refs.Purple.style.width = this.clientWidth*(700/1200)+ "px";
                    //  this.$refs.Purple.style.height = this.clientWidth*(700/1200)*(700/1200)+ "px";
  },
  created() {
    let that = this;
    document.onkeydown =function(e){
      e = window.event || e;
      if(that.$route.path=='/login'&&(e.code=='Enter'||e.code=='enter')){//验证在登录界面和按得键是回车键enter
        // that.submitForm('loginForm');//登录函数
        if(that.show_div=='1'){
           that.submitForm('ruleForm')
        }else if(that.show_div=='2'){
           that.changePass('twoForm')
        }else if(that.show_div=='3'){
           that.upPass('threeForm')
        }
        
      }
    }
  },
  methods: {
    takeNum(twoForm){
      let new_user_loginname=this.twoForm.user_loginname+"";
      let myThis=this;
      this.twoForm.messcode=' ';
      this.$refs[twoForm].validate((valid) => {
        this.twoForm.messcode='';
        if (valid) {
          axios.get('/api/user/exist?user_loginname='+new_user_loginname).then((v) => {
          if(v.data.code === 456){
            this.messget(myThis,new_user_loginname);
          }else{
            this.$message.error("该用户不存在");
          }  
        }).catch()
        } else {
          return false
        }
      })
    },
    messget(myThis,loginname){      
      axios.get('/api/mess?user_loginname='+loginname+'&messtype=531064').then((v) => {   
        myThis.send(v.data.data);               
      }).catch()
    },
    send(messcode){
      this.messcodetemp = messcode;
      let TIME_COUNT = 60;
      if (!this.timer) {
          this.count = TIME_COUNT;
          this.show = false;
          this.timer = setInterval(() => {
            if (this.count > 0 && this.count <= TIME_COUNT) {
              this.count--;
            } else {
              this.show = true;
              clearInterval(this.timer);
              this.timer = null;
            }
          }, 1000)
        }
    },
    changePass(twoForm){     
      this.$refs[twoForm].validate((valid) => {
        if (valid) {
          if(this.twoForm.user_loginname==undefined||this.twoForm.user_loginname.length<1 ||this.twoForm.messcode==undefined||this.twoForm.messcode.length<1||this.messcodetemp!==this.twoForm.messcode){
        this.$message.error("验证码不正确");
        return false;
      }
      this.threeForm.user_loginname = this.twoForm.user_loginname; 
      this.threeForm.messcode = this.twoForm.messcode;
      this.show_div = 3;
        }})
      
    },
    upPass(threeForm){
      this.$refs[threeForm].validate((valid) => {
        if (valid) {
          axios.post('/api/user/upname', {messcode:this.threeForm.messcode,user_loginname:this.threeForm.user_loginname,user_loginpass:md5(this.threeForm.upuser_loginpass)}).then((v) => {
            this.show_div = 1;
            this.$message({
              message: '修改密码成功',
              type: 'success'
            });
          })          
        } else {
          return false
        }
      })
    },
    submitForm (ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          this.loading = true
          axios.post('/api/login', {user_loginname:this.form.user_loginname,user_loginpass:md5(this.form.user_loginpass)}).then((v) => {
            if (v.data.code === 200) {
              this.loading = false
              this.$notify.success({
                title: '请求成功',
                message: v.data.msg,
                duration: 4500
              })
                local.set('userloginname', this.form.user_loginname)
                 local.set('userloginpass', md5(this.form.user_loginpass))
              local.set('manage_type', v.data.data.manage_type)
                local.set('usercode', v.data.data.user_code)
              local.set('token', v.data.data.Token)
              local.set('user_level', v.data.data.user_level)
              local.set('user', v.data.data)
              local.set('upuser', v.data.data)
              this.$router.push({ name: 'entry' })
            } else {
              this.$notify.error({
                title: '请求错误',
                message: v.data.msg,
                duration: 4500
              })
              this.loading = false
            }
          }).catch(v => {
            this.loading = false
            this.$notify.error({
              title: '网络异常',
              duration: 4500
            })
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss" >
.login{
    height: 100vh;
        display: flex;
    align-items: center;
   background: url('../assets/image/login.png') no-repeat 0px 0px;
 background-size: cover;
 .contain{margin: auto;img{width: 50%;}}
  .child{letter-spacing: 1px;}
  .login-contain{
    background: url('../assets/image/login_bg.png') no-repeat 0px 0px;
 background-size: contain;
    margin: 0 auto;
    .contain_right{width: 38%;padding-top: 7%;margin: auto;height: 98%;float:right;margin-right: 5%;}
    .el-form--label-top .el-form-item__label{padding-bottom: 0px;color: #36ACFF;}
    .el-form-item.is-error .el-input__inner, .el-form-item.is-error .el-input__inner:focus, .el-form-item.is-error .el-textarea__inner, .el-form-item.is-error .el-textarea__inner:focus,input::-webkit-input-placeholder,.title{
      color: #36ACFF;
    }
  }
  input.el-input__inner {
    color: #7F7F7F;
        border-radius: 20px;
    border: 1px solid #fff;
    background-color: rgba(21,64,195,0.06);
}
/deep/ .el-input-group--append {
  .el-input__inner{ border-radius: 20px 0px 0px 20px;}
}
 .el-button.is-round{background-color:#36ACFF;border: 1px solid #36ACFF;border-radius: 4px;border-radius: 20px;}
.el-input-group__append{background-color:#36ACFF;border: 1px solid #36ACFF;color: #fff;border-radius: 0px 20px 20px 0px;}

input:-internal-autofill-previewed,
input:-internal-autofill-selected {
  color: #36ACFF;
    -webkit-text-fill-color: #36ACFF;
    transition: background-color 5000s ease-out 0.5s;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
}
input[type="number"]{
    -moz-appearance: textfield;
}

.forget_btn{ color: #36ACFF;}
}

@media screen and (min-width: 1401px) {
  .el-form-item__content{height: 80%;}
    .el-input,.el-input input,.el-button.is-round{height: 100%;}
    .el-form-item__error{font-size: 14px !important;}
    .el-form-item{height: 16%;margin-bottom: 2%}
     .title{font-size: 1.8rem;height: 10%;line-height: 1.8;}
     .child{font-size: 1.2rem;margin: 5% 0 10% 0;}
       input::-webkit-input-placeholder,input.el-input__inner{font-size: 1rem;}
}
@media screen and (max-width: 1400px) {
.child{font-size: 0.9rem;margin: 5% 0 10% 0;}
     .title{font-size: 22px;}
}
</style>
