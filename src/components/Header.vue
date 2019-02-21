<template>
  <div >
    <h1>校园打印平台</h1>
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
        {name: '/Home', navItem: '首页'},
        {name: '/ShopList', navItem: '我的搜索'},
        {name: '/publishProject', navItem: '我的订单'},
        {name: '/personalCenter', navItem: '个人中心'}
      ]
    }
  }
}
</script>

<style scoped>

</style>
