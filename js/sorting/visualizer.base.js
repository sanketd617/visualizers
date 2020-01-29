class Visualizer {
    static maxSize = 50;
    static minSize = 30;
    static maxSpacing = 50;
    static minSpacing = 30;

    static setSpeed(speed) {
        BubbleVisualizer.speed = speed;
        InsertionVisualizer.speed = speed;
        SelectionVisualizer.speed = speed;
        MergeVisualizer.speed = speed;
        QuickVisualizer.speed = speed;
    }

    static createViews(array, maxWidth, maxHeight) {
        let total = array.length;
        let spacing = Visualizer.minSpacing + (Visualizer.maxSpacing - Visualizer.minSpacing) * Math.cos((total / Sorter.maxElements) * Math.PI / 2);
        let size = Visualizer.minSize + (Visualizer.maxSize - Visualizer.minSize) * Math.cos((total / Sorter.maxElements) * Math.PI / 2);
        let startLeft = (maxWidth - size * total - spacing * (total - 1)) / 2;

        let minValue = Math.min.apply(Math, array);
        let maxValue = Math.max.apply(Math, array);
        let A = 0.2 * maxHeight;
        let B = 0.8 * maxHeight - size;
        let R = (B - A) / (maxValue - minValue);

        function create(number, index) {
            let left = parseInt(startLeft + index * (spacing + size));
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

    static resizeViewsTo(viewMap, array, maxHeight) {
        let minValue = Math.min.apply(Math, array);
        let maxValue = Math.max.apply(Math, array);
        let size = Visualizer.minSize + (Visualizer.maxSize - Visualizer.minSize) * Math.cos((array.length / Sorter.maxElements) * Math.PI / 2);
        let A = 0.2 * maxHeight;
        let B = 0.8 * maxHeight - size;
        let R = (B - A) / (maxValue - minValue);

        for(let i = 0; i < array.length; i++) {
            let top = (maxValue - array[i]) * R + A;
            let height = 0.8 * maxHeight - top;
            viewMap[i].style.height = height + 'px';
            viewMap[i].style.top = top + 'px';
            viewMap[i].innerHTML = array[i];
        }
    }

    static layoutViews(container, viewMap, total) {
        for (let i = 0; i < total; i++) {
            container.appendChild(viewMap[i]);
        }
    }

    static visualize(array, moves, viewMap, type, slider, onEnd) {
        switch (type) {
            case Sorter.typeMap.bubble:
                BubbleVisualizer.visualize(array, moves, viewMap, slider, onEnd);
                break;
            case Sorter.typeMap.insertion:
                InsertionVisualizer.visualize(array, moves, viewMap, slider, onEnd);
                break;
            case Sorter.typeMap.selection:
                SelectionVisualizer.visualize(array, moves, viewMap, slider, onEnd);
                break;
            case Sorter.typeMap.merge:
                MergeVisualizer.visualize(array, moves, viewMap, slider, onEnd);
                break;
            case Sorter.typeMap.quick:
                QuickVisualizer.visualize(array, moves, viewMap, slider, onEnd);
                break;
        }
    }
}
