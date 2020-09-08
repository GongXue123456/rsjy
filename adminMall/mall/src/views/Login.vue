<template>
  <div class="login">
    <div class="title">
      <h2>
        欢迎登陆食安商城管理系统
      </h2>
    </div>
    <div class="login-contain">
      <el-form  :rules="rules" ref="ruleForm" :model="form" label-width="80px">
        <el-form-item label="账号"  prop="u_loginname">
          <el-input v-model="form.u_loginname"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="u_loginpass">
          <el-input type="password" v-model="form.u_loginpass"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')" :loading="loading">登陆</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { local } from '../util/util'
export default {
  name: 'home',
  components: {},
  data () {
    return {
      form: {
        u_loginname: '',
        u_loginpass: ''
      },
      rules: {
        u_loginname: [
          { required: true, message: '请输入账户名', trigger: 'blur' }
        ],
        u_loginpass: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      },
      loading: false
    }
  },
  methods: {
    submitForm (ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          this.loading = true
          axios.post('/pcsyslogin/login', this.form).then((v) => {
            if (v.data.code === '488') {
              this.loading = false
              this.$notify.success({
                title: '请求成功',
                message: v.data.msg,
                duration: 4500
              })
              local.set('userinfo', v.data.data)
              local.set('token', v.data.data.token)
              this.$router.push({ name: 'admin-shop' })
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
<style lang="scss">
.login{
  .login-contain{
    width: 500px;
    margin: 0 auto;
  }
  .title{
    text-align: center;
    padding-top: 100px;
  }
}

</style>
