import { Component, Inject, OnInit } from '@angular/core';
import { GroceryStore } from '../models/grocery-store';
import { StoreService } from '../services/store.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-new-trip',
  templateUrl: './new-trip.component.html',
  styleUrls: ['./new-trip.component.scss'],
})
export class NewTripComponent implements OnInit {

  selectedStore: GroceryStore  = new GroceryStore(-1,'','')
  recentlyVisitedStores: GroceryStore[] = []
  receiptFileName = ''
  tripTotal: number = 0;
  mealQuery: string = '' // TODO: implement 
  showProvidedStoreBrand: boolean = false

  ngOnInit(): void {
    this.recentlyVisitedStores = this.storeService.getFiveRecentlyVisitedStores()
  }
  
  constructor(private storeService: StoreService,  public dialog: MatDialog) { }

  openNewStoreDialog() {
    // Open it
    const dialogRef = this.dialog.open(NewStoreDialog, {
      data: {
        storeName: 'dummyVal', 
        storeLocation: 'dummyVal'
      },
    });
    // Close it
    dialogRef.afterClosed().subscribe(result  => {
      console.log("result ", result );
      if (result['storeBrand']) {
        this.selectedStore = new GroceryStore(-1, result['storeBrand'], result['storeLocation'])
      } else {
        console.log("Dialog closed without data processing");
        this.showProvidedStoreBrand = false
      }
    });
    
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

import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'new-store-dialog',
  templateUrl: 'new-store-dialog.html',
  standalone: true,
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule],
})
export class NewStoreDialog {

  dialogGroceryStore: GroceryStore = new GroceryStore(-1, '', '')

  constructor(
    public newStoreDialog: MatDialogRef<NewStoreDialog>,
    @Inject(MAT_DIALOG_DATA) public data: GroceryStore,
  ) {}

  backOutOfNewStoreDialog(action: string): void {
    console.log(action);
    this.newStoreDialog.close(action);
  }
}