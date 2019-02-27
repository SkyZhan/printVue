<template>
  <el-row :gutter="10" >
    <h1>校园打印平台</h1>
    <el-col :xs="24" :md="7" >⭐</el-col>
    <el-col :xs="24" :md="10" >
      <el-main>
      <el-form ref="form" :rules="regRules" :model="regForm" >
        <el-form-item label="用户名" prop="account">
          <el-input v-model="regForm.account" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="regForm.password" placeholder="请输入密码" type="password"></el-input>
        </el-form-item>
        <el-form-item label="重复密码" prop="repeat">
          <el-input v-model="regForm.repeat" placeholder="请输入密码" type="password" @keyup.enter.native="reg"></el-input>
        </el-form-item>
        <el-form-item>
          <span @click="toLogin">想要登陆？点击此处</span>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" round @click="reg" class="btnwidth">注册</el-button>
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
      regForm: {
        account: '',
        password: '',
        repeat: ''
      },
      regRules: {
        account: [{required: true, message: '用户名不能为空', trigger: 'blur'},
          {min: 2, max: 12, message: '长度在2到12个字符之间', trigger: 'blur'}],
        password: [{required: true, message: '密码不能为空', trigger: 'blur'},
          {min: 2, max: 16, message: '长度在6到16个字符之间', trigger: 'blur'}],
        repeat: [{required: true, message: '确认密码要一致', trigger: 'blur'},
          {validator: (rule, value, callback) => {
            if (value === '') {
              callback(new Error('please entrance'))
            } else if (value !== this.regForm.password) {
              callback(new Error('两次密码输入不一致'))
            } else {
              callback()
            }
          },
          trigger: 'blur'
          }]
      }
    }
  },
  methods: {
    reg () {
      let that = this
      let account = that.regForm.account
      let password = that.regForm.password
      if (account === '' || password === '') {
        alert('账号或密码不能为空') // 'http://118.89.52.224:8999/api/user/register'
      } else {
        console.log(account + password)
        that.axios
          .post(that.$store.state.globalUrl + '/api/user/register?nickName=' + account + '&passwd=' + password)
          .then(function (response) {
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
            that.$store.commit('login', {openId: openId, uid: uid, openShop: openShop, cookie: cookie, accesstoken: accesstoken})
            that.$router.push('/home')
          })
          .catch(function (error) {
            console.log(error)
          })
      }
    },
    toLogin () {
      this.$router.push('/')
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
