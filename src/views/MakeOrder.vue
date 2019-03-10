<template>
<div>
  <div>
    <Header>
    </Header>
  </div>
  <el-row :gutter="10">
    <el-col :xs="24" :md="8">
      ✨
    </el-col>
    <el-col :xs="24" :md="8">
      <div style="text-align: left;padding-left: 1rem">
        <h4>位置：下单页面</h4>
        <h4>打印店：{{this.$route.params.shopName}}</h4>
      </div>
      <el-form :label-position="labelPosition" :rules="rules" label-width="80px" :model="form">
        <el-form-item label="收货人" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="是否自提">
          <label v-for="(item, index) in deliveryType" v-bind:key="index"><input :label="item" type="radio" :value="item" :key="index" @click="CouldDelivery" v-model="delivery" >{{item}}   </label>
        </el-form-item>
        <el-form-item label="送货地址" v-if="isDelivery">
          <el-input v-model="form.region"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" v-if="isDelivery" prop="phoneNumber">
          <el-input v-model="form.phoneNumber"></el-input>
        </el-form-item>
        <el-form-item label="打印文件">
          <input @change="uploadInputchange"  id="uploadFileInput" type="file" accept="*">
          <p>图片及文件（docx,pdf etc.）最多上传3个文件！</p>
          <ul class="upload-list">
            <li  v-for="(file, index) in fileList" class="upload-list-li" :key="index">
              <a class="upload-list-li-name"><i class="fa fa-file-text-o" aria-hidden="true"></i>{{file.name}}</a>
              <label class="upload-list-li-label" @click="deleFile(index, file.name)"><i class="el-icon-close"></i></label>
            </li>
          </ul>
        </el-form-item>
        <el-form-item label="打印要求" prop="requirement">
          <el-input type="textarea" v-model="form.requirement"></el-input>
        </el-form-item>
        <el-form-item size="large">
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</div>
</template>

<script>
import Header from '@/components/Header'
import qs from 'qs'
export default {
  components: {
    Header
  },
  data () {
    return {
      postData: '',
      isDelivery: true,
      delivery: '',
      deliveryType: ['自提', '送货上门'],
      labelPosition: 'right',
      shopId: this.$route.params.shopId,
      picker: '',
      uptoken: '',
      fileList: [],
      form: {
        name: '',
        phoneNumber: '',
        region: '',
        requirement: ''
      },
      rules: {
        name: [{required: true, message: '用户名不能为空', trigger: 'blur'}],
        phoneNumber: [{validator: (rule, value, callback) => {
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
        trigger: 'blur'}],
        requirement: [{required: true, message: '打印要求不可以为空', trigger: 'blur'}]
      }
    }
  },
  mounted () {
  },
  methods: {
    UploadComplete (val) {
      console.log(val)
    },
    filePercent (val) {
      let that = this
      this.axios
        .post(this.$store.state.globalUrl + '/api/tag/create?tagName=', {}, {
          headers: {'accesstoken': this.$store.state.accesstoken}
        })
        .then(function (response) {
          that.uptoken = response.data
        })
      console.log(val)
    },
    onSubmit () {
      let that = this
      let fileName = ''
      let fileUrl = ''
      for (let i = 0; i < that.fileList.length; i++) {
        fileName = fileName + that.fileList[i].name + ' '
        fileUrl = fileUrl + that.fileList[i].url + ' '
      }
      let thetag = that.delivery + ' ' + that.form.name + ' ' + that.form.phoneNumber + ' ' + that.form.region
      let obj = {
        sid: that.$route.params.shopId,
        fileName: fileName,
        fileUrl: fileUrl,
        requirement: that.form.requirement,
        tag: thetag,
        status: '0'
      }
      that.axios
        .post(that.$store.state.globalUrl + '/api/order/create', qs.stringify(obj),
          {headers: {'accesstoken': that.$store.state.accesstoken}}
        )
        .then(function (response) {
          console.log(response.data)
          this.$message({
            showClose: true,
            message: '订单上传成功',
            type: 'success'
          })
          that.$router.push('/MyOrder')
        })
      console.log('submit!' + thetag + fileUrl)
    },
    CouldDelivery (event) {
      console.log('取到的值是' + event.target.value)
      this.isDelivery = event.target.value !== '自提'
    },
    deleFile (i, name) {
      this.$confirm(`确定移除${this.fileList[i].name}？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.fileList.splice(i, 1)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
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
      if (this.fileList.length >= 3) {
        alert('最多上传3个文件！')
      } else {
        let file = document.getElementById('uploadFileInput').files[0] // 选择的图片文件
        this.uploadImgToQiniu(file)
      }
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
            let list = []
            list.name = file.name
            list.url = 'https://pic.heartqiu.cn/' + filename
            console.log(list)
            that.fileList.push(list)
          }).catch((err) => {
            console.log(err)
          })
        })
    }
  }
}
</script>

<style scoped>
  .upload-list{margin:0;padding:0;list-style:none;}
  .upload-list-li{position: relative;margin-top:5px;line-height: 1.8}
  .upload-list-li:hover{background-color: #f5f7fa;}
  .upload-list-li-name{position:relative;margin-right: 40px;display: block;}
  .fa-file-text-o{margin-right:7px;}
  .upload-list-li-label{position:absolute;right:5px;top:0;}
</style>
