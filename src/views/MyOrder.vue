<template>
  <div>
    <Header></Header>
    <el-tabs :tab-position="tabPosition" style="padding-top:10px;">
      <el-tab-pane label="未确认订单">
        <el-table
          :data="orderArray"
          style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="订单编号">
                  <span>{{ props.row.oid }}</span>
                </el-form-item>
                <el-form-item label="订单">
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
                  <span v-for="(item, index) in props.row.fileList" :key="index"><a :href=" item.url">{{ item.name }}</a></span>
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
            label="店铺名称"
            prop="name">
          </el-table-column>
          <el-table-column
            label="打印要求描述"
            prop="requirement">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">取消订单</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="已确认订单">
        <el-table
          :data="orderArray"
          style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="订单编号">
                  <span>{{ props.row.oid }}</span>
                </el-form-item>
                <el-form-item label="订单">
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
                  <span v-for="(item, index) in props.row.fileList" :key="index"><a :href=" item.url">{{ item.name }}</a></span>
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
      orderArray: [],
      tableData: [{
        sid: '5',
        fileList: [],
        tag: '江浙小吃、小吃零食',
        status: '已经确认',
        requirement: '上海市普陀区真北路',
        oid: '10333'
      }]
    }
  },
  mounted () {
    let that = this
    that.axios
      .post(that.$store.state.globalUrl + '/api/order/get-self', {}, {
        headers: {'accesstoken': that.$store.state.accesstoken}
      })
      .then(function (response) {
        let objArray = response.data.data
        let fileArray = []
        for (let i = 0; i < objArray.length; i++) {
          console.log(objArray[i])
          let fileNameList = (objArray[i].fileName || '').split(' ') // split use in vue
          let fileUrlList = (objArray[i].fileUrl || '').split(' ') // split use in vue
          let obj = {}
          for (let j = 0; j < fileNameList.length; j++) {
            obj.name = fileNameList[j]
            obj.url = fileUrlList[j]
            fileArray.push(obj)
          }
          obj = {}
          let order = {}
          order.name = objArray[i].name
          order.locate = objArray[i].region + objArray[i].roomNumber
          order.fileList = fileArray
          order.oid = objArray[i].oid
          order.sid = objArray[i].sid
          order.tag = objArray[i].tag
          order.status = objArray[i].status
          order.requirement = objArray[i].requirement
          that.orderArray.push(order)
          fileArray = []
          order = {}
        }
      })
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
    },
    // delete order
    handleDelete (index, row) {
      console.log(index, row)
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
