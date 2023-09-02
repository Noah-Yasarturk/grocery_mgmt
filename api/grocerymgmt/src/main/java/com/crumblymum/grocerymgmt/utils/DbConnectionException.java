package com.crumblymum.grocerymgmt.utils;

public class DbConnectionException extends Exception {
    
    private String message;

    public DbConnectionException() {
        this.message = "Couldn't connect to host.";
    }

    @Override
    public String getMessage() { 
        return this.message;
    }
}
