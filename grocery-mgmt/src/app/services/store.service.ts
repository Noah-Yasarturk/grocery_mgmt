import { Injectable } from '@angular/core';
import { GroceryStore } from '../models/grocery-store';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private httpClient: HttpClient) { }


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

  /**
   * Pass form data and create GroceryStore.
   * 
   * @param selectedStore A GroceryStore without a storeId
   * @returns The storeId generated // TODO: error if store already exists??
   */
  createNewStore(selectedStore: GroceryStore): number {
    const newStoreEndpoint: string = '/store/add'
    let endpoint = environment.baseUrl + newStoreEndpoint
    let data = {
      "storeName": selectedStore.storeBrand,
      "location": selectedStore.storeLocation
    }
    console.log("Posting to endpoint ", endpoint, " with data ", data);
    let storeGeneratedId = 10 // TODO: implement on the backed & get ID of store back - https://stackoverflow.com/questions/6761403/how-to-get-the-next-auto-increment-id-in-mysql 
    // this.httpClient.post(endpoint, data).subscribe(resp => {
    //   console.log("Response: ", resp);
    //   storeGeneratedId = resp.storeId;
    // }) 
    console.log("Store created with ID ", storeGeneratedId);
    return storeGeneratedId
  }
}
