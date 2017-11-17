package br.com.secretariadeobra.dao;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

import br.com.secretariadeobra.model.Carro;
import br.com.secretariadeobra.util.ConexaoJDBC;
import br.com.secretariadeobra.util.ConexaoPostgresJDBC;

public class CarroDAO {

	private final ConexaoJDBC connection;

	public CarroDAO() throws SQLException, ClassNotFoundException {
		this.connection = new ConexaoPostgresJDBC();
	}

	public Long save(Carro carro) throws SQLException, ClassNotFoundException {
		Long id = null;

		String sql = "INSERT INTO scc.Carro (carro_nome, carro_modelo, carro_placa) VALUES (?, ?, ?) RETURNING carro_id;";
		PreparedStatement ps = null;
		try {
			ps = this.connection.getConnection().prepareStatement(sql);
			ps.setString(1, carro.getNome());
			ps.setString(2, carro.getModelo());
			ps.setString(3, carro.getPlaca());

			ResultSet rs = ps.executeQuery();
			if (rs.next()) {
				id = rs.getLong("carro_id");
			}

			this.connection.commit();
		} catch (SQLException ex) {
			this.connection.rollback();
			Logger.getLogger(CarroDAO.class.getName()).log(Level.SEVERE, null, ex);
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

	public void update(Carro carro) throws SQLException, ClassNotFoundException {
		String sql = "UPDATE scc.carro SET carro_nome=?, carro_modelo=?, carro_placa=? where carro_id =?";
		PreparedStatement ps = null;
		try {
			ps = this.connection.getConnection().prepareStatement(sql);
			ps.setString(1, carro.getNome());
			ps.setString(2, carro.getModelo());
			ps.setString(3, carro.getPlaca());
			ps.setLong(4, carro.getId());
			ps.execute();

			this.connection.commit();
		} catch (SQLException ex) {
			this.connection.rollback();
			Logger.getLogger(CarroDAO.class.getName()).log(Level.SEVERE, null, ex);
			throw ex;
		} finally {
			ps.close();
		}
	}

	public int excluir(long id) throws SQLException, ClassNotFoundException {
		int linhasAfetadas = 0;
		String sql = "delete from scc.carro where carro_id = ?";
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
			Logger.getLogger(CarroDAO.class.getName()).log(Level.SEVERE, null, ex);
			throw ex;
		} finally {
			ps.close();
		}
		return linhasAfetadas;
	}

	public List<Carro> listar() throws SQLException, ClassNotFoundException {

		StringBuffer sql = new StringBuffer(" SELECT * FROM scc.carro ORDER BY carro_id OFFSET 1;");

		PreparedStatement ps = null;
		ResultSet resultSet = null;
		List<Carro> listaCarro = new ArrayList<Carro>();
		try {
			ps = connection.getConnection().prepareStatement(sql.toString());
			resultSet = ps.executeQuery();
			while (resultSet.next()) {

				Carro carro = new Carro();
				carro.setId(resultSet.getLong("carro_id"));
				carro.setNome(resultSet.getString("carro_nome"));
				carro.setModelo(resultSet.getString("carro_modelo"));
				carro.setPlaca(resultSet.getString("carro_placa"));

				listaCarro.add(carro);
			}
			return (List<Carro>) listaCarro;
		} catch (SQLException e) {
			e.printStackTrace();
			throw e;
		}
	}

	public List<Carro> listarAll() throws SQLException, ClassNotFoundException {
		
		StringBuffer sql = new StringBuffer(" SELECT * FROM scc.carro ORDER BY carro_id;");
		
		PreparedStatement ps = null;
		ResultSet resultSet = null;
		List<Carro> listaCarro = new ArrayList<Carro>();
		try {
			ps = connection.getConnection().prepareStatement(sql.toString());
			resultSet = ps.executeQuery();
			while (resultSet.next()) {
				
				Carro carro = new Carro();
				carro.setId(resultSet.getLong("carro_id"));
				carro.setNome(resultSet.getString("carro_nome"));
				carro.setModelo(resultSet.getString("carro_modelo"));
				carro.setPlaca(resultSet.getString("carro_placa"));
				
				listaCarro.add(carro);
			}
			return (List<Carro>) listaCarro;
		} catch (SQLException e) {
			e.printStackTrace();
			throw e;
		}
	}

}
