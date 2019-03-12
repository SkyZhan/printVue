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
          :data="shopArray"
          border
          style="width: 100%">
          <el-table-column
            fixed
            prop="sid"
            label="店铺编号"
            width="100">
          </el-table-column>
          <el-table-column
            prop="name"
            label="店铺名字"
            width="120">
          </el-table-column>
          <el-table-column
            prop="region"
            label="区域"
            width="80">
          </el-table-column>
          <el-table-column
            prop="roomNumber"
            label="房号"
            width="80">
          </el-table-column>
          <el-table-column
            prop="tag"
            label="标签"
            width="250">
          </el-table-column>
          <el-table-column
            prop="content"
            label="内容"
            width="300">
          </el-table-column>
          <el-table-column
            prop="openUp"
            label="开店状态"
            width="100">
          </el-table-column>
          <!--<el-table-column-->
            <!--fixed="right"-->
            <!--label="操作"-->
            <!--width="100">-->
            <!--<template slot-scope="scope">-->
              <!--<el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>-->
              <!--<el-button type="text" size="small">编辑</el-button>-->
            <!--</template>-->
          <!--</el-table-column>-->
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
      shopArray: []
    }
  },
  mounted () {
    let that = this
    that.axios
      .get(that.$store.state.globalUrl + '/api/shop/index')
      .then(function (response) {
        // console.log(response.data.data)
        that.shopArray = response.data.data
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
