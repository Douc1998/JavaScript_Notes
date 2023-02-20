# XMLHttpRequest
`XMLHettpRequest` 对象可以实现 **在不刷新页面的情况下从服务器获取数据**。
我们可以通过 `new` 关键字来构造 `XMLHettpRequest` 对象。
```js
let xhr = new XMLHttpRequest();
```
## 1. XHR请求
### open()
使用 `XHR` 对象首先要调用 `open()` 方法，这个方法接收 3 个参数：
+ 请求类型(`get`、`post` 等)，必需。
+ 请求 `URL`，必需。
+ 表示请求是否异步的布尔值（`true`、`false`），可选。
```js
xhr.open('get', '/api/search?name1=value1&name2=value2', true);
```

###  send()

可以通过 `send()` 方法，将定义好的请求发送到服务器。这个方法接收一个参数：`string`，该参数 **可选**，仅用于 `post` 请求。

作为 `get` 类型的请求，不用加参数，或者加 `null` 即可。

```js
// get 请求
xhr.open('get', '/api/search?name1=value1&name2=value2', true);
xhr.send();

// post 请求
xhr.open('post', '/api/search', true);
xhr.send('name1=value1&name2=value2');
```

### abort()
在收到响应之前如果想取消异步请求，可以调用 `abort()` 方法：
```JS
xhr.abort();
```

## 2. HTTP 头部
每个 `HTTP` 请求和响应都会携带一些头部字段，这些字段可能对开发者有用。`XHR` 对象会通过一些方法暴露与请求和响应相关的头部字段。默认情况下，`XHR` 请求会发送以下头部字段：
+ Accept：浏览器可以处理的内容类型。
+ Accept-Charset：浏览器可以显示的字符集。
+ Accept-Encoding：浏览器可以处理的压缩编码类型。
+ Accept-Language：浏览器使用的语言。
+ Connection：浏览器与服务器的连接类型。
+ Cookie：页面中设置的 `Cookie`。
+ Host：发送请求的页面所在的域。
+ Referer：发送请求的页面的 `URI`。
+ User-Agent：浏览器的用户代理字段。

如果需要发送额外的头部信息，可以使用 `setRequestHeader()` 方法。这个方法接收两个参数：头部字段名称和值。为保证请求头部被发送，必须在 `open()` 之后，`send()` 之前调用 `setRequestHeader()` 方法。如下面的例子：
```js
xhr.open('get', '/api/search?name1=value1&name2=value2', true);
xhr.setRequestHeader('MyHeader', 'MyValue');
xhr.send();
```
当然，除了添加和设置头部，我们还可以使用 `getResponseHeader()` 方法从 `XHR` 对象中获取响应头部，只需要传入要获取头部的名称即可。如果想要获取所有响应头部，可以使用 `getAllResponseHeaders()` 方法，该方法会返回包含所有响应头部的字符串。

## 3. XHR响应
当请求发送到服务器后，服务器会返回响应 `response`，包含整个响应实体。返回的类型根据 `responseType` 而定，可以是 `ArrayBuffer`、`Blob`、`Documen`t，或 `DOMString`。

此外，返回响应后，`XHR` 以下属性会被填充上数据：

+ `responseText`：作为响应体返回的文本，包含对请求的响应，如果请求未成功或尚未发送，则返回 null。
+ `responseXML`：如果响应的内容类型是 “text/xml" 或 "application/xml"，那就是包含响应数据的 XML DOM 文档，
+ `status`：响应的 `HTTP` 状态。一般来说 `HTTP` 状态码为 2xx 表示成功，如果是 304 表示资源未修改过，是从浏览器缓存中直接拿取的，也意味着响应成功。400 表示未找到页面，500 表示服务器错误。
+ `statusText`：包含响应的HTTP状态描述。如果响应失败或错误，会返回对应的错误描述。

通过对上面一系列属性的描述，那么我们该如何处理响应的数据呢：
+ 第一步：检查 `status` 属性以确保响应成功返回。
+ 第二步：根据响应的成功和失败，做出响应的处理操作。
```js
if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){
    // ... 成功处理
}else{
    // ... 错误处理
}
```

## 4. XHR 状态

### readyState

XHR 对象有一个 `readyState` 属性，表示当前处在请求 / 响应过程的哪个阶段。这个属性有如下可能的值：
+ 0：**未初始化**。尚未调用 `open()` 方法。
+ 1：**已打开**。已调用 `open()` 方法，尚未调用 `send()` 方法。
+ 2：**已发送**。已调用 `send()` 方法，尚未收到响应。
+ 3：**接收中**。已经收到部分响应。
+ 4：**完成**。已经收到所有响应，可以使用了。

### onreadystatechange

每次 `readyState` 从一个值变为另一个值，都会触发 `onreadystatechange` 事件处理程序。一般来说，我们关心的 `readyState` 的值是 4，表示数据已就绪。因此，**我们可以在 `onreadystatechange` 事件中加入对 `readyState` 的判断，并在值为 4 时，加入上一节中对于响应的操作**。

为保证跨浏览器兼容，`onreadystatechange` 事件处理程序应该在 `open()` 方法之前赋值。举个例子：

```js
let xhr = new XMLHttpRequest();
// 状态改变的事件处理程序
xhr.onreadystatechange = function(){
    if(this.readyState === 4){
        // 处理响应
        if((this.status >= 200 && this.status < 300) || this.status == 304){
            console.log(this.response);
        }else{
            console.log(new Error(this.statusText));
        }
    }
    
}
xhr.open('GET', './myData/users.json', true);
xhr.send();
```
## 6. GET 请求

最常用的一般就是 `GET` 请求，用于向服务器查询某些信息。必要时，需要在 `GET` 请求的 `URL` 后面添加查询字符串参数，其格式为：`?..=..&..=..`。如先前举的例子：
```js
xhr.open('get', '/api/search?name1=value1&name2=value2', true);
```
## 7. POST 请求

第二个最常用的请求是 `POST` 请求，用于向服务器发送应该保存的数据。**每个 `POST` 请求都应该在请求体中携带提交的数据**，而 `GET` 请求不然。 `POST` 请求的请求体可以包含非常多的数据，而且数据可以是任意格式。

要初始化 `POST` 请求，`open()` 方法的第一个参数要传入 “post"，如：
```js
xhr.open('post', '/api/search', true);
```
接下来就是要给 `send()` 方法传入要发送的数据。如：
```js
xhr.send('name1=value1&name2=value2');
```

# XMLHttpRequest Level 2
在 `XMLHttpRequest Level 2` 中，增加了进度事件。
+ loadstart：在接收到响应的第一个字节时触发。
+ progress：在接受响应期间反复触发。
+ error：在请求出错时触发。
+ abort：在调用 `abort()` 终止连接时触发。
+ load：**在成功接收完响应时触发**。
+ loadend：在通信完成时，且在 `error`、`abort`、`load` 之后触发。

这些进度事件名称前加上 `on` 就是对应的事件处理程序，如：`onloadstart`、`onprogress`、`onerror`、`onabort`、`onload`、`onloadend`。我们可以在其中设置相应的事件处理语句。

这里使用最多的还是 `onload`，它可以代替上面提到的 `onreadystatechange()` 事件，并且不用判断 `readyState === 4`。因此，刚刚利用 `onreadystatechange()` 处理程序的代码可以改为：

```js
let xhr = new XMLHttpRequest();
xhr.onload = function(){ // 代替了 onreadystatechange 事件，无需判断 readyState
    if((this.status >= 200 && this.status < 300) || this.status == 304){
        console.log(this.response);
    }else{
        console.log(new Error(this.statusText));
    }
}
xhr.open('GET', './myData/users.json', true);
xhr.responseText = 'json';  // 可以设置 responseTest 为 json，返回响应就会是 json 格式。
xhr.send();
```

除了 `onload()` 事件，也可以根据需求设置上面其他的事件处理程序。