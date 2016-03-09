package com.potentii.dao;

import java.sql.SQLException;
import java.util.List;
import com.potentii.util.ResponseCallback;

public interface DAO<T> {
	long create(T entity) throws SQLException;
	T retrieve(long id) throws SQLException;
	List<T> retrieveAll() throws SQLException;
	
}
