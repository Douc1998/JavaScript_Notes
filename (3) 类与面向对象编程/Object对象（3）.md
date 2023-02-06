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

## 3. 原型的继承

在 ES6 之前还没有 **类** 的概念，因此，如果需要实现继承，则需要通过实现原型链的链接。举个例子，如：

```js
// 父类 SuperType
function SuperType(name, age){
  this.name = name;
  this.age = age;
  this.friends = ['jack', 'mike'];
}
// 给父类添加原型属性
SuperType.prototype.sayName = function(){
  console.log(this.name);
}

// 子类 SubType
function SubType(job){
  this.job = job;
}

// 将 SuperType 的实例作为 SubType 的原型
SubType.prototype = new SuperType('dou', 24);

// 修正 SubType 原型的 constructor 指向
SubType.prototype.constructor = SubType;

// 给子类添加原型属性
SubType.prototype.sayJob = function(){
  console.log(this.job);
}

// 创建子类实例 s1
const s1 = new SubType('student');
s1.sayName(); // dou
s1.sayJob(); // student
s1.friends.push('lucy')
console.log(s1.friends); // [ 'jack', 'mike', 'lucy' ]

// 创建子类实例 s2
const s2 = new SubType('teacher');
s2.sayName(); // dou
s2.sayJob();  // teacher
s2.friends.push('peter')
console.log(s2.friends); // [ 'jack', 'mike', 'lucy', 'peter' ]
```
上面的例子实现了 `SubType` 和 `SuperType` 原型链的链接，方法是：**以 `SuperType` 的实例作为 `SubType` 的原型**。

但是问题也显而易见，首先是 `SuperType` 的实例属性变成了 `SubType` 的原型属性，导致 `name`、`age` 不能够灵活的定义。

此外，最严重的问题是：**由于 `SuperType` 的实例属性变成了 `SubType` 的原型属性，导致实例 `s1` 和 `s2` 共用了原型上的 `friends` 属性，而 `friends` 是一个引用类型，存储的是对应数组的指针。因此，一旦在 `s1` 中修改 `friends`，就会修改整个原型中的 `friends` 属性，导致其他实例也被影响**。

---
在上述内容中，我们知道基于原型链的继承时，会出 **引用值继承** 的问题，即所有创建的实例都继承了其原型中的某个引用对象，一旦在实例中修改该引用对象，则会导致所有相关实例产生变化。为此，通过将 **原形链** 和 **盗用构造函数** 方法组合，有人提出了 **组合式继承** 。

### 组合式继承
组合式继承就是将原型链和盗用构造函数的方法结合，实现 **在构造函数中创建实例的同名属性，从而覆盖原型对象属性**，以解决引用值的问题。代码如下：
```js
// 父类
function SuperType(name){
  // 添加实例属性
  this.name = name;
  this.friend = ['jack', 'mike'];
};

// 添加父类原型属性
SuperType.prototype.sayName = function(){
  console.log(this.name);
};

// 子类
function SubType(name, age){
  // 盗用父类构造函数
  SuperType.call(this, name);
  // 添加实例属性
  this.age = age;
}

// 将父类实例设置为子类的原型
SubType.prototype = new SuperType();

// 增强，修复因为修改原型导致的 constructor 指向 Object 的错误。
SubType.prototype.constructor = SubType;

// 添加子类原型属性
SubType.prototype.sayAge = function(){
  console.log(this.age);
}

// ------ test -------
const s1 = new SubType('dou', 24);
console.log(s1); // SubType { name: 'dou', friend: [ 'jack', 'mike' ], age: 24 }
s1.sayName(); // dou
s1.sayAge(); // 24
s1.friend.push('lucy');
console.log(s1.friend); // [ 'jack', 'mike', 'lucy' ]

const s2 = new SubType('chen', 25);
console.log(s2) // SubType { name: 'chen', friend: [ 'jack', 'mike' ], age: 25 }
s2.sayName(); // chen
s2.sayAge(); // 25
s2.friend.push('john');
console.log(s2.friend); // [ 'jack', 'mike', 'john' ]
```

### 寄生式组合继承
寄生式组合继承是为了解决组合式继承 **调用两次父类构造函数**（分别在改变子类原型对象时、利用构造函数创建子类实例时）导致性能下降的问题。

寄生式组合继承就是 **利用寄生函数，以某种方式增强对象，然后返回对象**，从而实现子类和父类的继承。该过程中只需调用一次父类构造函数。代码如下：

```js
// 父类
function SuperType(name){
  // 添加实例属性
  this.name = name;
  this.friend = ['jack', 'mike'];
};

// 添加父类原型属性
SuperType.prototype.sayName = function(){
  console.log(this.name);
};

// 子类
function SubType(name, age){
  // 盗用父类构造函数
  SuperType.call(this, name);
  // 添加实例属性
  this.age = age;
}

// 寄生函数
function inheritPrototype(SuperType, SubType){
  // 创建父类实例，通过 `Object.create` 方法（也可以是其他方法创造实例）
  const p = Object.create(SuperType.prototype);
  // 增强，修改 constructor 属性，指向子类构造函数
  p.constructor = SubType;
  // 将父类实例设置为子类的原型
  SubType.prototype = p;
}

// 执行寄生函数
inheritPrototype(SuperType, SubType);

// 添加子类原型属性
SubType.prototype.sayAge = function(){
  console.log(this.age);
}

// ------ test -------
const s1 = new SubType('dou', 24);
console.log(s1); // SubType { name: 'dou', friend: [ 'jack', 'mike' ], age: 24 }
s1.sayName(); // dou
s1.sayAge(); // 24
s1.friend.push('lucy');
console.log(s1.friend); // [ 'jack', 'mike', 'lucy' ]

const s2 = new SubType('chen', 25);
console.log(s2) // SubType { name: 'chen', friend: [ 'jack', 'mike' ], age: 25 }
s2.sayName(); // chen
s2.sayAge(); // 25
s2.friend.push('john');
console.log(s2.friend); // [ 'jack', 'mike', 'john' ]
```
上述方法 **只会在构建子类实例时调用一次父类构造函数**，相对于组合式继承，寄生函数中的 `Object.create(SuperType.prototype)` 创建实例的方法避免了一次调用父类构造函数。**寄生式组合继承可以算是引用类型继承的最佳模式**。



