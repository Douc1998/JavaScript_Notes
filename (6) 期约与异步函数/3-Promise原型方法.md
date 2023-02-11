# Promise 原型方法
`Promise` 的原型方法是 **连接同步代码和内部异步代码之间的桥梁**。这些方法可以访问异步操作返回的数据，处理期约成功和失败的结果。

## 1. 实现 thenable 接口
在 `ECMAScript` 暴露的异步结构中，任何对象都有一个 `then()` 方法。这个方法被认为实现了 `Thenable` 接口，举个例子：

```js
class MyThenable{
    then(resolve, reject){
        ... // 其他代码
    }
}
```

由上可知，具有 `thenable` 接口的对象或者函数，它们的 `then` 方法中有 `resolve` 和 `reject` 两个参数，分别对应了期约的解决和拒绝的方法。

这里只是简单举个例子，在后面还会谈到 `thenable` 接口的用途和目的。

## 2. Promise.prototype.then()

当 `Promise` 由 `pending` 状态转为 `fulfilled` 或者 `rejected` 状态后，可以调用 `then()` 方法。`then()` 方法最多接收两个参数，分别是：`onFulfilled` 和 `onRejected` 处理程序。这两个参数都是可选的，如果都提供的话，**期约会根据自身的状态进入对应的处理程序中**。

```js
// 期约变为解决状态的回调函数
function onFulfilled(value){
    setTimeout(console.log, 1000, value);
}
// 期约变为拒绝状态的回调函数
function onRejected(reason){
    setTimeout(console.log, 1000, reason);
}

let p1 = Promise.resolve('success !');
let p2 = Promise.reject(Error('failed !'));

p1.then((value) => onFulfilled(value), (e) => onRejected(e)); // success !
p2.then((value) => onFulfilled(value), (e) => onRejected(e)); // Error: failed !
```

如果只想设置一个处理程序，可以把另外一个处理程序对应位置的参数设置为 `null`。
```js
// 不传 onFulfilled 处理程序的规范写法
p.then(null, (e) => {
    ... // 处理代码
})
// 不传 onRejected 处理程序时，可以只写一个 onFulfilled 处理程序，或者在后面再加个 null
p.then((value) => {
    ... // 处理代码
})
```

`Promise.prototype.then()` 方法会返回一个**新的期约实例**，**这个返回的期约实例和调用 `then()` 方法的期约并不是同一个**。(可能各种值相等，但不是同一个！)

这个新的期约实例基于 `onFulfilled` 或者 `onRejected` 处理程序的返回值构建，即：**调用 `Promise.resolve()` 包装处理程序的返回值生成一个新期约**。没错，不管是解决的期约，还是拒绝的期约，都会用 `Promise.resolve()` 包装并返回新期约。

换而言之，状态为 `fulfilled` 的期约 `p1` 调用 `then()` 方法，就会进入 `onFulfilled` 处理程序中，然后 `p1.then()` 的值为 **用 `Promise.resolve()` 包装 `onFulfilled` 处理程序的返回值得到的一个新期约**。状态为 `rejected` 的期约 `p2` 调用 `then()` 方法，就会进入 `onRejected` 处理程序中，然后 `p2.then()` 的值为 ** **用 `Promise.resolve()` 包装 `onRejected` 处理程序的返回值得到的一个新期约**。

如果对 `Promise.resolve()` 不够了解，请查看 [Promise基础](https://github.com/Douc1998/JavaScript_Notes/blob/main/(6)%20%E6%9C%9F%E7%BA%A6%E4%B8%8E%E5%BC%82%E6%AD%A5%E5%87%BD%E6%95%B0/2-Promise%E5%9F%BA%E7%A1%80.md) 进行学习。 [Promise基础](https://github.com/Douc1998/JavaScript_Notes/blob/main/(6)%20%E6%9C%9F%E7%BA%A6%E4%B8%8E%E5%BC%82%E6%AD%A5%E5%87%BD%E6%95%B0/2-Promise%E5%9F%BA%E7%A1%80.md) 中讲解了 `Promise.resolve()` 包装功能及其返回的对应结果。但这里和单纯使用 `Promise.resolve()` 包装略有不同，因为 `then()` 方法返回的永远是一个新期约，如果想和先前相同的期约判等，一定是不等的！

这里再总结一下各种情况：

+ 如果处理程序没有返回值，则 `Promise.resolve()` 会包装默认的返回值 `undefined`，并返回一个解决的 **新期约**。
+ 如果处理程序返回某个值，则 `Promise.resolve()` 会包装该值，并返回一个解决的 **新期约**。
+ 如果处理程序返回一个期约，则返回与之相同的 **新期约**，但两者不相等。
+ 如果处理程序中抛出异常，则会**返回状态为拒绝的新期约**。
+ 如果处理程序中返回错误值，则 `Promise.resolve()` 会包装错误对象，返回一个解决的 **新期约**。
+ 如果 `then()` 方法中没有处理程序，为空，则会返回和这个调用 `then` 的期约相同的 **新期约**，但两者不等。

针对五种情况，分别举例说明：

```js
let p = Promise.resolve('p'); // Promise {<fulfilled>: 'p'}

let pt = Promise.reject('p3'); // Promise {<rejected>: 'p3'}

let p1 = p.then(() => {}); // Promise {<fulfilled>: undefined}

let p2 = p.then(() => {return 'p2'}); // Promise {<fulfilled>: 'p2'}

let p3 = p.then(() => {return pt}); // Promise {<rejected>: 'p3'}

let p4 = p.then(() => {throw 'p4'}); // Promise {<rejected>: 'p4'}

let p5 = p.then(() => {return Error('p5')}); // Promise {<fulfilled>: Error: p5}

let p6 = p.then(); // Promise {<fulfilled>: 'p'}

// 虽然返回相同的值，但是两个对象不相等。
setTimeout(console.log, 0, p3 === pt); // false

setTimeout(console.log, 0, p6 === p); // false
```

`onFulfilled` 和 `onRejected` 处理程序返回的值都采用上述的规则。

## 3. Promise.prototype.catch()
`Promise.prototype.catch()` 方法用于给期约添加拒绝处理程序。这个方法只接收一个参数：`onRejected` 处理程序。

事实上，这个方法就是一个语法糖，调用它就相当于调用 `Promise.prototype.then(null, onRejected)`。因此，`catch` 方法也返回一个新的期约实例，遵守上述的返回规则。

## 4. Promise.prototype.finally()

`Promise.prototype.finally()` 方法用于给期约添加 `onFinally` 处理程序，这个处理程序**无论在期约转换为解决或拒绝状态，都会执行**。

这个方法可以避免 `onFulfilled` 和 `onRejected` 处理程序中出现重复代码，常用于添加清理代码。

`finally` 方法也会返回一个新的期约实例，但是这个期约实例不同于 `then()` 和 `catch()` 方法返回的实例。因为 `onFinally` 被设计为一个状态无关的方法，所以在大多数情况下，他都会表现为父期约的传递，即**与父期约的状态和值都相同**。

```js
let p = Promise.resolve('p'); // Promise {<fulfilled>: 'p'}

let p1 = p.finally(() => {}); // Promise {<fulfilled>: 'p'}

let p2 = p.finally(() => {return 'p2'}); // Promise {<fulfilled>: 'p'}

let p3 = p.finally(() => {return Promise.resolve('p3')}); // Promise {<fulfilled>: 'p'}

let p4 = p.finally(() => {return Error('p4')}); // Promise {<fulfilled>: 'p'}

let p5 = p.finally(); // Promise {<fulfilled>: 'p'}
```

但是，如果返回的是一个待定的期约，或者 `onFinally` 处理程序抛出了错误（显示抛出或返回了一个拒绝期约），则会返回相应的期约（待定或拒绝）。

```js
let p = Promise.resolve('p'); // Promise {<fulfilled>: 'p'}

let p1 = p.finally(() => {return new Promise(() => {})}); // Promise {<pending>}

let p2 = p.finally(() => {return Promise.reject('p2')}); // Promise {<rejected>: 'p2'}

let p3 = p.finally(() => {throw 'p3'}); // Promise {<rejected>: 'p3'}
```