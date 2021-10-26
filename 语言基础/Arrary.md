# 数组 Array
## 创建数组
### 基础方法
```JavaScript
let arr = new Array(); // 空数组
let arr = []; // 空数组
let arr = new Array(5); // 创建长度为5的数组
let colors = new Array('red', 'blue', 'green'); // 初始化数组
```

### from() 和 of()
ES6新增了两种用于创建数组的静态方法：from() 和 of()。  
from() 用于将`类数组结构`转为数组实例，of() 用于将一组参数转换为数组实例。  
> **Array.from()**  
>> Array.from()的第一个参数是一个类数组对象，即任何*可迭代*的结构，或者有一个*length属性*和*可索引元素*的结构。
>> ```JavaScript
>> // 字符串会被产分为单字符数组
>> console.log(Array.from('douchen')); // ['d', 'o', 'u', 'c', 'h', 'e', 'n']
>> // 将集合Set和映射Map转换为数组
>> const s = new Set().add(1).add(2).add(3);
>> console.log(Array.from(s)); // [1, 2, 3]
>> const m = new Map().set('name', 'douchen').set('age', 23);
>> console.log(Array.from(m)); // [ ['name', 'douchen'], ['age', 23]]