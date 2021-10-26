# 对象 Object
## 创建object对象的简单方式
(1)静态方法：
```JavaScript
let person = new Object({name: 'douchen', age: 23});
let person = {name: 'douchen', age: 23};
```
(2)构造函数方法：
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

## 添加object对象的属性和方法
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
Object.defineProperty(person, {
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

## Object对象合并
合并多个Object对象时，ES6提供了Object.assign()函数。assign()函数能合并对象中的不同属性，但对相同属性会覆盖。如
```JavaScript
let obj1, obj2, obj3;
obj1 = {age: 23};
obj2 = {id: 1, name: 'douchen', sex: 'boy'};
obj3 = {id: 2, name: 'lanxin'};
let result = Object.assign(obj1, obj2, obj3);
console.log(result); // { age: 23, id: 2, name: 'lanxin', sex: 'boy' }
```
Object.assign()函数的实质是：将其他对象的属性添加到源对象中。源对象的值会改变，如：
```JavaScript
let obj1, obj2, obj3;
obj1 = {age: 23};
obj2 = {id: 1, name: 'douchen', sex: 'boy'};
obj3 = {id: 2, name: 'lanxin'};
let reuslt = Object.assign(obj1, obj2, obj3);
console.log(obj1 === result); // true
console.log(obj2 === result); // false
console.log(obj1); // { age: 23, id: 2, name: 'lanxin', sex: 'boy' }
console.log(obj2); // { id: 1, name: 'douchen', sex: 'boy' }
```

## 对象解构（ES6）
ES6中新增了对象的解构语法。
```JavaScript
let person = {
    name: 'douchen',
    age: 23，
    job: 'student'
    
}
const {name, age} = person; // 使用对象结构
console.log(name, age); // douchen 23

// 解构过程中也可以给外部变量赋值
let jobCopy = '';
({ job: jobCopy } = person);
console.log(jobCopy); // student
```

嵌套解构：
```JavaScript
let person = {
    name: 'douchen',
    age: 23,
    hobbies: {
        Computer : 'games',
        Sports: 'basketball'
    }
}
const {name, age, hobbies:{Sports}} = person; //解构
console.log(name, age, Sports); // douchen 23 basketball
```

通过解构给其他对象赋值
```JavaScript
let personCopy = {};
({ name: personCopy.name, 
    age: personCopy.age,
    hobbies: personCopy.hobbies,
} = person);
console.log(personCopy); // { name: 'douchen', age: 23, hobbies: { Computer: 'games', Sports: 'basketball' }}

// 赋值的hobbies是一个对象，因此是将该对象的引用赋值给personCopy,当person中的hobbis对象修改时，personCopy中的值也会修改。
person.hobbies.Sports = 'football';
console.log(person); // { name: 'douchen', age: 23, hobbies: { Computer: 'games', Sports: 'football' }}
console.log(personCopy); // { name: 'douchen', age: 23, hobbies: { Computer: 'games', Sports: 'football' }}
```

## 对象迭代
对象的迭代包括三种：键迭代、值迭代、键值对迭代。  
分别对应了Object.keys(), Object.values(), Object.entries(), 返回均为数组形式。
```JavaScript
let person = new Object({
    name: 'douchen',
    age: 23,
    hobbies: {
        Computer : 'games',
        Sports: 'basketball'
    }
})
console.log(Object.keys(person)); // [ 'name', 'age', 'hobbies' ]
console.log(Object.values(person)); // [ 'douchen', 23, { Computer: 'games', Sports: 'basketball' } ]
console.log(Object.entries(person)); // [ [ 'name', 'douchen' ], [ 'age', 23 ], [ 'hobbies', { Computer: 'games', Sports: 'basketball'}]]
```

## ...
后续内容有待更新...



