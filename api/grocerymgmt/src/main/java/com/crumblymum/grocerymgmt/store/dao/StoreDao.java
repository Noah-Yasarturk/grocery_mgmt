package com.crumblymum.grocerymgmt.store.dao;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.crumblymum.grocerymgmt.store.Store;
import com.crumblymum.grocerymgmt.store.service.GroceryMgmtException;
import com.crumblymum.grocerymgmt.utils.DbAccessUtil;
import com.crumblymum.grocerymgmt.utils.DbConnectionException;

@Repository
public class StoreDao {

    private Connection getConnection() throws GroceryMgmtException {
        Connection conn = null; 
        try {
            conn = DbAccessUtil.getConnection();
        } catch (DbConnectionException e) {
            throw new GroceryMgmtException(e.getMessage());
        } 
        return conn;
    }

    /**
     * Insert a store to Store table
     * @param storeName
     * @param location
     * @return
     * @throws GroceryMgmtException
     */
    public String insertStore(String storeName, String location) throws GroceryMgmtException {
        // Create connection 
        Connection conn = getConnection();
        String message = "No store inserted.";
        try {
            Statement stmt = conn.createStatement();
            String sqlInsert = String.format("INSERT INTO `GROCERY_DEV`.`Store` " + //
                    " ( `STORE_NAME`, `LOCATION`, `CREATED_AT`, `UPDATED_AT`) " + //
                    " VALUES ( '%s', '%s', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);", storeName, location);
            System.out.println("Running SQL statement:");
            System.out.println(sqlInsert);
            stmt.execute(sqlInsert);
            conn.close();
            message = String.format("Store %s successfully created", storeName);
            System.out.println(message);
        } catch (SQLException e) {
            throw new GroceryMgmtException(String.format("Couldn't create store %s", storeName));
        }
        return message;
    }

    /**
     * Get all stores
     * @return list of stores
     * @throws GroceryMgmtException if connection error or SQL SELECT error 
     */
    public List<Store> selectAllStores() throws GroceryMgmtException{
        List<Store> storesList = new ArrayList<Store>();
        Connection conn = getConnection();
        try {
            Statement stmt = conn.createStatement();
            String sqlSelect = "SELECT * FROM `GROCERY_DEV`.`Store`";
            ResultSet results = stmt.executeQuery(sqlSelect);

            while(results.next()){
                String name = results.getObject(2).toString();
                String location = results.getObject(3).toString();
                Store pulledStore = new Store(name,location);
                storesList.add(pulledStore);
            }
        } catch (SQLException e) {
           
            throw new GroceryMgmtException(String.format("Couldn't retrieve full list of store due to this nested SQL Exception:\n" + e.getMessage()));
        }
        return storesList;
    }


}
