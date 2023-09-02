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

  storeSelected: boolean = false

  constructor(private storeService: StoreService,  public dialog: MatDialog) { }

  ngOnInit() {
    this.recentlyVisitedStores = this.storeService.getFiveRecentlyVisitedStores(); // TODO: hit REST endpoint via service
  }

  /**
   * Store selected from dropdown
   * @param selectedGroceryStoreEvent a GroceryStore from the dropdown
   */
  storeSelectionChanged(selectedGroceryStoreEvent: GroceryStore){
    if(selectedGroceryStoreEvent) { 
      console.log("Store selected from dropdown: ", selectedGroceryStoreEvent);
      this.selectedStore = selectedGroceryStoreEvent
      this.storeSelected = true
    }
  }

  /**
   * 'x' button clicked after store selected. Revert, showing the dropdown again.
   */
  deselectStore(){
    this.storeSelected = false
    this.selectedStore = new GroceryStore(-1,'','')
  }

  /**
   * Opens dialog box to create new grocery storee
   */
  openNewStoreDialog() {
    // Open the dialog box w/ dummy data
    const dialogRef = this.dialog.open(NewStoreDialog, { data: { storeName: 'dummyVal',  storeLocation: 'dummyVal' }, });
    // Runs after box closed
    dialogRef.afterClosed().subscribe(result  => {
      if (result['storeBrand']) {
        console.log("Store added via dialog box: ", result);
        this.selectedStore = new GroceryStore(-1, result['storeBrand'], result['storeLocation']) // TODO: create via REST service + get the actual store ID back
        this.storeSelected = true
      } else {
        console.log("Dialog closed without data processing: ", result);
        this.storeSelected = false
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
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule} from '@angular/material/form-field';
import {MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'new-store-dialog',
  templateUrl: 'new-store-dialog.html',
  standalone: true,
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { subscriptSizing: 'dynamic' } }
  ]
})
export class NewStoreDialog {

  dialogGroceryStore: GroceryStore = new GroceryStore(-1, '', '')

  constructor(
    public newStoreDialog: MatDialogRef<NewStoreDialog>,
    @Inject(MAT_DIALOG_DATA) public data: GroceryStore,
  ) {}

  /**
   * Runs when "Back" clicked
   * @param action 
   */
  backOutOfNewStoreDialog(action: string): void {
    console.log(action);
    this.newStoreDialog.close(action);
  }
}