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



@WebServlet("/login")
public class LoginServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       

    public LoginServlet() {
        super();
    }

    
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
	}


	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		LoginResponse loginResponse = null;
		
		String login = (String) request.getParameter("login");
		String password = (String) request.getParameter("password");
		
		System.out.println("post request on /login\nlogin: " + login + "\npassword: " + password);
		
		
		try {
			EmployeeDAO employeeDAO = new EmployeeDAO(new ConnectionFactory().getConnection());
			
			if(employeeDAO.authenticate(login, password)){
				Employee employee = employeeDAO.retrieve_withLogin(login);
				
				loginResponse = new LoginResponse(employee.getName(), employee.getLogin());
			} else{
				loginResponse = new LoginResponse("Incorrect user or password");
			}
		} catch (ClassNotFoundException | SQLException e) {
			e.printStackTrace();
			loginResponse = new LoginResponse(e.getMessage());
		}
		
		
		response.addHeader("Access-Control-Allow-Origin", "*");
	    response.setContentType("text/plain");
	    response.setCharacterEncoding("UTF-8");
	    response.getWriter().write(new Gson().toJson(loginResponse, LoginResponse.class));
	}

	
	
	public class LoginResponse{
		public boolean auth;
		public String name;
		public String login;
		public String err;
		
		public LoginResponse(String name, String login) {
			super();
			this.auth = true;
			this.name = name;
			this.login = login;
		}
		
		public LoginResponse(String err) {
			super();
			this.auth = false;
			this.err = err;
		}
	}
}
