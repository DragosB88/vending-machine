import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injectable } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VendingDisplayComponent } from './vending-display/vending-display.component';
import { VendingKeypadComponent } from './vending-keypad/vending-keypad.component';

@Injectable({
  providedIn: 'root',
})
@NgModule({
  declarations: [AppComponent, VendingDisplayComponent, VendingKeypadComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
