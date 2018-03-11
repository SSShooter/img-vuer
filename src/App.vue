<template>
  <div style="padding:20px;">
    <div style="overflow:hidden">
      <p>&lt;img v-gallery:group1 class="thumbnail" v-for="item in list1" :src="item.src"&gt;</p>
      <img v-gallery:group1 class="thumbnail" v-for="item in list1" :src="item.src" :key="item.src + 1">
    </div>
    <div style="overflow:hidden">
      <p>&lt;img v-gallery:group2 class="thumbnail" v-for="item in list2" :src="item.src"&gt;</p>
      <img v-gallery:group2 class="thumbnail" v-for="item in list2" :src="item.src" :key="item.src + 2">
    </div>
    <div style="overflow:hidden">
      <p>&lt;img v-gallery class="thumbnail" v-for="item in list2" :src="item.src"&gt;</p>
      <img v-gallery class="thumbnail" v-for="item in list2" :src="item.src" :key="item.src + 3">
    </div>
  </div>
</template>

<script>
import Vuer from './Vuer.vue'
export default {
  components: { Vuer },
  data() {
    return {
      list1: [
        {
          src:
          'https://wx4.sinaimg.cn/mw690/686d7361ly1fp9a246f3pj21kw16okbj.jpg'
        },
        {
          src:
          'https://wx3.sinaimg.cn/mw690/686d7361ly1fp9a2496y3j21kw16otxy.jpg'
        },
        {
          src:
          'https://wx4.sinaimg.cn/mw690/686d7361ly1fp9a52e83uj21kw0w04kg.jpg'
        },
      ],
      list2: [
        {
          src:
          'https://wx2.sinaimg.cn/mw690/686d7361ly1fp99t4bem4j21kw16ohdu.jpg'
        },
        {
          src:
          'https://wx1.sinaimg.cn/mw690/686d7361ly1fp99v4u8jlj21kw1kwkjm.jpg'
        }
      ]
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
