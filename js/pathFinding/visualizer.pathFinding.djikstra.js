class DjikstraVisualizer {
    static speed;
    static index;
    static moves;
    static onEnd;
    static viewMap;
    static visualize(grid, moves, viewMap, slider, onEnd, controllerClass) {
        DjikstraVisualizer.index = 0;
        DjikstraVisualizer.moves = moves;
        DjikstraVisualizer.onEnd = onEnd;
        DjikstraVisualizer.viewMap = viewMap;
        let move;
        let selected = null;

        function animateInternally() {
            if(DjikstraVisualizer.index >= DjikstraVisualizer.moves.length) {
                DjikstraVisualizer.onEnd();
                return;
            }

            move = DjikstraVisualizer.moves[DjikstraVisualizer.index];

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
                    // viewMap[move.node.x][move.node.y].innerHTML  = "<i class='fas fa-chevron-right'></i>";
                    break;
            }
            DjikstraVisualizer.index++;
            setTimeout(animateInternally, DjikstraVisualizer.speed);
        }

        animateInternally();
    }

    static setSpeed(speed) {
        DjikstraVisualizer.speed = speed;
    }
}
