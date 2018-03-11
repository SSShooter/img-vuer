
import Vuer from './Vuer.vue'
const gallery = {
  install(Vue, options) {
    // TODO 了解@click的运行机制
    // TODO 完全分清楚全局和实例的区别
    let imgList = {}
    let imgSingle = []
    let VuerE = Vue.extend(Vuer)
    const element = document.createElement('div');
    element.setAttribute('id', 'imageScreen');
    document.querySelector('body').appendChild(element);
    let vm = new VuerE().$mount('#imageScreen')
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
          // imgSingle.push(el.src)
        }
      }
    })
    Vue.mixin({
      created: function () {
        // 逻辑...
      }
    })
  }
}
export default gallery
