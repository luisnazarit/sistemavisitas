import Vue from 'vue'
import App from './App.vue'
import VueFire from 'vuefire'
import './module.scss'

//var vueRut = require('vue-rut');
import vueRut from 'vue-rut'
Vue.use(vueRut);
Vue.config.productionTip = false

Vue.use(VueFire);

new Vue({
  render: h => h(App)
}).$mount('#app')
