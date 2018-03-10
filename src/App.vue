<template>
  <div style="padding:20px;">
    <Vuer :list="list" :initIndex="initIndex" :isShow.sync="isGalleryShow" />
    <img v-gallery class="thumbnail" v-for="(item,index) in list" :src="item.src" :key="item.src" @click="openGallery(index)">
  </div>
</template>

<script>
import Vuer from './Vuer.vue'
export default {
  components: { Vuer },
  data() {
    return {
      initIndex: 0,
      isGalleryShow: false,
      list: [
        {
          src:
          'https://wx1.sinaimg.cn/mw690/7ee8cd0dgy1fp6f3njoqcj20om0ytk6k.jpg'
        },
        {
          src:
          'https://wx4.sinaimg.cn/mw690/006ghkmygy1fp6cr46qwcj30qo0yowl5.jpg'
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
      ]
    }
  },
  methods: {
    openGallery(index) {
      this.isGalleryShow = true
      this.initIndex = index
    }
  }
}
</script>

<style scoped>
.thumbnail {
  display: block;
  float: left;
  margin: 3px;
  height: 100px;
  width: 100px;
  object-fit: cover;
}
</style>
