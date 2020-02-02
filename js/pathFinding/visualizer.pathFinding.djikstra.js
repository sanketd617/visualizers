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
        let move;

        function animateInternally() {
            if(AStarVisualizer.index >= AStarVisualizer.moves.length) {
                AStarVisualizer.onEnd();
                return;
            }

            move = AStarVisualizer.moves[AStarVisualizer.index];

            switch (move.type) {
                case "select":

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
