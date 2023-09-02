package com.crumblymum.grocerymgmt.store.service;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.crumblymum.grocerymgmt.store.Store;
import com.crumblymum.grocerymgmt.store.dao.StoreDao;

@Service
public class StoreService {

    @Autowired
    private StoreDao storeDao;


    public String writeStore( Store store) throws GroceryMgmtException {
        // Insert business logic 
        // TODO: confirm store does not yet exist at this location
        String dbMessage = "Could not write Store";
        try {
             dbMessage = this.storeDao.insertStore(store.getStoreName(), store.getLocation());
        } catch(SQLException e) {
            e.printStackTrace();
            throw new GroceryMgmtException(e.getClass().toGenericString(), dbMessage);
        }
        return dbMessage;
    }

    public List<Store> getAllStores() throws GroceryMgmtException{
        List<Store> stores = new ArrayList<Store>();
        try {
            stores = this.storeDao.selectAllStores();
        } catch(SQLException e) {
            e.printStackTrace();
            throw new GroceryMgmtException(e.getClass().toGenericString(), "couldn't get stores");
        }
        return stores;
    }
    
}
