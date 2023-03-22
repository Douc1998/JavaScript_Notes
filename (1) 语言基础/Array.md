# 数组 Array
## 1. 创建数组
### 基础方法
直接创建数组，使用**new Array()** 或 **[]**。
```JavaScript
let arr = new Array(); // 空数组
let arr = []; // 空数组
let arr = new Array(5); // 创建长度为5的数组
let colors = new Array('red', 'blue', 'green'); // 初始化数组
```
### from() 和 of()
ES6新增了两种用于创建数组的静态方法：**from()** 和 **of()**。  
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
>> 由此可知，Array.from()是我们常说的**一层拷贝**，只拷贝了第一层数据，对于内部嵌套的数据是只拷贝了指针。
>> 专业解释则是：***浅拷贝***，只是***对基础类型的拷贝***。而对于***引用对象***，复制的是***指向同一地址的指针***。  
>> Array.from()还接收第二个可选的***映射函数参数***。  
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

## 2. 迭代器方法
ES6中，Array上出现了3个用于检索数组内容的方法：**keys()**, **values()** 和 **entries()**。
### keys()
keys()返回数组索引的迭代器。如：
```JavaScript
const arr = ['douchen', 'aoteman', 'peter', 'lucy'];
const arrKeys = Array.from(arr.keys());
console.log(arrKeys); // [0, 1, 2, 3]
```
### values()
values()返回数组元素的迭代器。如：
```JavaScript
const arrValues = Array.from(arr.values());
console.log(arrValues); // ['douchen', 'aoteman', 'peter', 'lucy']
```
### entries()
entries()返回索引和元素值对的迭代器。如：
```JavaScript
const arrEntries = Array.from(arr.entries());
console.log(arrEntries); // [[0, 'douchen'], [1, 'aoteman'], [2, 'peter'], [3, 'lucy']]
```
使用ES6中的解构可以非常容易地在循环中拆分键值对：
```JavaScript
for(let [idx, element] of arrEntries){
    console.log(idx); // 0 1 2 3
    console.log(element); //douchen aoteman peter lucy
}
```
## 3. 复制和填充方法
ES6新增了两个复制和填充的方法：批量复制方法**copyWithin()**, 以及填充数组方法**fill()**。  
### copyWithin()
copyWithin()会按照指定范围**浅复制**数组中的部分内容，然后将它们插入到指定位置。其参数设置为**copyWithin(loc, start, end)**，如：
```JavaScript
let arr = [0, 1, 2, 3];
arr.copyWithin(0, 1, 3); // 复制索引1开始到索引3（不包括）结束的内容，插入到索引 0 开始的位置
console.log(arr); // [1, 2, 2, 3], 覆盖了0和1
```
copyWithin()会**忽略**超出数组边界、零长度和方向相反的索引范围。
### fill()
fill()可以向数组中指定位置插入相同的值。其参数设置为**fill(value, start, end)**，如：
```JavaScript
let arr = [0, 0, 0, 0];
arr.fill(5, 1, 3); // 用数值5替换索引1到索引3（不包括）位置的值
console.log(arr); // [0, 5, 5, 0]
```
类似于copyWithin()，fill()也会**忽略**超出数组边界、零长度和方向相反的索引范围。
## 4. 数组转换字符串
**toString()** 和 **join()** 可以将数组元素拼接为字符串。
### toString()
toString()可以将数组元素拼接为用逗号(,)连接的字符串。如：
```JavaScript
let arr = ['douchen', 'lanxin'];
console.log(arr.toString()); // douchen,lanxin
```
如果不想要用逗号，想要用其他的分隔符连接呢？那么可以使用join()。
### join()
join()方法接收一个参数，即**字符串分隔符**，返回包含所有元素且用字符串分隔符连接的字符串。如：
```JavaScript
let arr = ['douchen', 'lanxin'];
console.log(arr.join('&&')); // douchen&&lanxin
```
## 5. 栈方法
栈Stack是一种"先进后出"的数据结构。数据项的添加(称为推入，**push**)和删除(称为弹出，**pop**)。  
ES为数组提供了 **push()** 和 **pop()** 方法，以实现类似栈的行为。
### push()
push()接收任意数量的参数，并将它们**添加到数组末尾**，**返回数组的最新长度**。如：
```JavaScript
let names = new Array();
let count = names.push('douchen', 'aoteman');
console.log(count); // 2
console.log(names); // ['douchen', 'aoteman']
```
### pop()
pop()不接收任何参数，只用于**取出数组的最后一项**，**返回取出的值**。如：
```JavaScript
let names = ['douchen', 'aoteman'];
let count = names.pop();
console.log(count); // aoteman
console.log(names); // ['douchen']
```
## 6. 队列方法
队列 Queue 是一种"先进先出"的数据结构。队列在列表末尾添加数据，在列表开头删除数据。
ES为数组提供了 **push()** 和 **shift()** 方法，以实现类似队列的行为。
### push()
类似于栈的push方法，↑↑↑
### shift()
shift()和栈的pop()相反，它将会**取出数组的第一项**。返回取出的值。如：
```JavaScript
let names = ['douchen', 'aoteman'];
let count = names.shift();
console.log(count); // douchen
console.log(names); // ['aoteman']
```
### unshift()
ES也为数组提供了unshift()方法，和shift()相反，以实现在数组的开头添加任意个数。如：
```JavaScript
let names = ['douchen'];
names.unshift('aoteman', 'peter');
console.log(names); // ['aoteman', 'peter', 'douchen']
```
## 7. 排序方法
ES为数组提供了两种排序对数组元素进行重新排序：**reserve()** 和 **sort()**。  
其中，reserve()只是简单地**将数组元素逆序排序**，sort()会**按照升序重新排列**数组元素。
### reserve()
reserve()没什么可以介绍的，就是让数组换个方向。[1, 2, 3]变为[3, 2, 1]。
### sort()
sort() 是一个让人又爱又恨的方法。它比 reserve() 有用得多，但是它又不能满足我们对数值的排序。  
为什么呢？因为 sort( )在排序中会先**将数值转为字符串**，然后比较字符串决定顺序。如：
```JavaScript
let arr = [2, 1, 22, 11, 3, 4];
arr.sort();
console.log(arr); // [ 1, 11, 2, 22, 3, 4 ]
```
显然，在字符串中，'1'和'11'都是1开头，排在2前面，所以**11和22顺序就不对**了。那该怎么办呢？  
ES还算人性化，给sort()可以接收一个**比较函数**，用于判断哪个值应该排在前面。  
比较函数接收两个参数a和b，**如果a应该排在b前面，就返回负值，反之返回正值，如果相同则返回0**。如：
```JavaScript
// ES6的箭头函数+条件表达式，相当方便
arr.sort((a, b) => a < b ? -1: a > b ? 1 : 0);
// 麻烦点可以
arr.sort(function(a, b){
    if(a < b){
        return -1;
    }else if(a > b){
        return 1;
    }else{
        return 0;
    }
})
```
简单点来说，我们也可以把比较函数写成 a - b 的值来代替 -1、1、0。如：

```JS
arr.sort((a, b) => a - b);
```

## 8. 数组操作
对于数组，我们常常会有一些操作，如合并数组、数组切片和在数组中插入、删除、替换元素等。  
下面将介绍数组的concat()、slice()和splice()方法。
### concat()
concat()顾名思义，是创建一个新数组，其值是一些数组**合并后的结果**。注意！！！**该方法不会对原数组进行修改**。如：
```JavaScript
let [person1, person2, person3] = [['douchen'], ['aoteman'], ['peter']];
let persons = person1.concat(person2, person3, 'lucy');
console.log(person1); // [ 'douchen' ]
console.log(persons); // [ 'douchen', 'aoteman', 'peter', 'lucy' ]

let a = [1, 2];
let b = [[3, 4], [5, 6]];
console.log(a.concat(b, [7, 8], 9, 10)); // [1, 2, [3, 4], [5, 6], 7, 8, 9, 10]
```
### slice()
slice()用于创建一个包含原数组中一个或多个元素的新数组，即将**原数组切片**，得到一个**新数组**，其参数设置为**slice(start, end)**。如：
```JavaScript
let nums = [1, 2, 3, 4, 5];
let newNums = nums.slice(1, 3);
console.log(newNums); // [ 2, 3 ]
```
### splice()
splice()可以说是数组中最强大的操作方法了，它可以实现在数组**指定位置插入、删除和替换**元素。  
其参数设置为**splice(loc, deleteNum, value)**，**返回删除的元素**。通过**对参数的不同设置，实现不同的功能**。如：
> **插入**
>> 需要给splice()传***3***个参数：***插入位置***、***0(要删除的元素数量)***、***要插入的元素***。
>> ```JavaScript
>> let names = ['douchen', 'aoteman', 'peter'];
>> console.log(names.splice(1, 0, 'lucy')); // [], 空数组，因为没有被删除的元素
>> console.log(names); // [ 'douchen', 'lucy', 'aoteman', 'peter' ]
>> ```

> **删除**
>> 需要给splice()传***2***个参数：***开始删除的位置***、***deletNum(要删除的元素数量)***。
>> ```JavaScript
>> let names = ['douchen', 'aoteman', 'peter', 'lucy'];
>> console.log(names.splice(2, 2)); // [ 'peter', 'lucy' ] 
>> console.log(names); // [ 'douchen', 'aoteman' ]
>> ```

> **替换**
>> 需要给splice()传***3***个参数：***开始的位置***、***要删除的元素数量***、***要插入的任意多个元素***。
>> ```JavaScript
>> let names = ['douchen', 'aoteman', 'peter', 'lucy'];
>> console.log(names.splice(2, 1, 'jack', 'tom')); // 删除了一个元素[ 'peter' ]，插入两个元素 
>> console.log(names); // [ 'douchen', 'aoteman', 'jack', 'tom', 'lucy' ]
>> ```

## 9. 搜索方法
ES提供了两类的搜索方法，即**按严格相等搜索**和**按断言函数搜索**。
### 按严格相等
按严格相等搜索包括三个方法：**indexOf()**、**lastIndexOf()** 和 **includes()**。
> **indexOf**
>> indexOf()从数组***开头***进行搜索，返回搜索值在数组中的***第一个索引***的位置。  
>> 接收两个参数：***value***, ***start***，没有start参数则默认从头开始。如：
>> ```JavaScript
>> let nums = [1, 2, 3, 4, 1, 2, 3, 4];
>> console.log(nums.indexOf(1, 0)); // 从第一个位置开始搜索1，返回位置为0 
>> console.log(nums.indexOf(1, 2)); // 从第三个位置开始搜索1，返回位置为4
>> ```

> **lastIndexOf**
>> lastNndexOf()与indexOf()相反，从数组***末尾***开始搜索，也有两个参数，分别是：***value***, ***start***。
>> start 表示开始的位置，从 start 开始的位置往左（起始点方向）开始搜索。
>> ```JavaScript
>> let nums = [1, 2, 3, 4, 1, 2, 3, 4];
>> console.log(nums.lastIndexOf(4, 7)); // 从第 7 个位置往左开始搜索 4，返回位置为 7 
>> console.log(nums.lastIndexOf(4, 6)); // 从第 6 个位置往左开始搜索 4，返回位置为 3
>> ```

> **includes**
>> ES7新增了includes()方法，用于判断**从搜索位置开始到数组结尾**，数组中是否包含某个元素，返回bool值。
>> 接收两个参数：***value***, ***start***，没有start参数则默认从头开始。如：
>> ```JavaScript
>> let nums = [1, 2, 3, 4];
>> console.log(nums.includes(1, 0)); // 从第一个位置开始搜索1，返回true 
>> console.log(nums.includes(1, 1)); // 从第二个位置开始搜索1，返回false
>> ```

### 按断言函数
按照断言函数搜索数组，每个索引都会调用这个函数。断言函数的返回值决定了相应索引的元素是否被认为匹配。  
**find()** 和 **findIndex()** 使用了断言函数，断言函数接收**3**个参数：**element、index、arr**。  
> **find()**
>> find()从数组开头进行搜索，返回第一个匹配的元素。如：
>> ```JavaScript
>> let nums = [1, 2, 3, 4];
>> console.log(nums.find((element, index, arr) => element > 1)); // 2
>> ```

> **findIndex()**
>> 与find()相似，不过返回的是第一个匹配的元素的索引。
>> ```JavaScript
>> let nums = [1, 2, 3, 4];
>> console.log(nums.findIndex((element, index, arr) => element > 1)); // 1
>> ```
## 10. 数组迭代
ES为数组提供了5种迭代方法（不包含for\while等循环迭代），分别是**every()**、**some()**、**forEach()**、**map()** 和 **filter()**。
### every()
every()会对数组每一项都计算传入的函数，如果**每一项函数都返回true**，则返回true。参考&&。如：
```JavaScript
let nums = [1, 2, 3, 4];
console.log(nums.every((element, index, arr) => element > 0)); // true
console.log(nums.every((element, index, arr) => element > 1)); // false
```
### some()
some()与every()不同，只要**有一项函数都返回true**，则返回true。参考||。
### forEach()
forEach()会对数组中的每一项都计算传入的函数，没有返回值，类似for循环。如：
```JavaScript
let nums = [1, 2, 3, 4];
nums.forEach((element, index, arr) => {
    if(element > 2){
        console.log(element) // 3 4
    }
})
```
### map()
map()是一个很常用的方法，它对每一项进行函数计算，**再由计算后的结果组成一个新数组**。如：
```JavaScript
let nums = [1, 2, 3, 4];
let newNums = nums.map((element, index, arr) => element**2); //d对每一项求平方
console.log(newNums); // [ 1, 4, 9, 16 ]
```
### filter()
filter()也是一个很常用的方法，与map()不同，它会**将函数返回true的项组成一个数组**。如：
```JavaScript
let nums = [1, 2, 3, 4];
let newNums = nums.filter((element, index, arr) => element > 2); //d对每一项求平方
console.log(newNums); // [ 3, 4 ]
```
filter()和map()的区别在于，前者是**将符合要求的原始元素**组成新数组，**后者是将原始元素变换后**组成新数组。
