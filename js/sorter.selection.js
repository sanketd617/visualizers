class SelectionSorter {
    static moves = [];

    static sort(array) {
        SelectionSorter.moves = [];
        for (let i = 0; i < array.length - 1; i++) {
            let k = i;
            for (let j = i + 1; j < array.length; j++) {
                SelectionSorter.moves.push({
                    first: i,
                    second: j,
                    type: Sorter.moveType.next
                });
                if (array[j] < array[k]) {
                    SelectionSorter.moves.push({
                        first: j,
                        second: -1,
                        type: Sorter.moveType.minimum
                    });
                    k = j;
                }
            }
            let t = array[k];
            array[k] = array[i];
            array[i] = t;
            SelectionSorter.moves.push({
                first: i,
                second: k,
                type: Sorter.moveType.swap
            });
        }
        return SelectionSorter.moves;
    }
}
