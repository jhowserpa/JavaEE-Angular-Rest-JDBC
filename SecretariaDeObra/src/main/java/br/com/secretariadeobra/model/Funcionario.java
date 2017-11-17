package br.com.secretariadeobra.model;

import java.math.BigDecimal;
import java.util.Date;

@SuppressWarnings("serial")
public class Funcionario extends BaseEntity {

	private String codigo;

	private String nome;

	public String localNascimento;

	public Date dataNascimento;

	public Date dataEmissao;

	public Date dataAdmissao;

	public Date dataExpedicao;

	public Date dataPis;

	public Date dataAtestado;

	private String nomePai;

	private String nomeMae;

	private String endereco;

	private String bairro;

	private String cidade;

	private String cep;

	private String estadoCivil;

	private String grauInstrucao;

	private String telefone;

	private String nomeConjugue;

	private String rg;

	private String orgao;

	private String cpf;

	private String habilitacao;

	private String categoria;

	private String tituloEleitor;

	private String zona;

	private String secao;

	private String certificadoReservista;

	private String pis;

	private String ctps;

	private String serieUf;

	private String funcao;

	private String departamento;

	private BigDecimal salario;

	private String horario;

	private String intervalo;

	private String registroLivro;

	private String folha;

	private String descontos;

	private String contratoExperiencia;

	private String observacao;

	private String celular;

	public String getCodigo() {
		return codigo;
	}

	public void setCodigo(String codigo) {
		this.codigo = codigo;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getLocalNascimento() {
		return localNascimento;
	}

	public void setLocalNascimento(String localNascimento) {
		this.localNascimento = localNascimento;
	}

	public Date getDataNascimento() {
		return dataNascimento;
	}

	public void setDataNascimento(Date dataNascimento) {
		this.dataNascimento = dataNascimento;
	}

	public Date getDataEmissao() {
		return dataEmissao;
	}

	public void setDataEmissao(Date dataEmissao) {
		this.dataEmissao = dataEmissao;
	}

	public Date getDataAdmissao() {
		return dataAdmissao;
	}

	public void setDataAdmissao(Date dataAdmissao) {
		this.dataAdmissao = dataAdmissao;
	}

	public Date getDataExpedicao() {
		return dataExpedicao;
	}

	public void setDataExpedicao(Date dataExpedicao) {
		this.dataExpedicao = dataExpedicao;
	}

	public Date getDataPis() {
		return dataPis;
	}

	public void setDataPis(Date dataPis) {
		this.dataPis = dataPis;
	}

	public Date getDataAtestado() {
		return dataAtestado;
	}

	public void setDataAtestado(Date dataAtestado) {
		this.dataAtestado = dataAtestado;
	}

	public String getNomePai() {
		return nomePai;
	}

	public void setNomePai(String nomePai) {
		this.nomePai = nomePai;
	}

	public String getNomeMae() {
		return nomeMae;
	}

	public void setNomeMae(String nomeMae) {
		this.nomeMae = nomeMae;
	}

	public String getEndereco() {
		return endereco;
	}

	public void setEndereco(String endereco) {
		this.endereco = endereco;
	}

	public String getBairro() {
		return bairro;
	}

	public void setBairro(String bairro) {
		this.bairro = bairro;
	}

	public String getCidade() {
		return cidade;
	}

	public void setCidade(String cidade) {
		this.cidade = cidade;
	}

	public String getCep() {
		return cep;
	}

	public void setCep(String cep) {
		this.cep = cep;
	}

	public String getEstadoCivil() {
		return estadoCivil;
	}

	public void setEstadoCivil(String estadoCivil) {
		this.estadoCivil = estadoCivil;
	}

	public String getGrauInstrucao() {
		return grauInstrucao;
	}

	public void setGrauInstrucao(String grauInstrucao) {
		this.grauInstrucao = grauInstrucao;
	}

	public String getTelefone() {
		return telefone;
	}

	public void setTelefone(String telefone) {
		this.telefone = telefone;
	}

	public String getNomeConjugue() {
		return nomeConjugue;
	}

	public void setNomeConjugue(String nomeConjugue) {
		this.nomeConjugue = nomeConjugue;
	}

	public String getRg() {
		return rg;
	}

	public void setRg(String rg) {
		this.rg = rg;
	}

	public String getOrgao() {
		return orgao;
	}

	public void setOrgao(String orgao) {
		this.orgao = orgao;
	}

	public String getCpf() {
		return cpf;
	}

	public void setCpf(String cpf) {
		this.cpf = cpf;
	}

	public String getHabilitacao() {
		return habilitacao;
	}

	public void setHabilitacao(String habilitacao) {
		this.habilitacao = habilitacao;
	}

	public String getCategoria() {
		return categoria;
	}

	public void setCategoria(String categoria) {
		this.categoria = categoria;
	}

	public String getTituloEleitor() {
		return tituloEleitor;
	}

	public void setTituloEleitor(String tituloEleitor) {
		this.tituloEleitor = tituloEleitor;
	}

	public String getZona() {
		return zona;
	}

	public void setZona(String zona) {
		this.zona = zona;
	}

	public String getSecao() {
		return secao;
	}

	public void setSecao(String secao) {
		this.secao = secao;
	}

	public String getCertificadoReservista() {
		return certificadoReservista;
	}

	public void setCertificadoReservista(String certificadoReservista) {
		this.certificadoReservista = certificadoReservista;
	}

	public String getPis() {
		return pis;
	}

	public void setPis(String pis) {
		this.pis = pis;
	}

	public String getCtps() {
		return ctps;
	}

	public void setCtps(String ctps) {
		this.ctps = ctps;
	}

	public String getSerieUf() {
		return serieUf;
	}

	public void setSerieUf(String serieUf) {
		this.serieUf = serieUf;
	}

	public String getFuncao() {
		return funcao;
	}

	public void setFuncao(String funcao) {
		this.funcao = funcao;
	}

	public String getDepartamento() {
		return departamento;
	}

	public void setDepartamento(String departamento) {
		this.departamento = departamento;
	}

	public BigDecimal getSalario() {
		return salario;
	}

	public void setSalario(BigDecimal salario) {
		this.salario = salario;
	}

	public String getHorario() {
		return horario;
	}

	public void setHorario(String horario) {
		this.horario = horario;
	}

	public String getIntervalo() {
		return intervalo;
	}

	public void setIntervalo(String intervalo) {
		this.intervalo = intervalo;
	}

	public String getRegistroLivro() {
		return registroLivro;
	}

	public void setRegistroLivro(String registroLivro) {
		this.registroLivro = registroLivro;
	}

	public String getFolha() {
		return folha;
	}

	public void setFolha(String folha) {
		this.folha = folha;
	}

	public String getDescontos() {
		return descontos;
	}

	public void setDescontos(String descontos) {
		this.descontos = descontos;
	}

	public String getContratoExperiencia() {
		return contratoExperiencia;
	}

	public void setContratoExperiencia(String contratoExperiencia) {
		this.contratoExperiencia = contratoExperiencia;
	}

	public String getObservacao() {
		return observacao;
	}

	public void setObservacao(String observacao) {
		this.observacao = observacao;
	}

	public String getCelular() {
		return celular;
	}

	public void setCelular(String celular) {
		this.celular = celular;
	}

	@Override
	public String toString() {
		return "Funcionario [codigo=" + codigo + ", nome=" + nome + ", localNascimento=" + localNascimento
				+ ", dataNascimento=" + dataNascimento + ", dataEmissao=" + dataEmissao + ", dataAdmissao="
				+ dataAdmissao + ", dataExpedicao=" + dataExpedicao + ", dataPis=" + dataPis + ", dataAtestado="
				+ dataAtestado + ", nomePai=" + nomePai + ", nomeMae=" + nomeMae + ", endereco=" + endereco
				+ ", bairro=" + bairro + ", cidade=" + cidade + ", cep=" + cep + ", estadoCivil=" + estadoCivil
				+ ", grauInstrucao=" + grauInstrucao + ", telefone=" + telefone + ", nomeConjugue=" + nomeConjugue
				+ ", rg=" + rg + ", orgao=" + orgao + ", cpf=" + cpf + ", habilitacao=" + habilitacao + ", categoria="
				+ categoria + ", tituloEleitor=" + tituloEleitor + ", zona=" + zona + ", secao=" + secao
				+ ", certificadoReservista=" + certificadoReservista + ", pis=" + pis + ", ctps=" + ctps + ", serieUf="
				+ serieUf + ", funcao=" + funcao + ", departamento=" + departamento + ", salario=" + salario
				+ ", horario=" + horario + ", intervalo=" + intervalo + ", registroLivro=" + registroLivro + ", folha="
				+ folha + ", descontos=" + descontos + ", contratoExperiencia=" + contratoExperiencia + ", observacao="
				+ observacao + ", celular=" + celular + "]";
	}

}
