<template>
  <div class="img-vuer">
    <img style="position:absolute;width: 100%;" v-transform v-finger:pinch="handlePinch" v-finger:doubleTap="handleDoubleTap" v-finger:multipointStart="handleMultipointStart" v-finger:pressMove="handlePressMove" v-finger:touchEnd="handleTouchEnd" :src="src">
  </div>
</template>

<script>
import To from './to.js'
export default {
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
    console.log(this.src)
    if (!this.src) return false
    let vm = this
    this.imageLoaded(`[src="${this.src}"]`, function(w, h) {
      this.parentNode.style.display = 'block'
      vm.topPx = (window.innerHeight - h / w * window.innerWidth) / 2
      this.style.top = vm.topPx + 'px'
    })
  },
  methods: {
    imageLoaded(selector, onload) {
      let img = new Image()
      // 缩略图同链接，注意获取错误
      let dom = document.querySelector('.img-vuer > ' + selector)
      console.log(selector,dom)
      img.onload = function() {
        onload.call(dom, this.width, this.height)
        img.onload = null
        img = null
      }
      img.src = dom.getAttribute('src')
    },
    handleMultipointStart(e, el) {
      this.currentScale = el.scaleX
    },
    handlePressMove(e, el) {
      this.$emit('disableSwipe')
      let slowX = false
      let slowY = false
      let box = el.getBoundingClientRect()
      if (box.right < window.innerWidth) {
        this.overflowX = 'right'
        slowX = true
      } else if (box.left > 0) {
        this.overflowX = 'left'
        slowX = true
      }
      if (box.bottom > this.topPx + box.height) {
        this.overflowY = 'top'
        slowY = true
      } else if (box.bottom < window.innerHeight - this.topPx) {
        this.overflowY = 'bottom'
        slowY = true
      }
      // BUG 上下超出时允许Swipe
      // slow代表到达边界
      if (slowX && !slowY) {
        this.$emit('enableSwipe')
        el.translateY += e.deltaY
      } else if (slowY && !slowX) {
        el.translateX += e.deltaX
        el.translateY += e.deltaY / 8
        e.preventDefault()
      } else if (!slowY && !slowX) {
        el.translateX += e.deltaX
        el.translateY += e.deltaY
        e.preventDefault()
      } else {
        this.$emit('enableSwipe')
        el.translateY += e.deltaY / 8
      }
    },
    handlePinch(e, el) {
      this.$emit('disableSwipe')
      el.scaleX = el.scaleY = this.currentScale * e.zoom
    },
    handleTouchEnd(e, el) {
      this.el = el
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
    resetSize() {
      if (!this.el) return
      new To(this.el, 'scaleX', 1, 500, this.ease)
      new To(this.el, 'scaleY', 1, 500, this.ease)
      new To(this.el, 'translateX', 0, 500, this.ease)
      new To(this.el, 'translateY', 0, 500, this.ease)
    },
    ease(x) {
      return Math.sqrt(1 - Math.pow(x - 1, 2))
    }
  }
}
</script>

<style>
.img-vuer {
  position: relative;
  width: 100%;
  height: 100%;
  display: none;
}
</style>
