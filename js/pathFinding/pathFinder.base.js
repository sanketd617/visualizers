class PathFinder {
    static typeMap = {
        djikstra: 0,
        aStar: 1,
    };

    static nameMap = {
        djikstra: "Djikstra's",
        aStar: "A*",
    };

    static moveType = {

    };

    static maxElements = 20;

    static findPath(grid, start, end, type, diagonalAllowed, isFastForward) {

        let gridCopy = grid.slice();
        switch (type) {
            case 0:
                return Djikstra.search(gridCopy, start, end, diagonalAllowed, isFastForward);
            case 1:
                return AStar.search(gridCopy, start, end, diagonalAllowed, isFastForward);
        }
    }

    static getNode(x, y, type) {
        switch (type) {
            case 0:
                return Djikstra.getNode(x, y);
            case 1:
                return AStar.getNode(x, y);
        }
    }
}

