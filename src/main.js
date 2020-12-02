import Vue from 'vue'
import App from './App.vue'
import gallery from './gallery'
import VueScroller from 'vue-scroller'
Vue.use(VueScroller)
Vue.use(gallery, {
  swipeThreshold: 100,
  isIndexShow: true,
  useCloseButton: true,
  preload: false,
  sliderBackgroundColor: 'rgba(0,0,0,0.6)',
  sliderZIndex: 1001,
})

new Vue({
  el: '#app',
  render: h => h(App),
})

// demo 实例创建
