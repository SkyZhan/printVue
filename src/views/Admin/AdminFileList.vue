<template>
  <el-container style=" border: 1px solid #eee;height: 45rem">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu :default-active="$route.path">
        <el-submenu index="3">
          <template slot="title"><i class="el-icon-setting"></i>导航</template>
          <el-menu-item-group>
            <el-menu-item index="AdminDefault" @click="toAdminDefault">首页</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="信息">
            <el-menu-item index="AdminFileList" @click="toAdminFileList">文件列表</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="店铺">
            <el-menu-item index="AdminShopList" @click="toAdminShopList">店铺列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <span>{{this.$store.state.nickName}}</span>
      </el-header>

      <el-main>
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
              <span style="margin-left: 10px">{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row.fid)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'AdminDefault',
  data () {
    return {
      AdminDefault: '/Admin/AdminDefault',
      AdminFileList: '/Admin/AdminFileList',
      AdminShopList: '/Admin/AdminShopList',
      shopNum: '',
      orderNum: '12',
      fileNum: '',
      formLabelWidth: '120px',
      fileList: [],
      filesArray: [],
      dateArray: []
    }
  },
  mounted () {
    let that = this
    that.axios
      .post(that.$store.state.globalUrl + '/api/file/get')
      .then(function (response) {
        console.log(response.data.data)
        let objArray = response.data.data
        for (let i = 0; i < objArray.length; i++) {
          let fileArray = []
          let fileNameList = (objArray[i].fileName || '').split(' ') // split use in vue
          let fileUrlList = (objArray[i].fileUrl || '').split(' ') // split use in vue
          for (let j = 0; j < fileNameList.length - 1; j++) {
            let obj = {}
            obj.name = fileNameList[j]
            obj.url = fileUrlList[j]
            fileArray.push(obj)
          }
          let file = {}
          file.fid = objArray[i].fid
          file.name = objArray[i].nickName
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
    that.axios
      .post(that.$store.state.globalUrl + '/api/file/get')
      .then(function (response) {
        let array = response.data.data
        that.fileNum = array.length
      })
  },
  methods: {
    open (fileUrl) {
      window.open(fileUrl)
    },
    // 文件删除 管理
    handleDelete (index, row) {
      let that = this
      that.$confirm('此操作将永久删除该标签，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        that.axios
          .post(that.$store.state.globalUrl + '/api/file/delete?fid=' + row, {}, {
            headers: {'accesstoken': this.$store.state.accesstoken}
          })
          .then(function (response) {
            that.$message({
              type: 'success',
              message: '删除成功'
            })
          })
        that.filesArray.splice(index)
      }).catch(() => {
        that.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    filterTag (value, row) {
      console.log(row)
      return row.date === value
    },
    toAdminDefault () {
      this.$router.push('/Admin/AdminDefault')
    },
    toAdminFileList () {
      this.$router.push('/Admin/AdminFileList')
    },
    toAdminShopList () {
      this.$router.push('/Admin/AdminShopList')
    }
  }
}
</script>

<style scoped>
  .el-header {
    background-color: #0e90d2;
    color: #fff;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
  }
  .el-col {
    border-radius: 4px;
    border: 1px solid #dad2d2;
    padding-top: 10px;
  }
  .el-footer {
    font-size: 18px;
    color: #0e90d2;
    text-align: center;
    height: 1rem;
  }
  .pic_style {
    width:50%;
    height: 5rem;
  }
</style>
