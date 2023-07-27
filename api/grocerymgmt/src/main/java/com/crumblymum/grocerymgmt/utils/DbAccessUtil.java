package com.crumblymum.grocerymgmt.utils;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Properties;

public class DbAccessUtil {
    
    public static Connection getConnection() throws SQLException {

        Connection conn = null;
        Properties connectionProps = new Properties();
        connectionProps.put("user", DbConstants.USER);
        connectionProps.put("password", DbConstants.PW);

        conn = DriverManager.getConnection(
               DbConstants.JDBC_URL, connectionProps);
        System.out.println("Connected to database");
        return conn;
    }
        
}
