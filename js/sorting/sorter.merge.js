class MergeSorter {
    static moves = [];

    static merge(leftArray, rightArray, leftStart, rightStart) {
        let sortedArr = [];
        let count = 0;
        let leftCount = 0;
        let rightCount = 0;
        while (leftArray.length && rightArray.length) {
            if (leftArray[0] <= rightArray[0]) {
                sortedArr.push(leftArray[0]);
                leftArray = leftArray.slice(1);
                MergeSorter.moves.push({
                    first: leftStart + leftCount,
                    second: leftStart + count,
                    type: Sorter.moveType.merge_shrink
                });
                leftCount++;
            } else {
                sortedArr.push(rightArray[0]);
                rightArray = rightArray.slice(1)
                MergeSorter.moves.push({
                    first: rightStart + rightCount,
                    second: leftStart + count,
                    type: Sorter.moveType.merge_shrink
                });
                rightCount++;
            }
            count++;
        }
        while (leftArray.length) {
            sortedArr.push(leftArray.shift());
            MergeSorter.moves.push({
                first: leftStart + leftCount,
                second: leftStart + count,
                type: Sorter.moveType.merge_shrink
            });
            leftCount++;
            count++;
        }
        while (rightArray.length) {
            sortedArr.push(rightArray.shift());
            MergeSorter.moves.push({
                first: rightStart + rightCount,
                second: leftStart + count,
                type: Sorter.moveType.merge_shrink
            });
            rightCount++;
            count++;
        }

        MergeSorter.moves.push({
            first: leftStart,
            second: -1,
            type: Sorter.moveType.merge_grow
        });

        return sortedArr;
    }

    static sortHelper(array, start, end, flag) {
        if (flag === undefined) {
            MergeSorter.moves = [];
        }
        if (array.length < 2) {
            return array;
        }
        let midpoint = parseInt(array.length / 2);
        let leftArray = array.slice(0, midpoint);
        let rightArray = array.slice(midpoint, array.length);
        return MergeSorter.merge(MergeSorter.sortHelper(leftArray, start, start + midpoint - 1, true), MergeSorter.sortHelper(rightArray, start + midpoint, end, true), start, start + midpoint);
    }

    static sort(array) {
        array = MergeSorter.sortHelper(array, 0, array.length - 1)
        return {
            moves: MergeSorter.moves,
            array: array
        };
    }
}
