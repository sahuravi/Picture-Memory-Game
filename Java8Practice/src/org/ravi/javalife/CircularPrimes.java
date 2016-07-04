package org.ravi.javalife;

import java.util.ArrayList;
import java.util.Scanner;

public class CircularPrimes {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Scanner sc = new Scanner(System.in);
		int num = sc.nextInt();
		sc.close();
		
		ArrayList <Integer>arr = new ArrayList<Integer>();
		
		for(int i = 2; i <= num; i++) {
			if(i == 2 || i == 3){
				arr.add(i);
			}
			else{
				int counter = 2;
				boolean flag = false;
				int loopCount = (int) Math.sqrt(i);
				for(int j=2; j<= loopCount; j++){
					if(i%j != 0){
						flag = true;
						counter++;
						continue;
					}
					else{
						break;
					}
				}
				if(counter > loopCount && flag == true){
					arr.add(i);
				}
			}
		}
		
		ArrayList <Integer>al = new ArrayList<Integer>();
		for(int i = 1; i<= arr.size(); i++){
			int reverse = CircularPrimes.reverseNumber(arr.get(i-1));
			//System.out.println(reverse);
			if(CircularPrimes.isPrime(reverse) && reverse <= num){
				al.add(arr.get(i-1));
			}
		}
		System.out.println(al);
	}
	
	public static int reverseNumber(int number){
        int reverse = 0;
        while(number != 0){
            reverse = (reverse*10)+(number%10);
            number = number/10;
        }
        return reverse;
    }
	
	public static boolean isPrime(int number){
		boolean prime = true;
		for(int i =2; i<= Math.sqrt(number) && number%i== 0; i++){
			prime = false;
		}
		return prime;
	}
}