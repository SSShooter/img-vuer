<template>
  <div class="slider">
    <div class="item-wrapper"
      v-transform
      v-finger:pressMove="handlePressMove"
      v-finger:touchEnd="handleTouchEnd"
      v-finger:swipe="handleSwipe">
      <ImgVuer class="item"
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
import ImgVuer from './Vuer'
import To from './to.js'
export default {
  components: { ImgVuer },
  data() {
    return {
      list: [
        {
          src:
            'https://wx4.sinaimg.cn/mw690/646638fegy1fp52hg6smvj20j60j676p.jpg'
        },
        {
          src:
            'https://wx1.sinaimg.cn/mw690/6694d955ly1fp2xwc9dbzj20hs0ouq5g.jpg'
        },
        {
          src:
            'https://wx1.sinaimg.cn/mw690/0062YxhLgy1fp4kn7wh9aj30jf0pwq7j.jpg'
        },
        {
          src:
            'https://wx2.sinaimg.cn/mw690/0062YxhLgy1fp4kn0c9ecj30oo0dwwg5.jpg'
        },
        {
          src:
            'https://wx1.sinaimg.cn/mw690/0062YxhLgy1fp4kn2exfvj30lr0eh75k.jpg'
        }
      ],
      allowSwipe: false,
      currentIndex: 0
    }
  },
  computed: {
    maxIndex() {
      return this.list.length - 1
    }
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
  height: 100vh;
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
