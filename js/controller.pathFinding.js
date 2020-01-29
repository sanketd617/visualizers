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
    static numberOfColumns = 10;
    static grid = [];

    static createControls() {
        console.log("creating controls")
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

//            PathFindingController.randomize(true);

        }, 100);
    }
}

