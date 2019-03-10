<template>
  <el-carousel indicator-position="outside">
    <el-carousel-item v-for="item in 1" :key="item">
      <h3></h3>
    </el-carousel-item>
  </el-carousel>
</template>

<script>
export default {
  name: 'carous',
  data () {
    return {
      image: [ { img: '../assets/logo.png' }, {img: '../assets/shopStatus/close.jpg'}
      ]
    }
  }
}
</script>

<style scoped>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 250px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    /*background-color: #99a9bf;*/
    background:url('../assets/platform.jpg');
    -moz-background-size:100% 100%;
    background-size:100% 100%;
  }

  .el-carousel__item:nth-child(2n+1) {
    background:url('../assets/platform.jpg');
    -moz-background-size:100% 100%;
    background-size:100% 100%;
  }
</style>
