// 这两种方法是一样的
let p1 = new Promise((resolve, reject) => reject(Error('failed')));
let p2 = Promise.reject(Error('failed'))

console.log(p1); // Promise {<rejected>: Error: failed}
console.log(p2); // Promise {<rejected>: Error: failed}

let p3 = Promise.reject(p1);
console.log(p1 === p3); // false
console.log(p3); // Promise {<rejected>: Promise}