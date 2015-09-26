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

    this.DFSHelper = function(tile, path) {
        if (tile.x === this.goalX && tile.goalY === this.goalY) { // basis case (tile is the goal)
            return path;// return the path
        } else { // recursive case 
            path.push(tile);
            var successor = this.getAdjacentTiles(tile);
            for (var i = 0; i < successor.length; i++) {// loop through each tile adjacent tile
                if (successor[i].isTraversable() && successor[i].visited === false) {// if this adjacent tile is both traversable and not visited
                    successor[i].visit();// visit the tile
                    // add the tile to path
                    var newPath = this.DFSHelper(successor[i], path);// calculate dfs on that tile (use this.DFSHelper)
                    if (newPath !== null) {// if dfs returns something non-null
                        return newPath;// return what dfs returns
                    }
                }
            }
            path.splice(path.length - 1, 1);// remove last tile from the path
            return null;// return null
        }
    }

    this.calculateDFS = function() {
        return this.DFSHelper(this.getTile(this.startX, this.startY), [])
    	// TODO
        // var list = [];
        // var countOfTraversability = 0;
        // var parent = this.getTile(this.startX, this.startY);
        // if (parent.isTraversable() && parent.visited == false) {
        //     list.push(parent);
        //     parent.visit();
        // }
        // while (parent != null){
        //     var successor = this.getAdjacentTiles(parent);
        //     for (i = 0; i < successor.length; i++) {
        //         var currentTile = successor[i];
        //         if (currentTile.isTraversable()) {
        //             if (currentTile.visited == false) {
        //                 list.push(currentTile);
        //                 currentTile.visit();
        //                 if (currentTile.x == this.goalX && currentTile.y == this.goalY) {
        //                     break;
        //                 }
        //                 else {
        //                     parent = currentTile;
        //                     break;
        //                 }
        //             }
        //             else {
        //                 countOfTraversability += 1;
        //             }
        //         }
        //     }
        //     if (countOfTraversability == successor.length) {
        //         list.splice(list.length - 1, 1);
        //         parent = list[list.length - 1];
        //     }
        // }
        // return list;
    };

    this.calculateBFS = function() {
    	// TODO
        var list = [];
        var startingPoint = this.getTile(this.startX, this.startY);
        list.push(startingPoint);
        while (list.length > 0) {
            var item = list.shift();
            item.visit();
            var successor = this.getAdjacentTiles(item);
            for (var i = 0; i < successor.length; i++) {
                if (successor[i].isTraversable() && successor[i].visited == false) {
                    successor[i].setParent(item);
                    if (successor[i].x == this.goalX && successor[i].y == this.goalY) {
                        break;
                    }
                    else {
                        list.push(successor[i]);
                    }
                }
            }
        }
        var path = [];
        var currentTile = this.getTile(this.goalX, this.goalY);
        while (currentTile != null) {
            path.push(currentTile);
            currentTile = currentTile.parent;
        }
        return path;
    };
    this.calculateAStar = function() {
    	// TODO
        return null;
    };

    // this.parent = function(tile, path) {

    // };
}
