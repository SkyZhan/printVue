<template>
  <div>
    <Header></Header>
    <h3 v-if="this.$store.state.islogin == '0'" @click="toLogin">请先登录！点击此处可登录</h3>
    <el-container style="height: 100%;border: 1px solid #eee;" v-else>
      <ShopSide></ShopSide>
      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <span>{{this.$store.state.nickName}}</span>
        </el-header>
        <el-main>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import ShopSide from '@/components/ShopSide'
import Header from '@/components/Header'
export default {
  name: 'PersonalCenter',
  components: {
    ShopSide,
    Header
  }
}

</script>

<style scoped>
  .changeInfo {
    color: #1b81ea;
    font-size:16px;
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
