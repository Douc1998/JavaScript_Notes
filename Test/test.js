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



/**@type {HTMLCanvasElement} */
let drawing = document.querySelector('#draw');
let ctx = drawing.getContext("2d");
let image = new Image(100, 100);

image.onload = drawImageActualSize; // 浏览器会异步加载图片，只有加载完之后才能绘制到 canvas 上，否则无效
image.src = './myData/img.jpg';
function drawImageActualSize() {
  // To use the custom size we'll have to specify the scale parameters
  // using the element's width and height properties - lets draw one
  // on top in the corner:
  ctx.drawImage(this, 0, 0, this.width, this.height);
// 
}


// 获取祖先节点 div 
let div = document.querySelector('#myDiv');
// 获取子节点 canvas
let canvas = document.querySelector('#draw');
console.log(div.contains(canvas));  // true








