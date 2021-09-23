import {createApp} from 'vue'
import Vuer from './Vuer.vue'
import vfinger from 'v-finger-mk42'
// import vfinger from '../../v-finger/lib/index'

// 有写大图属性就取大图
const getImgSrc = el => el.dataset.large || el.src

const gallery = {
  install(app, options = {}) {
    
    // 所有图片地址储存位置
    let imgList = {}
    
    // 新建实例并挂载
    let container = document.createElement('div')
    document.querySelector('body').appendChild(container)
    const vuerApp = createApp(Vuer)
    vuerApp.use(vfinger)
    let vm = vuerApp.mount(container)

    // 如果没有提供 $mount 的参数，模板将被渲染为文档之外的的元素，并且你必须使用原生 DOM API 把它插入文档中。

    vm.swipeThreshold = options.swipeThreshold || 100

    vm.isIndexShow =
      options.isIndexShow === undefined ? true : options.isIndexShow

    vm.useCloseButton =
      options.useCloseButton === undefined ? true : options.useCloseButton

    vm.preload = options.preload === undefined ? true : options.preload

    vm.backgroundColor = options.sliderBackgroundColor || '#111'

    vm.zIndex = options.sliderZIndex || 1000

    options.loadingStyle // TODO

    let openVuer = (el, group) => e => {
      let imgSrc = getImgSrc(el)
      if (group !== undefined) {
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
    
    app.config.globalProperties.$imgVuer = {
      close() {
        vm.closeGallery()
      },
      onIndexChange(cb) {
        // 0.16.0
        vm.$watch('currentIndex', cb)
      },
      onToggle(cb) {
        // 0.16.0
        vm.$watch('isShow', cb)
      },
      changeBGColor(color) {
        // 0.16.1
        vm.backgroundColor = color
      },
      next() {
        // 0.16.2
        vm.next()
      },
      prev() {
        // 0.16.2
        vm.prev()
      },
      getCurrentIndex() {
        // 0.16.2
        return vm.currentIndex
      },
    }
    // https://v3.vuejs.org/guide/migration/custom-directives.html#_2-x-syntax
    app.directive('gallery', {
      beforeMount(el) {
        if (!el.src) throw new Error('<img /> src is missing')
      },
      mounted(el, binding) {
        // 同时兼容arg和value传分组名称
        // 加 String() 防止 0 捣乱
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
      unmounted(el, binding) {
        // 调查keep alive后跳转是否触发unbind
        vm.isShow = false
        let imgSrc = getImgSrc(el)
        let group = binding.arg || binding.value
        el.removeEventListener('click', openVuer(el, group))
        if (group !== undefined) {
          let imgGroup = imgList[group]
          let index = imgGroup.indexOf(imgSrc)
          imgGroup.splice(index, 1)
        }
      },
    })
  },
}
export default gallery
