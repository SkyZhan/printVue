<template>
  <div>
    <Header></Header>
    <el-container style="height: 100%;border: 1px solid #eee;">
      <ShopSide></ShopSide>
      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <span>王小虎</span>
        </el-header>A
        <el-main >
          <img v-if="ruleForm.openUp == '1' " src="../assets/shopStatus/open.jpg" alt="点击关闭店铺" @click="isOpen('1')"/>
          <img v-if="ruleForm.openUp == '0' "  src="../assets/shopStatus/close.jpg" alt="点击关闭店铺" @click="isOpen('0')"/>
          <div v-if="changeType">
            <h3>{{ruleForm.name}}</h3>
            <h4>地点：{{ruleForm.region}}楼{{ruleForm.roomNumber}}</h4>
            <p><span>功能：</span>{{ruleForm.tag}}</p>
            <p><span>备注：</span>{{ruleForm.content}}</p>
            <span @click="ChangeInfo" class="changeM">修改信息</span>
          </div>
          <div v-else>
            <p><span class="changeM" @click="UnChange">取消修改</span></p>
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
                <el-button type="primary" @click="submitForm('ruleForm')">立即更新</el-button>
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
  inject: ['reload'],
  components: {
    ShopSide,
    Header
  },
  data () {
    return {
      tagNum: [],
      tagType: [],
      changeType: true,
      array: [],
      ruleForm: {
        name: '',
        region: '',
        roomNumber: '',
        type: [],
        content: '',
        tag: ''
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
        content: [
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
        that.ruleForm = response.data.data
      ))
    that.axios
      .get(that.$store.state.globalUrl + '/api/tag/get ')
      .then(function (response) {
        that.tagType = response.data.data
        console.log(that.tagType)
        for (let i = 0; i < that.tagType.length; i++) {
          that.tagNum[i] = that.tagType[i].tagName
          console.log(that.tagType[i].tagName)
        }
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
          .post(that.$store.state.globalUrl + '/api/tag/create?tagName=' + value, {}, {
            headers: {'accesstoken': that.$store.state.accesstoken}
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
    // no chang
    UnChange () {
      this.changeType = true
    },
    ChangeInfo () {
      this.array = this.ruleForm.tag.split(' ')
      console.log(this.array)
      this.changeType = false
    },
    // 开关店控制
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
            that.ruleForm.openUp = '1'
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
            that.ruleForm.openUp = '0'
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
