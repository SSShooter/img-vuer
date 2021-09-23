# img-vuer

Vue2 可用版本：https://github.com/ssshooter/img-vuer/tree/legacy

> 一个移动端优先的 Vue3 图片预览插件

- :ok_woman: 极速使用
- :point_right: 滑动手势
- :mag: 缩放手势
- 支持缩略图
- 使用 `scale()` 修复放大模糊问题
- 移动优先，但支持桌面浏览器
- 返回键退出浏览（安卓手机）

**[点击查看使用实例](https://img-vuer.vercel.app/)**或扫描二维码

<img width="150px" src="./QRcode.png">

## 安装

```bash
npm i img-vuer3 --save
```

## 使用

```javascript
// 引入 img-vuer，安装插件
import gallery from 'img-vuer3'
import 'img-vuer3/dist/style.css'

app.use(gallery, {
  swipeThreshold: 150, // 滑动阈值，默认值 100
  isIndexShow: true, // 是否显示图片序号
  useCloseButton: true, // 只通过右上角关闭键退出浏览
  preload: true, // 预加载同组图片
  sliderBackgroundColor: 'rgba(0,0,0,0.6)',
  sliderZIndex: 1001,
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
# 依赖安装
npm i

# 运行开发环境
npm run dev

# 打包插件
npm run build-lib
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

你可以使用 preload 选项解决这个问题，这个版本只会加载你浏览过的图片。

### key

不能使用 index 作 `v-gallery` 图片的循环 key.

## License

MIT
