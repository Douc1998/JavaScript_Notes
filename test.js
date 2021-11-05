// 创建一个0~100间所有偶数的数组
const myArr = Array.from({
    [Symbol.iterator]: function*(){
        for(let i = 0; i <= 100; i++){
            if(i % 2 === 0){
                yield i 
            }
        } 
    }
})

const rangeArr = (start, end, step) => {
    function *iter(){
        for(let i = start; i <= end; i += step){
            if(i % 2 === 0){
                yield i 
            }
        } 
    }
    return{
        [Symbol.iterator]: iter
    }
}
console.log(Array.from(rangeArr(50, 60, 2)));
