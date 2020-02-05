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
    static numberOfRows = 15;
    static numberOfColumns;
    static cellSize;
    static grid = [];
    static start;
    static end;
    static path;
    static diagonalMovementAllowed = false;
    static isVisualizationOn = false;

    static onSliderChange() {
        PathFindingController.setSpeed();
    }

    static onAlgorithmChange() {
        PathFindingController.type = parseInt(PathFindingController.algorithmSelector.value);
        PathFindingController.removeViews();
        PathFindingController.start = null;
        PathFindingController.end = null;
        PathFindingController.createGrid(true);
    }

    static removeViews() {
        for (let row of PathFindingController.grid) {
            for (let cell of row) {
                PathFindingController.container.removeChild(PathFindingController.viewMap[cell.x][cell.y]);
            }
        }
    }

    static startVisualization() {
        document.getElementById("start-btn").disabled = true;
        document.getElementById("diagonal-switch").disabled = true;
        PathFindingController.algorithmSelector.disabled = true;

        let pathMoves = PathFinder.findPath(PathFindingController.grid, PathFindingController.start, PathFindingController.end, PathFindingController.type, PathFindingController.diagonalMovementAllowed);
        PathFindingController.path = pathMoves.path;

        let moves = pathMoves.moves;

        PathFindingController.isVisualizationOn = true;
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

    static createGrid() {
        PathFindingController.grid = [];
        for (let i = 0; i < PathFindingController.numberOfColumns; i++) {
            PathFindingController.grid.push([]);

            for (let j = 0; j < PathFindingController.numberOfRows; j++) {
                let cell = PathFinder.getNode(i, j, PathFindingController.type);
                PathFindingController.grid[i].push(cell);
            }
        }

        PathFindingController.setStart(PathFindingController.grid[0][0]);
        PathFindingController.setEnd(PathFindingController.grid[PathFindingController.grid.length - 1][PathFindingController.grid[0].length - 1]);

        PathFindingController.viewMap = PathFindingVisualizer.createViews(
            PathFindingController.grid,
            PathFindingController.cellSize,
            PathFindingController.maxWidth,
            PathFindingController.maxHeight,
            PathFindingController);
        PathFindingVisualizer.layoutViews(
            PathFindingController.container,
            PathFindingController.viewMap,
            PathFindingController.grid.length,
            PathFindingController.grid[0].length,
            PathFindingController);

        PathFindingController.viewMap[PathFindingController.start.x][PathFindingController.start.y].classList.add('grid-end-point');
        PathFindingController.viewMap[PathFindingController.end.x][PathFindingController.end.y].classList.add('grid-end-point');
        PathFindingController.setSpeed();
    }

    static onVisualizationEnd() {
        document.getElementById("start-btn").disabled = false;
        document.getElementById("diagonal-switch").disabled = false;
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

        setTimeout(function () {
            PathFindingController.isVisualizationOn = false;
        }, PathFindingController.path.length * PathFindingController.speed);
        PathFindingController.viewMap[PathFindingController.start.x][PathFindingController.start.y].classList.remove('grid-visited');
        PathFindingController.viewMap[PathFindingController.end.x][PathFindingController.end.y].classList.remove('grid-visited');
    }

    static createControls() {
        document.querySelector("#container > .controls > .sub").innerHTML = "<div class='sub-controls'>"
            + "Speed &nbsp; <input id='slider' type='range' min='0.1' max='2' value='2' step='0.001' onchange='PathFindingController.onSliderChange()'>"
            + "<select name='algorithm' id='algorithmSelector' onchange='PathFindingController.onAlgorithmChange()'>"
            + "</select>"
            + "<button id='start-btn' onclick='PathFindingController.startVisualization()'>START</button>"
            + "</div>";

        document.querySelector("#container > .extra-controls").innerHTML = "Diagonal Movement &nbsp; <label class='switch'>"
            + "  <input type='checkbox' id='diagonal-switch' checked onchange='PathFindingController.toggleDiagonal()'>"
            + "  <span class='slider round'></span>"
            + "</label>";
    }

    static toggleDiagonal() {
        PathFindingController.diagonalMovementAllowed = !PathFindingController.diagonalMovementAllowed;
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
            PathFindingController.toggleDiagonal();
            PathFindingController.type = parseInt(PathFindingController.algorithmSelector.value);

            PathFindingController.maxWidth = parseInt(window.getComputedStyle(PathFindingController.container, null).getPropertyValue("width"));
            PathFindingController.maxHeight = parseInt(window.getComputedStyle(PathFindingController.container, null).getPropertyValue("height"));

            PathFindingController.cellSize = parseInt(PathFindingController.maxHeight / PathFindingController.numberOfRows);
            PathFindingController.numberOfColumns = parseInt(PathFindingController.maxWidth / PathFindingController.cellSize);
            let diffX = (PathFindingController.maxWidth - PathFindingController.numberOfColumns * PathFindingController.cellSize);
            let diffY = (PathFindingController.maxHeight - PathFindingController.numberOfRows * PathFindingController.cellSize);

            PathFindingController.maxWidth = PathFindingController.maxWidth - diffX + 2;
            PathFindingController.maxHeight = PathFindingController.maxHeight - diffY + 2;
            PathFindingController.container.style.width = PathFindingController.maxWidth + 'px';
            PathFindingController.container.style.height = PathFindingController.maxHeight + 'px';
            document.getElementById("container").style.width = PathFindingController.maxWidth + 'px';
            document.getElementById("container").style.height = PathFindingController.maxHeight + 'px';

            PathFindingController.createGrid();

        }, 100);
    }
}

