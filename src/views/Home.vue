<template>
  <div>
    <Header></Header>
    <Carous></Carous>
    <SaleNumber></SaleNumber>
    <ShopList></ShopList>
  </div>

</template>

<script>
import ShopList from '@/components/ShopList'
import Header from '@/components/Header'
import Carous from '@/components/Carous'
import SaleNumber from '@/components/SaleNumber'
export default {
  components: {
    ShopList,
    Header,
    Carous,
    SaleNumber
  },
  data () {
    return {
    }
  },
  mounted () {

  }
}

</script>

<style scoped>

</style>
