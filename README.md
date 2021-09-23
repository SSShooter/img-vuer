# img-vuer

For Vue2: https://github.com/ssshooter/img-vuer/tree/legacy

> An Mobile-First image viewer for Vue3

[中文 README](https://github.com/ssshooter/img-vuer/blob/master/README.cn.md)

---

- :ok_woman: Easy to use
- :point_right: Swipe gesture
- :mag: Zoom gesture
- Now you can use thumbnail~
- Gallery hide when the physical back button is pressed (android device only)
- Fix blurry after using scale()
- :computer: compatible with PC

**Now you can use both Mobile and PC Browser** :satisfied:

**[live demo](https://img-vuer.vercel.app/)**

or scan the QRcode

<img width="150px" src="./QRcode.png">

## Install

```bash
npm i img-vuer3 --save
```

## Usage

```javascript
// import img-vuer and install
import gallery from 'img-vuer3'
import 'img-vuer3/dist/style.css'

app.use(gallery, {
  swipeThreshold: 150, // default 100
  isIndexShow: true, // show image index, default true
  useCloseButton: true, // trigger gallery close with close button, default true
  preload: true, // preload images in the same group, default true
  sliderBackgroundColor: 'rgba(0,0,0,0.6)',
  sliderZIndex: 1001,
})
```

```html
<!-- add direact to <img> -->
<img v-gallery :src="..." />

<!-- group images -->
<img v-gallery:groupName :src="..." />
<img v-gallery:groupName :src="..." />
<img v-gallery:groupName :src="..." />

<!-- OR (dynamic bind) -->
<img v-gallery="'groupName'" :src="..." />

<!-- use thumbnail, new in 0.11.0 -->
<img v-gallery :src="thumbnailSrc" data-large="originSrc" />

<!-- trigger close gallery, new in 0.14.0 -->
<button @click="$imgVuer.close()">close</button>
```

## API

| api               | arg   | description                                                           |
| ----------------- | ----- | --------------------------------------------------------------------- |
| close()           | /     | close the viwer                                                       |
| onIndexChange()   | cb    | `$imgVuer.onIndexChange((newVal, oldVal)=>{...})`                     |
| onToggle()        | cb    | on close or on open `$imgVuer.onToggle((newVal, oldVal)=>{...})`      |
| changeBGColor()   | color | change the background color of viwer `$imgVuer.changeBGColor('#fff')` |
| next()            | /     | switch to next image `$imgVuer.next()`                                |
| prev()            | /     | switch to previous image `$imgVuer.prev()`                            |
| getCurrentIndex() | /     | /                                                                     |

## Development

```bash
npm install

npm run dev

npm run build-lib
```

## Troubleshooting

### Abnormal page scale

Add meta

```html
<meta
  name="viewport"
  content="width=device-width, initial-scale=1,user-scalable=0, maximum-scale=1"
/>
```

### for a large number of large images

If you group a large number of large images, img-vuer will load all image in the same group, so it will cause unnecessary mobile data traffic and slow the page down.

You can use `preload` option in this situation and img-vuer will only load the image you watched.

### key

Should not use index as key for the component which is added `v-gallery`.

## License

MIT
