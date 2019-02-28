<template>
  <div>
    <Header></Header>
    <el-row :gutter="10">
        <el-col :span="22" :offset="1">
        <el-button type="text"  @click="isDialogFormVisible">上传公共文件</el-button>
        </el-col>
    </el-row>
    <el-table
      :data="filesArray"
      style="width: 100%">
      <el-table-column
        label="日期"
        width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="文件"
        width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px" v-for="(item, index) in scope.row.files" :key="index">
            <a  target="_blank" @click="open(item.url)">{{item.name}}</a>
          </span>
        </template>
      </el-table-column>
      <el-table-column
        label="贡献者"
        width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
    </el-table>
    <!--<el-row :gutter="10">-->
      <!--<el-col :span="22" :offset="1">-->
        <!--<el-button type="text"  @click="isDialogFormVisible">上传公共文件</el-button>-->
      <!--</el-col>-->
      <!--<div v-for="(item, index) in filesArray" :key="index">-->
        <!--<el-col :span="22" :offset="1">-->
          <!--<div class="grid-content bg-purple" style="border: 1px solid #dcdfe6;text-align: left;">-->
            <!--<span style="padding: 0.5rem;font-size: 1.2rem;">{{item.name}}</span>-->
          <!--</div>-->
        <!--</el-col>-->
        <!--<el-col :span="22" :offset="1" style="margin-bottom: 1rem">-->
          <!--<div class="grid-content bg-purple" style="border: 1px solid #dcdfe6;text-align: left;">-->
            <!--<el-form>-->
              <!--<el-form-item label="文件">-->
                <!--<span v-for="(file, index) in item.files" :key="index"><a :href=" file.url">{{ file.name }}</a></span>-->
              <!--</el-form-item>-->
              <!--<el-form-item label="上传日期">-->
                <!--<label>2018-8-7</label>-->
              <!--</el-form-item>-->
            <!--</el-form>-->
          <!--</div>-->
        <!--</el-col>-->
      <!--</div>-->
  <!--</el-row>-->
    <!--上传公共文件弹窗-->
    <el-dialog title="文件广场" :visible.sync="dialogFormVisible">
      <el-form>
        <el-form-item label="上传文件">
          <input @change="uploadInputchange"  id="uploadFileInput" type="file" accept="*">
          <p>图片及文件（docx,pdf etc.）最多上传3个文件！</p>
          <ul class="upload-list">
            <li  v-for="(file, index) in fileList" class="upload-list-li" :key="index">
              <a class="upload-list-li-name"><i class="fa fa-file-text-o" aria-hidden="true"></i>{{file.name}}</a>
              <label class="upload-list-li-label" @click="deleFile(index, file.name)"><i class="el-icon-close"></i></label>
            </li>
          </ul>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Header from '@/components/Header'
import qs from 'qs'
export default {
  name: 'PublicFile',
  components: {
    Header
  },
  data () {
    return {
      dialogFormVisible: false,
      formLabelWidth: '120px',
      fileList: [],
      filesArray: []
    }
  },
  mounted () {
    let that = this
    that.axios
      .post(that.$store.state.globalUrl + '/api/file/get')
      .then(function (response) {
        console.log(response.data.data)
        let objArray = response.data.data
        let fileArray = []
        for (let i = 0; i < objArray.length; i++) {
          console.log(objArray[i])
          let fileNameList = (objArray[i].fileName || '').split(' ') // split use in vue
          let fileUrlList = (objArray[i].fileUrl || '').split(' ') // split use in vue
          for (let j = 0; j < fileNameList.length - 1; j++) {
            let obj = {}
            obj.name = fileNameList[j]
            obj.url = fileUrlList[j]
            fileArray.push(obj)
          }
          console.log(fileArray)
          let order = {}
          order.name = objArray[i].nickName
          order.files = fileArray
          order.date = objArray[i].uploadTime
          that.filesArray.push(order)
          fileArray = []
          order = {}
        }
      })
  },
  methods: {
    open (fileUrl) {
      window.open(fileUrl)
    },
    UploadComplete (val) {
      console.log(val)
    },
    isDialogFormVisible () {
      let that = this
      if (that.$store.state.islogin === '0') {
        this.$message({
          message: '登录后才可以上传文件哦，请先登录',
          type: 'warning'
        })
      } else {
        that.dialogFormVisible = true
      }
    },
    onSubmit () {
      let that = this
      that.dialogFormVisible = false
      let fileName = ''
      let fileUrl = ''
      for (let i = 0; i < that.fileList.length; i++) {
        fileName = fileName + that.fileList[i].name + ' '
        fileUrl = fileUrl + that.fileList[i].url + ' '
      }
      let obj = {
        fileName: fileName,
        fileUrl: fileUrl,
        isPublic: '1'
      }
      that.axios
        .post(that.$store.state.globalUrl + '/api/file/add', qs.stringify(obj),
          {headers: {'accesstoken': that.$store.state.accesstoken}}
        )
        .then(function (response) {
          console.log(response.data)
        })
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
        .get(this.$store.state.globalUrl + '/qiniu/upload-with-pic-name?picName=' + filename, {}, {
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

</style>
