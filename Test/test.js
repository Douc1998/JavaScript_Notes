// let xhr = new XMLHttpRequest();
// xhr.open('GET', './myData/users.json', true);
// xhr.responseText = 'json';
// xhr.onload = function(){
//     if((this.status >= 200 && this.status < 300) || this.status == 304){
//         console.log(this.response);
//     }else{
//         console.log(new Error(this.statusText));
//     }
// }
// xhr.send();

// ！！！ 使用 GET 就可以获取成功，但是 POST 不行。原因是：静态资源只能 GET，不能 POST
// let xhr = new XMLHttpRequest();
// xhr.open('POST', 'http://www.liulongbin.top:3006/api/getbooks');
// xhr.responseText = 'json';
// xhr.onload = function(){
//     if((this.status >= 200 && this.status < 300) || this.status == 304){
//         console.log(this.response);
//     }else{
//         console.log(new Error(this.statusText));
//     }
// }
// xhr.setRequestHeader('Content-Type', "application/x-www-form-urlencoded");
// xhr.send();
// let dom = document.getElementById('input');
// dom.addEventListener('keydown', (e) => {
//     console.log('keydown:' + e.key)
// })

// dom.addEventListener('textInput', (e) => {
//     console.log('textInput:' + e.data)
// })

// dom.addEventListener('keyup', (e) => {
//     console.log('keyup:' + e.key)
// })

let abortController = new AbortController();

fetch('./wikipedia.zip', {
    signal: abortController.signal
}).catch((e) => console.log(e));

// 10ms 后中断请求
setTimeout(() => abortController.abort(), 10);

// 已经中断