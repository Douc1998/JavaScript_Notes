# Map
在ES6之前，JavaScript中可以通过 **Object** 实现" **键/值** "。  
ES6新增了 **Map** 数据结构，Map是一种新的集合数据类型。  
Object只能用 **数值** 、 **字符串** 或 **符号** 作为键，而Map可以使用 **任何JavaScript数据类型** 作为键。
**注意！！！：Map中的键不可重复**
## 基本功能
### 创建Map
创建Map和数组、对象等方式一样：使用 **new** 关键字和 **Map()** 构造函数即可。如：
```JavaScript
// 创建空映射
const map1 = new Map(); // Map(0) {}
// 使用嵌套数组初始化
const map2 = new Map([  // Map(2) { 'user1' => 'douchen', 'user2' => 'lilanxin' }
    ['user1', 'douchen'],
    ['user2', 'lilanxin']
]);
// 使用自定义迭代器初始化
const map3 = new Map({  // Map(2) { 'user1' => 'douchen', 'user2' => 'lilanxin' }
    [Symbol.iterator]: function*(){
        yield ['user1', 'douchen'],
        yield ['user2', 'lilanxin']
    }
});
```
### set()
在初始化Map之后，可以通过 **set()** 方法继续添加键值对。如
```JavaScript
const m = new Map();
m.set('user1', 'douchen');
console.log(m); // Map(1) { 'user1' => 'douchen' }
```
### has()
如果要查询Map中是否存在某个**键**，可以通过 **has()**方法，传入 **键名** ，返回 **bool值**。如：
```JavaScript
console.log(m.has('user1')); // true
console.log(m.has('user2')); // false
```
### get()
上面说到has可以查询是否存在某个 **键**，那么如何得到某个 **键** 对应的 **值** 呢？ **get()**方法，传入 **键名** ，返回 **值** ：
```JavaScript
console.log(m.get('user1')); // douchen
console.log(m.get('user2')); // undefined
```
### delete()和clear()
**delete()** 可以删除Map中的某个键值对； **clear()** 可以清空Map()中的所有内容。  
## 顺序与迭代
与Object类型的一个主要差异是，Map会维护键值对的插入顺序。因此，在Map中可以根据插入顺序进行迭代。
### entries()\keys()\values()  
Map的取值的方式也有很多，如：**Iterator迭代器** , **entries()** , **keys()** , **values()**。如：
```JavaScript
const m = new Map([
    ['user1', 'douchen'],
    ['user2', 'lilanxin']
]);
console.log(m[Symbol.iterator]()); // [Map Entries] { [ 'user1', 'douchen' ], [ 'user2', 'lilanxin' ] }
console.log(m.entries()); // [Map Entries] { [ 'user1', 'douchen' ], [ 'user2', 'lilanxin' ] }
console.log(m.keys());    // [Map Iterator] { 'user1', 'user2' }
console.log(m.values());  // [Map Iterator] { 'douchen', 'lilanxin' }
```
### 迭代
Map的迭代可以用 **for of** , **forEach()** 等。如：
> **for of**
>> for of中可以用 ***pair*** 或 ***[key, value]*** 来指示迭代变量。如：
>> ```JavaScript
>> for (let [key, value] of m.entries()){
>>     console.log(key, '->', value); // user1 -> douchen  user2 -> lilanxin
>> }
>> ```

> **forEach()**
>> forEacn()方法与迭代数组的方法类似，但其内部可以直接调用函数。如：
>> ```JavaScript
>> m.forEach((key, value) => console.log(key, '->', value)); // user1 -> douchen  user2 -> lilanxin
>> ```

## 小Tips
Map中的 **键** 是 **不可修改** 的，如String、Number等基础类型；但是以 **Object** 作为键时，是 **引用** ，可以 **修改** Object内部的 **属性** 。如：
```JavaScript
// 作为键的字符串原始值是不可修改的
const m1 = new Map([
    ['user1', 'douchen']
])
for(let key of m1.keys()){
    key = 'user2';
    console.log(key); // user2
}
console.log(m1.keys()); // [Map Iterator] { 'user1' }

// 作为键的对象，其内部属性可以修改
const keyObj = {'age': 23};
const m2 = new Map([
    [keyObj, 'douchen']
]);
for(let key of m2.keys()){
    key.age = 100; // , age由23修改为了100
}
console.log(keyObj); // { age: 100 }
console.log(m2.keys()); // [Map Iterator] { { age: 100 } }
```
## ...
后续更新，如weakMap等...




