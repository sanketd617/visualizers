class Djikstra {
    static moves = [];

    static getNode(x, y) {
        return {
            isBlocked: false,
            x: x,
            y: y,
            parent: null,
            isStart: false,
            isEnd: false,
            distance: Infinity
        }
    }

    static search(grid, start, end, diagonalAllowed, isFastForward) {
        Djikstra.moves = [];
        start.distance = 0;
        let queue = [start];

        while (queue.length > 0) {
            let first = queue.shift();
            if(!isFastForward) {
                Djikstra.moves.push({
                    type: "select",
                    node: first
                });
            }

            for (let neighbour of Djikstra.neighbours(grid, first, diagonalAllowed)) {
                neighbour.isBlocked = true;
                neighbour.parent = first;
                neighbour.distance = first.distance + 1;
                if (!isFastForward) {
                    Djikstra.moves.push({
                        type: "update",
                        node: neighbour
                    });
                }
                if (Djikstra.comparator(neighbour, end)) {
                    if (isFastForward) {
                        Djikstra.moves = Djikstra.getFastForwardMoves(grid);
                    }
                    return {
                        path: Djikstra.getPath(grid, start, end),
                        moves: Djikstra.moves
                    };
                }
                queue.push(neighbour);
            }
        }

        if (isFastForward) {
            Djikstra.moves = Djikstra.getFastForwardMoves(grid);
        }
        return {
            path: [],
            moves: Djikstra.moves
        };
    }

    static getFastForwardMoves(grid) {
        let moves = [];
        let nodes = [];
        for(let row of grid) {
            for(let cell of row) {
                nodes.push(cell);
            }
        }

        nodes.sort((a, b) => (a.distance - b.distance));
        let group = [];

        for(let node of nodes) {
            if(group.length === 0) {
                group.push(node);
                continue;
            }
            if(group[0].distance === node.distance) {
                group.push(node);
                continue;
            }
            moves.push({
                type: "updateBatch",
                nodes: group
            });
            group = [node];
        }
        return moves;
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

    static neighbours(grid, node, diagonalAllowed) {
        let x = [0, 1, 0, -1, -1, -1, 1, 1];
        let y = [1, 0, -1, 0, -1, 1, -1, 1];
        let result = [];
        if (!diagonalAllowed) {
            x = x.slice(0, 4);
            y = y.slice(0, 4);
        }
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
