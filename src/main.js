import Vue from 'vue'
import App from './App.vue'
import gallery from './gallery'
import VueScroller from 'vue-scroller'
Vue.use(VueScroller)
Vue.use(gallery, { 
  swipeThreshold: 100 
})

new Vue({
  el: '#app',
  render: h => h(App)
})

// demo 实例创建