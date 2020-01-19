class Sorter {
    static type = {
        merge: 1,
        bubble: 2,
        selection: 3,
        insertion: 4,
        quick: 5
    };

    static moveType = {
        next: 1,
        swap: 2,
        shift: 3,
        insert: 4,
        temporary: 5,
        select: 6,
        minimum: 7,
        pivot: 8
    };

    static maxElements = 15;

    static sort(array, type) {

        let arrayCopy = array.slice();
        switch (type) {
            case 1:
                return MergeSorter.sort(arrayCopy);
            case 2:
                return BubbleSorter.sort(arrayCopy);
            case 3:
                return SelectionSorter.sort(arrayCopy);
            case 4:
                return InsertionSorter.sort(arrayCopy);
            case 5:
                return QuickSorter.sort(arrayCopy, 0, arrayCopy.length - 1);
        }
    }
}

