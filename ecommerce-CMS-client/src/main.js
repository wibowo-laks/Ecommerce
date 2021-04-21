import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import jQuery from 'jquery'
import VueSweetalert2 from 'vue-sweetalert2'

Vue.config.productionTip = false

global.$ = jQuery
Vue.use(VueSweetalert2)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
