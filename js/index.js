class Controller {
    static array;
    static maxWidth;
    static maxHeight;
    static viewMap;
    static type;
    static moves;
    static container;
    static algorithmSelector;
    static slider;
    static startVisualization() {

        Controller.array = [15, 8, 11, 17, 13, 5, 6, 4, 10];

        Controller.maxWidth = parseInt(window.getComputedStyle(Controller.container, null).getPropertyValue("width"));
        Controller.maxHeight = parseInt(window.getComputedStyle(Controller.container, null).getPropertyValue("height"));
        Controller.viewMap = Visualizer.createViews(Controller.array, Controller.maxWidth, Controller.maxHeight);

        for(let child of document.querySelectorAll(".elem")) {
            Controller.container.removeChild(child);
        }

        Visualizer.layoutViews(Controller.container, Controller.viewMap, Controller.array.length);
        Controller.setSpeed();
        Controller.type = parseInt(Controller.algorithmSelector.value);
        Controller.moves = Sorter.sort(Controller.array, Controller.type);
        Visualizer.visualize(Controller.moves, Controller.viewMap, Controller.type);
    }

    static setSpeed() {
        let speed = (parseFloat(Controller.slider.min) + parseFloat(Controller.slider.max) - parseFloat(Controller.slider.value)) * 1000;
        Visualizer.setSpeed(speed);
        for (let i = 0; i < Controller.array.length; i++) {
            Controller.viewMap[i].style.transitionDuration = speed/1000 + 's';
        }
    }

    static onSliderChange() {
        Controller.setSpeed();
    }

    static init() {
        Controller.container = document.getElementById("container");
        Controller.algorithmSelector = document.getElementById("algorithmSelector");
        Controller.slider = document.getElementById('slider');

        for(let key of Object.keys(Sorter.typeMap)) {
            let name = Sorter.nameMap[key];
            let type = Sorter.typeMap[key];
            let option = document.createElement("option");
            option.value = type;
            option.innerHTML = name;

            Controller.algorithmSelector.appendChild(option);
        }
    }
}

Controller.init();

