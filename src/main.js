import { createApp, h } from 'vue'
import App from './App.vue'
import gallery from './gallery'

const app = createApp({
  render: () => h(App),
})

app.use(gallery, {
  swipeThreshold: 100,
  isIndexShow: true,
  useCloseButton: true,
  preload: false,
  sliderBackgroundColor: 'rgba(0,0,0,0.6)',
  sliderZIndex: 1001,
})

app.mount('#app')
