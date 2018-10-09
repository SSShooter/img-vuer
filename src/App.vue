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
  data() {
    return {
      list1: [
        {
          src:
            'https://wx1.sinaimg.cn/mw1024/686d7361ly1fpha0mpd5uj21hc0tyws2.jpg'
        },
        {
          src:
            'https://wx1.sinaimg.cn/mw1024/686d7361ly1fpha0ncnnej21hc0zetxo.jpg'
        },
        {
          src:
            'https://wx1.sinaimg.cn/mw1024/686d7361ly1fpha0mqvu5j21hc0zkgzz.jpg'
        }
      ],
      list2: [
        {
          src:
            'https://wx3.sinaimg.cn/mw1024/686d7361ly1fpha0na9ztj21hc0zkh5n.jpg'
        },
        {
          src:
            'https://wx1.sinaimg.cn/mw1024/686d7361ly1fpha0mkce2j21hc0zkalj.jpg'
        },
        {
          src:
            'https://wx1.sinaimg.cn/mw1024/686d7361ly1fpha0mkce2j21hc0zkalj.jpg'
        }
      ],
      list3: [
        {
          src:
            'https://wx3.sinaimg.cn/mw1024/686d7361ly1fpha0me2u3j20zk1hcgw6.jpg'
        },
        {
          src:
            'https://wx1.sinaimg.cn/mw1024/686d7361ly1fpha0m3ufuj21hc0zkqbj.jpg'
        },
        {
          src:
            'https://tva1.sinaimg.cn/crop.316.53.496.496.180/686d7361jw1f3q2lpig4cj20vk0hswn3.jpg'
        }
      ],
      list4: [
        {
          thumbnail:
            'https://wx2.sinaimg.cn/mw690/686d7361gy1frawt0qgdxj2025025t8u.jpg',
          src:
            'https://wx1.sinaimg.cn/mw1024/686d7361ly1fpha0m3ufuj21hc0zkqbj.jpg'
        },
        {
          thumbnail:
            'https://wx2.sinaimg.cn/mw690/686d7361gy1frawstm19qj2027027jrk.jpg',
          src:
            'https://wx3.sinaimg.cn/mw1024/686d7361ly1fpha0na9ztj21hc0zkh5n.jpg'
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
