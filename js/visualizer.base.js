class Visualizer {
    static setSpeed(speed) {
        BubbleVisualizer.speed = speed;
        InsertionVisualizer.speed = speed;
        SelectionVisualizer.speed = speed;
        MergeVisualizer.speed = speed;
        QuickVisualizer.speed = speed;
    }

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
            // let top = maxHeight - 0.2 * maxHeight - 0.6 * maxHeight * array[index] / (maxValue);
            let A = 0.2 * maxHeight;
            let B = 0.8 * maxHeight - size;
            let R = (B - A) / (maxValue - minValue);
            let top = (maxValue - array[index]) * R + A;
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

    static layoutViews(container, viewMap, total) {
        for (let i = 0; i < total; i++) {
            container.appendChild(viewMap[i]);
        }
    }

    static visualize(moves, viewMap, type, slider) {
        switch (type) {
            case Sorter.type.bubble:
                BubbleVisualizer.visualize(moves, viewMap, slider);
                break;
            case Sorter.type.insertion:
                InsertionVisualizer.visualize(moves, viewMap, slider);
                break;
            case Sorter.type.selection:
                SelectionVisualizer.visualize(moves, viewMap, slider);
                break;
            case Sorter.type.merge:
                MergeVisualizer.visualize(moves, viewMap, slider);
                break;
            case Sorter.type.quick:
                QuickVisualizer.visualize(moves, viewMap, slider);
                break;
        }
    }
}
