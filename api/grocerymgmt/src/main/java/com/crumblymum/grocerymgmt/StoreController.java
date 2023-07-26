package com.crumblymum.grocerymgmt;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class StoreController {

    @GetMapping("/store")
	public String testStoreMapping() {
		return "The store endpoint works!";
	}
    
}
