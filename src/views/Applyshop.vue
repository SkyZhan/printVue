<template>
  <div>
    <Header></Header>
      <el-container style="height: 100%;border: 1px solid #eee;">
        <ShopSide></ShopSide>
        <el-container style="border:none;">
          <el-header style="text-align: right; font-size: 12px">
            <span>{{nickName}}</span>
          </el-header>
          <el-main >
            <img src="" />
              <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="店铺名称" prop="name">
                  <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="区域位置" prop="region">
                  <el-input v-model="ruleForm.region" placeholder="如：东23"></el-input>
                </el-form-item>
                <el-form-item label="楼栋房号" prop="roomNumber">
                  <el-input v-model="ruleForm.roomNumber" placeholder="如：212"></el-input>
                </el-form-item>
                <el-form-item label="服务选项" prop="type">
                  <el-checkbox-group v-model="ruleForm.type">
                    <el-checkbox :label="item" :key="id" name="type" v-for="(item, id) in tagNum">{{item}}</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                <el-form-item label="针对服务" >
                  <span class="changeM" @click="addTag">添加服务选项标签</span>
                </el-form-item>
                <el-form-item label="其他说明" prop="content">
                  <el-input type="textarea" v-model="ruleForm.content"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                  <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
              </el-form>
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
      nickName: '',
      tagNum: [],
      tagType: [],
      ruleForm: {
        name: '',
        region: '',
        roomNumber: '',
        type: [],
        content: ''
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
        contact: [
          { required: true, message: '请填写联系方式', trigger: 'change' }
        ],
        content: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    let that = this
    that.axios
      .get(that.$store.state.globalUrl + '/api/tag/get ')
      .then(function (response) {
        that.tagType = response.data.data
        console.log(that.tagType)
        let array = []
        for (let i = 0; i < that.tagType.length; i++) {
          // that.tagNum[i] = that.tagType[i].tagName
          array.push(that.tagType[i].tagName)
          // console.log(that.tagType[i].tagName)
        }
        that.tagNum = array
      })
    that.axios
      .post(that.$store.state.globalUrl + '/api/user/get-by-uid?uid=' + that.$store.state.uid)
      .then(function (response) {
        that.nickName = response.data.data.nickName
      })
  },
  methods: {
    // 添加标签
    addTag () {
      let that = this
      that.$prompt('请输入标签', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({value}) => {
        that.$message({
          type: 'success',
          message: '添加tag' + value
        })
        that.axios
          .post(that.$store.state.globalUrl + '/api/tag/create?tagName=' + value, {
            header: {'accesstoken': that.$store.state.accesstoken}
          })
          .then(function (response) {
            console.log(response.data.desc)
            that.tagNum.push(value)
            console.log(that.tagNum)
          })
      }).catch(() => {
        that.$message({
          type: 'info',
          message: '取消输入'
        })
      })
    },
    submitForm: function (formName) {
      let that = this
      let tag = ' '
      console.log(that.ruleForm.type)
      console.log(that.ruleForm.type.length)
      for (let i = 0; i < that.ruleForm.type.length; i++) {
        tag = tag + that.ruleForm.type[i] + ' '
      }
      console.log('tag' + tag)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          that.axios
            .post(that.$store.state.globalUrl + '/api/shop/create',
              {
                content: that.ruleForm.content,
                name: that.ruleForm.name,
                region: that.ruleForm.region,
                roomNumber: that.ruleForm.roomNumber,
                tag: tag
              }, {
                headers: {
                  'accesstoken': this.$store.state.accesstoken
                }
              })
            .then(function (response) {
              console.log('success')
              that.$store.commit('submitForm', {openShop: '1'})
              that.$router.push('/MyShop')
            })
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
    border:1px solid #B3C0D1;
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
