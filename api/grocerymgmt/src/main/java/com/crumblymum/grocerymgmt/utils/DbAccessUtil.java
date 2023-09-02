package com.crumblymum.grocerymgmt.utils;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Properties;

public class DbAccessUtil {
    
    /**
     * Connect to the database
     * @return java.sql.Connection
     * @throws DbConnectionException if unable to connect
     */
    public static Connection getConnection() throws DbConnectionException {
        Connection conn = null;
        Properties connectionProps = new Properties();
        connectionProps.put("user", DbConstants.USER);
        connectionProps.put("password", DbConstants.PW);
        try{
            conn = DriverManager.getConnection( DbConstants.JDBC_URL, connectionProps);
            System.out.println("Connected to database");
        } catch( SQLException e ) {
            e.printStackTrace();
            throw new DbConnectionException();
        }
        return conn;
    }
        
}
