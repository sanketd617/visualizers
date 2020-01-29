class SortingController {
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
        SortingController.algorithmSelector.disabled = true;

        for(let i = 0; i < SortingController.numberOfItems; i++) {
            SortingController.viewMap[i].classList.remove('sorted');
        }

        SortingController.type = parseInt(SortingController.algorithmSelector.value);

        let sortResult = Sorter.sort(SortingController.array, SortingController.type);
        SortingController.moves = sortResult.moves;

        Visualizer.visualize(SortingController.array, SortingController.moves, SortingController.viewMap, SortingController.type, SortingController.slider, SortingController.onVisualizationEnd);

        SortingController.array = sortResult.array;
    }

    static randomize(toBeCreated) {
        SortingController.array = [];
        for(let i = 0; i < SortingController.numberOfItems; i++) {
            SortingController.array.push(Math.floor(Math.random() * (SortingController.rangeEnd - SortingController.rangeStart)) + SortingController.rangeStart);
        }

        if(toBeCreated) {
            SortingController.viewMap = Visualizer.createViews(SortingController.array, SortingController.maxWidth, SortingController.maxHeight);
            Visualizer.layoutViews(SortingController.container, SortingController.viewMap, SortingController.array.length);
        } else {
            Visualizer.resizeViewsTo(SortingController.viewMap, SortingController.array, SortingController.maxHeight);
        }
        for(let i = 0; i < SortingController.numberOfItems; i++) {
            SortingController.viewMap[i].classList.remove('sorted');
        }
        SortingController.setSpeed();
    }

    static shuffle() {
        for(let i = 0; i < SortingController.numberOfItems; i++) {
            SortingController.viewMap[i].classList.remove('sorted');
        }
        for (let i = 0; i < SortingController.array.length; i++) {
            let randomIndex = Math.floor(Math.random() * SortingController.array.length);
            let t = SortingController.array[i];
            SortingController.array[i] = SortingController.array[randomIndex];
            SortingController.array[randomIndex] = t;

            let tempLeft = SortingController.viewMap[i].style.left;
            SortingController.viewMap[i].style.left = SortingController.viewMap[randomIndex].style.left;
            SortingController.viewMap[randomIndex].style.left = tempLeft;

            t = SortingController.viewMap[i];
            SortingController.viewMap[i] = SortingController.viewMap[randomIndex];
            SortingController.viewMap[randomIndex] = t;
        }
    }

    static setSpeed() {
        SortingController.speed = (parseFloat(SortingController.slider.min) + parseFloat(SortingController.slider.max) - parseFloat(SortingController.slider.value)) * 1000;
        Visualizer.setSpeed(SortingController.speed);
        for (let i = 0; i < SortingController.array.length; i++) {
            SortingController.viewMap[i].style.transitionDuration = SortingController.speed / 1000 + 's';
        }
    }

    static onSliderChange() {
        SortingController.setSpeed();
    }

    static onVisualizationEnd() {
        document.getElementById("start-btn").disabled = false;
        document.getElementById("shuffle-btn").disabled = false;
        document.getElementById("random-btn").disabled = false;
        SortingController.algorithmSelector.disabled = false;

        for(let i = 0; i < SortingController.array.length; i++) {
            setTimeout(() => {
                SortingController.viewMap[i].classList.add('sorted');
            }, (i + 1) * 100);
        }
    }

    static removeViews() {
        for (let child of document.querySelectorAll(".elem")) {
            SortingController.container.removeChild(child);
        }
    }

    static createControls() {
        return "<div class='sorting-controls'>"
                   + "Speed &nbsp; <input id='slider' type='range' min='0.1' max='2' value='2' step='0.001' onchange='SortingController.onSliderChange()'>"
                   + "<select name='algorithm' id='algorithmSelector'>"
                   + "</select>"
                   + "<button id='start-btn' onclick='SortingController.startVisualization()'>START</button>"
                   + "<button id='shuffle-btn' onclick='SortingController.shuffle()'>SHUFFLE</button>"
                   + "<button id='random-btn' onclick='SortingController.randomize()'>RANDOM ARRAY</button>"
               + "</div>";
    }

    static init() {
        SortingController.container = document.getElementById("visualizer");
        SortingController.container.innerHTML = "";

        document.querySelector("#container > .controls > .sub").innerHTML = SortingController.createControls();

        SortingController.algorithmSelector = document.getElementById("algorithmSelector");
        SortingController.slider = document.getElementById('slider');

        for (let key of Object.keys(Sorter.typeMap)) {
            let name = Sorter.nameMap[key];
            let type = Sorter.typeMap[key];
            let option = document.createElement("option");
            option.value = type;
            option.innerHTML = name;

            SortingController.algorithmSelector.appendChild(option);
        }

        setTimeout(() => {
            SortingController.type = parseInt(SortingController.algorithmSelector.value);

            SortingController.maxWidth = parseInt(window.getComputedStyle(SortingController.container, null).getPropertyValue("width"));
            SortingController.maxHeight = parseInt(window.getComputedStyle(SortingController.container, null).getPropertyValue("height"));


            SortingController.randomize(true);

        }, 100);
    }
}

