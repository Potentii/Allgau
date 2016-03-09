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
		LoginResponse loginResponse = new LoginResponse();
		
		String login = (String) request.getParameter("login");
		String password = (String) request.getParameter("password");
		
		System.out.println("\nLogin: " + login + "\nPass: " + password);
		
		try {
			EmployeeDAO employeeDAO = new EmployeeDAO(new ConnectionFactory().getConnection());
			
			if(employeeDAO.authenticate(login, password)){
				Employee employee = employeeDAO.getEmployeeByLogin(login);
				
				loginResponse.setAuth(true);
				loginResponse.setName(employee.getName());
			} else{
				loginResponse.setAuth(false);
				loginResponse.setErr("Incorrect user or password");
			}
		} catch (ClassNotFoundException | SQLException e) {
			e.printStackTrace();
			loginResponse.setAuth(false);
			loginResponse.setErr(e.getMessage());
		}
		
		
		
		response.addHeader("Access-Control-Allow-Origin", "*");
	    response.setContentType("text/plain");
	    response.setCharacterEncoding("UTF-8");
	    
	    response.getWriter().write(new Gson().toJson(loginResponse, LoginResponse.class));
	}

	
	
	private class LoginResponse{
		private boolean auth;
		private String name;
		private String err;
		
		
		public boolean isAuth() {
			return auth;
		}
		public void setAuth(boolean auth) {
			this.auth = auth;
		}
		public String getName() {
			return name;
		}
		public void setName(String name) {
			this.name = name;
		}
		public String getErr() {
			return err;
		}
		public void setErr(String err) {
			this.err = err;
		}
	}
}
