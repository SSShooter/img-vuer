import Vue from 'vue'
import App from './App.vue'
import { gallery } from '../index'
import VueScroller from 'vue-scroller'
Vue.use(VueScroller)
Vue.use(gallery)

new Vue({
  el: '#app',
  render: h => h(App)
})
