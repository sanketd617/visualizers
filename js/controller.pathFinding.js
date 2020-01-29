class PathFindingController {
    static maxWidth;
    static maxHeight;
    static viewMap;
    static type;
    static moves;
    static container;
    static algorithmSelector;
    static slider;
    static speed;
    static numberOfRows = 10;
    static numberOfColumns;
    static cellSize;
    static offset;
    static grid = [];

    static onSliderChange() {

    }

    static startVisualization() {

    }

    static setSpeed() {
        PathFindingController.speed = (parseFloat(PathFindingController.slider.min) + parseFloat(PathFindingController.slider.max) - parseFloat(PathFindingController.slider.value)) * 1000;
//        PathFindingVisualizer.setSpeed(PathFindingController.speed);
        for (let i = 0; i < PathFindingController.grid.length; i++) {
            for (let j = 0; j < PathFindingController.grid[i].length; j++) {
//                PathFindingController.viewMap[i].style.transitionDuration = PathFindingController.speed / 1000 + 's';
            }
        }
    }

    static randomize(toBeCreated) {
        PathFindingController.grid = [];
        for(let i = 0; i < PathFindingController.numberOfColumns; i++) {
            PathFindingController.grid.push([]);
            for(let j = 0; j < PathFindingController.numberOfRows; j++) {
                PathFindingController.grid[i].push({
                    isObstacle: [true, false, false, false, false][Math.floor(Math.random() * 5)]
                });
            }
        }

        if(toBeCreated) {
            PathFindingController.viewMap = PathFindingVisualizer.createViews(PathFindingController.grid, PathFindingController.cellSize, PathFindingController.maxWidth, PathFindingController.maxHeight, PathFindingController.offset);
            PathFindingVisualizer.layoutViews(PathFindingController.container, PathFindingController.viewMap, PathFindingController.grid.length, PathFindingController.grid[0].length);
        } else {
//            SortingVisualizer.resizeViewsTo(SortingController.viewMap, SortingController.array, SortingController.maxHeight);
        }

        PathFindingController.setSpeed();
    }

    static createControls() {
        let controls = "<div class='sub-controls'>"
                           + "Speed &nbsp; <input id='slider' type='range' min='0.1' max='2' value='2' step='0.001' onchange='PathFindingController.onSliderChange()'>"
                           + "<select name='algorithm' id='algorithmSelector'>"
                           + "</select>"
                           + "<button id='start-btn' onclick='PathFindingController.startVisualization()'>START</button>"
                           + "<button id='random-btn' onclick='PathFindingController.randomize()'>RANDOM ARRAY</button>"
                       + "</div>";
        document.querySelector("#container > .controls > .sub").innerHTML = controls;
    }

    static init() {
        PathFindingController.container = document.getElementById("visualizer");
        PathFindingController.container.innerHTML = "";
        PathFindingController.createControls();

        PathFindingController.algorithmSelector = document.getElementById("algorithmSelector");
        PathFindingController.slider = document.getElementById('slider');

        for (let key of Object.keys(PathFinder.typeMap)) {
            let name = PathFinder.nameMap[key];
            let type = PathFinder.typeMap[key];
            let option = document.createElement("option");
            option.value = type;
            option.innerHTML = name;

            PathFindingController.algorithmSelector.appendChild(option);
        }

        setTimeout(() => {
            PathFindingController.type = parseInt(PathFindingController.algorithmSelector.value);

            PathFindingController.maxWidth = parseInt(window.getComputedStyle(PathFindingController.container, null).getPropertyValue("width"));
            PathFindingController.maxHeight = parseInt(window.getComputedStyle(PathFindingController.container, null).getPropertyValue("height"));

            PathFindingController.cellSize = parseInt(PathFindingController.maxHeight / PathFindingController.numberOfRows);
            PathFindingController.numberOfColumns = parseInt(PathFindingController.maxWidth/PathFindingController.cellSize);

            PathFindingController.offset = (PathFindingController.maxWidth - PathFindingController.numberOfColumns * PathFindingController.cellSize)/2;

            PathFindingController.randomize(true);

        }, 100);
    }
}

