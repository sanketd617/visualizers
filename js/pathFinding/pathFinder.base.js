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

    static findPath(grid, start, end, type) {

        let gridCopy = grid.slice();
        switch (type) {
            case 0:
                return Djikstra.search(grid, start, end);
            case 1:
                return AStar.search(grid, start, end);
        }
    }
}

