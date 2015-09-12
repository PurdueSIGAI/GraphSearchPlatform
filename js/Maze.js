var GraphSearchMode = {
    BFS: 0,
    DFS: 1,
    ASTAR: 2,
};

function Maze(height, width) {
    this.height = parseInt(height);
    this.width = parseInt(width);
    this.maze = [];
    for (y = 0; y < height; y++) {
        this.maze[y] = [];
    }
    for (y = 0; y < this.height; y++) {
        for (x = 0; x < this.width; x++) {
            traversable = Math.random() > .1 ? 1 : -1;
            // int cost = (int) (traversable * Math.random() * 10.0);
            cost = traversable;
            this.maze[y][x] = new Tile(x, y, cost);
        }
    }
    this.goalX = 0;
    this.goalY = 0;
    this.startX = 0;
    this.startY = 0;
    while (this.startX == this.goalX && this.startY == this.goalY) {
        this.goalX = parseInt(Math.random() * width);
        this.goalY = parseInt(Math.random() * height);
        this.startX = parseInt(Math.random() * width);
        this.startY = parseInt(Math.random() * height);
    }
    this.maze[this.goalY][this.goalX] = new Tile(this.goalX, this.goalY, 1);
    this.maze[this.startY][this.startX] = new Tile(this.startX, this.startY, 1);

    this.getTile = function(x, y) {
        if (x < width && x >= 0 && y < height && y >= 0)
            return this.maze[y][x];
        return null;
    }

    this.printMaze = function() {
        this.printMazeString(this.getStringMaze());
    }

    this.printMazeString = function(strMaze) {
        for (arr of strMaze) {
			line="";
            for (str of arr) {
                line+=str;
            }
			line+="<br>"
            document.getElementById("mazeOut").innerHTML+=line;
        }
        document.getElementById("mazeOut").innerHTML+="<br><br><br>";
    }

    this.getStringMaze = function() {
        strMaze = [];
	    for (y = 0; y < height; y++) {
    	    strMaze[y] = [];
	    }
        for (y = 0; y < height; y++) {
            for (x = 0; x < width; x++) {
                tile = this.maze[y][x];
                result = "";
                if (this.startX == tile.x && this.startY == tile.y) {
                    result = "S";
                } else if (tile.isGoal(this.goalX, this.goalY)) {
                    result = "E";
                } else if (tile.isTraversable()) {
                    result = "[]";
                } else {
                    result = "X";
                }
                strMaze[y][x] = result;
            }
        }
        return strMaze;
    }

    this.printShortestPath = function(mode) {
        path = this.calculateShortestPath(mode);
        strMaze = this.getStringMaze();
        if (path != null) {
	        for (tile of path) {
    	        strMaze[tile.y][tile.x] = "V";
    	    }
		}
        this.printMazeString(strMaze);
    }

    this.getAdjacentTiles = function(tile) {
        return getAdjacentTilesXY(tile.x, tile.y);
    }

    this.getAdjacentTilesXY = function(x, y) {
        adjTiles = new Array();
        up = getTile(x, y + 1);
        if (up != null)
            adjTiles.push(up);
        down = getTile(x, y - 1);
        if (down != null)
            adjTiles.push(down);
        left = getTile(x - 1, y);
        if (left != null)
            adjTiles.push(left);
        right = getTile(x + 1, y);
        if (right != null)
            adjTiles.push(right);
        return adjTiles;
    }

    this.calculateShortestPath = function(mode) {
        switch (mode) {
            case GraphSearchMode.DFS:
                return this.calculateDFS();
            case GraphSearchMode.ASTAR:
                return this.calculateAStar();
            default:
                return this.calculateBFS();
        }
    }

    this.calculateBFS = function() {
        // TODO Auto-generated method stub
        return null;
    }

    this.calculateDFS = function() {
        // TODO Auto-generated method stub
        return null;
    }

    this.calculateAStar = function() {
        // TODO Auto-generated method stub
        return null;
    }
}
