import Vue from 'vue'
import App from './App.vue'
import VueFire from 'vuefire'
import './module.scss'
import vueRut from 'vue-rut'

Vue.config.productionTip = false

Vue.use(vueRut);
Vue.use(VueFire);

new Vue({
  render: h => h(App)
}).$mount('#app')
