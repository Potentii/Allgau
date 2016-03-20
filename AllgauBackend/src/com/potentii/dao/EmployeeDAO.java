package com.potentii.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.potentii.model.Employee;

public class EmployeeDAO implements DAO<Employee> {
	private Connection conn;
	
	
	
	public EmployeeDAO(Connection conn) {
		super();
		this.conn = conn;
	}

	
	
	@Override
	public long create(Employee entity) throws SQLException {
		final String sql = "insert into employee(name_employee, login_employee, password_employee) values(?, ?, ?)";
		
		PreparedStatement stmt = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
		
		stmt.setString(1, entity.getName());
		stmt.setString(2, entity.getLogin());
		stmt.setString(3, entity.getPassword());
		if(stmt.executeUpdate() == 0) {
            throw new SQLException("Insert failed, no rows affected");
        }
		return stmt.getGeneratedKeys().getLong("id_employee");
	}
	

	@Override
	public Employee retrieve(long id) throws SQLException{
		final String sql = "select * from employee where id_employee = " + id + "";
		
		Statement stmt = conn.createStatement();
		ResultSet rSet = stmt.executeQuery(sql);
		
		if(rSet.next()){
			return new Employee(
					rSet.getLong("id_employee"), 
					rSet.getString("name_employee"), 
					rSet.getString("login_employee"),
					rSet.getString("password_employee"));
		}
		return null;
	}
	
	
	
	@Override
	public List<Employee> retrieveAll() throws SQLException{
		final String sql = "select * from employee";

		List<Employee> entityList = new ArrayList<>();
		
		Statement stmt = conn.createStatement();
		ResultSet rSet = stmt.executeQuery(sql);
		
		while(rSet.next()){
			entityList.add(new Employee(
							rSet.getLong("id_employee"), 
							rSet.getString("name_employee"), 
							rSet.getString("login_employee"),
							rSet.getString("password_employee")));
		}
		
		return entityList;
	}
	
	
	public boolean authenticate(String login, String password) throws SQLException {
		if(login == null || password == null){
			return false;
		}
		final String sql = "select login_employee, password_employee from employee where login_employee = '" + login + "'";
		
		Statement stmt = conn.createStatement();
		ResultSet rSet = stmt.executeQuery(sql);
		
		if(rSet.next()){
			return login.equals(rSet.getString("login_employee")) && password.equals(rSet.getString("password_employee"));
		} else{
			return false;
		}
	}
	
	
	public Employee retrieve_withLogin(String login) throws SQLException{
		if(login == null){
			return null;
		}
		final String sql = "select * from employee where login_employee = '" + login + "'";
		
		Statement stmt = conn.createStatement();
		ResultSet rSet = stmt.executeQuery(sql);
		
		if(rSet.next()){
			return new Employee(
					rSet.getLong("id_employee"), 
					rSet.getString("name_employee"), 
					rSet.getString("login_employee"), 
					rSet.getString("password_employee"));
		} else{
			return null;
		}
	}
	
}
