package gsp;

import gsp.Maze.GraphSearchMode;

public class Main {
	static Maze maze;
	final static int DEFAULT_HEIGHT = 100;
	final static int DEFAULT_WIDTH = 100;
	final static GraphSearchMode DEFAULT_GSM = Maze.GraphSearchMode.BFS;

	public static void main(String[] args) {
		int height = DEFAULT_HEIGHT;
		int width = DEFAULT_WIDTH;
		Maze.GraphSearchMode mode = DEFAULT_GSM;
		if (args.length == 1) {
			mode = getGSM(args[0]);
		} else if (args.length == 3) {
			mode = getGSM(args[0]);
			try {
				height = Integer.parseInt(args[1]);
				width = Integer.parseInt(args[2]);
			} catch (NumberFormatException e) {
				height = DEFAULT_HEIGHT;
				width = DEFAULT_WIDTH;
			}
		}
		maze = new Maze(height, width);
		maze.printMaze();
		System.out.println();
		System.out.println();
		System.out.println();
		System.out.println();
		System.out.println();
		maze.printShortestPath(mode);
	}

	public static GraphSearchMode getGSM(String mode) {
		return Maze.GraphSearchMode.values()[Integer.parseInt(mode)];
	}
}
