package br.com.secretariadeobra.util;

import java.sql.Connection;
import java.sql.SQLException;

public interface ConexaoJDBC {

	public Connection getConnection();

	public void close();

	public void commit() throws SQLException;

	public void rollback();
}
