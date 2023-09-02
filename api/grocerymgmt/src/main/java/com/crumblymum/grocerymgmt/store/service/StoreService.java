package com.crumblymum.grocerymgmt.store.service;

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
        } catch(GroceryMgmtException e) {
            throw new GroceryMgmtException(e.getClass().toGenericString(), dbMessage);
        }
        return dbMessage;
    }

    /**
     * Get full list of stores
     * @return
     * @throws GroceryMgmtException
     */
    public List<Store> getAllStores() throws GroceryMgmtException{
        List<Store> stores = new ArrayList<Store>();
        try {
            stores = this.storeDao.selectAllStores();
        } catch(GroceryMgmtException e) {
            throw new GroceryMgmtException(e.getClass().toGenericString(), "Couldn't get stores using Service due to:\n" + e.getMessage());
        }
        return stores;
    }
    
}
