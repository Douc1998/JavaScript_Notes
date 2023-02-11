
// let p = Promise.resolve('111');

// let p2 = p.then(() => {
//     return {
//         then: function(resolve, reject){
//             setTimeout(reject('failed'), 1000)
//         }
//     }
// })

// setTimeout(console.log, 2000, p2)

// 构建一个生成期约的工厂函数
function createPromise(value){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(value + 1);
        }, 1000)
    })
}

// 异步函数，利用 await 每隔一秒输出一个值
async function test(){
    let p1 = await createPromise(0);
    console.log(p1);
    let p2 = await createPromise(p1);
    console.log(p2);
    let p3 = await createPromise(p2);
    console.log(p3);
    let p4 = await createPromise(p3);
    console.log(p4);
    let p5 = await createPromise(p4);
    console.log(p5);
}

test();



// // 开始链式调用
// createPromise(0)
// .then(value => {console.log(value); return createPromise(value)}) // (1000ms后) => 1
// .then(value => {console.log(value); return createPromise(value)}) // (2000ms后) => 2
// .then(value => {console.log(value); return createPromise(value)}) // (3000ms后) => 3
// .then(value => {console.log(value); return createPromise(value)}) // (4000ms后) => 4
// .then(value => console.log(value)) // (5000ms后) => 5

/**
 * 输出：
 * (1000ms 后）1
 * (2000ms 后）2
 * (3000ms 后）3
 * (4000ms 后）4
 * (5000ms 后）5
 */






