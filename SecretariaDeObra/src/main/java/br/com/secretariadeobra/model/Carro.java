package br.com.secretariadeobra.model;

@SuppressWarnings("serial")
public class Carro extends BaseEntity {

	private String nome;

	private String modelo;

	private String placa;

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getModelo() {
		return modelo;
	}

	public void setModelo(String modelo) {
		this.modelo = modelo;
	}

	public String getPlaca() {
		return placa;
	}

	public void setPlaca(String placa) {
		this.placa = placa;
	}

	@Override
	public String toString() {
		return "Carro [nome=" + nome + ", modelo=" + modelo + ", placa=" + placa + "]";
	}

}
