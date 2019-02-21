<template>
  <div>
    <Header></Header>
    <el-container style="height: 100%;border: 1px solid #eee;">
      <ShopSide></ShopSide>
      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <span>王小虎</span>
        </el-header>
        <el-main >
          <img v-if="list.openUp == '1' " src="../assets/shopStatus/open.jpg" alt="点击关闭店铺" @click="isOpen('1')"/>
          <img v-else  src="../assets/shopStatus/close.jpg" alt="点击关闭店铺" @click="isOpen('0')"/>
          <div v-if="changeType">
            <h3>{{list.name}}</h3>
            <h4>地点：{{list.region}}楼{{list.roomNumber}}</h4>
            <p><span>功能：</span>{{list.tag}}</p>
            <p><span>备注：</span>{{list.content}}</p>
            <span @click="ChangeInfo" class="changeM">修改信息</span>
          </div>
          <div v-else>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="店铺名称" prop="name">
                <el-input v-model="ruleForm.name" value="list.name"></el-input>
              </el-form-item>
              <el-form-item label="区域位置" prop="region">
                <el-input v-model="ruleForm.region" placeholder="如：东23"></el-input>
              </el-form-item>
              <el-form-item label="楼栋房号" prop="roomNumber">
                <el-input v-model="ruleForm.roomNumber" placeholder="如：212"></el-input>
              </el-form-item>
              <el-form-item label="服务选项" prop="type">
                <el-checkbox-group v-model="ruleForm.type">
                  <el-checkbox label="彩印" name="type"></el-checkbox>
                  <el-checkbox label="黑白" name="type"></el-checkbox>
                  <el-checkbox label="胶状" name="type"></el-checkbox>
                  <el-checkbox label="普通订" name="type"></el-checkbox>
                  <el-checkbox label="封皮" name="type"></el-checkbox>
                  <el-checkbox label="相片打印" name="type"></el-checkbox>
                  <el-checkbox label="海报打印" name="type"></el-checkbox>
                  <el-checkbox label="送货上门" name="type"></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item label="其他说明" prop="desc">
                <el-input type="textarea" v-model="ruleForm.desc"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
              </el-form-item>
            </el-form>
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
  components: {
    ShopSide,
    Header
  },
  data () {
    return {
      list: [],
      changeType: true,
      ruleForm: {
        name: '',
        region: '',
        roomNumber: '',
        type: [],
        contact: '',
        desc: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入店铺名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请填写楼栋，如：东23，西11', trigger: 'change' }
        ],
        roomNumber: [
          { required: true, message: '请填写房号，如：212', trigger: 'change' }
        ],
        type: [
          { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        ],
        price: [
          { required: true, message: '请填写价格', trigger: 'change' }
        ],
        contact: [
          { required: true, message: '请填写联系方式', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    let that = this
    that.axios
      .post(that.$store.state.globalUrl + '/api/shop/get-by-id?sid=' + that.$store.state.uid)
      .then(response => (
        that.list = response.data.data
      ))
  },
  methods: {
    getNewInfo () {
      let that = this
      that.axios
        .post(that.$store.state.globalUrl + '/api/shop/get-by-id?sid=' + that.$store.state.uid)
        .then(response => (
          that.list = response.data.data
        ))
    },
    ChangeInfo () {
      this.changeType = false
    },
    isOpen (type) {
      let that = this
      if (type === '0') {
        console.log('type' + type)
        that.axios
          .get(that.$store.state.globalUrl + '/api/shop/open', {
          }, {
            headers: {
              'accesstoken': that.$store.state.accesstoken,
              'test': 'test'
            }
          })
          .then(function (response) {
            console.log(response.headers)
          })
      } else {
        console.log('else')
        that.axios
          .get(that.$store.state.globalUrl + '/api/shop/close', {
          }, {
            headers: {
              'accesstoken': that.$store.state.accesstoken
            }
          })
          .then(function (response) {
            console.log(response.data.desc)
          })
      }
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style scoped>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  .el-main{
    text-align: left;
  }
  .changeM{
    color: steelblue;
    font-size: 16px;
  }
  .el-aside {
    color: #333;
  }
</style>
