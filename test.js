// 创建结点Node类
class Node {
    constructor(id) {
        this.id = id;
        this.neighbors = new Set();
    }
    // 结点双向连接
    connect(node) {
        if (node !== this) {
            this.neighbors.add(node);
            node.neighbors.add(this);
        }
    }
}

// 创建随机双向图类
class graph {
    constructor(size) {
        this.nodes = new Set();
        for (let i = 0; i < size; i++) {
            this.nodes.add(new Node(i));
        }
        const threshold = 1 / size; // 概率阈值，是否连接
        for (const x of this.nodes) {
            for (const y of this.nodes) {
                if (Math.random() < threshold) {
                    x.connect(y);
                }
            }
        }
    }
    print() { // 输出随机图
        for (const node of this.nodes) {
            const ids = [...node.neighbors].map((node) => node.id).join(',');
            console.log(node.id.toString() + ':' + ids);
        }
    }
    isConnect(){ // 判断随机图是否连通，即每两个点都可达
        const visitedNodes = new Set();
        function* traverse(nodes){ // 使用递归生成器
            for(const node of nodes){
                if(!visitedNodes.has(node)){
                    yield node; // 遇到yield，暂停函数并保存函数当前状态，可利用.next()或for of继续执行。
                    yield* traverse(node.neighbors);
                }
            }
        }
        //  取得集合中的第一个节点
        const firstNode = this.nodes[Symbol.iterator]().next().value;
        // 使用递归生成器迭代每个节点
        for(const node of traverse([firstNode])){ 
            // 继续开始执行traverse函数，并将node添加入visitedNodes
            visitedNodes.add(node);
        };
        if(visitedNodes.size === this.nodes.size){
            console.log('isConnected !');
            return true;
        }else{
            console.log(visitedNodes);
            return false;
        }
    }
}

const g = new graph(6);
g.print();
g.isConnect();