import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CountryView from '../views/CountryView.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    // meta: {
    //   authRequired: false
    // },
    component: HomeView
  },
  {
    path: '/countries',
    name: 'Contries',
    // meta: {
    //   authRequired: true
    // },
    component: CountryView
  },
  {
    path: '/singleCountry/:country',
    name: 'SingleCountry',
    // meta: {
    //   authRequired: true
    // },
    component: HomeView
  },
  {
    path: '/login',
    name: 'Login',
    // meta: {
    //   authRequired: false
    // },
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    // meta: {
    //   authRequired: false
    // },
    component: Register
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.authRequired) {
    const jwt = localStorage.getItem('token');
    if (jwt == null) {
      next('/login')
      return
    }
  }
  next()
})

export default router
