# async/await 语法糖

ES8 提出了 `async/await` 关键字，旨在解决利用异步结构组织代码的问题。利用 `async/await` 可以让我们的异步代码看起来更像同步代码，方便我们理解。

## async

`async` 关键字用于声明异步函数，表明这个函数中存在异步操作。`async` 虽然用于声明异步函数，但是**其代码执行起来总体还是同步的**。

附有 `async` 的函数，其返回值都将被 `Promise.resolve()` 包裹成一个 `Promise` 对象。如果没有返回值，则等于值为 `undefined` 的期约对象。需要记住的一点就是：**异步函数始终返回期约对象**。

```js
async function test(){
    console.log('I\'m an async function');
    return 1;
}

let t = test();

setTimeout(console.log, 0, t); // Promise {<fulfilled>: 1}

t.then(value => console.log(value)); // 1

/**
 * 输出：
 * I'm an async function
 * 1
 * Promise {<fulfilled>: 1}
 */ 

```

由上面的例子可知，`test()` 虽然是异步函数，但其执行起来是同步的。并且返回值会被包裹成一个 **解决的期约对象**，其内部值为 1。

实际上，异步函数的返回值期待（实际上并不要求）是一个实现 `thenable` 接口的对象，但常规的值也可以。

+ 如果返回的不是实现 `thenable` 接口的对象，则返回值会被 `Promise.resolve()` 包裹成一个解决的期约。
+ 如果返回的是实现 `thenable` 接口的对象，`Promise.resolve()` 会跟随这个对象，并立即执行其内部的 `then` 方法，并以该方法内部得到的状态和值作为返回期约的状态和值。

```js
async function test(){
    return {
        then: (resolve, reject) => { // 该 thenable 对象的 then 方法会在 1000ms 后触发 resolve('success') 方法
            setTimeout(resolve, 1000, 'success');
        }
    };
}

let t = test();

setTimeout(console.log, 0, t); // Promise {<pending>}
setTimeout(console.log, 2000, t); // 2000ms 延迟后 Promise {<fulfilled>: 'success'}
```

如果在 `async` 函数中抛出错误：`throw: ...`，异步函数会返回拒绝的期约。

```js
async function test(){
    console.log('test');
    throw 'error!';
}

let t = test();

t.catch(e => console.log(e)); // error!

setTimeout(console.log, 0, t); // Promise {<rejected>: 'error!'}

/**
 * 输出：
 * test
 * error!
 * Promise {<rejected>: 'error!'}
 */
```

但是，如果在异步函数中执行一个拒绝期约，这个错误不会被异步函数捕获。
```js
async function test(){
    console.log('test');
    Promise.reject('error!');
}

let t = test();

t.catch(e => console.log(e)); // 无输出...

setTimeout(console.log, 0, t); // Promise {<fulfilled>: undefined}

/**
 * 输出：
 * test
 * Promise {<rejected>: 'error!'}
 * Uncaught (in promise) error! （提示 未捕获错误）
 */
```

由上面例子可知，在异步函数中执行一个拒绝期约，其错误不会被捕捉到。因为这个期约并不是 `return` 的，异步函数也没有返回值，所以 `t` 是一个状态为 `fulfilled`，值为 `undefined` 的期约对象。

如果在 `Promise.reject('error!')` 前添加一个 `return`，结果就不一样了，就可以捕获到了。

## await 

单独使用 `async` 实际上和普通的函数没有太多的区别，这也是为什么 `async/await` 这两个东西都是绑定在一起写的缘故。结合 `await` 才能够让异步函数更加丰富，而没有标记 `async` 的普通函数中是不能使用 `await` 的。

`await` 能够提供 **暂停** 的功能，这和生成器中的 `yield` 有异曲同工之妙，实际上 `async/await` 就是 `Generator` 函数的语法糖。

`await` 关键字期待（实际上并不要求）后面是一个实现 `thenable` 接口的对象，但常规的值也可以。

+ 如果后面的不是实现 `thenable` 接口的对象，它就会被 `Promise.resolve()` 包裹成一个解决的期约。
+ 如果后面的是实现 `thenable` 接口的对象，`Promise.resolve()` 会跟随这个对象，并立即执行其内部的 `then` 方法，并以该方法内部得到的状态和值作为返回期约的状态和值。

`await` 可以 ”解包“ 期约，实际上就是可以直接获取后面期约对象的值/理由。如：
```js
let a = await new Promise((resolve, reject) => {
    setTimeout(resolve, 1000, '我是值');
});
```
`await` 能够取到后面期约对象在落定状态后的值，即 `a = 我是值`。

如果在 `await` 后抛出错误，异步函数则会返回拒绝的期约。

```js
async function test(){
    await (() => {throw 'error'})(); // 抛出错误
}

let t = test();

t.catch(e => console.log(e)); // error

setTimeout(console.log, 0, t); // Promise {<rejected>: 'error'}
```

在上一节提到，异步函数中对单独的 `Promise.reject('..')` 无法捕获到错误，从而抛出未捕获错误。但是，`await` 关键字可以。对拒绝的期约使用 `await` 则会释放它的错误值，并将该拒绝期约作为函数的返回值，相当于加上了一个 `return`，后续的代码也就不会再被执行，之后使用 `catch` 可以捕获到错误。

```js
async function test(){
    console.log(1);
    let p = await Promise.reject('error'); // 以拒绝期约作为返回
    console.log(2); // 这行代码不会被执行
}


let t = test();

t.catch(e => console.log(e)); // error

setTimeout(console.log, 0, t); // Promise {<rejected>: 'error'}

/**
 * 输出：
 * 1
 * error
 * Promise {<rejected>: 'error'}
 */
```

除此以外，`await` 作为语法糖，可以帮助我们把异步代码以同步的形式呈现，帮助我们理解，不仅避免了回调地狱，而且比 `Promise.then()` 的链式调用看起来更加直观。举个例子：

```js
// 构建一个生成期约的工厂函数
function createPromise(value){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(value + 1);
        }, 1000)
    })
}

// 异步函数，利用 await 每隔一秒输出一个值
async function test(){
    let p1 = await createPromise(0);
    console.log(p1);
    let p2 = await createPromise(p1);
    console.log(p2);
    let p3 = await createPromise(p2);
    console.log(p3);
    let p4 = await createPromise(p3);
    console.log(p4);
    let p5 = await createPromise(p4);
    console.log(p5);
}

test();
/**
 * 输出：
 * (1000ms 后）1
 * (2000ms 后）2
 * (3000ms 后）3
 * (4000ms 后）4
 * (5000ms 后）5
 */
```
上面这个例子在[链式调用和期约组合](https://github.com/Douc1998/JavaScript_Notes/blob/main/(6)%20%E6%9C%9F%E7%BA%A6%E4%B8%8E%E5%BC%82%E6%AD%A5%E5%87%BD%E6%95%B0/4-%E9%93%BE%E5%BC%8F%E8%B0%83%E7%94%A8%E5%92%8C%E6%9C%9F%E7%BA%A6%E7%BB%84%E5%90%88.md)这个文章中实现过，当时使用的是 `Promise.then()` 实现的。使用 `then()` 的链式调用已经显得很简洁的，但是从上面的例子可以看出， `async/await` 语法糖写出来的更加简洁，且逻辑完全是同步代码的逻辑。


# 总结

`async/await` 语法糖帮助我们让异步代码以同步代码的逻辑呈现出来，十分方便。这里还需要再提醒一点，`async` 异步函数虽然称为异步函数，但是**其代码执行起来总体还是同步的**，除非代码中遇到了 `await` 关键字。当遇到 `await` 关键字时，紧接在它后面的那个操作是立即执行的，比如 `Promise` 对象的执行，又或者说发出请求等等。但是 `await` 具有暂停功能，也就是说它下一行的代码不会被执行，除非 `await` 把它身后的操作给解决（fulfilled)并取到值才会恢复。（注意：如果身后的操作返回的是拒绝期约或者抛出错误，则会让异步函数直接返回拒绝期约，也不会继续执行下一行代码了）。 
