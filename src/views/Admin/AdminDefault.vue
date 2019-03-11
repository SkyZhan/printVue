<template>
  <el-container style=" border: 1px solid #eee;height:45rem">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu :default-active="$route.path">
        <el-submenu index="3">
          <template slot="title"><i class="el-icon-setting"></i>导航</template>
          <el-menu-item-group>
            <el-menu-item index="AdminDefault" @click="toAdminDefault">标签页</el-menu-item>
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
          :data="tagArray"
          border
          style="width: 100%">
          <el-table-column
            fixed
            prop="tid"
            label="编号"
            width="100">
          </el-table-column>
          <el-table-column
            prop="tagName"
            label="标签名称"
            width="120">
          </el-table-column>
          <el-table-column
            prop="userName"
            label="上传用户"
            width="80">
          </el-table-column>
          <el-table-column
            prop="uid"
            label="用户id"
            width="80">
          </el-table-column>
          <el-table-column
            prop="createDate"
            label="上传日期"
            width="150">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <!--<el-button-->
                <!--size="mini"-->
                <!--@click="handleEdit(scope.$index, scope.row)">编辑</el-button>-->
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
      tagArray: []
    }
  },
  mounted () {
    let that = this
    that.axios
      .post(that.$store.state.globalUrl + '/api/tag/get')
      .then(function (response) {
        console.log(response.data.data)
        let tagTmp = response.data.data
        for (let i = 0; i < tagTmp.length; i++) {
          let obj = {}
          obj = tagTmp[i]
          let date = new Date()
          date.setTime(tagTmp[i].createDate)
          obj.createDate = date.getFullYear() + '-' + date.getMonth() + '1' + '-' + date.getDate()
          that.tagArray.push(obj)
        }
      })
  },
  methods: {
    toAdminDefault () {
      this.$router.push('/Admin/AdminDefault')
    },
    toAdminFileList () {
      this.$router.push('/Admin/AdminFileList')
    },
    toAdminShopList () {
      this.$router.push('/Admin/AdminShopList')
    },
    handleEdit (index, row) {
      console.log(index, row)
    },
    handleDelete (index, row) {
      let that = this
      that.$confirm('此操作将永久删除该标签，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        that.axios
          .post(that.$store.state.globalUrl + '/api/tag/delete?tid=' + row.tid, {}, {
            headers: {'accesstoken': this.$store.state.accesstoken}
          })
          .then(function (response) {
            that.$message({
              type: 'success',
              message: '删除成功'
            })
          })
        that.tagArray.splice(index)
      }).catch(() => {
        that.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
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
