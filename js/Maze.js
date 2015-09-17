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
	
	// ********************************************
	// ********** SOLUTION STARTS HERE ************
	// ********************************************
	
	// DFS
	
	this.dfsHelper = function(dfsPath, currentTile) {
		dfsPath.push(currentTile);
		if (currentTile.x === this.goalX && currentTile.y === this.goalY) { // If we are at the goal...
			return dfsPath;
		} else {
			var adjacent = this.getAdjacentTilesXY(currentTile.x, currentTile.y);
			for (var i = 0; i < adjacent.length; i++) {
				if (adjacent[i].visited !== true && adjacent[i].isTraversable()) {
					adjacent[i].visit();
					var r = this.dfsHelper(dfsPath, adjacent[i]);
					if (r !== null) {
						return r;
					}	
				}
			}
			dfsPath.splice(dfsPath.length - 1, 1);
			return null;
		}
	};

    this.calculateDFS = function() {
        var dfsPath = [];
		var currentTile = this.getTile(this.startX, this.startY);
		return this.dfsHelper(dfsPath, currentTile);		
    };
	
	// BFS
	
	this.copyArray = function(array) {
		return array.slice();
	};

    this.calculateBFS = function() {
		// Get the processing list setup
		var first = {
			tile:this.getTile(this.startX,this.startY),
			list:[this.getTile(this.startX,this.startY)],
		};
        var processingList = [];
		processingList.push(first);
		
		while (processingList.length !== 0) { // while processing list is not empty
			// pop from processing list
			var current = processingList[0];
			processingList.splice(0,1);	
			
			// Loop through each of the adjacent tiles
			var adjacent = this.getAdjacentTilesXY(current.tile.x, current.tile.y);
			for (var i = 0; i < adjacent.length; i++) {
				
				// If the file should be used...
				if (adjacent[i].visited !== true && adjacent[i].isTraversable()) {
					adjacent[i].visit(); // visit it...
					// Createa  new list...
					var newList = this.copyArray(current.list);
					newList.push(adjacent[i]);
					// check if we are at the finish ....
					if (adjacent[i].x === this.goalX && adjacent[i].y === this.goalY) {
						return newList;
					}
					// Otherwise, add it to the processing list
					var addTo = {
						tile:adjacent[i],
						list:newList
					};
					processingList.push(addTo);
				}
			}
		}
        
        // There is no path
        return null;
    };
	
	// A-Star
	
	this.g = function(obj) {
		return obj.list.length - 1;
	};
	
	this.h = function(obj) {
		return Math.sqrt(Math.pow((obj.tile.x - this.goalX), 2) + Math.pow(obj.tile.y - this.goalY, 2));
	};
	
	this.f = function(obj){
		return this.g(obj) + this.h(obj);
	};

	
	// Same as BFS except for what's noted by comments
	
    this.calculateAStar = function() {
		var first = {
			tile:this.getTile(this.startX,this.startY),
			list:[this.getTile(this.startX,this.startY)],
		};
		first.tile.visit();
        var processingList = [];
		processingList.push(first);
		while (processingList.length !== 0) {
			
			// Begin of difference
			var current = processingList[0];
			var remove = 0; // index to remove
			for (var j = 1; j < processingList.length; j++) {
				if (this.f(current) > this.f(processingList[j])) {
					current = processingList[j];
					remove = j;
				}
			}
			processingList.splice(remove,1);
			// End of difference
			
			var adjacent = this.getAdjacentTilesXY(current.tile.x, current.tile.y);
			for (var i = 0; i < adjacent.length; i++) {
				if (adjacent[i].visited !== true && adjacent[i].isTraversable()) {
					adjacent[i].visit();
					var newList = this.copyArray(current.list);
					newList.push(adjacent[i]);
					if (adjacent[i].x === this.goalX && adjacent[i].y === this.goalY) {
						return newList;
					}
					var addTo = {
						tile:adjacent[i],
						list:newList
					};
					processingList.push(addTo);
				}
			}
		}
        return null;
    };
}
