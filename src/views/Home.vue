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
import Carous from '@/components/Carous'
import SaleNumber from '@/components/SaleNumber'
import Footer from '../components/Footer'
export default {
  components: {
    Footer,
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
