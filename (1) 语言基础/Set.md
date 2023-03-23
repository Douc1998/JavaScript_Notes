# Set
ES6 中新增了 `Set` 数据结构，这也是我们非常熟悉的 “**集合**“ 的概念，至于集合相关的特性，我在这里不详细赘述。

## 1. 基本功能
### 创建Map
创建 Set 和数组、对象等方式一样：使用 **`new`** 关键字和 **`Set()`** 构造函数即可。如：
```JavaScript
// 创建空映射
const set1 = new Set();

// 使用数组初始化
const set2 = new Set([ 'douchen', 'aoteman', 'yasuo']);

// 使用自定义迭代器初始化
const set3 = new Set({
    [Symbol.iterator]: function*(){
        yield 'douchen',
        yield 'aoteman',
        yield 'yasuo'
    }
});
```
我们还可以通过 `size` 属性获取集合的长度：
```js
console.log(set2.size); // 3
```

### add()
在初始化 Set 之后，可以通过 **`add()`** 方法继续添加新值。如
```JavaScript
const s = new Set();
s.add('007').add('005');  // 可以 链式 add
console.log(s); // Set(2) { '007', '005' }
```

### has()
如果要查询 Set 中是否存在某个**元素**，可以通过 **`has()`**方法，传入 **元素** ，返回 **bool值**。如：
```JavaScript
console.log(s.has('007')); // true
console.log(m.has('000')); // false
```


### delete()和clear()
**`delete(item)`** 可以删除 Set 中的指定元素 item，返回的结果为 `true` 或者 `false`。

**`clear()`** 可以清空 Set 中的所有内容。

## 2.顺序与迭代

Map会维护元素插入时的顺序。因此，在 Set 中可以根据插入顺序进行迭代。
### entries()\keys()\values()  
Set 的取值的方式也有很多，如：**Iterator迭代器** , **entries()** , **keys()** , **values()**。

但是，和 Map 不同的是，Set 没有**键**，只有对应的**值**。

因此， `keys()` 和 `values()` 返回的值都是元素值， `entries()` 返回两个元素，实际上是一个元素的重复。

因此，为了不混淆概念，个人认为**使用 `values()` 更合适**。

```JavaScript
const s = new Set(['007', '005']);
console.log(s[Symbol.iterator]()); // [Set Entries] { [ '007', '007' ], [ '005', '005' ] }
console.log(s.entries()); // [Set Entries] { [ '007', '007' ], [ '005', '005' ] }
console.log(s.keys());    // [Set Iterator] { '007', '005' }
console.log(s.values());  // [Set Iterator] { '007', '005' }
```
### 迭代
Set 的迭代可以用 **for of** , **forEach()** 等。如：
> **for of**
> Set 中的 `for of` 使用方法和数组类似。如：
> ```JavaScript
> for (let item of s){
>     console.log(item); // 007 005
> }
> ```

> **forEach()**
> `forEacn()` 方法与迭代数组的方法也类似。如：
> ```JavaScript
> s.forEach(item => console.log(item)); // 007 005
> ```

## 3.数组操作（拓展）
我们在平时的使用中，常常会需要用到集合的**求交集**、**求并集**和**求差集**等。

因此，我们可以利用集合的基本功能，**自定义实现以上功能**。封装好函数，便于之后的重复使用。代码如下：
```js
const a = new Set([1, 2, 3])
const b = new Set([2, 4, 5])

// 可求多个集合的并集
function union(a, ...bSets) {
  const unionSet = new Set(a);
  for (let b of bSets) {
    for (let bValue of b) {
      unionSet.add(bValue);
    }
  }
  return unionSet;
}

// 可求多个集合的交集
function intersection(a, ...bSets) {
  const intersectionSet = new Set(a);
  for (let aValue of intersectionSet) {
    for (let b of bSets) {
      if (!b.has(aValue)) {
        intersectionSet.delete(aValue)
      }
    }
  }
  return intersectionSet
}

// 求两个集合差集
function difference(a, b) {
  const differenceSet = new Set(a);
  for (let bValue of b) {
    if (a.has(bValue)) {
      differenceSet.delete(bValue)
    }
  }
  return differenceSet;
}

console.log(union(a, b))  // Set(5) { 1, 2, 3, 4, 5 }
console.log(intersection(a, b)) // Set(1) { 2 }
console.log(difference(a, b))  // Set(3) { 1, 3 }
```

## 4. 集合与数组
Set 转 Array，如：`Array.from(set)`。
Array 转 Set，如： `new Set(array)`。
