class BubbleSorter {
    static moves = [];

    static sort(array) {
        BubbleSorter.moves = [];
        for (let i = 0; i < array.length - 1; i++) {
            for (let j = i + 1; j < array.length; j++) {
                BubbleSorter.moves.push({
                    first: i,
                    second: j,
                    type: Sorter.moveType.next
                });
                if (array[i] > array[j]) {
                    let t = array[i];
                    array[i] = array[j];
                    array[j] = t;
                    BubbleSorter.moves.push({
                        first: i,
                        second: j,
                        type: Sorter.moveType.swap
                    });
                }
            }
        }
        return BubbleSorter.moves;
    }
}
