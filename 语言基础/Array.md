# 数组 Array
## 创建数组
### 基础方法
直接创建数组，使用new Array() 或 []。
```JavaScript
let arr = new Array(); // 空数组
let arr = []; // 空数组
let arr = new Array(5); // 创建长度为5的数组
let colors = new Array('red', 'blue', 'green'); // 初始化数组
```
### from() 和 of()
ES6新增了两种用于创建数组的静态方法：from() 和 of()。  
from() 用于将`类数组结构`转为数组实例，of() 用于将`一组参数`转换为数组实例。  
> **Array.from()**
>> Array.from()的第一个参数是一个类数组对象，即任何***可迭代***的结构，或者有一个***length属性***和***可索引元素***的结构。
>> ```JavaScript
>> // 字符串会被产分为单字符数组
>> console.log(Array.from('douchen')); // ['d', 'o', 'u', 'c', 'h', 'e', 'n']
>>
>> // 将集合Set和映射Map转换为数组
>> const s = new Set().add(1).add(2).add(3);
>> console.log(Array.from(s)); // [1, 2, 3]
>> const m = new Map().set('name', 'douchen').set('age', 23);
>> console.log(Array.from(m)); // [ ['name', 'douchen'], ['age', 23]]
>>
>> // 可迭代对象
>> const iter = {
>>    * [Symbol.iterator](){
>>        yield 1;
>>        yield 2;
>>        yield 3;
>>    }
>> };
>> console.log(Array.from(iter)); // [ 1, 2, 3 ]
>> ```
>> Array.from() 是对数组执行浅拷贝。
>> ```JavaScript
>> let a1 = [1, {name: 'douchen'}, 3];
>> let a2 = Array.from(a1);
>> a1[0] = 2; //修改基础值
>> a1[1].name = 'lanxin'; // 修改引用对象的内容
>> console.log(a1); // [ 2, { name: 'lanxin' }, 3 ]
>> console.log(a2); // [ 1, { name: 'lanxin' }, 3 ]
>> ```
>> 由此可知，Array.from()是**浅拷贝**，只是**对基础类型的拷贝**，而对于**引用对象**，复制的是**指向同一地址的指针**。  
>> Array.from()还接收第二个可选的**映射函数参数**。  
>> 该函数可以将原始类数组结构中的元素进行一定的修改，构建所需的新数组。
>> ```JavaScript
>> const arr = [1, 2, 3];
>> const arrNew = Array.from(arr, x => x**2);
>> console.log(arrNew); // [ 1, 4, 9 ]
>> ```

> **Array.of()**
>> Array.of()的参数是一系列将组成数组的元素。
>> ```JavaScript
>> let arr = Array.of(1, 2, 3);
>> console.log(arr); // [ 1, 2, 3]
>> console.log(arr.length); // 3
>> ```

## 数组迭代
数组迭代可用简单的循环迭代，如**for**, **while**循环等，也可以用.forEach()。
### 循环迭代
以for循环为例，如：
```JavaScript
let arr = [1, 2, 3];
for (let i = 0; i < arr.length; i++){
    console.log(i); // 1, 2, 3
}

// 或者使用ES6中的for of
for(let value of arr){
    console.log(value);
}
