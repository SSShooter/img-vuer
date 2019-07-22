<template>
  <div>
    <loader v-if="loading" />
    <div
      class="img-vuer"
      v-transform
      v-finger:pinch="handlePinch"
      v-finger:doubleTap="handleDoubleTap"
      v-finger:multipointStart="handleMultipointStart"
      v-finger:pressMove="handlePressMove"
      v-finger:touchEnd="handleTouchEnd"
    >
      <img style="position:absolute;" v-transform :src="srcDelay" />
    </div>
  </div>
</template>

<script>
import To from './to.js'
import Loader from './loader/DoubleBounce'
export default {
  props: ['src'],
  components: { Loader },
  data() {
    return {
      imgEl: null,
      loading: true,
      initialScale: 1,
      currentScale: 1,
      isSmall: false,
      srcDelay: '',
      isInited: false
    }
  },
  mounted() {
    if (!this.src) return false
    this.$emit('disableSwipe')
    console.log(this.$root.preload, 'preload')
    if (this.$root.preload) {
      this.imgInit()
    }
  },
  methods: {
    imgInit(onload) {
      if (this.isInited && this.srcDelay === this.src) return
      console.log('load img', this.src)

      let vm = this
      vm.srcDelay = vm.src
      vm.isInited = true

      let img = new Image()
      let imgEl = this.$el.lastChild.firstChild
      img.onload = function() {
        let h = this.height
        let w = this.width
        vm.imgEl = imgEl
        vm.imgHeight = h
        vm.imgWidth = w
        imgEl.style.left = (window.innerWidth - w) / 2 + 'px'
        imgEl.style.top = (window.innerHeight - h) / 2 + 'px'
        imgEl.parentNode.style.display = 'block'
        if (w < window.innerWidth && h < window.innerHeight) {
          vm.isSmall = true
        } else if (window.innerWidth / window.innerHeight < w / h) {
          vm.initialScale = window.innerWidth / w
          imgEl.scaleX = imgEl.scaleY = vm.initialScale
        } else {
          vm.initialScale = window.innerHeight / h
          imgEl.scaleX = imgEl.scaleY = vm.initialScale
        }
        vm.loading = false

        img.onload = null
        img = null
      }
      img.src = this.src
    },
    getCriticalX(scale) {
      // 获取横向临界值
      return (this.imgWidth * scale - window.innerWidth) / 2
    },
    getCriticalY(scale) {
      // 获取纵向临界值
      return (this.imgHeight * scale - window.innerHeight) / 2
    },
    handleMultipointStart(e) {
      this.currentScale = this.imgEl.scaleX
    },
    handlePressMove(e) {
      let el = this.imgEl
      e.preventDefault()
      if (this.isSmall) {
        el.translateX += e.deltaX / 3
        el.translateY += e.deltaY / 3
        this.$emit('enableSwipe')
        return
      }

      if (
        el.scaleX / this.initialScale < 1.2 &&
        el.scaleX / this.initialScale > 0.8
      ) {
        this.$emit('enableSwipe')
        el.translateX += e.deltaX / 3
        return
      }

      let criticalX = this.getCriticalX(el.scaleX)
      let criticalY = this.getCriticalY(el.scaleY)

      // 实现超过临界值移动速度减缓
      let slowX = el.translateX > criticalX || el.translateX < -criticalX
      let slowY = el.translateY > criticalY || el.translateY < -criticalY

      this.$emit('disableSwipe')
      if (slowX) {
        el.translateX += e.deltaX / 3
        this.$emit('enableSwipe')
      } else el.translateX += e.deltaX
      if (slowY) {
        el.translateY += e.deltaY / 3
      } else el.translateY += e.deltaY
    },
    handleTouchEnd(e) {
      let el = this.imgEl
      if (this.isSmall || el.scaleX / this.initialScale < 1) {
        this.reset()
        return
      }

      if (el.scaleX / this.initialScale > 6) {
        new To(el, 'scaleX', this.initialScale * 6, 500, this.ease)
        new To(el, 'scaleY', this.initialScale * 6, 500, this.ease)
      }
      let criticalX = this.getCriticalX(el.scaleX)
      let criticalY = this.getCriticalY(el.scaleY)

      if (window.innerHeight >= this.imgHeight * el.scaleX) {
        new To(el, 'translateY', 0, 500, this.ease)
      } else {
        if (el.translateY > criticalY) {
          new To(el, 'translateY', criticalY, 500, this.ease)
        } else if (el.translateY < -criticalY) {
          new To(el, 'translateY', -criticalY, 500, this.ease)
        }
      }

      if (window.innerWidth >= this.imgWidth * el.scaleY) {
        new To(el, 'translateX', 0, 500, this.ease)
      } else {
        if (el.translateX > criticalX) {
          new To(el, 'translateX', criticalX, 500, this.ease)
        } else if (el.translateX < -criticalX) {
          new To(el, 'translateX', -criticalX, 500, this.ease)
        }
      }
    },
    handleDoubleTap(e) {
      let el = this.imgEl
      if (this.isSmall) return

      this.$emit('disableSwipe')
      if (this.imgEl.scaleX !== this.initialScale) {
        this.reset()
      } else {
        let box = el.getBoundingClientRect()
        let y = window.innerHeight / 2 - e.changedTouches[0].pageY
        let x = window.innerWidth / 2 - e.changedTouches[0].pageX
        new To(el, 'scaleX', this.initialScale * 2, 500, this.ease)
        new To(el, 'scaleY', this.initialScale * 2, 500, this.ease)
        new To(el, 'translateX', x, 500, this.ease)
        new To(el, 'translateY', y, 500, this.ease)
        console.dir(el)
      }
    },
    handlePinch(e, el) {
      this.$emit('disableSwipe')
      this.imgEl.scaleX = this.imgEl.scaleY = this.currentScale * e.zoom
    },
    reset() {
      if (!this.imgEl) return
      new To(this.imgEl, 'scaleX', this.initialScale, 500, this.ease)
      new To(this.imgEl, 'scaleY', this.initialScale, 500, this.ease)
      new To(this.imgEl, 'translateX', 0, 500, this.ease)
      new To(this.imgEl, 'translateY', 0, 500, this.ease)
    },
    ease(x) {
      return Math.sqrt(1 - Math.pow(x - 1, 2))
    }
  }
}
</script>

<style scoped>
.img-vuer {
  position: relative;
  width: 100%;
  height: 100%;
  display: none;
}
/* hack issue 16
   TranslateZ also works as it is a hack to add hardware acceleration to the animation 
   reference https://stackoverflow.com/questions/14677490/blurry-text-after-using-css-transform-scale-in-chrome
*/
/* img {
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
} */
</style>
