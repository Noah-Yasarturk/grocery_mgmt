package com.crumblymum.grocerymgmt.store.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.crumblymum.grocerymgmt.store.Store;
import com.crumblymum.grocerymgmt.store.service.GroceryMgmtException;
import com.crumblymum.grocerymgmt.store.service.StoreService;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@RestController
public class StoreController {

	@Autowired
	private StoreService storeService; 

    @GetMapping("/store/")
	public String testStoreMapping() {
		return "The store endpoint works!";
	}

	@PostMapping("/store/add")
	public String postStore(@RequestBody Store newStore) throws GroceryMgmtException{
		System.out.println(newStore);
		String dbMessage = "Did not write anything to db";
		try {
			 dbMessage = this.storeService.writeStore(newStore);
		} catch(GroceryMgmtException e) {
			e.printStackTrace();
			// TODO: how to handle?
		}
		return dbMessage;

	}
	@GetMapping("/store/all")
	public List getAllStores (){
		List<Store> listOfStores = new ArrayList<Store>();
		System.out.println("retrieving all stores...");

		try {
			listOfStores = this.storeService.getAllStores();
		} catch(GroceryMgmtException e) {
			e.printStackTrace();
		}
		return listOfStores;
	}
    
}
