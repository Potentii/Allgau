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

/**
 * Servlet implementation class ProductRegistrationServlet
 */
@WebServlet("/productReg")
public class ProductRegistrationServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public ProductRegistrationServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		ProductRegistrationResponse productRegistrationResponse = null;
		
		String label = (String) request.getParameter("label");
		String description = (String) request.getParameter("description");
		Double price = Double.valueOf(request.getParameter("price"));
		Integer quantity = Integer.valueOf(request.getParameter("quantity"));
		
		
		if(label != null 
				&& description != null
				&& price != null
				&& quantity != null){
			
			Product product = new Product(0L, label, description, price, quantity);
			try {
				DAO<Product> dao = new ProductDAO(new ConnectionFactory().getConnection());
				long id = dao.create(product);
				product.setId(id);
				
				productRegistrationResponse = new ProductRegistrationResponse(product, "");
			} catch (ClassNotFoundException | SQLException e) {
				productRegistrationResponse = new ProductRegistrationResponse(null, e.getMessage());
			}
		} else{
			productRegistrationResponse = new ProductRegistrationResponse(null, "Invalid fields");
		}
		
		
		response.addHeader("Access-Control-Allow-Origin", "*");
	    response.setContentType("text/plain");
	    response.setCharacterEncoding("UTF-8");
	    
	    response.getWriter().write(new Gson().toJson(productRegistrationResponse, ProductRegistrationResponse.class));		
	}
	
	
	
	public class ProductRegistrationResponse{
		public Product product;
		public String error;
		
		public ProductRegistrationResponse(Product product, String error) {
			super();
			this.product = product;
			this.error = error;
		}		
	}

}
