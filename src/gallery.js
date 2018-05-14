import Vuer from './Vuer.vue'
import vfinger from 'v-finger-mk42/indexIV'

// 有写大图属性就取大图
const getImgSrc = el => el.dataset.large || el.src

const gallery = {
  install(Vue, options) {
    Vue.use(vfinger)
    // 所有图片地址储存位置
    let imgList = {}
    let VuerE = Vue.extend(Vuer)
    const element = document.createElement('div')
    element.setAttribute('id', 'gallery-box')
    document.querySelector('body').appendChild(element)

    // 新建实例并挂载
    let vm = new VuerE({ el: '#gallery-box' })

    let openVuer = (el, group) => e => {
      let imgSrc = getImgSrc(el)
      if (group) {
        vm.isSingle = false
        vm.imgList = imgList[group]
        vm.isShow = true
        vm.currentIndex =
          Number(e.currentTarget.dataset.index) || vm.imgList.indexOf(imgSrc)
      } else {
        vm.isSingle = true
        vm.imgList = [imgSrc]
        vm.isShow = true
        vm.currentIndex = 0
      }
    }

    Vue.directive('gallery', {
      bind(el) {
        if (!el.src) throw '<img/> missing src'
      },
      // add update
      inserted(el, binding) {
        // 同时兼容arg和value传分组名称
        let group = binding.arg || binding.value
        el.addEventListener('click', openVuer(el, group))
        let imgSrc = getImgSrc(el)
        if (group) {
          let imgGroup = imgList[group]
          // 有分组
          if (imgGroup) {
            // 分组已定义
            imgGroup.push(imgSrc)
          } else {
            imgList[group] = [imgSrc]
          }
        } else {
          // 无分组（单张）
          // 无需储存，直接用imgSrc打开
        }
      },
      unbind(el, binding) {
        console.log('unbind')
        // 调查keep alive后跳转是否触发unbind
        vm.isShow = false
        let imgSrc = getImgSrc(el)
        let group = binding.arg || binding.value
        el.removeEventListener('click', openVuer(el, group))
        if (group) {
          let imgGroup = imgList[group]
          let index = imgGroup.indexOf(imgSrc)
          imgGroup.splice(index, 1)
        }
      }
    })
  }
}
export default gallery
