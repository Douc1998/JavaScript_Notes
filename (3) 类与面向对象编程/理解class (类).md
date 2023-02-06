# class - 类

在 ES6 之前，还不存在类的概念，只能通过原型链等方法来模仿类的特性。如今，ES6 新增了 `class` 关键字，使得 JavaScript 具备了正式定义类的能力。（但其实仔细了解 `class` 会发现，它背后使用的仍然是原型和构造函数的概念）。

## 1. 创建类
创建类的方法很容易，使用 `class` 关键字即可，主要包括以下两种方法：
```js
// 类声明
class Person {}
// 类表达式
const Person = class {

}
```

## 2. 类的构造函数
我们上面提到，类背后使用的仍然是原型和构造函数的概念。因此，类也 **具备构造函数**，其构造函数为 `constructor`。

```js
class Person{
  constructor(){
    console.log('new person !')
  }
}
// 构造实例
const p1 = new Person(); // new person !
console.log(p1 instanceof Person); // true
```
由上面的例子可知，我们可以通过 `new` 来创造类的实例，也可以利用 `instanceof` 来判断实例是否属于某个类。

## 3. 实例、原型和类成员

### 实例
在上面的例子我们就提到了 `new` 关键字，实际上在我们创建好 `class` 类之后，就可以通过 `new` 关键字来创建实例(即类成员），这个方法和普通构造函数是一样的。

类的构造函数中的属性则为实例的 “自有属性” ，也就以为着所有的类实例成员都不会在原型上共享属性。举个例子就一目了然：

```js
// 创建类
class Person{
  constructor(name, age){ // 构造函数
    // 以下都是实例的 “自有属性”
    this.name = name;
    this.age = age;
    this.friends = ['jack', 'mike'];
    this.sayName = function(){
      console.log(this.name);
    }
  }
}

// 创建实例（类成员）
const p1 = new Person('dou', 24);
const p2 = new Person('chen', 25);

console.log(p1.sayName === p2.sayName); // false
console.log(p1.friends === p2.friends); // false

p1.friends.push('lucy');
p2.friends.push('peter');
console.log(p1.friends); // [ 'jack', 'mike', 'lucy' ]
console.log(p2.friends) // [ 'jack', 'mike', 'peter' ]
```
上面的例子中可以得知，`p1` 和 `p2` 的 `sayName` 和 `friends` 都是各自的属性，而不是共享属性，各自的操作也不会影响到对象。这也相当于是**开辟了两块空间分别存放各自的这些引用对象，而不是两个指针指向同一个对象**。

### 原型
1、类也是有原型的，可以用过 `prototype` 获取类的原型。类的原型也有一个 `constructor` 属性指向它自身。

2、**在类块中定义的所有内容都会定义在类的原型上**，但是，在类块中不能定义原始值或对象作为成员数据，只能定义方法（即函数）。

3、此外，类的成员（实例）也可以通过 `instanceof` 操作符号检查自己的原型链中是否出现过某个类。

举个例子就容易理解以上三点了：

```js
// 创建类
class Person{
  constructor(name, age){ // 构造函数
    // 以下都是实例的 “自有属性”
    this.name = name;
    this.age = age;
    this.sayName = function() {
      console.log('this sayName is in instance');
    }
  }
  // 在类块中定义的所有内容都会定义在类的原型上
  sayName(){
    console.log('this sayName is in prototype');
  }
  print(){
    console.log('print is in prototype');
  }
};

console.log(Person.prototype); // { constructor: f() }
console.log(Person.prototype.constructor === Person); // true

const p = new Person('dou', 24);
p.sayName(); // this function is in instance  // 实例上的同名方法
Person.prototype.sayName() // this function is in prototype  原型上的同名方法
p.print(); // print is in prototype 原型上的方法

console.log(p instanceof Person); // true
```

### 静态成员

可以在类上 **定义静态方法**。这些方法通常用于执行不特定于实例的操作。简而言之，这些方法 **属于类自身**，也**只能由类自己使用，而不能被实例或者外部使用**。

```js
举个例子：
// 创建类
class Person{
  constructor(name, age){ // 构造函数
    // 以下都是实例的 “自有属性”
    this.name = name;
    this.age = age;
  }
  sayName(){
    console.log('this is a prototype\'s function')
    console.log(Person.getName());
  }
  static getName(){
    console.log('this is a static function')
    return this.name
  }
};

const p = new Person('dou', 24);

// console.log(p.getName()); // TypeError: p.getName is not a function

Person.getName(); // this is a static function

p.sayName();
/**
 * this is a prototype's function
 * this is a static function
 * Person 返回的不是实例的 name，而是类的名称
 */
```

## 4. 继承

### 继承类或构造函数

**类可以通过 `extends` 关键字实现单继承**，而不在需要使用原型链的方法。类可以继承任何拥有 `[[Construct]]` 和原型的对象，这意味着不仅可以继承一个类，也可以继承普通的构造函数。

```js
class Person{};
class Student extends Person{}; // 继承类
function Vehicle(){}; 
class Bus extends Vehicle{}; // 继承普通的构造函数

const s = new Student();
const b = new Bus();

console.log(s instanceof Person); // true
console.log(b instanceof Vehicle); // true
```

### super()
**在使用 `extends` 继承后，我们也可以在派生类的 `constructor` 构造函数中使用 `super()` 函数，以调用父类的构造函数**。（如果不使用 `super()` 函数，则必须要在派生类的 `constructor` 中返回一个对象。一般来说，我们都会使用父类的特性。）

```js
// 父类
class Person{
  constructor(name, age){
    this.name = name;
    this.age = age;
  }
  sayName(){
    console.log(this.name)
  }
}

// 派生类
class Student extends Person{
  constructor(name, age, gender){
    // 不要在调用 super 之前使用 this，否则会抛出 ReferenceError
    super(name, age); // 尽量第一行就是 super 函数。
    this.gender = gender;
  }
}

const s = new Student('dou', 24, 'boy');
s.sayName(); // dou
console.log(s.name, s.age, s.gender); // dou 24 boy
```

那么，如何在子类中调用父类的静态成员方法呢？我们可以在子类的静态成员方法中调用 `super.xxx()` 即可。其中 `xxx` 为父类的静态成员方法。举个例子：

```js
// 父类
class Person{
  static print(){ // 静态方法
    console.log('I am father');
  }
}

// 派生类
class Student extends Person{
  static print(){
    super.print(); // 在派生类静态方法中调用父类静态方法
  }
}

Student.print(); // I am father
```


