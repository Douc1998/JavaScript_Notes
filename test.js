const iter = {
    * [Symbol.iterator](){
        yield 1;
        yield 2;
        yield 3;
    }
};

console.log(Array.from(iter));
