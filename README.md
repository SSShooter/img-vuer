# img-vuer

> An image viewer base on Vue.js for mobile 

0.9.1 function almost complete          
0.9.3 β version release     
0.9.7 code compression

:ok_woman: Easy to use    
:point_right: Swipe gesture    
:mag: Zoom gesture     

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
Vue.use(gallery)

// add direact to <img>
<img v-gallery :src="...">

// group images
<img v-gallery:groupName :src="...">
<img v-gallery:groupName :src="...">
<img v-gallery:groupName :src="...">
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
abnormal with page scale      
Add meta      
```html
<meta name="viewport" content="width=device-width, initial-scale=1,user-scalable=0, maximum-scale=1">
```
## License
MIT  