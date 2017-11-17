package br.com.secretariadeobra.dao;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

import br.com.secretariadeobra.model.Municipio;
import br.com.secretariadeobra.model.Pais;
import br.com.secretariadeobra.model.Uf;
import br.com.secretariadeobra.util.ConexaoJDBC;
import br.com.secretariadeobra.util.ConexaoPostgresJDBC;

public class MunicipioDAO {

	private final ConexaoJDBC connection;

	public MunicipioDAO() throws SQLException, ClassNotFoundException {
		this.connection = new ConexaoPostgresJDBC();
	}

	public Long save(Municipio municipio) throws SQLException, ClassNotFoundException {

		Long id = null;

		String sql = " INSERT INTO scc.municipio "
				+ " (municipio_nome, municipio_codigomunicipal, municipio_ufid, municipio_paisid) "
				+ "	VALUES (?, ?, ?, ?) RETURNING municipio_id;";

		PreparedStatement ps = null;
		try {
			ps = this.connection.getConnection().prepareStatement(sql);
			ps.setString(1, municipio.getNome());
			ps.setString(2, municipio.getCodigoMunicipal());
			ps.setObject(3, municipio.getUf() != null ? municipio.getUf().getId() : null);
			ps.setObject(4, municipio.getPais() != null ? municipio.getPais().getId() : null);

			ResultSet rs = ps.executeQuery();
			if (rs.next()) {
				id = rs.getLong("municipio_id");
			}

			this.connection.commit();
		} catch (SQLException ex) {
			this.connection.rollback();
			Logger.getLogger(MunicipioDAO.class.getName()).log(Level.SEVERE, null, ex);
			throw ex;
		} finally {
		}
		return id;
	}

	public void update(Municipio municipio) throws SQLException {
		String sql = " UPDATE scc.municipio SET "
				+ " municipio_nome=?, municipio_codigomunicipal=?, municipio_ufid=?, municipio_paisid=?"
				+ " WHERE municipio_id =?";
		PreparedStatement ps = null;
		try {
			ps = this.connection.getConnection().prepareStatement(sql);
			ps.setString(1, municipio.getNome());
			ps.setString(2, municipio.getCodigoMunicipal());
			ps.setObject(3, municipio.getUf() != null ? municipio.getUf().getId() : null);
			ps.setObject(4, municipio.getPais() != null ? municipio.getPais().getId() : null);
			ps.setLong(5, municipio.getId());

			ps.execute();
			this.connection.commit();
		} catch (SQLException ex) {
			this.connection.rollback();
			Logger.getLogger(MunicipioDAO.class.getName()).log(Level.SEVERE, null, ex);
			throw ex;
		} finally {
		}
	}

	public List<Municipio> listar() throws SQLException, ClassNotFoundException {

		StringBuffer sql = new StringBuffer(" SELECT * FROM scc.municipio ");
		sql.append(" LEFT JOIN scc.uf on municipio_ufid = uf_id");
		sql.append(" LEFT JOIN scc.pais on municipio_paisid = pais_id ORDER BY municipio_nome");

		PreparedStatement ps = null;
		ResultSet resultSet = null;
		List<Municipio> listaMunicipio = new ArrayList<Municipio>();
		try {
			ps = connection.getConnection().prepareStatement(sql.toString());
			resultSet = ps.executeQuery();
			while (resultSet.next()) {
				Municipio municipio = new Municipio();
				municipio.setId(resultSet.getLong("municipio_id"));
				municipio.setNome(resultSet.getString("municipio_nome"));
				municipio.setCodigoMunicipal(resultSet.getString("municipio_codigomunicipal"));

				Uf uf = new Uf();
				uf.setId(resultSet.getLong("uf_id"));
				uf.setDescricao(resultSet.getString("uf_descricao"));
				uf.setSigla(resultSet.getString("uf_sigla"));
				uf.setCodigoIbge(resultSet.getString("uf_codigoibge"));
				municipio.setUf(uf);

				Pais pais = new Pais();
				pais.setId(resultSet.getLong("pais_id"));
				pais.setDescricao(resultSet.getString("pais_descricao"));
				pais.setSigla(resultSet.getString("pais_sigla"));
				pais.setCodigoBacen(resultSet.getString("pais_codigobacen"));
				municipio.setPais(pais);

				listaMunicipio.add(municipio);
			}
			return (List<Municipio>) listaMunicipio;
		} catch (SQLException e) {
			e.printStackTrace();
			throw e;
		}
	}

	public int excluir(long id) throws SQLException, ClassNotFoundException {

		int linhasAfetadas = 0;
		String sql = "delete from scc.municipio where municipio_id = ?";
		PreparedStatement ps = null;
		try {
			ps = connection.getConnection().prepareStatement(sql);
			ps.setLong(1, id);

			linhasAfetadas = ps.executeUpdate();
			this.connection.commit();
		} catch (SQLException ex) {
			this.connection.rollback();
			Logger.getLogger(MunicipioDAO.class.getName()).log(Level.SEVERE, null, ex);
			throw ex;
		}
		return linhasAfetadas;
	}

	public List<Municipio> filterByAllMunicipio(String nome) throws SQLException, ClassNotFoundException {

		StringBuffer sql = new StringBuffer(" SELECT * FROM scc.municipio ");
		sql.append(" LEFT JOIN scc.uf on municipio_ufid = uf_id");
		sql.append(" LEFT JOIN scc.pais on municipio_paisid = pais_id ");
		sql.append(" WHERE municipio_nome ILIKE '%").append(nome).append("%'").append(" ORDER BY municipio_nome");

		PreparedStatement ps = null;
		ResultSet resultSet = null;
		List<Municipio> listaMunicipio = new ArrayList<Municipio>();
		try {
			ps = connection.getConnection().prepareStatement(sql.toString());
			resultSet = ps.executeQuery();
			while (resultSet.next()) {
				Municipio municipio = new Municipio();
				municipio.setId(resultSet.getLong("municipio_id"));
				municipio.setNome(resultSet.getString("municipio_nome"));
				municipio.setCodigoMunicipal(resultSet.getString("municipio_codigomunicipal"));

				Uf uf = new Uf();
				uf.setId(resultSet.getLong("uf_id"));
				uf.setDescricao(resultSet.getString("uf_descricao"));
				uf.setSigla(resultSet.getString("uf_sigla"));
				uf.setCodigoIbge(resultSet.getString("uf_codigoibge"));
				municipio.setUf(uf);

				Pais pais = new Pais();
				pais.setId(resultSet.getLong("pais_id"));
				pais.setDescricao(resultSet.getString("pais_descricao"));
				pais.setSigla(resultSet.getString("pais_sigla"));
				pais.setCodigoBacen(resultSet.getString("pais_codigobacen"));
				municipio.setPais(pais);

				listaMunicipio.add(municipio);
			}
			return (List<Municipio>) listaMunicipio;
		} catch (SQLException e) {
			e.printStackTrace();
			throw e;
		}
	}

}
