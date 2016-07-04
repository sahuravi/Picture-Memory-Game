package org.ravi.javalife;

public class RobotMove {

	static int numPaths;

	public static void main(String... str) {
		//Making a 2D array to store visited squares on the basis of 0 and 1. 1 when visited and 0 not visited.
		int gridArray[][] = new int[4][4];
		gridArray[0][0] = 1;
		
		RobotMove.moveRobot(0, 0, gridArray);	//This function is going to handle all the move ie left, right, up and down.
		System.out.println(RobotMove.numPaths);
	}

	public static void moveRobot(int row, int column, int[][] gridArray) {
		RobotMove.moveRobotUp(row, column, gridArray);
		RobotMove.moveRobotDown(row, column, gridArray);
		RobotMove.moveRobotLeft(row, column, gridArray);
		RobotMove.moveRobotRight(row, column, gridArray);
	}

	public static void moveRobotRight(int row, int column, int[][] gridArray) {
		// TODO Auto-generated method stub
		if (row == 3 && column == 3) {
			RobotMove.numPaths++;
			gridArray[row][column] = 1;
			return;
		} else if (column == 3) {
			return;
		} else {
			if (gridArray[row][column + 1] == 1) {
				return;
			}
			gridArray[row][column + 1] = 1;
			RobotMove.moveRobot(row, column + 1, gridArray);
			gridArray[row][column + 1] = 0;
		}
	}

	public static void moveRobotLeft(int row, int column, int[][] gridArray) {
		// TODO Auto-generated method stub
		if (column == 0) {
			return;
		} else {
			if (gridArray[row][column - 1] == 1) {
				return;
			}
			gridArray[row][column - 1] = 1;
			RobotMove.moveRobot(row, column - 1, gridArray);
			gridArray[row][column - 1] = 0;
		}
	}

	public static void moveRobotDown(int row, int column, int[][] gridArray) {
		// TODO Auto-generated method stub
		if (row == 3 && column == 3) {
			RobotMove.numPaths++;
			gridArray[row][column] = 1;
			return;
		} else if (row == 3) {
			return;
		} else {
			if (gridArray[row + 1][column] == 1) {
				return;
			}
			gridArray[row + 1][column] = 1;
			RobotMove.moveRobot(row + 1, column, gridArray);
			gridArray[row + 1][column] = 0;
		}
	}

	public static void moveRobotUp(int row, int column, int[][] gridArray) {
		// TODO Auto-generated method stub
		if (row == 0) {
			return;
		} else {
			if (gridArray[row - 1][column] == 1) {
				return;
			}
			gridArray[row - 1][column] = 1;
			RobotMove.moveRobot(row - 1, column, gridArray);
			gridArray[row - 1][column] = 0;
		}
	}
}
