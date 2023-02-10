# Promise
`Promise` 由 ES6 提出，可以说是现在 JS 最主流的异步编程机制，**它既是同步对象，也是异步执行模式的媒介**。

## 1. 创建

ES6 新增了引用类型 `Promise`，可以通过 `new` 操作符来实例化。
```js
const p = new Promise((resolve, reject) => {...});
```

`Promise` 对象具有三种可能的状态：**`pending`**、**`fulfilled`** 和 **`rejected`**，它们分别表示 **待定**、**解决** 和 **拒绝**。把这三个概念放入异步请求中就很好理解，可以理解为：数据请求中... -> 请求成功 / 请求失败。

首先，`pending` 是 `Promise` 的最初始状态，之后 `Promise` 可以实现状态落定，即可以变为 `fulfilled`，也可以变为 `rejected`，这取决于我们执行的结果。需要注意的是，**一旦 `Promise` 状态落定后，就不可变了，也不可逆了**，这个 `Promise` 实例就只能一直是这个状态。

上面的代码中也可以看到，`new Promise` 会提供两个参数：`resolve` 和 `reject`，分别是控制期约状态转变的函数。调用 `resolve()` 会把状态变为 `fulfilled`，调用 `reject()` 会把状态变为 `rejected`。无论 `resolve` 和 `reject` 哪个被调用，期约的状态转换都不可撤销啊了。

此外，还有一点需要注意的是：`Promise` 后的执行器函数是同步执行的，因为执行器函数是期约的初始化程序。举个例子：
```js
console.log('console start');
setTimeout(() => {
    console.log('setTimeout');
}, 0)
new Promise((resolve, reject) => {
    console.log('promise');
})
console.log('console end');

/**
 * 输出结果：
 * console start
 * promise
 * console end
 * setTimeout
 */
```

## 2. 使用
下面将介绍 `Promise` 的使用方法。
### new
在第一点中已经声明了可以通过 `new` 来创造 `Promise` 实例。

其中 `resolve()` 和 `reject()` 可以实现期约对象的状态转变，每个期约只要状态切换为解决，就会有一个私有的内部值（value），这可以通过 `resolve(value)` 实现。类似地，每个期约只要状态切换为拒绝，就会有一个私有的内部值，我们也常把它称为理由（reason），这可以通过 `reject(reason)` 实现。

如果不给 `resolve()` 和 `reject()` 传入参数，其私有的内部值为 `undefined`。

```js
let p1 = new Promise((resolve, reject) => resolve('success'));
let p2 = new Promise((resolve, reject) => reject(Error('failed')));
let p3 = new Promise((resolve, reject) => reject());

console.log(p1); // Promise {<fulfilled>: 'success'}
console.log(p2); // Promise {<rejected>: Error: failed
console.log(p3); // Promise {<rejected>: undefined

// 加个延迟器，模拟数据请求，需要1000ms延迟
let p4 = new Promise((resolve, reject) => setTimeout(resolve, 1000, 'success'));

// 同步代码，立即输出。期约还处于 pending 状态
console.log(p4); // Promise {<pending>}

// 异步代码，等2000ms。此时期约已经调用了 resolve('success')，处于 fulfilled 状态
setTimeout(console.log, 2000, p4) // Promise {<fulfilled>: 'success'}
```

### Promise.resolve()
我们也可以直接调用 `Promise.resolve()` 静态方法来生成一个状态为 `fulfilled` 的期约实例对象。下面代码中的 `p1` 和 `p2` 实际上是相同的。  

```js
let p1 = new Promise((resolve, reject) => resolve('success'));
let p2 = Promise.resolve('success');
```

对于 `Promise.resolve()` 而言，传入的参数无论是什么类型的值，**都会被转换为一个期约，这个期约的内部值为我们传入的参数值**。然而，**如果传入的参数本身就是一个 `Promise`，那 `Promise.resolve()` 的行为类似于一个空包装，返回传入的 `Promise` 自身**。因此，该方法是一个幂等方法。

**注意**：如果传入的参数本身就是一个 `Promise` 实例，`Promise.resolve()` 也不会改变它的状态，它之前是什么状态，调用后返回的值也是什么状态。因为此时的 `Promise.resolve()` 的行为类似于一个空包装，不会产生作用。

```JS
let p1 = Promise.resolve(1);
console.log(p1 === Promise.resolve(p1)); // true

let p2 = new Promise((resolve, reject) => {})

console.log(p2); // Promise {<pending>}
console.log(Promise.resolve(p2)); // Promise {<pending>}
```

### Promise.reject()
与 `Promise.resolve()` 类似，`Promise.reject()` 会实例化一个拒绝的期约并抛出一个 **异步错误**。

**注意**：这个错误是异步错误，不可被同步代码的 `try/catch` 捕获，只能交给异步的拒绝处理程序捕获（下章会讲）。

此外，`Promise.reject()` 没有照搬 `Promise.resolve()` 的幂等逻辑。如果 `Promise.reject()` 中传入的参数是一个 `Promise` 实例对象，该方法会把这个期约对象当作是 **拒绝的理由** 并返回。看下面例子：

```js
// 这两种方法是一样的
let p1 = new Promise((resolve, reject) => reject(Error('failed')));
let p2 = Promise.reject(Error('failed'))

console.log(p1); // Promise {<rejected>: Error: failed}
console.log(p2); // Promise {<rejected>: Error: failed}

let p3 = Promise.reject(p1);
console.log(p1 === p3); // false
console.log(p3); // Promise {<rejected>: Promise}
```


