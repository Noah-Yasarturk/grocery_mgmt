import { Injectable } from '@angular/core';
import { GroceryStore } from '../models/grocery-store';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor() { }


  getFiveRecentlyVisitedStores(): GroceryStore[]  {
    // TODO: implement on the backend
    const dummyData: GroceryStore[] = [
      new GroceryStore(1, 'Publix', 'Buckhead'),
      new GroceryStore(2, 'Kroger', 'Lindbergh'),
      new GroceryStore(3, 'Trader Joe\'s', 'Buckhead'),
      new GroceryStore(4, 'Walmart', 'Decatur'),
      new GroceryStore(4, 'World Market', 'Lindbergh')
    ]
    return dummyData;
  }

  createNewStore(storeName: string, storeLocation: string): GroceryStore {
    let dummyStoreId = 10; // TODO: implement on the backed & get ID of store back - https://stackoverflow.com/questions/6761403/how-to-get-the-next-auto-increment-id-in-mysql 
    let newStore = new GroceryStore(dummyStoreId, storeName, storeLocation)
    return newStore;
  }
}
