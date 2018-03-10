<template>
  <div class="slider">
    <div class="item-wrapper" v-transform v-finger:singleTap="closeGallery" v-finger:pressMove="handlePressMove" v-finger:touchEnd="handleTouchEnd" v-finger:swipe="handleSwipe">
      <VuerSingle class="item" v-for="(item,index) in list" :key="index" ref="img" :src="item.src" @disableSwipe="allowSwipe = false" @enableSwipe="allowSwipe = true" />
    </div>
  </div>
</template>

<script>
import VuerSingle from './VuerSingle'
import To from './to.js'
export default {
  components: { VuerSingle },
  props: {
    // list: Array,
    list: {
      type: Array,
      default: () => [{ src: 'http://nodesimplified.com/wp-content/uploads/2017/12/error.jpg' }]
    },
    initIndex: { type: Number, default: 0 },
    isShow: Boolean
  },
  data() {
    return {
      allowSwipe: false,
      currentIndex: 0
    }
  },
  computed: {
    maxIndex() {
      return this.list.length - 1
    }
  },
  watch: {
    isShow(val) {
      if (val) {
        document.querySelector('.slider').className = "slider open"
      }
      else {
        document.querySelector('.slider').className = "slider close"
      }
    },
    initIndex(val) {
      this.currentIndex = val
      let el = document.querySelector('.item-wrapper')
      el.translateX = -this.currentIndex * el.getBoundingClientRect().width
    }
  },
  mounted() {
    let el = document.querySelector('.item-wrapper')
    el.translateX = -this.currentIndex * el.getBoundingClientRect().width
  },
  methods: {
    closeGallery() {
      this.$emit('update:isShow', false)
      this.$refs.img[this.currentIndex].resetSize()
      console.log('close')
    },
    handlePressMove(e, el) {
      if (this.allowSwipe === false) return
      el.translateX += e.deltaX
      e.preventDefault()
    },
    handleTouchEnd(e, el) {
      // touchmove太短无法触发swipe时用于复位
      if (this.allowSwipe === false) return
      let width = el.getBoundingClientRect().width
      new To(el, 'translateX', -this.currentIndex * width, 200, this.ease)
    },
    handleSwipe(evt, el) {
      if (this.allowSwipe === false) return
      let width = el.getBoundingClientRect().width
      console.log(width)
      if (evt.direction === 'Left' && this.currentIndex < this.maxIndex) {
        this.$refs.img[this.currentIndex].resetSize()
        this.currentIndex += 1
      } else if (evt.direction === 'Right' && this.currentIndex > 0) {
        this.$refs.img[this.currentIndex].resetSize()
        this.currentIndex -= 1
      }
      new To(el, 'translateX', -this.currentIndex * width, 200, this.ease)
    }
  }
}
</script>

<style>
.slider {
  position: fixed;
  top: 100vh;
  left: 0;
  height: 100vh;
  width: 100vw;
  background: #000;
  overflow: hidden;

  opacity: 0;
  visibility: hidden;
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
    transform: translateY(-100vh)
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
</style>
