# BOM
我们把**浏览器对象模型**称为 `BOM`。`BOM` 提供了与网页无关的浏览器功能对象，我们可以通过 `BOM` 实现对浏览器的操作和信息获取。

# window 对象

`BOM` 的核心是 `window` 对象，顾名思义，就是**浏览器的实例**。`window` 对象在浏览器中有两重身份，一个是 **`Global` 对象**，另一个是**浏览器窗口的 `JavaScript` 接口**。

## 1. Global 对象
当我们使用 `var` 声明的全局变量和函数，都会变成 `window` 对象的属性和方法。
```js
var name = 'window';
var sayName = function(){
    console.log(this.name);
}
window.sayName(); // 'window'
```

## 2. 窗口
我们可以通过 `window` 对象的相关属性和方法来**获取窗口信息**或**对窗口进行操作**。

### 2.1 移动窗口
`window` 对象的位置可以通过不同的属性和方法来确定。现代浏览器提供了 `screenLeft` 和 `screenTop` 属性，用于**表示窗口相对于屏幕左侧和顶部的位置**，返回值的单位是 `CSS` 像素。

我们可以通过 `window` 对象的 `moveTo()` 和 `moveBy()` 方法来移动窗口位置。

这两个方法都接收两个参数，其中 `moveTo()` 接收要移动到的新位置的绝对坐标 `x` 和 `y`。 `moveBy()` 接收相对当前位置在两个方向上移动的像素数。

简而言之，`moveTo()` 就是将窗口移动到某个位置，`moveBy()` 就是将窗口移动多少。

```js
window.moveTo(0, 0); // 把窗口移动到左上角

window.moveBy(0, 100); // 把窗口下移 100 个像素
```

### 2.2 窗口大小
`window` 对象通过 `innerHeight` 和 `innerWidth` 属性可以获取到**浏览器窗口中页面视口的大小**（不包括浏览器边框和工具栏），而 `outerHeight` 和 `outerWidth` 属性可以获得到**浏览器窗口自身的大小**（包括浏览器边框和工具栏）。

从浏览器页面 `document` 的角度而言，我们也可以通过 `document.documentElement.clientHeight` 和 `document.documentElement.clientWidth` 获取其视口大小。

浏览器视口实际上也就是页面 `document` 的视口，因此，**`window.innerHeight / Width` 和 `document.documentElement.clientHeight / Width` 属性值是相等的**。

除了获取属性外，我们也可以通过 `window` 对象的 `resizeTo()` 和 `resizeBy()` 方法调整窗口大小。这两个方法都是接收两个参数。
+ `resizeTo()` 接收的两个参数表示**新的宽度和高度**。
+ `resizeBy()` 接收的两个参数表示**宽度和高度各要缩放多少**。

```js
window.resizeTo(100, 100); // 缩放到 100 x 100

window.resizeBy(100, 50); // 宽和高各扩大 100 和 50，新的大小为 200 x 150
```

### 2.3 视口位置
浏览器窗口尺寸通常无法满足完整显示整个页面，为此用户可以通过滚动在有限的视口中查看文档。**度量文档相对于视口滚动距离**的属性有两对，它们都放回相等的值，分别是：
+ `window.pageXoffset` 和 `window.pageYoffset`。
+ `window.scrollX` 和 `window.scrollY`。

当然，我们也可以通过 `scroll()`，`scrollTo()` 和 `scrollBy()` 方法滚动页面。这三个方法都接收表示相对视口距离的 `x` 和 `y` 坐标。
+ `scroll()` 和 `scrollTo()` 接收的两个参数表示**滚动到的页面坐标**。两个方法一样。
+ `scrollBy()` 接收的两个参数表示**相对于当前视口的滚动的距离**。

此外，这三个方法也可以只接受一个 `ScrollToOptions` 字典，字典里包含 `left`、`top` 和 `behavior` 三个属性，前两个表示距离，`behavior` 属性告诉浏览器**是否平滑滚动**，值可以是 `auto` 或 `smooth`。

```js
window.scroll(0, 0); // 滚动到页面左上角

window.scrollTo(100, 100); // 滚动到页面 100，100 的位置

window.scrollBy(0, 50); // 相对于当前视口向下滚动 50 像素

// 平滑滚动
window.scroll({
    left: 0,
    right: 0,
    behavior: 'smooth'
})

window.scrollBy({
    left: 50,
    right: 50,
    behavior: 'auto'
})

```

### 2.4 导航与打开新窗口
`window.open()` 方法可以用于**导航到指定的 `URL`** 或**打开浏览器新的窗口**。这个方法接收四个参数：
1. 要加载的 `URL`
2. 目标窗口名称（如果存在则打开，如果不存在则创建新的窗口并以此命名）
3. 特性字符串（用于指定新窗口包含的特性）
4. 表示新窗口在浏览器历史记录中是否替代当前加载页面的布尔值

通常我们一般只传前 3 个参数。举个例子：

```js
window.open('https://baidu.com', 'baidu');
```
我们要打开一个窗口名为 `baidu`，窗口的 `URL` 设置为 https://baidu.com。如果存在已有窗口名为 `baidu`，那么就会自动打开这个窗口，并传入 `URL`；如果不存在，则会创建一个新窗口，并命名为 `baidu`。

第三个参数是**特性字符串**，它是一个**逗号分隔的设置字符串**，用于**指定新窗口包含的特性**，下面列出一些选项：

设置|值|说明
:--:|:--:|:--:
fullscreen| yes 或 no |表示新窗口是否最大化。仅 IE 支持。
height|数值|新窗口高度。这个值不能小于100。
left|数值|新窗口的 x 坐标。这个值不能是负值。
location|yes 或 no|表示是否显示地址栏。
Menubar|yes 或 no|表示是否显示菜单栏，默认为 no。
resizable|yes 或 no|表示是否可以拖动改变新窗口大小，默认为 no。
scrollbars|yes 或 no|表示是否可以在内容过长时滚动，默认为 no
status|yes 或 no|表示是否显示状态栏。不同浏览器默认值不一样。
toolbar|yes 或 no|表示是否显示工具栏，默认值为 no。
top|数值| 新窗口的 y 轴坐标。这个值不能是负值。
width|数值|新窗口的宽度，这个值不能小于100。

这些设置需要**以逗号分隔的名值对形式出现**，其中名值对以等号连接：
```js
let baiduWindow = window.open('https://baidu.com', 'baidu', 'height=500,width=500,top=10,left=10,resizable=yes,scrollbars=yes');
```
`window.open()` 返回一个对新建窗口的引用，这个对象与普通 `window` 对象没有区别。我们可以通过该返回值，对窗口进行其他操作。如：

```js
baiduWindow.resizeTo(300, 300); // resize 窗口大小
baiduWindow.scroll(0, 100); // 视口滚动到距离文档左边0，距离顶部 100 的位置
baiduWindow.close(); // 关闭窗口
```

新建窗口的 window 对象有一个属性 opener 指向打开它的窗口。
```js
console.log(baiduWindow.opener === window); // true
```

### 2.5 系统对话框
使用 `alert()`、`confirm()` 和 `prompt()` 方法，可以让浏览器调用系统对话框向用户显示消息。

+ `alert()` 是**警告框**，用户唯一的选择就是在看到它后把它关闭。

+ `confirm()` 是**确认框**，用户看到之后可以有两个选择：**确定** 和 **取消**。而 **`confirm()` 方法将根据用户的选择返回 `true` 或 `false`**。

+ `prompt()` 是**提示框**，用户可以在提示框的文本框内输入内容。**点击确认按钮，输入内容将成为 `prompt()` 方法的返回值**。如果用户**点击取消，则提示框会消失，并返回 `null`**。