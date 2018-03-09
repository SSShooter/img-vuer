<template>
  <div class="slider">
    <div class="item-wrapper"
      v-transform
      v-finger:pressMove="handlePressMove"
      v-finger:touchEnd="handleTouchEnd"
      v-finger:swipe="handleSwipe">
      <VuerSingle class="item"
        v-for="(item,index) in list"
        :key="index"
        ref="img"
        :src="item.src"
        @disableSwipe="allowSwipe = false"
        @enableSwipe="allowSwipe = true" />
    </div>
  </div>
</template>

<script>
import VuerSingle from './VuerSingle'
import To from './to.js'
export default {
  components: { VuerSingle },
  props: {
    list: Array,
    initIndex: { type: Number, default: 0 },
    isShow: Boolean
  },
  data() {
    return {
      allowSwipe: false,
      currentIndex: this.initIndex
    }
  },
  computed: {
    maxIndex() {
      return this.list.length - 1
    }
  },
  watch: {
    isShow() {
      // if (this.isShow) document.querySelector('.slider').style.display = 'block'
    }
  },
  mounted() {
    let el = document.querySelector('.item-wrapper')
    el.translateX = -this.currentIndex * el.getBoundingClientRect().width
    // if (!this.isShow) document.querySelector('.slider').style.display = 'none'
  },
  methods: {
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
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width:100vw;
  background: #000;
  overflow: hidden;
}
.item-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  /* transition: all .3s; */
}
.item {
  flex-shrink: 0;
  width: 100%;
  height: 100%;
}
</style>
