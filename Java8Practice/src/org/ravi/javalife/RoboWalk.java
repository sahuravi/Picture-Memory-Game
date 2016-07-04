package org.ravi.javalife;

public class RoboWalk {

	int paths;

	void MoveLeft(int x, int y, int grid[][]) {
		if (x == 0) {
			return;
		} else {
			if (grid[x - 1][y] == 1) {
				return;
			} else {
				grid[x - 1][y] = 1;
				Move_Again(x - 1, y, grid);
				grid[x - 1][y] = 0;
			}
		}
	}

	void MoveRight(int x, int y, int grid[][]) {
		if (x == 3 && y == 3) {
			paths++;
			grid[x][y] = 1;
			return;
		} else {
			if (x == 3) {
				return;
			} else {
				if (grid[x + 1][y] == 1) {
					return;
				} else {
					grid[x + 1][y] = 1;
					Move_Again(x + 1, y, grid);
					grid[x + 1][y] = 0;
				}
			}
		}
	}

	void MoveUp(int x, int y, int grid[][]) {
		if (y == 0) {
			return;
		} else {
			if (grid[x][y - 1] == 1) {
				return;
			} else {
				grid[x][y - 1] = 1;
				Move_Again(x, y - 1, grid);
				grid[x][y - 1] = 0;
			}
		}
	}

	void MoveDown(int x, int y, int grid[][]) {
		if (y == 3 && x == 3) {
			paths++;
			grid[x][y] = 1;
			return;
		} else {
			if (y == 3) {
				return;
			} else {
				if (grid[x][y + 1] == 1) {
					return;
				} else {
					grid[x][y + 1] = 1;
					Move_Again(x, y + 1, grid);
					grid[x][y + 1] = 0;
				}
			}
		}
	}

	void Move_Again(int x, int y, int grid[][]) {
		grid[x][y] = 1;
		MoveLeft(x, y, grid);
		MoveRight(x, y, grid);
		MoveUp(x, y, grid);
		MoveDown(x, y, grid);

	}

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		int grid[][] = new int[4][4];
		RoboWalk m = new RoboWalk();
		m.paths = 0;
		grid[0][0] = 1; // at the top left point.
		m.Move_Again(0, 1, grid);
		System.out.println(m.paths);
		// m.start(0,1,grid);
	}

}