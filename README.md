GraphSearchPlatform
===================
This is an exercise in graph searching, used by SIGART in both Fall2014 and Fall2015.

# Getting Started
Open up the terminal, and navigate to the directory you want to save the repository to. If you're not sure what to do, enter the following commands:
```
mkdir sigai
cd sigai
```
Now you can clone the repository:
```
git clone https://github.com/PurdueSIGART/GraphSearchPlatform.git
```
Now enter the repository, navigate to the 'js' directory, and open the Maze.js file with your favorite editor:
```
cd GraphSearchPlatform
cd js
pluma Maze.js &
```
By using the '&' symbol you can keep using the terminal without closing pluma.

# Your Task
In the Maze.js file, you should find three functions at the bottom with TODO tags: one for DFS, one for BFS, and one for A*. You should implement these, specifically to find a path between the starting and goal points in the maze. You do this by returning an array of tiles that denote the path.

The starting point is denoted by the variables this.startX and this.startY. The goal point is denoted by this.goalX and this.goalY.

this.maze is a 2-dimensional array of Tile objects (view the Tile.js file for its description). What is important to note is each tile has a "isTraversable" method that returns whether or not its traversable.

Another useful function (in the Maze.js file) is this.getAdjacentTiles (defined on line 92). You can pass it a tile object, and it will return all adjacent tiles (note: not necessarily traversable).

# Testing
You can test your implementation by opening the index.html file in a web browser, choosing the algorithm you wish to check, and pressing "Start!" 
