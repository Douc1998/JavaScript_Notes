# weakMap
先前提到了 `Map` 的相关概念，ES6 也在此基础上创造了 `weakMap` 结构。在学习 `weakMap` 之前，请确保对 `Map` 的概念和用法有所掌握。链接：[Map.md](https://github.com/Douc1998/JavaScript_Notes/blob/main/(1)%20%E8%AF%AD%E8%A8%80%E5%9F%BA%E7%A1%80/Map.md)

## 1. 概念
`weakMap` 的重点在于 **弱**。但是 `weakMap` 的 **弱** 主要体现在弱映射的**键**上面。我们知道 `Map` 是由一系列的键值对组成，相较于 `Object` 而言， `Map` 的键可以是任何 `JavaScript` 数据类型。

然而，`weakMap` 的键 **只能是引用类型**，即 **`Object` 或者继承自 `Object` 的类型**。如果使用非对象类型设置为键时，则会抛出错误。

---

**那为什么必须是 `Object` 类型的数据才能作为键呢？**

因为 `weakMap` 中的 weak 描述的是垃圾回收机制中对待 “弱映射” 中键的方式。众所周知，引用类型会被存储在堆内存中，使用的时候都是基于 **引用传递**，变量中存储的是 **指向堆内存中地址** 的指针。

`JavaScript` 的 **垃圾回收机制** 会定期地检查堆内存中的对象是否还存在引用，如果没有则会被回收，并释放空间。

如果在 `Map` 中存储了某个对象的引用作为键，则会一直存在对该对象的引用，导致该对象无法被垃圾回收（除非手动销毁）。然而，在 `weakMap` 中， “弱映射”的键不会阻碍垃圾回收，因为这些键不是“正式的引用”。

换言之，`weakMap` 的特性为：**如果某个对象被垃圾回收了，那么以该对象为键的键值对，也会在 `weakMap` 中被清理掉**。 

如果是原始值类型的数据作为键，则无法达到以上效果。

## 2. 基本功能
`weakMap` 的基本功能和 `Map` 差不多。下面做简单介绍，不详细赘述。
### 创建 weakMap
```js
const key1 = {id: 1};
const key2 = {id: 2};
// 创建
const wm = new WeakMap([
    [key1, 'value1'],
    [key2, 'values']
]);
```

### set()
除了在创建的时候直接初始化值，也可以在创建后利用 `set()` 方法动态添键值对，**参数为：（键，值）**。
```js
const wm = new WeakMap();
// 通过 set() 添加值
wm.set(key1, 'value1');
wm.set(key2, 'value2');
```

### has()

基于 `has()` 判断是否存在某个键，**参数为：（键）**。

```js
wm.has(key1) // true
wm.has(key2) // true
wm.has(key3) // false
```

### get()

通过 `get()` 获取某个键对应的值，**参数为：（键）**。

```js
wm.get(key1); // value1
wm.get(key2); // value2
```

### delete()

利用 `delete()` 删除某个键值对，**参数为：（键）**。
```js
wm.delete(key1);
wm.has(key1) // false

```
## 3. 不可迭代键

由于 `weakMap` 中的键值对随时可能消失，因此提供迭代功能并没有什么意义。因此，`weakMap` 不具备迭代方法，如 `keys()`、`values()`、`entries()`，也不具备 `clear()` 方法。即使我们可以 `console.log()` 出来，但是也并不能看到里面的内容。

## 4.常用场景

### 保存 DOM 节点
`weakMap` 可以用于保存 `DOM` 节点及其相关元数据。**以 `DOM` 节点作为键，相关数据作为值**。这样如果页面中的 `DOM` 节点被销毁了，`weakMap` 中对应的键值对也会被销毁，从而释放内存。也不需要手动删除，十分便捷。

```js
const listeners = new WeakMap();
// dom元素
let element = document.getElementById('xxx');
// 操作函数
const handler = () => {
    ... // 其他语句
}
// 放入 weakMap 中
listeners.set(element, handler);
// 配置监听器
element.addEventListener('click', listeners.get(element), false)
```
键值对的值除了如上 **保存事件处理程序** 以外，也可以**存储状态**（如计数器的值...还有其他和节点相关的值都可以）。

### 缓存计算结果

当我们计算出了一个结果和某个对象是息息相关的，并且这个对象被回收时，这个计算结果也没有了使用余地和意义，那么就可以**以对象为键，以计算结果为值**存入 `weakMap`。缓存的计算结果会随着对象的销毁而销毁。

### 保护私有变量

实际上并不够安全，如果不使用 **闭包**，外界获取到类的实例和变量名，依旧能够访问到...