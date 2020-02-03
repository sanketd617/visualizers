class PathFindingVisualizer {
    static isDragOn = false;
    static toBeBlocked = false;
    static isStartDragged = false;
    static isEndDragged = false;
    static draggedCell = null;

    static createViews(grid, cellSize, maxWidth, maxHeight, controllerClass) {
        let viewMap = [];
        console.log("creating views");
        for(let i = 0; i < grid.length; i++) {
            viewMap.push([]);
            for(let j = 0; j < grid[0].length; j++) {
                let cell = document.createElement("div");
                cell.classList.add('grid-cell');
                if(grid[i][j].isBlocked) {
                    cell.classList.add('grid-obstacle');
                }
                cell.style.width = cellSize + 'px';
                cell.style.height = cellSize + 'px';
                cell.style.left = cellSize * i + 'px';
                cell.style.top = cellSize * j + 'px';

                cell.onmousedown = () => {
                    PathFindingVisualizer.isDragOn = true;
                    console.log(grid[i][j]);
                    if(grid[i][j].isStart) {
                        PathFindingVisualizer.isStartDragged = true;
                        PathFindingVisualizer.draggedCell = grid[i][j];
                    }
                    else if(grid[i][j].isEnd) {
                        PathFindingVisualizer.isEndDragged = true;
                        PathFindingVisualizer.draggedCell = grid[i][j];
                    }
                    else if(!grid[i][j].isBlocked) {
                        cell.classList.add('grid-obstacle');
                        grid[i][j].isBlocked = true;
                        PathFindingVisualizer.toBeBlocked = true;
                    }
                    else {
                        cell.classList.remove('grid-obstacle');
                        grid[i][j].isBlocked = false;
                        PathFindingVisualizer.toBeBlocked = false;
                    }
                };

                cell.onmouseup = () => {
                    PathFindingVisualizer.isDragOn = false;
                    PathFindingVisualizer.toBeBlocked = false;
                    PathFindingVisualizer.isStartDragged = false;
                    PathFindingVisualizer.isEndDragged = false;
                    PathFindingVisualizer.draggedCell = null;
                };

                cell.onmouseenter = () => {
                    if(PathFindingVisualizer.isDragOn) {
                        if(PathFindingVisualizer.isStartDragged) {
                            if(grid[i][j].isEnd) {
                                return;
                            }
                            let {x, y} = PathFindingVisualizer.draggedCell;
                            PathFindingVisualizer.draggedCell.isStart = false;
                            viewMap[x][y].classList.remove('grid-end-point');
                            PathFindingVisualizer.draggedCell = grid[i][j];
                            PathFindingVisualizer.draggedCell.isStart = true;
                            cell.classList.add('grid-end-point');
                            controllerClass.setStart(grid[i][j]);
                        }
                        else if(PathFindingVisualizer.isEndDragged) {
                            if(grid[i][j].isStart) {
                                return;
                            }
                            let {x, y} = PathFindingVisualizer.draggedCell;
                            PathFindingVisualizer.draggedCell.isEnd = false;
                            viewMap[x][y].classList.remove('grid-end-point');
                            PathFindingVisualizer.draggedCell = grid[i][j];
                            PathFindingVisualizer.draggedCell.isEnd = true;
                            cell.classList.add('grid-end-point');
                            controllerClass.setEnd(grid[i][j]);
                        }
                        else if(PathFindingVisualizer.toBeBlocked) {
                            cell.classList.add('grid-obstacle');
                            grid[i][j].isBlocked = true;
                        }
                        else {
                            cell.classList.remove('grid-obstacle');
                            grid[i][j].isBlocked = false;
                        }
                    }
                };

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

    static visualize(grid, moves, viewMap, type, slider, onEnd, controllerClass) {
        switch (type) {
            case PathFinder.typeMap.djikstra:
                DjikstraVisualizer.visualize(grid, moves, viewMap, slider, onEnd, controllerClass);
                break;
            case PathFinder.typeMap.aStar:
                AStarVisualizer.visualize(grid, moves, viewMap, slider, onEnd, controllerClass);
                break;
        }
    }

    static setSpeed(speed) {
        AStarVisualizer.setSpeed(speed);
        DjikstraVisualizer.setSpeed(speed);
    }
}