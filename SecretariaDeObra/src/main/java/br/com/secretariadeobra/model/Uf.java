package br.com.secretariadeobra.model;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;

@SuppressWarnings("serial")
@XmlAccessorType(XmlAccessType.FIELD)
public class Uf extends BaseEntity {

	private String descricao;

	private String sigla;

	private String codigoIbge;

	private double percentualFundoEstadualCombatePobreza;

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

	public String getCodigoIbge() {
		return codigoIbge;
	}

	public void setCodigoIbge(String codigoIbge) {
		this.codigoIbge = codigoIbge;
	}

	public double getPercentualFundoEstadualCombatePobreza() {
		return percentualFundoEstadualCombatePobreza;
	}

	public void setPercentualFundoEstadualCombatePobreza(double percentualFundoEstadualCombatePobreza) {
		this.percentualFundoEstadualCombatePobreza = percentualFundoEstadualCombatePobreza;
	}

}
