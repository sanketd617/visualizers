class AStar {
    static moves = [];

    static getNode(x, y) {
        return {
            isBlocked: false, //[true, false, false, false, false][Math.floor(Math.random() * 5)],
            x: x,
            y: y,
            g: 100000,
            h: 100000,
            parent: null,
            isStart: false,
            isEnd: false
        }
    }

    static search(grid, start, end) {
        let openList = new ListHeap((node) => node.g + node.h);
        let closedList = new ListHeap((node) => node.g + node.h);
        start.g = 0;
        let dx = Math.abs(end.x - start.x);
        let dy = Math.abs(end.y - start.y);
        start.h = Math.abs(dx - dy) * 10 + Math.min(dx, dy) * 14;
        AStar.moves.push({
            type: "update",
            node: start
        });
        openList.insert(start);

        while (!openList.empty()) {
            let min = openList.extract((a) => ((a.x - end.x) * (a.x - end.x) + (a.y - end.y) * (a.y - end.y)));
            AStar.moves.push({
                type: "select",
                node: min
            });
            let neighbours = AStar.neighbours(grid, min, closedList);
            for (let neighbour of neighbours) {
                if (neighbour.isEnd) {
                    neighbour.parent = min;
                    return {
                        path: AStar.getPath(grid, start, end),
                        moves: AStar.moves
                    }
                }
                let newNeighbour = {...neighbour};
                newNeighbour.g = min.g + (newNeighbour.x !== min.x && newNeighbour.y !== min.y ? 14 : 10);

                dx = Math.abs(end.x - newNeighbour.x);
                dy = Math.abs(end.y - newNeighbour.y);
                newNeighbour.h = Math.abs(dx - dy) * 10 + Math.min(dx, dy) * 14;
                newNeighbour.parent = min;
                grid[newNeighbour.x][newNeighbour.y] = newNeighbour;
                if (newNeighbour.g + newNeighbour.h < neighbour.g + neighbour.h) {
                    let index = openList.index(neighbour, AStar.comparator);
                    if (index !== -1) {
                        openList.remove(index);
                    }
                    index = closedList.index(neighbour, AStar.comparator);
                    if (index !== -1) {
                        closedList.remove(index);
                    }
                    openList.insert(newNeighbour);
                    AStar.moves.push({
                        type: "update",
                        node: newNeighbour
                    });
                }
            }
            closedList.insert(min);
        }
        return {
            path: [],
            moves: AStar.moves
        };
    }

    static getPath(grid, start, end) {
        let path = [];
        let currentNode = grid[end.x][end.y];
        while (currentNode.x !== start.x || currentNode.y !== start.y) {
            path.push({
                x: currentNode.x,
                y: currentNode.y
            });
            currentNode = currentNode.parent;
        }
        path.splice(0, 1);
        return path.reverse();
    }

    static comparator(a, b) {
        return a.x === b.x && a.y === b.y;
    }

    static neighbours(grid, node, closedList) {
        let x = [0, 1, 0, -1, -1, -1, 1, 1];
        let y = [1, 0, -1, 0, -1, 1, -1, 1];
        let result = [];
        for (let i = 0; i < x.length; i++) {
            let nx = x[i] + node.x;
            let ny = y[i] + node.y;

            if (nx < 0 || ny < 0 || nx >= grid.length || ny >= grid[0].length) {
                continue;
            }

            if (grid[nx][ny].isBlocked) {
                continue;
            }

            if (node.parent !== null && grid[nx][ny].x === node.parent.x && grid[nx][ny].y === node.parent.y) {
                continue;
            }

            if (closedList.index(grid[nx][ny], AStar.comparator) !== -1) {
                continue;
            }

            result.push(grid[nx][ny]);
        }
        return result;
    }
}
