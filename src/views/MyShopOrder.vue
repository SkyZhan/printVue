<template>
  <div>
    <Header></Header>
    <el-tabs :tab-position="tabPosition" style="padding-top:10px;">
      <el-tab-pane label="未确认订单">
      </el-tab-pane>
      <el-tab-pane label="已确认订单">
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="订单编号">
                  <span>{{ props.row.oid }}</span>
                </el-form-item>
                <el-form-item label="订单标签">
                  <span>{{ props.row.tag }}</span>
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
            label="店铺 ID"
            prop="sid">
          </el-table-column>
          <el-table-column
            label="订单配送"
            prop="tag">
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
      tableData: [{
        sid: '5',
        fileList: [
          {name: 'open.jpg', url: 'http://up-z2.qiniup.com/5201902251771164.jpg'},
          {name: 'close.jpg', url: 'http://up-z2.qiniup.com/5201902251619453.jpg'}
        ],
        tag: '江浙小吃、小吃零食',
        status: '已经确认',
        requirement: '上海市普陀区真北路',
        oid: '10333'
      }]
    }
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
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
