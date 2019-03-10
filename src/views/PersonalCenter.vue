<template>
  <div>
    <Header></Header>
    <h3 v-if="this.$store.state.islogin == '0'" @click="toLogin">请先登录！点击此处可登录</h3>
    <el-container style="height: 100%;border: none" v-else>
      <ShopSide></ShopSide>
      <el-container style="border: none">
        <el-header style="text-align: right; font-size: 12px">
          <span>{{this.$store.state.nickName}}</span>
        </el-header>
        <el-main>
          <el-alert
            title="点击图片更新头像"
            type="success"
            center>
          </el-alert>
          <el-row :gutter="10">
            <el-col :xs="24" :md="6">
              ✨
            </el-col>
            <el-col :xs="24" :md="12">
              <input @change="uploadInputchange()"  id="uploadFileInput" type="file" accept="image/*" style="display: none">
              <img  :src="form.headPic"  style="width:6rem;height:6rem;border-radius: 50%;border: 2px solid #ddd;margin-left:8rem;margin-bottom:2rem;padding: 5px; background: #fff;" onclick="uploadFileInput.click()">
              <div v-if="changeResult">
                <el-form style="margin-left: 3rem" ref="form" :model="form" :rules="rules" label-width="80px">
                  <el-form-item label="昵称">
                    {{form.nickName}}
                  </el-form-item>
                  <el-form-item label="性别">
                    {{form.sex}}
                  </el-form-item>
                  <el-form-item label="电话号码" prop="telNum">
                    {{form.telNum}}
                  </el-form-item>
                  <el-form-item label="微信">
                    {{form.wechat}}
                  </el-form-item>
                  <el-form-item>
                    <p class="changeInfo" @click="changDetail">修改个人信息</p>
                  </el-form-item>
                </el-form>
              </div>
              <div v-else>
                <p class="changeInfo" @click="backDetail">返回个人信息</p>
                <el-form ref="form" :model="form" :rules="rules" label-width="80px">
                  <el-form-item label="昵称">
                    <el-input v-model="form.nickName" value="form.nickName" :disabled="true"></el-input>
                  </el-form-item>
                  <el-form-item label="性别">
                    <el-radio-group v-model="form.sex">
                      <el-radio label="男" ></el-radio>
                      <el-radio label="女" ></el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="电话号码" prop="telNum">
                    <el-input v-model="form.telNum"></el-input>
                  </el-form-item>
                  <el-form-item label="微信">
                    <el-input v-model="form.wechat"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="submitDetail()" plain>确认修改</el-button>
                  </el-form-item>
                </el-form>
              </div>
            </el-col>
          </el-row>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import ShopSide from '@/components/ShopSide'
import Header from '@/components/Header'
import qs from 'qs'
export default {
  name: 'PersonalCenter',
  components: {
    ShopSide,
    Header
  },
  data () {
    return {
      changeResult: true,
      form: {
        headPic: '',
        nickName: '',
        sex: '',
        telNum: '',
        wechat: '',
        passwd: ''
      },
      rules: {
        telNum: [{validator: (rule, value, callback) => {
          if (!value) {
            callback(new Error('手机号不能为空'))
          } else {
            const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
            console.log(reg.test(value))
            if (reg.test(value)) {
              callback()
            } else {
              callback(new Error('请输入正确的手机号'))
            }
          }
        },
        trigger: 'blur'}]
      }
    }
  },
  mounted () {
    let that = this
    that.axios
      .post(that.$store.state.globalUrl + '/api/user/get-by-uid?uid=' + that.$store.state.uid)
      .then(function (response) {
        that.form = response.data.data
      })
  },
  methods: {
    changDetail () {
      this.changeResult = false
    },
    backDetail () {
      this.changeResult = true
    },
    submitDetail () {
      let that = this
      console.log(that.form)
      that.axios
        .post(that.$store.state.globalUrl + '/api/user/update-by-uid', qs.stringify(that.form), {
          headers: {'accesstoken': that.$store.state.accesstoken}
        })
        .then(function (response) {
          console.log(response.data)
        })
      this.changeResult = true
    },
    // 更新头像
    Uploadpic (headPic) {
      let that = this
      console.log('uploadpic' + headPic)
      let obj = {
        headPic: headPic
      }
      that.axios
        .post(that.$store.state.globalUrl + '/api/user/update-by-uid', qs.stringify(obj), {
          headers: {'accesstoken': that.$store.state.accesstoken}
        })
        .then(function (response) {
          console.log(response.data)
        })
    },
    UploadComplete (val) {
      console.log(val)
    },
    getUploadName (file) {
      let date = new Date()
      let seperator1 = ''
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      let strDate = date.getDate()
      if (month >= 1 && month <= 9) {
        month = '0' + month
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate
      }
      let isdate = year + seperator1 + month + seperator1 + strDate
      let index1 = file.name.lastIndexOf('.')
      let index2 = file.name.length
      let post = file.name.substring(index1, index2)
      let name = this.$store.state.uid + isdate + file.size + Math.floor(Math.random() * 256) + post
      return name
    },
    uploadInputchange () {
      let file = document.getElementById('uploadFileInput').files[0] // 选择的图片文件
      this.uploadImgToQiniu(file)
      console.log('here is U IN change')
    },
    uploadImgToQiniu (file) {
      let that = this
      let filename = that.getUploadName(file)
      console.log('filename' + filename)
      this.axios
        .post(this.$store.state.globalUrl + '/qiniu/upload-with-pic-name?picName=' + filename, {picName: filename}, {
          headers: {'accesstoken': this.$store.state.accesstoken}
        })
        .then(function (response) {
          console.log('here' + response.data)
          that.uptoken = response.data
          const axiosInstance = that.axios.create({withCredentials: false})
          let data = new FormData()
          data.append('token', response.data)
          data.append('file', file)
          data.append('key', filename)
          axiosInstance({
            method: 'POST',
            url: 'http://up-z2.qiniup.com',
            data: data,
            timeout: 30000 // 超时时间，因为图片上传有可能需要很久
          }).then(data => {
            console.log(data)
            document.getElementById('uploadFileInput').value = '' // 上传成功，把input的value设置为空，不然 无法两次选择同一张图片
            that.form.headPic = 'https://pic.heartqiu.cn/' + filename
            that.Uploadpic(that.form.headPic)
          }).catch((err) => {
            console.log(err)
          })
        })
    },
    toLogin () {
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
  .changeInfo {
    color: #1b81ea;
    font-size:14px;
  }
  .smallTitle {
    font-weight: 800;
  }
  .el-header {
    background-color: #e0e8f3;
    color: #333;
    line-height: 60px;
  }
  .el-main{
    text-align: left;
  }
  .el-aside {
    color: #333;
  }
</style>
