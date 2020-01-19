class MergeSorter {
    static moves = [];

    static merge(leftArray, rightArray) {
        let sortedArr = [];
        while (leftArray.length && rightArray.length) {
            if (leftArray[0] <= rightArray[0]) {
                sortedArr.push(leftArray[0]);
                leftArray = leftArray.slice(1)
            } else {
                sortedArr.push(rightArray[0]);
                rightArray = rightArray.slice(1)
            }
        }
        while (leftArray.length)
            sortedArr.push(leftArray.shift());
        while (rightArray.length)
            sortedArr.push(rightArray.shift());
        return sortedArr;
    }

    static sort(array, flag) {
        if(flag === undefined) {
            MergeSorter.moves = [];
        }
        if (array.length < 2) {
            return array;
        }
        let midpoint = parseInt(array.length / 2);
        let leftArray = array.slice(0, midpoint);
        let rightArray = array.slice(midpoint, array.length);
        return MergeSorter.merge(MergeSorter.sort(leftArray, true), MergeSorter.sort(rightArray, true));
    }
}
