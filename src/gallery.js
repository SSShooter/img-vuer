
import Vuer from './Vuer.vue'
const gallery = {
  install(Vue, options) {
    let VuerE = Vue.extend(Vuer)
    const element = document.createElement('div');
    element.setAttribute('id', 'imageScreen');
    document.querySelector('body').appendChild(element);
    new VuerE().$mount('#imageScreen')
    let imgList = []
    Vue.directive('gallery', {
      inserted: el => {
        imgList.push({src:el.src})
        console.log(imgList)
      }
    })
  }
}
export default gallery
