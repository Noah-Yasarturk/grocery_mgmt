package com.crumblymum.grocerymgmt.store.dao;

import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;

import org.springframework.stereotype.Repository;

import com.crumblymum.grocerymgmt.utils.DbAccessUtil;

@Repository
public class StoreDao {


    public String insertStore(String storeName, String location) throws SQLException {
        // Create connection 
        Connection conn = DbAccessUtil.getConnection();
        Statement stmt = conn.createStatement();
        String sqlInsert = String.format("INSERT INTO `GROCERY_DEV`.`Store` " + //
                " ( `STORE_NAME`, `LOCATION`, `CREATED_AT`, `UPDATED_AT`) " + //
                " VALUES ( '%s', '%s', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);", storeName, location);
        System.out.println("Runnning SQL statement:");
        System.out.println(sqlInsert);
        stmt.execute(sqlInsert);
        conn.close();
        String message = "Store succesfully created";
        System.out.println(message);
        return message;
    }


}
