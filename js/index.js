class Controller {
    static array;
    static maxWidth;
    static maxHeight;
    static viewMap;
    static type;
    static moves;
    static startVisualization() {
        let container = document.getElementById("container");
        let algorithmSelector = document.getElementById("algorithmSelector");
        Controller.array = [15, 8, 11, 17, 13, 5, 6, 4, 10];

        Controller.maxWidth = parseInt(window.getComputedStyle(container, null).getPropertyValue("width"));
        Controller.maxHeight = parseInt(window.getComputedStyle(container, null).getPropertyValue("height"));
        Controller.viewMap = Visualizer.createViews(Controller.array, Controller.maxWidth, Controller.maxHeight);

        for (let i = 0; i < Controller.array.length; i++) {
            if(container.contains(Controller.viewMap[i])) {
                container.removeChild(Controller.viewMap[i]);
            }
        }

        Visualizer.layoutViews(container, Controller.viewMap, Controller.array.length);
        Controller.type = parseInt(algorithmSelector.value);
        Controller.moves = Sorter.sort(Controller.array, Controller.type);
        Visualizer.visualize(Controller.moves, Controller.viewMap, Controller.type);
    }

    static onSliderChange() {
        for (let i = 0; i < Controller.array.length; i++) {
            Controller.viewMap[i].style.transitionDuration = document.getElementById('slider').value + 's';
        }
    }
}


