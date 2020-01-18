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
        minimum: 7
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
        for(let i = 0; i < total; i++) {
            document.getElementById(id).appendChild(viewMap[i]);
        }
    }

    static sort(array, type) {
        let moves = [];

        function bubble(array) {
            for (let i = 0; i < array.length - 1; i++) {
                for (let j = i + 1; j < array.length; j++) {
                    moves.push({
                        first: i,
                        second: j,
                        type: Sorter.moveType.next
                    });
                    if (array[i] > array[j]) {
                        let t = array[i];
                        array[i] = array[j];
                        array[j] = t;
                        moves.push({
                            first: i,
                            second: j,
                            type: Sorter.moveType.swap
                        });
                    }
                }
            }
            return moves;
        }

        function insertion(array) {
            for (let i = 1; i < array.length; i++) {
                let t = array[i];
                let j = i - 1;
                moves.push({
                    first: t,
                    second: -1,
                    type: Sorter.moveType.temporary
                });
                moves.push({
                    first: j,
                    second: -1,
                    type: Sorter.moveType.select
                });
                for (; j >= 0; j--) {
                    if (array[j] < t) {
                        j++;
                        break;
                    }
                    moves.push({
                        first: j,
                        second: -1,
                        type: Sorter.moveType.shift
                    });
                    array[j + 1] = array[j];
                }
                if (j >= 0) {
                    moves.push({
                        first: j,
                        second: t,
                        type: Sorter.moveType.insert
                    });
                    array[j] = t;
                }
            }
            return moves;
        }

        function selection(array) {
            for (let i = 0; i < array.length - 1; i++) {
                let k = i;
                for (let j = i + 1; j < array.length; j++) {
                    moves.push({
                        first: i,
                        second: j,
                        type: Sorter.moveType.next
                    });
                    if (array[j] < array[k]) {
                        moves.push({
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
                moves.push({
                    first: i,
                    second: k,
                    type: Sorter.moveType.swap
                });
            }
            return moves;
        }

        function partition(array, left, right) {
            let pivot = array[Math.floor((right + left) / 2)];
            let i = left;
            let j = right;
            while (i <= j) {
                while (array[i] < pivot) {
                    i++;
                }
                while (array[j] > pivot) {
                    j--;
                }
                if (i <= j) {
                    let t = array[j];
                    array[j] = array[i];
                    array[i] = t;
                    i++;
                    j--;
                }
            }
            return i;
        }

        function quick(array, left, right) {
            if (array.length > 1) {
                let index = partition(array, left, right);
                if (left < index - 1) {
                    Sorter.quick(array, left, index - 1)
                }
                if (index < right) {
                    Sorter.quick(array, index, right)
                }
            }
            return array;
        }

        function merge(leftArray, rightArray) {
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

        function mergeSort(array) {
            if (array.length < 2) {
                return array;
            }
            let midpoint = parseInt(array.length / 2);
            let leftArray = array.slice(0, midpoint);
            let rightArray = array.slice(midpoint, array.length);
            return merge(mergeSort(leftArray), mergeSort(rightArray));
        }

        let arrayCopy = array.slice();
        switch (type) {
            case 1:
                return mergeSort(arrayCopy);
            case 2:
                return bubble(arrayCopy);
            case 3:
                return selection(arrayCopy);
            case 4:
                return insertion(arrayCopy);
            case 5:
                return quick(arrayCopy);
        }
    }
}

