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

import org.json.JSONArray;

import com.google.gson.Gson;
import com.potentii.controller.ConnectionFactory;
import com.potentii.dao.DAO;
import com.potentii.dao.ProductDAO;
import com.potentii.model.Product;

/**
 * Servlet implementation class CartViewServlet
 */
@WebServlet("/cartView")
public class CartViewServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       

    public CartViewServlet() {
        super();
        // TODO Auto-generated constructor stub
    }


	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	}


	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		List<Product> entityList = new ArrayList<>();
		
		String idArray_str = request.getParameter("idArray");
		

		System.out.println("post request on /cartView\nidArray: " + idArray_str);
		
		
		JSONArray idJSONArray = new JSONArray(idArray_str);
		
		
		try {
			DAO<Product> dao = new ProductDAO(new ConnectionFactory().getConnection());
			
			for(int i=0; i<idJSONArray.length(); i++){
				entityList.add(dao.retrieve(idJSONArray.getLong(i)));
			}
			
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
