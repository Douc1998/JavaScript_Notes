function* generatorFn(){
    yield* [1, 2, 3];
}
let g = generatorFn();
console.log(g);
console.log(g.return(4));
console.log(g.next());