package br.com.secretariadeobra.model;

public class ConverteDouble {

	public static void main(String[] args) {
		
		
		String numeroParcela = "3"; 
		String valorTotal = "300"; 

		Double valorParcela = Double.valueOf(valorTotal) / Double.valueOf(numeroParcela);
		System.out.println("Parcela igual a:"+ valorParcela);
		
		for (int i = 1; i <= Double.valueOf(numeroParcela); i++) {
			System.out.println("Parcela:"+ i);
		}
		
	}

}
