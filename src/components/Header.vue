<template>
  <div >
    <h1 style="  margin-top: 20px;">校园打印平台</h1>
    <el-menu :default-active="$route.path" router class="el-menu-demo " mode="horizontal" >
      <el-menu-item v-for="(item,i) in navList " :key ="i" :index="item.name">
        {{ item.navItem }}
      </el-menu-item>
    </el-menu>
  </div>

</template>

<script>
export default {
  data () {
    return {
      navList: [
        {name: '/', navItem: '首页'},
        {name: '/MySearch', navItem: '我的搜索'},
        {name: '/MyOrder', navItem: '我的订单'},
        {name: '/PersonalCenter', navItem: '个人中心'},
        {name: '/PublicFile', navItem: '文件广场'}
      ]
    }
  }
}
</script>

<style scoped>

</style>
