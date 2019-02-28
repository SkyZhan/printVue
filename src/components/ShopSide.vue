<template>
  <el-aside width="9rem" style="background-color: rgb(238, 241, 246);    overflow-x: hidden;">
      <el-menu
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        :collapse="isCollapse">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">导航</span>
          </template>
          <el-menu-item-group>
            <el-menu-item :index="PersonalCenter" @click="toPersonalCenter" style="min-width:0px;">个人信息</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group v-if="this.$store.state.openShop ==  '0'">
            <template slot="title">申请成为商家</template>
            <el-menu-item :index="ApplyShop" @click="toApplyShop" style="min-width:0px;">申请商家</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="我的商铺" v-else>
            <el-menu-item index="MyShop" @click="toMyShop" style="min-width:0px;">店铺信息</el-menu-item>
            <el-menu-item index="MyShopOrder" @click="toMyShopOrder" style="min-width:0px;">店铺订单</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
  </el-aside>
</template>

<script>
export default {
  name: 'ShopSide',
  data () {
    return {
      ApplyShop: '/ApplyShop',
      PersonalCenter: '/PersonalCenter',
      MyShop: '/MyShop',
      MyShopOrder: '/MyShopOrder',
      isCollapse: false
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    toApplyShop () {
      this.$router.push('/ApplyShop')
    },
    toPersonalCenter () {
      this.$router.push('/PersonalCenter')
    },
    toMyShop () {
      this.$router.push('/MyShop')
    },
    toMyShopOrder () {
      this.$router.push('/MyShopOrder')
    }

  }
}
</script>

<style scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 9rem;
    min-height: 10rem;
    overflow-x: hidden;
  }
</style>
