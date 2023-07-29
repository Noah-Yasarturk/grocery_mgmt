package com.crumblymum.grocerymgmt.store.service;

public class GroceryMgmtException extends Exception {

    private String exceptionClass;
	private String message;
	
	public GroceryMgmtException(String exceptionClass, String message) {
		this.exceptionClass = exceptionClass;
		this.message = message;
		
	}
	
	public GroceryMgmtException(String message) {
		this.message = message;
	}
	
	public String getMessage() {
		return this.message;
	}

    public String getExceptionClass() {
		return this.exceptionClass;
	}
}
