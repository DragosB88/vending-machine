import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VendingDisplayComponent } from './vending-display/vending-display.component';
import { VendingKeypadComponent } from './vending-keypad/vending-keypad.component';

@NgModule({
  declarations: [
    AppComponent,
    VendingDisplayComponent,
    VendingKeypadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
