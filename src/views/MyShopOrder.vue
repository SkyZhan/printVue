<template>
  <div>
    <Header></Header>
    <el-container style="height: 100%;" >
      <ShopSide></ShopSide>
      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <span>{{this.$store.state.nickName}}</span>
        </el-header>
        <el-main>
          <el-tabs :tab-position="tabPosition" style="padding-top:10px;">
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
                      <el-form-item label="文件">
                        <span v-for="(item, index) in props.row.fileList" :key="index"><a :href=" item.url">{{item.name}}</a></span>
                      </el-form-item>
                      <el-form-item label="文件打印要求">
                        <span>{{ props.row.requirement }}</span>
                      </el-form-item>
                      <el-form-item label="订单状态">
                        <span>{{ props.row.status }}</span>
                      </el-form-item>
                    </el-form>
                  </template>
                </el-table-column>
                <el-table-column
                  label="订单编号"
                  prop="oid">
                </el-table-column>
                <el-table-column
                  label="订单配送方式"
                  prop="tag">
                </el-table-column>
                <el-table-column
                  label="文件打印要求"
                  prop="requirement">
                </el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
                      type="danger"
                      @click="handleDelete(scope.$index, scope.row)">接收订单</el-button>
                  </template>
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
                      <el-form-item label="文件" >
                        <span v-for="(item, index) in props.row.fileList" :key="index"><a @click="open(item.url)">{{ item.name }}</a></span>
                      </el-form-item>
                      <el-form-item label="文件打印要求">
                        <span>{{ props.row.requirement }}</span>
                      </el-form-item>
                      <el-form-item label="订单状态">
                        <span>{{ props.row.status }}</span>
                      </el-form-item>
                    </el-form>
                  </template>
                </el-table-column>
                <el-table-column
                  label="订单编号"
                  prop="oid" >
                </el-table-column>
                <el-table-column
                  label="订单配送方式"
                  prop="tag">
                </el-table-column>
                <el-table-column
                  label="打印要求描述"
                  prop="requirement">
                </el-table-column>
              </el-table>
            </el-tab-pane>
          </el-tabs>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import ShopSide from '@/components/ShopSide'
import Header from '@/components/Header'
import qs from 'qs'
export default {
  name: 'PersonalCenter',
  components: {
    ShopSide,
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
      .post(that.$store.state.globalUrl + '/api/order/get-self?type=1', {}, {
        headers: {'accesstoken': that.$store.state.accesstoken}
      })
      .then(function (response) {
        let objArray = response.data.data
        for (let i = 0; i < objArray.length; i++) {
          let fileArray = []
          let fileNameList = (objArray[i].fileName || '').split(' ') // split use in vue
          let fileUrlList = (objArray[i].fileUrl || '').split(' ') // split use in vue
          for (let j = 0; j < fileNameList.length; j++) {
            let obj = {}
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
          console.log('here')
          console.log(order.fileList)
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
      let that = this
      console.log(index, row.oid)
      let obj = {
        oid: row.oid,
        status: '1'
      }
      that.axios
        .post(that.$store.state.globalUrl + '/api/order/update-status', qs.stringify(obj),
          {headers: {'accesstoken': that.$store.state.accesstoken}}
        )
        .then(function (response) {
          that.$message({
            message: '接收订单成功',
            type: 'success'
          })
        })
      that.uncheckArray.splice(index)
      row.status = '1'
      that.checkArray.push(row)
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
  .changeInfo {
    color: #1b81ea;
    font-size:16px;
  }
  .smallTitle {
    font-weight: 800;
  }
  .el-header {
    background-color: #e0e8f3;
    color: #333;
    line-height: 60px;
  }
  .el-main{
    text-align:right;
  }
  .el-aside {
    color: #333;
  }
</style>
