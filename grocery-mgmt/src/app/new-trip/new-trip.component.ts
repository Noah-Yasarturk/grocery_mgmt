import { Component, OnInit } from '@angular/core';
import { GroceryStore } from '../models/grocery-store';
import { StoreService } from '../services/store.service';

@Component({
  selector: 'app-new-trip',
  templateUrl: './new-trip.component.html',
  styleUrls: ['./new-trip.component.scss'],
})
export class NewTripComponent implements OnInit {

  defStore = new GroceryStore(1, 'Publix', 'Buckhead Village'); // Default option
  selectedStore = this.defStore
  recentlyVisitedStores: GroceryStore[] = []
  receiptFileName = '';
  tripTotal: number = 0;
  mealQuery: string = ''; // TODO: implement 
  providedStoreName: string = ''
  providedStoreLocation: string = ''
  enableNewStoreEntryBox = false

  ngOnInit(): void {
    this.recentlyVisitedStores = this.storeService.getFiveRecentlyVisitedStores()
  }

  constructor(private storeService: StoreService) {}

  addAndUseNewStore() {
    this.selectedStore = this.storeService.createNewStore(this.providedStoreName, this.providedStoreLocation)
  }

  toggleNewStoreEntry() {
    console.log("toggleNewStoreEntry button clicked");
    this.enableNewStoreEntryBox = true
  }


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

}
