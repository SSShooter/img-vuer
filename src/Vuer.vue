<template>
  <div>
    <div class="prevent-pass-through"></div>
    <div
      class="slider"
      :style="{'background-color':backgroundColor}"
      v-finger:singleTap="handleTapClose"
    >
      <div
        class="item-wrapper"
        v-transform
        v-finger:pressMove="handlePressMove"
        v-finger:touchStart="handleTouchStart"
        v-finger:touchEnd="handleTouchEnd"
        v-finger:swipe="handleSwipe"
      >
        <!-- 不能以index为:key，index不变组件不更新 -->
        <VuerSingle
          class="item"
          v-for="(src,index) in imgList"
          :key="src + index"
          ref="img"
          :src="src"
          :class="{z1:currentIndex===index}"
          @disableSwipe="allowSwipe = false"
          @enableSwipe="allowSwipe = true"
        />
      </div>
      <div v-if="useCloseButton" @click="handleTapClose(null,null,true)" class="words close-btn">×</div>
      <div v-if="isIndexShow" class="words index">{{currentIndex + 1 + '/' + imgList.length}}</div>
    </div>
  </div>
</template>

<script>
import VuerSingle from './VuerSingle'
import To from './to.js'
export default {
  components: { VuerSingle },
  data() {
    return {
      backgroundColor: '#111',
      imgList: [],
      isSingle: false,
      isShow: false,
      isIndexShow: true,
      useCloseButton: false,
      preload: true,
      allowSwipe: false,
      currentIndex: 0,
      /**
       * 从允许swipe开始纪录swipe位移
       * handleTouchEnd时位移小于100（意味着无法触发swipe），清零
       * 大于100必定触发handleSwipe，
       * 修改currentIndex后清零
       */
      swipeDelta: 0,
      swipeThreshold: 100
    }
  },
  beforeRouteLeave(to, from, next) {
    // 路由跳转时关闭图片预览
    vm.isShow = false
    next()
  },
  computed: {
    maxIndex() {
      return this.imgList.length - 1
    }
  },
  watch: {
    isShow(val) {
      if (val) {
        // 使用 history 处理安卓物理返回键关闭图片
        if (/android/i.test(navigator.userAgent)) {
          history.pushState(null, null, location.href)
          window.addEventListener('popstate', this.closeGallery)
        }
        document.querySelector('.prevent-pass-through').className =
          'prevent-pass-through prevent-pass-through-show'
        document.querySelector('.slider').className = 'slider open'
      } else {
        window.removeEventListener('popstate', this.closeGallery)
        setTimeout(
          () =>
            (document.querySelector('.prevent-pass-through').className =
              'prevent-pass-through'),
          400
        )
        document.querySelector('.slider').className = 'slider close'
      }
    },
    currentIndex() {
      // 图片未加载成功时无宽度 ，加载完成后先显示第一张后跳到当前
      let el = document.querySelector('.item-wrapper')
      el.translateX = -this.currentIndex * el.getBoundingClientRect().width
      if (!this.preload) {
        this.$nextTick(() => {
          this.$refs.img[this.currentIndex].imgInit()
        })
      }
    },
    imgList() {
      let el = document.querySelector('.item-wrapper')
      el.translateX = -this.currentIndex * el.getBoundingClientRect().width
      if (!this.preload) {
        this.$nextTick(() => {
          this.$refs.img[this.currentIndex].imgInit()
        })
      }
    }
  },
  methods: {
    handleTapClose(e, el, fromCloseButton) {
      if (this.useCloseButton && !fromCloseButton) return
      if (/android/i.test(navigator.userAgent)) {
        history.back()
      }
      this.closeGallery()
    },
    closeGallery() {
      this.isShow = false
      this.$refs.img[this.currentIndex].reset()
    },
    handlePressMove(e, el) {
      e.preventDefault()
      if (this.allowSwipe === false || this.isSingle) return
      el.translateX += e.deltaX
      this.swipeDelta += e.deltaX
    },
    handleTouchStart() {
      To.stopAll()
    },
    handleTouchEnd(e, el) {
      // touchmove太短无法触发swipe时用于复位
      if (Math.abs(this.swipeDelta) < this.swipeThreshold) {
        this.swipeDelta = 0
        let width = el.getBoundingClientRect().width
        new To(el, 'translateX', -this.currentIndex * width, 200, this.ease)
      }
    },
    handleSwipe(evt, el) {
      // swipeDelta小于swipeThreshold不触发翻页
      if (Math.abs(this.swipeDelta) < this.swipeThreshold) {
        // 借 handleTouchEnd 复位
        return
      }
      let width = el.getBoundingClientRect().width
      if (evt.direction === 'Left' && this.currentIndex < this.maxIndex) {
        this.$refs.img[this.currentIndex].reset()
        this.currentIndex += 1
      } else if (evt.direction === 'Right' && this.currentIndex > 0) {
        this.$refs.img[this.currentIndex].reset()
        this.currentIndex -= 1
      }
      new To(el, 'translateX', -this.currentIndex * width, 200, this.ease)
      this.swipeDelta = 0
    },
    next() {
      let el = document.querySelector('.item-wrapper')
      let width = el.getBoundingClientRect().width
      this.currentIndex += 1
      new To(el, 'translateX', -this.currentIndex * width, 200, this.ease)
    },
    prev() {
      let el = document.querySelector('.item-wrapper')
      let width = el.getBoundingClientRect().width
      this.currentIndex -= 1
      new To(el, 'translateX', -this.currentIndex * width, 200, this.ease)
    }
  }
}
</script>

<style scoped>
.prevent-pass-through {
  position: fixed;
  height: 100%;
  width: 100%;
  z-index: 9;
  display: none;
}
.prevent-pass-through-show {
  display: block;
}
.words {
  position: fixed;
  text-align: center;
  color: aliceblue;
  text-shadow: -1px -1px 0 rgb(17, 17, 17), 1px -1px 0 rgb(17, 17, 17),
    -1px 1px 0 rgb(17, 17, 17), 1px 1px 0 rgb(17, 17, 17);
}
.index {
  bottom: 20px;
  width: 100%;
}
.close-btn {
  top: 5px;
  right: 5px;
  padding: 5px;
  font-size: 1.2rem;
}

.slider {
  position: fixed;
  top: 100%;
  width: 100%;
  left: 0;
  height: 100%;
  overflow: hidden;
  z-index: 1000;
  opacity: 0;
  -webkit-touch-callout: none;
  user-select: none;
}

.item-wrapper {
  display: flex;
  justify-content: flex-start;
  height: 100%;
  /* 隐形坑，wrapper 宽度为100%，为什么拨走后还能响应事件？ */
}

.item {
  height: 100%;
  flex-basis: 100%;
  flex-shrink: 0;
}

/* 左划后右划触发swipe无法解决，只能把当前图片置顶 */
.z1 {
  z-index: 1;
}

.open {
  animation: open 0.3s;
  animation-fill-mode: forwards;
}

@keyframes open {
  0% {
    opacity: 0;
    transform: translateY(0);
  }
  100% {
    opacity: 1;
    transform: translateY(-100%);
  }
}

.close {
  animation: close 0.3s;
  animation-fill-mode: forwards;
}

@keyframes close {
  0% {
    opacity: 1;
    transform: translateY(-100%);
  }
  100% {
    opacity: 0;
    transform: translateY(0);
  }
}
</style>
