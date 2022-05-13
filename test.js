let Person = function(){} // 构造函数

// 原型对象
Person.prototype.name = 'douchen';
Person.prototype.age = 23;
Person.prototype.sayHello = function(){
  console.log('Hello! ' + this.name)
}

// 实例对象
let person1 = new Person();
let person2 = new Person();

person1.name = 'jack';
person1.sayHello(); // Hello! jack
person2.sayHello(); // Hello! douchen

console.log(person1.sayHello === person2.sayHello) // true
console.log(person1.name === person2.name)