import { Component, OnInit } from '@angular/core';
import { GroceryStore } from '../grocery-store';

@Component({
  selector: 'app-new-trip',
  templateUrl: './new-trip.component.html',
  styleUrls: ['./new-trip.component.scss'],
})
export class NewTripComponent implements OnInit {
  
  ngOnInit(): void {
    this.getStores()
  }


  // Store dropdown
  defStore = new GroceryStore(1, 'Publix', 'Buckhead Village'); // Default option
  selectedStore = this.defStore
  stores: GroceryStore[] = []
  /**
   * Populate the dropdown from the stored grocery stores
   */
  getStores() {
     // TODO: implement
     var s2 = new GroceryStore(2, 'Kroger', 'Lindbergh')
     var s3 = new GroceryStore(3, 'Trader Joe\'s', 'Buckhead Village')
     this.stores = [ this.defStore, s2, s3 ]
  }


  // Receipt file upload
  receiptFileName = '';

  /**
   * TODO: implement
   * @param event 
   */
  receiptFileSelected(event: any) {
    // From https://blog.angular-university.io/angular-file-upload/
    // TODO: filter on valid file types
    const file:File = event.target.files[0];
    if (file) {
        this.receiptFileName = file.name;
        const formData = new FormData();
        formData.append("thumbnail", file);
    }
  }


  // Trip total 
  tripTotal: number = 0; // TODO: implement 


  // Adding meals
  mealQuery: string = ''; // TODO: implement 

}
