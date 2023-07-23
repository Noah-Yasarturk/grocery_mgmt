import { Component, OnInit } from '@angular/core';
import { GroceryStore } from '../grocery-store';

@Component({
  selector: 'app-new-trip',
  templateUrl: './new-trip.component.html',
  styleUrls: ['./new-trip.component.scss'],
})
export class NewTripComponent implements OnInit {

  defStore = new GroceryStore(1, 'Publix', 'Buckhead Village'); // Default option
  stores: GroceryStore[] = []
  selectedStore = this.defStore

  ngOnInit(): void {
    // TODO: Pull the top Grocery store options 
    var s2 = new GroceryStore(2, 'Kroger', 'Lindbergh')
    var s3 = new GroceryStore(3, 'Trader Joe\'s', 'Buckhead Village')


    this.stores = [
      this.defStore,
      s2,
      s3
    ]
  }

  fileName = '';

  onFileSelected(event: any) {
    // From https://blog.angular-university.io/angular-file-upload/
    // TODO: filter on valid file types
    const file:File = event.target.files[0];
    if (file) {
        this.fileName = file.name;
        const formData = new FormData();
        formData.append("thumbnail", file);
    }
  }
}
