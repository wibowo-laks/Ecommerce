import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Products from '../components/Products/Products.vue'
import Banners from '../components/Banners/Banners.vue'
import Categories from '../components/Categories/Categories.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: 'categories',
        name: 'Categories',
        component: Categories
      },
      {
        path: 'products',
        name: 'Products',
        component: Products
      },
      {
        path: 'banners',
        name: 'Banners',
        component: Banners
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('access_token')
  if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
  else if (to.name === 'Home' && isAuthenticated) next({ name: 'Products' })
  else if (to.name === 'Login' && isAuthenticated) next({ name: 'Products' })
  else next()
})

export default router
