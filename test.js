const a = {
  name: 'dou',
  age: 24
}

// 组织新属性添加到 a
Reflect.preventExtensions(a);

console.log(Reflect.isExtensible(a)); // false