<template>
  <div>
    <Header></Header>
  <div class="container">
    <el-row :gutter="10">
      <el-col :xs="24" :md="4">⭐</el-col>
      <el-col :xs="24" :md="8">
        <img v-if="list.openUp === '1'" src="../assets/shopStatus/open.jpg" class="pictype" alt="img"/>
        <img v-else src="../assets/shopStatus/open.jpg" class="pictype" alt="img"/>
      </el-col>
      <el-col :xs="24" :md="6">
        <h3>{{list.name}}</h3>
        <h4>地点：{{list.region}}楼{{list.roomNumber}}</h4>
        <p><span>功能：</span>{{list.tag}}</p>
        <p><span>联系：</span>{{userInfo}}</p>
        <p><span>说明：</span>{{list.content}}</p>
        <el-button type="primary"  @click="makeOrder" class="btnwidth" plain>下单</el-button>
      </el-col>
    </el-row>
  </div>
  </div>
</template>

<script>
import Header from '@/components/Header'
export default {
  name: 'ShopDetail',
  components: {
    Header
  },
  data: function () {
    return {
      list: [],
      id: this.$route.query.id,
      userInfo: ''
    }
  },
  mounted () {
    let newID = this.id
    let that = this
    console.log(newID)
    that.axios
      .post('http://118.89.52.224:8999/api/shop/get-by-id?sid=' + newID)
      .then(function (response) {
        that.list = response.data.data
        console.log(response.data.data)
      })
    that.axios
      .post('http://118.89.52.224:8999/api/user/get-by-uid?uid=' + newID)
      .then(response => (
        that.userInfo = response.data.data.wechat
      ))
  },
  methods: {
    makeOrder () {
      console.log(this.list.sid)
      this.route.push('/')
    }
  }
}
</script>

<style scoped>
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  .pictype{
    border: 1px solid #E9EEF3;
  }
  .container{
    margin-top: 20px;
    text-align: left;
  }
  .btnwidth{
    margin-top: 20px;
    width:100%;
  }
</style>
