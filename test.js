// 作为键的对象，其内部属性可以修改
const keyObj = {'age': 23};
const m2 = new Map([
    [keyObj, 'douchen']
]);
for(let key of m2.keys()){
    key.age = 100;
    console.log(key); // user2
}
console.log(keyObj);
console.log(m2.keys()); // [Map Iterator] { 'user1' }