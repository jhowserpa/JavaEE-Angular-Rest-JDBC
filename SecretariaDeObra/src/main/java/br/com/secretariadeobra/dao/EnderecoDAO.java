package br.com.secretariadeobra.dao;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

import br.com.secretariadeobra.model.Endereco;
import br.com.secretariadeobra.model.Municipio;
import br.com.secretariadeobra.model.Pais;
import br.com.secretariadeobra.model.Uf;
import br.com.secretariadeobra.util.ConexaoJDBC;
import br.com.secretariadeobra.util.ConexaoPostgresJDBC;

public class EnderecoDAO {

	private final ConexaoJDBC connection;

	public EnderecoDAO() throws SQLException, ClassNotFoundException {
		this.connection = new ConexaoPostgresJDBC();
	}

	public Long save(Endereco endereco) throws SQLException, ClassNotFoundException {

		Long id = null;

		String sql = " INSERT INTO scc.endereco "
				+ " (endereco_endereco, endereco_numero, endereco_complemento, endereco_bairro, "
				+ " endereco_tipo, endereco_municipioid, endereco_cepid) "
				+ "	VALUES (?, ?, ?, ?, ?, ?, ?) RETURNING endereco_id;";

		PreparedStatement ps = null;
		try {
			ps = this.connection.getConnection().prepareStatement(sql);
			ps.setString(1, endereco.getEndereco());
			ps.setString(2, endereco.getNumero());
			ps.setString(3, endereco.getComplemento());
			ps.setString(4, endereco.getBairro());
			endereco.setTipoEndereco(1);
			ps.setInt(5, endereco.getTipoEndereco());
			ps.setObject(6, endereco.getMunicipio() != null ? endereco.getMunicipio().getId() : null);
			ps.setObject(7, endereco.getCep() != null ? endereco.getCep().getId() : null);

			ResultSet rs = ps.executeQuery();
			if (rs.next()) {
				id = rs.getLong("endereco_id");
			}

			this.connection.commit();
		} catch (SQLException ex) {
			this.connection.rollback();
			Logger.getLogger(EnderecoDAO.class.getName()).log(Level.SEVERE, null, ex);
			throw ex;
		} finally {
		}
		return id;
	}

	public void update(Endereco endereco) throws SQLException {
		String sql = "UPDATE scc.endereco SET "
				+ " endereco_endereco=?, endereco_numero=?, endereco_complemento=?, endereco_bairro=?, "
				+ " endereco_tipo=?, endereco_municipioid=?, endereco_cepid=? " + " WHERE endereco_id =?";
		PreparedStatement ps = null;
		try {
			ps = this.connection.getConnection().prepareStatement(sql);
			ps.setString(1, endereco.getEndereco());
			ps.setString(2, endereco.getNumero());
			ps.setString(3, endereco.getComplemento());
			ps.setString(4, endereco.getBairro());
			endereco.setTipoEndereco(1);
			ps.setInt(5, endereco.getTipoEndereco());
			ps.setObject(6, endereco.getMunicipio() != null ? endereco.getMunicipio().getId() : null);
			ps.setObject(7, endereco.getCep() != null ? endereco.getCep().getId() : null);
			ps.setLong(8, endereco.getId());

			ps.execute();
			this.connection.commit();
		} catch (SQLException ex) {
			this.connection.rollback();
			Logger.getLogger(EnderecoDAO.class.getName()).log(Level.SEVERE, null, ex);
			throw ex;
		} finally {
		}
	}

	public int excluir(long id) throws SQLException, ClassNotFoundException {

		int linhasAfetadas = 0;
		String sql = "delete from scc.negociante where negociante_id = ?";
		PreparedStatement ps = null;
		try {
			ps = connection.getConnection().prepareStatement(sql);
			ps.setLong(1, id);

			linhasAfetadas = ps.executeUpdate();
			this.connection.commit();
		} catch (SQLException ex) {
			this.connection.rollback();
			Logger.getLogger(EnderecoDAO.class.getName()).log(Level.SEVERE, null, ex);
			throw ex;
		}
		return linhasAfetadas;
	}

	public List<Endereco> findByEnderecoNegociantetId(Long id) {

		StringBuffer sql = new StringBuffer("select * from scc.endereco ");
		sql.append(" LEFT JOIN scc.negociante on endereco_negocianteid = negociante_id");
		sql.append(" LEFT JOIN scc.municipio on endereco_municipioid = municipio_id");
		sql.append(" LEFT JOIN scc.pais on municipio_paisid = pais_id");
		sql.append(" LEFT JOIN scc.uf on municipio_ufid = uf_id ").append(" WHERE endereco_negocianteid = ").append(id);

		PreparedStatement ps = null;
		ResultSet resultSet = null;
		List<Endereco> listaEndereco = new ArrayList<Endereco>();
		try {
			ps = connection.getConnection().prepareStatement(sql.toString());
			resultSet = ps.executeQuery();
			while (resultSet.next()) {
				Endereco endereco = new Endereco();

				endereco.setId(resultSet.getLong("endereco_id"));
				endereco.setEndereco(resultSet.getString("endereco_endereco"));
				endereco.setNumero(resultSet.getString("endereco_numero"));
				endereco.setComplemento(resultSet.getString("endereco_complemento"));
				endereco.setBairro(resultSet.getString("endereco_bairro"));

				Municipio municipio = new Municipio();
				municipio.setId(resultSet.getLong("municipio_id"));
				municipio.setNome(resultSet.getString("municipio_nome"));
				municipio.setCodigoMunicipal(resultSet.getString("municipio_codigomunicipal"));

				Uf uf = new Uf();
				uf.setId(resultSet.getLong("uf_id"));
				uf.setDescricao(resultSet.getString("uf_descricao"));
				uf.setSigla(resultSet.getString("uf_sigla"));
				uf.setCodigoIbge(resultSet.getString("uf_codigoibge"));

				Pais pais = new Pais();
				pais.setId(resultSet.getLong("pais_id"));
				pais.setDescricao(resultSet.getString("pais_descricao"));
				pais.setSigla(resultSet.getString("pais_sigla"));
				pais.setCodigoBacen(resultSet.getString("pais_codigobacen"));

				municipio.setPais(pais);
				endereco.setMunicipio(municipio);
				municipio.setUf(uf);
				listaEndereco.add(endereco);
			}
			return (List<Endereco>) listaEndereco;
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			try {
				ps.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		return null;
	}

	public List<Municipio> findByMunicipio() {

		StringBuffer sql = new StringBuffer("select * from scc.municipio ");

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

				listaMunicipio.add(municipio);
			}
			return (List<Municipio>) listaMunicipio;
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			// try {
			// ps.close();
			// } catch (SQLException e) {
			// e.printStackTrace();
			// }
		}
		return null;
	}

	public List<Municipio> findByUf(String uf) {

		StringBuffer sql = new StringBuffer("select * from scc.municipio ");
		sql.append(" LEFT JOIN scc.uf on municipio_ufid = uf_id ").append(" WHERE uf_sigla LIKE").append("'").append(uf)
				.append("'");

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

				Uf estado = new Uf();
				estado.setId(resultSet.getLong("uf_id"));
				estado.setDescricao(resultSet.getString("uf_descricao"));
				estado.setSigla(resultSet.getString("uf_sigla"));
				estado.setCodigoIbge(resultSet.getString("uf_codigoibge"));
				municipio.setUf(estado);

				listaMunicipio.add(municipio);
			}
			return (List<Municipio>) listaMunicipio;
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			// try {
			// ps.close();
			// } catch (SQLException e) {
			// e.printStackTrace();
			// }
		}
		return null;
	}

}
