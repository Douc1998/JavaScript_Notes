
// let p = Promise.resolve('111');

// let p2 = p.then(() => {
//     return {
//         then: function(resolve, reject){
//             setTimeout(reject('failed'), 1000)
//         }
//     }
// })

// setTimeout(console.log, 2000, p2)


let p1 = Promise.race([
    new Promise((resolve, reject) => {}),
    new Promise((resolve, reject) => {
        setTimeout(resolve, 2000, 'The second promise fulfilled !'); // 2000ms 延迟后，状态变为解决
    })
]);

setTimeout(console.log, 0, p1); // (0ms 延迟) => Promise {<pending>}
setTimeout(console.log, 3000, p1); // (2000ms 延迟) => Promise {<fulfilled>: Array(3)}







