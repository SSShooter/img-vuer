<template>
  <div id="img-vuer">
    <div id="imgBox" style="position:relative;width: 100%;height: 100%;left:0;top:0;
                                 background:rgba(0,0,0,0.5);display: none;">
      <img style="position:absolute;width: 100%;" v-finger:pinch="handlePinch" v-finger:doubleTap="handleDoubleTap" v-finger:multipointStart="handleMultipointStart" v-finger:multipointEnd="handleMultipointEnd" v-finger:pressMove="handlePressMove" v-finger:touchEnd="handleTouchEnd" src="https://wx1.sinaimg.cn/mw690/6694d955ly1fp2xwc9dbzj20hs0ouq5g.jpg">
    </div>
  </div>
</template>

<script>
import vfinger from 'v-finger-mk42'
import Transform from './transform.js'
import To from './to.js'
import Vue from 'vue'
Vue.use(vfinger)
export default {
  name: 'app',
  data() {
    return {
      thisScale: 1,
      isZooming: false,
      topPx: 0,
      overflowX: '',
      overflowY: ''
    }
  },
  mounted() {
    let vm = this
    function imageLoaded(selector, onload) {
      var img = new Image()
      var dom = document.querySelector(selector)
      img.onload = function() {
        onload.call(dom, this.width, this.height)
        img.onload = null
        img = null
      }
      img.src = dom.getAttribute('src')
    }
    imageLoaded('img', function(w, h) {
      document.querySelector('#imgBox').style.display = 'block'
      vm.topPx = (window.innerHeight - h / w * window.innerWidth) / 2
      this.style.top = vm.topPx + 'px'
    })
    Transform(document.querySelector('img'))
  },
  methods: {
    handleMultipointStart(e, el) {
      this.thisScale = el.scaleX
    },
    handleMultipointEnd(e, el) { },
    handlePressMove(e, el) {
      var box = el.getBoundingClientRect()
      if (box.right < window.innerWidth) {
        this.overflowX = 'right'
        el.translateX += e.deltaX / 3
        el.translateY += e.deltaY / 3
        e.preventDefault()
      }
      else if (box.left > 0) {
        this.overflowX = 'left'
        el.translateX += e.deltaX / 3
        el.translateY += e.deltaY / 3
        e.preventDefault()
      }
      else if (box.right < window.innerWidth) {
        this.overflowX = 'bottom'
        el.translateX += e.deltaX / 3
        el.translateY += e.deltaY / 3
        e.preventDefault()
      }
      else if (box.top > 0) {
        this.overflowY = 'top'
        el.translateX += e.deltaX / 3
        el.translateY += e.deltaY / 3
        e.preventDefault()
      } else {
        el.translateX += e.deltaX
        el.translateY += e.deltaY
        e.preventDefault()
      }
    },
    handlePinch(e, el) {
      el.scaleX = el.scaleY = this.thisScale * e.zoom
    },
    handleTouchEnd(e, el) {
      if (el.scaleX < 1) {
        new To(el, 'scaleX', 1, 500, this.ease)
        new To(el, 'scaleY', 1, 500, this.ease)
      } else {
        var box = el.getBoundingClientRect()
        let translateBorderX = (el.scaleX - 1) * box.width / el.scaleX / 2
        let translateBorderY = (el.scaleY - 1) * box.height / el.scaleY / 2
        if (this.overflowX == 'left') {
          new To(el, 'translateX', translateBorderX, 500, this.ease)
        }
        else if (this.overflowX == 'right') {
          new To(el, 'translateX', -translateBorderX, 500, this.ease)
        }
        
        if (this.overflowY == 'top') {
          new To(el, 'translateY', translateBorderY, 500, this.ease)
        }
        else if (this.overflowY == 'bottom') {
          new To(el, 'translateY', -translateBorderY, 500, this.ease)
        }
        this.overflowX = this.overflowY = ''
      }
    },
    handleDoubleTap(e, el) {
      console.log(e)
      if (el.scaleX != 1) {
        new To(el, 'scaleX', 1, 500, this.ease)
        new To(el, 'scaleY', 1, 500, this.ease)
        new To(el, 'translateX', 0, 500, this.ease)
        new To(el, 'translateY', 0, 500, this.ease)
      } else {
        var box = el.getBoundingClientRect()
        var y =
          box.height -
          (e.changedTouches[0].pageY - this.topPx) * 2 -
          (box.height / 2 - (e.changedTouches[0].pageY - this.topPx))
        var x =
          box.width -
          e.changedTouches[0].pageX * 2 -
          (box.width / 2 - e.changedTouches[0].pageX)
        new To(el, 'scaleX', 2, 500, this.ease)
        new To(el, 'scaleY', 2, 500, this.ease)
        new To(el, 'translateX', x, 500, this.ease)
        new To(el, 'translateY', y, 500, this.ease)
      }
    },

    ease(x) {
      return Math.sqrt(1 - Math.pow(x - 1, 2))
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
