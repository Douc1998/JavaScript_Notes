# Fetch API

`Fetch API` 能够执行 `XMLHttpRequest` 对象的所有任务，但**更容易使用，接口也更加现代化**。不过，`XMLHttpRequest` 可以选择同步或者异步，而 `Fetch API` 则**必须是异步**的。

`Fetch API` 是基于 `promise` 实现的，提供了一个全局 `fetch()` 方法来跨网络异步获取资源。`Fetch` 是对 `HTTP` 接口的抽象，它能够拆分成多个部分，包括 `Request`、`Response`、`Headers`、`Body`，因此也更加灵活。

## 基本用法

### 1. 分派请求

`fetch()` 方法有两个参数:
1. input：通常情况下这个参数是请求资源的 `URL`。（必需）
2. init：`init` 对象包含一系列参数及其对应的值，后面会详细介绍（可选）

`fetch()` 方法会**返回一个 `promise` 对象**。在请求完成、资源可用时，期约会解决为一个 `Response` 对象。这个对象是API的封装，可以通过它获取相应的资源。如：

```js
fetch('./myData/users.json').then((response) => {
    console.log(response); // Response {type: 'basic', url: 'http://127.0.0.1:5500/Test/myData/users.json', redirected: false, status: 200, ok: true, …}
})
```

### 2. 读取响应
读取响应内容的最简单方式是取得纯文本格式的内容，这要用到 `text()` 或 `json()` 方法。

这个方法返回一个 `promise`，会解决为取得资源的完整内容。
`text()` 方法得到的内容是 `string` 格式，`json()` 方法得到的内容则是 `json` 格式。

```js
fetch('./myData/users.json')
    .then((response) => response.json())
    .then((data) => console.log(data))
// ./myData/users.json 的内容
```

### 3. 处理状态码和请求失败

`Fetch API` 支持通过 `Response` 的 `status` 和 `statusText` 属性检查响应状态。成功获取相应的请求通常会产生值为 200 的状态码。如下所示：

```js
fetch('./myData/users.json')
    .then((response) => {
        console.log(response.status); // 200
        console.log(response.statusText) // OK
    })

fetch('./myData/notExist.json')
    .then((response) => {
        console.log(response.status); // 404
        console.log(response.statusText) // Not Found
    })
```

看到上面的例子，可能会产生一个疑问：**请求失败不应该是 `rejected` 状态的期约并且需要捕获错误吗？**。

no ! no ! no ! 虽然请求失败，但都只执行了期约的解决处理函数。事实上，换个思路，**只要服务器返回了响应，`fetch()` 的期约都会解决，哪怕这个响应可能是请求失败，这么一想很显然是合理的**。

### 4. 自定义 init
上面提到了 `fetch()` 方法的第二个参数：**`init` 对象**。如果我们只是用第一个参数（`URL`），那么就会发送 `GET` 请求。如果要进一步配置请求的相关参数，需要在 `init` 对象中进行配置。

下面列几个 `init` 对象几个比较重要的参数，其他更详细的参数说明请看书 P 725-728。

键|值
:--:|:--:
method|用于**指定 `HTTP` 请求方法**。如：`GET`、`POST`、`PUT`、`DELETE`、`HEAD` 等，默认为 `GET`。
body|指定**使用请求体时请求体的内容**。必须是 `Blob`、`BufferSource`、`FormData`、`URLSearchParams`、`ReadableStream`、`String` 的实例。（`GET` 和 `HEAD` 方法中不能包含 body。
headers|用于**指定请求头部**。必须是 `Headers` 对象实例或包含字符串格式键/值对的常规对象。
mode|用于**指定请求模式**。这个模式决定来自跨域请求的响应是否有效。必须是以下字符串值之一：`cors`、`no-cors`、`same-origin`、`navigate`。

### 5. 常见的请求模式

#### 5.1 请求体中以 JSON 发送参数。

可以像下面这样发送简单 `JSON` 字符串：
```js
// body 部分
let payload = JSON.stringify({
    foo: 'bar'
});

// headers 部分设置 json 模式
let jsonHeaders = new Headers({
    'Content-Type': 'application/json'
});

fetch('./myData/users.json', {
    method: 'POST', // 发送请求体时必须使用一种 HTTP 方法
    body: payload,
    headers: jsonHeaders
})
```

#### 5.2 请求体中直接发送参数
因为请求体支持任意字符串值，所以可以直接通过它发送请求参数。
```js
// body 部分
let payload = 'foo=bar&baz=qux';

// headers 部分设置 字符串 模式
let stringHeaders = new Headers({
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
});

fetch('./myData/users.json', {
    method: 'POST', // 发送请求体时必须使用一种 HTTP 方法
    body: payload,
    headers: stringHeaders
})
```

#### 5.3 发送跨域请求

从不同的域请求数据，响应要包含 `CORS` 头部才能保证浏览器收到响应。否则，跨域请求会失败并抛出错误。

在通过构造函数手动创建 `Request` 实例时，`mode` 默认为 `cors`；否则，默认为 `no-cors`。

```js
fetch('http://www.liulongbin.top:3006/api/getbooks', {
    method: 'GET', 
    mode: 'same-origin'
}).then(response => response.text()).then(data => console.log(data))
// test.js:49 Fetch API cannot load http://www.liulongbin.top:3006/api/getbooks. Request mode is "same-origin" but the URL's origin is not same as the request origin

fetch('http://www.liulongbin.top:3006/api/getbooks', {
    method: 'GET', 
    mode: 'cors'
}).then(response => response.text()).then(data => console.log(data))
// [{"id":1,"bookname":"西游记","author":"吴承恩","publisher":"北京图书出版社"},{"id":2,"bookname":"红楼梦","author":"曹雪芹","publisher":"上海图书出版社"},{"id":3,"bookname":"三国演义","author":"罗贯中","publisher":"北京图书出版社"}]

fetch('http://www.liulongbin.top:3006/api/getbooks', {
    method: 'GET', 
    mode: 'no-cors'
}).then(response => response.text()).then(data => console.log(data))
// 空白 （响应类型时 opaque，意思是不能读取相应内容，因此console.log是空白）
```

#### 5.4 中断请求

`Fetch API` 没有提供像 `abort()` 方法来中断请求。但是支持通过 `AbortController/AbortSignal` 中断请求。

调用 `AbortController.abort()` 会**中断所有网络传输**，适合希望停止传输大型负载的情况。中断进行的 `fetch()` 请求会导致包含错误的拒绝 `Promise`。

```js
let abortController = new AbortController();

fetch('./wikipedia.zip', {
    signal: abortController.signal
}).catch((e) => console.log(e));

// 10ms 后中断请求
setTimeout(() => abortController.abort(), 10);

// 已经中断
```

