Reflect.has({x: 0}, "x"); // true
Reflect.has({x: 0}, "y"); // false

// 如果该属性存在于原型链中，返回true
Reflect.has({x: 0}, "toString");

// Proxy 对象的 .has() 句柄方法
obj = new Proxy({}, {
  has(t, k) { return k.startsWith("door"); }
});
Reflect.has(obj, "doorbell"); // true
Reflect.has(obj, "dormitory"); // false
