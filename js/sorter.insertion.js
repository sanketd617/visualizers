class InsertionSorter extends BubbleSorter {

    constructor() {
        super({
            requiresPivot: false
        });

    }

    selectInitial() {
        super.selectInitial();
        this.temporary = this.array[this.second];
    }

    isSorted() {
        return this.second === this.array.length - 1 && this.array[this.second - 1] < this.array[this.second];
    }

    selectNext() {
        if (this.first === this.second) {
            this.second++;
            this.temporary = this.array[this.second];
        } else {
            this.first--;
        }
    }

    compare() {
        if (this.array[this.first] < this.temporary) {
            this.needToSwap = true;
        } else {
            this.needToSwap = false;
            this.shift();
        }
    }

    shift() {
        this.array[this.first + 1] = this.array[this.first];
        this.array[this.first] = undefined;
    }

    swap() {
        this.array[this.first + 1] = this.temporary;
        this.first = this.second;
    }

    finish() {
        this.array[this.first + 1] = this.temporary;
    }
}
