package com.potentii.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.potentii.model.Product;

public class ProductDAO implements DAO<Product>{
	private Connection conn;
	
	
	
	public ProductDAO(Connection conn) {
		super();
		this.conn = conn;
	}
	

	@Override
	public long create(Product entity) throws SQLException {
		final String sql = "insert into product(label_product, description_product, price_product, quantity_product) values(?, ?, ?, ?)";
		
		PreparedStatement stmt = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
		
		stmt.setString(1, entity.getLabel());
		stmt.setString(2, entity.getDescription());
		stmt.setDouble(3, entity.getPrice());
		stmt.setInt(4, entity.getQuantity());
		if(stmt.executeUpdate() == 0) {
            throw new SQLException("Insert failed, no rows affected");
        }
		return stmt.getGeneratedKeys().getLong("id_product");
	}

	
	@Override
	public Product retrieve(long id) throws SQLException {
		final String sql = "select * from product where id_product = " + id + "";
		
		Statement stmt = conn.createStatement();
		ResultSet rSet = stmt.executeQuery(sql);
		
		if(rSet.next()){
			return new Product(
					rSet.getLong("id_product"), 
					rSet.getString("label_product"), 
					rSet.getString("description_product"),
					rSet.getDouble("price_product"),
					rSet.getInt("quantity_product"));
		}
		return null;
	}
	

	@Override
	public List<Product> retrieveAll() throws SQLException {
		final String sql = "select * from product";

		List<Product> entityList = new ArrayList<>();
		
		Statement stmt = conn.createStatement();
		ResultSet rSet = stmt.executeQuery(sql);
		
		while(rSet.next()){
			entityList.add(new Product(
							rSet.getLong("id_product"), 
							rSet.getString("label_product"), 
							rSet.getString("description_product"),
							rSet.getDouble("price_product"),
							rSet.getInt("quantity_product")));
		}
		
		return entityList;
	}
	
	
	
	

}
