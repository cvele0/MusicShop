import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import InstrumentView from '../views/InstrumentView.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import SingleInstrumentView from '../views/SingleInstrumentView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: {
      authRequired: false
    },
    component: HomeView
  },
  {
    path: '/instruments',
    name: 'Instruments',
    meta: {
      authRequired: true
    },
    component: InstrumentView
  },
  {
    path: '/singleInstrument/:name',
    name: 'SingleInstrument',
    meta: {
      authRequired: true
    },
    component: SingleInstrumentView
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      authRequired: false
    },
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    meta: {
      authRequired: false
    },
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
      next('/login');
      return;
    }
  }
  next();
})

export default router
