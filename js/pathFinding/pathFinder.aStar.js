class AStar {
    static moves = [];

    static search(grid, start, end) {
        let heap = new ListHeap((node) => node.g + node.h);
        start.g = 0;
        start.h = Math.abs(start.y - end.y) + Math.abs(start.x - end.x);
        heap.insert(start);

        while (!heap.empty()) {
            let min = heap.extract();
            if(min.isEnd) {
                return {
                    path: AStar.getPath(grid, start, end),
                    moves: AStar.moves
                }
            }
            AStar.moves.push({
                type: "select",
                node: min
            });
            let neighbours = AStar.neighbours(grid, min);
            for (let neighbour of neighbours) {
                let newNeighbour = {...neighbour};
                newNeighbour.g = min.g + (newNeighbour.x !== neighbour.x && newNeighbour.y !== neighbour.y ? 14 : 10);
                newNeighbour.h = Math.abs(newNeighbour.y - end.y) + Math.abs(newNeighbour.x - end.x);
                newNeighbour.parent = min;
                grid[newNeighbour.x][newNeighbour.y] = newNeighbour;
                if(newNeighbour.g + newNeighbour.h < neighbour.g + neighbour.h) {
                    // console.log(newNeighbour);
                    let index = heap.index(neighbour, AStar.comparator);
                    if(index !== -1) {
                        heap.remove(index);
                    }
                    heap.insert(newNeighbour);
                    AStar.moves.push({
                        type: "update",
                        node: newNeighbour
                    });
                }
            }
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

    static neighbours(grid, node) {
        let x = [0, 1, 0, -1, -1, -1, 1, 1];
        let y = [1, 0, -1, 0, -1, 1, -1, 1];
        let result = [];
        for (let i = 0; i < x.length; i++) {
            let nx = x[i] + node.x;
            let ny = y[i] + node.y;

            if (nx < 0 || ny < 0 || nx >= grid.length || ny >= grid[0].length) {
                continue;
            }

            if(grid[nx][ny].isBlocked) {
                continue;
            }

            result.push(grid[nx][ny]);
        }
        return result;
    }
}
