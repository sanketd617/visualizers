class AStarVisualizer {
    static speed;
    static visualize(grid, moves, viewMap, slider, onEnd) {
        let index = 0;
        let selected = null;
        let updated = null;
        console.log("e")
        function animateInternally() {
            if(index >= moves.length) {
                onEnd();
                return;
            }

            let move = moves[index];

            switch(move.type) {
                case "select":
                    if(selected) {
                        selected.classList.remove("grid-selected");
                    }
                    selected = viewMap[move.node.x][move.node.y];
                    viewMap[move.node.x][move.node.y].classList.add("grid-selected");
                    viewMap[move.node.x][move.node.y].classList.add("grid-visited");
                    viewMap[move.node.x][move.node.y].innerHTML = move.node.f;
                    break;
                case "update":
                    if(updated) {
                        updated.classList.remove("grid-updated");
                    }
                    updated = viewMap[move.node.x][move.node.y];
                    viewMap[move.node.x][move.node.y].classList.add("grid-updated");
                    viewMap[move.node.x][move.node.y].classList.add("grid-visited");
                    viewMap[move.node.x][move.node.y].innerHTML = move.node.f;
                    break;
            }

            index++;
            setTimeout(animateInternally, AStarVisualizer.speed);
        }

        animateInternally();
    }

    static setSpeed(speed) {
        AStarVisualizer.speed = speed;
    }
}
