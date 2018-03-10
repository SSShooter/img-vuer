import Vue from 'vue'
import vfinger from 'v-finger-mk42'
import vgallery from './gallery'
import App from './App.vue'
Vue.use(vfinger)
Vue.use(vgallery)

new Vue({
  el: '#app',
  render: h => h(App)
})
