<template>
<div class="contain">
  <el-row :gutter="10">
    <el-col  :xs="24" :sm="6" :md="3" style="border: none;">
      ✨
    </el-col>
    <el-col :xs="24" :sm="6" :md="4"  v-for="item in shopList.slice(0,3)" :key="item.sid" style="padding-left: 0;
    padding-right: 0;">
      <router-link :to="{name: 'ShopDetail', params: {id: item.sid }}">
        <img v-if="item.openUp == '1'" src="../assets/shopStatus/open.jpg" class="pic_style"/>
        <img v-else src="../assets/shopStatus/close.jpg" class="pic_style"/>
        <el-main>{{item.name}}</el-main>
        <el-footer>{{item.region}}楼{{item.roomNumber}}</el-footer>
      </router-link>
    </el-col>
  </el-row>
</div>
</template>

<script>
import Header from '@/components/Header'
export default {
  name: 'ShopList',
  components: {
    Header
  },
  data () {
    return {
      shopList: []
    }
  },
  mounted () {
    this.axios
      .get(this.$store.state.globalUrl + '/api/shop/index')
      .then(response => (
        // console.log(response.data.data)
        this.shopList = response.data.data
      ))
  }
}
</script>

<style scoped>
  .el-col {
    border-radius: 4px;
    border: 1px solid #dad2d2;
    margin-right: 7%;
  }

  .el-main {
    font-size: 20px;
    font-weight: 800;
    color: #333;
    text-align: center;
    line-height: 20px;
  }
  .el-footer {
    font-size: 18px;
    color: #333;
    text-align: center;
    line-height: 20px;
  }
  .pic_style {
    width:100%;
    height: 8rem;
  }
</style>
