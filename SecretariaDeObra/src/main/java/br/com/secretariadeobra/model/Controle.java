package br.com.secretariadeobra.model;

import java.util.Date;

@SuppressWarnings("serial")
public class Controle extends BaseEntity {

	private Funcionario funcionario;

	private String status;

	private String maquina;

	private String ferramentas;

	private Date dataSaida;

	private Date dataDevolucao;

	private Municipio municipio;

	private String observacao;

	private Carro carro;

	private String kmSaida;

	private String kmChegada;

	public String getKmSaida() {
		return kmSaida;
	}

	public void setKmSaida(String kmSaida) {
		this.kmSaida = kmSaida;
	}

	public String getKmChegada() {
		return kmChegada;
	}

	public void setKmChegada(String kmChegada) {
		this.kmChegada = kmChegada;
	}

	public Carro getCarro() {
		return carro;
	}

	public void setCarro(Carro carro) {
		this.carro = carro;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Funcionario getFuncionario() {
		return funcionario;
	}

	public void setFuncionario(Funcionario funcionario) {
		this.funcionario = funcionario;
	}

	public String getMaquina() {
		return maquina;
	}

	public void setMaquina(String maquina) {
		this.maquina = maquina;
	}

	public String getFerramentas() {
		return ferramentas;
	}

	public void setFerramentas(String ferramentas) {
		this.ferramentas = ferramentas;
	}

	public Date getDataSaida() {
		return dataSaida;
	}

	public void setDataSaida(Date dataSaida) {
		this.dataSaida = dataSaida;
	}

	public Date getDataDevolucao() {
		return dataDevolucao;
	}

	public void setDataDevolucao(Date dataDevolucao) {
		this.dataDevolucao = dataDevolucao;
	}

	public Municipio getMunicipio() {
		return municipio;
	}

	public void setMunicipio(Municipio municipio) {
		this.municipio = municipio;
	}

	public String getObservacao() {
		return observacao;
	}

	public void setObservacao(String observacao) {
		this.observacao = observacao;
	}

	@Override
	public String toString() {
		return "Controle [funcionario=" + funcionario + ", maquina=" + maquina + ", ferramentas=" + ferramentas
				+ ", dataSaida=" + dataSaida + ", dataDevolucao=" + dataDevolucao + ", municipio=" + municipio
				+ ", observacao=" + observacao + "]";
	}

}
