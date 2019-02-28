<template>
  <div>
    <Header></Header>
    <Carous></Carous>
    <SaleNumber></SaleNumber>
    <ShopList></ShopList>
    <Footer></Footer>
  </div>

</template>

<script>
import ShopList from '@/components/ShopList'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Carous from '@/components/Carous'
import SaleNumber from '@/components/SaleNumber'
export default {
  components: {
    ShopList,
    Header,
    Carous,
    SaleNumber,
    Footer
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
