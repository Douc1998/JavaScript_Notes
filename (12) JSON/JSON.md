# JSON
`JSON` 是一种**轻量级数据格式**，可以方便地表示复杂的数据格式。

`JSON` 语法支持 3 种类型的值：
> + **简单值**：字符串、数值、布尔值和 `null` 可以在 `JSON` 中出现，`undefined` 不可以。
> + **对象**：第一种复杂数据类型， `JavaScript` 中的 `object` 对象，对象表示有序键值对。每个值可以是简单值，也可以是复杂类型。
> + **数组**：第二种复杂数据类型，数组表示可以通过数值索引访问的值的有序列表，数组内部的元素可以是简单值、对象，其他数组。

`JSON` 字符串与 `JavaScript` 字符串的最主要区别是，**`JSON` 字符串必须使用双引号**。此外，**`JSON` 中的对象也必须使用双引号把属性名包围起来**。

```js
// JavaScript 对象
{
    name: 'dou',
    age: 24,
    job: 'student',
    birthday: new Date(2023, 2, 23),
    friends: ['jack', 'mike'],
    school: {
        name: 'whu',
        location: 'wuhan'
    }
}

// JSON 格式
{
    "name": "dou",
    "age": 24,
    "job": "student",
    "birthday": new Date(2023, 2, 23),
    "friends": ["jack", "mike"],
    "school": {
        "name": "whu",
        "location": "wuhan"
    }
}
```
## 解析与序列化

`JSON` 对象有两个方法：`stringify()` 和 `parse()`。简单情况下，前者别可以将 `JavaScript` 序列化为 `JSON`，后者可以将 `JSON` 解析为原生 `JavaScript` 值。

### 1. JSON.stringify()
`JSON.stringify()` 方法接收三个参数，分别是：
> + **待序列化对象**：这是待从 `JavaScript` 对象转换为 `JSON` 格式的对象。（必需）
> + **过滤器**：过滤条件，可以是数组形式也可以是函数。（可选）
> + **缩进大小**：控制 `JSON` 对象中每一级的缩进和空格。（可选）

#### 第 1 个参数：待序列化对象

如果不需要对 `JavaScript` 对象进行操作，可以直接将其放入 `JSON.stringify()` 中即可。

```js
let obj = {
    name: 'dou',
    age: 24,
    job: 'student',
    school: {
        name: 'whu',
        location: 'wuhan'
    }
}
let jsonObj = JSON.stringify(obj);
console.log(jsonObj); 
// {"name":"dou","age":24,"job":"student","school":{"name":"whu","location":"wuhan"}}
```
#### 第 2 个参数：过滤器

**如果需要对键/值对进行操作，可以添加过滤器**。过滤器可以是数组形式也可以是函数形式。

如果是数组形式，**数组元素为筛选的属性名，不包含在内的属性名及其值会被过滤**。
```js
let obj = {
    name: 'dou',
    age: 24,
    job: 'student',
    school: {
        name: 'whu',
        location: 'wuhan'
    }
}
// 过滤器为数组
let jsonObj = JSON.stringify(obj, ['age', 'job', 'school']);
console.log(jsonObj);
// {"age":24,"job":"student","school":{}}
```

如果是函数形式，函数有两个参数：`key` 和 `value`，分别表示键和值。函数需要`return`，而返回的结果则是相应 `key` 的对应属性值。如果返回 `undefined` 会导致对应属性被忽略。

```js
let obj = {
    name: 'dou',
    age: 24,
    job: 'student',
    school: {
        name: 'whu',
        location: 'wuhan'
    }
}
// 过滤器为 函数
let jsonObj = JSON.stringify(obj, function(key, value){
    if(key === 'name'){
        return 'chen';
    }
    if(key === 'age'){
        return value + 10;
    }
    if(key === 'job'){
        return undefined;
    }
    return value;
});

console.log(jsonObj);
// {"name":"chen","age":34,"school":{"name":"chen","location":"wuhan"}}
```

#### 第 3 个参数：缩进大小

从上面的一系列例子可以看出，输出的 `JSON` 格式都是一行结果，看起来十分费解。因此，为了让格式更加便于查看，我们可以设置第三个参数：**缩进大小**。

```js
// 没有缩进
let jsonObj = JSON.stringify(obj); // {"name":"dou","age":24,"job":"student","school":{"name":"whu","location":"wuhan"}}
// 有缩进
let jsonObj = JSON.stringify(obj, null, 4);
/**
{
    "name": "dou",
    "age": 24,
    "job": "student",
    "school": {
        "name": "whu",
        "location": "wuhan"
    }
}
*/
```

#### 注意
> JSON.stringify 只会转换**待转换对象自身**，不会转换该对象原型链上的属性。

```js
let obj = {
    name: 'dou',
    age: 24
}

// 原型属性
obj.__proto__.job = 'student';

console.log(JSON.stringify(obj)); // {"name":"dou","age":24} 
```
> undefined、任意的函数以及 symbol 值，出现**在非数组对象的属性值中时**在序列化过程中会被忽略。

```js
let obj = {
    name: 'dou',
    age: 24,
    job: undefined,
    sayName: () => {
        console.log(this.name);
    },
    id: Symbol('dou')
}

console.log(JSON.stringify(obj)); // {"name":"dou","age":24} job、sayName, id 被忽略
```
> undefined、任意的函数以及 symbol 值**出现在数组中时**会被转换成 null。

```js
let obj = {
    name: 'dou',
    age: 24,
    friends: [undefined, function(){console.log('hello')}, Symbol()]
}

console.log(JSON.stringify(obj)); // {"name":"dou","age":24,"friends":[null,null,null]} 
```
> undefined、任意的函数以及 symbol 值**被单独转换时**，会返回 undefined

```js
let test1 = Symbol();
let test2 = undefined;
let test3 = function(){
    console.log('hello');
}

console.log(JSON.stringify(test1), JSON.stringify(test2), JSON.stringify(test3)); // undefined undefined undefined
```

#### toJSON() 方法
有时候，对象需要在 `JSON.stringify()` 之上自定义 `JSON` 序列化。因此，我们可以对待序列化的对象添加 `toJSON()` 方法，序列化时会基于这个方法返回适当的 `JSON` 表示。

```js
let obj = {
    name: 'dou',
    age: 24,
    job: 'student',
    school: {
        name: 'whu',
        location: 'wuhan'
    },
    toJSON: function(){
        return this.name;
    }
}
let jsonObj = JSON.stringify(obj);  // "dou"
```
那么有人要问了，如果我即想要自定义序列化，又想在 `stringify()` 中设置过滤函数，那他们是怎么操作的呢？

`JSON.stringify()` 的操作步骤如下：
> 1. 如果有 `toJSON()` 方法，则调用 `toJSON()` 获取实际的值，反之使用默认的系列化方法（可以理解为不操作）。
> 2. 如果提供了过滤器，则在上一步得到的结果基础上应用过滤。
> 3. 返回序列化结果（JSON格式）。

### 2. JSON.parse()

`JSON.parse()` 方法可以解析 `JSON` 字符串，得到相应的 `JavaScript` 值。

```js
let obj = {
    name: 'dou',
    age: 24,
    job: 'student',
    school: {
        name: 'whu',
        location: 'wuhan'
    }
}
let jsonObj = JSON.stringify(obj);
let newObj = JSON.parse(jsonObj);
console.log(typeof newObj); // object
console.log(newObj === obj); // false
```

从上面的例子可以看出，我们将 `obj`，即 `JavaScript` 对象先转为 `JSON` 字符串，再转为 `JavaScript` 对象。

`newObj` 与 `obj` 是两个**内容完全相同的对象**，但是它俩**不是同一个对象**，它们没有任何关系。因此可以看出 `JSON.parse()` 实际上**会在堆内存中开辟一个新的空间存储 `newObj`**。因此，这就有点**深拷贝**的味道了。

```js
// 可以通过 JSON 的两种方法组合，实现深拷贝
let newObj = JSON.parse(JSON.stringify(obj));
```

此外，`JSON.parse()` 提供了两个参数，分别是：
> + **待解析对象**：这是待从 `JSON` 格式转换为 `JavaScript` 格式的对象。（必需）
> + **还原函数**：与 `JSON.stringify()` 过滤器的函数类似，可以对相应的键值对操作。（可选）

**还原函数**中也需要 `return`，**返回的值会作为相应键的值插入到结果中**。如果返回 `undefined`，则结果中会删除相应的键。看个例子：

```js
let obj = {
    name: 'dou',
    age: 24,
    job: 'student',
    school: {
        name: 'whu',
        location: 'wuhan'
    },
    birthday: new Date(2023, 2, 23)
}
let jsonObj = JSON.stringify(obj);
let newObj = JSON.parse(jsonObj, (key, value) => key === "birthday" ? new Date(value) : value);
console.log(newObj.birthday.getFullYear()); // 2023
```

正如上面的例子，**还原函数经常被用于把日期字符串转换为 `Date` 对象，以便后续操作**。
