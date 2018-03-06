<template>
  <div id="img-vuer">
    <div>
      <img v-finger:pinch="handlePinch" v-finger:doubleTap="handleDoubleTap" src="https://wx1.sinaimg.cn/mw690/6694d955ly1fp2xwc9dbzj20hs0ouq5g.jpg">
    </div>
  </div>
</template>

<script>
import vfinger from 'v-finger-mk42'
import Vue from 'vue'
Vue.use(vfinger)
export default {
  name: 'app',
  data() {
    return {
      thisImgInitHeight: '',
      thisImgInitWidth: '',
      isZooming: false
    }
  },
  mounted() {
    document.querySelector('img').style.width = this.thisImgInitWidth =
      window.screen.availWidth + 'px'
    document.querySelector('img').style.height = 'auto'
    this.$nextTick(() => {
      document.querySelector('img').style.height = this.thisImgInitHeight =
        document.querySelector('img').height + 'px'
    })
  },
  methods: {
    handlePinch(e, el) {
      console.log(e)
      // let left = el.getBoundingClientRect().left
      // let top = el.getBoundingClientRect().top
      // let originX = e.changedTouches[0].clientX - left
      // let originY = e.changedTouches[0].clientY - top
      // el.style['transform-origin'] = `${originX}px ${originY}px 0`
      el.style.transform = `scale(${(e.zoom-1)/5+1})`
    },
    handleDoubleTap(e, el) {
      console.log(e)
      if (!this.isZooming) {
        let left = el.getBoundingClientRect().left
        let top = el.getBoundingClientRect().top
        console.log(left, top)
        let originX = e.changedTouches[0].clientX - left
        let originY = e.changedTouches[0].clientY - top
        console.log(`${originX}px ${originY}px 0`)
        el.style['transform-origin'] = `${originX}px ${originY}px 0`
        el.style.transform = 'scale(2)'
        this.isZooming = true
      } else {
        el.style.transform = 'scale(1)'
        this.isZooming = false
      }
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

img {
  /* transition: all 0.3s linear; */
}
</style>
