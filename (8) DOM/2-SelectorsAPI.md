# Selectors API

`Selectors API` 是**浏览器原生支持的 `CSS` 查询 `API`**，我们可以通过它根据 `CSS` 选择符查询 `DOM` 获取元素引用。

简而言之，它类似于 `document.getElementBy...` 等方法的功能：**获取 `DOM` 元素**。

## 1. querySelector()

`querySelector()` 方法接收 `CSS` 选择符参数，返回**匹配该模式的第一个后代元素**。如果没有匹配项则返回 `null`。如：

```js
// 取得标签名为<body>的元素
let body = document.querySelector('body');

// 取得 id 为 'myDiv' 的元素
let myDiv = document.querySelector('#myDiv');

// 取得类名（class）为 'selected' 的第一个元素
let selected = document.querySelector('.selected');

// 取得类名为 'button' 的 img
let img = document.querySelector('img.button');
```

在 `document` 上使用 `querySelector` 方法时，会**从文档元素开始搜索**；在某个元素上使用，则会**从当前元素的后代中查询**。

## 2. querySelectorAll()

`querySelectorAll()` 方法与 `querySelector()` 一样，接收一个**用于查询的参数**，不同的是它会返回**所有匹配的节点**。该方法返回的是一个 `NodeList` **静态实例**。

**静态实例**说明 `querySelectorAll()` 返回的 `NodeList` 对象是静态的 “快照”，而非 “实时查询”。

```js
// 取得所有 div 元素
let myDivs = document.querySelector('div');
// 取得类名（class）包含 'selected' 的所有元素
let selecteds = document.querySelectorAll('.selected');
```

对于返回的 `NodeList` 对象，我们可以使用 `for-of` 循环， `item()` 方法，或 `[]` 来取得某个元素。




