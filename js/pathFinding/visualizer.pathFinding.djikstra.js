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

        function animateInternally() {
            if(DjikstraVisualizer.index >= DjikstraVisualizer.moves.length) {
                DjikstraVisualizer.onEnd();
                return;
            }

            move = DjikstraVisualizer.moves[DjikstraVisualizer.index];

            switch (move.type) {
                case "select":

                    break;
            }
            DjikstraVisualizer.index++;
            setTimeout(animateInternally, DjikstraVisualizer.speed);
        }

        animateInternally();
    }

    static setSpeed(speed) {
        console.log("speed", DjikstraVisualizer.speed);
        DjikstraVisualizer.speed = speed;
    }
}
