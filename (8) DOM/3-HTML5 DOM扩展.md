# HTML5 DOM 扩展

`HTML5` 提供了一些 `DOM` 扩展方法，让我们操作 `DOM` 更加方便。

## 1. innerHTML 属性
在读取 `innerHTML` 属性时，会返回**元素所有后代的 `HTML` 字符串，包括元素，注释和文本节点**。

如果在写入 `innerHTML` 时，则会根据提供的字符串**以新的 `DOM` 子树替代元素中原来包含的所有节点。

比如以下的 `html` 代码：
```html
<div class="back" id="myDiv">
    <button id='button1' onclick="open()">open</button>
    <button id='button2' onclick="close()">close</button>
    <canvas id="draw" width='200px' height='200px' style="background-color: palegoldenrod;"></canvas>
</div>
```

对于这里 `div` 元素而言，其 `innerHTML` 属性会返回**由下面内容组成的字符串**：

```html
<button id='button1' onclick="open()">open</button>
<button id='button2' onclick="close()">close</button>
<canvas id="draw" width='200px' height='200px' style="background-color: palegoldenrod;"></canvas>
```

在写入模式下，赋给 `innerHTML` 属性的值会被解析为 `DOM` 子树，并**替代元素之前拥有的所有节点**。r如果赋值中不包含任何 `html` 标签，则直接生成一个**文本节点**。举个例子：

```js
// div的内部元素被替换为以下本文内容
div.innerHTML = 'Hello World!';

// div的内部元素被替换为以下 DOM 节点
div.innerHTML = '<p id=\"text\"> Hello World!</p>';
```
当我们设置完 `innerHTML` 之后，可以马上访问这些新的节点。

## 2. outerHTML 属性
读取 `outerHTML` 属性时，会返回**调用它的元素（及其所有后代元素）的 `HTML` 字符串**。

```html
<div class="back" id="myDiv">
    <button id='button1' onclick="open()">open</button>
    <button id='button2' onclick="close()">close</button>
    <canvas id="draw" width='200px' height='200px' style="background-color: palegoldenrod;"></canvas>
</div>
```
还是上面的例子，如果我们对 `div` 调用 `outerHTML`，得到的是由上面内容组成的字符串，包括 `<div>` 自身。

如果写入 `outerHTML` 属性，那么**调用它的元素会被传入 `HTML` 字符串经解释后生成的 `DOM` 子树替代**。举个例子：

```js
// div 将会被 p 替代
div.outerrHTML = '<p>Hello World!</p>';

// 上面代码等同于下面方法
let p = document.createElement('p');
p.appendChild(document.createTextNode('Hello World!'));
div.parentNode.replaceChild(p, div);
```

## 3. children 属性
`children` 属性是一个 `HTMLCollection`，它只包含**元素的 `Element` 类型的子节点**。如果元素的子节点类型全是元素类型，那么 `children` 和 `childNodes` 中包含的节点是**一样**的。

我们知道如果 `html` 标签中包括空格（换行）或者文字，其对应的 `childNodes` 中将会包含 `Text` 类型的节点。如：

```html
<div class="back" id="myDiv">
    <button id='button1' onclick="open()">open</button>
    <button id='button2' onclick="close()">close</button>
    <canvas id="draw" width='200px' height='200px' style="background-color: palegoldenrod;"></canvas>
</div>
```
我们获取 `<div>` 标签的 `childNodes`：
```js
// 获取 div 节点
let div = document.querySelector('#myDiv');
console.log(div.childNodes); 
// NodeList(7) [text, button#button1, text, button#button2, text, canvas#draw, text]
```
从上面的结果可以看到，`NodeList` 的长度为 7，包含了一系列 `Text` 类型的元素，这就是空格和文本导致的。

我们再看看 `children` 属性的差别：

```js
console.log(div.children); 
// HTMLCollection(3) [button#button1, button#button2, canvas#draw]
```

`children` 属性不包括 `Text` 类型的节点，只有 `Element` 类型的节点。

我们也以**通过 `[]` 或 `length` 属性获取 `children` 属性的元素信息**。

## 4. contains()
`DOM` 编程中经常需要**确定一个元素是不是另一个元素的后代**，那么我们可以使用 `contains()` 方法。该方法应该**在要搜索的祖先元素上调用**，参数是**待确定的目标节点**。如：

```js
// 获取祖先节点 div 
let div = document.querySelector('#myDiv');
// 获取子节点 canvas
let canvas = document.querySelector('#draw');
console.log(div.contains(canvas));  // true
```

## 5. scrollIntoView()
`scrollIntoView()` 能够实现**滚动到页面中的某个区域**，或**让某个元素进入视口**。这个方法的参数可以是以下两者之一，或没有。

+ `alignToTop` 是一个布尔值。（可选）
   + `true`：窗口滚动后元素的顶部与视口顶部对齐。等效的 `scrollIntoViewOptions` 属性对应为`{block: "start", inline: "nearest"}`。这是这个参数的默认值。
   + `false`：窗口滚动后元素的底部与视口底部对齐。等效的 `scrollIntoViewOptions` 属性对应为`{block: "end", inline: "nearest"}`。
+ `scrollIntoViewOptions` 是一个选项对象。
   + `behavior`：定义过渡动画，可选的值为 `smooth` 和 `auto`。默认为 `auto`。
   + `block`：定义垂直方向的对齐。`start`, `center`, `end`, 或 `nearest` 之一。默认为 `start`。
   + `inline`：定义水平方向的对齐。`start`, `center`, `end`, 或 `nearest` 之一。默认为 `nearest`。

不传参数等同于 `alignToTop` 为 `true`。下面举例：

```js
// 获取节点
let div = document.querySelector('#myDiv');
// 执行不同的滚动操作
div.scrollIntoView();
div.scrollIntoView(false);
div.scrollIntoView({block: "end"});
div.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
```