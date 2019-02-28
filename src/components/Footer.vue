<template>
  <div class="footer">
    <el-row :gutter="10">
      <el-col :span="24">
        This website was made by SkylarZhan
        <p>如果有什么问题，请发送到邮箱1207853638</p>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style scoped>
.footer{
  margin-top: 3rem;
  padding-top: 2rem;
  padding-bottom: 2rem;
  background: #475669;
  color: #fff;
  text-align: center;
}
</style>
