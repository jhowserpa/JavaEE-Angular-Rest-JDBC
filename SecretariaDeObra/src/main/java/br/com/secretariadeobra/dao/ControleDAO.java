package br.com.secretariadeobra.dao;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

import br.com.secretariadeobra.model.Carro;
import br.com.secretariadeobra.model.Controle;
import br.com.secretariadeobra.model.Funcionario;
import br.com.secretariadeobra.model.Municipio;
import br.com.secretariadeobra.util.ConexaoJDBC;
import br.com.secretariadeobra.util.ConexaoPostgresJDBC;

public class ControleDAO {

	private final ConexaoJDBC connection;

	public ControleDAO() throws SQLException, ClassNotFoundException {
		this.connection = new ConexaoPostgresJDBC();
	}

	public Long save(Controle controle) throws SQLException, ClassNotFoundException {
		Long id = null;

		String sql = "INSERT INTO scc.controle (controle_status, controle_funcionarioid, controle_maquina, controle_ferramentas, "
				+ " controle_datasaida, controle_municipioid, controle_carroid, controle_observacao, controle_kmsaida, controle_kmchegada) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?) RETURNING controle_id;";
		PreparedStatement ps = null;
		try {
			ps = this.connection.getConnection().prepareStatement(sql);
			ps.setString(1, controle.getStatus());
			ps.setObject(2, controle.getFuncionario() != null ? controle.getFuncionario().getId() : null);
			ps.setString(3, controle.getMaquina());
			ps.setString(4, controle.getFerramentas());

			DateFormat dateFormatada = new SimpleDateFormat("dd/MM/yyyy hh:mm:ss");
			Date dataAtual = new Date();
			dateFormatada.format(dataAtual);
			controle.setDataSaida(dataAtual);
			ps.setTimestamp(5, new java.sql.Timestamp(controle.getDataSaida().getTime()));

			ps.setObject(6, controle.getMunicipio() != null ? controle.getMunicipio().getId() : null);
			ps.setObject(7, controle.getCarro() != null ? controle.getCarro().getId() : null);
			ps.setString(8, controle.getObservacao());
			ps.setString(9, controle.getKmSaida());
			ps.setString(10, controle.getKmChegada());

			ResultSet rs = ps.executeQuery();
			if (rs.next()) {
				id = rs.getLong("controle_id");
			}

			this.connection.commit();
		} catch (SQLException ex) {
			this.connection.rollback();
			Logger.getLogger(ControleDAO.class.getName()).log(Level.SEVERE, null, ex);
			throw ex;
		} finally {
			try {
				ps.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		return id;
	}

	public void update(Controle controle) throws SQLException, ClassNotFoundException {
		String sql = " UPDATE scc.controle SET controle_status=?, controle_funcionarioid=?, controle_maquina=?, controle_ferramentas=?, "
				+ "  controle_datadevolucao=?, controle_municipioid=?, controle_carroid=?, controle_observacao=?, "
				+ "  controle_kmsaida=?, controle_kmchegada=? where controle_id =?";
		PreparedStatement ps = null;
		try {
			ps = this.connection.getConnection().prepareStatement(sql);
			ps.setString(1, controle.getStatus());
			ps.setObject(2, controle.getFuncionario() != null ? controle.getFuncionario().getId() : null);
			ps.setString(3, controle.getMaquina());
			ps.setString(4, controle.getFerramentas());

			DateFormat dateFormatada = new SimpleDateFormat("dd/MM/yyyy hh:mm:ss");
//			Date dataAtual = new Date();
			dateFormatada.format(controle.getDataDevolucao().getTime());
			controle.setDataDevolucao(new java.sql.Timestamp(controle.getDataDevolucao().getTime()));

			ps.setTimestamp(5, new java.sql.Timestamp(controle.getDataDevolucao().getTime()));
			ps.setObject(6, controle.getMunicipio() != null ? controle.getMunicipio().getId() : null);
			ps.setObject(7, controle.getCarro() != null ? controle.getCarro().getId() : null);
			ps.setString(8, controle.getObservacao());
			ps.setString(9, controle.getKmSaida());
			ps.setString(10, controle.getKmChegada());
			ps.setLong(11, controle.getId());
			ps.execute();

			this.connection.commit();
		} catch (SQLException ex) {
			this.connection.rollback();
			Logger.getLogger(ControleDAO.class.getName()).log(Level.SEVERE, null, ex);
			throw ex;
		} finally {
			ps.close();
		}
	}

	public int excluir(long id) throws SQLException, ClassNotFoundException {
		int linhasAfetadas = 0;
		String sql = "delete from scc.controle where controle_id = ?";
		PreparedStatement ps = null;
		try {
			ps = this.connection.getConnection().prepareStatement(sql);
			ps.setLong(1, id);
			linhasAfetadas = ps.executeUpdate();

			this.connection.commit();
		} catch (SQLException ex) {
			this.connection.rollback();
			if (ex.getSQLState().equals("23503")) {
				System.out.println(
						"ATENÇÃO!!! Não é Possivel deletar " + id + " pois está sendo usado(a) em outro Registro!");
			}
			Logger.getLogger(ControleDAO.class.getName()).log(Level.SEVERE, null, ex);
			throw ex;
		} finally {
			ps.close();
		}
		return linhasAfetadas;
	}

	public List<Controle> listar() throws SQLException {

		StringBuffer sql = new StringBuffer(" SELECT * FROM scc.controle ");
		sql.append(" LEFT JOIN scc.funcionario on funcionario_id = controle_funcionarioid ");
		sql.append(" LEFT JOIN scc.municipio on municipio_id = controle_municipioid ");
		sql.append(" LEFT JOIN scc.carro on carro_id = controle_carroid ORDER BY controle_id DESC");

		PreparedStatement ps = null;
		ResultSet resultSet = null;
		List<Controle> listaControle = new ArrayList<Controle>();
		try {
			ps = connection.getConnection().prepareStatement(sql.toString());
			resultSet = ps.executeQuery();
			while (resultSet.next()) {

				Controle controle = new Controle();
				controle.setId(resultSet.getLong("controle_id"));
				controle.setStatus(resultSet.getString("controle_status"));

				Funcionario funcionario = new Funcionario();
				funcionario.setId(resultSet.getLong("funcionario_id"));
				funcionario.setCodigo(resultSet.getString("funcionario_matricula"));
				funcionario.setNome(resultSet.getString("funcionario_nome"));
				funcionario.setCpf(resultSet.getString("funcionario_cpf"));
				controle.setFuncionario(funcionario);

				controle.setMaquina(resultSet.getString("controle_maquina"));
				controle.setFerramentas(resultSet.getString("controle_ferramentas"));

				// DateFormat dateFormatada = new SimpleDateFormat("dd/MM/yyyy
				// hh:mm:ss");
				// String data =
				// dateFormatada.format(resultSet.getDate("controle_datasaida"));
				// controle.setDataSaida(new Date(data));
				//
				// SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
				// Date date = sdf.parse("27/07/2006");

				controle.setDataSaida(resultSet.getTimestamp("controle_datasaida"));
				controle.setDataDevolucao(resultSet.getTimestamp("controle_datadevolucao"));

				Municipio municipio = new Municipio();
				municipio.setId(resultSet.getLong("municipio_id"));
				municipio.setNome(resultSet.getString("municipio_nome"));
				municipio.setCodigoMunicipal(resultSet.getString("municipio_codigomunicipal"));
				controle.setMunicipio(municipio);

				Carro carro = new Carro();
				carro.setId(resultSet.getLong("carro_id"));
				carro.setNome(resultSet.getString("carro_nome"));
				carro.setModelo(resultSet.getString("carro_modelo"));
				carro.setPlaca(resultSet.getString("carro_placa"));
				controle.setCarro(carro);

				controle.setObservacao(resultSet.getString("controle_observacao"));
				controle.setKmSaida(resultSet.getString("controle_kmsaida"));
				controle.setKmChegada(resultSet.getString("controle_kmchegada"));

				listaControle.add(controle);
			}
			return (List<Controle>) listaControle;
		} catch (SQLException e) {
			e.printStackTrace();
			throw e;
		}
	}

}
