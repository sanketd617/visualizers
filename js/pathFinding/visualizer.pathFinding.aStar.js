class AStarVisualizer {
    static speed;
    static index;
    static moves;
    static onEnd;
    static viewMap;
    static visualize(grid, moves, viewMap, slider, onEnd, controllerClass) {
        AStarVisualizer.index = 0;
        AStarVisualizer.moves = moves;
        AStarVisualizer.onEnd = onEnd;
        AStarVisualizer.viewMap = viewMap;
        let selected = null;
        let updated = null;
        let move;

        function animateInternally() {
            if(AStarVisualizer.index >= AStarVisualizer.moves.length) {
                selected.classList.remove("grid-selected");
                AStarVisualizer.onEnd();
                return;
            }

            move = AStarVisualizer.moves[AStarVisualizer.index];

            switch (move.type) {
                case "select":
                    if(selected) {
                        selected.classList.remove("grid-selected");
                    }
                    selected = viewMap[move.node.x][move.node.y];
                    selected.classList.add("grid-selected");
                    break;
                case "update":
                    viewMap[move.node.x][move.node.y].classList.add("grid-visited");
                    viewMap[move.node.x][move.node.y].innerHTML  = move.node.g + move.node.h;
                    break;
            }
            AStarVisualizer.index++;
            setTimeout(animateInternally, AStarVisualizer.speed);
        }

        animateInternally();
    }

    static setSpeed(speed) {
        console.log("speed", AStarVisualizer.speed);
        AStarVisualizer.speed = speed;
    }
}
