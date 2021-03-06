package com.potentii.servlet;

import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.potentii.controller.ConnectionFactory;
import com.potentii.dao.DAO;
import com.potentii.dao.ProductDAO;
import com.potentii.model.Product;


@WebServlet("/productList")
public class ProductListServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    
    public ProductListServlet() {
        super();
    }

	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
	}

	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		List<Product> entityList = new ArrayList<>();
		
		System.out.println("post request on /productList");
		
		
		try {
			DAO<Product> dao = new ProductDAO(new ConnectionFactory().getConnection());
			entityList = dao.retrieveAll();
			
		} catch (ClassNotFoundException | SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		

		response.addHeader("Access-Control-Allow-Origin", "*");
	    response.setContentType("text/plain");
	    response.setCharacterEncoding("UTF-8");
	    
	    response.getWriter().write(new Gson().toJson(entityList, ArrayList.class));
	}

}
