import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueSocketIO from 'vue-socket.io'
import SocketIO from 'socket.io-client'

// Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

/* Establish Connection */
const socketConnection = SocketIO('http://127.0.0.1:8000');

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.use(new VueSocketIO({
  debug: false,
  connection: socketConnection,
  vuex: {
    store,
    actionPrefix: 'socket_'
  }
}));

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
