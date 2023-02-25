# location 对象
`location` 对象提供了当前窗口**加载文档的信息**，以及通常的导航功能。这个对象独特的地方在于，它既是 `window` 对象的属性，也是 `document` 的属性。也就是说 `window.location` 和 `document.location` 指向同一个对象。

`location` 对象不仅保存着当前加载文档的信息，也保存着把 `URL` 解析为离散片段后能够通过属性访问的信息。

假设浏览器当前加载的 `URL` 是 `http://foouser:barpassword@www.wrox.com:80/Wiley/?q=javascript#content`，`location` 对象的内容如下表所示：

属性|值|说明
:--:|:--:|:--:
location.hash| "#content" | `URL` 散列号（井号后跟零或多个字符），如果没有则为空字符串
location.host|"www.wrox.com:80" |服务器名及端口名
location.hostname|"www.wrox.com"|服务器名
location.href|"http://user:password@www.wrox.com:80/Wiley/?q=javascript#content"|当前加载页面的完整 `URL`。`location` 的 `toString()` 方法返回这个值
location.pathname|"/Wiley/"|`URL` 中的路径和（或）文件名
location.port|"80"|请求的端口。如果 `URL` 中没有端口，返回空字符串
location.protocol"http:"|页面使用的协议，通常是 `http` 或 `https`
location.search|"??q=javascript"|`URL` 的查询字符串，以问好开头
location.username|"user"|域名前指定的用户名
location.password|"password"|域名前指定的密码
location.origin|"http://www.wrox.com"|`URL` 的源地址。只读

## 1. 查询字符串
从上表可知，我们可以通过 `location.search` 属性获取到查询字符串。我们可以通过**字符串解析**的方法来解析查询的键值对。

但很显然，这种方法不够方便。因此， `URLSearchParams` 提供了一组标准 `API` 方法，通过它们可以检查和修改查询字符串。

给 `URLSearchParams` 构造函数传入一个查询字符串，就可以创建一个实例（类似于 `Map`）。这个实例上暴露了 `get()`、`set()` 和 `delete()` 等方法，可以对查询字符串执行相应操作。

```js
let qs = "?q=javascript&value=100";

let searchParams = new URLSearchParams(qs);

console.log(searchParams.has('q')); // true
console.log(searchParams.get('q')); // javascript

searchParams.set('name', 'dou');
searchParams.delete('q');

console.log(searchParams.toString()); // value=100&name=dou
```

## 2. 操作地址
我们可以通过修改 `location` 对象属性来修改浏览器的地址。比如修改 `URL`，我们可以有三种方法；
+ location.assign(URL)
+ location.href = URL
+ window.location = URL

```js
location.assign('https://baidu.com');
location.href = 'https://baidu.com';
window.location = 'https://baidu.com';
```

上面的方法用得比较多的还是**设置 `location.href`**。使用了上面的方法，**浏览器会立即导航到新的 `URL`，同时在浏览器历史记录中增加一条记录**。

如果我们不希望增加浏览器历史记录，那么可以使用 `location.replace(URL)` 的方法即可。

注意，除了 `hash` 属性之外，只要修改 `location` 的任意一个属性，就会导致页面重新加载新 `URL`。因此，修改 `location` 属性要格外的注意。

