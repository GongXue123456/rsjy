<template>
  <div>
    
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'Login',
  data () {
    return {
      phoneNumber: '13216698987',
      password: '123456',
      code: '',
      loginWay: 'password',
      passwordType: 'password',
      phoneNumberError: ''
    }
  },
  methods: {
    sendVerifyCode () {
      this.phoneNumberError = ''
      if (!this.phoneNumber) { // 根据需求做判断
        this.phoneNumberError = '手机号码必填'
      }
    },
    switchPasswordType () {
      this.passwordType = this.passwordType === 'password' ? 'text' : 'password'
    },
    switchLoginWay () {
      this.password = this.code = ''
      this.loginWay = this.loginWay === 'password' ? 'verifyCode' : 'password'
    },
    handleLogin () {
      const data = {
        phoneNumber: this.phoneNumber,
        password: this.password,
        $router: this.$router,
        $route: this.$route
      }
      this.login(data)
    },
    ...mapActions({
      login: 'user/login'
    })
  },
  computed: {
    loginWayObj: function () {
      if (this.loginWay === 'password') {
        return {
          icon: 'closed-eye',
          toggleMsg: '验证码登录'
        }
      }
      return {
        icon: 'eye',
        toggleMsg: '密码登录'
      }
    },
    passwordIcon: function () {
      return this.passwordType === 'password' ? 'closed-eye' : 'eye'
    }
  },
}
</script>
<style lang="scss" scoped>
  .header{
    width: 100%;
    height: 165px;
    display: flex;
    justify-content: center;
    align-items: center;
    .logo{
      width: 60px;
      height: 60px;
      border-radius: 50%;
      overflow: hidden;
      img{
        width: 100%;
      }
    }
  }
  .content{
    width: 100%;
    height: auto;
    padding: 0 15px;
    box-sizing: border-box;
    .button-wrap{
      width: 100%;
      height: auto;
      margin-top: 15px;
    }
  }
  .more-wrap{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 15px;
    font-size: 14px;
    a.link{
      color: #1989fa;
    }
    .switch-way{
      color: #333;
    }
  }

</style>
