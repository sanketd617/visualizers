class QuickSorter {
    static moves = [];

    static partition(array, left, right) {
        let pivotIndex = Math.floor(left + (right - left) / 2);
        let pivot = array[pivotIndex];
        QuickSorter.moves.push({
            first: pivotIndex,
            type: Sorter.moveType.pivot
        });
        let i = left;
        let j = right;
        QuickSorter.moves.push({
            first: i,
            second: j,
            type: Sorter.moveType.next
        });
        while (i <= j) {
            while (array[i] < pivot) {
                QuickSorter.moves.push({
                    first: i,
                    second: j,
                    type: Sorter.moveType.next
                });
                i++;
            }
            while (array[j] > pivot) {
                QuickSorter.moves.push({
                    first: i,
                    second: j,
                    type: Sorter.moveType.next
                });
                j--;
            }
            if (i <= j) {
                QuickSorter.moves.push({
                    first: i,
                    second: j,
                    type: Sorter.moveType.swap
                });
                let t = array[j];
                array[j] = array[i];
                array[i] = t;
                i++;
                j--;
            }
        }
        return i;
    }


    static sort(array, left, right) {
        if(left === 0 && right === array.length - 1) {
            QuickSorter.moves = [];
        }
        if (array.length > 1) {
            let index = QuickSorter.partition(array, left, right);
            if (left < index - 1) {
                QuickSorter.sort(array, left, index - 1)
            }
            if (index < right) {
                QuickSorter.sort(array, index, right)
            }
        }
        return QuickSorter.moves;
    }
}
