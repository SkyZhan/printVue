<template>
  <div style="text-align: center;">
    <Header></Header>
    <div style="margin-top: 1rem;">
      <span>搜索</span>
      <el-select
        v-model="selectValue"
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
      <el-button slot="append" type="primary" plain icon="el-icon-search" @click="search"></el-button>
    </div>
    <el-alert
      title="选择标签即可搜索所需的店铺"
      type="success"
      center>
    </el-alert>
    <!--商店信息-->
    <div>
      <el-row :gutter="10">
        <el-col  :xs="24" :sm="6" :md="4" style="border: none;">
          ✨
        </el-col>
        <el-col :xs="24" :sm="6" :md="14" style="border: none;">
           <el-row :gutter="10" v-if="shopListShow.length > 0">
             <el-col :xs="24" :sm="6" :md="6"  v-for="item in shopListShow" :key="item.sid" style="padding-left: 0;
      padding-right: 0;margin-top:1rem">
               <router-link :to="{name: 'ShopDetail', params: {id: item.sid }}">
                 <img v-if="item.openUp === 1" src="../assets/shopStatus/open.jpg" class="pic_style"/>
                 <img v-else src="../assets/shopStatus/close.jpg" class="pic_style"/>
                 <el-main>{{item.name}}</el-main>
                 <el-footer>{{item.region}}楼{{item.roomNumber}}</el-footer>
                 <p style="margin-top: -2rem;color: black;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">{{item.tag}}</p>
               </router-link>
             </el-col>
           </el-row>
            <div style="color:#8a8888;margin-top:2rem" v-else>暂无符合店铺</div>
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
      selectValue: [],
      options: [],
      shopListShow: [],
      shopListSource: []
    }
  },
  computed: {
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
      })
    that.axios
      .get(that.$store.state.globalUrl + '/api/shop/index')
      .then(function (response) {
        that.shopListSource = response.data.data
        that.shopListShow = that.shopListSource
      })
  },
  methods: {
    search () {
      console.log('here')
      let shops = this.shopListSource
      let resultSet = new Set()
      let filterKeys = this.selectValue
      for (let i = 0; i < filterKeys.length; i++) {
        let key = filterKeys[i]
        for (let j = 0; j < shops.length; j++) {
          let shop = shops[j]
          if (shop.tag.indexOf(key) > -1) {
            resultSet.add(shop)
          }
        }
      }
      let resultList = []
      let shop = {}
      for (shop of resultSet) {
        resultList.push(shop)
      }
      console.log(resultList)
      this.shopListShow = resultList
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
