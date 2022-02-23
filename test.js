let x = 520;
// 延时函数, 1s后执行
setTimeout(() => {
  x += 1;
  console.log(x); // 521
}, 1000)

console.log(x) //520