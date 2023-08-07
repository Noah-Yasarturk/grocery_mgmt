package com.crumblymum.grocerymgmt.store;
import javax.persistence.Entity;


@Entity
public class Store {

    private String storeName;
    private String location; 

    public Store() {}
    
    public Store(String storeName, String location) {
        this.storeName = storeName;
        this.location = location;
    }

    public String getStoreName() {
        return this.storeName;
    }

    public void setStoreName(String storeName) {
        this.storeName = storeName;
    }

     public String getLocation() {
        return this.location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    @Override
    public String toString(){
        return "This is a " + this.storeName + " Store is located at " + this.location;
    }

}
