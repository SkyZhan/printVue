<template>
<div>
  <h3>店铺</h3>
  <el-row :gutter="10">
    <el-col :xs="24" :md="8">
      <el-form :label-position="labelPosition" label-width="80px" :model="form">
        <el-form-item label="名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="活动区域">
          <el-input v-model="form.region"></el-input>
        </el-form-item>
        <el-form-item label="活动形式">
          <el-input v-model="form.type"></el-input>
        </el-form-item>
        <el-form-item  label="上传文件">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :limit="3"
            :on-exceed="handleExceed"
            :file-list="form.fileList">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传图片以及文档文件，且不超过10MB</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="打印要求">
          <el-input type="textarea" v-model="form.requirement"></el-input>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</div>
</template>

<script>
export default {
  data () {
    return {
      labelPosition: 'right',
      form: {
        name: '',
        phoneNumber: '',
        region: '',
        fileList: [],
        requirement: ''
      }
    }
  },
  methods: {
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    },
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择3个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    }
  }
}
</script>

<style scoped>

</style>
