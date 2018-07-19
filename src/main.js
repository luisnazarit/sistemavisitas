import Vue from 'vue'
import App from './App.vue'
import VueFire from 'vuefire'
import './module.scss'
import '../node_modules/vue-multiselect/dist/vue-multiselect.min.css'
import VeeValidate from 'vee-validate';


import { rutInputDirective, rutFilter } from 'vue-dni';
import Notifications from 'vue-notification'




Vue.filter('rutFilter', rutFilter);
Vue.directive('rut', rutInputDirective);

Vue.filter('date', function (date){
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();
  const hour = date.getHours();
  const minutes = date.getMinutes();
  const time = date.getTime();

  return (
    day +
    " " +
    monthNames[monthIndex] +
    " " +
    year +
    " " +
    hour +
    ":" +
    minutes
  );
})

Vue.config.productionTip = false

Vue.use(VeeValidate);
Vue.use(VueFire);
Vue.use(Notifications)


new Vue({
  render: h => h(App)
}).$mount('#app')
