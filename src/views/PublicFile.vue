<template>
  <div style="text-align: center;">
    <Header></Header>
    <el-button type="text"  @click="isDialogFormVisible">上传公共文件</el-button>
    <el-row :gutter="10">
      <el-col :xs="24" :md="6">
        ✨
      </el-col>
      <el-col :xs="24" :md="14">
        <el-alert
          title="点击上传文件即可上传共享文件，点击文件名字即可下载所需文件"
          type="success"
          center>
        </el-alert>
        <el-table
          ref="filterTable"
          :data="filesArray"
          style="width: 100%">
          <el-table-column
            label="日期"
            width="180"
            prop="date"
            :filters="dateArray"
            :filter-method="filterTag"
            filter-placement="bottom-end">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.date }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="文件"
            width="350">
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
              <span style="margin-left: 10px">{{ scope.row.nickName }}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
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
      filesArray: [],
      dateArray: []
    }
  },
  mounted () {
    let that = this
    that.axios
      .post(that.$store.state.globalUrl + '/api/file/get', {}, {
        headers: {'accesstoken': this.$store.state.accesstoken}
      })
      .then(function (response) {
        console.log(response.data.data)
        let objArray = response.data.data
        for (let i = 0; i < objArray.length; i++) {
          let fileArray = []
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
          let file = {}
          file.fid = objArray[i].fid
          file.nickName = objArray[i].nickName
          file.files = fileArray
          file.date = objArray[i].uploadTime
          that.filesArray.push(file)
          // 日期排序 ，筛选日期 ，过滤器
          let date = {}
          date.value = objArray[i].uploadTime
          date.text = objArray[i].uploadTime
          that.dateArray.push(date)
        }
      })
  },
  methods: {
    open (fileUrl) {
      window.open(fileUrl)
    },
    filterTag (value, row) {
      console.log(row)
      return row.date === value
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
            let list = {}
            list.name = file.name
            list.url = 'https://pic.heartqiu.cn/' + filename
            that.fileList.push(list)
            let obj = {}
            obj.name = file.name
            obj.url = 'https://pic.heartqiu.cn/' + filename
            obj.nickName = that.$store.state.nickName
            let theDate = new Date()
            let month = theDate.getMonth() + 1
            obj.date = theDate.getFullYear() + '-' + month + '-' + theDate.getDate()
            obj.files = that.fileList
            that.filesArray.push(obj)
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
