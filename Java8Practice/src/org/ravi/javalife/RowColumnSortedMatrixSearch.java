package org.ravi.javalife;

public class RowColumnSortedMatrixSearch {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		int mat[][] = {
				{10, 20, 30, 40},
                {15, 25, 35, 45},
                {27, 29, 37, 48},
                {32, 33, 39, 50}};
		System.out.println(RowColumnSortedMatrixSearch.search(mat, 2)?"Element exist in matrix":"Element doesn't exist in matrix");

	}
	
	public static boolean search(int mat[][], int element){
		
		int rowIndex = 0;
		int rows = mat.length;
		int columns = mat[0].length;
		int columnIndex = columns - 1;
		
		while(rowIndex < rows && columnIndex >= 0){
			if(element == mat[rowIndex][columnIndex]){
				return true;
			}
			if(element > mat[rowIndex][columnIndex]){
				rowIndex++;
			}
			else{
				columnIndex--;
			}
		}
		return false;
	}

}
