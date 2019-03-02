import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Home from '@/views/Home'
import Register from '@/views/Register'
import ShopDetail from '@/views/ShopDetail'
import ShopList from '@/components/ShopList'
import MakeOrder from '@/views/MakeOrder'
import PersonalCenter from '@/views/PersonalCenter'
import ApplyShop from '@/views/ApplyShop'
import MyShop from '@/views/MyShop'
import MyShopOrder from '@/views/MyShopOrder'
import MySearch from '@/views/MySearch'
import MyOrder from '@/views/MyOrder'
import PublicFile from '@/views/PublicFile'
import AdminDefault from '@/views/Admin/AdminDefault'
import AdminFileList from '@/views/Admin/AdminFileList'
import AdminShopList from '@/views/Admin/AdminShopList'
Vue.use(Router)

export default new Router({
  mode: 'history',
  linkActiveClass: 'active',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/Register',
      name: 'register',
      component: Register
    },
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/ShopDetail',
      name: 'ShopDetail',
      component: ShopDetail
    },
    {
      path: '/ShopList',
      name: 'ShopList',
      component: ShopList
    },
    {
      path: '/MakeOrder',
      name: 'MakeOrder',
      component: MakeOrder
    },
    {
      path: '/PersonalCenter',
      name: 'PersonalCenter',
      component: PersonalCenter
    },
    {
      path: '/ApplyShop',
      name: 'ApplyShop',
      component: ApplyShop
    },
    {
      path: '/MyShop',
      name: 'MyShop',
      component: MyShop
    },
    {
      path: '/MyShopOrder',
      name: 'MyShopOrder',
      component: MyShopOrder
    },
    {
      path: '/MySearch',
      name: 'MySearch',
      component: MySearch
    },
    {
      path: '/MyOrder',
      name: 'MyOrder',
      component: MyOrder
    },
    {
      path: '/PublicFile',
      name: 'PublicFile',
      component: PublicFile
    },
    {
      path: '/Admin/AdminDefault',
      name: 'AdminDefault',
      component: AdminDefault
    },
    {
      path: '/Admin/AdminFileList',
      name: 'AdminFileList',
      component: AdminFileList
    },
    {
      path: '/Admin/AdminShopList',
      name: 'AdminShopList',
      component: AdminShopList
    }
  ]
})
