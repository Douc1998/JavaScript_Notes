# 对象 Object - 第一讲
## 1. 创建object对象的简单方式
(1)静态方法：
```JavaScript
let person = new Object({name: 'douchen', age: 23});
let person = {name: 'douchen', age: 23};
```
(2)构造函数方法：
通过构造函数的方式初始化Object对象，获得默认属性，后续也可以继续给对象实例添加属性值。如：
```JavaScript
function Person(name, age){
    this.name = name;
    this.age = age;
    this.sayName = function(){
        return this.name;
    }
}
let person = new Person('douchen', 23);
```
(3)原型模式：
每个函数都会创建一个 **prototype** 属性，这个属性是一个对象，包含应该由特定引用类型的实例共享的属性和方法。  
简单地来说，这个对象就是 **通过调用构造函数创建的对象的原型**。使用原型对象的一个好处就是，在它上面定义属性和方法的话，都可以 **被对象实例共享** 。如：
```JavaScript
function Person(){};
Person.prototype.name = 'douchen';
Person.prototype.age = '23';
Person.prototype.job = 'student';
Person.prototype.saySchool = function(){
    console.log('I am from Wuhan University !');
}
let person1 = new Person();
let person2 = new Person();
console.log(person1.name); // douchen
console.log(person2.saySchool()); // I am from Wuhan University !
```
原型模式往往会遇到 " **原型层级** "问题。在访问对象属性时，会 **先对对象实例本身开始搜索** ，如果该对象实例存在某一属性，则输出该属性的值。如果该对象实例 **不存在某一属性** ， **JavaScript引擎会对该对象实例的原型进行搜索** ，如果有则输出原型该属性的值，反之返回undefined。举例如下：
```JavaScript
// 以上述的Person为例。
let person1 = new Person();
person1.hobby = 'basketball';
console.log(person1.name); // douchen, 对象实例没有name属性值，但它的原型对象有name属性值，因此输出douchen。
console.log(person1.hobby); // basketball, 对象实例的属性值，而不是原型对象的属性值。
console.log(person1.father); // undefined，对象实例和原型对象都没有father属性。
```
在原型层级中，还会遇到 " **属性遮蔽** "问题。即 **只要给对象实例添加一个属性，这个属性就会遮蔽原型对象上的同名属性** 。然而，实际上并 **不会修改** 原型对象中的同名属性的值，但是会 **屏蔽对它的访问** 。如果想要恢复对原型对象同名属性值的访问，可以通过 **delete** 操作符删除实例上的同名属性。举例说明：
```JavaScript
// 仍然以上述Person为例。
let person1 = new Person();
let person2 = new Person();
person1.name = 'aoteman';
console.log(person1.name); // aoteman, 被对象实例的name覆盖。
console.log(person2.name); // douchen, 输出原型对象的name属性值。
delete person1.name; // 删除实例对象的name属性。
console.log(person1.name); // douchen, 输出原型对象的name属性值。
```

## 2. 添加Object对象的属性和方法
定义Object对象的属性主要有以下两种：
+ 直接定义方法1 objectName['propName'] = 'xxx'
+ 直接定义方法2 objectName.propName = 'xxx'
+ 基于Object.defineProperty 单属性定义
+ 基于Object.defineProperties 多属性定义

举例如下所示：
```JavaScript
let person = new Object();
person['name'] = 'douchen'; // 定义属性方法一
person.age = 23; // 定义属性方法二
person.job = 'Alibaba';
person.sayName = function(){ // 定义对象的方法
    console.log(this.name);
};
// 定义属性的方法三，利用Object.defineProperty
Object.defineProperty(person, 'sex', {
    configurable: false, // 属性不可删除
    value: 'boy', // 属性值
});
// 定义多个属性，Object.defineProperties
Object.defineProperties(person, {
    attr1: {
        value: 1,
    },
    attr2: {
        value: 2,
    },
    method1: {
        getAttrs(){
            return [this.attr1, this.attr2];
        }
    }
})
```

## 3. 查看Object对象的属性
既然有定义Object对象属性的方法，自然也有查看属性的方法，主要有以下两种：
+ 直接查看方法1 objectName['propName']
+ 直接查看方法2 objectName.propName
+ 基于Object.getOwnPropertyDescriptor 单属性查看, 参数为(objectName, propName)
+ 基于Object.getOwnPropertyDescriptors 多属性查看, 参数为(objectName)

其中Object.getOwnPropertyDescriptor和Object.getOwnPropertyDescriptors还能够看到数据属性， **如value, writable, enumerable, configurable** 。举例如下：
```JavaScript
let person1 = new Object();
// 定义属性
person1.name = 'douchen';
person1.age = 23;
person1.saySchool = function(){
    console.log('I am from Wuhan University !');
}

// 直接查看方法
console.log(person1.name); // douchen
console.log(person1['age']); // 23

// 利用Object.getOwnPropertyDescriptor查看
let descriptorName = Object.getOwnPropertyDescriptor(person1, 'name');
let descriptorAge = Object.getOwnPropertyDescriptor(person1, 'age');
let descriptorSchool = Object.getOwnPropertyDescriptor(person1, 'saySchool');
console.log(descriptorName); // { value: 'douchen', writable: true, enumerable: true, configurable: true }, value为属性值。
console.log(descriptorAge); // { value: 23, writable: true, enumerable: true, configurable: true }
console.log(descriptorSchool); // {value: [Function (anonymous)], writable: true, enumerable: true, configurable: true}

// 利用Object.getOwnPropertyDescriptors查看
let descriptor = Object.getOwnPropertyDescriptors(person1);
console.log(descriptor);
/** 输出如下：
{
  name: {
    value: 'douchen',
    writable: true,
    enumerable: true,
    configurable: true
  },
  age: { value: 23, writable: true, enumerable: true, configurable: true },
  saySchool: {
    value: [Function (anonymous)],
    writable: true,
    enumerable: true,
    configurable: true
  }
}
 */
```
