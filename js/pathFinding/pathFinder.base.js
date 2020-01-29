class PathFinder {
    static typeMap = {
        aStar: 1
    };

    static nameMap = {
        aStar: "A*"
    };

    static moveType = {

    };

    static maxElements = 20;

    static findPath(grid, start, end, type) {

        let gridCopy = grid.slice();
        switch (type) {
            case 1:
                return AStar.search(grid, start, end);
        }
    }
}

