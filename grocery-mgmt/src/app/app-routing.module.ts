import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewTripComponent } from './new-trip/new-trip.component';
import { HomeComponent } from './home/home.component';
import { ReceiptItemEntryComponent } from './receipt-item-entry/receipt-item-entry.component';

const routes: Routes = [
  { path: 'newTrip', component: NewTripComponent},
  { path: 'home', component: HomeComponent},
  { path: 'receiptItemEntry', component: ReceiptItemEntryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
