# img-vuer

> 一个移动端优先的 Vue2 图片预览插件

:ok_woman: 极速使用

:point_right: 滑动手势

:mag: 缩放手势

V0.11.0 可以使用缩略图啦～

V0.13.0 返回键退出浏览（安卓手机）

V0.15.0 使用 scale() 修复放大模糊问题

:computer: v0.17.1 支持桌面浏览器啦！！

**[点击查看使用实例](https://ssshooter.github.io/img-vuer/index.html)**或扫描二维码

<img width="150px" src="./QRcode.png">

## 安装

```bash
npm i img-vuer --save
```

## 使用

```javascript
// 引入 img-vuer，安装插件
import gallery from 'img-vuer'
Vue.use(gallery, {
  swipeThreshold: 150, // 滑动阈值，默认值 100
  isIndexShow: true, // 是否显示图片序号
  useCloseButton: false, // 只通过右上角关闭键退出浏览
})
```

```html
<!-- 只需添加 v-gallery 到图片标签即可 -->
<img v-gallery :src="..." />

<!-- 图片分组 -->
<img v-gallery:groupName :src="..." />
<img v-gallery:groupName :src="..." />
<img v-gallery:groupName :src="..." />

<!-- 使用动态绑定的分组名称 -->
<img v-gallery="'groupName'" :src="..." />

<!-- 使用缩略图 -->
<img v-gallery :src="thumbnailSrc" data-large="originSrc" />

<!-- 退出浏览 -->
<button @click="$imgVuer.close()">close</button>
```

## API

| api               | arg   | description                                                       |
| ----------------- | ----- | ----------------------------------------------------------------- |
| close()           | /     | 退出浏览                                                          |
| onIndexChange()   | cb    | `$imgVuer.onIndexChange((newVal, oldVal)=>{...})`                 |
| onToggle()        | cb    | 退出或进入浏览时触发 `$imgVuer.onToggle((newVal, oldVal)=>{...})` |
| changeBGColor()   | color | 修改浏览器背景 `$imgVuer.changeBGColor('#fff')`                   |
| next()            | /     | 下一幅图 `$imgVuer.next()`                                        |
| prev()            | /     | 上一幅图 `$imgVuer.prev()`                                        |
| getCurrentIndex() | /     | /                                                                 |

## 开发

```bash
# development environment node v6.15.1

# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

## 问题处理

### 页面大小不对

添加 meta

```html
<meta
  name="viewport"
  content="width=device-width, initial-scale=1,user-scalable=0, maximum-scale=1"
/>
```

### 大量大图

如果你把大量大图分到一组，img-vuer 会在你预览这组的任意图片时加载该组所有图片。这会耗费用户大量流量和拖慢页面。

你可以使用 v0.17.2 解决这个问题，这个版本只会加载你浏览过的图片。

### key

不能使用 index 作 `v-gallery` 图片的循环 key.

## License

MIT
