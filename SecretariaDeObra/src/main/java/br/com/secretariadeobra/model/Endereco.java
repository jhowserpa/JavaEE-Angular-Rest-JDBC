package br.com.secretariadeobra.model;

import java.util.List;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@SuppressWarnings("serial")
@XmlRootElement(name = "enderecos")
@XmlAccessorType(XmlAccessType.FIELD)
public class Endereco extends BaseEntity {

	public static final int TIPO_ENDERECO_PRINCIPAL = 0;
	public static final int TIPO_ENDERECO_PAGAMENTO = 1;
	public static final int TIPO_ENDERECO_ENTREGA = 2;

	@XmlElement
	private String endereco;

	@XmlElement
	private String numero;

	@XmlElement
	private String complemento;

	@XmlElement
	private String bairro;

	@XmlElement
	private Integer tipoEndereco;

	@XmlElement
	private Cep cep;

	@XmlElement
	private Municipio municipio;

	private List<Municipio> municipios;

	public List<Municipio> getMunicipios() {
		return municipios;
	}

	public void setMunicipios(List<Municipio> municipios) {
		this.municipios = municipios;
	}

	public String getEndereco() {
		return endereco;
	}

	public String getNumero() {
		return numero;
	}

	public String getComplemento() {
		return complemento;
	}

	public String getBairro() {
		return bairro;
	}

	public void setEndereco(String endereco) {
		this.endereco = endereco;
	}

	public void setNumero(String numero) {
		this.numero = numero;
	}

	public void setComplemento(String complemento) {
		this.complemento = complemento;
	}

	public void setBairro(String bairro) {
		this.bairro = bairro;
	}

	public Integer getTipoEndereco() {
		return tipoEndereco;
	}

	public void setTipoEndereco(Integer tipoEndereco) {
		this.tipoEndereco = tipoEndereco;
	}

	public Cep getCep() {
		return cep;
	}

	public void setCep(Cep cep) {
		this.cep = cep;
	}

	public Municipio getMunicipio() {
		return municipio;
	}

	public void setMunicipio(Municipio municipio) {
		this.municipio = municipio;
	}
}
