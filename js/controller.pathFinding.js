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
    static start;
    static end;
    static path;

    static onSliderChange() {

    }

    static onNext() {

    }

    static startVisualization() {
        document.getElementById("start-btn").disabled = true;
        document.getElementById("random-btn").disabled = true;
        PathFindingController.algorithmSelector.disabled = true;

        PathFindingController.type = parseInt(PathFindingController.algorithmSelector.value);

        let pathMoves = PathFinder.findPath(PathFindingController.grid, PathFindingController.start, PathFindingController.end, PathFindingController.type);
        PathFindingController.path = pathMoves.path;

        let moves = pathMoves.moves;

        PathFindingVisualizer.visualize(PathFindingController.grid, moves, PathFindingController.viewMap, PathFindingController.type, PathFindingController.slider, PathFindingController.onVisualizationEnd, PathFindingController);
    }

    static setSpeed() {
        PathFindingController.speed = (parseFloat(PathFindingController.slider.min) + parseFloat(PathFindingController.slider.max) - parseFloat(PathFindingController.slider.value)) * 1000;
        PathFindingVisualizer.setSpeed(PathFindingController.speed);
        for (let i = 0; i < PathFindingController.grid.length; i++) {
            for (let j = 0; j < PathFindingController.grid[i].length; j++) {
                PathFindingController.viewMap[i][j].style.transitionDuration = PathFindingController.speed / 1000 + 's';
            }
        }
    }

    static setStart(cell) {
        PathFindingController.start = cell;
        cell.isStart = true;
    }

    static setEnd(cell) {
        PathFindingController.end = cell;
        cell.isEnd = true;
    }

    static randomize(toBeCreated) {
        PathFindingController.grid = [];
        for (let i = 0; i < PathFindingController.numberOfColumns; i++) {
            PathFindingController.grid.push([]);

            for (let j = 0; j < PathFindingController.numberOfRows; j++) {
                let cell = {
                    isBlocked: false, //[true, false, false, false, false][Math.floor(Math.random() * 5)],
                    x: i,
                    y: j,
                    g: 100000,
                    h: 100000,
                    parent: null,
                    isStart: false,
                    isEnd: false
                };

                // temp logic
                if (i < PathFindingController.numberOfColumns / 2 && !PathFindingController.start && !cell.isBlocked) {
                    PathFindingController.setStart(cell);
                } else if (i > PathFindingController.numberOfColumns / 2 && !PathFindingController.end && !cell.isBlocked) {
                    PathFindingController.setEnd(cell);
                }
                // end
                PathFindingController.grid[i].push(cell);
            }
        }

        if (toBeCreated) {
            PathFindingController.viewMap = PathFindingVisualizer.createViews(
                PathFindingController.grid,
                PathFindingController.cellSize,
                PathFindingController.maxWidth,
                PathFindingController.maxHeight,
                PathFindingController.offset,
                PathFindingController);
            PathFindingVisualizer.layoutViews(
                PathFindingController.container,
                PathFindingController.viewMap,
                PathFindingController.grid.length,
                PathFindingController.grid[0].length,
                PathFindingController);
        } else {
//            SortingVisualizer.resizeViewsTo(SortingController.viewMap, SortingController.array, SortingController.maxHeight);
        }

        PathFindingController.viewMap[PathFindingController.start.x][PathFindingController.start.y].classList.add('grid-end-point');
        PathFindingController.viewMap[PathFindingController.end.x][PathFindingController.end.y].classList.add('grid-end-point');
        PathFindingController.setSpeed();
    }

    static onVisualizationEnd(path) {
        document.getElementById("start-btn").disabled = false;
        document.getElementById("random-btn").disabled = false;
        PathFindingController.algorithmSelector.disabled = false;
        let count = 0;
        for (let node of PathFindingController.path) {
            setTimeout(function () {
                PathFindingController.viewMap[node.x][node.y].classList.add('grid-path');
                PathFindingController.viewMap[node.x][node.y].classList.remove('grid-visited');
                PathFindingController.viewMap[node.x][node.y].classList.remove('grid-selected');
            }, count * PathFindingController.speed);
            count++;
        }
        PathFindingController.viewMap[PathFindingController.start.x][PathFindingController.start.y].classList.remove('grid-visited');
//        PathFindingController.viewMap[PathFindingController.start.x][PathFindingController.start.y].classList.add('grid-end-point');
    }

    static createControls() {
        let controls = "<div class='sub-controls'>"
            + "Speed &nbsp; <input id='slider' type='range' min='0.1' max='2' value='2' step='0.001' onchange='PathFindingController.onSliderChange()'>"
            + "<select name='algorithm' id='algorithmSelector'>"
            + "</select>"
            + "<button id='start-btn' onclick='PathFindingController.startVisualization()'>START</button>"
            + "<button id='random-btn' onclick='PathFindingController.randomize()'>RANDOM ARRAY</button>"
            + "<button id='next-btn' onclick='PathFindingController.onNext()'>NEXT</button>"
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
            PathFindingController.numberOfColumns = parseInt(PathFindingController.maxWidth / PathFindingController.cellSize);

            PathFindingController.offset = (PathFindingController.maxWidth - PathFindingController.numberOfColumns * PathFindingController.cellSize) / 2;

            PathFindingController.randomize(true);

        }, 100);
    }
}

