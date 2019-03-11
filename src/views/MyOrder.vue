<template>
  <div>
    <Header></Header>
    <h3 v-if="this.$store.state.islogin == '0'" @click="toLogin">请先登录！点击此处可登录</h3>
    <el-tabs :tab-position="tabPosition" style="padding-top:10px;" v-else>
      <el-tab-pane label="未确认订单">
        <el-table
          :data="uncheckArray"
          style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="订单编号">
                  <span>{{ props.row.oid }}</span>
                </el-form-item>
                <el-form-item label="订单配送方式">
                  <span>{{ props.row.tag }}</span>
                </el-form-item>
                <el-form-item label="店铺名称">
                  <span>{{ props.row.name}}</span>
                </el-form-item>
                <el-form-item label="店铺地址">
                  <span>{{ props.row.locate }}</span>
                </el-form-item>
                <el-form-item label="店铺 ID">
                  <span>{{ props.row.sid }}</span>
                </el-form-item>
                <el-form-item label="文件">
                  <span v-for="(item, index) in props.row.fileList" :key="index" style="margin-left: 2rem"><a :href=" item.url">{{ item.name }}</a></span>
                </el-form-item>
                <el-form-item label="文件打印要求">
                  <span>{{ props.row.requirement }}</span>
                </el-form-item>
                <el-form-item label="订单状态">
                  <span>等待确认</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column
            label="订单编号"
            prop="oid">
          </el-table-column>
          <el-table-column
            label="店铺名称"
            prop="name">
          </el-table-column>
          <el-table-column
            label="打印要求描述"
            prop="requirement">
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="已确认订单">
        <el-table
          :data="checkArray"
          style="width: 100%">
          <el-table-column type="expand"  >
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="订单编号">
                  <span>{{ props.row.oid }}</span>
                </el-form-item>
                <el-form-item label="订单配送方式">
                  <span>{{ props.row.tag }}</span>
                </el-form-item>
                <el-form-item label="店铺名称" >
                  <span>{{ props.row.name}}</span>
                </el-form-item>
                <el-form-item label="店铺地址">
                  <span>{{ props.row.locate }}</span>
                </el-form-item>
                <el-form-item label="店铺 ID" >
                  <span>{{ props.row.sid }}</span>
                </el-form-item>
                <el-form-item label="文件" >
                  <span v-for="(item, index) in props.row.fileList" :key="index" ><a @click="open(item.url)" style="margin-right: 10px;">{{ item.name }}</a></span>
                </el-form-item>
                <el-form-item label="文件打印要求">
                  <span>{{ props.row.requirement }}</span>
                </el-form-item>
                <el-form-item label="订单状态">
                  <span>已经确认</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column
            label="订单编号"
            prop="oid" >
          </el-table-column>
          <el-table-column
            label="店铺名称"
            prop="name">
          </el-table-column>
          <el-table-column
            label="打印要求描述"
            prop="requirement">
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
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
      tabPosition: 'left',
      checkArray: [],
      uncheckArray: []
    }
  },
  mounted () {
    let that = this
    that.axios
      .post(that.$store.state.globalUrl + '/api/order/get-self?type=0', {}, {
        headers: {'accesstoken': that.$store.state.accesstoken}
      })
      .then(function (response) {
        let objArray = response.data.data
        console.log(response.data.data)
        for (let i = 0; i < objArray.length; i++) {
          let fileArray = []
          let fileNameList = (objArray[i].fileName || '').split(' ') // split use in vue
          let fileUrlList = (objArray[i].fileUrl || '').split(' ') // split use in vue
          let obj = {}
          for (let j = 0; j < fileNameList.length - 1; j++) {
            obj.name = fileNameList[j]
            obj.url = fileUrlList[j]
            fileArray.push(obj)
          }
          let order = {}
          order.name = objArray[i].name
          order.locate = objArray[i].region + '楼' + objArray[i].roomNumber
          order.fileList = fileArray
          order.oid = objArray[i].oid
          order.sid = objArray[i].sid
          order.tag = objArray[i].tag
          order.status = objArray[i].status
          order.requirement = objArray[i].requirement
          if (objArray[i].status === 1) {
            that.checkArray.push(order)
          } else {
            that.uncheckArray.push(order)
          }
        }
      })
  },
  methods: {
    open (fileUrl) {
      window.open(fileUrl)
    },
    handleClick (tab, event) {
      console.log(tab, event)
    },
    // delete order
    handleDelete (index, row) {
      console.log(index, row)
    },
    toLogin () {
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
