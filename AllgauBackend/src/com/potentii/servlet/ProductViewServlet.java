package com.potentii.servlet;

import java.io.IOException;
import java.sql.SQLException;

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


@WebServlet("/productView")
public class ProductViewServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       

    public ProductViewServlet() {
        super();
    }


	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	
	}

	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		Product entity = null;
		Long id = Long.valueOf(request.getParameter("id"));
		
		System.out.println("post request on /productView\nid: " + id);
		
		
		try {
			DAO<Product> dao = new ProductDAO(new ConnectionFactory().getConnection());
			entity = dao.retrieve(id);
			
		} catch (ClassNotFoundException | SQLException e) {
			e.printStackTrace();
		}
		

		response.addHeader("Access-Control-Allow-Origin", "*");
	    response.setContentType("text/plain");
	    response.setCharacterEncoding("UTF-8");
	    
	    response.getWriter().write(new Gson().toJson(entity, Product.class));
	}
}
