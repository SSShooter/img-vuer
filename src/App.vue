<template>
  <scroller>
    <div style="padding:20px;">
      <header>
        <i class="iconfont icon-image"></i>img
        <span class="vue-green">Vue</span>r
      </header>
      <div class="descript">
        An image viewer base on Vue.js for mobile
      </div>

      <div class="subtitle">Multiple</div>
      <div style="overflow:hidden">
        <img v-gallery:group1
          class="thumbnail"
          v-for="img in list1"
          :src="img.src"
          :key="img.src">
      </div>
      <p>
        <pre>&lt;img 
      <span class="vue-green">v-gallery</span>:group1
      v-for="<span class="symbol">img in list1</span>" 
      :src="img.src"&gt;</pre>
      </p>

      <div class="subtitle">Multiple(same images)</div>
      <div style="overflow:hidden">
        <img v-gallery="'group2'"
          class="thumbnail"
          v-for="(img,index) in list2"
          :data-index="index"
          :src="img.src"
          :key="img.src + index">
      </div>
      <p>
        <pre>&lt;img 
      <span class="vue-green">v-gallery</span>="'group2'"
      v-for="(img,index) in list2" 
      <span class="vue-green">:data-index="index"</span>
      :src="img.src"&gt;</pre>
      </p>

      <div class="subtitle">Single</div>
      <div style="overflow:hidden">
        <img v-gallery
          class="thumbnail"
          v-for="(img,index) in list3"
          :src="img.src"
          :key="img.src + index">
      </div>
      <div class="subtitle" style="margin-top: 0.6rem;">Small/Long</div>
      <div style="overflow:hidden">
        <img v-gallery
          class="thumbnail"
          v-for="(img,index) in list3_5"
          :src="img.src"
          :key="img.src + index">
      </div>
      <p>
        <pre>&lt;img 
      <span class="vue-green">v-gallery</span>
      v-for="img in list3" 
      :src="img.src"&gt;</pre>
      </p>

      <div class="subtitle">Use thumbnail</div>
      <div style="overflow:hidden">
        <img v-gallery:group3
          class="thumbnail"
          v-for="(img,index) in list4"
          :src="img.thumbnail"
          :data-large="img.src"
          :key="img.src + index">
      </div>
      <p>
        <pre>&lt;img 
      <span class="vue-green">v-gallery</span>:group3
      v-for="(img,index) in list4"
      <span class="vue-green">:data-large="img.src"</span>
      <span class="vue-green">:src="img.thumbnail"</span>&gt;</pre>
      </p>

      <footer @click="toGitHub">
        <i class="iconfont icon-github"></i>GitHub</footer>
    </div>
  </scroller>
</template>

<script>
import Vuer from './Vuer.vue'
export default {
  components: { Vuer },
  mounted(){
    console.log('this.$imgVuer',this.$imgVuer)
  },
  data() {
    return {
      list1: [
        {
          src:
            'https://cdn.jsdelivr.net/npm/img-vuer/img/1.jpg'
        },
        {
          src:
            'https://cdn.jsdelivr.net/npm/img-vuer/img/2.jpg'
        },
        {
          src:
            'https://cdn.jsdelivr.net/npm/img-vuer/img/3.jpg'
        }
      ],
      list2: [
        {
          src:
            'https://cdn.jsdelivr.net/npm/img-vuer/img/4.jpg'
        },
        {
          src:
            'https://cdn.jsdelivr.net/npm/img-vuer/img/5.jpg'
        },
        {
          src:
            'https://cdn.jsdelivr.net/npm/img-vuer/img/5.jpg'
        }
      ],
      list3: [
        {
          src:
            'https://cdn.jsdelivr.net/npm/img-vuer/img/6.jpg'
        },
        {
          src:
            'https://cdn.jsdelivr.net/npm/img-vuer/img/7.jpg'
        },
      ],
      list3_5: [
        {
          src:
            'https://cdn.jsdelivr.net/npm/img-vuer/img/8.jpg'
        },
        {
          src:
            'https://cdn.jsdelivr.net/npm/img-vuer/img/9.jpg'
        }
      ],
      list4: [
        {
          thumbnail:
            'https://cdn.jsdelivr.net/npm/img-vuer/img/t1.jpg',
          src:
            'https://cdn.jsdelivr.net/npm/img-vuer/img/7.jpg'
        },
        {
          thumbnail:
            'https://cdn.jsdelivr.net/npm/img-vuer/img/t2.jpg',
          src:
            'https://cdn.jsdelivr.net/npm/img-vuer/img/4.jpg'
        }
      ]
    }
  },
  methods: {
    toGitHub() {
      location.href = 'https://github.com/ssshooter/img-vuer'
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
pre {
  font-family: Monaco;
  color: #fff;
  padding: 0.5rem;
}
p {
  background: #4d4d4d;
}
header {
  font-size: 2rem;
  color: #fff;
}
footer {
  font-size: 1rem;
  color: #fff;
}
.descript {
  font-size: 1.3rem;
  color: #9a9a9a;
  margin-bottom: 2rem;
}
.subtitle {
  font-size: 1.2rem;
  color: #a7a8aa;
  margin-bottom: 1rem;
}
.vue-green {
  color: #4fc08d;
}
.iconfont {
  font-size: 1.5rem;
  margin: 0.3rem;
}
.gray {
  color: #ccc;
}
</style>
