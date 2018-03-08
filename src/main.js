import Vue from 'vue'
import vfinger from 'v-finger-mk42'
import App from './App.vue'
Vue.use(vfinger)

new Vue({
  el: '#app',
  render: h => h(App)
})
