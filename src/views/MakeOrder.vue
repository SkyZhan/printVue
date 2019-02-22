<template>
<div>
  <div>
    <Header>
    </Header>
  </div>
  <input @change="uploadInputchange"  id="uploadFileInput" type="file" accept="image/*">
  <h3>{{shopName}}</h3>
  <el-row :gutter="10">
    <el-col :xs="24" :md="8">
      <el-form :label-position="labelPosition" label-width="80px" :model="form">
        <el-form-item label="收货人">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="是否自提" >
          <label v-for="(item, index) in deliveryType" v-bind:key="index"><input :label="item" type="radio" :value="item" :key="index" @click="CouldDelivery" v-model="delivery" >{{item}}   </label>
        </el-form-item>
        <el-form-item label="送货地址" v-if="isDelivery">
          <el-input v-model="form.region"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" v-if="isDelivery">
          <el-input v-model="form.phoneNumber"></el-input>
        </el-form-item>
        <el-form-item label="打印要求">
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
      shopName: this.$route.query.shopName,
      picker: '',
      uptoken: '',
      filename: '',
      form: {
        name: '',
        delivery: '',
        phoneNumber: '',
        region: '',
        requirement: ''
      },
      doMain: 'pic.heartqiu.cn/'
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
      console.log(this.delivery)
      console.log('submit!')
    },
    CouldDelivery (event) {
      console.log('取到的值是' + event.target.value)
      this.isDelivery = event.target.value !== '自提'
    },
    uploadInputchange () {
      let file = document.getElementById('uploadFileInput').files[0] // 选择的图片文件
      console.log(file)
      this.uploadImgToQiniu(file)
    },
    uploadImgToQiniu (file) {
      let that = this
      this.axios
        .get(this.$store.state.globalUrl + '/qiniu/upload-with-no-pic-name', {}, {
          headers: {'accesstoken': this.$store.state.accesstoken}
        })
        .then(function (response) {
          console.log('here')
          that.uptoken = response.data
          const axiosInstance = that.axios.create({withCredentials: false})
          let data = new FormData()
          data.append('token', response.data)
          data.append('file', file)
          axiosInstance({
            method: 'POST',
            url: 'http://up-z2.qiniup.com',
            data: data,
            timeout: 30000 // 超时时间，因为图片上传有可能需要很久
          }).then(data => {
            console.log(data)
            document.getElementById('uploadFileInput').value = '' // 上传成功，把input的value设置为空，不然 无法两次选择同一张图片
            // 上传成功...  (登录七牛账号，找到七牛给你的 URL地址) 和 data里面的key 拼接成图片下载地址
          }).catch((err) => {
            console.log(err)
          })
        })
    }
  }
}
</script>

<style scoped>

</style>
