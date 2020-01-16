class Sorter {
    /*
    props {
        requiresPivot: boolean
    }
     */

    constructor(props) {
        this.array = [];
        this.pivot = -1;
        this.first = -1;
        this.second = -1;
        this.minimum = -1;
        this.needToSwap = false;
    }

    sort(array) {
        this.array = array;
        this.selectInitial();

        while (!this.isSorted()) {
            // console.log(this.first, this.second);
            this.compare();
            if (this.needToSwap) {
                console.log("swapping", this.first, this.minimum !== -1 ? this.minimum : this.second)
                let t = this.array[this.first];
                this.array[this.first] = this.array[this.minimum !== -1 ? this.minimum : this.second];
                this.array[this.minimum !== -1 ? this.minimum : this.second] = t;
                this.minimum = -1;
            }
            console.log(this.array);
            this.selectNext();
        }
    }

    selectInitial() {

    }

    selectNext() {

    }

    isSorted() {

    }

    compare() {

    }

}