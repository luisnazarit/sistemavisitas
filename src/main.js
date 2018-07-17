import Vue from 'vue'
import App from './App.vue'
import VueFire from 'vuefire'
import './module.scss'
import vueRut from 'vue-rut'
import Notifications from 'vue-notification'
import vSelect from 'vue-select'
Vue.component('v-select', vSelect)

Vue.config.productionTip = false

Vue.use(vueRut);
Vue.use(VueFire);
Vue.use(Notifications)

new Vue({
  render: h => h(App)
}).$mount('#app')
