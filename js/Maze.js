var GraphSearchMode = {
    BFS: 0,
    DFS: 1,
    ASTAR: 2,
};

function Maze(height, width) {
    this.height = parseInt(height);
    this.width = parseInt(width);
    this.maze = [];
    for (var y = 0; y < height; y++) {
        this.maze[y] = [];
    }
    for (y = 0; y < this.height; y++) {
        for (var x = 0; x < this.width; x++) {
            var traversable = Math.random() > 0.1 ? 1 : -1;
            // int cost = (int) (traversable * Math.random() * 10.0);
            var cost = traversable;
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
        if (x < width && x >= 0 && y < height && y >= 0) {
            return this.maze[y][x];
		}
        return null;
    };

    this.printMaze = function() {
        this.printMazeString(this.getStringMaze());
    };

    this.printMazeString = function(strMaze) {
        for (var i = 0; i < strMaze.length; i++) {
			var arr = strMaze[i];
			var line="";
            for (var j = 0; j < arr.length; j++) {
				var str = arr[j];
                line+=str;
            }
			line+="<br>";
            document.getElementById("mazeOut").innerHTML+=line;
        }
        document.getElementById("mazeOut").innerHTML+="<br><br><hr><br><br>";
    };

    this.getStringMaze = function() {
        var strMaze = [];
	    for (var y = 0; y < height; y++) {
    	    strMaze[y] = [];
	    }
        for (y = 0; y < height; y++) {
            for (var x = 0; x < width; x++) {
                var tile = this.maze[y][x];
                var result = "";
                if (this.startX === tile.x && this.startY === tile.y) {
                    result = '<font color="green">S</font>';
                } else if (tile.isGoal(this.goalX, this.goalY)) {
                    result = '<font color="red">E</font>';
                } else if (tile.isTraversable()) {
                    result = '<font color="white">[</font>';
                } else {
                    result = "X";
                }
                strMaze[y][x] = result;
            }
        }
        return strMaze;
    };

    this.printShortestPath = function(mode) {
        var path = this.calculateShortestPath(mode);
        var strMaze = this.getStringMaze();
        if (path !== null) {
	        for (var i = 0; i < path.length; i++) {
				var tile = path[i];
    	        strMaze[tile.y][tile.x] = '<font color="red">V</font>';
    	    }
		}
        this.printMazeString(strMaze);
    };

    this.getAdjacentTiles = function(tile) {
        return this.getAdjacentTilesXY(tile.x, tile.y);
    };

    this.getAdjacentTilesXY = function(x, y) {
        var adjTiles = [];
        var up = this.getTile(x, y + 1);
        if (up !== null) {
            adjTiles.push(up);
		}
		var down = this.getTile(x, y - 1);
        if (down !== null) {
            adjTiles.push(down);
		}
		var left = this.getTile(x - 1, y);
        if (left !== null) {
            adjTiles.push(left);
		}
        var right = this.getTile(x + 1, y);
        if (right !== null) {
            adjTiles.push(right);
		}
        return adjTiles;
    };

    this.calculateShortestPath = function(mode) {
        switch (mode) {
            case GraphSearchMode.DFS:
                return this.calculateDFS();
            case GraphSearchMode.ASTAR:
                return this.calculateAStar();
            default:
                return this.calculateBFS();
        }
    };

    this.calculateDFS = function() {
    	// TODO
        return null;
    };

    this.calculateBFS = function() {
    	// TODO
        return null;
    };
    this.calculateAStar = function() {
    	// TODO
        return null;
    };
}
