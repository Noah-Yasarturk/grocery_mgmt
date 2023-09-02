package com.crumblymum.grocerymgmt.store.dao;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.crumblymum.grocerymgmt.store.Store;
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
        System.out.println("Running SQL statement:");
        System.out.println(sqlInsert);
        stmt.execute(sqlInsert);
        conn.close();
        String message = "Store successfully created";
        System.out.println(message);
        return message;
    }

    public List<Store> selectAllStores() throws SQLException{
        List<Store> storesList = new ArrayList<Store>();
        Connection conn = DbAccessUtil.getConnection();
        Statement stmt = conn.createStatement();

        String sqlSelect = "SELECT * FROM `GROCERY_DEV`.`Store`";
        ResultSet results = stmt.executeQuery(sqlSelect);

        while(results.next()){
            String name = results.getObject(2).toString();
            String location = results.getObject(3).toString();
            Store pulledStore = new Store(name,location);
            storesList.add(pulledStore);
        }

        return storesList;
    }


}
