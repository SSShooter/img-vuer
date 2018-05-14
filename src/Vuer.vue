<template>
  <div class="slider"
    v-finger:singleTap="closeGallery">
    <div class="item-wrapper"
      v-transform
      v-finger:pressMove="handlePressMove"
      v-finger:touchStart="handleTouchStart"
      v-finger:touchEnd="handleTouchEnd"
      v-finger:swipe="handleSwipe">
      <!-- 不能以index为:key，index不变组件不更新 -->
      <VuerSingle class="item"
        v-for="(item,index) in imgList"
        :key="item + index"
        ref="img"
        :src="item"
        :index="index"
        :class="{z1:currentIndex===index}"
        @disableSwipe="allowSwipe = false"
        @enableSwipe="allowSwipe = true" />
    </div>
  </div>
</template>

<script>
// TODO 未决定加不加loading组件
import VuerSingle from './VuerSingle'
import To from './to.js'
export default {
  components: { VuerSingle },
  data() {
    return {
      isSingle: false,
      isShow: false,
      allowSwipe: false,
      currentIndex: 0,
      imgList: [],
      /* 从允许swipe开始纪录swipe位移
       * handleTouchEnd时位移小于100（意味着无法触发swipe），清零
       * 大于100必定触发handleSwipe，
       * 修改currentIndex后清零
       */
      swipeDelta: 0
    }
  },
  beforeRouteLeave(to, from, next) {
    console.log('beforeRouteLeave')
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
        document.querySelector('.slider').className = 'slider open'
      } else {
        document.querySelector('.slider').className = 'slider close'
      }
    },
    currentIndex() {
      // 图片未加载成功时无宽度 ，加载完成后先显示第一张后跳到当前
      let el = document.querySelector('.item-wrapper')
      el.translateX = -this.currentIndex * el.getBoundingClientRect().width
    },
    imgList() {
      let el = document.querySelector('.item-wrapper')
      el.translateX = -this.currentIndex * el.getBoundingClientRect().width
    }
  },
  methods: {
    closeGallery() {
      this.isShow = false
      this.$refs.img[this.currentIndex].reset()
    },
    handlePressMove(e, el) {
      console.log(this.allowSwipe)
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
      if (Math.abs(this.swipeDelta) < 100) this.swipeDelta = 0
      let width = el.getBoundingClientRect().width
      new To(el, 'translateX', -this.currentIndex * width, 200, this.ease)
    },
    handleSwipe(evt, el) {
      // swipeDelta小于100不触发翻页
      if (Math.abs(this.swipeDelta) < 100) {
        this.swipeDelta = 0
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
    }
  }
}
</script>

<style scoped>
.slider {
  position: fixed;
  top: 100vh;
  left: 0;
  height: 100vh;
  width: 100vw;
  background: #000;
  overflow: hidden;
  z-index: 1000;
  opacity: 0;
  visibility: hidden;
  -webkit-touch-callout: none;
  user-select: none;
}

.open {
  visibility: visible;
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
    transform: translateY(-100vh);
  }
}

.close {
  visibility: visible;
  animation: close 0.3s;
  animation-fill-mode: forwards;
}

@keyframes close {
  0% {
    opacity: 1;
    transform: translateY(-100vh);
  }
  100% {
    opacity: 0;
    transform: translateY(0);
  }
}

.item-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.item {
  flex-shrink: 0;
  width: 100%;
  height: 100%;
}

/* 左划后右划触发swipe无法解决，只能把当前图片置顶 */
.z1 {
  z-index: 1;
}
</style>
