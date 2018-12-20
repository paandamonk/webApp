import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vSelect from 'vue-select'
Vue.component('v-select', vSelect)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
