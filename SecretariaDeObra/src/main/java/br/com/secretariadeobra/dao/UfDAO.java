package br.com.secretariadeobra.dao;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

import br.com.secretariadeobra.model.Uf;
import br.com.secretariadeobra.util.ConexaoJDBC;
import br.com.secretariadeobra.util.ConexaoPostgresJDBC;

public class UfDAO {

	private final ConexaoJDBC connection;

	public UfDAO() throws SQLException, ClassNotFoundException {
		this.connection = new ConexaoPostgresJDBC();
	}

	public Long save(Uf uf) throws SQLException, ClassNotFoundException {
		Long id = null;

		String sql = "INSERT INTO scc.uf (uf_descricao, uf_sigla, uf_codigoibge) VALUES (?, ?, ?) RETURNING uf_id;";
		PreparedStatement ps = null;
		try {
			ps = this.connection.getConnection().prepareStatement(sql);
			ps.setString(1, uf.getDescricao());
			ps.setString(2, uf.getSigla());
			ps.setString(3, uf.getCodigoIbge());

			ResultSet rs = ps.executeQuery();
			if (rs.next()) {
				id = rs.getLong("uf_id");
			}

			this.connection.commit();
		} catch (SQLException ex) {
			this.connection.rollback();
			Logger.getLogger(UfDAO.class.getName()).log(Level.SEVERE, null, ex);
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

	public void update(Uf uf) throws SQLException, ClassNotFoundException {
		String sql = "UPDATE scc.uf SET uf_descricao=?, uf_sigla=?, uf_codigoibge=? where uf_id =?";
		PreparedStatement ps = null;
		try {
			ps = this.connection.getConnection().prepareStatement(sql);
			ps.setString(1, uf.getDescricao());
			ps.setString(2, uf.getSigla());
			ps.setString(3, uf.getCodigoIbge());
			ps.setLong(4, uf.getId());
			ps.execute();

			this.connection.commit();
		} catch (SQLException ex) {
			this.connection.rollback();
			Logger.getLogger(UfDAO.class.getName()).log(Level.SEVERE, null, ex);
			throw ex;
		} finally {
			ps.close();
		}
	}

	public int excluir(long id) throws SQLException, ClassNotFoundException {
		int linhasAfetadas = 0;
		String sql = "delete from scc.uf where uf_id = ?";
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
			Logger.getLogger(UfDAO.class.getName()).log(Level.SEVERE, null, ex);
			throw ex;
		} finally {
			ps.close();
		}
		return linhasAfetadas;
	}

	public List<Uf> listar() throws SQLException, ClassNotFoundException {

		StringBuffer sql = new StringBuffer(" SELECT * FROM scc.uf ");

		PreparedStatement ps = null;
		ResultSet resultSet = null;
		List<Uf> listaUf = new ArrayList<Uf>();
		try {
			ps = connection.getConnection().prepareStatement(sql.toString());
			resultSet = ps.executeQuery();
			while (resultSet.next()) {

				Uf uf = new Uf();
				uf.setId(resultSet.getLong("uf_id"));
				uf.setDescricao(resultSet.getString("uf_descricao"));
				uf.setSigla(resultSet.getString("uf_sigla"));
				uf.setCodigoIbge(resultSet.getString("uf_codigoibge"));

				listaUf.add(uf);
			}
			return (List<Uf>) listaUf;
		} catch (SQLException e) {
			e.printStackTrace();
			throw e;
		}
	}

}
