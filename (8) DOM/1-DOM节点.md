# DOM 节点
`DOM` 表示由**多层节点构成的文档**。我们页面文档中的每一部分都是一个 `DOM` 节点。从最外部的 `html` 标签，到 `head`、`body` 及其内部的其他元素。

`document` 节点表示每个文档的**根节点**，根节点的唯一子节点是 `<html>` 元素，我们称之为**文档元素**，每个文档也只能有一个文档元素。

## 1. 节点关系

每个节点都有一个 `childNodes` 属性，其中包含一个 **`NodeList` 的实例**。`NodeList` 是一个**类数组**对象，用于存储可以按位置存取的**有序节点**。

注意，`NodeLsit` 并不是 `Array` 的实例，但是可以使用**中括号**访问它的值，而且它也有 `length` 属性。`NodeList` 的独特点在于它其实是一个对 `DOM` 结构的查询，因此 `DOM` 结构的变化会自动地在 `NodeList` 中反映出来。

```js
let firstChild = someNode.childNodes[0]; // 第一个孩子节点
let secondChild = someNode.childNodes.item(1); // 第二个孩子节点
let len = someNode.childNodes.length; // 长度
```

当然，我们也可以用 `Array.from` 让 `NodeList` 变为数组形式。

每个节点还有 `parentNode` 属性，**指向其父元素**。还有 `previousSibling` 和 `nextSibling` 属性，分别指向它们的**前一个和后一个兄弟节点**。父节点的 `firstChild` 和 `lastChild` 属性指向它的第一个子节点和最后一个子节点。

## 2. 操纵节点

我们可以通过 `appendChild()` 、 `insertBefore()`、`replaceChild()` 和 `removeChild()` 方法来**操纵子节点**。
+ **`appendChild()`**：在 `childNodes` 列表末尾添加节点。返回新添加的节点。
+ **`insertBefore()`**：在 `childNodes` 列表中某个位置插入节点，接收两个参数：要插入的节点和参照节点。该方法会在参照节点前一个位置插入。返回新插入的节点。
+ **`replaceChild()`**：替换 `childNodes` 列表中的某个节点，接收两个参数：要插入的节点和要替换的节点。返回替换的节点。
+ **`removeChild()`**：移除 `childNodes` 列表中的指定节点。返回删除的节点。

## 3. 获取元素
当我们需要取得某个 `html` 元素时，我们可以通过以下方法实现：

+ **`getElementById()`**：通过 `id` 属性获取。如果存在多个相同 `id` 属性的元素，则会返回在文档中出现的**第一个**。
+ **`getElementByTagName()`**：通过**标签名称**（如 `div`, `p` 等等）获取。返回一个 **`NodeList` 列表**。
+ **`getElementByName()`**：通过 `name` 属性获取。返回具有给定 `name` 属性的**所有元素**，也是 **`NodeList` 列表**。
+ **`getElementByClassName()`**：通过 `class` 属性获取。返回**包含** `class` 属性的**所有元素**，也是 **`NodeList` 列表**。

## 4. 元素属性
`HTML` 元素有一系列标准属性，如下：
属性|说明
:--:|:--:
id|元素在文档中的唯一标识符
title|包含元素的额外信息，通常以提示条形式展示
lang|元素内容的语言代码
dir|语言的书写方向
className|相对于 `class` 属性，用于指定元素的 `CSS` 类。（为了避免和 `js` 的类 `class` 混淆）

## 5. 创建元素
可以使用 `document.createElement()` 方法来**创建新元素**。这个方法接收一个参数，即**要创建元素的标签名**。

创建完毕后，我们可以手动给元素添加属性，如 `id`，`className` 等。如：
```js
// 创建 div 标签
let div = document.createElement('div');
div.id = 'xxx';
div.className = 'xxx';

// 创建 img 标签
let img = document.createElement('img');
img.id = 'xxx';
img.src = '...';
img.height = 100;
img.width = 100;
```

当我们全都设置完毕后，就考虑**将元素插入到 `DOM` 树中**。此时，我们需要使用 `appendChild()` 方法了。(可以根据需求调用 第 2 节中的其他方法)

```js
// 获取要插入位置的父节点
let parent = document.getElementById('parent');
// 插入在父节点的 childNodes 尾部
parent.appendChild(div);
```