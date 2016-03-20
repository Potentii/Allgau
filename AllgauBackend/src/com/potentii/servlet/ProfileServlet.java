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
import com.potentii.dao.EmployeeDAO;
import com.potentii.model.Employee;


@WebServlet("/profile")
public class ProfileServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    
    public ProfileServlet() {
        super();
    }

	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
	}

	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		ProfileResponse profileResponse = null;
		String login = request.getParameter("login");
		
		System.out.println("post request on /profile\nlogin: " + login);
		
		try {
			EmployeeDAO dao = new EmployeeDAO(new ConnectionFactory().getConnection());
			Employee employee = dao.retrieve_withLogin(login);
			
			profileResponse = new ProfileResponse(employee.getName(), "", employee.getLogin());
			
		} catch (ClassNotFoundException | SQLException e) {
			e.printStackTrace();
		}
		
		response.addHeader("Access-Control-Allow-Origin", "*");
	    response.setContentType("text/plain");
	    response.setCharacterEncoding("UTF-8");
	    
	    response.getWriter().write(new Gson().toJson(profileResponse, ProfileResponse.class));
	
	}
	
	
	public class ProfileResponse{
		public String name;
		public String img;
		public String login;
		
		public ProfileResponse(String name, String img, String login) {
			super();
			this.name = name;
			this.img = img;
			this.login = login;
		}
	}

}
