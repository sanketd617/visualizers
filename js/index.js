class Controller {
    static maxWidth;
    static maxHeight;
    static viewMap;
    static type;
    static moves;
    static container;
    static algorithmSelector;
    static slider;
    static speed;
    static numberOfItems = 10;
    static array = [];
    static rangeStart = 0;
    static rangeEnd = 20;

    static startVisualization() {
        document.getElementById("start-btn").disabled = true;
        document.getElementById("shuffle-btn").disabled = true;
        document.getElementById("random-btn").disabled = true;
        Controller.algorithmSelector.disabled = true;

        for(let i = 0; i < Controller.numberOfItems; i++) {
            Controller.viewMap[i].classList.remove('sorted');
        }

        Controller.type = parseInt(Controller.algorithmSelector.value);

        let sortResult = Sorter.sort(Controller.array, Controller.type);
        Controller.moves = sortResult.moves;

        Visualizer.visualize(Controller.array, Controller.moves, Controller.viewMap, Controller.type, Controller.slider, Controller.onVisualizationEnd);

        Controller.array = sortResult.array;
    }

    static randomize(toBeCreated) {
        Controller.array = [];
        for(let i = 0; i < Controller.numberOfItems; i++) {
            Controller.array.push(Math.floor(Math.random() * (Controller.rangeEnd - Controller.rangeStart)) + Controller.rangeStart);
        }

        if(toBeCreated) {
            Controller.viewMap = Visualizer.createViews(Controller.array, Controller.maxWidth, Controller.maxHeight);
            Visualizer.layoutViews(Controller.container, Controller.viewMap, Controller.array.length);
        } else {
            Visualizer.resizeViewsTo(Controller.viewMap, Controller.array, Controller.maxHeight);
        }
        for(let i = 0; i < Controller.numberOfItems; i++) {
            Controller.viewMap[i].classList.remove('sorted');
        }
        Controller.setSpeed();
    }

    static shuffle() {
        for(let i = 0; i < Controller.numberOfItems; i++) {
            Controller.viewMap[i].classList.remove('sorted');
        }
        for (let i = 0; i < Controller.array.length; i++) {
            let randomIndex = Math.floor(Math.random() * Controller.array.length);
            let t = Controller.array[i];
            Controller.array[i] = Controller.array[randomIndex];
            Controller.array[randomIndex] = t;

            let tempLeft = Controller.viewMap[i].style.left;
            Controller.viewMap[i].style.left = Controller.viewMap[randomIndex].style.left;
            Controller.viewMap[randomIndex].style.left = tempLeft;

            t = Controller.viewMap[i];
            Controller.viewMap[i] = Controller.viewMap[randomIndex];
            Controller.viewMap[randomIndex] = t;
        }
    }

    static setSpeed() {
        Controller.speed = (parseFloat(Controller.slider.min) + parseFloat(Controller.slider.max) - parseFloat(Controller.slider.value)) * 1000;
        Visualizer.setSpeed(Controller.speed);
        for (let i = 0; i < Controller.array.length; i++) {
            Controller.viewMap[i].style.transitionDuration = Controller.speed / 1000 + 's';
        }
    }

    static onSliderChange() {
        Controller.setSpeed();
    }

    static onVisualizationEnd() {
        document.getElementById("start-btn").disabled = false;
        document.getElementById("shuffle-btn").disabled = false;
        document.getElementById("random-btn").disabled = false;
        Controller.algorithmSelector.disabled = false;

        for(let i = 0; i < Controller.array.length; i++) {
            setTimeout(() => {
                Controller.viewMap[i].classList.add('sorted');
            }, (i + 1) * 100);
        }
    }

    static removeViews() {
        for (let child of document.querySelectorAll(".elem")) {
            Controller.container.removeChild(child);
        }
    }

    static init() {
        Controller.container = document.getElementById("container");
        Controller.algorithmSelector = document.getElementById("algorithmSelector");
        Controller.slider = document.getElementById('slider');

        for (let key of Object.keys(Sorter.typeMap)) {
            let name = Sorter.nameMap[key];
            let type = Sorter.typeMap[key];
            let option = document.createElement("option");
            option.value = type;
            option.innerHTML = name;

            Controller.algorithmSelector.appendChild(option);
        }

        setTimeout(() => {
            Controller.type = parseInt(Controller.algorithmSelector.value);

            Controller.maxWidth = parseInt(window.getComputedStyle(Controller.container, null).getPropertyValue("width"));
            Controller.maxHeight = parseInt(window.getComputedStyle(Controller.container, null).getPropertyValue("height"));


            Controller.randomize(true);

        }, 100);
    }
}

Controller.init();

