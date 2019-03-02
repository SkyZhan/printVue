<template>
  <div style="text-align: center;">
    <Header></Header>
    <div style="margin-top: 1rem;">
      <span>搜索</span>
      <el-select
        v-model="selectvalue"
        multiple
        filterable
        allow-create
        default-first-option
        placeholder="请选择标签"
        width="10rem">
        <el-option
          v-for="(item, index) in options"
          :key="index"
          :label="item"
          :value="item">
        </el-option>
      </el-select>
      <el-button type="primary" @click="search">搜索</el-button>
    </div>
    <!--商店信息-->
    <div>
      <el-row :gutter="10">
        <el-col  :xs="24" :sm="6" :md="3" style="border: none;">
          ✨
        </el-col>
        <el-col :xs="24" :sm="6" :md="4"  v-for="item in shopList.slice(0,3)" :key="item.sid" style="padding-left: 0;
    padding-right: 0;margin-top:1rem">
          <router-link :to="{name: 'ShopDetail', params: {id: item.sid }}">
            <img v-if="item.openUp == '1'" src="../assets/shopStatus/open.jpg" class="pic_style"/>
            <img v-else src="../assets/shopStatus/close.jpg" class="pic_style"/>
            <el-main>{{item.name}}</el-main>
            <el-footer>{{item.region}}楼{{item.roomNumber}}</el-footer>
          </router-link>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header'
export default {
  components: {
    Header
  },
  data () {
    return {
      selectvalue: [],
      options: [],
      shopList: []
    }
  },
  mounted () {
    let that = this
    that.axios
      .post(that.$store.state.globalUrl + '/api/tag/get')
      .then(function (response) {
        let tagType = response.data.data
        for (let i = 0; i < tagType.length; i++) {
          that.options.push(tagType[i].tagName)
        }
        that.options.push('东区')
        that.options.push('西区')
      })
    that.axios
      .get(that.$store.state.globalUrl + '/api/shop/index')
      .then(response => (
        // console.log(response.data.data)
        that.shopList = response.data.data
      ))
  },
  methods: {
    search () {
      console.log(this.selectvalue)
    }
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
    height: 10rem;
  }
</style>
