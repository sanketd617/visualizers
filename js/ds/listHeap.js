class ListHeap {
    constructor(evaluator) {
        this.list = [];
        this.evaluate = evaluator;
    }

    insert(data) {
        this.list.push(data);
    }

    remove(index) {
        this.list.splice(index, 1);
    }

    index(data, comparator) {
        for (let i = 0; i < this.list.length; i++) {
            if (comparator(data, this.list[i])) {
                return i;
            }
        }
        return -1;
    }

    extract(tieBreaker) {
        if (this.list.length === 0) return null;
        let minIndex = 0;
        for (let i = 1; i < this.list.length; i++) {
            if (this.evaluate(this.list[i]) < this.evaluate(this.list[minIndex])) {
                minIndex = i;
            }
        }
        let result = Infinity;
        for(let i = 0; i < this.list.length; i++) {
            if(this.evaluate(this.list[i]) === this.evaluate(this.list[minIndex])) {
                let t = tieBreaker(this.list[i]);
                if(t < result) {
                    result = t;
                    minIndex = i;
                }
            }
        }
        return this.list.splice(minIndex, 1)[0];
    }

    empty() {
        return this.list.length === 0;
    }
}

// let heap = new ListHeap((a) => a.x);

// heap.insert({ x: 11});
// heap.insert({ x: 2});
// heap.insert({ x: 4});
// heap.insert({ x: 11});
// heap.insert({ x: 6});
// heap.insert({ x: 22});
// heap.insert({ x: 10});
//
// console.log(heap.index({x: 6}, (a, b) => a.x === b.x))