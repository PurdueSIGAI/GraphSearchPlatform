package gsp;

public class Tile {

	private int x, y, cost;
	boolean visited;
	private Tile parent;

	public Tile(int x, int y, int cost) {
		this.x = x;
		this.y = y;
		this.cost = cost;
		this.visited = false;
		this.setParent(null);
	}

	public int getX() {
		return x;
	}

	public int getY() {
		return y;
	}

	public int getCost() {
		return cost;
	}

	public Tile getParent() {
		return parent;
	}

	public void setParent(Tile parent) {
		this.parent = parent;
	}
	
	public boolean isTraversable() {
		return cost > 0;
	}

	public boolean isGoal(int x, int y) {
		return this.x == x && this.y == y;
	}

	public boolean isVisited() {
		return visited;
	}

	public void setVisited(boolean visited) {
		this.visited = visited;
	}

	public void visit() {
		visited = true;
	}

}
