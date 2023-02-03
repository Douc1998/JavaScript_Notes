# weakSet
既然存在 `Set` 和 `WeakMap`，那么我们也可以联想到 `weakSet` 结构，而这种结构也确实是存在的。在学习 `weakSet` 之前，请确保对 `Set` 的概念和用法有所掌握。链接：[Set.md](https://github.com/Douc1998/JavaScript_Notes/blob/main/(1)%20%E8%AF%AD%E8%A8%80%E5%9F%BA%E7%A1%80/Set.md)

## 1. 概念
`weakSet` 的重点也在于 **弱**。因此，`weakSet` 的元素值**只能是引用类型**，即 **`Object` 或者继承自 `Object` 的类型**。如果使用非对象类型设置为键时，则会抛出错误。

`JavaScript` 的 **垃圾回收机制** 会定期地检查堆内存中的对象是否还存在引用，如果没有则会被回收，并释放空间。

如果在 `Set` 中存储了某个对象的引用作为键，则会一直存在对该对象的引用，导致该对象无法被垃圾回收（除非手动销毁）。然而，在 `weakSet` 中， “弱“值不会阻碍垃圾回收，因为这些值不是“正式的引用”。

换言之，`weakSet` 的特性为：**如果某个对象被垃圾回收了，那么该对象在 `weakSet` 中对应的元素也会被清理掉**。

如果是原始值类型的数据作为键，则无法达到以上效果。

## 2. 基本功能
`weakSet` 的基本功能和 `Set` 差不多。下面做简单介绍，不详细赘述。
### 创建 weakSet
```js
const value1 = {id: 1};
const value2 = {id: 2};
// 创建
const ws = new WeakSet([value1, value2]);
```

### add()
除了在创建的时候直接初始化值，也可以在创建后利用 `set()` 方法动态添加值，**参数为：（值）**。
```js
const ws = new WeakSet();
// 通过 add() 添加值
ws.add(value1);
ws.add(value2);
```

### has()

基于 `has()` 判断是否存在某个元素，**参数为：（值）**。

```js
ws.has(value1) // true
ws.has(value2) // true
ws.has(value3) // false
```

### delete()

利用 `delete()` 删除某个元素，**参数为：（值）**。
```js
ws.delete(value1);
ws.has(value1) // false

```
## 3. 不可迭代键

与 `weakMap` 一样，由于 `weakSet` 中的键值对随时可能消失，因此提供迭代功能并没有什么意义。因此，`weakSet` 不具备迭代方法，如 `keys()`、`values()`、`entries()`，也不具备 `clear()` 方法。即使我们可以 `console.log()` 出来，但是也并不能看到里面的内容。

## 4.常用场景

### 给DOM 节点打“标签”
实际上 `weakSet` 的用途并不广泛。给 `DOM` 节点 “**打标签**” 算是一种。比如把某些 `DOM` 节点作为元素插入其中，假设插入其中的 `DOM` 节点都被我们认为禁用了，那么只需要在 `weakSet` 里查询一下就知道是否被禁用了，而不需要再创建一个值作为是否禁用的标记。当 `DOM` 节点被垃圾回收时，`weakSet` 中的对应元素也会自动销毁。

