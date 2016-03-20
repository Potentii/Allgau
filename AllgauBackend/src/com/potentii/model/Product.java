package com.potentii.model;

public class Product {
	private long id;
	private String label;
	private String description;
	private double price;
	private int quantity;
	// TODO add date
	
	
	
	public Product(long id, String label, String description, double price, int quantity) {
		super();
		this.id = id;
		this.label = label;
		this.description = description;
		this.price = price;
		this.quantity = quantity;
	}
	
	
	
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getLabel() {
		return label;
	}
	public void setLabel(String label) {
		this.label = label;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public double getPrice() {
		return price;
	}
	public void setPrice(double price) {
		this.price = price;
	}
	public int getQuantity() {
		return quantity;
	}
	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
}
