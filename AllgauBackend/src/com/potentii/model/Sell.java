package com.potentii.model;

public class Sell {
	private long id;
	private int quantity;
	private long idEmployeeFK;
	private long idProductFK;
	
	
	
	public Sell(long id, int quantity, long idEmployeeFK, long idProductFK) {
		super();
		this.id = id;
		this.quantity = quantity;
		this.idEmployeeFK = idEmployeeFK;
		this.idProductFK = idProductFK;
	}
	
	
	
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public int getQuantity() {
		return quantity;
	}
	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
	public long getIdEmployeeFK() {
		return idEmployeeFK;
	}
	public void setIdEmployeeFK(long idEmployeeFK) {
		this.idEmployeeFK = idEmployeeFK;
	}
	public long getIdProductFK() {
		return idProductFK;
	}
	public void setIdProductFK(long idProductFK) {
		this.idProductFK = idProductFK;
	}
}
