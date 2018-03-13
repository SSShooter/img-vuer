import Vuer from './Vuer.vue'
import vfinger from '../../v-finger'
const gallery = {
  install(Vue, options) {
    Vue.use(vfinger)
    let imgList = {}
    let VuerE = Vue.extend(Vuer)
    const element = document.createElement('div');
    element.setAttribute('id', 'gallery-box');
    document.querySelector('body').appendChild(element);
    // 新建实例并挂载
    let vm = new VuerE().$mount('#gallery-box')
    Vue.directive('gallery', {
      inserted: (el, binding) => {
        let group = binding.arg
        el.addEventListener('click', e => {
          if (group) {
            vm.imgList = imgList[group]
            let index = vm.imgList.indexOf(el.src)
            vm.isShow = true
            vm.initIndex = index
          }else{
            vm.imgList = [el.src]
            vm.isShow = true
            vm.initIndex = 0
          }
        })
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
      }
    })
  }
}
export default gallery
