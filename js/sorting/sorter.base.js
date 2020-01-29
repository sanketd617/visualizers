class Sorter {
    static typeMap = {
        bubble: 1,
        quick: 2,
        selection: 3,
        insertion: 4,
        merge: 5
    };

    static nameMap = {
        merge: "Merge Sort",
        bubble: "Bubble Sort",
        selection: "Selection Sort",
        insertion: "Insertion Sort",
        quick: "Quick Sort"
    };

    static moveType = {
        next: 1,
        swap: 2,
        shift: 3,
        insert: 4,
        temporary: 5,
        select: 6,
        minimum: 7,
        pivot: 8,
        merge_shrink: 9,
        merge_grow: 10
    };

    static maxElements = 20;

    static sort(array, type) {

        let arrayCopy = array.slice();
        switch (type) {
            case 1:
                return BubbleSorter.sort(arrayCopy);
            case 2:
                return QuickSorter.sort(arrayCopy);
            case 3:
                return SelectionSorter.sort(arrayCopy);
            case 4:
                return InsertionSorter.sort(arrayCopy);
            case 5:
                return MergeSorter.sort(arrayCopy);
        }
    }
}

