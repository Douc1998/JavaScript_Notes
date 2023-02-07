function sum(...arr){
  return arr.reduce((prev, cur) => prev + cur, 0)
}

const proxy = new Proxy(sum, {
  apply(target, thisArg, argumentsList){
    for(const arg of argumentsList){ // 要求输入的参数必须都是 number 类型
      if(typeof arg !== 'number'){
        throw 'The number of input array must be number !'
      }
    }
    return Reflect.apply(...arguments);
  }
})

console.log(proxy(1, 2, 3)); // 6
console.log(proxy([1, '2', 3])); // The number of input array must be number !