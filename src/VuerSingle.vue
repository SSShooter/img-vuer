<template>
  <div>
    <div class="spinner"
      v-if="loading">
      <div class="double-bounce1"></div>
      <div class="double-bounce2"></div>
    </div>
    <div class="img-vuer"
      v-transform
      v-finger:pinch="handlePinch"
      v-finger:doubleTap="handleDoubleTap"
      v-finger:multipointStart="handleMultipointStart"
      v-finger:pressMove="handlePressMove"
      v-finger:touchEnd="handleTouchEnd">
      <img style="position:absolute;"
        :src="src">
    </div>
  </div>
</template>

<script>
import To from './to.js'
export default {
  props: ['src'],
  data() {
    return {
      loading: true,
      currentScale: 1,
      isSmall: false
    }
  },
  mounted() {
    console.log(this.$el)
    if (!this.src) return false
    this.$emit('disableSwipe')
    let vm = this
    this.imgPositionAdjust(function(w, h) {
      // 检查屏幕比例
      if (w < window.innerWidth && h < window.innerHeight) {
        this.parentNode.style.display = 'block'
        this.style.top = (window.innerHeight - h) / 2 + 'px'
        this.style.left = (window.innerWidth - w) / 2 + 'px'
        vm.isSmall = true
      } else if (window.innerWidth / window.innerHeight < w / h) {
        this.parentNode.style.display = 'block'
        this.style.width = '100%'
        vm.imgHeight = h / w * window.innerWidth
        vm.imgWidth = window.innerWidth
        this.style.top =
          (window.innerHeight - h / w * window.innerWidth) / 2 + 'px'
      } else {
        this.parentNode.style.display = 'block'
        this.style.height = '100%'
        vm.imgHeight = window.innerHeight
        vm.imgWidth = w / h * window.innerHeight
        this.style.left =
          (window.innerWidth - w / h * window.innerHeight) / 2 + 'px'
      }
      vm.loading = false
    })
  },
  methods: {
    imgPositionAdjust(onload) {
      // 捏造<img/>获取图片宽高
      let img = new Image()
      // 缩略图同链接，注意获取错误
      let dom = this.$el.lastChild.firstChild
      img.onload = function() {
        onload.call(dom, this.width, this.height)
        img.onload = null
        img = null
      }
      img.src = this.src
    },
    handleMultipointStart(e, el) {
      this.currentScale = el.scaleX
    },
    getCriticalX(scale) {
      // 获取横向临界值
      return (this.imgWidth * scale - window.innerWidth) / 2
    },
    getCriticalY(scale) {
      // 获取纵向临界值
      return (this.imgHeight * scale - window.innerHeight) / 2
    },
    handlePressMove(e, el) {
      e.preventDefault()
      if (this.isSmall) {
        el.translateX += e.deltaX / 3
        el.translateY += e.deltaY / 3
        return
      }

      if (el.scaleX < 1.2 && el.scaleX > 0.8) {
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
    handleTouchEnd(e, el) {
      this.el = el
      if (this.isSmall || el.scaleX < 1) {
        this.reset()
        return
      }
      if (el.scaleX > 4) {
        // 放大倍数大于4 可能有潜在问题
        new To(el, 'scaleX', 4, 500, this.ease)
        new To(el, 'scaleY', 4, 500, this.ease)
      }
      // BUG 竖向长图zoom后touchEnd表现异常
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
    handleDoubleTap(e, el) {
      if (this.isSmall) return

      this.$emit('disableSwipe')
      if (el.scaleX != 1) {
        this.reset()
      } else {
        let box = el.getBoundingClientRect()
        let y = window.innerHeight / 2 - e.changedTouches[0].pageY
        let x = window.innerWidth / 2 - e.changedTouches[0].pageX
        new To(el, 'scaleX', 2, 500, this.ease)
        new To(el, 'scaleY', 2, 500, this.ease)
        new To(el, 'translateX', x, 500, this.ease)
        new To(el, 'translateY', y, 500, this.ease)
      }
    },
    handlePinch(e, el) {
      this.$emit('disableSwipe')
      el.scaleX = el.scaleY = this.currentScale * e.zoom
    },
    reset() {
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

<style scoped>
.img-vuer {
  position: relative;
  width: 100%;
  height: 100%;
  display: none;
}
.spinner {
  width: 40px;
  height: 40px;

  margin: calc(50vh - 20px) auto;
  position: relative;
}

.double-bounce1,
.double-bounce2 {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #ccc;
  opacity: 0.6;
  position: absolute;
  top: 0;
  left: 0;

  -webkit-animation: sk-bounce 2s infinite ease-in-out;
  animation: sk-bounce 2s infinite ease-in-out;
}

.double-bounce2 {
  -webkit-animation-delay: -1s;
  animation-delay: -1s;
}

@-webkit-keyframes sk-bounce {
  0%,
  100% {
    -webkit-transform: scale(0);
  }
  50% {
    -webkit-transform: scale(1);
  }
}

@keyframes sk-bounce {
  0%,
  100% {
    transform: scale(0);
    -webkit-transform: scale(0);
  }
  50% {
    transform: scale(1);
    -webkit-transform: scale(1);
  }
}
</style>
