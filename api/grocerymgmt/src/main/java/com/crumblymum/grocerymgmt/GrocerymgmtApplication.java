package com.crumblymum.grocerymgmt;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class })
public class GrocerymgmtApplication {

	public static void main(String[] args) {
		SpringApplication.run(GrocerymgmtApplication.class, args);
	}

}
