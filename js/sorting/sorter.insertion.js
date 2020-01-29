class InsertionSorter {
    static moves = [];

    static sort(array) {
        InsertionSorter.moves = [];
        for (let i = 1; i < array.length; i++) {
            let t = array[i];
            let j = i - 1;
            let flag = false;
            InsertionSorter.moves.push({
                first: i,
                type: Sorter.moveType.temporary
            });
            InsertionSorter.moves.push({
                first: j,
                type: Sorter.moveType.select
            });
            for (; j >= 0; j--) {
                if (array[j] <= t) {
                    j++;
                    break;
                }
                flag = true;
                InsertionSorter.moves.push({
                    first: j,
                    type: Sorter.moveType.shift
                });
                array[j + 1] = array[j];
                if(j === 0) {
                    break;
                }
            }
            if (flag) {
                InsertionSorter.moves.push({
                    first: j,
                    type: Sorter.moveType.insert
                });
                array[j] = t;
            }
            else {
                InsertionSorter.moves.push({
                    first: i,
                    type: Sorter.moveType.insert
                });
            }
        }
        return {
            moves: InsertionSorter.moves,
            array: array
        };
    }
}
