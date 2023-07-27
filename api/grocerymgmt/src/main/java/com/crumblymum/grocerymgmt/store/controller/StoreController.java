package com.crumblymum.grocerymgmt.store.controller;

import java.sql.SQLException;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.crumblymum.grocerymgmt.utils.DbAccessUtil;

@RestController
public class StoreController {

    @GetMapping("/store/")
	public String testStoreMapping() throws SQLException{
		try {
			DbAccessUtil.getConnection();
		} catch(SQLException e) {
			System.out.println("Couldn't connect to db. ");
			throw new SQLException(e);
		}
		return "The store endpoint works!";
	}
    
}
