# Fetch API

在上一节中提到，`Fetch` 是对 `HTTP` 接口的抽象，它能够拆分成多个部分，包括 `Request`、`Response`、`Headers`、`Body`，因此也更加灵活。下面将详细介绍各对象和使用方法。

## Headers 对象
`Headers` 对象是所有外发请求和入栈响应头部的容器。每个外发的 `Request` 实例都包含一个空的 `Headers` 实例，可以在其中添加一些我们的头部信息。此外，我们可以使用 `new Headers()` 创建实例。
```js
let h = new Headers();
```

`Headers` 对象与 `Map` 对象极为相似，都是 **键/值对** 类型的数据解构。`Headers` 对象也拥有 `get()` `set()` `has()` 和 `delete()` 等实例方法。这里不详细介绍这四个方法。

但是，`Headers` 并不是与 `Map` 处处都一样，在初始化 `Headers` 对象时，也可以使用键值对形式的对象，而 `Map` 不可以。

```js
let seed = {foo : 'bar'};

let h = new Headers(seed);
console.log(h.get('foo')); // bar

let m = new Map(seed); // Uncaught TypeError: object is not iterable
```

此外，一个 `Http` 头部的一个字段可以对应多个值，而 `Headers` 对象可以通过 `append()` 方法添加多个值，会用分隔符隔开每个值。在 `Headers` 实例中还不存在的头部上调用 `append()` 方法相当于调用 `set()` 方法。

```js
let h = new Headers();

h.append('foo', 'bar');
console.log(h.get('foo')); // bar
h.append('foo', 'baz');
console.log(h.get('foo')); // bar, baz
```

## Request 对象
`Request` 对象是获取资源请求的接口。这个接口暴露了请求的相关信息，也暴露了使用请求体的不同方式。

### 1. 创建 Request 对象
可以通过构造函数初始化 `Request` 对象，为此需要传入一个 `input` 参数，一般是`URL`。也可以第二个参数（可选）：`init` 对象，这与上一节介绍的 `fetch()` 的 `init` 完全对象一样。我们可以在 `Request` 中添加 `init` 对象，从而**把 `Request` 对象作为参数加入到 `fetch()` 方法**中，从而不再需要在 `fetch()` 中添加 `init` 对象了。

```js
let r1 = new Request('http://foo.com');

console.log(r1);  // Request {method: 'GET', url: 'http://foo.com/', headers: Headers, destination: '', referrer: 'about:client',mode: 'cors' …}

let payload = JSON.stringify({
  foo: 'bar'
});

let jsonHeaders = new Headers({
  'Content-Type': 'application/json'
});

let r2 = new Request('http://bar.com', {
  method: 'POST',
  body: payload,
  mode: 'no-cors',
  headers: jsonHeaders,
});

console.log(r2); // Request {method: 'POST', url: 'http://bar.com/', headers: Headers, destination: '', referrer: 'about:client',mode: 'no-cors' …}
```

### 2. 在 fetch() 中使用 Request 对象
`fetch()` 和 `Request` 的构造函数拥有相同的函数签名。实际上，在调用 `fetch()` 时，可以传入已经创建好的 `Request` 实例而不是 `URL`。与 `Request` 构造函数一样，传给 `fetch()` 的 `init` 对象会覆盖传入请求对象的值。

意思就是，**如果传入的 `Request` 实例在构造时添加了 `init` 对象相关参数，那么如果在 `fetch()` 中第一个参数传入了该 `Request` 对象，第二个参数继续配置 `init` 对象，则会覆盖 `Request` 对象的 `init` 设置**。

```js
let r = new Request('http://foo.com', {
  method: 'GET'
});

fetch(r); // 可以直接在 fetch() 方法中加入 Request 对象

fetch(r, { method: 'POST' }); // 实际上的请求 method 会被覆盖为 POST
```

## Response 对象
顾名思义，`Reponse` 对象是获取资源响应的接口。这个接口暴露了响应的相关信息，也暴露了使用响应体的不同方式。

### 1. 创建 Response 对象
可以通过构造函数初始化 `Response` 对象且不需要参数。此时响应实例的属性均为默认值，因为它不代表实际的 `HTTP` 响应。
```js
let r = new Response();
console.log(r); // Response {type: 'default', url: '', redirected: false, status: 200, ok: true, …}
```

`Response` 构造函数可以接收两个参数，一个是可选的 `body` 参数，等同于 `fetch()` 参数 `init` 中的 `body`。另一个是可选的 `init` 对象，这个对象可以包含三个键值对：
+ headers: `Headers` 对象实例或包含字符串键值对的常规对象实例。
+ status: `HTTP` 响应状态码，默认为 200。
+ statusText: `HTTP` 响应状态的描述。

```js
let r = new Response('foobar', {
  status: 404,
  statusText: 'Not Found'
});
console.log(r); // Response {type: 'default', url: '', redirected: false, status: 404, ok: false, …}
```
### 2. fetch() 返回 Response
上面说了这么多，实际上在大多数情况下，**产生 `Response` 对象的主要方式还是调用 `fetch()` 方法**，它**返回一个解决为 `Response` 对象的期约**。

```js
fetch('http://www.liulongbin.top:3006/api/getbooks').then(response => console.log(response));
// Response {type: 'cors', url: 'http://www.liulongbin.top:3006/api/getbooks', redirected: false, status: 200, ok: true, …}
```

### 3. 其他方法
`Response` 类还有两个用于生成 `Response` 对象的**静态方法**：`Response.redirect()` 和 `Response.error()`。

这两个方法也顾名思义，`Response.redirect()` 是接收一个 `URL` 和一个重定向状态码（301-303、307、308），返回重定向的 `Response` 对象。
```js
console.log(Response.redirect('https://foo.com', 301)); // Response {type: 'default', url: '', redirected: false, status: 301, ok: false, …}
```
`Response.error()` 用于产生表示网络错误的 `Response` 对象（**网络错误会导致 `fetch()` 期约被拒绝**）。
```js
console.log(Response.error()); // Response {type: 'error', url: '', redirected: false, status: 0, ok: false, …}
```

## Request、Response及Body混入
`Request` 和 `Response` 都使用了 `Fetch API` 的 `Body` 混入，以实现两者承担有效载荷的能力。

简而言之，就是这个混入为这两个类型提供了**只读的 `body` 属性、只读的 `bodyUsed` 布尔值和一组方法**，这些方法可以用于**从流中读取内容并将结果转为某种 `JavaScript` 对象类型**。

### 1. .text()
**该方法返回期约，解决为将缓冲区转存得到的 `UTF-8` 格式字符串**。

```js
fetch('https://foo.com')
  .then(response => response.text()) // string 字符串格式的数据
  .then(data => console.log(data)); // String '{foo: bar}'
```
### 2. .json()
**该方法返回期约，解决为将缓存区转存得到的 `JSON` 对象**。

```js
fetch('https://foo.com')
  .then(response => response.json()) // JSON 对象格式的数据
  .then(data => console.log(data)); // JSON {'foo': 'bar'} 
```

### 3. .formData()

**该方法返回期约，解决为将缓存区转存得到的 `FormData` 实例**。

```js
fetch('https://foo.com')
  .then(response => response.formData()) // formData 表单形式的数据
  .then(data => data.get('foo'));  // bar
```

### 4. .arrayBuffer()

**该方法返回期约，解决为将缓存区转存得到的 `ArrayBuffer` 实例**。

```js
fetch('https://foo.com')
  .then(response => response.arrayBuffer()) // 二进制格式的数据，可以查看和修改
  .then(data => console.log(data));  // ArrayBuffer(...)
```

### 5. .blob()

**该方法返回期约，解决为将缓存区转存得到的 `Blob` 实例**。

```js
fetch('https://foo.com')
  .then(response => response.blob()) // 二进制格式的数据，不能查看和修改
  .then(data => console.log(data)); // Blob(...)
```

