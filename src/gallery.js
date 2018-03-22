import Vuer from './Vuer.vue'
import vfinger from 'v-finger-mk42/indexIV'
const gallery = {
  install(Vue, options) {
    Vue.use(vfinger)
    let imgList = {}
    let VuerE = Vue.extend(Vuer)
    const element = document.createElement('div')
    element.setAttribute('id', 'gallery-box')
    document.querySelector('body').appendChild(element)

    // 新建实例并挂载
    let vm = new VuerE().$mount('#gallery-box')

    let handleClick = (el, group) => e => {
      if (group) {
        vm.imgList = imgList[group]
        let index =
          Number(e.currentTarget.dataset.index) || vm.imgList.indexOf(el.src)
        vm.isShow = true
        vm.currentIndex = index
      } else {
        vm.imgList = [el.src]
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
        el.addEventListener('click', handleClick(el, group))
        if (group) {
          let imgGroup = imgList[group]
          // 有分组
          if (imgGroup) {
            // 分组已定义
            imgGroup.push(el.src)
          } else {
            imgList[group] = [el.src]
          }
        } else {
          // 无分组（单张）
          // 无需储存，直接用el.src打开
        }
      },
      unbind(el, binding) {
        console.log('unbind')
        // 调查keep alive后跳转是否触发unbind
        vm.isShow = false
        let group = binding.value
        el.removeEventListener('click', handleClick(el, group))
        if (group) {
          let imgGroup = imgList[group]
          let index = imgGroup.indexOf(el.src)
          imgGroup.splice(index, 1)
        }
      }
    })
  }
}
export default gallery
