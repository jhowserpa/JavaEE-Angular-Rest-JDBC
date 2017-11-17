package br.com.secretariadeobra.model;

@SuppressWarnings("serial")
public class Pais extends BaseEntity {

	private String descricao;

	private String sigla;

	private String codigoBacen;

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public String getSigla() {
		return sigla;
	}

	public void setSigla(String sigla) {
		this.sigla = sigla;
	}

	public String getCodigoBacen() {
		return codigoBacen;
	}

	public void setCodigoBacen(String codigoBacen) {
		this.codigoBacen = codigoBacen;
	}

}