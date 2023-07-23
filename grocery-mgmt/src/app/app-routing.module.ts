import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewTripComponent } from './new-trip/new-trip.component';

const routes: Routes = [
  { path: 'newTrip', component: NewTripComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
