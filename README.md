GraphSearchPlatform
===================
This is an exercise in graph searching, used by SIGART in both Fall2014 and Fall2015.

## Getting Started
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

## Your Task
In the Maze.js file, you should find three functions at the bottom with TODO tags: one for DFS, one for BFS, and one for A*. You should implement these, specifically to find a path between the starting and goal points in the maze. You do this by returning an array of tiles that denote the path.

The starting point is denoted by the variables this.startX and this.startY. The goal point is denoted by this.goalX and this.goalY.

this.maze is a 2-dimensional array of Tile objects (view the Tile.js file for its description). What is important to note is each tile has a "isTraversable" method that returns whether or not its traversable.

Another useful function (in the Maze.js file) is this.getAdjacentTiles (defined on line 92). You can pass it a tile object, and it will return all adjacent tiles (note: not necessarily traversable).

## Testing
You can test your implementation by opening the index.html file in a web browser, choosing the algorithm you wish to check, and pressing "Start!" 

## When you're done
When you're done, execute the following code, where "login" is your Purdue login. Note:Cannot contain spaces.
```
git checkout -b login # Makes a new branch, called your login
git git add . # Adds all changes
git commit -m "Implemented algorithms" # Commits these changes to the local repository
git push origin login # Pushes commits from the local repository to the remote
```
You should now see your solution on github as a new branch.

## A Note on Debugging
Your code will very likely not work when you run it the first time. Using a debugger can help you step through your code, line by line, analyzing the state of all variables in an effort to locate an error in your program.

In Google Chrome, first open the developer tools by pressing the options button > More Tools > Developer Tools

![]
(https://raw.githubusercontent.com/PurdueSIGART/GraphSearchPlatform/master/pics/openDeveloperTools.png)

Then select the "source" tab to open the debugger.

![]
(https://github.com/PurdueSIGART/GraphSearchPlatform/blob/master/pics/openDebugger.png?raw=true)

The debugger should open. In the middle you will see your source code (including the line that the debugger is currently at, if JavaScript code is currently being run). Click on a line number to set a breakpoint. On the right side you should see something similar to below, where you can see all of the variables in their various contexts, as well as a few buttons: Pause/Continue until you get to a breakpoint, step over (simply goes to the next line in the current function), step into (goes into the function being called by this line of code, if you wrote it), and step out (continues until the function returns).

![]
(https://github.com/PurdueSIGART/GraphSearchPlatform/blob/master/pics/debugger.png?raw=true)
