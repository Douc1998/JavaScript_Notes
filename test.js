class iteratableObject{
    constructor(countLimit){
        this.countLimit = countLimit
    };
    [Symbol.iterator](){ // 利用Symbol.Iterator工程函数自定义迭代器
        let count = 0;
        let limit = this.countLimit;
        return{
            next(){ // 自定义next()函数
                if(count <= limit){
                    return {done: false, value: count++}
                }else{
                    return {done: true, value: undefined}
                }
            },
            return(){ // 提前终止return()
                console.log('stop early');
                return {done: true}
            }
        }
    }
}

const obj = new iteratableObject(5);
for(const i of obj){
    if(i > 4){
        break
    }
    console.log(i); // 0 1 2 3 4 (5不输出，输出'stop early')
}
