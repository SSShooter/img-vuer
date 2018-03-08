<template>
  <div class="img-vuer">
    <img style="position:absolute;width: 100%;"
      v-transform
      v-finger:pinch="handlePinch"
      v-finger:doubleTap="handleDoubleTap"
      v-finger:multipointStart="handleMultipointStart"
      v-finger:pressMove="handlePressMove"
      v-finger:touchEnd="handleTouchEnd"
      :src="src">
  </div>
</template>

<script>
import To from './to.js'
export default {
  name: 'app',
  props: ['src'],
  data() {
    return {
      currentScale: 1,
      topPx: 0,
      overflowX: '',
      overflowY: ''
    }
  },
  mounted() {
    if (!this.src) return false
    let vm = this
    function imageLoaded(selector, onload) {
      let img = new Image()
      let dom = document.querySelector(selector)
      img.onload = function() {
        onload.call(dom, this.width, this.height)
        img.onload = null
        img = null
      }
      img.src = dom.getAttribute('src')
    }
    imageLoaded(`[src="${this.src}"]`, function(w, h) {
      this.parentNode.style.display = 'block'
      vm.topPx = (window.innerHeight - h / w * window.innerWidth) / 2
      this.style.top = vm.topPx + 'px'
    })
  },
  methods: {
    // TODO: reset size after swipe
    handleMultipointStart(e, el) {
      this.currentScale = el.scaleX
    },
    handlePressMove(e, el) {
      this.$emit('disableSwipe')
      let slow = false
      let box = el.getBoundingClientRect()
      if (box.right < window.innerWidth) {
        this.overflowX = 'right'
        slow = true
      } else if (box.left > 0) {
        this.overflowX = 'left'
        slow = true
      }
      if (box.bottom > this.topPx + box.height) {
        this.overflowY = 'top'
        slow = true
      } else if (box.bottom < window.innerHeight - this.topPx) {
        this.overflowY = 'bottom'
        slow = true
      }
      if (slow === true) {
        this.$emit('enableSwipe')
        el.translateX += e.deltaX / 8
        el.translateY += e.deltaY / 8
        e.preventDefault()
      } else {
        el.translateX += e.deltaX
        el.translateY += e.deltaY
        e.preventDefault()
      }
    },
    handlePinch(e, el) {
      this.$emit('disableSwipe')
      el.scaleX = el.scaleY = this.currentScale * e.zoom
    },
    handleTouchEnd(e, el) {
      if (el.scaleX < 1) {
        new To(el, 'scaleX', 1, 500, this.ease)
        new To(el, 'scaleY', 1, 500, this.ease)
      } else {
        let box = el.getBoundingClientRect()
        let translateBorderX = (el.scaleX - 1) * box.width / el.scaleX / 2
        let translateBorderY = (el.scaleY - 1) * box.height / el.scaleY / 2
        if (this.overflowX == 'left') {
          new To(el, 'translateX', translateBorderX, 500, this.ease)
        } else if (this.overflowX == 'right') {
          new To(el, 'translateX', -translateBorderX, 500, this.ease)
        }

        if (this.overflowY == 'top') {
          new To(el, 'translateY', translateBorderY, 500, this.ease)
        } else if (this.overflowY == 'bottom') {
          new To(el, 'translateY', -translateBorderY, 500, this.ease)
        }
        this.overflowX = this.overflowY = ''
      }
    },
    handleDoubleTap(e, el) {
      this.$emit('disableSwipe')
      if (el.scaleX != 1) {
        new To(el, 'scaleX', 1, 500, this.ease)
        new To(el, 'scaleY', 1, 500, this.ease)
        new To(el, 'translateX', 0, 500, this.ease)
        new To(el, 'translateY', 0, 500, this.ease)
      } else {
        let box = el.getBoundingClientRect()
        let y =
          box.height -
          (e.changedTouches[0].pageY - this.topPx) * 2 -
          (box.height / 2 - (e.changedTouches[0].pageY - this.topPx))
        let x =
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
.img-vuer {
  position: relative;
  width: 100%;
  height: 100%;
  background: #000;
  display: none;
}
</style>
