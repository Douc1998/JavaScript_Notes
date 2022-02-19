// 利用函数声明
console.log(sum(10, 10)); // 20
function sum(num1, num2){
  return num1 + num2;
}
// 利用函数表达式
console.log(sum(10, 10)); // ReferenceError: Cannot access 'sum' before initialization
let sum = function(num1, num2){
  return num1 + num2;
}