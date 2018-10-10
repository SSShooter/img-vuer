# img-vuer

> An image viewer base on Vue.js for mobile 

:ok_woman: Easy to use    

:point_right: Swipe gesture    

:mag: Zoom gesture   


V0.11.0 Now you can use thumbnail~   

V0.13.0 Gallery hide when the physical back button is pressed (android device only)

V0.15.0 Fix blurry after using scale()

**Please Use Mobile Browser** :satisfied:      

**[live demo](https://ssshooter.github.io/img-vuer/index.html)**      

or scan the QRcode    

<img width="150px" src="./QRcode.png">    

## Install
``` bash
npm i img-vuer --save
```
## Usage
```javascript
// import img-vuer and install
import gallery from 'img-vuer'
Vue.use(gallery, { 
  swipeThreshold: 150  // default 100 ,new in 0.12.0
})
```
```html
<!-- add direact to <img> -->
<img v-gallery :src="...">

<!-- group images -->
<img v-gallery:groupName :src="...">
<img v-gallery:groupName :src="...">
<img v-gallery:groupName :src="...">

<!-- OR ( dynamic bind ) -->
<img v-gallery="'groupName'" :src="...">

<!-- use thumbnail, new in 0.11.0 -->
<img v-gallery :src="thumbnailSrc" data-large="originSrc">

<!-- trigger close gallery, new in 0.14.0 -->
<button @click="$imgVuer.close()">close</button>
```

## Development
``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```
## Troubleshooting
### Abnormal with page scale      
Add meta      
```html
<meta name="viewport" content="width=device-width, initial-scale=1,user-scalable=0, maximum-scale=1">
```
### Should not use index as key for the component which is added `v-gallery`.
## License
MIT  
