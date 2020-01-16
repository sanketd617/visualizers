class BubbleSorter extends Sorter {
    constructor() {
        super({
            requiresPivot: false,
        });
    }

    selectInitial() {
        this.first = 0;
        this.second = 1;
    }

    selectNext() {
        this.second = (this.second + 1) % this.array.length;
        if (this.second === 0) {
            this.first++;
            this.second = this.first + 1;
        }
    }

    isSorted() {
        return this.first === this.array.length - 1 && this.second === this.first + 1;
    }

    compare() {
        if (this.array[this.first] > this.array[this.second]) {
            this.needToSwap = true;
        } else {
            this.needToSwap = false;
        }
    }
}
