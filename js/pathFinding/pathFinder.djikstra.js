class Djikstra {
    static moves = [];

    static search(grid, start, end) {
        let queue = [start];

        while (queue.length > 0) {
            let first = queue.shift();

            for (let neighbour of Djikstra.neighbours(grid, first)) {
                neighbour.isBlocked = true;
                neighbour.parent = first;
                if(neighbour.isEnd) {
                    return {
                        path: Djikstra.getPath(grid, start, end),
                        moves: Djikstra.moves
                    };
                }
                queue.push(neighbour);
            }
        }

        return {
            path: [],
            moves: Djikstra.moves
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

            if (grid[nx][ny].isBlocked) {
                continue;
            }

            result.push(grid[nx][ny]);
        }
        return result;
    }
}
