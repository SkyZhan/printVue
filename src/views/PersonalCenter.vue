<template>
  <div>
    <Header></Header>
    <el-container style="height: 100%;border: 1px solid #eee;">
      <ShopSide></ShopSide>
      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <span>{{form.nickName}}</span>
        </el-header>
        <el-main>
          <img  v-bind:src="form.headPic"  style="width: 150px;border-radius: 50%">
          <div v-if="changeResult">
            <p><span class="smallTitle">昵称：</span>{{form.nickName}}</p>
            <p><span class="smallTitle">性别：</span>{{form.sex}}</p>
            <p><span class="smallTitle">电话号码：</span>{{form.telNum}}</p>
            <p><span class="smallTitle">微信号：</span>{{form.wechat}}</p>
            <p class="changeInfo" @click="changDetail">修改个人信息</p>
          </div>
          <div v-else>
            <el-form ref="form" :model="form" label-width="80px">
              <el-form-item label="昵称">
                <el-input v-model="form.nickName" value="form.nickName"></el-input>
              </el-form-item>
              <el-form-item label="性别">
                <el-radio-group v-model="form.sex">
                  <el-radio label="男" ></el-radio>
                  <el-radio label="女" ></el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="电话号码">
                <el-input v-model="form.telNum"></el-input>
              </el-form-item>
              <el-form-item label="微信">
                <el-input v-model="form.wechat"></el-input>
              </el-form-item>
            </el-form>
            <el-button type="primary" @click="submitDetail" plain>确认修改</el-button>
          </div>
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
  },
  data () {
    return {
      changeResult: true,
      form: {
        headPic: '',
        nickName: '',
        sex: '',
        telNum: '',
        wechat: ''
      }
    }
  },
  mounted () {
    let that = this
    that.axios
      .post(that.$store.state.globalUrl + '/api/user/get-by-uid?uid=' + that.$store.state.uid)
      .then(function (response) {
        that.form = response.data.data
      })
  },
  methods: {
    changDetail () {
      this.changeResult = false
    },
    submitDetail () {
      this.changeResult = true
    }
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
    border:1px solid #B3C0D1;
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
