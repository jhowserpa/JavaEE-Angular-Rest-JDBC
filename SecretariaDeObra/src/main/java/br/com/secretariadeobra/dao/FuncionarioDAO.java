package br.com.secretariadeobra.dao;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

import br.com.secretariadeobra.model.Funcionario;
import br.com.secretariadeobra.util.ConexaoJDBC;
import br.com.secretariadeobra.util.ConexaoPostgresJDBC;

public class FuncionarioDAO {

	private final ConexaoJDBC connection;

	public FuncionarioDAO() throws SQLException, ClassNotFoundException {
		this.connection = new ConexaoPostgresJDBC();
	}

	public Long save(Funcionario funcionario) throws SQLException, ClassNotFoundException {
		Long id = null;

		String sql = "INSERT INTO scc.funcionario (funcionario_codigo, funcionario_nome, funcionario_celular, funcionario_cpf) VALUES (?, ?, ?, ?) RETURNING funcionario_id;";
		PreparedStatement ps = null;
		try {
			ps = this.connection.getConnection().prepareStatement(sql);
			ps.setString(1, funcionario.getCodigo());
			ps.setString(2, funcionario.getNome());
			ps.setString(3, funcionario.getCelular());
			ps.setString(4, funcionario.getCpf());

			ResultSet rs = ps.executeQuery();
			if (rs.next()) {
				id = rs.getLong("funcionario_id");
			}

			this.connection.commit();
		} catch (SQLException ex) {
			this.connection.rollback();
			Logger.getLogger(FuncionarioDAO.class.getName()).log(Level.SEVERE, null, ex);
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

	public void update(Funcionario funcionario) throws SQLException, ClassNotFoundException {
		String sql = "UPDATE scc.funcionario SET funcionario_codigo=?, funcionario_nome=?, funcionario_celular=?, funcionario_cpf=? "
				+ " where funcionario_id =?";
		PreparedStatement ps = null;
		try {
			ps = this.connection.getConnection().prepareStatement(sql);
			ps.setString(1, funcionario.getCodigo());
			ps.setString(2, funcionario.getNome());
			ps.setString(3, funcionario.getCelular());
			ps.setString(4, funcionario.getCpf());
			ps.setLong(5, funcionario.getId());
			ps.execute();

			this.connection.commit();
		} catch (SQLException ex) {
			this.connection.rollback();
			Logger.getLogger(FuncionarioDAO.class.getName()).log(Level.SEVERE, null, ex);
			throw ex;
		} finally {
			ps.close();
		}
	}

	public int excluir(long id) throws SQLException, ClassNotFoundException {
		int linhasAfetadas = 0;
		String sql = "delete from scc.funcionario where funcionario_id = ?";
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
			Logger.getLogger(FuncionarioDAO.class.getName()).log(Level.SEVERE, null, ex);
			throw ex;
		} finally {
			ps.close();
		}
		return linhasAfetadas;
	}

	public List<Funcionario> listar() throws SQLException, ClassNotFoundException {

		StringBuffer sql = new StringBuffer(" SELECT * FROM scc.funcionario ");

		PreparedStatement ps = null;
		ResultSet resultSet = null;
		List<Funcionario> listaFuncionario = new ArrayList<Funcionario>();
		try {
			ps = connection.getConnection().prepareStatement(sql.toString());
			resultSet = ps.executeQuery();
			while (resultSet.next()) {

				Funcionario funcionario = new Funcionario();
				funcionario.setId(resultSet.getLong("funcionario_id"));
				funcionario.setCodigo(resultSet.getString("funcionario_matricula"));
				funcionario.setNome(resultSet.getString("funcionario_nome"));
				funcionario.setCpf(resultSet.getString("funcionario_cpf"));
				funcionario.setCelular(resultSet.getString("funcionario_celular"));

				listaFuncionario.add(funcionario);
			}
			return (List<Funcionario>) listaFuncionario;
		} catch (SQLException e) {
			e.printStackTrace();
			throw e;
		}
	}

}
