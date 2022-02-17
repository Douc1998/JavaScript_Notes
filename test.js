function sayHi_with_params(name, message) {
  console.log('hello' + name + ',' + message + '!')
}
// 也可以写成不声明参数的类型
function sayHi_without_params() {
  console.log('hello' + arguments[0] + ',' + arguments[1] + '!')
}
sayHi_with_params('xiaoli', 'ni hao')
sayHi_without_params('xiaoli', 'ni hao')
// 上述两者输出一样 ：'hello xiaoli, ni hao !'

// shuchu arguments对象的length属性
function print_params_length() {
  console.log(arguments.length)
}
print_params_length(...[0, 1, 2, 3, 4, 5]) // length = 6 

// 基于function关键字的函数
function func1(){
  console.log(arguments[0]);
}
func1(5, 6, 7); // arguments[0]为 5

// 箭头函数使用arguments 将出现error
let func2 = () => {
  console.log(arguments[0]);
}
func2(5, 6, 7); //Error: arguments is not defined

// 多传入参数
let func3 = (a) => {
  console.log(a);
}
func3(5, 6, 7) // 5

// 少传入参数
let func4 = (a, b, c, d) => {
  console.log(d)
}
func4(5, 6, 7) // undefined

// 包装在function函数中使用arguments
function func5() {
  let func6 = () => {
    console.log(arguments[0]);
  };
  func6();
}
func5(5, 6, 7) // 5