import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import axios from 'axios'
import mask from 'vue-the-mask'
import '@babel/polyfill'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@fortawesome/fontawesome-free/css/all.css'

Vue.use(mask)

Vue.config.productionTip = false
Vue.prototype.$axios = axios.create({
  baseURL: 'http://192.168.1.141:3000',
  headers: {
    'Content-Type': 'application/json',
    // Authorization: `Bearer ${store.getters.token}`
  }
})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
