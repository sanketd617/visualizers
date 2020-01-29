// Credits for AStar algorithm code : https://briangrinstead.com/blog/astar-search-algorithm-in-javascript/

let AStar = {
    init: function(grid) {
        for(let x = 0, xl = grid.length; x < xl; x++) {
            for(let y = 0, yl = grid[x].length; y < yl; y++) {
                let node = grid[x][y];
                node.f = 0;
                node.g = 0;
                node.h = 0;
                node.cost = 1;
                node.visited = false;
                node.closed = false;
                node.parent = null;
            }
        }
    },
    heap: function() {
        return new BinaryHeap(function(node) {
            return node.f;
        });
    },
    search: function(grid, start, end, diagonal, heuristic) {
        AStar.init(grid);
        heuristic = heuristic || AStar.manhattan;
        diagonal = !!diagonal;

        let openHeap = AStar.heap();

        openHeap.push(start);

        let moves = [];

        while(openHeap.size() > 0) {

            // Grab the lowest f(x) to process next.  Heap keeps this sorted for us.
            let currentNode = openHeap.pop();

            // End case -- result has been found, return the traced path.
            if(currentNode === end) {
                let curr = currentNode;
                let ret = [];
                while(curr.parent) {
                    ret.push(curr);
                    curr = curr.parent;
                }
                return {
                    path: ret.reverse(),
                    moves: moves
                };
            }

            moves.push({
                node: currentNode,
                type: "select"
            });

            // Normal case -- move currentNode from open to closed, process each of its neighbors.
            currentNode.closed = true;

            // Find all neighbors for the current node. Optionally find diagonal neighbors as well (false by default).
            let neighbors = AStar.neighbors(grid, currentNode, diagonal);

            for(let i=0, il = neighbors.length; i < il; i++) {
                let neighbor = neighbors[i];

                if(neighbor.closed || neighbor.isObstacle) {
                    // Not a valid node to process, skip to next neighbor.
                    continue;
                }

                // The g score is the shortest distance from start to current node.
                // We need to check if the path we have arrived at this neighbor is the shortest one we have seen yet.
                let gScore = currentNode.g + neighbor.cost;
                let beenVisited = neighbor.visited;

                if(!beenVisited || gScore < neighbor.g) {

                    // Found an optimal (so far) path to this node.  Take score for node to see how good it is.
                    neighbor.visited = true;
                    neighbor.parent = currentNode;
                    neighbor.h = neighbor.h || heuristic(neighbor, end);
                    neighbor.g = gScore;
                    neighbor.f = neighbor.g + neighbor.h;

                    moves.push({
                        node: currentNode,
                        type: "update"
                    });

                    if (!beenVisited) {
                        // Pushing to heap will put it in proper place based on the 'f' value.
                        openHeap.push(neighbor);
                    }
                    else {
                        // Already seen the node, but since it has been rescored we need to reorder it in the heap
                        openHeap.remove(neighbor);
                        openHeap.push(neighbor);
                    }
                }
            }
        }

        // No result was found - empty array signifies failure to find path.
        return {
            path: [],
            moves: []
        };
    },
    manhattan: function(pos0, pos1) {
        // See list of heuristics: http://theory.stanford.edu/~amitp/GameProgramming/Heuristics.html

        let d1 = Math.abs (pos1.x - pos0.x);
        let d2 = Math.abs (pos1.y - pos0.y);
        return d1 + d2;
    },
    neighbors: function(grid, node, diagonals) {
        let ret = [];
        let x = node.x;
        let y = node.y;

        // West
        if(grid[x-1] && grid[x-1][y] && !grid[x-1][y].isObstacle) {
            ret.push(grid[x-1][y]);
        }

        // East
        if(grid[x+1] && grid[x+1][y] && !grid[x+1][y].isObstacle) {
            ret.push(grid[x+1][y]);
        }

        // South
        if(grid[x] && grid[x][y-1] && !grid[x][y-1].isObstacle) {
            ret.push(grid[x][y-1]);
        }

        // North
        if(grid[x] && grid[x][y+1] && !grid[x][y+1].isObstacle) {
            ret.push(grid[x][y+1]);
        }

        if (diagonals) {

            // Southwest
            if(grid[x-1] && grid[x-1][y-1] && !grid[x-1][y-1].isObstacle) {
                ret.push(grid[x-1][y-1]);
            }

            // Southeast
            if(grid[x+1] && grid[x+1][y-1] && !grid[x+1][y-1].isObstacle) {
                ret.push(grid[x+1][y-1]);
            }

            // Northwest
            if(grid[x-1] && grid[x-1][y+1] && !grid[x-1][y+1].isObstacle) {
                ret.push(grid[x-1][y+1]);
            }

            // Northeast
            if(grid[x+1] && grid[x+1][y+1] && !grid[x+1][x+1].isObstacle) {
                ret.push(grid[x+1][y+1]);
            }

        }

        return ret;
    }
};
