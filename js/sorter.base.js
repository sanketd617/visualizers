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

    static createViews(array, maxWidth, maxHeight) {
        let total = array.length;
        let maxSize = 50;
        let minSize = 30;
        let maxSpacing = 50;
        let minSpacing = 30;
        let spacing = minSpacing + (maxSpacing - minSpacing) * Math.cos((total / Sorter.maxElements) * Math.PI / 2);
        let size = minSize + (maxSize - minSize) * Math.cos((total / Sorter.maxElements) * Math.PI / 2);
        let startLeft = (maxWidth - size * total - spacing * (total - 1)) / 2;

        let minValue = Math.min.apply(Math, array);
        let maxValue = Math.max.apply(Math, array);

        function create(number, index) {
            let left = parseInt(startLeft + index * (spacing + size));
            let top = maxHeight - 0.2 * maxHeight - 0.6 * maxHeight * array[index] / maxValue;
            let height = 0.8 * maxHeight - top;
            let view = document.createElement("div");
            view.classList.add('elem');
            view.style.width = size + 'px';
            view.style.height = size + 'px';
            view.style.borderRadius = size / 2 + 'px';
            view.style.left = left + 'px';
            view.style.top = top + 'px';
            view.style.height = height + 'px';
            view.innerHTML = number;
            return view;
        }

        let viewMap = {};

        for (let i = 0; i < array.length; i++) {
            viewMap[i] = create(array[i], i, array.length);
        }

        return viewMap;
    }

    static layoutViews(id, viewMap, total) {
        for (let i = 0; i < total; i++) {
            document.getElementById(id).appendChild(viewMap[i]);
        }
    }

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

