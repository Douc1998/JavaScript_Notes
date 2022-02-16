// 基于函数名定义函数
function sum(a, b) {
  return a + b
}
console.log(sum(10, 11)); // 21

// 声明 另一个函数声明
let anotherSum = sum;
console.log(anotherSum(10, 11)); // 21

// 切断sum和函数指针的联系，但不影响anotherSum声明，因为函数指针没有改变
sum = null;
console.log(anotherSum(10, 11));

