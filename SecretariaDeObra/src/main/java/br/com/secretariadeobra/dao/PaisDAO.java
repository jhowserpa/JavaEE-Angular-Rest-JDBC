package br.com.secretariadeobra.dao;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

import br.com.secretariadeobra.model.Pais;
import br.com.secretariadeobra.util.ConexaoJDBC;
import br.com.secretariadeobra.util.ConexaoPostgresJDBC;

public class PaisDAO {

	private final ConexaoJDBC connection;

	public PaisDAO() throws SQLException, ClassNotFoundException {
		this.connection = new ConexaoPostgresJDBC();
	}

	public Long save(Pais pais) throws SQLException, ClassNotFoundException {

		Long id = null;

		String sql = " INSERT INTO scc.pais " + " (pais_descricao, pais_sigla, pais_codigobacen) "
				+ "	VALUES (?, ?, ?) RETURNING pais_id;";

		PreparedStatement ps = null;
		try {
			ps = this.connection.getConnection().prepareStatement(sql);
			ps.setString(1, pais.getDescricao());
			ps.setString(2, pais.getSigla());
			ps.setString(3, pais.getCodigoBacen());

			ResultSet rs = ps.executeQuery();
			if (rs.next()) {
				id = rs.getLong("pais_id");
			}

			this.connection.commit();
		} catch (SQLException ex) {
			this.connection.rollback();
			Logger.getLogger(PaisDAO.class.getName()).log(Level.SEVERE, null, ex);
			throw ex;
		} finally {
		}
		return id;
	}

	public void update(Pais pais) throws SQLException {
		String sql = " UPDATE scc.pais SET " + " pais_descricao=?, pais_sigla=?, pais_codigobacen=?"
				+ " WHERE pais_id =?";
		PreparedStatement ps = null;
		try {
			ps = this.connection.getConnection().prepareStatement(sql);
			ps.setString(1, pais.getDescricao());
			ps.setString(2, pais.getSigla());
			ps.setString(3, pais.getCodigoBacen());
			ps.setLong(4, pais.getId());

			ps.execute();
			this.connection.commit();
		} catch (SQLException ex) {
			this.connection.rollback();
			Logger.getLogger(PaisDAO.class.getName()).log(Level.SEVERE, null, ex);
			throw ex;
		} finally {
		}
	}

	public List<Pais> listar() throws SQLException, ClassNotFoundException {

		String sql = " SELECT * FROM scc.pais ";

		PreparedStatement ps = null;
		ResultSet resultSet = null;
		List<Pais> listaPaiss = new ArrayList<Pais>();
		try {
			ps = connection.getConnection().prepareStatement(sql);
			resultSet = ps.executeQuery();
			while (resultSet.next()) {
				Pais Pais = new Pais();
				Pais.setId(resultSet.getLong("pais_id"));
				Pais.setDescricao(resultSet.getString("pais_descricao"));
				Pais.setSigla(resultSet.getString("pais_sigla"));
				Pais.setCodigoBacen(resultSet.getString("pais_codigobacen"));

				listaPaiss.add(Pais);
			}
			return (List<Pais>) listaPaiss;
		} catch (SQLException e) {
			e.printStackTrace();
			throw e;
		}
	}

	public int excluir(long id) throws SQLException, ClassNotFoundException {

		int linhasAfetadas = 0;
		String sql = "delete from scc.pais where pais_id = ?";
		PreparedStatement ps = null;
		try {
			ps = connection.getConnection().prepareStatement(sql);
			ps.setLong(1, id);

			linhasAfetadas = ps.executeUpdate();
			this.connection.commit();
		} catch (SQLException ex) {
			this.connection.rollback();
			Logger.getLogger(PaisDAO.class.getName()).log(Level.SEVERE, null, ex);
			throw ex;
		}
		return linhasAfetadas;
	}

}
