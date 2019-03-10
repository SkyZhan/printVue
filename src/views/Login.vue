<template>
  <el-row :gutter="10">
    <h1>校园打印平台</h1>
    <el-col :xs="24" :md="7" >💗</el-col>
    <el-col :xs="24" :md="10" >
      <el-main>
      <el-form ref="form" :rules="loginRules" :model="loginForm" >
        <el-form-item label="账号" prop="account">
          <el-input v-model="loginForm.account" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginForm.password" placeholder="请输入密码" type="password" @keyup.enter.native="login"></el-input>
        </el-form-item>
        <el-form-item>
          <span @click="toReg">还未注册？点击此处</span>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" round @click="login" class="btnwidth">登陆</el-button>
        </el-form-item>
      </el-form>
      </el-main>
    </el-col>
  </el-row>
</template>

<script>

export default {
  data () {
    return {
      loginForm: {
        account: '',
        password: ''
      },
      loginRules: {
        account: [{required: true, message: '账号不能为空', trigger: 'blur'}],
        password: [{required: true, message: '密码不能为空', trigger: 'blur'}]
      }
    }
  },
  methods: {
    login () {
      let that = this
      let account = this.loginForm.account
      let password = this.loginForm.password
      if (account === '' || password === '') {
        alert('账号或密码不能为空')
      } else {
        console.log(account + password)
        this.axios
          .post(that.$store.state.globalUrl + '/api/user/login?account=' + account + '&passwd=' + password)
          .then(function (response) {
            if (response.data.code === 200) {
              let openId = response.data.data.openId
              let uid = response.data.data.uid
              let openShop = response.data.data.openShop
              let accesstoken = uid + '-' + openId
              // 设置cookie
              let exdate = new Date()
              exdate.setTime(exdate.getTime() + (365 * 24 * 60 * 1000))
              let expires = 'expires=' + exdate.toUTCString()
              let cookie = 'uid=' + uid + '; ' + expires
              document.cookie = cookie
              document.cookie = 'session=' + openId + '; ' + expires
              console.log(cookie)
              that.$store.commit('login', {
                openId: openId,
                uid: uid,
                nickName: account,
                openShop: openShop,
                cookie: cookie,
                accesstoken: accesstoken,
                islogin: '1'
              })
              if (response.data.data.admin) {
                that.$router.push('/admin/admindefault')
              } else {
                that.$router.push('/')
              }
            }
            if (response.data.code === 10003) {
              that.$message.error(response.data.desc)
            }
          })
          .catch(function (error) {
            console.log(error)
          })
      }
    },
    toReg () {
      this.$router.push('/Register')
    }
  }
}

</script>

<style scoped>
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
    border-radius: 5px;
  }
  .btnwidth{
    width:70%;
  }
</style>
