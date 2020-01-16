class SelectionSorter extends BubbleSorter {
    constructor() {
        super({
            requiresPivot: false,
        });
    }

    selectInitial() {
        super.selectInitial();
        this.minimum = 0;
    }

    compare() {
        if(this.minimum === -1) {
            this.minimum = this.first;
        }
        if (this.array[this.minimum] > this.array[this.second]) {
            this.minimum = this.second;
        }
        if (this.second === this.array.length - 1) {
            this.needToSwap = true;
        } else {
            this.needToSwap = false;
        }
    }
}
