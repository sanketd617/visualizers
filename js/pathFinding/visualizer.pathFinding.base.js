class PathFindingVisualizer {

    static createViews(grid, cellSize, maxWidth, maxHeight, offset) {
        let viewMap = [];
        for(let i = 0; i < grid.length; i++) {
            viewMap.push([]);
            for(let j = 0; j < grid[0].length; j++) {
                let cell = document.createElement("div");
                cell.classList.add('grid-cell');
                if(grid[i][j].isObstacle) {
                    cell.classList.add('grid-obstacle');
                }
                cell.style.width = cellSize + 'px';
                cell.style.height = cellSize + 'px';
                cell.style.left = offset + cellSize * i + 'px';
                cell.style.top = cellSize * j + 'px';
                viewMap[i].push(cell);
            }
        }
        return viewMap;
    }

    static layoutViews(container, viewMap, rows, columns) {
        for(let i = 0; i < rows; i++) {
            for(let j = 0; j < columns; j++) {
                container.appendChild(viewMap[i][j]);
            }
        }
    }

    static visualize(grid, moves, viewMap, type, slider, onEnd) {
        console.log("q", type)
        switch (type) {
            case PathFinder.typeMap.aStar:
                console.log("w")
                AStarVisualizer.visualize(grid, moves, viewMap, slider, onEnd);
                break;

        }
    }

    static setSpeed(speed) {
        AStarVisualizer.setSpeed(speed);
    }
}