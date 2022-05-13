# 对象 Object - 第三讲

## 1. 增强的 Object 语法
### 动态属性赋值
**动态属性赋值**就要涉及到**可计算属性**。

在没有引入可计算属性之前，如果想要**使用变量的值作为属性**，那么必须先声明对象，然后使用中括号 `[]` 语法来添加属性。

而**不能在对象字面量中直接动态命名属性**。比如：
```js
const nameKey = 'name';
const ageKey = 'age';
let person = {};
person[nameKey] = 'douchen';
person[ageKey] = 23;
console.log(person);  // { name: 'douchen', age: 23}
```

有了可计算属性，就可以**在对象字面量中完成动态属性赋值**。`[]` 中括号包围的**对象属性键表明将作为 JavaScript 表达式**，而不是字符串来求值。如下：

```js
const nameKey = 'name';
const ageKey = 'age';
let person = {
    [nameKey]: 'douchen',
    [ageKey]: 23
};

console.log(person);  // { name: 'douchen', age: 23}
```

**属性表达式** 还可以更复杂一些，比如下面的例子：
```js
let obj = {
    name: 'douchen',
    ['h' + 'ello']() {
        console.log( 'hi ' + this.name);
    }
};

obj.hello() // hi douchen
```

### 简写属性名
在给对象添加变量时，我们经常会发现**属性名和变量名是一样的**。如：
```js
let name = 'douchen';
let age = 23;

let person = {
    name: name
};
```
为此，**简写属性名**语法出现了。简写属性名只要使用变量名就会自动被解释为同名的属性键。如果没有找到同名变量，则会跑出 `ReferenceError`。

```js
let person = {
    name,
    age
}
```
PS: 不过我个人觉得这种方法容易导致一些不必要的错误，代码可读性降低。（不建议使用）

## 2. 构造函数和原型对象
假设存在 `Person` 构造函数， `Person Prototype` 为原型对象，`person1`、`person2` 为实例对象。

+ Person 构造函数的 `prototype` 指向原型对象，
+ Person Prototype 原型对象的 `constructor` 属性指向构造函数。
+ person1 和 person2 内部都有 `[[Prototype]]` 接口指向原型对象。

实例对象 person1 和 person2 将继承 Person Prototype 原型对象的所有属性。此外，实例对象重写某个属性值，将覆盖从原型对象那继承的值，但不影响原型对象。

```js
let Person = function(){} // 构造函数

// 原型对象
Person.prototype.name = 'douchen';
Person.prototype.age = 23;
Person.prototype.sayHello = function(){
  console.log('Hello! ' + this.name)
}

// 实例对象，将分别继承原型对象的属性
let person1 = new Person();
let person2 = new Person();

person1.name = 'jack';
person1.sayHello(); // Hello! jack
person2.sayHello(); // Hello! douchen

console.log(person1.sayHello === person2.sayHello) // true
console.log(person1.name === person2.name) // false
```




